"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { AdditiveBlending, Box3, CanvasTexture, DoubleSide, Group, Vector3 } from "three";
import {
  miniGameTargetGlbPath,
  showPredictedImpactDebugMarker,
  showTargetHitDebugHalo,
  targetVisualRotationY,
} from "@/features/calculator/lib/mini-game/constants";
import { enableShadowCasting } from "@/features/calculator/lib/mini-game/sceneUtils";
import type {
  MiniGameSceneProfile,
  PredictedImpactMetrics,
} from "@/features/calculator/lib/mini-game/types";

export function MiniGameTarget({
  haloColor,
  predictedImpactMetrics,
  sceneProfile,
  wobbleTrigger,
}: {
  haloColor: string;
  predictedImpactMetrics: PredictedImpactMetrics | null;
  sceneProfile: MiniGameSceneProfile;
  wobbleTrigger: number;
}) {
  const { scene } = useGLTF(miniGameTargetGlbPath);
  const groupRef = useRef<Group>(null);
  const wobbleTimeRef = useRef(Number.POSITIVE_INFINITY);
  const backGlowTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext("2d");

    if (!context) {
      return null;
    }

    const gradient = context.createRadialGradient(128, 128, 12, 128, 128, 128);
    gradient.addColorStop(0, "rgba(255,255,255,0.92)");
    gradient.addColorStop(0.18, "rgba(255,255,255,0.62)");
    gradient.addColorStop(0.42, "rgba(255,255,255,0.24)");
    gradient.addColorStop(0.72, "rgba(255,255,255,0.08)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 256, 256);

    const texture = new CanvasTexture(canvas);
    texture.needsUpdate = true;

    return texture;
  }, []);
  const target = useMemo(() => {
    const model = scene.clone(true);
    model.rotation.set(0, targetVisualRotationY, 0);
    const bounds = new Box3().setFromObject(model);
    const center = bounds.getCenter(new Vector3());
    const size = bounds.getSize(new Vector3());
    const normalizedScale = size.y > 1e-6 ? sceneProfile.targetVisualHeight / size.y : 1;

    model.name = "mini-game-target";
    model.position.set(
      -center.x * normalizedScale + sceneProfile.targetVisualLocalOffset.x,
      -center.y * normalizedScale + sceneProfile.targetVisualLocalOffset.y,
      -center.z * normalizedScale + sceneProfile.targetVisualLocalOffset.z,
    );
    model.scale.setScalar(normalizedScale);
    enableShadowCasting(model);

    return model;
  }, [scene, sceneProfile]);

  useEffect(() => {
    wobbleTimeRef.current = 0;
  }, [wobbleTrigger]);

  useFrame((_, delta) => {
    wobbleTimeRef.current += delta;

    if (!groupRef.current) {
      return;
    }

    const wobbleActive = Number.isFinite(wobbleTimeRef.current) && wobbleTimeRef.current < 1.15;
    const wobble = wobbleActive
      ? Math.sin(wobbleTimeRef.current * 19) * 0.11 * Math.exp(-wobbleTimeRef.current * 3.2)
      : 0;
    const yawWobble =
      Math.sin(wobbleTimeRef.current * 14) * 0.05 * Math.exp(-wobbleTimeRef.current * 3.5);

    groupRef.current.rotation.set(
      wobble * 0.24,
      sceneProfile.targetBaseRotationY + yawWobble,
      wobble,
    );
  });

  return (
    <group
      ref={groupRef}
      position={[
        sceneProfile.targetWorldPosition.x,
        sceneProfile.targetWorldPosition.y,
        sceneProfile.targetWorldPosition.z,
      ]}
      rotation={[0, sceneProfile.targetBaseRotationY, 0]}
    >
      <primitive object={target} />
      {backGlowTexture ? (
        <mesh
          position={[
            sceneProfile.targetVisualCenterLocalPosition.x - sceneProfile.targetBackGlowOffset,
            sceneProfile.targetVisualCenterLocalPosition.y,
            sceneProfile.targetVisualCenterLocalPosition.z,
          ]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <planeGeometry
            args={[
              sceneProfile.targetBackGlowPlaneSize,
              sceneProfile.targetBackGlowPlaneSize,
            ]}
          />
          <meshBasicMaterial
            map={backGlowTexture}
            color={haloColor}
            opacity={0.5}
            side={DoubleSide}
            transparent
            depthWrite={false}
            blending={AdditiveBlending}
          />
        </mesh>
      ) : null}
      {showTargetHitDebugHalo ? (
        <>
          <mesh
            position={[
              sceneProfile.targetVisualCenterLocalPosition.x +
                sceneProfile.targetHitHaloVisualOffset,
              sceneProfile.targetVisualCenterLocalPosition.y,
              sceneProfile.targetVisualCenterLocalPosition.z,
            ]}
            rotation={[0, Math.PI / 2, 0]}
          >
            <circleGeometry args={[sceneProfile.targetHitHaloFillRadius, 56]} />
            <meshBasicMaterial
              color={haloColor}
              opacity={0.22}
              side={DoubleSide}
              transparent
              depthWrite={false}
            />
          </mesh>
          <mesh
            position={[
              sceneProfile.targetVisualCenterLocalPosition.x +
                sceneProfile.targetHitHaloVisualOffset * 1.1,
              sceneProfile.targetVisualCenterLocalPosition.y,
              sceneProfile.targetVisualCenterLocalPosition.z,
            ]}
            rotation={[0, Math.PI / 2, 0]}
          >
            <ringGeometry
              args={[
                sceneProfile.targetHitHaloInnerRadius,
                sceneProfile.targetHitHaloOuterRadius,
                72,
              ]}
            />
            <meshBasicMaterial
              color={haloColor}
              opacity={0.92}
              side={DoubleSide}
              transparent
              depthWrite={false}
            />
          </mesh>
        </>
      ) : null}
      {showPredictedImpactDebugMarker && predictedImpactMetrics ? (
        <mesh
          position={[
            predictedImpactMetrics.hitPointInTargetSpace[0] +
              sceneProfile.targetHitHaloVisualOffset * 1.1,
            predictedImpactMetrics.hitPointInTargetSpace[1],
            predictedImpactMetrics.hitPointInTargetSpace[2],
          ]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <circleGeometry args={[0.08, 32]} />
          <meshBasicMaterial
            color={predictedImpactMetrics.isInsideHitZone ? "#22c55e" : "#0ea5e9"}
            opacity={0.94}
            side={DoubleSide}
            transparent
            depthWrite={false}
          />
        </mesh>
      ) : null}
    </group>
  );
}

useGLTF.preload(miniGameTargetGlbPath);
