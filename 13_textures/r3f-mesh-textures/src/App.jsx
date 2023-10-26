// Importing necessary dependencies
import React, { useEffect, useRef } from "react";

import * as THREE from "three";

import { Canvas, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import {
  OrbitControls,
  PerspectiveCamera,
  useTexture,
} from "@react-three/drei";

import { useControls } from "leva";

import "./App.css";

// initialize the loader
const textureLoader = new THREE.TextureLoader();

// load the grass textures
const grassAlbedo = textureLoader.load(
  "/textures/whispy-grass-meadow-bl/wispy-grass-meadow_albedo.png"
);
const grassAo = textureLoader.load(
  "/textures/whispy-grass-meadow-bl/wispy-grass-meadow_ao.png"
);
const grassHeight = textureLoader.load(
  "/textures/whispy-grass-meadow-bl/wispy-grass-meadow_height.png"
);
const grassMetallic = textureLoader.load(
  "/textures/whispy-grass-meadow-bl/wispy-grass-meadow_metallic.png"
);
const grassNormal = textureLoader.load(
  "/textures/whispy-grass-meadow-bl/wispy-grass-meadow_normal-ogl.png"
);
const grassRoughness = textureLoader.load(
  "/textures/whispy-grass-meadow-bl/wispy-grass-meadow_roughness.png"
);

// Method 1
const Grass = ({ position, metalness, roughness, displacement }) => {
  const geometryRef = useRef();

  const material = new THREE.MeshStandardMaterial({
    map: grassAlbedo,
    roughnessMap: grassRoughness,
    metalnessMap: grassMetallic,
    normalMap: grassNormal,
    displacementMap: grassHeight,
    aoMap: grassAo,
    displacementScale: 0.1,
  });

  // Adjust as need me
  material.metalness = metalness;
  material.roughness = roughness;
  material.displacementScale = displacement;
  material.aoMapIntensity = 1.0;

  useEffect(() => {
    if (geometryRef.current) {
      const geometry = geometryRef.current;
      const uv2Geometry = new THREE.BufferAttribute(
        geometry.attributes.uv.array,
        2
      );
      geometry.setAttribute("uv2", uv2Geometry);
    }
  }, []);

  return (
    <mesh position={position} material={material}>
      <sphereGeometry ref={geometryRef} args={[1, 32, 32]} />
    </mesh>
  );
};

// Method 2
const boulderMetallic = textureLoader.load(
  "/textures/badlands-boulders-bl/badlands-boulders_metallic.png"
);

const Boulder = ({ position, displacement }) => {
  const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useLoader(
    TextureLoader,
    [
      "/textures/badlands-boulders-bl/badlands-boulders_albedo.png",
      "/textures/badlands-boulders-bl/badlands-boulders_height.png",
      "/textures/badlands-boulders-bl/badlands-boulders_normal-ogl.png",
      "/textures/badlands-boulders-bl/badlands-boulders_roughness.png",
      "/textures/badlands-boulders-bl/badlands-boulders_ao.png",
    ]
  );

  return (
    <mesh position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        position={position}
        map={colorMap}
        displacementMap={displacementMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        aoMap={aoMap}
        metalnessMap={boulderMetallic}
        displacementScale={displacement}
      />
    </mesh>
  );
};

// Method 3
const SpaceCruiser = ({ position, displacement }) => {
  const geometryRef = useRef();

  const props = useTexture({
    map: "/textures/space-cruiser-panels2-bl/space-cruiser-panels2_albedo.png",
    displacementMap:
      "/textures/space-cruiser-panels2-bl/space-cruiser-panels2_height.png",
    normalMap:
      "/textures/space-cruiser-panels2-bl/space-cruiser-panels2_normal-ogl.png",
    roughnessMap:
      "/textures/space-cruiser-panels2-bl/space-cruiser-panels2_roughness.png",
    aoMap: "/textures/space-cruiser-panels2-bl/space-cruiser-panels2_ao.png",
    metalnessMap:
      "/textures/space-cruiser-panels2-bl/space-cruiser-panels2_metallic.png",
  });

  return (
    <mesh position={position}>
      <sphereGeometry ref={geometryRef} args={[1, 32, 32]} />
      <meshStandardMaterial {...props} displacementScale={displacement} />
    </mesh>
  );
};

// App Component
function App() {
  const {
    lightIntensity,
    lightColor,
    grassMetalness,
    grassRoughness,
    grassDisplacement,
    boulderDisplacement,
    cruiserDisplacement,
  } = useControls({
    lightIntensity: {
      value: 1.2,
      min: 0,
      max: 3,
      step: 0.1,
    },
    lightColor: "#ffffff",
    grassMetalness: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.01,
    },
    grassRoughness: {
      value: 1,
      min: 0,
      max: 1,
      step: 0.01,
    },
    grassDisplacement: {
      value: 0.1,
      min: 0,
      max: 1,
      step: 0.01,
    },
    boulderDisplacement: {
      value: 0.1,
      min: 0,
      max: 1,
      step: 0.01,
    },
    cruiserDisplacement: {
      value: 0.1,
      min: 0,
      max: 1,
      step: 0.01,
    },
  });

  return (
    <Canvas>
      <PerspectiveCamera
        makeDefault
        position={[0, 5, 10]}
        fov={35}
        near={0.1}
        far={1000}
        aspect={window.innerWidth / window.innerHeight}
      />
      <ambientLight color={0xffffff} intensity={0.4} />
      <directionalLight
        color={lightColor}
        intensity={lightIntensity}
        position={[5, 5, 5]}
      />
      <group>
        <Boulder position={[2.5, 0, 0]} displacement={boulderDisplacement} />
        <SpaceCruiser
          position={[-2.5, 0, 0]}
          displacement={cruiserDisplacement}
        />
        <Grass
          position={[0, 0, 0]}
          metalness={grassMetalness}
          roughness={grassRoughness}
          displacement={grassDisplacement}
        />
      </group>
      <OrbitControls enableDamping />
    </Canvas>
  );
}
// Exporting the App component as the default export.
export default App;
