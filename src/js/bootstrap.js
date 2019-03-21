import * as THREE from "three";
import * as OrbitControls from "three-orbitcontrols";

import { loadWalking } from './objects.js';
import { keys } from "./config.json";


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

// Load objects
loadWalking(scene);

[camera.position.z, camera.position.x, camera.position.y] = [100, 0, 30];

const light = new THREE.DirectionalLight({color: 0x404040}); // soft white light
light.position.set(0, 0, 2)
scene.add(light);

export function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}
