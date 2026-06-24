import type {
  AnimationAction,
  AnimationClip,
  AnimationMixer,
  Bone,
  Object3D,
  Quaternion,
  Vector3,
} from "three";

export type AimAnchorAngle = 25 | 50 | 75 | 100;
export type AimAnchorAngleKey = `${AimAnchorAngle}`;

export type FullDrawBoneSample = {
  position: { x: number; y: number; z: number };
  quaternion: { x: number; y: number; z: number; w: number };
};

export type FullDrawBoneDumpData = {
  bones: Record<
    string,
    {
      absolute: Record<AimAnchorAngleKey, FullDrawBoneSample | null>;
    }
  >;
};

export type CachedFullDrawBoneSample = {
  position: Vector3;
  quaternion: Quaternion;
};

export type CachedFullDrawBoneData = Record<
  string,
  {
    absolute: Record<AimAnchorAngleKey, CachedFullDrawBoneSample | null>;
  }
>;

export type ProceduralAimBoneName = string;

export type AimInterpolationState = {
  easedAlpha: number;
  lowerAngle: AimAnchorAngle;
  upperAngle: AimAnchorAngle;
};

export type CharacterRig = {
  action: AnimationAction;
  clip: AnimationClip;
  controlledBones: Partial<Record<ProceduralAimBoneName, Bone>>;
  mixer: AnimationMixer;
  proceduralBoneNames: ProceduralAimBoneName[];
  scene: Object3D;
  stageOffset: Vector3;
  stageScale: number;
};

export type ArrowSample = {
  direction: [number, number, number];
  position: [number, number, number];
  quaternion: [number, number, number, number];
  scale: [number, number, number];
};

export type ArrowFlightState = ArrowSample & {
  id: number;
};

export type ArrowImpactState = ArrowSample & {
  id: number;
};

export type ArrowAlignmentMetrics = {
  activeTailInBowSpace: [number, number, number];
  activeTipInBowSpace: [number, number, number];
  baselineTipInBowSpace: [number, number, number];
  tailToPinchDistance: number;
  tipDeltaFromBaseline: [number, number, number];
};

export type PredictedImpactMetrics = {
  distanceToCenter: number;
  hitPointInTargetSpace: [number, number, number];
  isInsideHitZone: boolean;
  offsetFromCenter: [number, number, number];
};

export type MiniGameSceneProfile = {
  targetAimLift: number;
  targetAimLocalOffset: Vector3;
  targetImpactLocalOffset: Vector3;
  characterStageHeight: number;
  characterStagePosition: Vector3;
  targetArrowEmbedDepth: number;
  targetBackGlowOffset: number;
  targetBackGlowPlaneSize: number;
  targetBaseRotationY: number;
  targetFrontNormal: Vector3;
  targetFrontPlaneCenter: Vector3;
  targetFrontPlaneLocalPosition: Vector3;
  targetHitHaloFillRadius: number;
  targetHitHaloInnerRadius: number;
  targetHitHaloOuterRadius: number;
  targetHitHaloVisualOffset: number;
  targetHitRadius: number;
  targetVisualCenterLocalPosition: Vector3;
  targetVisualHeight: number;
  targetVisualLocalOffset: Vector3;
  targetWorldPosition: Vector3;
};

export type DrawDragState = {
  x: number;
  startClipProgress: number;
};

export type AimDragState = {
  y: number;
  startAimAngle: number;
};

export type MiniGameStageTelemetry = {
  drawProgress: number;
  dragging: boolean;
  releasing: boolean;
  targetAimAngle: number;
  activeAimAnchorAngle: number;
};
