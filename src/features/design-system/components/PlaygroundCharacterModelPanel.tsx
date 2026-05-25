"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import {
  Center,
  ContactShadows,
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
} from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { Box3, MOUSE, Mesh, Object3D, Vector3 } from "three";
import { MTLLoader, OBJLoader } from "three-stdlib";

type PreviewModel = {
  badge: string;
  cameraPosition: [number, number, number];
  description: string;
  fileSize: string;
  format: "glb" | "obj";
  label: string;
  maxDistance: number;
  mtlPath?: string;
  minDistance: number;
  path: string;
  scaleMultiplier: number;
};

const previewModels: PreviewModel[] = [
  {
    badge: "Current",
    cameraPosition: [0, 1.05, 6.1],
    description: "Existing staged character model currently used as the baseline preview.",
    fileSize: "972 KB",
    format: "glb",
    label: "512",
    maxDistance: 8.5,
    minDistance: 0.8,
    path: "/models/playground-character-model.glb",
    scaleMultiplier: 1,
  },
  {
    badge: "Candidate",
    cameraPosition: [0, 0.75, 0.95],
    description: "Rigged desktop import for direct side-by-side quality review against the current model.",
    fileSize: "2.08 MB",
    format: "glb",
    label: "1k",
    maxDistance: 4.5,
    minDistance: 0.35,
    path: "/models/playground-character-model-1k.glb",
    scaleMultiplier: 7,
  },
  {
    badge: "New Import",
    cameraPosition: [0, 0.9, 4.8],
    description: "OBJ export of the same archery set, kept with its MTL and texture maps for a direct format-to-format comparison inside the playground.",
    fileSize: "2.10 MB",
    format: "obj",
    label: "OBJ 512",
    maxDistance: 8.8,
    minDistance: 1.1,
    mtlPath: "/models/playground-archery-set-obj-512/tripo_convert_4f8289ab-6344-4805-9d44-8aa3abfeef0e.mtl",
    path: "/models/playground-archery-set-obj-512/tripo_convert_4f8289ab-6344-4805-9d44-8aa3abfeef0e.obj",
    scaleMultiplier: 1,
  },
  {
    badge: "New Import",
    cameraPosition: [0, 0.9, 4.8],
    description: "4k OBJ export of the archery set, staged with its MTL and texture files for direct fidelity comparison against the lighter 512 OBJ import.",
    fileSize: "3.61 MB",
    format: "obj",
    label: "OBJ 4K",
    maxDistance: 8.8,
    minDistance: 1.1,
    mtlPath: "/models/playground-archery-set-obj-4k/wooden+archery+target+3d+model.mtl",
    path: "/models/playground-archery-set-obj-4k/wooden+archery+target+3d+model.obj",
    scaleMultiplier: 1,
  },
];

const targetPreviewHeight = 3.8;

function StageModel({
  model,
  scaleMultiplier,
}: {
  model: Object3D;
  scaleMultiplier: number;
}) {
  const normalizedScale = useMemo(() => {
    const bounds = new Box3().setFromObject(model);
    const size = bounds.getSize(new Vector3());

    if (size.y <= 1e-6) {
      return 1.95;
    }

    return targetPreviewHeight / size.y;
  }, [model]);

  useEffect(() => {
    model.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [model]);

  return (
    <Center position={[0, -0.25, 0]}>
      <primitive object={model} scale={normalizedScale * scaleMultiplier} />
    </Center>
  );
}

function GlbCharacterModel({
  path,
  scaleMultiplier,
}: {
  path: string;
  scaleMultiplier: number;
}) {
  const { scene } = useGLTF(path);
  const model = useMemo(() => scene.clone(true), [scene]);

  return <StageModel model={model as Object3D} scaleMultiplier={scaleMultiplier} />;
}

function ObjCharacterModel({
  path,
  mtlPath,
  scaleMultiplier,
}: {
  path: string;
  mtlPath: string;
  scaleMultiplier: number;
}) {
  const materials = useLoader(MTLLoader, mtlPath);
  const source = useLoader(OBJLoader, path, (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });
  const model = useMemo(() => source.clone(true), [source]);

  return <StageModel model={model as Object3D} scaleMultiplier={scaleMultiplier} />;
}

function CharacterModel({ model }: { model: PreviewModel }) {
  if (model.format === "obj" && model.mtlPath) {
    return (
      <ObjCharacterModel
        path={model.path}
        mtlPath={model.mtlPath}
        scaleMultiplier={model.scaleMultiplier}
      />
    );
  }

  return <GlbCharacterModel path={model.path} scaleMultiplier={model.scaleMultiplier} />;
}

function LoadingState() {
  return (
    <div className="flex h-full items-center justify-center rounded-[1.5rem] border border-zinc-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(245,245,247,0.92)_100%)] text-[0.9rem] font-medium text-zinc-500">
      Loading model...
    </div>
  );
}

function CharacterPreviewCard({
  isActive,
  model,
  onToggle,
}: {
  isActive: boolean;
  model: PreviewModel;
  onToggle: () => void;
}) {
  return (
    <article className="overflow-hidden rounded-[1.5rem] border border-zinc-200/80 bg-white/88 shadow-[0_14px_36px_rgba(24,24,27,0.05)]">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-200/80 px-4 py-4 sm:px-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[var(--color-brand-soft)] px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-brand)]">
              {model.badge}
            </span>
            <span className="rounded-full bg-zinc-950 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white">
              {model.label}
            </span>
          </div>
          <h3 className="mt-3 text-[1.1rem] font-semibold tracking-[-0.04em] text-zinc-950">
            {model.path.split("/").at(-1)}
          </h3>
          <p className="mt-1 max-w-[34rem] text-[0.84rem] leading-6 text-zinc-600">
            {model.description}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-full border border-zinc-200/80 bg-white px-3 py-1.5 text-[0.72rem] font-semibold text-zinc-600 shadow-[0_10px_24px_rgba(24,24,27,0.05)]">
            <span>{model.fileSize}</span>
          </div>
          <button
            type="button"
            onClick={onToggle}
            className={`inline-flex min-h-10 items-center justify-center rounded-full border px-3.5 py-1.5 text-[0.76rem] font-semibold transition-colors ${
              isActive
                ? "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100"
                : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
            }`}
          >
            {isActive ? "Turn Off" : "Turn On"}
          </button>
        </div>
      </div>

      <div className="h-[26rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.98),rgba(232,234,239,0.92)_52%,rgba(223,226,233,0.86)_100%)]">
        {isActive ? (
          <Suspense fallback={<LoadingState />}>
            <Canvas dpr={[1, 1.2]} gl={{ alpha: true, antialias: true }} shadows="percentage">
              <PerspectiveCamera makeDefault position={model.cameraPosition} fov={24} />
              <ambientLight intensity={1.35} />
              <directionalLight
                castShadow
                intensity={1.2}
                position={[4.8, 6.8, 3.5]}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
              />
              <spotLight intensity={0.55} angle={0.46} penumbra={1} position={[-4, 4, 3]} />

              <CharacterModel model={model} />

              <ContactShadows
                position={[0, -1.65, 0]}
                opacity={0.24}
                scale={7.4}
                blur={2.8}
                far={4.8}
                resolution={512}
              />

              <OrbitControls
                enablePan
                minDistance={model.minDistance}
                maxDistance={model.maxDistance}
                maxPolarAngle={Math.PI / 1.85}
                minPolarAngle={Math.PI / 3.2}
                mouseButtons={{
                  LEFT: MOUSE.ROTATE,
                  MIDDLE: MOUSE.DOLLY,
                  RIGHT: MOUSE.PAN,
                }}
              />
            </Canvas>
          </Suspense>
        ) : (
          <div className="flex h-full items-center justify-center px-6 text-center">
            <div className="rounded-[1.25rem] border border-dashed border-zinc-300/90 bg-white/65 px-6 py-4 text-[0.84rem] leading-6 text-zinc-500">
              Preview is off.
              <br />
              Use <span className="font-semibold text-zinc-700">Turn On</span> to mount this 3D
              scene.
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-zinc-200/80 px-4 py-3 text-[0.74rem] text-zinc-500 sm:px-5">
        <span>{model.path}</span>
      </div>
    </article>
  );
}

export function PlaygroundCharacterModelPanel() {
  const [activePreviewPath, setActivePreviewPath] = useState<string | null>(null);

  return (
    <section className="rounded-[1.75rem] border border-zinc-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(246,246,249,0.96)_100%)] p-5 shadow-[0_18px_48px_rgba(24,24,27,0.06)] sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand)]">
            3D Preview
          </p>
          <h2 className="mt-3 text-[1.7rem] font-semibold tracking-[-0.06em] text-zinc-950 sm:text-[2rem]">
            Desktop 3D model comparison
          </h2>
          <p className="mt-2 max-w-[42rem] text-[0.92rem] leading-6 text-zinc-600">
            Side-by-side preview for the current character model set plus staged archery OBJ
            imports in 512 and 4k variants. Use drag to orbit, wheel to zoom, and compare
            silhouette, surface detail, and overall fidelity before any production use.
          </p>
          <p className="mt-2 text-[0.78rem] leading-5 text-zinc-500">
            To keep WebGL stable on weaker browsers, the playground keeps only one live 3D
            preview mounted at a time. Turn cards on only when you want to inspect them.
          </p>
        </div>
        <div className="rounded-full border border-zinc-200/80 bg-white px-3.5 py-1.5 text-[0.72rem] font-semibold text-zinc-600 shadow-[0_10px_24px_rgba(24,24,27,0.05)]">
          <span>4 models staged</span>
        </div>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        {previewModels.map((model) => (
          <CharacterPreviewCard
            key={model.path}
            isActive={activePreviewPath === model.path}
            model={model}
            onToggle={() => {
              setActivePreviewPath((currentPath) =>
                currentPath === model.path ? null : model.path,
              );
            }}
          />
        ))}
      </div>
    </section>
  );
}

useGLTF.preload("/models/playground-character-model.glb");
useGLTF.preload("/models/playground-character-model-1k.glb");
