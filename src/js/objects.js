import * as GLTFLoader from "three-gltf-loader";
import * as FBXLoader from "three-fbxloader-offical";
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
        resolve(object)
      })
    })
));


export const loadWalking = (scene, objs) => ( 
    fbxLoader.load('../assets/models/Samba Dancing.fbx', 
        object => {
            scene.add( object );
 
            object.position.x = 0;
            object.position.y = 0;
            object.position.z = 0;
        }
    )
)


export const loadSword = () => new Promise((resolve, reject) => (
    mtlLoader.load('../assets/models/chr_sword.mtl', (materials) => {
      materials.preload()
      objLoader.setMaterials(materials)
      objLoader.load('../assets/models/chr_sword.obj', (object) => {
        resolve(object);
      })
    })
));

