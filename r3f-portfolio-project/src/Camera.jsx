import React, { useRef } from "react";
import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

/**
 * The Camera component creates a 3D camera for the scene and sets up camera controls.
 * It follows a target object's position and orientation smoothly.
 */
export function Camera() {
  // Access the scene, camera, and viewport from the Three.js context
  const { scene, camera, viewport } = useThree();

  // Create a reference for the OrbitControls to manage camera movement
  const controls = useRef();

  // Use the useFrame hook to update the camera's position and target
  useFrame(() => {
    // Retrieve the character object from the scene using its name ("Character")
    const characterObject = scene.getObjectByName("Character");

    if (characterObject) {
      // Define the camera's offset from the character
      const cameraOffset = new THREE.Vector3(0, 35, 25);
      cameraOffset.add(characterObject.position);

      // Define the camera's target offset, relative to the character's orientation
      const targetOffset = new THREE.Vector3(0, 10, 0);
      targetOffset.applyQuaternion(characterObject.quaternion);
      targetOffset.add(characterObject.position);

      // Smoothly interpolate the camera's position towards the cameraOffset
      camera.position.lerp(cameraOffset, 0.1);

      // Smoothly interpolate the camera's target (look-at) towards the targetOffset
      controls.current.target.lerp(targetOffset, 0.1);
    }
  });

  return (
    <>
      {/* Define a PerspectiveCamera with specific properties */}
      <PerspectiveCamera
        makeDefault // Set this camera as the default camera for the scene
        fov={80} // Field of view in degrees
        aspect={viewport.width / viewport.height} // Aspect ratio
        position={[0, 35, 25]} // Initial camera position
        near={1} // Near clipping plane
        far={600} // Far clipping plane
      />

      {/* Create OrbitControls for camera manipulation */}
      <OrbitControls ref={controls} enableDamping />
    </>
  );
}
