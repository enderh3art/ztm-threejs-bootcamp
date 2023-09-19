 import * as THREE from 'three'
 import App from '../App.js'

 export default class Loop {
    constructor() {
        this.app = new App()
        this.camera = this.app.camera
        this.renderer = this.app.renderer
        this.world = this.app.world

        this.loop()
    }

    loop() {
        this.world.loop()

        this.camera.loop()
        this.renderer.loop()
        window.requestAnimationFrame(() => this.loop())
    }
}