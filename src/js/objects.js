import * as GLTFLoader from "three-gltf-loader";
import * as FBXLoader from "three-fbxloader-offical";
import * as THREE from "three";
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';


const mtlLoader = new MTLLoader();
 
const objLoader = new OBJLoader();

const fbxLoader = new FBXLoader();

mtlLoader.setTexturePath('../assets/models/');

export const loadScenario = () => new Promise((resolve, reject) => (
    mtlLoader.load('../assets/models/cenario exagono.mtl', materials => {
      materials.preload()
      objLoader.setMaterials(materials)
      objLoader.load('../assets/models/cenario exagono.obj', object => {
        object.name = 'scenario';
        resolve(object)
      })
    })
));


export const loadSword = () => new Promise((resolve, reject) => (
    mtlLoader.load('../assets/models/personagem com arma.mtl', (materials) => {
      materials.preload()
      objLoader.setMaterials(materials)
      objLoader.load('../assets/models/personagem com arma.obj', (object) => {
        object.name = 'character';
        resolve(object);
      })
    })
));

