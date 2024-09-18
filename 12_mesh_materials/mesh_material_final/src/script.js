import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

// initialize the pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// initialize the geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
const planeGeometry = new THREE.PlaneGeometry(1, 1);

// initialize the material
const material = new THREE.MeshPhysicalMaterial();
material.color = new THREE.Color(0x00ff99);

pane.addBinding(material, "metalness", {
  min: 0,
  max: 1,
  step: 0.01,
});

pane.addBinding(material, "roughness", {
  min: 0,
  max: 1,
  step: 0.01,
});

pane.addBinding(material, "reflectivity", {
  min: 0,
  max: 1,
  step: 0.01,
});

pane.addBinding(material, "clearcoat", {
  min: 0,
  max: 1,
  step: 0.01,
});

// initialize the mesh
const mesh = new THREE.Mesh(geometry, material);

const mesh2 = new THREE.Mesh(torusKnotGeometry, material);
mesh2.position.x = 1.5;

const plane = new THREE.Mesh(planeGeometry, material);
plane.position.x = -1.5;

scene.add(mesh);
scene.add(mesh2);
scene.add(plane);

// initialize the light
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

const pointLight = new THREE.PointLight(0xff0000, 2, 0, 2);
pointLight.position.set(1, 2, 1);
scene.add(pointLight);

const directionalLight = new THREE.DirectionalLight(0x00ffff, 1);
directionalLight.position.set(1, 1, 5);
scene.add(directionalLight);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.z = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// render the scene
const renderloop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
