# React Three Fiber Light Helpers Demo

This project demonstrates the use of various light helpers in a Three.js scene powered by `@react-three/fiber` and `@react-three/drei`.

## Overview

This application sets up a scene with a variety of geometries and multiple light types. Each light is accompanied by a helper and integrated with `leva` for a visual control panel to modify light properties.

### Components:

1. **Ambient Light:** A light that affects all objects in the scene equally without casting shadows.
2. **Hemisphere Light:** A light source positioned directly above the scene, with color emanating from the sky (top) and the ground (bottom).
3. **Directional Light:** Emits light uniformly in a specific direction. It acts like the sun, meaning all light rays are parallel and come from a single direction.
4. **Point Light:** Emits light in all directions from a single point in space.
5. **Rect Area Light:** Emits light uniformly across the face of a rectangular plane.
6. **Spot Light:** Emits light from a single point in one direction, along a cone that expands the further from the light it gets.

### Features:

- **Interactive Control Panel**: Using `leva`, adjust the properties (color, intensity) of each light source in real-time.
- **Dynamic Scene**: Contains a variety of geometries including boxes, spheres, and torus knots for demonstration purposes.
- **Orbit Controls**: Navigate around the scene using the integrated orbit controls from `@react-three/drei`.

## Setup and Running

Before running the project, ensure you have `react`, `three`, `@react-three/fiber`, `@react-three/drei`, and `leva` installed.

```bash
npm install
```

To run the application:

```bash
npm run dev
```

This will start a development server and open the application in your default browser.
