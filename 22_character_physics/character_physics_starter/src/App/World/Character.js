import * as THREE from "three";
import App from "../App.js";

import { inputStore } from "../Utils/Store.js";

export default class Character {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.physics = this.app.world.physics;

    // subscribe to input store
    inputStore.subscribe((state) => {
      this.forward = state.forward;
      this.backward = state.backward;
      this.left = state.left;
      this.right = state.right;
    });

    this.instantiateCharacter();
  }

  instantiateCharacter() {
    // create a character in threejs
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshStandardMaterial({
      color: 0x00ff00,
      wireframe: true,
    });
    this.character = new THREE.Mesh(geometry, material);
    this.character.position.set(0, 2.5, 0);
    this.scene.add(this.character);

    // create a rigid body
    this.rigidBodyType =
      this.physics.rapier.RigidBodyDesc.kinematicPositionBased();
    this.rigidBody = this.physics.world.createRigidBody(this.rigidBodyType);

    // create a collider
    this.colliderType = this.physics.rapier.ColliderDesc.cuboid(1, 1, 1);
    this.collider = this.physics.world.createCollider(
      this.colliderType,
      this.rigidBody
    );

    // set rigid body position to character position
    const worldPosition = this.character.getWorldPosition(new THREE.Vector3());
    const worldRotation = this.character.getWorldQuaternion(
      new THREE.Quaternion()
    );
    this.rigidBody.setTranslation(worldPosition);
    this.rigidBody.setRotation(worldRotation);
  }

  loop() {

    if (this.forward) {
    }
    if (this.backward) {
    }
    if (this.left) {
    }
    if (this.right) {
    }

  }
}
