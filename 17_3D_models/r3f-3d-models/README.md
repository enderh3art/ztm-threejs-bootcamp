# React 3D Model Viewer

This project provides a simple 3D model viewer built with React and Three.js using the `@react-three/fiber` and `@react-three/drei` libraries. Users can select and view different 3D models, and interact with the scene using mouse controls.

## Setup and Run

1. Install the required dependencies using `npm install`.
2. Run the application using `npm run dev`.

## Technologies Used

- [React](https://reactjs.org/)
- [Three.js](https://threejs.org/)
- [@react-three/fiber](https://github.com/pmndrs/react-three-fiber)
- [@react-three/drei](https://github.com/pmndrs/drei)
- [leva](https://github.com/pmndrs/leva)

## Features

- **Selectable 3D Models**: Choose between different 3D models to view.
- **Interactable Scene**: Use the mouse to orbit around, zoom in, and zoom out of the 3D models.
- **Adjustable Scale**: Dynamically scale the size of the 3D models.
- **Progress Bar**: Displays the loading progress of the 3D models.
- **Environment Mapping**: Adds realistic reflections to the models.

## How to Use

1. Upon loading the application, you will see a dropdown to select a 3D model and a slider to adjust its scale.
2. Use the dropdown to select a model. The selected model will be loaded into the viewer.
3. Adjust the scale using the slider.
4. Use the mouse to interact with the 3D scene:
   - **Orbit**: Left-click and drag.
   - **Zoom**: Scroll wheel.
   - **Pan**: Right-click and drag.

## Code Overview

### Models

There are two sample models included:

1. BoomBox
2. MilkTruck

You can add more models to the `Models` array with the following format:

```javascript
{ title: "ModelName", url: "/path/to/model/file.gltf" }
```

### Model Component

The `Model` component is responsible for loading and rendering the 3D models. It uses the `useGLTF` hook to load the models. Once a model is loaded, the component sets its scale and adjusts its materials based on predefined conditions.

### Loader Component

The `Loader` component displays the loading progress of the 3D models using the `useProgress` hook.

### App Component

The main `App` component sets up the 3D scene, adds lights, camera, controls, and renders the selected 3D model.
