import React from "react";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  // Environment,
} from "@react-three/drei";

import { Background } from "./Background";
import { Sun } from "./Sun";
import { Planet } from "./Planet";

import "./App.css";

const planetsArray = [
  {
    name: "Mercury",
    radius: 0.5,
    distance: 10,
    speed: 0.01,
    texture: "/textures/2k_mercury.jpg",
    moons: [],
  },
  {
    name: "Venus",
    radius: 0.8,
    distance: 15,
    speed: 0.007,
    texture: "/textures/2k_venus_surface.jpg",
    moons: [],
  },
  {
    name: "Earth",
    radius: 1,
    distance: 20,
    speed: 0.005,
    texture: "/textures/2k_earth_daymap.jpg",
    moons: [
      {
        name: "Moon",
        radius: 0.3,
        distance: 3,
        speed: 0.015,
        texture: "/textures/2k_moon.jpg",
      },
    ],
  },
  {
    name: "Mars",
    radius: 0.7,
    distance: 25,
    speed: 0.003,
    texture: "/textures/2k_mars.jpg",
    moons: [
      {
        name: "Phobos",
        radius: 0.1,
        distance: 2,
        speed: 0.02,
        texture: "/textures/2k_moon.jpg",
      },
      {
        name: "Deimos",
        radius: 0.2,
        distance: 3,
        speed: 0.015,
        color: 0xffffff,
        texture: "/textures/2k_moon.jpg",
      },
    ],
  },
];

function App() {
  return (
    <Canvas>
      <Background />
      {/* Can use Either or for loading the Environment Map */}
      {/* <Environment
        background={true}
        files={["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]}
        path="/textures/cubeMap/"
      /> */}
      <PerspectiveCamera
        makeDefault
        position={[0, 5, 100]}
        fov={35}
        near={0.1}
        far={400}
        aspect={window.innerWidth / window.innerHeight}
      />

      {/* Adding Lights to our scene */}
      <ambientLight args={["white", 1.0]} />
      <pointLight color="yellow" intensity={1000} decay={2} />

      {/* The Sun */}
      <Sun texture="/textures/2k_sun.jpg" scale={5} />

      {/* Iterate over the Planets Array */}
      {planetsArray.map((planetData, index) => (
        <Planet
          key={index}
          texture={planetData.texture}
          radius={planetData.radius}
          position={[planetData.distance, 0, 0]}
          distance={planetData.distance}
          speed={planetData.speed}
          moons={planetData.moons}
          orbitAround
        />
      ))}

      <OrbitControls enableDamping />
    </Canvas>
  );
}

export default App;
