import React from "react";

// import * as THREE from "three";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

import { useControls } from "leva";

import "./App.css";

function Sphere() {
  // Leva controls to manipulate sphere properties in real-time
  const { wireframe, color, radius, radialSegments } = useControls("Sphere", {
    wireframe: true,
    color: "#ff0000",
    radius: { value: 1, min: 0.1, max: 3, step: 0.1 },
    radialSegments: { value: 16, min: 3, max: 100, step: 1 },
  });

  return (
    <mesh position={[-2, -2, 0]}>
      {/* Define the SphereGeometry with controlled properties */}
      <sphereGeometry args={[radius, radialSegments, radialSegments]} />
      <meshBasicMaterial color={color} wireframe={wireframe} />
    </mesh>
  );
}

function Icosahedron() {
  // Leva controls for icosahedron properties
  const { wireframe, color, radius } = useControls("Icosahedron", {
    wireframe: true,
    color: "#00ff00",
    radius: { value: 1, min: 0.1, max: 3, step: 0.1 },
  });

  return (
    <mesh position={[-2, 2, 0]}>
      {/* Define the IcosahedronGeometry with controlled properties */}
      <icosahedronGeometry args={[radius, 1]} />
      <meshBasicMaterial color={color} wireframe={wireframe} />
    </mesh>
  );
}

function Torus() {
  // Leva controls for torus properties
  const { wireframe, color, radius, tube, radialSegments, tubularSegments } =
    useControls("Torus", {
      wireframe: true,
      color: "#0000ff",
      radius: { value: 1, min: 0.1, max: 3, step: 0.1 },
      tube: { value: 0.3, min: 0.1, max: 1, step: 0.1 },
      radialSegments: { value: 16, min: 3, max: 100, step: 1 },
      tubularSegments: { value: 100, min: 3, max: 200, step: 1 },
    });

  return (
    <mesh position={[2, -2, 0]}>
      {/* Define the TorusGeometry with controlled properties */}
      <torusGeometry args={[radius, tube, radialSegments, tubularSegments]} />
      <meshBasicMaterial color={color} wireframe={wireframe} />
    </mesh>
  );
}

function Plane() {
  // Leva controls for plane properties
  const { wireframe, color, width, height } = useControls("Plane", {
    wireframe: true,
    color: "#ffff00",
    width: { value: 1, min: 0.1, max: 3, step: 0.1 },
    height: { value: 1, min: 0.1, max: 3, step: 0.1 },
  });

  return (
    <mesh position={[2, 2, 0]}>
      {/* Define the PlaneGeometry with controlled properties */}
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial color={color} wireframe={wireframe} />
    </mesh>
  );
}

function App() {
  return (
    <Canvas>
      <color attach="background" args={["black"]} />
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 5]}
        fov={75}
        near={0.1}
        far={30}
        aspect={window.innerWidth / window.innerHeight}
      />

      <Sphere />
      <Icosahedron />
      <Torus />
      <Plane />

      <OrbitControls enableDamping />
    </Canvas>
  );
}

export default App;
