import { Vector3 } from "three";
import {
  arrowTipModelCenter,
  projectileGravity,
  projectileLaunchSpeed,
} from "@/features/calculator/lib/mini-game/constants";
import {
  getArrowFlightQuaternion,
  getArrowModelOffset,
  getArrowTipWorldFromTransform,
} from "@/features/calculator/lib/mini-game/arrowTransforms";
import type {
  ArrowSample,
  MiniGameSceneProfile,
  PredictedImpactMetrics,
} from "@/features/calculator/lib/mini-game/types";

const targetRotationAxis = new Vector3(0, 1, 0);

export function getTargetLocalPoint(worldPoint: Vector3, sceneProfile: MiniGameSceneProfile) {
  return worldPoint.clone().sub(sceneProfile.targetWorldPosition).applyAxisAngle(
    targetRotationAxis,
    -sceneProfile.targetBaseRotationY,
  );
}

export function getTargetWorldPoint(localPoint: Vector3, sceneProfile: MiniGameSceneProfile) {
  return sceneProfile.targetWorldPosition.clone().add(
    localPoint.clone().applyAxisAngle(targetRotationAxis, sceneProfile.targetBaseRotationY),
  );
}

export function getPointOnSegmentAtPlane(
  start: Vector3,
  end: Vector3,
  planePoint: Vector3,
  planeNormal: Vector3,
) {
  const segment = end.clone().sub(start);
  const denominator = segment.dot(planeNormal);

  if (Math.abs(denominator) <= 1e-6) {
    return null;
  }

  const t = planePoint.clone().sub(start).dot(planeNormal) / denominator;

  if (t < 0 || t > 1) {
    return null;
  }

  return start.clone().lerp(end, t);
}

export function getPredictedImpactMetrics(
  sample: ArrowSample,
  sceneProfile: MiniGameSceneProfile,
) {
  const position = new Vector3(...sample.position).addScaledVector(
    new Vector3(...sample.direction),
    0.18,
  );
  const velocity = new Vector3(...sample.direction).multiplyScalar(projectileLaunchSpeed);
  const scale = new Vector3(...sample.scale);
  let previousTip = getArrowTipWorldFromTransform(
    position,
    getArrowFlightQuaternion(velocity),
    scale,
  );

  for (let step = 0; step < 240; step += 1) {
    velocity.y -= projectileGravity / 120;
    position.addScaledVector(velocity, 1 / 120);

    const collisionQuaternion = getArrowFlightQuaternion(velocity);
    const currentTip = getArrowTipWorldFromTransform(position, collisionQuaternion, scale);
    const hitPoint = getPointOnSegmentAtPlane(
      previousTip,
      currentTip,
      sceneProfile.targetFrontPlaneCenter,
      sceneProfile.targetFrontNormal,
    );

    if (hitPoint) {
      const targetLocalPoint = getTargetLocalPoint(hitPoint, sceneProfile).add(
        sceneProfile.targetImpactLocalOffset,
      );
      const offsetFromCenter = targetLocalPoint
        .clone()
        .sub(sceneProfile.targetFrontPlaneLocalPosition);
      const distanceToCenter = offsetFromCenter.length();

      return {
        distanceToCenter,
        hitPointInTargetSpace: [targetLocalPoint.x, targetLocalPoint.y, targetLocalPoint.z],
        isInsideHitZone: distanceToCenter <= sceneProfile.targetHitRadius,
        offsetFromCenter: [offsetFromCenter.x, offsetFromCenter.y, offsetFromCenter.z],
      } satisfies PredictedImpactMetrics;
    }

    previousTip = currentTip;
  }

  return null;
}

export function getImpactPositionFromHitPoint(
  hitPoint: Vector3,
  impactDirection: Vector3,
  scale: Vector3,
  embedDepth: number,
  embedNormal?: Vector3,
) {
  const impactQuaternion = getArrowFlightQuaternion(impactDirection);
  const tipOffset = getArrowModelOffset(arrowTipModelCenter, impactQuaternion, scale);
  const embedAxis =
    embedNormal && embedNormal.lengthSq() > 1e-6
      ? embedNormal.clone().normalize()
      : impactDirection.clone().normalize();
  const impactPosition = hitPoint
    .clone()
    .sub(tipOffset)
    .addScaledVector(embedAxis, embedDepth);

  return {
    impactPosition,
    impactQuaternion,
  };
}
