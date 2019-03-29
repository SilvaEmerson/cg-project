import * as THREE from "three";
import * as OrbitControls from "three-orbitcontrols";

import { loadSword,loadWalking, loadScenario } from './objects.js';
import { keys } from "./config.json";


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
const clock = new THREE.Clock();
const objs = {};

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.background = new THREE.Color(0xcccccc);

// Load objects
//loadWalking(scene, objs);
loadScenario()
    .then(scenario => {
        scene.add(scenario);
        scenario.position.y = 0;
        scenario.position.z = 0;
        scenario.position.x = 0;
    });

loadSword()
    .then(object => {
        scene.add(object);
        object.position.x = 0;
        object.position.y = 30
        object.position.z = 30
        object.scale.x = 10
        object.scale.y = 10
        object.scale.z = 10
        
        document.onkeydown = code => {
          console.log(code)
          object.position.x += keys["x"][code.code]
          object.position.y += keys["y"][code.code]
        }
    }).catch(err => console.log(err.message));

[camera.position.z, camera.position.x, camera.position.y] = [100, 50, 200];

//[camera.position.z, camera.position.x, camera.position.y] = [-150, 100, 100];

camera.rotation.y = 180 * Math.PI / 180;
camera.lookAt(scene.position);
renderer.setPixelRatio( window.devicePixelRatio );

const pointLight = new THREE.PointLight( 0xffffff, 1, 200 );
const light = new THREE.AmbientLight({color: 0x404040}); // soft white light
//scene.add(light);
pointLight.position.set( 100, 100, 100 );
scene.add( pointLight );

export function animate() {
    //objs.forEach(({mixer}) => {mixer.update(clock.getDelta());});
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
