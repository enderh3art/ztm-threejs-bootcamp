import React, { Suspense } from "react";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  useGLTF,
  Html,
  useProgress,
} from "@react-three/drei";

import { useControls } from "leva";

import "./App.css";

const Models = [
  { title: "BoomBox", url: "/models/boomBoxGLTF/BoomBox.gltf" },
  { title: "MilkTruck", url: "/models/milkTruckGLB/CesiumMilkTruck.glb" },
];

const Model = ({ url, scale }) => {
  const gltf = useGLTF(url, "/draco/");

  console.log(gltf);

  // Once the model is loaded, you can manipulate it
  if (gltf) {
    const modelScene = gltf.scene;

    // Set the scale based on the input value
    modelScene.scale.setScalar(scale);

    // Traverse through the model's children to adjust target individual materials
    modelScene.traverse((child) => {
      if (child.isMesh) {
        child.material.envMapIntensity = 1.5;
      }

      // Adusted based on a name
      if (child.name === "Wheels001") {
        child.material = new THREE.MeshBasicMaterial({
          color: "red",
        });
      }
    });
  }

  return <primitive object={gltf.scene} />;
};

// Progress Bar for Loading models
function Loader() {
  const { progress } = useProgress();
  return (
    <Html
      center
      style={{
        color: "white",
      }}
    >
      {progress} % loaded
    </Html>
  );
}

function App() {
  const { title, scale } = useControls({
    title: {
      options: Models.map(({ title }) => title),
    },
    scale: {
      value: 1, // Initial scale value
      min: 0.01, // Minimum scale value
      max: 10, // Maximum scale value
    },
  });

  return (
    <Canvas>
      <Environment
        background
        files={["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]}
        path={"textures/"}
      />
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 5]}
        fov={35}
        near={0.1}
        far={200}
        aspect={window.innerWidth / window.innerHeight}
      />

      {/* Add Lights to the scene */}
      <ambientLight args={[0xffffff, 0.5]} />
      <pointLight args={[0xffffff, 0.5]} position={[2, 2, 2]} />

      <Suspense fallback={<Loader />}>
        <group>
          <Model
            url={Models[Models.findIndex((m) => m.title === title)].url}
            scale={scale}
          />
        </group>
      </Suspense>

      <OrbitControls enableDamping />
    </Canvas>
  );
}

// Preload all of the models - equivalent to gltfLoader.Async
// useGLTF.preload(Models.map(({ url }) => url));

// Exporting the App component as the default export.
export default App;
