import * as THREE from "three";
import * as OrbitControls from "three-orbitcontrols";

import { loadSword,loadWalking, loadScenario } from './objects.js';
import { keys } from "./config.json";
import { checkCollision } from "./utils";

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
loadScenario()
    .then(scenario => {
        scenario.name = 'scenario';
        scene.add(scenario);
        [scenario.position.x,
         scenario.position.y,
         scenario.position.z] = [0, 0, 0];
    });

loadSword()
    .then(object => {
        console.log(`Name: ${object.name}`);
        object.name = 'character';
        scene.add(object);
        [object.position.x,
         object.position.y,
         object.position.z] = [0, 50, 0];
        [object.scale.x,
        object.scale.y,
        object.scale.z] = [5, 5, 5];

        document.onkeydown = ev => {
          (keys['z'].hasOwnProperty(ev.key))
            ? (object.position.z += keys["z"][ev.key])
            : (keys['x'].hasOwnProperty(ev.key))
                ? (() => {
                    object.rotateY(keys.x[ev.key].angle * Math.PI / 180); 
                    object.position.x += keys["x"][ev.key].move
                })()
                : undefined;
        }
    }).catch(err => console.log(err.message));

[camera.position.z, camera.position.x, camera.position.y] = [100, 50, 200];

//[camera.position.z, camera.position.x, camera.position.y] = [-150, 100, 100];

camera.rotation.y = 180 * Math.PI / 180;
camera.lookAt(scene.position);
renderer.setPixelRatio( window.devicePixelRatio );

const pointLight = new THREE.PointLight( 0xffffff, 1, 200 );
const pointLight2 = new THREE.PointLight( 0xffffff, 1, 200 );
const pointLight3 = new THREE.PointLight( 0xffffff, 1, 200 );
const light = new THREE.AmbientLight({color: 0x404040}); // soft white light
//scene.add(light);
pointLight.position.set( 100, 100, 100 );
pointLight2.position.set( -100, 100, 100 );
pointLight3.position.set( 100, 200, 200 );

scene.add(pointLight);
scene.add(pointLight2);
scene.add(pointLight3);

export function animate() {
    //objs.forEach(({mixer}) => {mixer.update(clock.getDelta());});
    renderer.render(scene, camera);
   // if(scene.getObjectByName( "character", true ))
   //     checkCollision(scene.getObjectByName('character', true));
    requestAnimationFrame(animate);
}
