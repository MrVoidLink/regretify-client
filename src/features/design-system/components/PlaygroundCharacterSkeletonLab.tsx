"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import {
  ContactShadows,
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  AnimationAction,
  AnimationMixer,
  Box3,
  Mesh,
  Object3D,
  SkeletonHelper,
  Vector3,
} from "three";
import { SkeletonUtils } from "three-stdlib";

const playgroundCompressedCharacterGlbPath =
  "/models/character-512-rig-25000poly-compressed.glb";

function enableShadowCasting(source: Object3D) {
  source.traverse((child) => {
    if (child instanceof Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
}

function CharacterStage({
  helper,
  root,
}: {
  helper: SkeletonHelper;
  root: Object3D;
}) {
  const stageConfig = useMemo(() => {
    root.updateMatrixWorld(true);
    const bounds = new Box3().setFromObject(root);
    const center = bounds.getCenter(new Vector3());
    const size = bounds.getSize(new Vector3());
    const normalizedScale = size.y > 1e-6 ? 3.15 / size.y : 1;
    const stageFloorY = -1.72;

    return {
      offset: [
        -center.x * normalizedScale,
        stageFloorY - bounds.min.y * normalizedScale,
        -center.z * normalizedScale,
      ] as const,
      scale: normalizedScale,
    };
  }, [root]);

  return (
    <group position={[0, 0, 0]} rotation={[0, Math.PI / 10, 0]}>
      <group position={stageConfig.offset} scale={stageConfig.scale}>
        <primitive object={root} />
        <primitive object={helper} />
      </group>
    </group>
  );
}

function CandidateCompressedCharacter({ isPlaying }: { isPlaying: boolean }) {
  const { animations, scene } = useGLTF(playgroundCompressedCharacterGlbPath);
  const actionRef = useRef<AnimationAction | null>(null);
  const asset = useMemo(() => {
    const clonedScene = SkeletonUtils.clone(scene);
    const clip = animations.find((candidate) => candidate.duration > 0.05) ?? animations[0] ?? null;
    const mixer = clip ? new AnimationMixer(clonedScene) : null;
    const action = mixer && clip ? mixer.clipAction(clip) : null;
    const helper = new SkeletonHelper(clonedScene);

    enableShadowCasting(clonedScene);
    clonedScene.updateMatrixWorld(true);
    helper.visible = true;

    return { action, helper, mixer, scene: clonedScene };
  }, [animations, scene]);

  useEffect(() => {
    if (!asset.action) {
      return;
    }

    actionRef.current = asset.action;
    actionRef.current.reset();
    actionRef.current.play();
    actionRef.current.paused = !isPlaying;

    return () => {
      actionRef.current?.stop();
      actionRef.current = null;
    };
  }, [asset, isPlaying]);

  useEffect(() => {
    if (!actionRef.current) {
      return;
    }

    actionRef.current.paused = !isPlaying;
  }, [isPlaying]);

  useFrame((_, delta) => {
    if (!isPlaying) {
      return;
    }

    asset.mixer?.update(delta);
  });

  return <CharacterStage helper={asset.helper} root={asset.scene} />;
}

function LoadingState() {
  return (
    <div className="flex h-full items-center justify-center rounded-[1.35rem] border border-zinc-200/80 bg-white/75 text-[0.88rem] font-medium text-zinc-500">
      Loading character...
    </div>
  );
}

function PreviewScene({ isPlaying }: { isPlaying: boolean }) {
  return (
    <Canvas dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }} shadows="percentage">
      <PerspectiveCamera makeDefault position={[0, 0.65, 5.4]} fov={20} />
      <ambientLight intensity={2.15} />
      <hemisphereLight intensity={1.15} groundColor="#d9e0ea" color="#ffffff" />
      <directionalLight intensity={1.25} position={[4.1, 5.8, 3.1]} />
      <directionalLight intensity={1.05} position={[-3.8, 4.2, 4.8]} />
      <directionalLight intensity={0.85} position={[0.2, 2.6, -4.8]} />
      <directionalLight intensity={0.7} position={[3.4, 2.4, -3.6]} />
      <spotLight intensity={0.95} angle={0.62} penumbra={1} position={[0, 2.1, 5.1]} />

      <CandidateCompressedCharacter isPlaying={isPlaying} />

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

export function PlaygroundCharacterSkeletonLab() {
  const [isPreviewActive, setIsPreviewActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="rounded-[1.75rem] border border-zinc-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(246,246,249,0.96)_100%)] p-5 shadow-[0_18px_48px_rgba(24,24,27,0.06)] sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand)]">
            Character Lab
          </p>
          <h2 className="mt-3 text-[1.7rem] font-semibold tracking-[-0.06em] text-zinc-950 sm:text-[2rem]">
            Compressed GLB preview
          </h2>
          <p className="mt-2 max-w-[48rem] text-[0.92rem] leading-6 text-zinc-600">
            This is the compressed character candidate imported from the desktop. The mesh stays
            visible and the skeleton helper stays overlaid so you can judge silhouette, rig
            structure, and animation behavior before attempting a mini-game swap.
          </p>
        </div>
        <div className="rounded-full border border-zinc-200/80 bg-white px-3.5 py-1.5 text-[0.72rem] font-semibold text-zinc-600 shadow-[0_10px_24px_rgba(24,24,27,0.05)]">
          <span>1 candidate loaded</span>
        </div>
      </div>

      <article className="mt-6 overflow-hidden rounded-[1.5rem] border border-zinc-200/80 bg-white/88 shadow-[0_14px_36px_rgba(24,24,27,0.05)]">
        <div className="border-b border-zinc-200/80 px-4 py-4 sm:px-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[var(--color-brand-soft)] px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-brand)]">
                Candidate
              </span>
              <span className="rounded-full bg-zinc-950 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white">
                GLB
              </span>
            </div>
            <h3 className="mt-3 text-[1.08rem] font-semibold tracking-[-0.04em] text-zinc-950">
              character-512-rig-25000poly-compressed.glb
            </h3>
            <p className="mt-2 max-w-[42rem] text-[0.84rem] leading-6 text-zinc-600">
              Turn the preview on when you want to mount the 3D scene. Animation playback is
              separate so you can inspect the static pose first and then run the embedded clip.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2 rounded-[1.1rem] border border-zinc-200/80 bg-zinc-50/80 p-3">
            <button
              type="button"
              onClick={() => {
                setIsPreviewActive((current) => {
                  const next = !current;

                  if (!next) {
                    setIsPlaying(false);
                  }

                  return next;
                });
              }}
              className={`inline-flex min-h-10 items-center justify-center rounded-full border px-3.5 py-1.5 text-[0.76rem] font-semibold transition-colors ${
                isPreviewActive
                  ? "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100"
                  : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100"
              }`}
            >
              {isPreviewActive ? "Turn Off" : "Turn On"}
            </button>
            <button
              type="button"
              disabled={!isPreviewActive}
              onClick={() => {
                setIsPlaying((current) => !current);
              }}
              className={`inline-flex min-h-10 items-center justify-center rounded-full border px-3.5 py-1.5 text-[0.76rem] font-semibold transition-colors ${
                isPreviewActive
                  ? "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100"
                  : "cursor-not-allowed border-zinc-200 bg-zinc-100 text-zinc-400"
              }`}
            >
              {isPlaying ? "Pause Animation" : "Play Animation"}
            </button>
            <p className="text-[0.76rem] text-zinc-500">
              اول `Turn On` را بزن، بعد اگر خواستی `Play Animation`.
            </p>
          </div>
        </div>

        <div className="h-[25rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.98),rgba(232,234,239,0.92)_52%,rgba(223,226,233,0.86)_100%)]">
          {isPreviewActive ? (
            <Suspense fallback={<LoadingState />}>
              <PreviewScene isPlaying={isPlaying} />
            </Suspense>
          ) : (
            <div className="flex h-full items-center justify-center px-6 text-center">
              <div className="rounded-[1.25rem] border border-dashed border-zinc-300/90 bg-white/65 px-6 py-4 text-[0.84rem] leading-6 text-zinc-500">
                Preview is off.
                <br />
                Use <span className="font-semibold text-zinc-700">Turn On</span> to mount the
                compressed character scene.
              </div>
            </div>
          )}
        </div>
      </article>
    </section>
  );
}

useGLTF.preload(playgroundCompressedCharacterGlbPath);
