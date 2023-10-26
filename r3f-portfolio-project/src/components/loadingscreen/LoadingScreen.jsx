import React from "react";
import { useProgress, Html } from "@react-three/drei";

import "./LoadingScreen.css";

function LoadingScreen() {
  const { progress } = useProgress();

  return (
    <Html fullscreen>
      <div className="overlay">
        <div className="loading">Loading Experience... {progress}%</div>
      </div>
    </Html>
  );
}

export default LoadingScreen;
