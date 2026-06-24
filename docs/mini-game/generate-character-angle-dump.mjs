import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FBXLoader } from "three-stdlib";
import { AnimationMixer, Bone } from "three";

class FakeImage {
  constructor() {
    this._listeners = {
      error: [],
      load: [],
    };
    this.height = 1;
    this.width = 1;
  }

  addEventListener(type, callback) {
    this._listeners[type]?.push(callback);
  }

  removeEventListener(type, callback) {
    this._listeners[type] = this._listeners[type].filter((entry) => entry !== callback);
  }

  set src(_value) {
    queueMicrotask(() => {
      for (const callback of this._listeners.load) {
        callback({ currentTarget: this, target: this });
      }
    });
  }
}

globalThis.window = {
  URL: {
    createObjectURL: () => "blob:stub",
    revokeObjectURL: () => {},
  },
};
globalThis.self = globalThis;
globalThis.Blob = globalThis.Blob || class Blob {};
globalThis.Image = FakeImage;
globalThis.document = {
  createElementNS(_namespace, name) {
    if (name === "img") {
      return new FakeImage();
    }

    return {
      appendChild() {},
      setAttribute() {},
      style: {},
    };
  },
};

const fullDrawProgress = 0.40625;
const angleFiles = {
  "25": "C:/Users/LOQ/Desktop/25.fbx",
  "50": "C:/Users/LOQ/Desktop/50.fbx",
  "75": "C:/Users/LOQ/Desktop/75.fbx",
  "100": "C:/Users/LOQ/Desktop/100.fbx",
};
const runtimeAngleRange = [25, 50, 100];
const poseAnchorAngles = [25, 50, 75, 100];

function roundNumber(value) {
  return Number(value.toFixed(6));
}

function normalizeBoneName(name) {
  if (!name.startsWith("mixamorig") || name.startsWith("mixamorig_")) {
    return name;
  }

  return name.replace(/^mixamorig/, "mixamorig_");
}

function loadFbx(filePath) {
  const loader = new FBXLoader();
  const buffer = fs.readFileSync(filePath);
  const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);

  return loader.parse(arrayBuffer, `${path.dirname(filePath)}${path.sep}`);
}

function getPlayableClip(model) {
  return model.animations.find((clip) => clip.duration > 0.05) ?? model.animations[0] ?? null;
}

function getBoneSnapshotAtFullDraw(model) {
  const scene = model.clone(true);
  const clip = getPlayableClip(model);

  if (!clip) {
    throw new Error("No playable clip found in FBX source.");
  }

  const mixer = new AnimationMixer(scene);
  const action = mixer.clipAction(clip);

  action.play();
  mixer.setTime(clip.duration * fullDrawProgress);
  scene.updateMatrixWorld(true);

  const boneDump = new Map();

  scene.traverse((child) => {
    if (!(child instanceof Bone)) {
      return;
    }

    boneDump.set(normalizeBoneName(child.name), {
      position: {
        x: roundNumber(child.position.x),
        y: roundNumber(child.position.y),
        z: roundNumber(child.position.z),
      },
      quaternion: {
        x: roundNumber(child.quaternion.x),
        y: roundNumber(child.quaternion.y),
        z: roundNumber(child.quaternion.z),
        w: roundNumber(child.quaternion.w),
      },
    });
  });

  action.stop();
  mixer.stopAllAction();

  return boneDump;
}

function buildDump() {
  const sourceFiles = {};
  const snapshotsByAngle = {};
  const allBoneNames = new Set();

  for (const [angleKey, filePath] of Object.entries(angleFiles)) {
    const model = loadFbx(filePath);
    sourceFiles[angleKey] = path.basename(filePath);
    const snapshot = getBoneSnapshotAtFullDraw(model);

    snapshotsByAngle[angleKey] = snapshot;

    for (const boneName of snapshot.keys()) {
      allBoneNames.add(boneName);
    }
  }

  const bones = {};
  const sortedBoneNames = [...allBoneNames].sort((left, right) => left.localeCompare(right));

  for (const boneName of sortedBoneNames) {
    bones[boneName] = {
      absolute: {},
    };

    for (const angleKey of Object.keys(angleFiles)) {
      bones[boneName].absolute[angleKey] = snapshotsByAngle[angleKey].get(boneName) ?? null;
    }
  }

  const generatedAt = new Date().toISOString();

  return {
    baselineAngle: 50,
    bones,
    generatedAt,
    poseAnchorAngles,
    progress: fullDrawProgress,
    runtimeAngleRange,
    sourceFiles,
    trimmedAt: generatedAt,
  };
}

const output = buildDump();
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.join(scriptDir, "current-character-angle-bone-dump.json");

fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");

console.log(`Wrote ${outputPath}`);
console.log(`Bones: ${Object.keys(output.bones).length}`);
