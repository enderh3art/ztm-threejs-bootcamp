import { useState } from "react";
import { useAnimations } from "@react-three/drei";

// Define the duration for animation transitions
const ANIMATION_TRANSITION_DURATION = 0.2;

/**
 * Custom hook for controlling animations of a 3D avatar.
 * It manages animation states, transitions, and playback.
 * @param {THREE.Object3D} avatar - The 3D avatar object with animations.
 * @returns {Object} An object containing animation control functions.
 */
export const useAnimationController = (avatar) => {
  const { actions } = useAnimations(avatar.animations, avatar.scene);

  // Initialize the current animation state to "idle" and play it
  const [currentAnimation, setCurrentAnimation] = useState("idle");
  actions[currentAnimation].play();

  /**
   * Play a specific animation with smooth transitions.
   * @param {string} name - The name of the animation to play.
   */
  const playAnimation = (name) => {
    if (currentAnimation === name) return;

    actions[name]
      .reset()
      .play()
      .crossFadeFrom(actions[currentAnimation], ANIMATION_TRANSITION_DURATION);

    // Update the current animation state
    setCurrentAnimation(name);
  };

  // Return an object with the playAnimation function for controlling animations
  return { playAnimation };
};
