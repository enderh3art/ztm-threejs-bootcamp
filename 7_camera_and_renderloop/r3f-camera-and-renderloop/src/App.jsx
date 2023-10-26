import React from "react";
import { Canvas } from "@react-three/fiber";
import { Box, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useControls } from "leva";

import "./App.css";

function App() {
  // Define the properties that we want to expose in the leva GUI.
  // This allows us to tweak the Box attributes in real-time.
  const { width, height, depth, color } = useControls("Box Attributes", {
    width: 1,
    height: 1,
    depth: 1,
    color: "red",
  });

  return (
    <Canvas>
      {/* Sets the background of the canvas to black */}
      <color attach="background" args={["black"]} />;
      {/* 
        Perspective Camera 
        This sets up a camera with a perspective view. 
      */}
      <PerspectiveCamera
        makeDefault // This makes this camera the default for all objects in the scene.
        position={[0, 0, 5]} // Sets the position of the camera in 3D space [x, y, z].
        fov={35} // Field of View: the extent of the scene that's visible to the camera. It's the angle in degrees of the viewing cone.
        near={0.1} // The nearest clipping plane, anything before this value won't be rendered.
        far={200} // The farthest clipping plane, anything beyond this value won't be rendered.
        aspect={window.innerWidth / window.innerHeight} // Aspect ratio, usually the viewport width divided by height.
      />
      {/* Box */}
      {/* This renders a 3D box with the specified dimensions and color. */}
      <Box args={[width, height, depth]}>
        <meshBasicMaterial color={color} />
      </Box>
      {/* Orbit Controls */}
      {/* This provides controls to orbit around, zoom, and pan the scene. */}
      <OrbitControls enableDamping />{" "}
      {/* Damping makes the rotation smoother, like a momentum effect. */}
    </Canvas>
  );
}

export default App;
