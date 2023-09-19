import * as THREE from "three";
import App from "../App.js";

import { inputStore } from "../Utils/Store.js";

export default class Character {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.physics = this.app.world.physics;

    inputStore.subscribe((state) => {
      this.forward = state.forward;
      this.backward = state.backward;
      this.left = state.left;
      this.right = state.right;
    });

    this.instantiateCharacter();
  }

  instantiateCharacter() {
    // const geometry = new THREE.BoxGeometry(2,2,2);
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshStandardMaterial({
      color: 0x00ff00,
      wireframe: true,
    });
    this.character = new THREE.Mesh(geometry, material);
    this.character.position.set(0, 2.5, 0);
    this.scene.add(this.character);
    this.characterRigidBody = this.physics.add(
      this.character,
      "kinematic",
      "ball"
    );
    console.log(this.characterRigidBody);
  }

  loop() {
    let{ x, y, z} = this.characterRigidBody.translation()

    if (this.forward) {
      z = z - 0.1;
    }
    if (this.backward) {
      z = z + 0.1;
    }
    if (this.left) {
      x = x - 0.1;
    }
    if (this.right) {
      x = x + 0.1;
    }

    this.characterRigidBody.setNextKinematicTranslation({x, y, z});
  }
}
