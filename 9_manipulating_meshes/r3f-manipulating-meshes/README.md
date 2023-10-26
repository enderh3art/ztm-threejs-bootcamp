# 3D Cube Manipulation with React, Three.js, and leva

This project demonstrates how to use React, Three.js (via @react-three/fiber), and leva to create and manipulate 3D cube meshes in a simple web app.

## Features

- **Dynamic Cube Properties**: Adjust cube properties like scale, position, rotation, and color in real-time using leva's GUI controls.
- **Group Manipulation**: All the cubes are grouped together, allowing for collective adjustments to their scale, position, and rotation.
- **Interactive Camera Controls**: Users can zoom, rotate, and pan the view to inspect the cubes from different angles.

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your browser and go to `http://localhost:5173` to see the app in action.

## Code Overview

### Cube Component

This component represents an individual 3D cube. It uses leva's `useControls` to dynamically adjust properties like scale, position, rotation, and color.

### App Component

Sets up the 3D scene with a group of Cube components. The group itself can be adjusted as a whole, and OrbitControls allow for a more interactive viewing experience.

## Dependencies

- [React](https://reactjs.org/)
- [Three.js](https://threejs.org/)
- [@react-three/fiber](https://github.com/pmndrs/react-three-fiber)
- [@react-three/drei](https://github.com/pmndrs/drei)
- [Leva](https://github.com/pmndrs/leva)
