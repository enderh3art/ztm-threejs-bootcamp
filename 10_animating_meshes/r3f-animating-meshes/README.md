# Animated Cube using React-Three-Fiber, Drei, and Leva

This project presents an interactive 3D cube with dynamic animations. The cube's properties, such as rotation, scaling, and position, are animated using React hooks. The visualization is enabled by the `react-three-fiber` library, which brings Three.js into the React ecosystem. The additional controls and utilities are offered by `react-three-drei`, while `leva` provides an intuitive UI for tweaking animation properties in real-time.

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your browser and go to `http://localhost:5173` to see the app in action.

### Cube Component

The `Cube` component represents a 3D cube in the scene:

- **Reference**: A reference (`meshRef`) to the 3D cube object is established, enabling direct access and modification of its properties.

- **Animation Controls**:

  - `rotationSpeed`: Controls the speed at which the cube rotates around the Y-axis.
  - `scaleXMultiplier`: Adjusts the amplitude of the scale oscillation on the X-axis.
  - `positionXMultiplier`: Adjusts the amplitude of the position oscillation on the X-axis.

  These controls are established using the `useControls` hook from `leva`, which produces an interactive UI panel for tweaking the values.

- **Frame Animation**: The `useFrame` hook from `react-three-fiber` is utilized to execute code on every frame, animating the cube:
  - Rotation: The cube rotates continuously around the Y-axis.
  - Scaling: The X-scale of the cube oscillates using a sinusoidal function.
  - Position: The X-position of the cube oscillates, also using a sinusoidal function.

### App Component

The `App` component sets up the 3D scene:

- **Canvas**: The `Canvas` component from `react-three-fiber` provides a rendering context for the 3D scene. It encapsulates the WebGL rendering, camera, scene, and other essential elements.

- **Background**: A black background is set for clarity.

- **Camera**: A `PerspectiveCamera` is configured with specific properties like field of view, near and far clipping planes, and aspect ratio. It's positioned to view the cube from a distance.

- **Cube Rendering**: The `Cube` component is included within the canvas, rendering the animated cube in the scene.

- **Orbit Controls**: Enabled by `OrbitControls` from `react-three-drei`, they provide interactive controls for orbiting around, zooming in/out, and panning the scene.

## Dependencies

- [React](https://reactjs.org/)
- [Three.js](https://threejs.org/)
- [@react-three/fiber](https://github.com/pmndrs/react-three-fiber)
- [@react-three/drei](https://github.com/pmndrs/drei)
- [Leva](https://github.com/pmndrs/leva)
