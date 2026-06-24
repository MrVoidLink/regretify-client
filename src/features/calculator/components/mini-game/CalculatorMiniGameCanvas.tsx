"use client";

import { Component, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { ContactShadows, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { RootState } from "@react-three/fiber";
import { getConsoleFunction, setConsoleFunction } from "three";
import type { CalculatorMarketId } from "@/features/calculator/types";
import {
  desktopMiniGameSceneProfile,
  mobileMiniGameSceneProfile,
  showMiniGameDebugPanel,
  showPredictedImpactDebugMarker,
  tabletMiniGameSceneProfile,
} from "@/features/calculator/lib/mini-game/constants";
import type {
  ArrowAlignmentMetrics,
  MiniGameSceneProfile,
  MiniGameStageTelemetry,
  PredictedImpactMetrics,
} from "@/features/calculator/lib/mini-game/types";
import { MiniGameCharacterRig } from "@/features/calculator/components/mini-game/MiniGameCharacterRig";
import { MiniGameImpactArrow } from "@/features/calculator/components/mini-game/MiniGameImpactArrow";
import { MiniGameProjectile } from "@/features/calculator/components/mini-game/MiniGameProjectile";
import { MiniGameTarget } from "@/features/calculator/components/mini-game/MiniGameTarget";
import { useMiniGameController } from "@/features/calculator/components/mini-game/hooks/useMiniGameController";

export type { MiniGameStageTelemetry } from "@/features/calculator/lib/mini-game/types";

let cachedWebGlSupport: boolean | null = null;

type CameraPreset = {
  fov: number;
  position: [number, number, number];
};

type MiniGameCanvasFallbackProps = {
  title: string;
  description: string;
};

type MiniGameCanvasBoundaryProps = {
  children: React.ReactNode;
  fallback: React.ReactNode;
  onError: () => void;
};

type MiniGameCanvasBoundaryState = {
  hasError: boolean;
};

const threeClockDeprecationMessage =
  "THREE.Clock: This module has been deprecated. Please use THREE.Timer instead.";

function detectWebGlSupport() {
  if (cachedWebGlSupport !== null) {
    return cachedWebGlSupport;
  }

  const canvas = document.createElement("canvas");
  const context =
    canvas.getContext("webgl2", {
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
      preserveDrawingBuffer: false,
    }) ??
    canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
      preserveDrawingBuffer: false,
    }) ??
    canvas.getContext("experimental-webgl");

  cachedWebGlSupport = context !== null;

  return cachedWebGlSupport;
}

function MiniGameCanvasFallback({
  title,
  description,
}: MiniGameCanvasFallbackProps) {
  return (
    <div className="flex h-full min-h-[15.5rem] items-center justify-center p-4 sm:min-h-[20rem]">
      <div className="max-w-[20rem] rounded-[1.3rem] border border-white/80 bg-white/88 px-5 py-4 text-center shadow-[0_18px_44px_rgba(24,24,27,0.08)] backdrop-blur-md">
        <div className="text-[0.82rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand)]">
          Mini-game unavailable
        </div>
        <div className="mt-2 text-[1rem] font-semibold text-zinc-950">{title}</div>
        <p className="mt-2 text-[0.82rem] leading-6 text-zinc-600">{description}</p>
      </div>
    </div>
  );
}

class MiniGameCanvasBoundary extends Component<
  MiniGameCanvasBoundaryProps,
  MiniGameCanvasBoundaryState
> {
  state: MiniGameCanvasBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): MiniGameCanvasBoundaryState {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export function CalculatorMiniGameCanvas({
  onTelemetryChange,
  selectedMarketId,
  targetHaloColor,
}: {
  onTelemetryChange?: (telemetry: MiniGameStageTelemetry) => void;
  selectedMarketId: CalculatorMarketId;
  targetHaloColor?: string;
}) {
  const shouldTrackDebugMetrics =
    showMiniGameDebugPanel || showPredictedImpactDebugMarker;
  const [debugAlignmentMetrics, setDebugAlignmentMetrics] =
    useState<ArrowAlignmentMetrics | null>(null);
  const [debugPredictedImpactMetrics, setDebugPredictedImpactMetrics] =
    useState<PredictedImpactMetrics | null>(null);
  const handleDebugAlignmentMetricsChange = useCallback(
    (metrics: ArrowAlignmentMetrics | null) => {
      if (!shouldTrackDebugMetrics) {
        return;
      }

      setDebugAlignmentMetrics(metrics);
    },
    [shouldTrackDebugMetrics],
  );
  const handleDebugPredictedImpactMetricsChange = useCallback(
    (metrics: PredictedImpactMetrics | null) => {
      if (!shouldTrackDebugMetrics) {
        return;
      }

      setDebugPredictedImpactMetrics(metrics);
    },
    [shouldTrackDebugMetrics],
  );
  const visibleDebugAlignmentMetrics =
    shouldTrackDebugMetrics ? debugAlignmentMetrics : null;
  const visibleDebugPredictedImpactMetrics =
    shouldTrackDebugMetrics ? debugPredictedImpactMetrics : null;
  const [isWebGlUnavailable, setIsWebGlUnavailable] = useState(() => {
    if (typeof document === "undefined") {
      return false;
    }

    return !detectWebGlSupport();
  });
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>({
    fov: 19,
    position: [0, 0.2, 10.1],
  });
  const [sceneProfile, setSceneProfile] = useState<MiniGameSceneProfile>(
    desktopMiniGameSceneProfile,
  );
  const miniGameController = useMiniGameController({
    onTelemetryChange,
    selectedMarketId,
  });
  const unavailableFallback = useMemo(
    () => (
      <MiniGameCanvasFallback
        title="3D stage could not start"
        description="This browser session blocked WebGL. Refresh the page or reopen the tab to load the archery stage again."
      />
    ),
    [],
  );
  const handleWebGlUnavailable = useCallback(() => {
    cachedWebGlSupport = false;
    setIsWebGlUnavailable(true);
  }, []);
  const handleCanvasCreated = useCallback((state: RootState) => {
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      setIsWebGlUnavailable(true);
    };

    state.gl.domElement.addEventListener("webglcontextlost", handleContextLost, {
      passive: false,
    });

    state.events.disconnect?.();
    state.events.connect?.(state.gl.domElement.parentElement ?? state.gl.domElement);
  }, []);

  useEffect(() => {
    const previousConsoleFunction = getConsoleFunction();

    setConsoleFunction((level, message, ...params) => {
      if (level === "warn" && message === threeClockDeprecationMessage) {
        return;
      }

      if (previousConsoleFunction) {
        previousConsoleFunction(level, message, ...params);
        return;
      }

      if (level === "error") {
        console.error(message, ...params);
        return;
      }

      if (level === "warn") {
        console.warn(message, ...params);
        return;
      }

      console.log(message, ...params);
    });

    return () => {
      setConsoleFunction(previousConsoleFunction);
    };
  }, []);

  useEffect(() => {
    const updateCameraPreset = () => {
      if (window.innerWidth < 768) {
        setCameraPreset({
          fov: 31,
          position: [0.18, 0.18, 10.85],
        });
        setSceneProfile(mobileMiniGameSceneProfile);
        return;
      }

      if (window.innerWidth < 1024) {
        setCameraPreset({
          fov: 24,
          position: [0.08, 0.18, 10.45],
        });
        setSceneProfile(tabletMiniGameSceneProfile);
        return;
      }

      setCameraPreset({
        fov: 19,
        position: [0, 0.2, 10.1],
      });
      setSceneProfile(desktopMiniGameSceneProfile);
    };

    updateCameraPreset();
    window.addEventListener("resize", updateCameraPreset);

    return () => {
      window.removeEventListener("resize", updateCameraPreset);
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      {isWebGlUnavailable ? (
        unavailableFallback
      ) : (
        <MiniGameCanvasBoundary
          fallback={unavailableFallback}
          onError={handleWebGlUnavailable}
        >
          <Canvas
            fallback={unavailableFallback}
            shadows="percentage"
            dpr={[1, 1.5]}
            gl={{
              alpha: true,
              antialias: true,
              powerPreference: "high-performance",
              preserveDrawingBuffer: false,
            }}
            onCreated={handleCanvasCreated}
            className="h-full w-full"
          >
            <PerspectiveCamera
              makeDefault
              position={cameraPreset.position}
              fov={cameraPreset.fov}
            />
            <ambientLight intensity={1.45} />
            <directionalLight
              position={[3.8, 5.4, 4.4]}
              intensity={1.4}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <spotLight
              position={[-2.4, 4.4, 2.8]}
              intensity={0.65}
              angle={0.42}
              penumbra={1}
            />

            <Suspense fallback={null}>
              <MiniGameCharacterRig
                enableDebugMetrics={shouldTrackDebugMetrics}
                onDebugAlignmentMetricsChange={handleDebugAlignmentMetricsChange}
                onDebugPredictedImpactMetricsChange={handleDebugPredictedImpactMetricsChange}
                poseClipProgress={miniGameController.poseClipProgress}
                onArrowSample={miniGameController.handleArrowSample}
                onResolvedAimAngleChange={miniGameController.handleResolvedAimAngleChange}
                onActiveAimAnchorAngleChange={miniGameController.handleActiveAimAnchorAngleChange}
                releaseAimAngle={miniGameController.releaseAimAngle}
                releaseRecoveryBlend={miniGameController.releaseRecoveryBlend}
                sceneProfile={sceneProfile}
                isReleasing={miniGameController.isReleasing}
                showHandArrow={miniGameController.projectileFlight === null}
                targetAngle={miniGameController.targetAimAngle}
              />
              <MiniGameTarget
                haloColor={targetHaloColor ?? "#ff3b30"}
                predictedImpactMetrics={
                  showPredictedImpactDebugMarker ? visibleDebugPredictedImpactMetrics : null
                }
                sceneProfile={sceneProfile}
                wobbleTrigger={miniGameController.targetWobbleTick}
              />
              {miniGameController.projectileFlight ? (
                <MiniGameProjectile
                  key={miniGameController.projectileFlight.id}
                  flight={miniGameController.projectileFlight}
                  onHit={miniGameController.handleProjectileImpact}
                  onComplete={() => {
                    miniGameController.handleProjectileComplete(
                      miniGameController.projectileFlight!.id,
                    );
                  }}
                  sceneProfile={sceneProfile}
                />
              ) : null}
              {miniGameController.impactArrow ? (
                <MiniGameImpactArrow impact={miniGameController.impactArrow} />
              ) : null}
            </Suspense>

            <mesh position={[0, -1.92, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
              <planeGeometry args={[10, 6]} />
              <shadowMaterial transparent opacity={0.08} />
            </mesh>

            <ContactShadows
              position={[0, -1.9, 0]}
              opacity={0.2}
              scale={7.2}
              blur={2.3}
              far={4.5}
              resolution={512}
            />
          </Canvas>
        </MiniGameCanvasBoundary>
      )}

      <div
        className={`absolute inset-0 z-10 touch-none ${
          miniGameController.isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onPointerDown={miniGameController.handlePointerDown}
        onPointerMove={miniGameController.handlePointerMove}
        onPointerUp={miniGameController.handlePointerUp}
        onPointerCancel={miniGameController.handlePointerCancel}
        onLostPointerCapture={miniGameController.handleLostPointerCapture}
      />

      {showMiniGameDebugPanel ? (
        <div className="pointer-events-none absolute left-3 top-3 z-20 rounded-2xl border border-white/70 bg-white/88 px-3 py-2 text-[0.65rem] font-medium text-zinc-600 shadow-[0_10px_24px_rgba(24,24,27,0.06)] sm:left-4 sm:top-4 sm:text-[0.72rem]">
          <div>aim: {miniGameController.dragAimOffset.toFixed(2)}</div>
          <div>clip: {miniGameController.poseClipProgress.toFixed(3)}</div>
          <div>draw: {miniGameController.drawProgress.toFixed(2)}</div>
          <div>target: {miniGameController.targetAimAngle.toFixed(1)}</div>
          <div>anchor: {miniGameController.activeAimAnchorAngle}</div>
          {visibleDebugAlignmentMetrics ? (
            <>
              <div>
                tip dY:
                {" "}
                {visibleDebugAlignmentMetrics.tipDeltaFromBaseline[1].toFixed(2)}
              </div>
              <div>
                tip dZ:
                {" "}
                {visibleDebugAlignmentMetrics.tipDeltaFromBaseline[2].toFixed(2)}
              </div>
              <div>
                tail gap:
                {" "}
                {visibleDebugAlignmentMetrics.tailToPinchDistance.toFixed(2)}
              </div>
              <div>
                tail bx:
                {" "}
                {visibleDebugAlignmentMetrics.activeTailInBowSpace[0].toFixed(2)}
              </div>
              <div>
                tail by:
                {" "}
                {visibleDebugAlignmentMetrics.activeTailInBowSpace[1].toFixed(2)}
              </div>
              <div>
                tail bz:
                {" "}
                {visibleDebugAlignmentMetrics.activeTailInBowSpace[2].toFixed(2)}
              </div>
              <div>
                tip bx:
                {" "}
                {visibleDebugAlignmentMetrics.activeTipInBowSpace[0].toFixed(2)}
              </div>
              <div>
                tip by:
                {" "}
                {visibleDebugAlignmentMetrics.activeTipInBowSpace[1].toFixed(2)}
              </div>
              <div>
                tip bz:
                {" "}
                {visibleDebugAlignmentMetrics.activeTipInBowSpace[2].toFixed(2)}
              </div>
              {visibleDebugPredictedImpactMetrics ? (
                <>
                  <div>
                    hit ok:
                    {" "}
                    {visibleDebugPredictedImpactMetrics.isInsideHitZone ? "yes" : "no"}
                  </div>
                  <div>
                    hit dy:
                    {" "}
                    {visibleDebugPredictedImpactMetrics.offsetFromCenter[1].toFixed(2)}
                  </div>
                  <div>
                    hit dz:
                    {" "}
                    {visibleDebugPredictedImpactMetrics.offsetFromCenter[2].toFixed(2)}
                  </div>
                  <div>
                    hit r:
                    {" "}
                    {visibleDebugPredictedImpactMetrics.distanceToCenter.toFixed(2)}
                  </div>
                </>
              ) : null}
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
