import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";

import { RigidBody } from "@react-three/rapier";
import Portal from "./Portal";

/**
 * A component representing the 3D model of the environment.
 * It loads the environment model and sets up physics properties for specific objects.
 * Portals for interaction with modals are also created within the environment.
 * @param {Object} props - Additional props for the component.
 */
export function Model(props) {
  // Load the environment model using useGLTF
  const environ = useGLTF("/models/environment.glb", "/draco/");

  // Use useMemo to define alteredScene and physicalMeshes to avoid repeated calculations
  const { alteredScene, physicalMeshes } = useMemo(() => {
    const physicalObjects = ["steps"];
    const shadowCasters = [
      "trees",
      "terrain",
      "rocks",
      "stairs",
      "gates",
      "bushes",
    ];
    const shadowReceivers = ["floor", "terrain"];

    const sceneClone = environ.scene.clone();
    const physicals = [];

    // Traverse through the cloned scene to configure properties and extract physical objects
    for (const child of sceneClone.children) {
      child.traverse((obj) => {
        const meshesToExtract = [];
        if (obj.isMesh) {
          obj.castShadow = shadowCasters.some((keyword) =>
            child.name.includes(keyword)
          );
          obj.receiveShadow = shadowReceivers.some((keyword) =>
            child.name.includes(keyword)
          );
          if (physicalObjects.some((keyword) => child.name.includes(keyword))) {
            meshesToExtract.push(obj);
          }
          // Remove the meshes from the main scene and store them in physicals array
          meshesToExtract.forEach((mesh) => {
            child.remove(mesh);
            physicals.push(mesh);
          });
        }
      });
    }

    return { alteredScene: sceneClone, physicalMeshes: physicals };
  }, [environ]);

  // Retrieve the character object from the scene using its name
  const portalMesh1 = alteredScene.getObjectByName("portals");
  const portalMesh2 = alteredScene.getObjectByName("portals001");
  const portalMesh3 = alteredScene.getObjectByName("portals002");

  return (
    <group {...props}>
      {/* Create a fixed RigidBody for the environment */}
      <RigidBody type="fixed" colliders="cuboid" name="Environment">
        {alteredScene && <primitive object={alteredScene} />}
      </RigidBody>

      {/* Render physicalMeshes as primitive objects */}
      {physicalMeshes.map((mesh, index) => (
        <primitive key={index} object={mesh} />
      ))}

      {/* Create Portal Components for interaction */}
      <Portal portalMesh={portalMesh1} name={"aboutMe"} />
      <Portal portalMesh={portalMesh2} name={"projects"} />
      <Portal portalMesh={portalMesh3} name={"contactMe"} />
    </group>
  );
}

// Preload the environment model
useGLTF.preload("/models/environment.glb", "/draco/");
