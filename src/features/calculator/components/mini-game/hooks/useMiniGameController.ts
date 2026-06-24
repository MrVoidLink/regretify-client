"use client";

import type { PointerEvent as ReactPointerEvent } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MathUtils, Vector3 } from "three";
import {
  aimActivationEpsilon,
  aimDragHeightFactor,
  aimDragRange,
  baselineAimAngle,
  drawAimPoseEnd,
  drawDragWidthFactor,
  hitAdvanceDelayMs,
  nockedPoseStart,
  releaseAimRecoveryRatio,
  releaseResetDelayMs,
  runtimeAimLowerAngle,
  runtimeAimUpperAngle,
  shotReleaseEnd,
} from "@/features/calculator/lib/mini-game/constants";
import { getTargetAimAngle } from "@/features/calculator/lib/mini-game/aimPose";
import type { CalculatorMarketId } from "@/features/calculator/types";
import type {
  AimDragState,
  ArrowFlightState,
  ArrowImpactState,
  ArrowSample,
  DrawDragState,
  MiniGameStageTelemetry,
} from "@/features/calculator/lib/mini-game/types";

type ControllerPointerEvent = ReactPointerEvent<HTMLDivElement>;

export function useMiniGameController({
  onTelemetryChange,
  selectedMarketId,
}: {
  onTelemetryChange?: (telemetry: MiniGameStageTelemetry) => void;
  selectedMarketId: CalculatorMarketId;
}) {
  const router = useRouter();
  const [poseClipProgress, setPoseClipProgress] = useState(nockedPoseStart);
  const [dragAimOffset, setDragAimOffset] = useState(0);
  const [projectileFlight, setProjectileFlight] = useState<ArrowFlightState | null>(null);
  const [impactArrow, setImpactArrow] = useState<ArrowImpactState | null>(null);
  const [targetWobbleTick, setTargetWobbleTick] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [releaseAimAngle, setReleaseAimAngle] = useState(baselineAimAngle);
  const [releaseRecoveryBlend, setReleaseRecoveryBlend] = useState(0);
  const [activeAimAnchorAngle, setActiveAimAnchorAngle] = useState(baselineAimAngle);
  const [isReleasing, setIsReleasing] = useState(false);
  const projectileFlightIdRef = useRef(0);
  const drawDragStateRef = useRef<DrawDragState | null>(null);
  const aimDragStateRef = useRef<AimDragState | null>(null);
  const latestArrowSampleRef = useRef<ArrowSample | null>(null);
  const resolvedAimAngleRef = useRef(baselineAimAngle);
  const hitAdvanceTimeoutRef = useRef<number | null>(null);
  const hitResolvedRef = useRef(false);
  const releaseRafRef = useRef<number | null>(null);
  const poseResetTimeoutRef = useRef<number | null>(null);

  const drawProgress = useMemo(
    () =>
      MathUtils.clamp(
        (poseClipProgress - nockedPoseStart) / (drawAimPoseEnd - nockedPoseStart),
        0,
        1,
      ),
    [poseClipProgress],
  );
  const targetAimAngle = useMemo(() => {
    const aimEnabled = poseClipProgress >= drawAimPoseEnd - aimActivationEpsilon;

    return aimEnabled
      ? MathUtils.clamp(
          getTargetAimAngle(dragAimOffset),
          runtimeAimLowerAngle,
          runtimeAimUpperAngle,
        )
      : baselineAimAngle;
  }, [dragAimOffset, poseClipProgress]);

  useEffect(() => {
    onTelemetryChange?.({
      drawProgress,
      dragging: isDragging,
      releasing: isReleasing,
      targetAimAngle,
      activeAimAnchorAngle,
    });
  }, [
    activeAimAnchorAngle,
    drawProgress,
    isDragging,
    isReleasing,
    onTelemetryChange,
    targetAimAngle,
  ]);

  useEffect(() => {
    return () => {
      if (releaseRafRef.current !== null) {
        cancelAnimationFrame(releaseRafRef.current);
      }

      if (poseResetTimeoutRef.current !== null) {
        window.clearTimeout(poseResetTimeoutRef.current);
      }

      if (hitAdvanceTimeoutRef.current !== null) {
        window.clearTimeout(hitAdvanceTimeoutRef.current);
      }
    };
  }, []);

  const clearPendingRelease = useCallback(() => {
    if (releaseRafRef.current !== null) {
      cancelAnimationFrame(releaseRafRef.current);
      releaseRafRef.current = null;
    }

    if (poseResetTimeoutRef.current !== null) {
      window.clearTimeout(poseResetTimeoutRef.current);
      poseResetTimeoutRef.current = null;
    }

    if (hitAdvanceTimeoutRef.current !== null) {
      window.clearTimeout(hitAdvanceTimeoutRef.current);
      hitAdvanceTimeoutRef.current = null;
    }
  }, []);

  const resetPose = useCallback(() => {
    setPoseClipProgress(nockedPoseStart);
    setDragAimOffset(0);
    setReleaseAimAngle(baselineAimAngle);
    setReleaseRecoveryBlend(0);
    setIsReleasing(false);
  }, []);

  const updatePoseFromPointer = useCallback(
    (clientX: number, clientY: number, element: HTMLDivElement) => {
      const drawDragState = drawDragStateRef.current;

      if (!drawDragState) {
        return;
      }

      const rect = element.getBoundingClientRect();
      const deltaX = drawDragState.x - clientX;
      const drawWindow = drawAimPoseEnd - nockedPoseStart;
      const nextPoseClipProgressRaw = MathUtils.clamp(
        drawDragState.startClipProgress + (deltaX / (rect.width * drawDragWidthFactor)) * drawWindow,
        nockedPoseStart,
        drawAimPoseEnd,
      );
      const aimEnabled = nextPoseClipProgressRaw >= drawAimPoseEnd - aimActivationEpsilon;
      const nextPoseClipProgress = aimEnabled ? drawAimPoseEnd : nextPoseClipProgressRaw;
      let nextDragAimOffset = 0;

      if (aimEnabled) {
        const aimDragState = aimDragStateRef.current ?? {
          y: clientY,
          startAimAngle: dragAimOffset,
        };
        const deltaY = clientY - aimDragState.y;

        nextDragAimOffset = MathUtils.clamp(
          aimDragState.startAimAngle + (deltaY / (rect.height * aimDragHeightFactor)) * aimDragRange,
          -aimDragRange,
          aimDragRange,
        );
        aimDragStateRef.current = {
          y: clientY,
          startAimAngle: nextDragAimOffset,
        };
      } else {
        aimDragStateRef.current = {
          y: clientY,
          startAimAngle: 0,
        };
      }

      setPoseClipProgress(nextPoseClipProgress);
      setDragAimOffset(nextDragAimOffset);
    },
    [dragAimOffset],
  );

  const triggerShot = useCallback(() => {
    clearPendingRelease();
    const liveResolvedAimAngle = resolvedAimAngleRef.current;
    const shotAimAngle =
      poseClipProgress >= drawAimPoseEnd - aimActivationEpsilon
        ? MathUtils.clamp(liveResolvedAimAngle, runtimeAimLowerAngle, runtimeAimUpperAngle)
        : baselineAimAngle;

    setReleaseAimAngle(shotAimAngle);
    setReleaseRecoveryBlend(1);
    setIsReleasing(true);

    const latestArrowSample = latestArrowSampleRef.current;

    if (latestArrowSample) {
      const launchDirection = new Vector3(...latestArrowSample.direction);
      const launchPosition = new Vector3(...latestArrowSample.position).addScaledVector(
        launchDirection,
        0.18,
      );

      if (hitAdvanceTimeoutRef.current !== null) {
        window.clearTimeout(hitAdvanceTimeoutRef.current);
        hitAdvanceTimeoutRef.current = null;
      }

      hitResolvedRef.current = false;
      setImpactArrow(null);
      setProjectileFlight({
        direction: [launchDirection.x, launchDirection.y, launchDirection.z],
        id: projectileFlightIdRef.current + 1,
        position: [launchPosition.x, launchPosition.y, launchPosition.z],
        quaternion: latestArrowSample.quaternion,
        scale: latestArrowSample.scale,
      });
      projectileFlightIdRef.current += 1;
    }

    const startProgress = poseClipProgress;
    const startDragAimOffset = dragAimOffset;
    const remainingRange = Math.max(shotReleaseEnd - startProgress, 0.01);
    const releaseDurationMs = 780 + remainingRange * 1460;
    const releaseAimRecoveryMs = releaseDurationMs * releaseAimRecoveryRatio;
    const releaseStartTime = performance.now();

    const step = (timestamp: number) => {
      const elapsed = timestamp - releaseStartTime;
      const t = MathUtils.clamp(elapsed / releaseDurationMs, 0, 1);
      const aimRecoveryT = MathUtils.clamp(elapsed / releaseAimRecoveryMs, 0, 1);
      const aimRecoveryEased = MathUtils.smootherstep(aimRecoveryT, 0, 1);
      const eased = 1 - (1 - t) * (1 - t);

      setPoseClipProgress(MathUtils.lerp(startProgress, shotReleaseEnd, eased));
      setDragAimOffset(MathUtils.lerp(startDragAimOffset, 0, aimRecoveryEased));
      setReleaseAimAngle(MathUtils.lerp(shotAimAngle, baselineAimAngle, aimRecoveryEased));
      setReleaseRecoveryBlend(1 - aimRecoveryEased);

      if (t < 1) {
        releaseRafRef.current = requestAnimationFrame(step);
        return;
      }

      releaseRafRef.current = null;
      poseResetTimeoutRef.current = window.setTimeout(() => {
        resetPose();
        poseResetTimeoutRef.current = null;
      }, releaseResetDelayMs);
    };

    releaseRafRef.current = requestAnimationFrame(step);
  }, [clearPendingRelease, dragAimOffset, poseClipProgress, resetPose]);

  const handlePointerDown = useCallback(
    (event: ControllerPointerEvent) => {
      if (event.button !== 0 || isReleasing) {
        return;
      }

      clearPendingRelease();
      drawDragStateRef.current = {
        x: event.clientX,
        startClipProgress: poseClipProgress,
      };
      aimDragStateRef.current = {
        y: event.clientY,
        startAimAngle: dragAimOffset,
      };
      setIsDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [clearPendingRelease, dragAimOffset, isReleasing, poseClipProgress],
  );

  const handlePointerMove = useCallback(
    (event: ControllerPointerEvent) => {
      if (!isDragging || isReleasing) {
        return;
      }

      updatePoseFromPointer(event.clientX, event.clientY, event.currentTarget);
    },
    [isDragging, isReleasing, updatePoseFromPointer],
  );

  const handlePointerUp = useCallback(
    (event: ControllerPointerEvent) => {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      drawDragStateRef.current = null;
      aimDragStateRef.current = null;

      if (!isDragging) {
        return;
      }

      setIsDragging(false);

      if (poseClipProgress > nockedPoseStart + 0.015) {
        triggerShot();
      }
    },
    [isDragging, poseClipProgress, triggerShot],
  );

  const handlePointerCancel = useCallback(
    (event: ControllerPointerEvent) => {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      drawDragStateRef.current = null;
      aimDragStateRef.current = null;
      setIsDragging(false);
      resetPose();
    },
    [resetPose],
  );

  const handleLostPointerCapture = useCallback(() => {
    drawDragStateRef.current = null;
    aimDragStateRef.current = null;
    setIsDragging(false);
  }, []);

  const handleProjectileImpact = useCallback(
    (impact: ArrowImpactState) => {
      setTargetWobbleTick((currentTick) => currentTick + 1);
      setImpactArrow((currentImpact) => (currentImpact?.id === impact.id ? currentImpact : impact));

      if (!hitResolvedRef.current) {
        hitResolvedRef.current = true;
        hitAdvanceTimeoutRef.current = window.setTimeout(() => {
          hitAdvanceTimeoutRef.current = null;
          router.push(`/asset-selection?market=${selectedMarketId}`);
        }, hitAdvanceDelayMs);
      }
    },
    [router, selectedMarketId],
  );

  const handleProjectileComplete = useCallback((projectileId: number) => {
    setProjectileFlight((currentFlight) =>
      currentFlight?.id === projectileId ? null : currentFlight,
    );
  }, []);

  return {
    activeAimAnchorAngle,
    dragAimOffset,
    drawProgress,
    handleArrowSample: (sample: ArrowSample | null) => {
      latestArrowSampleRef.current = sample;
    },
    handleLostPointerCapture,
    handlePointerCancel,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleProjectileComplete,
    handleProjectileImpact,
    handleResolvedAimAngleChange: (angle: number) => {
      resolvedAimAngleRef.current = angle;
    },
    handleActiveAimAnchorAngleChange: setActiveAimAnchorAngle,
    impactArrow,
    isDragging,
    isReleasing,
    poseClipProgress,
    projectileFlight,
    releaseAimAngle,
    releaseRecoveryBlend,
    targetAimAngle,
    targetWobbleTick,
  };
}
