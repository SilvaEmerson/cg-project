import * as THREE from "three";
import * as OrbitControls from "three-orbitcontrols";
import * as GLTFLoader from "three-gltf-loader";
import { keys } from "./config.json";

const loader = new GLTFLoader();
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
scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

[camera.position.z, camera.position.x, camera.position.y] = [500, 50, 0];

const light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);

var loadedObject = THREE.Object3D();

const loadObject = new Promise((resolve, reject) => {
  loader.load(
    "../assets/models/Flamingo.glb",
    obj => {
      resolve(obj);
    },
    undefined,
    err => reject(err.message)
  );
});

loadObject
  .then(object => {
    scene.add(object.scene);
    loadedObject = object.scene;

    document.addEventListener(
      "keydown",
      ev => {
        keys.y.hasOwnProperty(ev.code)
          ? (loadedObject.position.y += keys.y[ev.code])
          : keys.x.hasOwnProperty(ev.code)
          ? (loadedObject.position.x += keys.x[ev.code])
          : undefined;
      },
      false
    );
  })
  .catch(err => console.log(err.message));

export function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}
