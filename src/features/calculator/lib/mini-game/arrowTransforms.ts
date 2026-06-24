import { Euler, Quaternion, Vector3 } from "three";
import {
  baseArrowRotationQuaternion,
  arrowScale,
  arrowTailModelCenter,
  arrowTipModelCenter,
  arrowForwardAxis,
} from "@/features/calculator/lib/mini-game/constants";
import type { Object3D } from "three";

export function getArrowTailOffset(
  rotation: readonly [number, number, number],
  scale: Vector3 = arrowScale,
) {
  return arrowTailModelCenter
    .clone()
    .multiply(scale)
    .applyEuler(new Euler(rotation[0], rotation[1], rotation[2], "XYZ"));
}

export function getArrowModelPointWorld(arrow: Object3D, point: Vector3) {
  return arrow.localToWorld(point.clone());
}

export function getArrowModelOffset(point: Vector3, quaternion: Quaternion, scale: Vector3) {
  return point.clone().multiply(scale).applyQuaternion(quaternion);
}

export function getArrowTipWorldFromTransform(
  position: Vector3,
  quaternion: Quaternion,
  scale: Vector3,
) {
  return position.clone().add(getArrowModelOffset(arrowTipModelCenter, quaternion, scale));
}

export function getArrowFlightQuaternion(direction: Vector3) {
  const normalizedDirection = direction.clone().normalize();

  if (normalizedDirection.lengthSq() <= 1e-6) {
    return new Quaternion();
  }

  return new Quaternion().setFromUnitVectors(arrowForwardAxis, normalizedDirection);
}

export function getPivotLocalQuaternionForTipTarget(
  rightHand: Object3D,
  tailWorld: Vector3,
  desiredTipWorld: Vector3,
) {
  const desiredDirectionWorld = desiredTipWorld.clone().sub(tailWorld);

  if (desiredDirectionWorld.lengthSq() <= 1e-6) {
    return null;
  }

  const desiredArrowWorldQuaternion = new Quaternion().setFromUnitVectors(
    arrowForwardAxis,
    desiredDirectionWorld.normalize(),
  );
  const desiredPivotWorldQuaternion = desiredArrowWorldQuaternion.multiply(
    baseArrowRotationQuaternion.clone().invert(),
  );
  const rightHandWorldQuaternion = rightHand.getWorldQuaternion(new Quaternion());

  return rightHandWorldQuaternion.invert().multiply(desiredPivotWorldQuaternion);
}

export function getPivotLocalQuaternionForWorldDirection(
  rightHand: Object3D,
  desiredDirectionWorld: Vector3,
) {
  if (desiredDirectionWorld.lengthSq() <= 1e-6) {
    return null;
  }

  const desiredArrowWorldQuaternion = new Quaternion().setFromUnitVectors(
    arrowForwardAxis,
    desiredDirectionWorld.clone().normalize(),
  );
  const desiredPivotWorldQuaternion = desiredArrowWorldQuaternion.multiply(
    baseArrowRotationQuaternion.clone().invert(),
  );
  const rightHandWorldQuaternion = rightHand.getWorldQuaternion(new Quaternion());

  return rightHandWorldQuaternion.invert().multiply(desiredPivotWorldQuaternion);
}
