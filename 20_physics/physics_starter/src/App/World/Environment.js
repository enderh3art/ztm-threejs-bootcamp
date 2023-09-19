import * as THREE from 'three';

import App from '../App.js';

export default class Environment{
    constructor() {
        this.app = new App()
        this.scene = this.app.scene

        this.loadEnvironment()
    }

    loadEnvironment() {

        // lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        this.directionalLight.position.set(1, 1, 1);
        this.directionalLight.castShadow = true;
        this.scene.add(this.directionalLight);
    }
}