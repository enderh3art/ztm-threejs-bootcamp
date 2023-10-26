# Solar System Simulation

This project provides a simple 3D simulation of the solar system using React, Three.js, and React Three Fiber.

## Setup and Run

1. Install the required dependencies using `npm install`.
2. Run the application using `npm run dev`.

## Technologies Used

- [React](https://reactjs.org/)
- [Three.js](https://threejs.org/)
- [@react-three/fiber](https://github.com/pmndrs/react-three-fiber)
- [@react-three/drei](https://github.com/pmndrs/drei)
- [leva](https://github.com/pmndrs/leva)

## Components

### 1. `Planet.jsx`

This component is responsible for rendering both planets and moons in the solar system.

- **Properties**:
  - `texture`: The texture of the planet or moon.
  - `radius`: The size scale of the planet or moon.
  - `distance`: Distance from the object it orbits around.
  - `position`: Initial position in the 3D space.
  - `speed`: Speed of the rotation.
  - `moons`: (For planets) An array of moon objects with their respective properties.
  - `orbitAround`: Object around which the planet or moon orbits.

### 2. `Sun.jsx`

This component renders the sun.

- **Properties**:
  - `texture`: The texture of the sun.
  - `scale`: The size scale of the sun.

### 3. `App.jsx`

This is the main entry point of the application. It integrates the `Sun`, `Planet`, and other components to render the complete solar system scene.

- **Key Features**:
  - Uses a `planetsArray` to define and render multiple planets with their respective properties and moons.
  - Sets up the 3D canvas and camera for the simulation.
