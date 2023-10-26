import React from "react";
import { Physics } from "@react-three/rapier";
import Character from "./Character";
import { Model } from "./Environment";
import { Float, Html } from "@react-three/drei";

/**
 * A component representing the 3D world environment.
 * It sets up physics, lighting, and renders the character and environment models.
 */
export function World() {
  return (
    <Physics gravity={[0, -9.81, 0]}>
      {/* Ambient light for the scene */}
      <ambientLight args={[0xffffff, 1.0]} />

      {/* Directional light for the scene */}
      <directionalLight
        args={[0xffffff, 1.0]}
        position={[1, 1, 1]}
        shadow-camera-top={50}
        shadow-camera-right={50}
        shadow-camera-left={-50}
        shadow-camera-bottom={-50}
        shadow-bias={-0.002}
        shadow-normalBias={0.072}
        castShadow
      />

      {/* Render the 3D environment model */}
      <Model position={[-15.0, 0, -5]} rotation={[0, -0.5, 0]} scale={4} />

      {/* Render the character object */}
      <Character />

      {/* Add Floating HTML Element to display how to move */}
      <Float position={[-35, 1, -5]}>
        <Html castShadow receiveShadow>
          <div id="controls">
            <div className="title">Controls</div>
            <div className="directions">
              <div>Up ↑</div>
              <div>Down ↓</div>
              <div>Left ←</div>
              <div>Right →</div>
            </div>
          </div>
        </Html>
      </Float>
    </Physics>
  );
}
