import React from "react";

import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

export function Sun({ texture, scale }) {
  const sunTexture = useLoader(TextureLoader, texture);

  return (
    <mesh scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={sunTexture} />
    </mesh>
  );
}
