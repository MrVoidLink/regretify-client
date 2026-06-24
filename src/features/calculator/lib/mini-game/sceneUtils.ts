import type { AnimationClip, Bone, Object3D } from "three";
import {
  Group,
  LineBasicMaterial,
  Mesh,
  MeshStandardMaterial,
} from "three";
import {
  arrowScale,
  baseArrowHandTransform,
  baseArrowPivotQuaternion,
  baseArrowRotation,
  baseArrowRotationEuler,
  bowHandTransform,
} from "@/features/calculator/lib/mini-game/constants";
import { getArrowTailOffset } from "@/features/calculator/lib/mini-game/arrowTransforms";

export function findPlayableClip(model: { animations: AnimationClip[] }) {
  return model.animations.find((clip) => clip.duration > 0.05) ?? model.animations[0] ?? null;
}

export function findBoneByName(scene: Object3D, boneName: string) {
  let match: Bone | null = null;

  scene.traverse((child) => {
    if (match || !("isBone" in child) || !child.isBone || child.name !== boneName) {
      return;
    }

    match = child as Bone;
  });

  return match;
}

export function applyTemporaryMaterial(source: Object3D, material: MeshStandardMaterial) {
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

export function forceArrowInFront(source: Object3D) {
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

export function enableShadowCasting(source: Object3D) {
  source.traverse((child) => {
    if (child instanceof Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
}

export function attachBowToLeftHand(scene: Object3D, bowSource: Object3D) {
  const leftHand = scene.getObjectByName("mixamorig_LeftHand");

  if (!leftHand) {
    return;
  }

  const bow = bowSource.clone(true);

  bow.name = "mini-game-bow";
  bow.position.set(...bowHandTransform.position);
  bow.rotation.set(...bowHandTransform.rotation);
  bow.scale.setScalar(bowHandTransform.scale);
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

export function attachArrowToRightHand(scene: Object3D, arrowSource: Object3D) {
  const rightHand = scene.getObjectByName("mixamorig_RightHand");

  if (!rightHand) {
    return;
  }

  const arrowPivot = new Group();
  const arrow = arrowSource.clone(true);
  const tailOffset = getArrowTailOffset(baseArrowRotation, arrowScale);

  arrowPivot.name = "mini-game-arrow-pivot";
  arrowPivot.position.set(...baseArrowHandTransform.position);
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
