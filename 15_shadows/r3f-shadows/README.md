# React Three.js Scene with Shadows

This project showcases a 3D scene setup using React, Three.js, `@react-three/fiber`, and `@react-three/drei`. The primary emphasis of this scene is on the shadow rendering achieved through various adjustable light sources.

## Features

- **Dynamic Shadows**: The three main objects in the scene (Box, Sphere, Torus Knot) cast dynamic shadows, creating a rich visual experience.

- **Adjustable Lights with Shadow Features**:
  - `DirectionHelper`: Control and visualize a Directional light's shadow.
  - `PointHelper`: Control and visualize a Point light's shadow.
  - `SpotHelper`: Control and visualize a Spot light's shadow.
- **3D Objects with Shadows**: The scene contains three primary objects that cast dynamic shadows:
  - Box
  - Sphere
  - Torus Knot
- **Interactive Controls**: With `OrbitControls`, users can pan, zoom, and orbit around the scene to observe the shadows from different angles.

## Installation and Usage

1. **Install Dependencies**:

   ```
   npm install
   ```

2. **Run the App**:

   ```
   npm run dev
   ```

   The app should open in your default browser.

3. **Shadow Observations**: Once the app is running, navigate around the scene to observe the shadows. Adjust light properties using the control panel to see how shadows react in real-time.

## Technologies Used

- [React](https://reactjs.org/)
- [Three.js](https://threejs.org/)
- [@react-three/fiber](https://github.com/pmndrs/react-three-fiber)
- [@react-three/drei](https://github.com/pmndrs/drei)
- [leva](https://github.com/pmndrs/leva)
