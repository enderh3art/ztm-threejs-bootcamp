import React, { useRef } from "react";

import { useFrame, useLoader } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";

// Moon Functionality
function Moon({ texture, radius, distance, position, speed, orbitAround }) {
  const ref = useRef();
  const props = useTexture({
    map: texture,
  });

  useFrame(() => {
    if (orbitAround) {
      ref.current.rotation.y += speed;
      ref.current.position.x = Math.sin(ref.current.rotation.y) * distance;
      ref.current.position.z = Math.cos(ref.current.rotation.y) * distance;
    }
  });

  return (
    <mesh ref={ref} scale={radius} position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial {...props} />
    </mesh>
  );
}

// Core Planet Logic
export function Planet({
  texture,
  radius,
  distance,
  position,
  speed,
  moons,
  orbitAround,
}) {
  const ref = useRef();
  const textureMap = useLoader(TextureLoader, texture);

  useFrame(() => {
    if (orbitAround) {
      ref.current.rotation.y += speed;
      ref.current.position.x = Math.sin(ref.current.rotation.y) * distance;
      ref.current.position.z = Math.cos(ref.current.rotation.y) * distance;
    }
  });

  return (
    <mesh ref={ref} scale={radius} position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={textureMap} />
      {moons &&
        moons.map((moon, index) => (
          <Moon
            key={index}
            texture={moon.texture}
            radius={moon.radius}
            position={[moon.distance, 0, 0]}
            distance={moon.distance}
            speed={moon.speed}
            orbitAround
          />
        ))}
    </mesh>
  );
}
