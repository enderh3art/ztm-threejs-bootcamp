import * as THREE from 'three';
import App from '../App.js';
export default class Character {
    constructor() {
        this.app = new App();
        this.scene = this.app.scene;

        this.instantiateCharacter();

    }

    instantiateCharacter() {
        const geometry = new THREE.BoxGeometry(2,2,2);
        const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        this.character = new THREE.Mesh(geometry, material);
        this.character.position.set(0, 2.5, 0);
        this.scene.add(this.character);
    }

    loop() {
    }


        
}