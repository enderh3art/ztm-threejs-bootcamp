// Import necessary modules
import * as THREE from "three";
import App from "../App.js";
import { inputStore } from "../Utils/Store.js";

/**
 * Class representing a character controller.
 */
export default class CharacterController {
  /**
   * Create a character controller.
   */
  constructor() {
    // Initialize app, scene, physics, and character properties
    this.app = new App();
    this.scene = this.app.scene;
    this.physics = this.app.world.physics;
    this.character = this.app.world.character.instance;

    // Subscribe to input store and update movement values
    inputStore.subscribe((state) => {
      this.forward = state.forward;
      this.backward = state.backward;
      this.left = state.left;
      this.right = state.right;
    });

    // Instantiate controller and create rigid body and collider
    this.instantiateController();
  }

  /**
   * Instantiate the character controller, rigid body, and collider.
   */
  instantiateController() {
    // Create a kinematic rigid body
    this.rigidBodyType =
      this.physics.rapier.RigidBodyDesc.kinematicPositionBased();
    this.rigidBody = this.physics.world.createRigidBody(this.rigidBodyType);

    // Create a cuboid collider
    this.colliderType = this.physics.rapier.ColliderDesc.cuboid(1, 1, 1);
    this.collider = this.physics.world.createCollider(
      this.colliderType,
      this.rigidBody
    );

    // Set rigid body position to character position
    const worldPosition = this.character.getWorldPosition(new THREE.Vector3());
    const worldRotation = this.character.getWorldQuaternion(
      new THREE.Quaternion()
    );
    this.rigidBody.setTranslation(worldPosition);
    this.rigidBody.setRotation(worldRotation);

    // Create character controller, set properties, and enable autostepping
    this.characterController = this.physics.world.createCharacterController(0.01);
    this.characterController.setApplyImpulsesToDynamicBodies(true);
    this.characterController.enableAutostep(5, 0.1, false);
    this.characterController.enableSnapToGround(1);
  }

  /**
   * Loop function that updates the character's position and movement.
   */
  loop() {
    // Initialize movement vector based on input values
    const movement = new THREE.Vector3();
    if (this.forward) {
      movement.z -= 1;
    }
    if (this.backward) {
      movement.z += 1;
    }
    if (this.left) {
      movement.x -= 1;
    }
    if (this.right) {
      movement.x += 1;
    }

    // Normalize and scale movement vector and set y component to -1
    movement.normalize().multiplyScalar(0.3);
    movement.y = -1;

    // Update collider movement and get new position of rigid body
    this.characterController.computeColliderMovement(this.collider, movement);
    const newPosition = new THREE.Vector3()
      .copy(this.rigidBody.translation())
      .add(this.characterController.computedMovement());
    
    // Set next kinematic translation of rigid body and update character position
    this.rigidBody.setNextKinematicTranslation(newPosition);
    this.character.position.copy(this.rigidBody.translation());
  }
}
