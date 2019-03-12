import * as THREE from "three";
import * as OrbitControls from "three-orbitcontrols";
import * as GLTFLoader from "three-gltf-loader";
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';
import { keys } from "./config.json";

let mtlLoader = new MTLLoader();
 
let objLoader = new OBJLoader();

mtlLoader.setTexturePath('../assets/models/');

mtlLoader.load('../assets/models/chr_sword.mtl', (materials) => {
  materials.preload()
  objLoader.setMaterials(materials)
  objLoader.load('../assets/models/chr_sword.obj', (object) => {
    scene.add(object)
    console.log(object)
    object.position.x = 0
    object.position.y = 0
    object.position.z = 0
    object.scale.x = 4
    object.scale.y = 4
    object.scale.z = 4
  })
});

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.background = new THREE.Color(0xcccccc);

[camera.position.z, camera.position.x, camera.position.y] = [10, 0, 0];

const light = new THREE.DirectionalLight({color: 0x404040}); // soft white light
light.position.set(0, 0, 2)
scene.add(light);

export function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}
