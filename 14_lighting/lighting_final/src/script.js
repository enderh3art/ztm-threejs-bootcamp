import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";
import { Pane } from "tweakpane";

const pane = new Pane();
const scene = new THREE.Scene();
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 0.0,
  roughness: 0.1,
});
const materialFolder = pane.addFolder({
  title: "Material",
  expanded: true,
});
materialFolder.addBinding(material, "metalness", { min: 0, max: 1, step: 0.01 });
materialFolder.addBinding(material, "roughness", { min: 0, max: 1, step: 0.01 });
materialFolder.addBinding(material, "color", { color: { type: "float" } });

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const sphereGeometry = new THREE.SphereGeometry(0.75, 8, 8);
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.2, 100, 16);
const circleGeometry = new THREE.CircleGeometry(0.5, 32);

const box = new THREE.Mesh(boxGeometry, material);
box.position.x = -2;
const box2 = new THREE.Mesh(boxGeometry, material);
box2.position.x = -2;
box2.position.z = -2;
const sphere = new THREE.Mesh(sphereGeometry, material);
sphere.position.x = 0;
sphere.castShadow = true;
const sphere2 = new THREE.Mesh(sphereGeometry, material);
sphere2.position.x = 0;
sphere2.position.z = -2;
const torusKnot = new THREE.Mesh(torusKnotGeometry, material);
torusKnot.position.x = 2;
const torusKnot2 = new THREE.Mesh(torusKnotGeometry, material);
torusKnot2.position.x = 2;
torusKnot2.position.z = -2;
const circle = new THREE.Mesh(circleGeometry, material);
circle.scale.setScalar(20);
circle.position.y = -2;
circle.rotation.x = -Math.PI / 2;
circle.receiveShadow = true;

scene.add(box, sphere, torusKnot, circle);
scene.add(box2, sphere2, torusKnot2);

const ambientLight = new THREE.AmbientLight(new THREE.Color(0xc870ff), 0.2);
scene.add(ambientLight);
const ambientLightFolder = pane.addFolder({
  title: "Ambient Light",
  expanded: true,
});
ambientLightFolder.addBinding(ambientLight, "intensity", {
  min: 0,
  max: 1,
  step: 0.01,
});
ambientLightFolder.addBinding(ambientLight, "color", {
  color: { type: "float" },
});

const hemisphericLight = new THREE.HemisphereLight(
  new THREE.Color(0xff0000),
  new THREE.Color(0x0000ff),
  0.1
);
hemisphericLight.position.set(0, 10, 0);
scene.add(hemisphericLight);
const hemisphericLightHelper = new THREE.HemisphereLightHelper(
  hemisphericLight
);
scene.add(hemisphericLightHelper);
const hemisphericLightFolder = pane.addFolder({
  title: "Hemispheric Light",
  expanded: true,
});
hemisphericLightFolder.addBinding(hemisphericLight, "intensity", {
  min: 0,
  max: 1,
  step: 0.01,
});
hemisphericLightFolder.addBinding(hemisphericLight, "color", {
  color: { type: "float" },
});
hemisphericLightFolder.addBinding(hemisphericLight, "groundColor", {
  color: { type: "float" },
});

const directionalLight = new THREE.DirectionalLight(0x59ffe9, 0.2);
directionalLight.position.set(3, 10, 15);
scene.add(directionalLight);
const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight
);
scene.add(directionalLightHelper);
const directionalLightFolder = pane.addFolder({
  title: "Directional Light",
  expanded: true,
});
directionalLightFolder.addBinding(directionalLight, "intensity", {
  min: 0,
  max: 1,
  step: 0.01,
});
directionalLightFolder.addBinding(directionalLight, "color", {
  color: {
    type: "float",
  },
});

const pointLight = new THREE.PointLight(0xff810a, 3);
pointLight.position.set(-3, 2, -3);
scene.add(pointLight);
const pointLightHelper = new THREE.PointLightHelper(pointLight);
scene.add(pointLightHelper);
const pointLightFolder = pane.addFolder({
  title: "Point Light",
  expanded: true,
});
pointLightFolder.addBinding(pointLight, "intensity", {
  min: 0,
  max: 5,
  step: 0.01,
});
pointLightFolder.addBinding(pointLight, "color", { color: { type: "float" } });

const rectAreaLight = new THREE.RectAreaLight(0xff0000, 0.5, 10, 10);
rectAreaLight.position.set(-10, 5, 5);
scene.add(rectAreaLight);
rectAreaLight.lookAt(0, 0, 0);
const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
scene.add(rectAreaLightHelper);
const rectAreaLightFolder = pane.addFolder({
  title: "Rect Area Light",
  expanded: true,
});
rectAreaLightFolder.addBinding(rectAreaLight, "intensity", {
  min: 0,
  max: 1,
  step: 0.01,
});
rectAreaLightFolder.addBinding(rectAreaLight, "color", {
  color: { type: "float" },
});

const spotLight = new THREE.SpotLight(0x59ffe9, 0.5, 20, Math.PI * 0.1);
spotLight.position.set(10, 5, 5);
spotLight.target.position.set(0, -1, 0);
scene.add(spotLight);
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);
const spotLightFolder = pane.addFolder({ title: "Spot Light", expanded: true });
spotLightFolder.addBinding(spotLight, "intensity", {
  min: 0,
  max: 1,
  step: 0.01,
});
spotLightFolder.addBinding(spotLight, "color", { color: { type: "float" } });

const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);
camera.position.z = 10;
camera.position.y = 5;

const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const renderloop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
