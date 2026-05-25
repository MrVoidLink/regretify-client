"use client";

import {
  ContactShadows,
  PerspectiveCamera,
  useFBX,
} from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import fullDrawBoneDump from "../../../../../docs/mini-game/full-draw-bone-dump.json";
import type { AnimationAction, AnimationClip } from "three";
import {
  AnimationMixer,
  Box3,
  Bone,
  Euler,
  Group,
  LineBasicMaterial,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  Quaternion,
  SRGBColorSpace,
  Texture,
  TextureLoader,
  Vector3,
} from "three";
import { OBJLoader, SkeletonUtils } from "three-stdlib";
import type { CalculatorMarketId } from "@/features/calculator/types";

const aimDragRange = 18;
const nockedPoseStart = 0;
const drawAimPoseEnd = 0.40625;
const shotReleaseEnd = 1;
const drawDragWidthFactor = 0.34;
const aimDragHeightFactor = 0.24;
const releaseResetDelayMs = 220;
const releaseAimRecoveryRatio = 0.42;
const aimActivationEpsilon = 0.0005;
const aimPoseFollowStrength = 14;
const runtimeAimLowerAngle = 25;
const baselineAimAngle = 50;
const runtimeAimUpperAngle = 100;
const activeAimAnchorAngles = [25, 50, 75, 100] as const;
const fullDrawBoneNames = Object.keys(fullDrawBoneDump.bones);

const baseArrowRotation = [Math.PI / 2, 0, Math.PI / 2] as const;
const baseArrowRotationEuler = new Euler(...baseArrowRotation, "XYZ");
const baseArrowRotationQuaternion = new Quaternion().setFromEuler(baseArrowRotationEuler);

const arrowTailModelCenter = new Vector3(
  0.0008706686397442419,
  -0.015190651019407104,
  28.92053985595703,
);
const arrowTipModelCenter = new Vector3(0, 0, -15.973344802856445);
const arrowScale = new Vector3(0.82, 0.82, 1.23);
const arrowForwardAxis = new Vector3(0, 0, -1);
// Legacy fallback: /models/shooting-arrow-50-trim24-skin-test.fbx
const miniGameCharacterFbxPath = "/models/playground-shooting-arrow-1k-rig.fbx";
const miniGameCharacterUsesLegacyProceduralAim = true;
const miniGameCharacterSupportsProceduralBoneTranslation = true;
const archeryTarget4kObjPath =
  "/models/playground-archery-set-obj-4k/wooden+archery+target+3d+model.obj";
const archeryTarget4kBaseColorPath =
  "/models/playground-archery-set-obj-4k/wooden+archery+target+3d+model_basecolor.jpg";
const archeryTarget4kNormalPath =
  "/models/playground-archery-set-obj-4k/wooden+archery+target+3d+model_normal.jpg";
const targetVisualHeight = 0.88;
const targetBaseRotationY = Math.PI + 0.22;
const targetWorldPosition = new Vector3(2.08, -0.1, 1.45);
const targetHitCenterOffset = new Vector3(0, 0.12, -0.02);
const targetFrontNormal = new Vector3(1, 0, 0)
  .applyAxisAngle(new Vector3(0, 1, 0), targetBaseRotationY)
  .normalize();
const targetHitCenter = targetWorldPosition.clone().add(targetHitCenterOffset);
const targetHitRadius = 0.32;
const targetHalfDepth = 0.015;
const targetFrontPlaneCenter = targetHitCenter
  .clone()
  .addScaledVector(targetFrontNormal, targetHalfDepth);
const targetArrowEmbedDepth = 0.055;
const characterStageRotationY = Math.PI / 2;
const projectileLaunchSpeed = 7.25;
const projectileGravity = 3.35;
const projectileRotationFollow = 8.5;
const hitAdvanceDelayMs = 780;
const upperAimArrowCorrectionStart = 88;
const upperAimArrowCorrectionStrength = 0.58;

const baseArrowHandTransform = {
  // Approved 50-angle baseline from the earlier tail-pivot pass.
  position: [2.9125, 3.2855, 1.2007],
  rotation: [Math.PI / 2, 0, Math.PI / 2],
} as const;
const baseArrowPivotQuaternion = new Quaternion().setFromEuler(
  new Euler(...baseArrowHandTransform.rotation, "XYZ"),
).multiply(baseArrowRotationQuaternion.clone().invert());

type AimAnchorAngle = 25 | 50 | 75 | 100;
type ProceduralAimBoneName = keyof typeof fullDrawBoneDump.bones;
type AimAnchorAngleKey = `${AimAnchorAngle}`;
type FullDrawBoneSample = {
  position: { x: number; y: number; z: number };
  quaternion: { x: number; y: number; z: number; w: number };
};
type FullDrawBoneDumpData = {
  bones: Record<
    string,
    {
      absolute: Record<AimAnchorAngleKey, FullDrawBoneSample | null>;
    }
  >;
};

const fullDrawBoneData = fullDrawBoneDump as FullDrawBoneDumpData;

type CachedFullDrawBoneSample = {
  position: Vector3;
  quaternion: Quaternion;
};

type CachedFullDrawBoneData = Record<
  string,
  {
    absolute: Record<AimAnchorAngleKey, CachedFullDrawBoneSample | null>;
  }
>;

type AimInterpolationState = {
  easedAlpha: number;
  lowerAngle: AimAnchorAngle;
  upperAngle: AimAnchorAngle;
};

const fullDrawBoneCache = Object.fromEntries(
  Object.entries(fullDrawBoneData.bones).map(([boneName, boneData]) => [
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
      ) as Record<AimAnchorAngleKey, CachedFullDrawBoneSample | null>,
    },
  ]),
) as CachedFullDrawBoneData;

type CharacterRig = {
  action: AnimationAction;
  allowProceduralBoneTranslation: boolean;
  clip: AnimationClip;
  controlledBones: Partial<Record<ProceduralAimBoneName, Bone>>;
  mixer: AnimationMixer;
  proceduralBoneNames: ProceduralAimBoneName[];
  scene: Object3D;
};

type ArrowSample = {
  direction: [number, number, number];
  position: [number, number, number];
  quaternion: [number, number, number, number];
  scale: [number, number, number];
};

type ArrowFlightState = ArrowSample & {
  id: number;
};

type ArrowImpactState = ArrowSample & {
  id: number;
};

type ArrowAlignmentMetrics = {
  activeTipInBowSpace: [number, number, number];
  baselineTipInBowSpace: [number, number, number];
  tailToPinchDistance: number;
  tipDeltaFromBaseline: [number, number, number];
};

type DrawDragState = {
  x: number;
  startClipProgress: number;
};

type AimDragState = {
  y: number;
  startAimAngle: number;
};

function findPlayableClip(model: { animations: AnimationClip[] }) {
  return model.animations.find((clip) => clip.duration > 0.05) ?? model.animations[0] ?? null;
}

function findBoneByName(scene: Object3D, boneName: string) {
  let match: Bone | null = null;

  scene.traverse((child) => {
    if (match || !("isBone" in child) || !child.isBone || child.name !== boneName) {
      return;
    }

    match = child as Bone;
  });

  return match;
}

function findNearestAimAnchor(targetAngle: number) {
  return activeAimAnchorAngles.reduce<AimAnchorAngle>((closestAngle, anchorAngle) => {
    return Math.abs(anchorAngle - targetAngle) < Math.abs(closestAngle - targetAngle)
      ? anchorAngle
      : closestAngle;
  }, baselineAimAngle);
}

function getTargetAimAngle(aimAngle: number) {
  if (aimAngle >= 0) {
    return MathUtils.mapLinear(aimAngle, 0, aimDragRange, baselineAimAngle, runtimeAimUpperAngle);
  }

  return MathUtils.mapLinear(aimAngle, -aimDragRange, 0, runtimeAimLowerAngle, baselineAimAngle);
}

function getAimInterpolationState(targetAngle: number): AimInterpolationState {
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
  return fullDrawBoneCache[boneName]?.absolute[String(angle) as AimAnchorAngleKey] ?? null;
}

function applyAimStateToBone(
  bone: Bone,
  boneName: ProceduralAimBoneName,
  interpolationState: AimInterpolationState,
  allowTranslation: boolean,
) {
  const lowerSample =
    getCachedAimSample(boneName, interpolationState.lowerAngle);
  const upperSample =
    getCachedAimSample(boneName, interpolationState.upperAngle);

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

function applyProceduralAim(
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

function applyReleaseAimOffset(
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

    deltaQuaternion
      .copy(baselineSample.quaternion)
      .invert()
      .multiply(releaseQuaternion);
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

function getArrowTailOffset(
  rotation: readonly [number, number, number],
  scale: Vector3 = arrowScale,
) {
  return arrowTailModelCenter
    .clone()
    .multiply(scale)
    .applyEuler(new Euler(rotation[0], rotation[1], rotation[2], "XYZ"));
}

function getArrowModelPointWorld(arrow: Object3D, point: Vector3) {
  return arrow.localToWorld(point.clone());
}

function getArrowModelOffset(point: Vector3, quaternion: Quaternion, scale: Vector3) {
  return point.clone().multiply(scale).applyQuaternion(quaternion);
}

function getArrowFlightQuaternion(direction: Vector3) {
  const normalizedDirection = direction.clone().normalize();

  if (normalizedDirection.lengthSq() <= 1e-6) {
    return new Quaternion();
  }

  return new Quaternion().setFromUnitVectors(arrowForwardAxis, normalizedDirection);
}

function getPivotLocalQuaternionForTipTarget(
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

function getPointOnSegmentAtPlane(
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

function applyTemporaryMaterial(source: Object3D, material: MeshStandardMaterial) {
  source.traverse((child) => {
    if (child instanceof Mesh) {
      child.material = material.clone();
      child.castShadow = true;
      child.receiveShadow = true;
      return;
    }

    if ("isLine" in child && child.isLine) {
      const lineChild = child as unknown as { material: LineBasicMaterial };

      lineChild.material = new LineBasicMaterial({
        color: material.color,
      });
    }
  });
}

function forceArrowInFront(source: Object3D) {
  source.renderOrder = 20;

  source.traverse((child) => {
    child.renderOrder = 20;

    if (child instanceof Mesh) {
      const material = child.material;

      if (Array.isArray(material)) {
        for (const entry of material) {
          entry.depthTest = false;
          entry.depthWrite = false;
        }

        return;
      }

      material.depthTest = false;
      material.depthWrite = false;
    }
  });
}

function enableShadowCasting(source: Object3D) {
  source.traverse((child) => {
    if (child instanceof Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
}

function applyTargetTextures(source: Object3D, mapTexture: Texture, normalTexture: Texture) {
  source.traverse((child) => {
    if (!(child instanceof Mesh)) {
      return;
    }

    child.material = new MeshStandardMaterial({
      color: "#ffffff",
      map: mapTexture,
      normalMap: normalTexture,
      roughness: 0.86,
      metalness: 0.04,
    });
    child.castShadow = true;
    child.receiveShadow = true;
  });
}

function attachBowToLeftHand(scene: Object3D, bowSource: Object3D) {
  const leftHand = scene.getObjectByName("mixamorigLeftHand");

  if (!leftHand) {
    return;
  }

  const bow = bowSource.clone(true);

  bow.name = "mini-game-bow";
  bow.position.set(-1.9, 6.5, 0.60);
  bow.rotation.set(Math.PI - 0.18, -0.24, -Math.PI / 2 + 0.18);
  bow.scale.setScalar(0.55016);
  applyTemporaryMaterial(
    bow,
    new MeshStandardMaterial({
      color: "#6f4b33",
      roughness: 0.72,
      metalness: 0.08,
    }),
  );

  leftHand.add(bow);
}

function attachArrowToRightHand(
  scene: Object3D,
  arrowSource: Object3D,
) {
  const rightHand = scene.getObjectByName("mixamorigRightHand");

  if (!rightHand) {
    return;
  }

  const arrowPivot = new Group();
  const arrow = arrowSource.clone(true);
  const transform = baseArrowHandTransform;
  const tailOffset = getArrowTailOffset(baseArrowRotation, arrowScale);

  arrowPivot.name = "mini-game-arrow-pivot";
  arrowPivot.position.set(...transform.position);
  arrowPivot.quaternion.copy(baseArrowPivotQuaternion);
  arrow.name = "mini-game-arrow";
  arrow.position.set(-tailOffset.x, -tailOffset.y, -tailOffset.z);
  arrow.rotation.copy(baseArrowRotationEuler);
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

  arrowPivot.add(arrow);
  rightHand.add(arrowPivot);
}

function ProjectileArrow({
  flight,
  onHit,
  onComplete,
}: {
  flight: ArrowFlightState;
  onHit: (impact: ArrowImpactState) => void;
  onComplete: () => void;
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
  const quaternionRef = useRef(
    getArrowFlightQuaternion(new Vector3(...flight.direction)),
  );
  const elapsedRef = useRef(0);
  const previousTipRef = useRef(new Vector3());

  useEffect(() => {
    positionRef.current.set(...flight.position);
    velocityRef.current.set(...flight.direction).multiplyScalar(projectileLaunchSpeed);
    quaternionRef.current.copy(getArrowFlightQuaternion(new Vector3(...flight.direction)));
    elapsedRef.current = 0;
    projectile.position.copy(positionRef.current);
    projectile.quaternion.copy(quaternionRef.current);
    projectile.scale.set(...flight.scale);
    projectile.updateMatrixWorld(true);
    previousTipRef.current.copy(getArrowModelPointWorld(projectile, arrowTipModelCenter));
  }, [flight, projectile]);

  useFrame((_, delta) => {
    elapsedRef.current += delta;
    velocityRef.current.y -= projectileGravity * delta;
    positionRef.current.addScaledVector(velocityRef.current, delta);
    const targetQuaternion = getArrowFlightQuaternion(velocityRef.current);
    quaternionRef.current.slerp(targetQuaternion, 1 - Math.exp(-projectileRotationFollow * delta));

    projectile.position.copy(positionRef.current);
    projectile.quaternion.copy(quaternionRef.current);
    projectile.scale.set(...flight.scale);
    projectile.updateMatrixWorld(true);

    const currentTip = getArrowModelPointWorld(projectile, arrowTipModelCenter);
    const hitPoint = getPointOnSegmentAtPlane(
      previousTipRef.current,
      currentTip,
      targetFrontPlaneCenter,
      targetFrontNormal,
    );

    if (
      hitPoint &&
      hitPoint.distanceTo(targetFrontPlaneCenter) <= targetHitRadius
    ) {
      const impactDirection = targetFrontNormal.clone().negate();
      const impactQuaternion = getArrowFlightQuaternion(impactDirection);
      const impactScale = new Vector3(...flight.scale);
      const tipOffset = getArrowModelOffset(
        arrowTipModelCenter,
        impactQuaternion,
        impactScale,
      );
      const impactPosition = hitPoint
        .clone()
        .sub(tipOffset)
        .addScaledVector(impactDirection, targetArrowEmbedDepth);

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

function ImpactArrow({ impact }: { impact: ArrowImpactState }) {
  const arrowSource = useLoader(OBJLoader, "/models/arrow.obj");
  const stuckArrow = useMemo(() => {
    const arrow = arrowSource.clone(true);

    arrow.name = "mini-game-impact-arrow";
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

  return (
    <primitive
      object={stuckArrow}
      position={impact.position}
      quaternion={impact.quaternion}
      scale={impact.scale}
    />
  );
}

function TargetModel({ wobbleTrigger }: { wobbleTrigger: number }) {
  const targetSource = useLoader(OBJLoader, archeryTarget4kObjPath);
  const baseColorTexture = useLoader(TextureLoader, archeryTarget4kBaseColorPath);
  const normalTexture = useLoader(TextureLoader, archeryTarget4kNormalPath);
  const groupRef = useRef<Group>(null);
  const wobbleTimeRef = useRef(Number.POSITIVE_INFINITY);
  const targetTextures = useMemo(() => {
    const colorMap = baseColorTexture.clone();
    const normalMap = normalTexture.clone();

    colorMap.colorSpace = SRGBColorSpace;
    colorMap.needsUpdate = true;
    normalMap.needsUpdate = true;

    return { colorMap, normalMap };
  }, [baseColorTexture, normalTexture]);
  const target = useMemo(() => {
    const model = targetSource.clone(true);
    const bounds = new Box3().setFromObject(model);
    const center = bounds.getCenter(new Vector3());
    const size = bounds.getSize(new Vector3());
    const normalizedScale = size.y > 1e-6 ? targetVisualHeight / size.y : 1;

    model.name = "mini-game-target";
    model.position.set(
      -center.x * normalizedScale,
      -center.y * normalizedScale,
      -center.z * normalizedScale,
    );
    model.scale.setScalar(normalizedScale);
    applyTargetTextures(model, targetTextures.colorMap, targetTextures.normalMap);
    enableShadowCasting(model);

    return model;
  }, [targetSource, targetTextures]);

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

    groupRef.current.rotation.set(wobble * 0.24, targetBaseRotationY + yawWobble, wobble);
  });

  return (
    <group
      ref={groupRef}
      position={[targetWorldPosition.x, targetWorldPosition.y, targetWorldPosition.z]}
      rotation={[0, targetBaseRotationY, 0]}
    >
      <primitive object={target} />
    </group>
  );
}

function CharacterModel({
  onAlignmentMetricsChange,
  clipProgress,
  onArrowSample,
  onResolvedAimAngleChange,
  onVisibleAngleChange,
  releaseAimAngle,
  releaseAimBlend,
  releasing,
  showHandArrow,
  targetAngle,
}: {
  onAlignmentMetricsChange: (metrics: ArrowAlignmentMetrics | null) => void;
  clipProgress: number;
  onArrowSample: (sample: ArrowSample | null) => void;
  onResolvedAimAngleChange: (angle: number) => void;
  onVisibleAngleChange: (angle: number) => void;
  releaseAimAngle: number;
  releaseAimBlend: number;
  releasing: boolean;
  showHandArrow: boolean;
  targetAngle: number;
}) {
  const bowModel = useLoader(OBJLoader, "/models/bow.obj");
  const arrowModel = useLoader(OBJLoader, "/models/arrow.obj");
  const characterModel = useFBX(miniGameCharacterFbxPath);
  const rig = useMemo(() => {
    const scene = SkeletonUtils.clone(characterModel);
    const clip = findPlayableClip(characterModel);

    if (!clip) {
      return null;
    }

    attachBowToLeftHand(scene, bowModel);
    attachArrowToRightHand(scene, arrowModel);

    const mixer = new AnimationMixer(scene);
    const action = mixer.clipAction(clip);
    const proceduralBoneNames = (
      miniGameCharacterUsesLegacyProceduralAim ? fullDrawBoneNames : []
    ) as ProceduralAimBoneName[];
    const controlledBones = Object.fromEntries(
      proceduralBoneNames.map((boneName) => [boneName, findBoneByName(scene, boneName)]),
    ) as Partial<Record<ProceduralAimBoneName, Bone>>;

    return {
      action,
      allowProceduralBoneTranslation: miniGameCharacterSupportsProceduralBoneTranslation,
      clip,
      controlledBones,
      mixer,
      proceduralBoneNames,
      scene,
    } satisfies CharacterRig;
  }, [arrowModel, bowModel, characterModel]);
  const smoothedAngleRef = useRef(baselineAimAngle);
  const visibleAngleRef = useRef(baselineAimAngle);
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

    const normalizedProgress = MathUtils.clamp(clipProgress, 0, 1);
    const aimInfluence =
      !releasing &&
      normalizedProgress >= drawAimPoseEnd - aimActivationEpsilon &&
      normalizedProgress <= drawAimPoseEnd + aimActivationEpsilon
        ? 1
        : 0;
    const releaseAimInfluence = releasing ? releaseAimBlend : 0;

    smoothedAngleRef.current =
      aimInfluence > 0
        ? MathUtils.damp(smoothedAngleRef.current, targetAngle, aimPoseFollowStrength, delta)
        : targetAngle;
    onResolvedAimAngleChange(smoothedAngleRef.current);

    const nextVisibleAngle = findNearestAimAnchor(smoothedAngleRef.current);

    if (nextVisibleAngle !== visibleAngleRef.current) {
      visibleAngleRef.current = nextVisibleAngle;
      onVisibleAngleChange(nextVisibleAngle);
    }

    rig.mixer.setTime(normalizedProgress * rig.clip.duration);
    applyProceduralAim(
      rig.proceduralBoneNames,
      rig.controlledBones,
      smoothedAngleRef.current,
      aimInfluence,
      rig.allowProceduralBoneTranslation,
    );
    applyReleaseAimOffset(
      rig.proceduralBoneNames,
      rig.controlledBones,
      releaseAimAngle,
      releaseAimInfluence,
      rig.allowProceduralBoneTranslation,
    );
    rig.scene.updateMatrixWorld(true);

    const activeArrow = rig.scene.getObjectByName("mini-game-arrow") ?? null;
    const activeArrowPivot = rig.scene.getObjectByName("mini-game-arrow-pivot") ?? null;
    const activeBow = rig.scene.getObjectByName("mini-game-bow") ?? null;
    const activeRightHand = rig.scene.getObjectByName("mixamorigRightHand") ?? null;

    if (activeArrowPivot) {
      activeArrowPivot.quaternion.copy(baseArrowPivotQuaternion);
      activeArrowPivot.updateMatrixWorld(true);
      rig.scene.updateMatrixWorld(true);
    }

    if (
      activeArrowPivot &&
      activeBow &&
      activeRightHand &&
      baselineTipInBowSpaceRef.current &&
      smoothedAngleRef.current > upperAimArrowCorrectionStart
    ) {
      const desiredTipWorld = activeBow.localToWorld(baselineTipInBowSpaceRef.current.clone());
      const tailWorld = activeArrowPivot.getWorldPosition(new Vector3());
      const nextPivotQuaternion = getPivotLocalQuaternionForTipTarget(
        activeRightHand,
        tailWorld,
        desiredTipWorld,
      );

      if (nextPivotQuaternion) {
        const correctionAlpha =
          MathUtils.smootherstep(
            smoothedAngleRef.current,
            upperAimArrowCorrectionStart,
            runtimeAimUpperAngle,
          ) * upperAimArrowCorrectionStrength;
        activeArrowPivot.quaternion.slerp(nextPivotQuaternion, correctionAlpha);
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
      }
    } else if (showHandArrow) {
      onArrowSample(null);
    }

    if (activeArrow && activeBow) {
      const activeTipInBowSpace = activeBow.worldToLocal(
        getArrowModelPointWorld(activeArrow, arrowTipModelCenter),
      );
      let tailToPinchDistance = 0;

      if (aimInfluence < 0.01 || Math.abs(smoothedAngleRef.current - baselineAimAngle) < 0.35) {
        baselineTipInBowSpaceRef.current = activeTipInBowSpace.clone();
      }

      if (activeArrowPivot) {
        const pivotPoint = activeArrowPivot.getWorldPosition(new Vector3());
        const tailPoint = getArrowModelPointWorld(activeArrow, arrowTailModelCenter);

        tailToPinchDistance = tailPoint.distanceTo(pivotPoint);
      }

      const baselineTipInBowSpace = baselineTipInBowSpaceRef.current ?? activeTipInBowSpace;

      onAlignmentMetricsChange({
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
    } else {
      onAlignmentMetricsChange(null);
    }
  });

  if (!rig) {
    return null;
  }

  return (
    <primitive
      object={rig.scene}
      scale={0.014095}
      position={[-2.55, -0.72, 0.08]}
      rotation={[0, characterStageRotationY, 0]}
    />
  );
}

export function MiniGameCharacterTestCanvas({
  selectedMarketId,
}: {
  selectedMarketId: CalculatorMarketId;
}) {
  const router = useRouter();
  const [alignmentMetrics, setAlignmentMetrics] = useState<ArrowAlignmentMetrics | null>(null);
  const [clipProgress, setClipProgress] = useState(nockedPoseStart);
  const [aimAngle, setAimAngle] = useState(0);
  const [arrowFlight, setArrowFlight] = useState<ArrowFlightState | null>(null);
  const [arrowImpact, setArrowImpact] = useState<ArrowImpactState | null>(null);
  const [targetWobbleTick, setTargetWobbleTick] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [releaseAimAngle, setReleaseAimAngle] = useState(baselineAimAngle);
  const [releaseAimBlend, setReleaseAimBlend] = useState(0);
  const [visibleAngle, setVisibleAngle] = useState(50);
  const [releasing, setReleasing] = useState(false);
  const [releaseRaf, setReleaseRaf] = useState<number | null>(null);
  const [resetTimeout, setResetTimeout] = useState<number | null>(null);
  const arrowFlightIdRef = useRef(0);
  const drawDragStateRef = useRef<DrawDragState | null>(null);
  const aimDragStateRef = useRef<AimDragState | null>(null);
  const latestArrowSampleRef = useRef<ArrowSample | null>(null);
  const resolvedAimAngleRef = useRef(baselineAimAngle);
  const hitAdvanceTimeoutRef = useRef<number | null>(null);
  const hitResolvedRef = useRef(false);
  const releaseRafRef = useRef<number | null>(null);
  const resetTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    releaseRafRef.current = releaseRaf;
  }, [releaseRaf]);

  useEffect(() => {
    resetTimeoutRef.current = resetTimeout;
  }, [resetTimeout]);

  useEffect(() => {
    return () => {
      if (releaseRafRef.current !== null) {
        cancelAnimationFrame(releaseRafRef.current);
      }

      if (resetTimeoutRef.current !== null) {
        window.clearTimeout(resetTimeoutRef.current);
      }

      if (hitAdvanceTimeoutRef.current !== null) {
        window.clearTimeout(hitAdvanceTimeoutRef.current);
      }
    };
  }, []);

  function stopPendingRelease() {
    if (releaseRaf !== null) {
      cancelAnimationFrame(releaseRaf);
      setReleaseRaf(null);
    }

    if (resetTimeout !== null) {
      window.clearTimeout(resetTimeout);
      setResetTimeout(null);
    }

    if (hitAdvanceTimeoutRef.current !== null) {
      window.clearTimeout(hitAdvanceTimeoutRef.current);
      hitAdvanceTimeoutRef.current = null;
    }
  }

  function updatePose(clientX: number, clientY: number, element: HTMLDivElement) {
    const drawDragState = drawDragStateRef.current;

    if (!drawDragState) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const deltaX = drawDragState.x - clientX;
    const drawWindow = drawAimPoseEnd - nockedPoseStart;
    const nextClipProgressRaw = MathUtils.clamp(
      drawDragState.startClipProgress + (deltaX / (rect.width * drawDragWidthFactor)) * drawWindow,
      nockedPoseStart,
      drawAimPoseEnd,
    );
    const aimEnabled = nextClipProgressRaw >= drawAimPoseEnd - aimActivationEpsilon;
    const nextClipProgress = aimEnabled ? drawAimPoseEnd : nextClipProgressRaw;
    let nextAimAngle = 0;

    if (aimEnabled) {
      const aimDragState = aimDragStateRef.current ?? {
        y: clientY,
        startAimAngle: aimAngle,
      };
      const deltaY = clientY - aimDragState.y;

      nextAimAngle = MathUtils.clamp(
        aimDragState.startAimAngle + (deltaY / (rect.height * aimDragHeightFactor)) * aimDragRange,
        -aimDragRange,
        aimDragRange,
      );
      aimDragStateRef.current = {
        y: clientY,
        startAimAngle: nextAimAngle,
      };
    } else {
      aimDragStateRef.current = {
        y: clientY,
        startAimAngle: 0,
      };
    }

    setClipProgress(nextClipProgress);
    setAimAngle(nextAimAngle);
  }

  function resetPose() {
    setClipProgress(nockedPoseStart);
    setAimAngle(0);
    setReleaseAimAngle(baselineAimAngle);
    setReleaseAimBlend(0);
    setReleasing(false);
  }

  function triggerShot() {
    stopPendingRelease();
    const liveResolvedAimAngle = resolvedAimAngleRef.current;
    const shotAimAngle =
      clipProgress >= drawAimPoseEnd - aimActivationEpsilon
        ? MathUtils.clamp(liveResolvedAimAngle, runtimeAimLowerAngle, runtimeAimUpperAngle)
        : baselineAimAngle;

    setReleaseAimAngle(shotAimAngle);
    setReleaseAimBlend(1);
    setReleasing(true);

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
      setArrowImpact(null);
      setArrowFlight({
        direction: [launchDirection.x, launchDirection.y, launchDirection.z],
        id: arrowFlightIdRef.current + 1,
        position: [launchPosition.x, launchPosition.y, launchPosition.z],
        quaternion: latestArrowSample.quaternion,
        scale: latestArrowSample.scale,
      });
      arrowFlightIdRef.current += 1;
    }

    const startProgress = clipProgress;
    const startAimAngle = aimAngle;
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

      setClipProgress(MathUtils.lerp(startProgress, shotReleaseEnd, eased));
      setAimAngle(MathUtils.lerp(startAimAngle, 0, aimRecoveryEased));
      setReleaseAimAngle(MathUtils.lerp(shotAimAngle, baselineAimAngle, aimRecoveryEased));
      setReleaseAimBlend(1 - aimRecoveryEased);

      if (t < 1) {
        setReleaseRaf(requestAnimationFrame(step));
        return;
      }

      setReleaseRaf(null);
      setResetTimeout(
        window.setTimeout(() => {
          resetPose();
          setResetTimeout(null);
        }, releaseResetDelayMs),
      );
    };

    setReleaseRaf(requestAnimationFrame(step));
  }

  const drawProgress = MathUtils.clamp(
    (clipProgress - nockedPoseStart) / (drawAimPoseEnd - nockedPoseStart),
    0,
    1,
  );
  const targetAimAngle = (() => {
    const aimEnabled = clipProgress >= drawAimPoseEnd - aimActivationEpsilon;
    return aimEnabled
      ? MathUtils.clamp(
          getTargetAimAngle(aimAngle),
          runtimeAimLowerAngle,
          runtimeAimUpperAngle,
        )
      : baselineAimAngle;
  })();

  return (
    <div className="relative h-full w-full">
      <Canvas
        shadows="percentage"
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        className="h-full w-full"
      >
        <PerspectiveCamera makeDefault position={[0, 0.2, 8.4]} fov={19} />
        <ambientLight intensity={1.45} />
        <directionalLight
          position={[3.8, 5.4, 4.4]}
          intensity={1.4}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <spotLight position={[-2.4, 4.4, 2.8]} intensity={0.65} angle={0.42} penumbra={1} />

        <CharacterModel
          onAlignmentMetricsChange={setAlignmentMetrics}
          clipProgress={clipProgress}
          onArrowSample={(sample) => {
            latestArrowSampleRef.current = sample;
          }}
          onResolvedAimAngleChange={(angle) => {
            resolvedAimAngleRef.current = angle;
          }}
          onVisibleAngleChange={setVisibleAngle}
          releaseAimAngle={releaseAimAngle}
          releaseAimBlend={releaseAimBlend}
          releasing={releasing}
          showHandArrow={arrowFlight === null}
          targetAngle={targetAimAngle}
        />
        <TargetModel wobbleTrigger={targetWobbleTick} />
        {arrowFlight ? (
          <ProjectileArrow
            key={arrowFlight.id}
            flight={arrowFlight}
            onHit={(impact) => {
              setTargetWobbleTick((currentTick) => currentTick + 1);
              setArrowImpact((currentImpact) =>
                currentImpact?.id === impact.id ? currentImpact : impact,
              );
              if (!hitResolvedRef.current) {
                hitResolvedRef.current = true;
                hitAdvanceTimeoutRef.current = window.setTimeout(() => {
                  hitAdvanceTimeoutRef.current = null;
                  router.push(`/asset-selection?market=${selectedMarketId}`);
                }, hitAdvanceDelayMs);
              }
            }}
            onComplete={() => {
              setArrowFlight((currentFlight) =>
                currentFlight?.id === arrowFlight.id ? null : currentFlight,
              );
            }}
          />
        ) : null}
        {arrowImpact ? <ImpactArrow impact={arrowImpact} /> : null}

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

      <div
        className={`absolute inset-0 z-10 touch-none ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
        onPointerDown={(event) => {
          if (event.button !== 0 || releasing) {
            return;
          }

          stopPendingRelease();
          drawDragStateRef.current = {
            x: event.clientX,
            startClipProgress: clipProgress,
          };
          aimDragStateRef.current = {
            y: event.clientY,
            startAimAngle: aimAngle,
          };
          setDragging(true);
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!dragging || releasing) {
            return;
          }

          updatePose(event.clientX, event.clientY, event.currentTarget);
        }}
        onPointerUp={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }

          drawDragStateRef.current = null;
          aimDragStateRef.current = null;

          if (!dragging) {
            return;
          }

          setDragging(false);

          if (clipProgress > nockedPoseStart + 0.015) {
            triggerShot();
          }
        }}
        onPointerCancel={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }

          drawDragStateRef.current = null;
          aimDragStateRef.current = null;
          setDragging(false);
          resetPose();
        }}
        onLostPointerCapture={() => {
          drawDragStateRef.current = null;
          aimDragStateRef.current = null;
          setDragging(false);
        }}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-3 flex items-center justify-center sm:bottom-4">
        <div className="rounded-full border border-white/70 bg-white/88 px-3.5 py-1.5 text-[0.64rem] font-medium text-zinc-600 shadow-[0_10px_24px_rgba(24,24,27,0.06)] sm:text-[0.72rem]">
          {releasing
            ? "Release in progress"
            : dragging
              ? "Single-rig aim test: runtime range is 25-50-75-100."
              : "Single-rig aim test: 25-50-75-100 range"}
        </div>
      </div>

      <div className="pointer-events-none absolute left-3 top-3 z-20 rounded-2xl border border-white/70 bg-white/88 px-3 py-2 text-[0.65rem] font-medium text-zinc-600 shadow-[0_10px_24px_rgba(24,24,27,0.06)] sm:left-4 sm:top-4 sm:text-[0.72rem]">
        <div>aim: {aimAngle.toFixed(2)}</div>
        <div>clip: {clipProgress.toFixed(3)}</div>
        <div>draw: {drawProgress.toFixed(2)}</div>
        <div>target: {targetAimAngle.toFixed(1)}</div>
        <div>anchor: {visibleAngle}</div>
        {alignmentMetrics ? (
          <>
            <div>
              tip dY:
              {" "}
              {alignmentMetrics.tipDeltaFromBaseline[1].toFixed(2)}
            </div>
            <div>
              tip dZ:
              {" "}
              {alignmentMetrics.tipDeltaFromBaseline[2].toFixed(2)}
            </div>
            <div>
              tail gap:
              {" "}
              {alignmentMetrics.tailToPinchDistance.toFixed(2)}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

useFBX.preload(miniGameCharacterFbxPath);
useLoader.preload(OBJLoader, "/models/bow.obj");
useLoader.preload(OBJLoader, "/models/arrow.obj");
useLoader.preload(OBJLoader, archeryTarget4kObjPath);
useLoader.preload(TextureLoader, archeryTarget4kBaseColorPath);
useLoader.preload(TextureLoader, archeryTarget4kNormalPath);
