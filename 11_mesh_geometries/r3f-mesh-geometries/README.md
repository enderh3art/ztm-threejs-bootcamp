# React Three Mesh Geometries

This project showcases various mesh geometries using React, THREE.js, react-three-fiber, and leva. It's designed to provide an interactive demonstration of several core geometries available in THREE.js.

## Features

1. **SphereGeometry**: An interactive sphere where you can adjust properties like radius and radialSegments.
2. **IcosahedronGeometry**: An interactive icosahedron with adjustable radius.
3. **TorusGeometry**: A torus mesh with adjustable properties such as radius, tube, radialSegments, and tubularSegments.
4. **PlaneGeometry**: A plane mesh with customizable width and height.

All the geometries come with interactive controls powered by `leva` to adjust their properties in real-time. Plus, each mesh uses `react-three-fiber` for integrating THREE.js within React.

## Setup

Ensure you have Node.js and npm installed.

1. Install the dependencies:

   ```sh
   npm install
   ```

2. Start the development server:
   ```sh
   npm run dev
   ```

Visit `http://localhost:5173/` in your browser to see the project live!

## Usage

Once you have the project running, you'll see various geometric shapes rendered in a 3D space. Use the `leva` controls panel on the side to adjust properties for each geometry. You can also navigate through the scene using the mouse to get a different perspective on each mesh.
