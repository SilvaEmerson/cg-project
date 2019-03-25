import * as THREE from "three";
import * as OrbitControls from "three-orbitcontrols";
import * as FBXLoader from "three-fbx-loader";
import * as GLTFLoader from "three-gltf-loader";

const loader = new GLTFLoader();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.background = new THREE.Color(0xcccccc);
scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

camera.position.z = 5;

controls.target.set(0, 100, 0);

controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
//controls.minDistance = 100;
//controls.maxDistance = 500;
controls.maxPolarAngle = Math.PI / 2;

var light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);

const geometry = new THREE.CylinderBufferGeometry(0, 10, 30, 4, 1);

Array(1500)
  .fill(null)
  .forEach(() => {
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      flatShading: true
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh;
    mesh.position.x = Math.random() * 1600 - 800;
    mesh.position.y = 0;
    mesh.position.z = Math.random() * 1600 - 800;
    mesh.updateMatrix();
    mesh.matrixAutoUpdate = false;
    scene.add(mesh);
  });

loader.load("../assets/models/Flamingo.glb", obj => {
  console.log(Object.keys(obj));
  console.log(obj.scene);
  scene.add(obj.scene);
});

export const animate = ((renderer, camera, scene) => () => {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
})(renderer, camera, scene);
