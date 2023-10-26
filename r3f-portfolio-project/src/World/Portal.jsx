import React, { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";
import { useModalInfo } from "../hooks/ModalInfo";

// The distance threshold for triggering interaction with the portal
const thresholdDistance = 10;

/**
 * A component representing a portal in the 3D scene.
 * This portal has interactive behavior when the character approaches it.
 * @param {Object} portalMesh - The 3D mesh representing the portal.
 * @param {string} name - The name of the portal.
 */
const Portal = ({ portalMesh, name }) => {
  const { scene } = useThree();
  const portalRef = useRef(portalMesh);

  // Access the showModal and hideModal functions from useModalInfo custom hook
  const { showModal, hideModal } = useModalInfo();

  // Memoize materials so they aren't recreated on each render
  const portalNearMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.8,
      }),
    []
  );

  const portalFarMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.8,
      }),
    []
  );

  useEffect(() => {
    if (portalRef.current) {
      portalRef.current.material = portalFarMaterial; // Set the default material to portalFarMaterial
    }
  }, [portalRef, portalFarMaterial]);

  useFrame(() => {
    if (!portalRef.current) return;

    const character = scene.getObjectByName("Character");

    if (character) {
      // Get the world positions of the character and the portal
      const distance = character.position.distanceTo(
        portalRef.current.getWorldPosition(new THREE.Vector3())
      );

      // Check if the character is within the threshold distance and update the portal material
      if (
        distance < thresholdDistance &&
        portalRef.current.material !== portalNearMaterial
      ) {
        showModal(name); // Show the modal associated with the portal
        portalRef.current.material = portalNearMaterial; // Change the portal material
      } else if (
        distance >= thresholdDistance &&
        portalRef.current.material !== portalFarMaterial
      ) {
        hideModal(); // Hide the modal when the character moves away from the portal
        portalRef.current.material = portalFarMaterial; // Change the portal material
      }
    }
  });

  return (
    <>
      {/* Retaining the use of primitive as requested */}
      <primitive object={portalRef.current} ref={portalRef} />
    </>
  );
};

export default Portal;
