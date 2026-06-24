"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three-stdlib";
import { MeshStandardMaterial, Vector3 } from "three";
import {
  arrowScale,
  projectileGravity,
  projectileLaunchSpeed,
  projectileRotationFollow,
} from "@/features/calculator/lib/mini-game/constants";
import {
  getArrowFlightQuaternion,
  getArrowTipWorldFromTransform,
} from "@/features/calculator/lib/mini-game/arrowTransforms";
import {
  getImpactPositionFromHitPoint,
  getPointOnSegmentAtPlane,
  getTargetLocalPoint,
  getTargetWorldPoint,
} from "@/features/calculator/lib/mini-game/projectilePhysics";
import { applyTemporaryMaterial, forceArrowInFront } from "@/features/calculator/lib/mini-game/sceneUtils";
import type {
  ArrowFlightState,
  ArrowImpactState,
  MiniGameSceneProfile,
} from "@/features/calculator/lib/mini-game/types";

export function MiniGameProjectile({
  flight,
  onHit,
  onComplete,
  sceneProfile,
}: {
  flight: ArrowFlightState;
  onHit: (impact: ArrowImpactState) => void;
  onComplete: () => void;
  sceneProfile: MiniGameSceneProfile;
}) {
  const arrowSource = useLoader(OBJLoader, "/models/arrow.obj");
  const projectile = useMemo(() => {
    const arrow = arrowSource.clone(true);

    arrow.name = "mini-game-projectile-arrow";
    arrow.scale.copy(arrowScale);
    applyTemporaryMaterial(
      arrow,
      new MeshStandardMaterial({
        color: "#7c5a3e",
        roughness: 0.58,
        metalness: 0.1,
      }),
    );
    forceArrowInFront(arrow);

    return arrow;
  }, [arrowSource]);
  const positionRef = useRef(new Vector3(...flight.position));
  const velocityRef = useRef(new Vector3(...flight.direction).multiplyScalar(projectileLaunchSpeed));
  const quaternionRef = useRef(getArrowFlightQuaternion(new Vector3(...flight.direction)));
  const elapsedRef = useRef(0);
  const previousTipRef = useRef(new Vector3());
  const collisionScaleRef = useRef(new Vector3(...flight.scale));

  useEffect(() => {
    positionRef.current.set(...flight.position);
    velocityRef.current.set(...flight.direction).multiplyScalar(projectileLaunchSpeed);
    quaternionRef.current.copy(getArrowFlightQuaternion(new Vector3(...flight.direction)));
    collisionScaleRef.current.set(...flight.scale);
    elapsedRef.current = 0;
    projectile.position.copy(positionRef.current);
    projectile.quaternion.copy(quaternionRef.current);
    projectile.scale.set(...flight.scale);
    projectile.updateMatrixWorld(true);
    previousTipRef.current.copy(
      getArrowTipWorldFromTransform(
        positionRef.current,
        quaternionRef.current,
        collisionScaleRef.current,
      ),
    );
  }, [flight, projectile]);

  useFrame((_, delta) => {
    elapsedRef.current += delta;
    velocityRef.current.y -= projectileGravity * delta;
    positionRef.current.addScaledVector(velocityRef.current, delta);
    const collisionQuaternion = getArrowFlightQuaternion(velocityRef.current);
    quaternionRef.current.slerp(
      collisionQuaternion,
      1 - Math.exp(-projectileRotationFollow * delta),
    );

    projectile.position.copy(positionRef.current);
    projectile.quaternion.copy(quaternionRef.current);
    projectile.scale.set(...flight.scale);
    projectile.updateMatrixWorld(true);

    const currentTip = getArrowTipWorldFromTransform(
      positionRef.current,
      collisionQuaternion,
      collisionScaleRef.current,
    );
    const hitPoint = getPointOnSegmentAtPlane(
      previousTipRef.current,
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

      if (offsetFromCenter.length() > sceneProfile.targetHitRadius) {
        previousTipRef.current.copy(currentTip);
        return;
      }

      const calibratedHitPoint = getTargetWorldPoint(targetLocalPoint, sceneProfile);
      const impactDirection =
        velocityRef.current.lengthSq() > 1e-6
          ? velocityRef.current.clone().normalize()
          : sceneProfile.targetFrontNormal.clone().negate();
      const impactScale = new Vector3(...flight.scale);
      const { impactPosition, impactQuaternion } = getImpactPositionFromHitPoint(
        calibratedHitPoint,
        impactDirection,
        impactScale,
        sceneProfile.targetArrowEmbedDepth,
        sceneProfile.targetFrontNormal.clone().negate(),
      );

      onHit({
        direction: [impactDirection.x, impactDirection.y, impactDirection.z],
        id: flight.id,
        position: [impactPosition.x, impactPosition.y, impactPosition.z],
        quaternion: [
          impactQuaternion.x,
          impactQuaternion.y,
          impactQuaternion.z,
          impactQuaternion.w,
        ],
        scale: [impactScale.x, impactScale.y, impactScale.z],
      });
      onComplete();
      return;
    }

    previousTipRef.current.copy(currentTip);

    if (elapsedRef.current > 1.3 || positionRef.current.y < -2.6 || positionRef.current.x > 8.5) {
      onComplete();
    }
  });

  return <primitive object={projectile} />;
}
