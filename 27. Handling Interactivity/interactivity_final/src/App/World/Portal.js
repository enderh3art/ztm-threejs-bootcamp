import * as THREE from "three"
import App from "../App"
import ModalManager from "../UI/ModalManager"

export default class Portal {
    constructor(portalMesh, modalInfo) {
        this.app = new App()
        this.portalMesh = portalMesh
        this.modalInfo = modalInfo
        this.modalManager = new ModalManager()

        this.portalNearMaterial = new THREE.MeshBasicMaterial({
            color: 0xFFFFFF,
            transparent: true,
            opacity: 0.8,
        })

        this.portalFarMaterial = new THREE.MeshBasicMaterial({
            color: 0x00FFFF,
            transparent: true,
            opacity: 0.8,
        })

        this.portalMesh.material = this.portalFarMaterial

        this.prevIsNear = false

    }

    loop() {
        this.character = this.app.world.character.instance;
        if (this.character) {
            const portalPosition = new THREE.Vector3()
            this.portalMesh.getWorldPosition(portalPosition)
 
            const distance = this.character.position.distanceTo(portalPosition)
            const isNear = distance < 1.5
            if (isNear) {
                if (!this.prevIsNear){
                    this.modalManager.openModal(this.modalInfo.title, this.modalInfo.description)
                    this.portalMesh.material = this.portalNearMaterial
                }
                this.prevIsNear = true
            } else {
                if (this.prevIsNear) {
                    this.modalManager.closeModal()
                    this.portalMesh.material = this.portalFarMaterial
                }
                this.prevIsNear = false
            }

        }
    }
}