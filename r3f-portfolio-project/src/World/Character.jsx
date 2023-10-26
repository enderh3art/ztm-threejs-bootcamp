import React from "react";
import { useGLTF } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useCharacterController } from "../hooks/CharacterController";

/**
 * A component representing the character/avatar in the 3D scene.
 * It loads and renders the character model, configures physics properties, and sets up collision detection.
 */
const Character = () => {
  // Load the character/avatar model using useGLTF
  const avatar = useGLTF("/models/avatar.glb", "/draco/");

  // Use the useCharacterController custom hook to manage character physics and controls
  const { rigidBody, collider } = useCharacterController(avatar);

  return (
    <RigidBody
      ref={rigidBody}
      type="kinematicPosition"
      position={[0, 5, 0]}
      name="Character"
      canSleep={false}
    >
      {/* Render the loaded avatar model */}
      {avatar && (
        <primitive
          object={avatar.scene}
          position={[0, -1.0, 0]}
          rotation={[0, Math.PI, 0]}
          scale={4}
        />
      )}

      {/* Create a cuboid collider for collision detection */}
      <CuboidCollider ref={collider} args={[0.3, 1, 0.3]} />
    </RigidBody>
  );
};

// Preload the character/avatar model for faster loading and response
useGLTF.preload("/models/avatar.glb");

export default Character;
