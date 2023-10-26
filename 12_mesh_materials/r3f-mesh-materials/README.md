## Material Explorer with React-Three-Fiber

This project demonstrates the use of different Three.js materials within a React environment. By using the `leva` library, users can interactively adjust various attributes of the materials in real-time.

### Features

- Interactive controls to modify material attributes.
- Showcases four different materials: Lambert, Phong, Standard, and Physical.
- Easy navigation and view adjustments with OrbitControls.

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run the project**

   ```bash
   npm run dev
   ```

   This will start the development server and the project will be available at `http://localhost:5173`.

#### Components

- **`PhysicalMesh`**: Represents a mesh with a Physical material. The user can adjust the metalness, roughness, reflectivity, and clearcoat.
- **`LambertMesh`**: Represents a mesh with a Lambert material. The user can adjust the color and emissive properties.
- **`PhongMesh`**: Represents a mesh with a Phong material. Users can adjust the color, shininess, specular, and emissive properties.
- **`StandardMesh`**: Represents a mesh with a Standard material. The user can adjust the color, roughness, metalness, and emissive properties.

### 📝 Credits

- [Three.js](https://threejs.org/)
- [React Three Fiber](https://github.com/pmndrs/react-three-fiber)
- [Leva](https://github.com/pmndrs/leva)
