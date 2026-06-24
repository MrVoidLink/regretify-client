"use client";

import { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three-stdlib";
import { MeshStandardMaterial } from "three";
import { arrowScale } from "@/features/calculator/lib/mini-game/constants";
import { applyTemporaryMaterial, forceArrowInFront } from "@/features/calculator/lib/mini-game/sceneUtils";
import type { ArrowImpactState } from "@/features/calculator/lib/mini-game/types";

export function MiniGameImpactArrow({ impact }: { impact: ArrowImpactState }) {
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
