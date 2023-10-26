import React, { useRef } from "react";

import * as THREE from "three";

import { Canvas, useFrame } from "@react-three/fiber";
import { Box, OrbitControls, PerspectiveCamera } from "@react-three/drei";

import { useControls } from "leva";

import "./App.css";

function Cube() {
  const meshRef = useRef();

  // Leva controls for tweaking the cube's animation parameters in real-time.
  // - rotationSpeed: Controls how fast the cube rotates.
  // - scaleXMultiplier: Adjusts the amplitude of the cube's X-axis scaling.
  // - positionXMultiplier: Adjusts the amplitude of the cube's X-axis position.
  const { rotationSpeed, scaleXMultiplier, positionXMultiplier } = useControls({
    rotationSpeed: { value: 20, min: 1, max: 100, step: 1 },
    scaleXMultiplier: { value: 20, min: 1, max: 50, step: 1 },
    positionXMultiplier: { value: 2, min: 1, max: 10, step: 0.1 },
  });

  // Frame-by-frame animation for the cube.
  // The cube rotates, scales, and changes position based on the controlled parameters.
  useFrame((state, delta) => {
    if (meshRef.current) {
      const currentTime = state.clock.getElapsedTime();
      meshRef.current.rotation.y +=
        THREE.MathUtils.degToRad(1) * delta * rotationSpeed; // Dynamic rotation.
      meshRef.current.scale.x = Math.sin(currentTime) * scaleXMultiplier + 2; // Oscillating scale.
      meshRef.current.position.x =
        Math.sin(currentTime) * positionXMultiplier + 2; // Oscillating position.
    }
  });

  return (
    <Box ref={meshRef} args={[1, 1, 1]}>
      {/* Basic red wireframe material for the cube. */}
      <meshBasicMaterial color="red" wireframe />
    </Box>
  );
}

function App() {
  return (
    <Canvas>
      {/* Set background color for the 3D scene. */}
      <color attach="background" args={["black"]} />

      {/* Perspective camera setup with an optimal view of the cube. */}
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 5]}
        fov={75}
        near={0.1}
        far={30}
        aspect={window.innerWidth / window.innerHeight}
      />

      {/* Render the animated cube component. */}
      <Cube />

      {/* Enable interactivity controls (zoom, pan, rotate) for the 3D scene. */}
      <OrbitControls enableDamping />
    </Canvas>
  );
}

export default App;
