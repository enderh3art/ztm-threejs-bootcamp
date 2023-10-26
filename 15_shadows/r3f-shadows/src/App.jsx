import React, { useRef } from "react";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  useHelper,
  SpotLight,
} from "@react-three/drei";

import { useControls } from "leva";

import "./App.css";

const DirectionHelper = () => {
  const ref = useRef();
  useHelper(ref, THREE.DirectionalLightHelper);

  useControls("Directional Light", {
    visible: {
      value: true,
      onChange: (v) => {
        ref.current.visible = v;
      },
    },
    color: {
      value: "pink",
      onChange: (v) => {
        ref.current.color = new THREE.Color(v);
      },
    },
    position: {
      x: 3,
      y: 10,
      z: 15,
      onChange: (v) => {
        ref.current.position.copy(v);
      },
    },
    intensity: {
      value: 0.2,
      onChange: (v) => {
        ref.current.intensity = v;
      },
    },
  });

  return (
    <directionalLight
      ref={ref}
      color="pink"
      intensity={0.2}
      position={[3, 10, 15]}
      shadow-mapSize={[1024, 1024]}
      shadow-radius={10}
      castShadow
    >
      <orthographicCamera
        attach="shadow-camera"
        args={[-0.1, 0.1, 0.1, -0.1]}
      />
    </directionalLight>
  );
};

const PointHelper = () => {
  const ref = useRef();
  useHelper(ref, THREE.PointLightHelper);

  useControls("Point Light", {
    visible: {
      value: true,
      onChange: (v) => {
        ref.current.visible = v;
      },
    },
    color: {
      value: "orange",
      onChange: (v) => {
        ref.current.color = new THREE.Color(v);
      },
    },
    position: {
      x: -3,
      y: 2,
      z: -3,
      onChange: (v) => {
        ref.current.position.copy(v);
      },
    },
    intensity: {
      value: 10,
      onChange: (v) => {
        ref.current.intensity = v;
      },
    },
  });

  return (
    <pointLight
      ref={ref}
      color="orange"
      intensity={0.6}
      position={[-3, 2, -3]}
      shadow-mapSize={[1024, 1024]}
      shadow-radius={10}
      castShadow
    />
  );
};

const SpotHelper = () => {
  const lightref = useRef();
  useHelper(lightref, THREE.SpotLightHelper);

  useControls("Spot Light", {
    visible: {
      value: true,
      onChange: (v) => {
        lightref.current.visible = v;
      },
    },
    color: {
      value: "white",
      onChange: (v) => {
        lightref.current.color = new THREE.Color(v);
      },
    },
    intensity: {
      value: 50,
      onChange: (v) => {
        lightref.current.intensity = v;
      },
    },
    position: {
      x: 8,
      y: 4,
      z: 4,
      onChange: (v) => {
        lightref.current.position.copy(v);
      },
    },
    target: {
      x: 0,
      y: -1,
      z: 0,
      onChange: (v) => {
        lightref.current.target.position.copy(v);
      },
    },
    distance: {
      value: 20,
      onChange: (v) => {
        lightref.current.distance = v;
      },
    },
  });

  return (
    <SpotLight
      ref={lightref}
      distance={20}
      color="white"
      intensity={100}
      position={[8, 4, 4]}
      angle={Math.PI * 0.1}
      shadow-mapSize={[1024, 1024]}
      shadow-radius={10}
      shadow-camera-near={1}
      shadow-camera-far={100}
      shadow-camera-fov={30}
      castShadow
    ></SpotLight>
  );
};

// App Component
function App() {
  return (
    <Canvas shadows>
      <color attach="background" args={["#202020"]} />
      <PerspectiveCamera
        makeDefault
        position={[0, 5, 10]}
        fov={35}
        near={0.1}
        far={1000}
        aspect={window.innerWidth / window.innerHeight}
      />

      <DirectionHelper />
      <PointHelper />
      <SpotHelper />

      <mesh position={[-2, 0, 0]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={0xffffff}
          metalness={0.0}
          roughness={0.1}
        />
      </mesh>

      <mesh position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[0.75, 8, 8]} />
        <meshStandardMaterial
          color={0xffffff}
          metalness={0.0}
          roughness={0.1}
        />
      </mesh>

      <mesh position={[2, 0, 0]} castShadow>
        <torusKnotGeometry args={[0.5, 0.15, 100, 16]} />
        <meshStandardMaterial
          color={0xffffff}
          metalness={0.0}
          roughness={0.1}
        />
      </mesh>

      <mesh
        position={[0, -2, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[20, 20, 20]}
        receiveShadow
      >
        <circleGeometry args={[0.5, 32]} />
        <meshStandardMaterial
          color={new THREE.Color(0xffffff)}
          metalness={0.0}
          roughness={0.1}
        />
      </mesh>

      <OrbitControls enableDamping />
    </Canvas>
  );
}

export default App;
