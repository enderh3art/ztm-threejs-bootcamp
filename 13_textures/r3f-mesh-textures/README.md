# React 3D Scene with Texture Selector

This project demonstrates how to create a 3D scene in React using `@react-three/fiber`, `@react-three/drei`, and `leva` for texture and property controls. The example presents three different methods of applying textures to meshes in the scene.

### Overview

The 3D scene contains three distinct objects:

- A grass-textured sphere.
- A boulder-textured sphere.
- A space cruiser-textured sphere.

Each sphere utilizes a different method of texture loading and application.

### Installation and Usage

1. **Navigate to the project directory and install dependencies**:

   ```bash
   cd project-directory
   npm install
   ```

2. **Start the development server**:

   ```bash
   npm run dev
   ```

### Components Breakdown

1. **Grass**:

   - Uses a direct method where textures are preloaded and applied to a `THREE.MeshStandardMaterial`.
   - Allows for dynamic adjustments of metalness, roughness, and displacement via props.

2. **Boulder**:

   - Uses the `useLoader` hook from `@react-three/fiber` to load multiple textures asynchronously.
   - The loaded textures are then applied to a `meshStandardMaterial`.

3. **SpaceCruiser**:

   - Employs the `useTexture` hook from `@react-three/drei` to load textures.
   - Spreads the loaded textures and their properties directly onto a `meshStandardMaterial`.

### Controls

This project integrates `leva` for dynamic controls over various properties, such as:

- Light intensity.
- Light color.
- Material properties for each textured object like metalness, roughness, and displacement.

These controls allow users to interact and experiment with different visual appearances in the 3D scene.

### Dependencies

- `react`
- `three`
- `@react-three/fiber`
- `@react-three/drei`
- `leva`

### Notes

- Ensure that the textures are correctly placed in the `/textures` directory relative to the public folder.
- Adjust the camera, lighting, and other scene settings in the `App` component as required.
