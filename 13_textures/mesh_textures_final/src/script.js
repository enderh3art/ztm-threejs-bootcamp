import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

// initialize the pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// initialize the loader 
const textureLoader = new THREE.TextureLoader()

// initialize the geometry
const geometry = new THREE.SphereGeometry(1, 32, 32);
const uv2Geometry = new THREE.BufferAttribute(geometry.attributes.uv.array, 2)
geometry.setAttribute('uv2', uv2Geometry)

// load the grass textures
const grassAlbedo = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_albedo.png')
grassAlbedo.colorSpace = THREE.SRGBColorSpace
const grassAo = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_ao.png')
const grassHeight = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_height.png')
const grassMetallic = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_metallic.png')
const grassNormal = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_normal-ogl.png')
const grassRoughness = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_roughness.png')

// load the boulder textures
const boulderAlbedo = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_albedo.png')
boulderAlbedo.colorSpace = THREE.SRGBColorSpace
const boulderAo = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_ao.png')
const boulderHeight = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_height.png')
const boulderMetallic = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_metallic.png')
const boulderNormal = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_normal-ogl.png')
const boulderRoughness = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_roughness.png')

// load the space cruiser textures
const spaceCruiserAlbedo = textureLoader.load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_albedo.png')
spaceCruiserAlbedo.colorSpace = THREE.SRGBColorSpace
const spaceCruiserAo = textureLoader.load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_ao.png')
const spaceCruiserHeight = textureLoader.load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_height.png')
const spaceCruiserMetallic = textureLoader.load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_metallic.png')
const spaceCruiserNormal = textureLoader.load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_normal-ogl.png')
const spaceCruiserRoughness = textureLoader.load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_roughness.png')

// grass material
const grassPane = pane.addFolder({
  title: 'Grass Material',
  expanded: true
})

const grassMaterial = new THREE.MeshStandardMaterial();
grassMaterial.map = grassAlbedo
grassMaterial.roughnessMap = grassRoughness
grassMaterial.metalnessMap = grassMetallic
grassMaterial.normalMap = grassNormal
grassMaterial.displacementMap = grassHeight
grassMaterial.displacementScale = 0.1
grassMaterial.aoMap = grassAo

grassPane.addBinding(grassMaterial, 'metalness', { min: 0, max: 1, step: 0.01 })
grassPane.addBinding(grassMaterial, 'roughness', { min: 0, max: 1, step: 0.01 })
grassPane.addBinding(grassMaterial, 'displacementScale', { min: 0, max: 1, step: 0.01 })
grassPane.addBinding(grassMaterial, 'aoMapIntensity', { min: 0, max: 1, step: 0.01 })

// boulder material
const boulderPane = pane.addFolder({
  title: 'Boulder Material',
  expanded: true
})

const boulderMaterial = new THREE.MeshStandardMaterial();
boulderMaterial.map = boulderAlbedo
boulderMaterial.roughnessMap = boulderRoughness
boulderMaterial.metalnessMap = boulderMetallic
boulderMaterial.normalMap = boulderNormal
boulderMaterial.displacementMap = boulderHeight
boulderMaterial.displacementScale = 0.1
boulderMaterial.aoMap = boulderAo

boulderPane.addBinding(boulderMaterial, 'metalness', { min: 0, max: 1, step: 0.01 })
boulderPane.addBinding(boulderMaterial, 'roughness', { min: 0, max: 1, step: 0.01 })
boulderPane.addBinding(boulderMaterial, 'displacementScale', { min: 0, max: 1, step: 0.01 })
boulderPane.addBinding(boulderMaterial, 'aoMapIntensity', { min: 0, max: 1, step: 0.01 })

// space cruiser material
const spaceCruiserPane = pane.addFolder({
  title: 'Space Cruiser Material',
  expanded: true
})

const spaceCruiserMaterial = new THREE.MeshStandardMaterial();
spaceCruiserMaterial.map = spaceCruiserAlbedo
spaceCruiserMaterial.roughnessMap = spaceCruiserRoughness
spaceCruiserMaterial.metalnessMap = spaceCruiserMetallic
spaceCruiserMaterial.normalMap = spaceCruiserNormal
spaceCruiserMaterial.displacementMap = spaceCruiserHeight
spaceCruiserMaterial.displacementScale = 0.1
spaceCruiserMaterial.aoMap = spaceCruiserAo

spaceCruiserPane.addBinding(spaceCruiserMaterial, 'metalness', { min: 0, max: 1, step: 0.01 })
spaceCruiserPane.addBinding(spaceCruiserMaterial, 'roughness', { min: 0, max: 1, step: 0.01 })
spaceCruiserPane.addBinding(spaceCruiserMaterial, 'displacementScale', { min: 0, max: 1, step: 0.01 })
spaceCruiserPane.addBinding(spaceCruiserMaterial, 'aoMapIntensity', { min: 0, max: 1, step: 0.01 })

// intialize a group
const group = new THREE.Group()

// initialize the mesh

const grass = new THREE.Mesh()
grass.geometry = geometry
grass.material = grassMaterial

const boulder = new THREE.Mesh()
boulder.geometry = geometry
boulder.material = boulderMaterial
boulder.position.x = 2.5

const spaceCruiser = new THREE.Mesh()
spaceCruiser.geometry = geometry
spaceCruiser.material = spaceCruiserMaterial
spaceCruiser.position.x = -2.5

// add the mesh to the scene
group.add(grass, boulder, spaceCruiser )
scene.add(group);

// initialize the light
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff, 200);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);
camera.position.z = 10;
camera.position.y = 5

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
  // group.children.forEach((child) =>{
  //   if (child instanceof THREE.Mesh) {
  //     child.rotation.y += 0.01
  //   }
  // })

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
