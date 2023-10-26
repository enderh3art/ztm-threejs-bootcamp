## React Three Fiber and Drei - Camera and Render Loop

This section provides an introduction to setting up a basic 3D scene with React Three Fiber (R3F) and Drei. The project also incorporates `leva` for interactive control of 3D objects.

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your browser and go to `http://localhost:5173` to see the app in action.

## Dependencies

- [React](https://reactjs.org/)
- [Three.js](https://threejs.org/)
- [@react-three/fiber](https://github.com/pmndrs/react-three-fiber)
- [@react-three/drei](https://github.com/pmndrs/drei)
- [leva](https://github.com/pmndrs/leva)

### Components Overview:

#### 1. **PerspectiveCamera**:

- This component sets up a camera with a perspective view.
- **Properties**:
  - `makeDefault`: Makes this camera the default for all objects in the scene.
  - `position`: Sets the position of the camera in 3D space `[x, y, z]`.
  - `fov`: Field of View, the extent of the scene visible to the camera. Measured in degrees of the viewing cone.
  - `near`: The nearest clipping plane. Anything before this value isn't rendered.
  - `far`: The farthest clipping plane. Anything beyond this value isn't rendered.
  - `aspect`: Aspect ratio, usually the viewport width divided by height.

#### 2. **Box**:

- Renders a 3D box in the scene.
- Dimensions and color are controlled using `leva` for interactive control.
- To tweak the box's properties in real-time, open the `leva` GUI in the app.

#### 3. **OrbitControls**:

- Provides controls to orbit around, zoom, and pan the scene.
- `enableDamping`: Makes the rotation smoother, providing a momentum effect.

### Integration with Leva:

The project utilizes `leva` to provide an interactive GUI for adjusting the Box attributes in real-time. This allows you to visually tweak properties without a page reload. To add more controls, modify the parameters within the `useControls` hook.
