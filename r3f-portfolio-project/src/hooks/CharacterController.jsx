import { useEffect, useRef } from "react";
import { useRapier, vec3, quat } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { Controls } from "../App";
import { useAnimationController } from "./AnimationController";

// Constants for character controller behavior
const CHARACTER_CONTROLLER_FALL_SPEED = -1;
const CHARACTER_SPEED = 0.5;

/**
 * Custom hook for controlling a 3D character's movements and animations.
 * It manages character physics, keyboard controls, and animations.
 * @param {THREE.Object3D} avatar - The 3D avatar object.
 * @returns {Object} An object containing references to the character's rigid body and collider.
 */
export const useCharacterController = (avatar) => {
  // Access the physics world from useRapier
  const { world } = useRapier();

  // Refs for character physics components
  const rigidBody = useRef(null);
  const collider = useRef(null);
  const characterControllerRef = useRef(null);

  // Add Animation Controller
  const { playAnimation } = useAnimationController(avatar);

  // Initialize the character controller in the physics world
  useEffect(() => {
    const characterController = world.createCharacterController(0.01);
    characterController.setApplyImpulsesToDynamicBodies(true);
    characterController.enableAutostep(2, 0.1, false);
    characterController.enableSnapToGround(1);

    // Assign the characterController to the ref
    characterControllerRef.current = characterController;
  }, [world]);

  // Instantiate Keyboard Controls
  const jumpPressed = useKeyboardControls((state) => state[Controls.jump]);
  const forwardPressed = useKeyboardControls(
    (state) => state[Controls.forward]
  );
  const backPressed = useKeyboardControls((state) => state[Controls.back]);
  const leftPressed = useKeyboardControls((state) => state[Controls.left]);
  const rightPressed = useKeyboardControls((state) => state[Controls.right]);

  // Function to move the character
  const Move = (movement) => {
    const position = vec3(rigidBody.current.translation());
    const current_quat = quat(rigidBody.current.rotation());

    // Rotate the character based on the movement vector
    if (movement.length() !== 0) {
      const angle = Math.atan2(movement.x, movement.z) + Math.PI;
      const target_quat = current_quat.setFromAxisAngle(
        vec3({ x: 0, y: 1, z: 0 }),
        angle
      );

      // Set the next kinematic rotation for smooth movement
      rigidBody.current.setNextKinematicRotation(target_quat, true);
    }

    // Character Controller Aid
    characterControllerRef.current.computeColliderMovement(
      collider.current,
      movement
    );

    const newPosition = position
      .clone()
      .add(characterControllerRef.current.computedMovement());

    // Set the next kinematic translation for smooth movement
    rigidBody.current.setNextKinematicTranslation(newPosition, true);
  };

  useFrame((_state, delta) => {
    let movementVector = vec3(0, 0, 0);

    // Add vectors for each direction based on key presses
    if (jumpPressed) {
      movementVector.add(vec3({ x: 0, y: 0.1, z: 0 }));
    }
    if (forwardPressed) {
      movementVector.add(vec3({ x: 0.0, y: 0, z: -0.1 }));
    }
    if (backPressed) {
      movementVector.add(vec3({ x: 0.0, y: 0, z: 0.1 }));
    }
    if (leftPressed) {
      movementVector.add(vec3({ x: -0.1, y: 0, z: 0 }));
    }
    if (rightPressed) {
      movementVector.add(vec3({ x: 0.1, y: 0, z: 0 }));
    }

    // Normalize the movement vector and scale by speed and deltaTime
    if (movementVector.length() > 0) {
      movementVector.normalize().multiplyScalar(CHARACTER_SPEED);

      // Adjust Y axis for the fall speed
      movementVector.y += CHARACTER_CONTROLLER_FALL_SPEED;

      Move(movementVector);

      playAnimation("run");
    } else {
      playAnimation("idle");
    }
  }, []);

  // Return references to the character's rigid body and collider
  return {
    rigidBody,
    collider,
  };
};
