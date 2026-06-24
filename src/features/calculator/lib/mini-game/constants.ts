import currentCharacterAngleBoneDump from "../../../../../docs/mini-game/current-character-angle-bone-dump.json";
import { Euler, Quaternion, Vector3 } from "three";
import type {
  AimAnchorAngleKey,
  CachedFullDrawBoneData,
  FullDrawBoneDumpData,
  MiniGameSceneProfile,
  ProceduralAimBoneName,
} from "@/features/calculator/lib/mini-game/types";

export const aimDragRange = 18;
export const nockedPoseStart = 0;
export const drawAimPoseEnd = 0.40625;
export const shotReleaseEnd = 1;
export const drawDragWidthFactor = 0.34;
export const aimDragHeightFactor = 0.24;
export const releaseResetDelayMs = 220;
export const releaseAimRecoveryRatio = 0.42;
export const aimActivationEpsilon = 0.0005;
export const aimPoseFollowStrength = 14;
export const runtimeAimLowerAngle = 25;
export const baselineAimAngle = 50;
export const runtimeAimUpperAngle = 100;
export const activeAimAnchorAngles = [25, 50, 75, 100] as const;

export const baseArrowRotation = [Math.PI / 2, 0, Math.PI / 2] as const;
export const baseArrowRotationEuler = new Euler(...baseArrowRotation, "XYZ");
export const baseArrowRotationQuaternion = new Quaternion().setFromEuler(baseArrowRotationEuler);

export const arrowTailModelCenter = new Vector3(
  0.0008706686397442419,
  -0.015190651019407104,
  28.92053985595703,
);
export const arrowTipModelCenter = new Vector3(0, 0, -15.973344802856445);
export const arrowScale = new Vector3(0.82, 0.82, 1.23);
export const arrowForwardAxis = new Vector3(0, 0, -1);

export const miniGameCharacterGlbPath = "/models/character-512-rig-25000poly-compressed.glb";
export const miniGameCharacterStagePosition = new Vector3(-1.48, 0, 0.16);
export const miniGameCharacterStageHeight = 1.82;
export const miniGameCharacterStageFloorY = -1.94;
export const miniGameCharacterSupportsProceduralBoneTranslation = true;
export const miniGameCharacterAimLift = 0.46;
export const miniGameCharacterAimTargetLocalOffset = new Vector3(0, 0, 1.02);
export const miniGameCharacterAimPitchDown = 0.24;
export const miniGameCharacterAimPitchUp = 0.34;
export const miniGameTargetGlbPath = "/models/wooden-archery-target-512-2500poly.glb";

export const targetVisualHeight = 0.96;
export const targetVisualRotationY = Math.PI / 2;
export const targetBaseRotationY = Math.PI + 0.395;
export const targetWorldBasePosition = new Vector3(2.08, -0.02, 1.45);
export const targetWorldVerticalOffset = -0.24;
export const targetWorldPosition = targetWorldBasePosition
  .clone()
  .add(new Vector3(0, targetWorldVerticalOffset, 0));
export const targetFrontNormal = new Vector3(1, 0, 0)
  .applyAxisAngle(new Vector3(0, 1, 0), targetBaseRotationY)
  .normalize();
export const targetHitRadius = 0.32;
export const targetHalfDepth = 0.015;
export const targetVisualDepthOffset = -0.30;
export const targetFrontPlaneLocalPosition = new Vector3(-0.280, 0.24, 0.380);
export const targetVisualCenterLocalPosition = new Vector3(
  targetHalfDepth + targetVisualDepthOffset,
  targetFrontPlaneLocalPosition.y,
  targetFrontPlaneLocalPosition.z,
);
export const targetFrontPlaneCenter = targetWorldPosition
  .clone()
  .add(targetFrontPlaneLocalPosition.clone().applyAxisAngle(new Vector3(0, 1, 0), targetBaseRotationY));
export const targetArrowEmbedDepth = 0.126;
export const targetHitHaloVisualOffset = 0.028;
export const targetHitHaloInnerRadius = targetHitRadius * 0.78;
export const targetHitHaloOuterRadius = targetHitRadius * 1.04;
export const targetHitHaloFillRadius = targetHitRadius * 0.97;
export const targetBackGlowOffset = 0.022;
export const targetBackGlowPlaneSize = targetHitRadius * 4.2;
export const targetVisualLocalOffset = new Vector3(targetVisualDepthOffset, 0.12, 0.34);

export const showTargetHitDebugHalo = false;
export const showPredictedImpactDebugMarker = false;
export const showMiniGameDebugPanel = false;

function buildMiniGameSceneProfile({
  characterStageHeight,
  characterStagePosition,
  targetAimLift,
  targetAimLocalOffset,
  targetArrowEmbedDepthOverride,
  targetImpactLocalOffset,
  targetCollisionWorldBasePosition,
  targetCollisionScaleMultiplier,
  targetScaleMultiplier,
  targetWorldBasePosition,
}: {
  characterStageHeight: number;
  characterStagePosition: Vector3;
  targetAimLift?: number;
  targetAimLocalOffset?: Vector3;
  targetArrowEmbedDepthOverride?: number;
  targetImpactLocalOffset?: Vector3;
  targetCollisionWorldBasePosition?: Vector3;
  targetCollisionScaleMultiplier?: number;
  targetScaleMultiplier: number;
  targetWorldBasePosition: Vector3;
}): MiniGameSceneProfile {
  const collisionScaleMultiplier =
    targetCollisionScaleMultiplier ?? targetScaleMultiplier;
  const sceneTargetWorldPosition = targetWorldBasePosition
    .clone()
    .add(new Vector3(0, targetWorldVerticalOffset, 0));
  const sceneTargetCollisionWorldPosition = (
    targetCollisionWorldBasePosition ?? targetWorldBasePosition
  )
    .clone()
    .add(new Vector3(0, targetWorldVerticalOffset, 0));
  const sceneTargetFrontPlaneLocalPosition =
    targetFrontPlaneLocalPosition.clone().multiplyScalar(collisionScaleMultiplier);
  const sceneTargetFrontPlaneCenter = sceneTargetCollisionWorldPosition
    .clone()
    .add(
      sceneTargetFrontPlaneLocalPosition
        .clone()
        .applyAxisAngle(new Vector3(0, 1, 0), targetBaseRotationY),
    );

  return {
    targetAimLift: targetAimLift ?? miniGameCharacterAimLift,
    targetAimLocalOffset:
      targetAimLocalOffset?.clone() ?? miniGameCharacterAimTargetLocalOffset.clone(),
    targetImpactLocalOffset: targetImpactLocalOffset?.clone() ?? new Vector3(0, 0, 0),
    characterStageHeight,
    characterStagePosition: characterStagePosition.clone(),
    targetArrowEmbedDepth:
      targetArrowEmbedDepthOverride ?? targetArrowEmbedDepth * collisionScaleMultiplier,
    targetBackGlowOffset: targetBackGlowOffset * targetScaleMultiplier,
    targetBackGlowPlaneSize: targetBackGlowPlaneSize * targetScaleMultiplier,
    targetBaseRotationY,
    targetFrontNormal: targetFrontNormal.clone(),
    targetFrontPlaneCenter: sceneTargetFrontPlaneCenter,
    targetFrontPlaneLocalPosition: sceneTargetFrontPlaneLocalPosition,
    targetHitHaloFillRadius: targetHitHaloFillRadius * targetScaleMultiplier,
    targetHitHaloInnerRadius: targetHitHaloInnerRadius * targetScaleMultiplier,
    targetHitHaloOuterRadius: targetHitHaloOuterRadius * targetScaleMultiplier,
    targetHitHaloVisualOffset: targetHitHaloVisualOffset * targetScaleMultiplier,
    targetHitRadius: targetHitRadius * collisionScaleMultiplier,
    targetVisualCenterLocalPosition: targetVisualCenterLocalPosition
      .clone()
      .multiplyScalar(targetScaleMultiplier),
    targetVisualHeight: targetVisualHeight * targetScaleMultiplier,
    targetVisualLocalOffset: targetVisualLocalOffset.clone().multiplyScalar(targetScaleMultiplier),
    targetWorldPosition: sceneTargetWorldPosition,
  };
}

export const desktopMiniGameSceneProfile = buildMiniGameSceneProfile({
  characterStageHeight: miniGameCharacterStageHeight,
  characterStagePosition: miniGameCharacterStagePosition,
  targetScaleMultiplier: 1,
  targetWorldBasePosition,
});

export const tabletMiniGameSceneProfile = buildMiniGameSceneProfile({
  characterStageHeight: miniGameCharacterStageHeight * 1.12,
  characterStagePosition: new Vector3(-0.92, -0.68, 0.16),
  targetScaleMultiplier: 1.08,
  targetCollisionScaleMultiplier: 1.24,
  targetCollisionWorldBasePosition: new Vector3(1.56, -0.62, 1.45),
  targetWorldBasePosition: new Vector3(1.56, -0.62, 1.45),
});

export const mobileMiniGameSceneProfile = buildMiniGameSceneProfile({
  characterStageHeight: miniGameCharacterStageHeight * 1.425,
  characterStagePosition: new Vector3(-0.46, -0.76, 0.16),
  targetAimLift: 1.18,
  targetAimLocalOffset: miniGameCharacterAimTargetLocalOffset,
  targetArrowEmbedDepthOverride: -0.11,
  targetImpactLocalOffset: new Vector3(0, 0, -0.4),
  targetScaleMultiplier: 1.32,
  targetCollisionScaleMultiplier: 1.58,
  targetCollisionWorldBasePosition: new Vector3(1.82, 0.12, 1.45),
  targetWorldBasePosition: new Vector3(1.82, 0.12, 1.45),
});

export const characterStageRotationY = Math.PI / 2;
export const projectileLaunchSpeed = 5.9;
export const projectileGravity = 2.22;
export const projectileRotationFollow = 8.5;
export const hitAdvanceDelayMs = 780;

export const bowHandTransform = {
  position: [-1.15, 4.5, 1.5],
  rotation: [Math.PI - 0.08, -0.18, -Math.PI / 2 + 0.22],
  scale: 0.55016,
} as const;

export const baseArrowHandTransform = {
  // Retuned for the compressed GLB character so the nocked arrow sits on the bow at baseline.
  position: [2.08, 1.96, 0.42],
  rotation: [Math.PI / 2, 0, Math.PI / 2],
} as const;

export const baseArrowPivotQuaternion = new Quaternion()
  .setFromEuler(new Euler(...baseArrowHandTransform.rotation, "XYZ"))
  .multiply(baseArrowRotationQuaternion.clone().invert());

export const currentCharacterAngleBoneData =
  currentCharacterAngleBoneDump as FullDrawBoneDumpData;
export const currentCharacterAimBoneNames = Object.keys(
  currentCharacterAngleBoneData.bones,
) as ProceduralAimBoneName[];

export const currentCharacterAimBoneCache = Object.fromEntries(
  Object.entries(currentCharacterAngleBoneData.bones).map(([boneName, boneData]) => [
    boneName,
    {
      absolute: Object.fromEntries(
        Object.entries(boneData.absolute).map(([angleKey, sample]) => [
          angleKey,
          sample
            ? {
                position: new Vector3(sample.position.x, sample.position.y, sample.position.z),
                quaternion: new Quaternion(
                  sample.quaternion.x,
                  sample.quaternion.y,
                  sample.quaternion.z,
                  sample.quaternion.w,
                ),
              }
            : null,
        ]),
      ) as Record<AimAnchorAngleKey, { position: Vector3; quaternion: Quaternion } | null>,
    },
  ]),
) as CachedFullDrawBoneData;
