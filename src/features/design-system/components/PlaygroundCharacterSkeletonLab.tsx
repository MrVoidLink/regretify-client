"use client";

import { Suspense, useEffect, useMemo } from "react";
import {
  ContactShadows,
  OrbitControls,
  PerspectiveCamera,
  useFBX,
  useGLTF,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { AnimationMixer, Box3, Mesh, Object3D, SkeletonHelper, Vector3 } from "three";
import { SkeletonUtils } from "three-stdlib";

type SkeletonCardConfig = {
  badge: string;
  description: string;
  id: "current-skeleton" | "candidate-1k-skeleton";
  label: string;
  note: string;
};

const skeletonCards: readonly SkeletonCardConfig[] = [
  {
    badge: "Current /",
    description: "Live mini-game skeleton using the same Mixamo-based FBX path as the `/` route.",
    id: "current-skeleton",
    label: "Mini-game Skeleton",
    note: "Embedded clip plays here so you can inspect the current rig motion directly.",
  },
  {
    badge: "1k",
    description: "Rig-only view of the 1k GLB candidate with the mesh hidden for clean bone inspection.",
    id: "candidate-1k-skeleton",
    label: "1k Skeleton",
    note: "No embedded clip exists in this asset, so this preview stays in rest pose.",
  },
];

function hideMeshes(source: Object3D) {
  source.traverse((child) => {
    if (child instanceof Mesh) {
      child.visible = false;
    }
  });
}

function SkeletonStage({
  helper,
  root,
  rotationY = 0,
  targetHeight,
  yOffset,
}: {
  helper: SkeletonHelper;
  root: Object3D;
  rotationY?: number;
  targetHeight: number;
  yOffset: number;
}) {
  const stageConfig = useMemo(() => {
    const bounds = new Box3().setFromObject(root);
    const center = bounds.getCenter(new Vector3());
    const size = bounds.getSize(new Vector3());
    const normalizedScale = size.y > 1e-6 ? targetHeight / size.y : 1;

    return {
      offset: [-center.x * normalizedScale, -center.y * normalizedScale, -center.z * normalizedScale] as const,
      scale: normalizedScale,
    };
  }, [root, targetHeight]);

  return (
    <group position={[0, yOffset, 0]} rotation={[0, rotationY, 0]}>
      <group position={stageConfig.offset} scale={stageConfig.scale}>
        <primitive object={root} />
        <primitive object={helper} />
      </group>
    </group>
  );
}

function CurrentMiniGameSkeleton() {
  const source = useFBX("/models/shooting-arrow-50-trim24-skin-test.fbx");
  const asset = useMemo(() => {
    const scene = SkeletonUtils.clone(source);
    const clip = source.animations.find((candidate) => candidate.duration > 0.05) ?? null;
    const mixer = clip ? new AnimationMixer(scene) : null;
    const action = mixer && clip ? mixer.clipAction(clip) : null;
    const helper = new SkeletonHelper(scene);

    hideMeshes(scene);
    helper.visible = true;

    return { action, helper, mixer, scene };
  }, [source]);

  useEffect(() => {
    if (!asset.action) {
      return;
    }

    asset.action.reset();
    asset.action.play();

    return () => {
      asset.action?.stop();
    };
  }, [asset]);

  useFrame((_, delta) => {
    asset.mixer?.update(delta);
  });

  return (
    <SkeletonStage
      helper={asset.helper}
      root={asset.scene}
      rotationY={Math.PI / 6}
      targetHeight={18}
      yOffset={0.2}
    />
  );
}

function CandidateRiggedSkeleton() {
  const { scene } = useGLTF("/models/playground-character-model-1k.glb");
  const asset = useMemo(() => {
    const root = scene.clone(true);
    const helper = new SkeletonHelper(root);

    hideMeshes(root);
    helper.visible = true;

    return { helper, root };
  }, [scene]);

  return (
    <SkeletonStage
      helper={asset.helper}
      root={asset.root}
      rotationY={-Math.PI / 10}
      targetHeight={0.95}
      yOffset={-0.58}
    />
  );
}

function SkeletonScene({ skeletonId }: { skeletonId: SkeletonCardConfig["id"] }) {
  return (
    <Canvas dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }} shadows="percentage">
      <PerspectiveCamera makeDefault position={[0, 0.65, 6.2]} fov={16} />
      <ambientLight intensity={1.2} />
      <directionalLight intensity={1.1} position={[4.1, 5.8, 3.1]} />

      {skeletonId === "current-skeleton" ? <CurrentMiniGameSkeleton /> : <CandidateRiggedSkeleton />}

      <mesh position={[0, -1.95, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8.6, 5.6]} />
        <shadowMaterial transparent opacity={0.05} />
      </mesh>

      <ContactShadows
        position={[0, -1.9, 0]}
        opacity={0.12}
        scale={6.8}
        blur={2.2}
        far={4.2}
        resolution={512}
      />

      <OrbitControls
        enablePan
        minDistance={4.1}
        maxDistance={9}
        maxPolarAngle={Math.PI / 1.9}
        minPolarAngle={Math.PI / 3.2}
      />
    </Canvas>
  );
}

function LoadingState() {
  return (
    <div className="flex h-full items-center justify-center rounded-[1.35rem] border border-zinc-200/80 bg-white/75 text-[0.88rem] font-medium text-zinc-500">
      Loading skeleton...
    </div>
  );
}

export function PlaygroundCharacterSkeletonLab() {
  return (
    <section className="rounded-[1.75rem] border border-zinc-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(246,246,249,0.96)_100%)] p-5 shadow-[0_18px_48px_rgba(24,24,27,0.06)] sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand)]">
            Skeleton Lab
          </p>
          <h2 className="mt-3 text-[1.7rem] font-semibold tracking-[-0.06em] text-zinc-950 sm:text-[2rem]">
            Separate rig inspection
          </h2>
          <p className="mt-2 max-w-[48rem] text-[0.92rem] leading-6 text-zinc-600">
            Dedicated skeleton-only stage for the live mini-game character and the rigged 1k
            candidate. Meshes stay hidden here so bone hierarchy and rig posture can be inspected
            without visual clutter.
          </p>
        </div>
        <div className="rounded-full border border-zinc-200/80 bg-white px-3.5 py-1.5 text-[0.72rem] font-semibold text-zinc-600 shadow-[0_10px_24px_rgba(24,24,27,0.05)]">
          <span>2 skeleton previews</span>
        </div>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        {skeletonCards.map((card) => (
          <article
            key={card.id}
            className="overflow-hidden rounded-[1.5rem] border border-zinc-200/80 bg-white/88 shadow-[0_14px_36px_rgba(24,24,27,0.05)]"
          >
            <div className="border-b border-zinc-200/80 px-4 py-4 sm:px-5">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-zinc-950 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white">
                  {card.badge}
                </span>
                <span className="text-[0.72rem] font-semibold text-zinc-500">{card.note}</span>
              </div>
              <h3 className="mt-3 text-[1.08rem] font-semibold tracking-[-0.04em] text-zinc-950">
                {card.label}
              </h3>
              <p className="mt-2 text-[0.84rem] leading-6 text-zinc-600">{card.description}</p>
            </div>

            <div className="h-[25rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.98),rgba(232,234,239,0.92)_52%,rgba(223,226,233,0.86)_100%)]">
              <Suspense fallback={<LoadingState />}>
                <SkeletonScene skeletonId={card.id} />
              </Suspense>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

useFBX.preload("/models/shooting-arrow-50-trim24-skin-test.fbx");
useGLTF.preload("/models/playground-character-model-1k.glb");
