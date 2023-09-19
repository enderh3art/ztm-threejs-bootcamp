import * as THREE from 'three'

import App from '../App.js'

export default class World{
    constructor() {
        this.app = new App()
        this.scene = this.app.scene


        this.setCube()
        this.loop()
    }

    setCube() {

        this.cubeMesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({ color: 0xff0000 })
        );

        this.scene.add(this.cubeMesh)

    } 


    loop() {

        this.cubeMesh.rotation.y += 0.01


    }
}