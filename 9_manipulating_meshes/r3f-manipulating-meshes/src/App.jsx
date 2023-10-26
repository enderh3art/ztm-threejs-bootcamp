import React, { useRef } from "react";
import * as THREE from "three"; // Importing from THREE to access utilities
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useControls } from "leva";
import "./App.css";

// Cube Component:
// This component represents an individual 3D cube that has adjustable properties through 'leva' UI controls.
function Cube({ basePosition, id }) {
  // A reference to the 3D mesh for accessing and updating its properties during runtime.
  const meshRef = useRef();

  // Define the controls for the Cube using leva's useControls.
  // This allows for dynamic adjustments of mesh properties via a GUI.
  const { rotationX, rotationY, scale, posX, posY, posZ, color } = useControls(
    id,
    {
      rotationX: { value: 45, min: 0, max: 360 },
      rotationY: { value: 90, min: 0, max: 360 },
      scale: { value: 1, min: 0.5, max: 3 },
      posX: { value: 0, min: -5, max: 5, step: 0.1 },
      posY: { value: 0, min: -5, max: 5, step: 0.1 },
      posZ: { value: 0, min: -5, max: 5, step: 0.1 },
      color: "red",
    }
  );

  // useFrame allows for animations or continuous updates.
  // Here, we continuously update the cube's properties based on the leva controls.
  useFrame(() => {
    if (meshRef.current) {
      // Apply rotations, converted from degrees to radians.
      meshRef.current.rotation.x = THREE.MathUtils.degToRad(rotationX);
      meshRef.current.rotation.y = THREE.MathUtils.degToRad(rotationY);

      // Apply scale uniformly across all axes.
      meshRef.current.scale.set(scale, scale, scale);

      // Set position by adding the base position and controlled position.
      meshRef.current.position.set(
        basePosition[0] + posX,
        basePosition[1] + posY,
        basePosition[2] + posZ
      );
    }
  });

  return (
    // Render a 3D box (or cube) with a wireframe material.
    <Box ref={meshRef} args={[1, 1, 1]}>
      <meshBasicMaterial color={color} wireframe />
    </Box>
  );
}

// Main App Component:
// This component sets up the 3D scene, camera, and renders multiple Cube components.
function App() {
  // Define the controls for the group that holds all the cubes.
  // This allows for manipulating the entire group of cubes as one unit.
  const {
    groupScale,
    groupRotationX,
    groupRotationY,
    groupPosX,
    groupPosY,
    groupPosZ,
  } = useControls("Group Controls", {
    groupScale: { value: 1, min: 0.5, max: 3 },
    groupRotationX: { value: 0, min: 0, max: 360 },
    groupRotationY: { value: 0, min: 0, max: 360 },
    groupPosX: { value: 0, min: -5, max: 5, step: 0.1 },
    groupPosY: { value: 0, min: -5, max: 5, step: 0.1 },
    groupPosZ: { value: 0, min: -5, max: 5, step: 0.1 },
  });

  return (
    // Canvas sets up the WebGL context and scene for @react-three/fiber.
    <Canvas>
      {/* Set background color for the scene */}
      <color attach="background" args={["black"]} />

      {/* Define a perspective camera */}
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 5]}
        fov={75}
        near={0.1}
        far={30}
        aspect={window.innerWidth / window.innerHeight}
      />

      {/* Group of Cube components with controlled scale, rotation, and position */}
      <group
        scale={groupScale}
        rotation={[
          THREE.MathUtils.degToRad(groupRotationX),
          THREE.MathUtils.degToRad(groupRotationY),
          0,
        ]}
        position={[groupPosX, groupPosY, groupPosZ]}
      >
        <Cube id="Cube 1 Controls" basePosition={[0, 1, 0]} />
        <Cube id="Cube 2 Controls" basePosition={[-2, 0, 0]} />
        <Cube id="Cube 3 Controls" basePosition={[2, 0, 0]} />
      </group>

      {/* Controls for rotating, zooming, and panning the view */}
      <OrbitControls enableDamping />

      {/* Visual representation of the X, Y, and Z axes */}
      <axesHelper args={[2]} />
    </Canvas>
  );
}

export default App;
