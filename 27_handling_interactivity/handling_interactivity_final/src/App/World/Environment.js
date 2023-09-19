import * as THREE from "three";
import App from "../App.js";
import assetStore from "../Utils/AssetStore.js";
import Portal from "./Portal.js";
import ModalContentProvider from "../UI/ModalContentProvider.js";

export default class Environment {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.physics = this.app.world.physics;
    this.pane = this.app.gui.pane;

    this.assetStore = assetStore.getState()
    this.environment = this.assetStore.loadedAssets.environment

    this.loadEnvironment();
    this.addLights();
    this.addPortals()
  }

  loadEnvironment() {
    // load environment here
    const environmentScene = this.environment.scene;
    this.scene.add(environmentScene);

    environmentScene.position.set(-4.8, 0, -7.4)
    environmentScene.rotation.set(0, -.60, 0)
    environmentScene.scale.setScalar(1.3)

    const physicalObjects = ['trees',
      'terrain',
      'rocks',
      'stairs',
      'gates',
      'floor',
      'bushes'
    ]

    const shadowCasters = ['trees',
      'terrain',
      'rocks',
      'stairs',
      'gates',
      'bushes'
    ]

    const shadowReceivers = ['floor',
      'terrain'
    ]

    for (const child of environmentScene.children) {
      child.traverse((obj) => {
        if (obj.isMesh) {
          obj.castShadow = shadowCasters.some((keyword) => child.name.includes(keyword))
          obj.receiveShadow = shadowReceivers.some((keyword) => child.name.includes(keyword))
          if (physicalObjects.some((keyword) => child.name.includes(keyword))) {
            this.physics.add(obj, "fixed", "cuboid")
          }
        }
      })
    }
  }


  addLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    this.directionalLight.position.set(1, 1, 1);
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.camera.top = 30
    this.directionalLight.shadow.camera.right = 30
    this.directionalLight.shadow.camera.left = -30
    this.directionalLight.shadow.camera.bottom = -30
    this.directionalLight.shadow.bias = -0.002
    this.directionalLight.shadow.normalBias = 0.072
    this.scene.add(this.directionalLight);
  }

  addPortals() {

    const portalMesh1 = this.environment.scene.getObjectByName('portals')
    const portalMesh2 = this.environment.scene.getObjectByName('portals001')
    const portalMesh3 = this.environment.scene.getObjectByName('portals002')

    const modalContentProvider = new ModalContentProvider()


    this.portal1 = new Portal(portalMesh1, modalContentProvider.getModalInfo('aboutMe'))
    this.portal2 = new Portal(portalMesh2, modalContentProvider.getModalInfo('projects'))
    this.portal3 = new Portal(portalMesh3, modalContentProvider.getModalInfo('contactMe'))
  }

  loop() {
    this.portal1.loop()
    this.portal2.loop()
    this.portal3.loop()
  }

}
