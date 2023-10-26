import React, { useMemo } from "react";

import * as THREE from "three";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useControls } from "leva";

import "./App.css";

function PhysicalMesh({ position }) {
  const { metalness, roughness, reflectivity, clearcoat } = useControls(
    "Physical Material",
    {
      metalness: { value: 0.8, min: 0, max: 1, step: 0.01 },
      roughness: { value: 0.2, min: 0, max: 1, step: 0.01 },
      reflectivity: { value: 0.5, min: 0, max: 1, step: 0.01 },
      clearcoat: { value: 0.9, min: 0, max: 1, step: 0.01 },
    }
  );

  return (
    <mesh position={position}>
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <meshPhysicalMaterial
        attach="material"
        metalness={metalness}
        roughness={roughness}
        reflectivity={reflectivity}
        clearcoat={clearcoat}
        color="blue" // Set the initial color to blue for PhysicalMaterial
      />
    </mesh>
  );
}

function LambertMesh({ position }) {
  const { color, emissive } = useControls("Lambert Material", {
    color: "#ff0000", // Initial color set to red
    emissive: "#000000", // Emissive color
  });

  return (
    <mesh position={position}>
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <meshLambertMaterial
        attach="material"
        color={color}
        emissive={emissive}
      />
    </mesh>
  );
}

function PhongMesh({ position }) {
  const { color, shininess, specular, emissive } = useControls(
    "Phong Material",
    {
      color: "#00ff00", // Initial color set to green
      shininess: { value: 30, min: 0, max: 100, step: 1 },
      specular: "#ffffff",
      emissive: "#000000", // Emissive color
    }
  );

  return (
    <mesh position={position}>
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <meshPhongMaterial
        attach="material"
        color={color}
        shininess={shininess}
        specular={specular}
        emissive={emissive}
      />
    </mesh>
  );
}

function StandardMesh({ position }) {
  const { color, roughness, metalness, emissive } = useControls(
    "Standard Material",
    {
      color: "#ffff00", // Initial color set to yellow
      roughness: { value: 0.5, min: 0, max: 1, step: 0.01 },
      metalness: { value: 0.0, min: 0, max: 1, step: 0.01 },
      emissive: "#000000", // Emissive color
    }
  );

  return (
    <mesh position={position}>
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial
        attach="material"
        color={color}
        roughness={roughness}
        metalness={metalness}
        emissive={emissive}
      />
    </mesh>
  );
}

// App Component
function App() {
  return (
    <Canvas>
      <PerspectiveCamera
        makeDefault
        position={[-2, 5, 8]}
        fov={35}
        near={0.1}
        far={200}
        aspect={window.innerWidth / window.innerHeight}
      />
      <ambientLight color={0xffffff} intensity={0.2} />
      <directionalLight color={0xffffff} intensity={0.9} position={[5, 5, 5]} />
      <LambertMesh position={[-2.5, 0, 0]} />
      <PhongMesh position={[-0.5, 0, 0]} />
      <StandardMesh position={[1.5, 0, 0]} />
      <PhysicalMesh position={[3.5, 0, 0]} />
      <OrbitControls enableDamping />
    </Canvas>
  );
}

export default App;
