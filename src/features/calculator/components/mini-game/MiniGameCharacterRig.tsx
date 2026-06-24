"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { AnimationMixer, Box3, MathUtils, Quaternion, Vector3 } from "three";
import { OBJLoader, SkeletonUtils } from "three-stdlib";
import {
  aimActivationEpsilon,
  aimPoseFollowStrength,
  arrowTailModelCenter,
  arrowTipModelCenter,
  baseArrowPivotQuaternion,
  baselineAimAngle,
  characterStageRotationY,
  currentCharacterAimBoneNames,
  drawAimPoseEnd,
  miniGameCharacterAimPitchDown,
  miniGameCharacterAimPitchUp,
  miniGameCharacterGlbPath,
  miniGameCharacterSupportsProceduralBoneTranslation,
  miniGameCharacterStageFloorY,
  runtimeAimLowerAngle,
  runtimeAimUpperAngle,
} from "@/features/calculator/lib/mini-game/constants";
import {
  applyProceduralAim,
  applyReleaseAimOffset,
  findNearestAimAnchor,
} from "@/features/calculator/lib/mini-game/aimPose";
import {
  getArrowModelPointWorld,
  getPivotLocalQuaternionForTipTarget,
  getPivotLocalQuaternionForWorldDirection,
} from "@/features/calculator/lib/mini-game/arrowTransforms";
import { getPredictedImpactMetrics } from "@/features/calculator/lib/mini-game/projectilePhysics";
import {
  attachArrowToRightHand,
  attachBowToLeftHand,
  findBoneByName,
  findPlayableClip,
} from "@/features/calculator/lib/mini-game/sceneUtils";
import type {
  ArrowAlignmentMetrics,
  ArrowSample,
  CharacterRig,
  MiniGameSceneProfile,
  PredictedImpactMetrics,
  ProceduralAimBoneName,
} from "@/features/calculator/lib/mini-game/types";
import type { Bone } from "three";

const worldUp = new Vector3(0, 1, 0);

function getNormalizedAimOffset(targetAngle: number) {
  if (targetAngle >= baselineAimAngle) {
    return MathUtils.clamp(
      (targetAngle - baselineAimAngle) / (runtimeAimUpperAngle - baselineAimAngle),
      0,
      1,
    );
  }

  return -MathUtils.clamp(
    (baselineAimAngle - targetAngle) / (baselineAimAngle - runtimeAimLowerAngle),
    0,
    1,
  );
}

function getDesiredArrowDirection(
  origin: Vector3,
  targetAngle: number,
  sceneProfile: MiniGameSceneProfile,
) {
  const liftedTarget = sceneProfile.targetFrontPlaneCenter
    .clone()
    .add(
      sceneProfile.targetAimLocalOffset
        .clone()
        .applyAxisAngle(worldUp, sceneProfile.targetBaseRotationY),
    )
    .add(new Vector3(0, sceneProfile.targetAimLift, 0));
  const desiredDirection = liftedTarget.sub(origin).normalize();
  const flatDirection = desiredDirection.clone().setY(0);

  if (flatDirection.lengthSq() <= 1e-6) {
    return desiredDirection;
  }

  flatDirection.normalize();
  const pitchAxis = new Vector3().crossVectors(flatDirection, worldUp).normalize();
  const normalizedAimOffset = getNormalizedAimOffset(targetAngle);
  const pitchDelta =
    normalizedAimOffset >= 0
      ? normalizedAimOffset * miniGameCharacterAimPitchUp
      : normalizedAimOffset * miniGameCharacterAimPitchDown;

  return desiredDirection.applyAxisAngle(pitchAxis, pitchDelta).normalize();
}

export function MiniGameCharacterRig({
  enableDebugMetrics,
  onDebugAlignmentMetricsChange,
  onDebugPredictedImpactMetricsChange,
  poseClipProgress,
  onArrowSample,
  onResolvedAimAngleChange,
  onActiveAimAnchorAngleChange,
  releaseAimAngle,
  releaseRecoveryBlend,
  sceneProfile,
  isReleasing,
  showHandArrow,
  targetAngle,
}: {
  enableDebugMetrics: boolean;
  onDebugAlignmentMetricsChange: (metrics: ArrowAlignmentMetrics | null) => void;
  onDebugPredictedImpactMetricsChange: (metrics: PredictedImpactMetrics | null) => void;
  poseClipProgress: number;
  onArrowSample: (sample: ArrowSample | null) => void;
  onResolvedAimAngleChange: (angle: number) => void;
  onActiveAimAnchorAngleChange: (angle: number) => void;
  releaseAimAngle: number;
  releaseRecoveryBlend: number;
  sceneProfile: MiniGameSceneProfile;
  isReleasing: boolean;
  showHandArrow: boolean;
  targetAngle: number;
}) {
  const bowModel = useLoader(OBJLoader, "/models/bow.obj");
  const arrowModel = useLoader(OBJLoader, "/models/arrow.obj");
  const { animations, scene: characterSource } = useGLTF(miniGameCharacterGlbPath);
  const rig = useMemo(() => {
    const scene = SkeletonUtils.clone(characterSource);
    const clip = findPlayableClip({ animations });

    if (!clip) {
      return null;
    }

    attachBowToLeftHand(scene, bowModel);
    attachArrowToRightHand(scene, arrowModel);

    scene.updateMatrixWorld(true);

    const bounds = new Box3().setFromObject(scene);
    const center = bounds.getCenter(new Vector3());
    const size = bounds.getSize(new Vector3());
    const stageScale = size.y > 1e-6 ? sceneProfile.characterStageHeight / size.y : 1;
    const stageOffset = new Vector3(
      -center.x * stageScale,
      miniGameCharacterStageFloorY - bounds.min.y * stageScale,
      -center.z * stageScale,
    );
    const mixer = new AnimationMixer(scene);
    const action = mixer.clipAction(clip);
    const proceduralBoneNames = currentCharacterAimBoneNames as ProceduralAimBoneName[];
    const controlledBones = proceduralBoneNames.reduce<Partial<Record<ProceduralAimBoneName, Bone>>>(
      (bones, boneName) => {
        const bone = findBoneByName(scene, boneName);

        if (bone) {
          bones[boneName] = bone;
        }

        return bones;
      },
      {},
    );

    return {
      action,
      clip,
      controlledBones,
      mixer,
      proceduralBoneNames,
      scene,
      stageOffset,
      stageScale,
    } satisfies CharacterRig;
  }, [animations, arrowModel, bowModel, characterSource, sceneProfile]);
  const smoothedAngleRef = useRef(baselineAimAngle);
  const activeAimAnchorAngleRef = useRef(baselineAimAngle);
  const baselineTipInBowSpaceRef = useRef<Vector3 | null>(null);

  useEffect(() => {
    if (!rig) {
      return;
    }

    rig.action.reset();
    rig.action.play();

    return () => {
      rig.action.stop();
    };
  }, [rig]);

  useFrame((_, delta) => {
    if (!rig) {
      return;
    }

    const normalizedProgress = MathUtils.clamp(poseClipProgress, 0, 1);
    const drawAimInfluence =
      !isReleasing &&
      normalizedProgress >= drawAimPoseEnd - aimActivationEpsilon &&
      normalizedProgress <= drawAimPoseEnd + aimActivationEpsilon
        ? 1
        : 0;
    const effectiveAimAngle = isReleasing
      ? MathUtils.lerp(baselineAimAngle, releaseAimAngle, releaseRecoveryBlend)
      : drawAimInfluence > 0
        ? MathUtils.damp(smoothedAngleRef.current, targetAngle, aimPoseFollowStrength, delta)
        : baselineAimAngle;

    smoothedAngleRef.current = effectiveAimAngle;
    onResolvedAimAngleChange(effectiveAimAngle);

    const nextVisibleAngle = findNearestAimAnchor(effectiveAimAngle);

    if (nextVisibleAngle !== activeAimAnchorAngleRef.current) {
      activeAimAnchorAngleRef.current = nextVisibleAngle;
      onActiveAimAnchorAngleChange(nextVisibleAngle);
    }

    rig.mixer.setTime(normalizedProgress * rig.clip.duration);
    applyProceduralAim(
      rig.proceduralBoneNames,
      rig.controlledBones,
      effectiveAimAngle,
      drawAimInfluence,
      miniGameCharacterSupportsProceduralBoneTranslation,
    );
    applyReleaseAimOffset(
      rig.proceduralBoneNames,
      rig.controlledBones,
      releaseAimAngle,
      isReleasing ? releaseRecoveryBlend : 0,
      miniGameCharacterSupportsProceduralBoneTranslation,
    );
    rig.scene.updateMatrixWorld(true);

    const activeArrow = rig.scene.getObjectByName("mini-game-arrow") ?? null;
    const activeArrowPivot = rig.scene.getObjectByName("mini-game-arrow-pivot") ?? null;
    const activeBow = rig.scene.getObjectByName("mini-game-bow") ?? null;
    const activeRightHand = rig.scene.getObjectByName("mixamorig_RightHand") ?? null;

    if (activeArrowPivot) {
      activeArrowPivot.quaternion.copy(baseArrowPivotQuaternion);
      activeArrowPivot.updateMatrixWorld(true);
      rig.scene.updateMatrixWorld(true);
    }

    if (
      drawAimInfluence > 0.99 &&
      activeArrowPivot &&
      activeBow &&
      activeRightHand &&
      baselineTipInBowSpaceRef.current
    ) {
      const desiredTipWorld = activeBow.localToWorld(baselineTipInBowSpaceRef.current.clone());
      const tailWorld = activeArrowPivot.getWorldPosition(new Vector3());
      const nextPivotQuaternion = getPivotLocalQuaternionForTipTarget(
        activeRightHand,
        tailWorld,
        desiredTipWorld,
      );

      if (nextPivotQuaternion) {
        activeArrowPivot.quaternion.copy(nextPivotQuaternion);
        activeArrowPivot.updateMatrixWorld(true);
        rig.scene.updateMatrixWorld(true);
      }
    } else if (drawAimInfluence > 0.99 && activeArrowPivot && activeRightHand) {
      const tailWorld = activeArrowPivot.getWorldPosition(new Vector3());
      const desiredDirectionWorld = getDesiredArrowDirection(
        tailWorld,
        effectiveAimAngle,
        sceneProfile,
      );
      const nextPivotQuaternion = getPivotLocalQuaternionForWorldDirection(
        activeRightHand,
        desiredDirectionWorld,
      );

      if (nextPivotQuaternion) {
        activeArrowPivot.quaternion.copy(nextPivotQuaternion);
        activeArrowPivot.updateMatrixWorld(true);
        rig.scene.updateMatrixWorld(true);
      }
    }

    if (activeArrow) {
      activeArrow.visible = showHandArrow;

      if (showHandArrow) {
        const arrowPosition = new Vector3();
        const arrowQuaternion = new Quaternion();
        const arrowScale = new Vector3();
        const arrowDirection = new Vector3(0, 0, -1);

        activeArrow.getWorldPosition(arrowPosition);
        activeArrow.getWorldQuaternion(arrowQuaternion);
        activeArrow.getWorldScale(arrowScale);
        arrowDirection.applyQuaternion(arrowQuaternion).normalize();

        onArrowSample({
          direction: [arrowDirection.x, arrowDirection.y, arrowDirection.z],
          position: [arrowPosition.x, arrowPosition.y, arrowPosition.z],
          quaternion: [
            arrowQuaternion.x,
            arrowQuaternion.y,
            arrowQuaternion.z,
            arrowQuaternion.w,
          ],
          scale: [arrowScale.x, arrowScale.y, arrowScale.z],
        });

        if (enableDebugMetrics) {
          onDebugPredictedImpactMetricsChange(
            getPredictedImpactMetrics(
              {
                direction: [arrowDirection.x, arrowDirection.y, arrowDirection.z],
                position: [arrowPosition.x, arrowPosition.y, arrowPosition.z],
                quaternion: [
                  arrowQuaternion.x,
                  arrowQuaternion.y,
                  arrowQuaternion.z,
                  arrowQuaternion.w,
                ],
                scale: [arrowScale.x, arrowScale.y, arrowScale.z],
              },
              sceneProfile,
            ),
          );
        }
      } else if (enableDebugMetrics) {
        onDebugPredictedImpactMetricsChange(null);
      }
    } else if (showHandArrow) {
      onArrowSample(null);

      if (enableDebugMetrics) {
        onDebugPredictedImpactMetricsChange(null);
      }
    }

    if (activeArrow && activeBow) {
      const activeTipInBowSpace = activeBow.worldToLocal(
        getArrowModelPointWorld(activeArrow, arrowTipModelCenter),
      );

      if (Math.abs(effectiveAimAngle - baselineAimAngle) < 0.35) {
        baselineTipInBowSpaceRef.current = activeTipInBowSpace.clone();
      }

      if (!enableDebugMetrics) {
        return;
      }

      const activeTailInBowSpace = activeBow.worldToLocal(
        getArrowModelPointWorld(activeArrow, arrowTailModelCenter),
      );

      let tailToPinchDistance = 0;

      if (activeArrowPivot) {
        const pivotPoint = activeArrowPivot.getWorldPosition(new Vector3());
        const tailPoint = getArrowModelPointWorld(activeArrow, arrowTailModelCenter);

        tailToPinchDistance = tailPoint.distanceTo(pivotPoint);
      }

      const baselineTipInBowSpace = baselineTipInBowSpaceRef.current ?? activeTipInBowSpace;

      onDebugAlignmentMetricsChange({
        activeTailInBowSpace: [
          activeTailInBowSpace.x,
          activeTailInBowSpace.y,
          activeTailInBowSpace.z,
        ],
        activeTipInBowSpace: [
          activeTipInBowSpace.x,
          activeTipInBowSpace.y,
          activeTipInBowSpace.z,
        ],
        baselineTipInBowSpace: [
          baselineTipInBowSpace.x,
          baselineTipInBowSpace.y,
          baselineTipInBowSpace.z,
        ],
        tailToPinchDistance,
        tipDeltaFromBaseline: [
          activeTipInBowSpace.x - baselineTipInBowSpace.x,
          activeTipInBowSpace.y - baselineTipInBowSpace.y,
          activeTipInBowSpace.z - baselineTipInBowSpace.z,
        ],
      });
    } else if (enableDebugMetrics) {
      onDebugAlignmentMetricsChange(null);
    }
  });

  if (!rig) {
    return null;
  }

  return (
    <group
      position={[
        sceneProfile.characterStagePosition.x,
        sceneProfile.characterStagePosition.y,
        sceneProfile.characterStagePosition.z,
      ]}
      rotation={[0, characterStageRotationY, 0]}
    >
      <group position={rig.stageOffset} scale={rig.stageScale}>
        <primitive object={rig.scene} />
      </group>
    </group>
  );
}

useGLTF.preload(miniGameCharacterGlbPath);
useLoader.preload(OBJLoader, "/models/bow.obj");
useLoader.preload(OBJLoader, "/models/arrow.obj");
