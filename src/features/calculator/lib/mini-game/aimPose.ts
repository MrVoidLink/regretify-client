import { MathUtils, Quaternion, Vector3 } from "three";
import {
  activeAimAnchorAngles,
  aimDragRange,
  baselineAimAngle,
  currentCharacterAimBoneCache,
  runtimeAimLowerAngle,
  runtimeAimUpperAngle,
} from "@/features/calculator/lib/mini-game/constants";
import type {
  AimAnchorAngle,
  AimAnchorAngleKey,
  AimInterpolationState,
  ProceduralAimBoneName,
} from "@/features/calculator/lib/mini-game/types";
import type { Bone } from "three";

export function findNearestAimAnchor(targetAngle: number) {
  return activeAimAnchorAngles.reduce<AimAnchorAngle>((closestAngle, anchorAngle) => {
    return Math.abs(anchorAngle - targetAngle) < Math.abs(closestAngle - targetAngle)
      ? anchorAngle
      : closestAngle;
  }, baselineAimAngle);
}

export function getTargetAimAngle(aimAngle: number) {
  if (aimAngle >= 0) {
    return MathUtils.mapLinear(aimAngle, 0, aimDragRange, baselineAimAngle, runtimeAimUpperAngle);
  }

  return MathUtils.mapLinear(aimAngle, -aimDragRange, 0, runtimeAimLowerAngle, baselineAimAngle);
}

export function getAimInterpolationState(targetAngle: number): AimInterpolationState {
  const minAngle = activeAimAnchorAngles[0];
  const maxAngle = activeAimAnchorAngles[activeAimAnchorAngles.length - 1];
  const clampedAngle = MathUtils.clamp(targetAngle, minAngle, maxAngle);
  let lowerAngle: AimAnchorAngle = activeAimAnchorAngles[0];
  let upperAngle: AimAnchorAngle = activeAimAnchorAngles[activeAimAnchorAngles.length - 1];

  for (let index = 0; index < activeAimAnchorAngles.length - 1; index += 1) {
    const currentAngle = activeAimAnchorAngles[index];
    const nextAngle = activeAimAnchorAngles[index + 1];

    if (clampedAngle >= currentAngle && clampedAngle <= nextAngle) {
      lowerAngle = currentAngle;
      upperAngle = nextAngle;
      break;
    }
  }

  if (lowerAngle === upperAngle) {
    return {
      easedAlpha: 0,
      lowerAngle,
      upperAngle,
    };
  }

  const alpha = (clampedAngle - lowerAngle) / (upperAngle - lowerAngle);

  return {
    easedAlpha: MathUtils.smootherstep(alpha, 0, 1),
    lowerAngle,
    upperAngle,
  };
}

function getCachedAimSample(boneName: ProceduralAimBoneName, angle: AimAnchorAngle) {
  return currentCharacterAimBoneCache[boneName]?.absolute[String(angle) as AimAnchorAngleKey] ?? null;
}

function applyAimStateToBone(
  bone: Bone,
  boneName: ProceduralAimBoneName,
  interpolationState: AimInterpolationState,
  allowTranslation: boolean,
) {
  const lowerSample = getCachedAimSample(boneName, interpolationState.lowerAngle);
  const upperSample = getCachedAimSample(boneName, interpolationState.upperAngle);

  if (!lowerSample || !upperSample) {
    return false;
  }

  if (interpolationState.lowerAngle === interpolationState.upperAngle) {
    if (allowTranslation) {
      bone.position.copy(lowerSample.position);
    }

    bone.quaternion.copy(lowerSample.quaternion);
    return true;
  }

  if (allowTranslation) {
    bone.position.lerpVectors(
      lowerSample.position,
      upperSample.position,
      interpolationState.easedAlpha,
    );
  }

  bone.quaternion.copy(lowerSample.quaternion).slerp(
    upperSample.quaternion,
    interpolationState.easedAlpha,
  );

  return true;
}

export function applyProceduralAim(
  proceduralBoneNames: ProceduralAimBoneName[],
  controlledBones: Partial<Record<ProceduralAimBoneName, Bone>>,
  targetAngle: number,
  influence: number,
  allowTranslation: boolean,
) {
  if (influence <= 0) {
    return;
  }

  const interpolationState = getAimInterpolationState(targetAngle);

  for (const boneName of proceduralBoneNames) {
    const bone = controlledBones[boneName];

    if (!bone) {
      continue;
    }

    applyAimStateToBone(bone, boneName, interpolationState, allowTranslation);
  }
}

export function applyReleaseAimOffset(
  proceduralBoneNames: ProceduralAimBoneName[],
  controlledBones: Partial<Record<ProceduralAimBoneName, Bone>>,
  releaseAngle: number,
  influence: number,
  allowTranslation: boolean,
) {
  if (influence <= 0 || Math.abs(releaseAngle - baselineAimAngle) <= 0.001) {
    return;
  }

  const baselineInterpolationState = getAimInterpolationState(baselineAimAngle);
  const releaseInterpolationState = getAimInterpolationState(releaseAngle);
  const deltaQuaternion = new Quaternion();
  const deltaPosition = new Vector3();
  const releasePosition = new Vector3();
  const releaseQuaternion = new Quaternion();
  const weightedDeltaQuaternion = new Quaternion();

  for (const boneName of proceduralBoneNames) {
    const bone = controlledBones[boneName];

    if (!bone) {
      continue;
    }

    const baselineSample = getCachedAimSample(boneName, baselineInterpolationState.lowerAngle);
    const releaseLowerSample = getCachedAimSample(boneName, releaseInterpolationState.lowerAngle);
    const releaseUpperSample = getCachedAimSample(boneName, releaseInterpolationState.upperAngle);

    if (!baselineSample || !releaseLowerSample || !releaseUpperSample) {
      continue;
    }

    if (releaseInterpolationState.lowerAngle === releaseInterpolationState.upperAngle) {
      releasePosition.copy(releaseLowerSample.position);
      releaseQuaternion.copy(releaseLowerSample.quaternion);
    } else {
      releasePosition.lerpVectors(
        releaseLowerSample.position,
        releaseUpperSample.position,
        releaseInterpolationState.easedAlpha,
      );
      releaseQuaternion.copy(releaseLowerSample.quaternion).slerp(
        releaseUpperSample.quaternion,
        releaseInterpolationState.easedAlpha,
      );
    }

    deltaQuaternion.copy(baselineSample.quaternion).invert().multiply(releaseQuaternion);
    weightedDeltaQuaternion.identity().slerp(deltaQuaternion, influence);

    if (allowTranslation) {
      deltaPosition.copy(releasePosition).sub(baselineSample.position);
    }

    bone.quaternion.multiply(weightedDeltaQuaternion);

    if (allowTranslation) {
      bone.position.addScaledVector(deltaPosition, influence);
    }
  }
}
