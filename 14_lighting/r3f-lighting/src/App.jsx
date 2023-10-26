import React, { useRef } from "react";

import * as THREE from "three";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  useHelper,
  SpotLight,
} from "@react-three/drei";

import { useControls } from "leva";

import "./App.css";

const AmbientHelper = () => {
  const ref = useRef();

  useControls("Ambient Light", {
    color: {
      value: "#CBC3E3",
      onChange: (v) => {
        ref.current.color = new THREE.Color(v);
      },
    },
    intensity: {
      value: 0.2,
      onChange: (v) => {
        ref.current.intensity = v;
      },
    },
  });

  return <ambientLight ref={ref} color={0xc870ff} intensity={0.2} />;
};

const HemisphereHelper = () => {
  const ref = useRef();
  useHelper(ref, THREE.HemisphereLightHelper);

  useControls("Hemisphere Light", {
    skyColor: {
      value: "red",
      onChange: (v) => {
        ref.current.skyColor = new THREE.Color(v);
      },
    },
    groundColor: {
      value: "blue",
      onChange: (v) => {
        ref.current.groundColor = new THREE.Color(v);
      },
    },
    intensity: {
      value: 0.1,
      onChange: (v) => {
        ref.current.intensity = v;
      },
    },
  });

  return (
    <hemisphereLight
      ref={ref}
      args={[0xff0000, 0x0000ff, 0.1]}
      position={[0, 10, 0]}
    />
  );
};

const DirectionHelper = () => {
  const ref = useRef();
  useHelper(ref, THREE.DirectionalLightHelper);

  useControls("Directional Light", {
    color: {
      value: "#40e0d0",
      onChange: (v) => {
        ref.current.color = new THREE.Color(v);
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
      color={0x59ffe9}
      intensity={0.2}
      position={[3, 10, 15]}
      castShadow
    />
  );
};

const PointHelper = () => {
  const ref = useRef();
  useHelper(ref, THREE.PointLightHelper);

  useControls("Point Light", {
    color: {
      value: "orange",
      onChange: (v) => {
        ref.current.color = new THREE.Color(v);
      },
    },
    intensity: {
      value: 0.5,
      onChange: (v) => {
        ref.current.intensity = v;
      },
    },
  });

  return (
    <pointLight
      ref={ref}
      color={0xff810a}
      intensity={0.5}
      position={[-3, 2, -3]}
    />
  );
};

const RectHelper = () => {
  const ref = useRef();
  useHelper(ref, RectAreaLightHelper);

  useControls("Rect Area Light", {
    color: {
      value: "red",
      onChange: (v) => {
        ref.current.color = new THREE.Color(v);
      },
    },
    intensity: {
      value: 0.5,
      onChange: (v) => {
        ref.current.intensity = v;
      },
    },
  });

  useFrame(() => {
    // Update the light's rotation to make it look at a point
    const targetPoint = new THREE.Vector3(0, 0, 0);
    ref.current.lookAt(targetPoint);
  });

  return (
    <rectAreaLight
      ref={ref}
      args={[0xff0000, 0.5, 10, 10]}
      position={[-10, 5, 5]}
    />
  );
};

const SpotHelper = () => {
  const lightref = useRef();
  useHelper(lightref, THREE.SpotLightHelper);

  useControls("Spot Light", {
    color: {
      value: "#40e0d0",
      onChange: (v) => {
        lightref.current.color = new THREE.Color(v);
      },
    },
    intensity: {
      value: 0.5,
      onChange: (v) => {
        lightref.current.intensity = v;
      },
    },
  });

  return (
    <SpotLight
      castShadow
      ref={lightref}
      distance={20}
      color="#40e0d0"
      intensity={0.5}
      position={[10, 5, 5]}
      angle={Math.PI * 0.1}
    />
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

      <AmbientHelper />
      <HemisphereHelper />
      <DirectionHelper />
      <PointHelper />
      <RectHelper />
      <SpotHelper />

      <mesh position={[-2, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={0xffffff}
          metalness={0.0}
          roughness={0.1}
        />
      </mesh>

      <mesh position={[-2, 0, -2]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={0xffffff}
          metalness={0.0}
          roughness={0.1}
        />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.75, 8, 8]} />
        <meshStandardMaterial
          color={0xffffff}
          metalness={0.0}
          roughness={0.1}
        />
      </mesh>

      <mesh position={[0, 0, -2]} castShadow>
        <sphereGeometry args={[0.75, 8, 8]} />
        <meshStandardMaterial
          color={0xffffff}
          metalness={0.0}
          roughness={0.1}
        />
      </mesh>

      <mesh position={[2, 0, 0]}>
        <torusKnotGeometry args={[0.5, 0.15, 100, 16]} />
        <meshStandardMaterial
          color={0xffffff}
          metalness={0.0}
          roughness={0.1}
        />
      </mesh>

      <mesh position={[2, 0, -2]}>
        <torusKnotGeometry args={[0.5, 0.15, 100, 16]} />
        <meshStandardMaterial
          color={0xffffff}
          metalness={0.0}
          roughness={0.1}
        />
      </mesh>

      <mesh
        receiveShadow
        position={[0, -2, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[20, 20, 20]}
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
