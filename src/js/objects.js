import * as GLTFLoader from "three-gltf-loader";
import * as FBXLoader from "three-fbxloader-offical";
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';


const mtlLoader = new MTLLoader();
 
const objLoader = new OBJLoader();

const fbxLoader = new FBXLoader();

export const loadWalking = scene => ( 
    fbxLoader.load('../assets/models/Walking.fbx', 
        object => {
            scene.add(object);
            object.position.x = 0;
            object.position.y = 0;
            object.position.z = 0;
        }
    )
)

mtlLoader.setTexturePath('../assets/models/');

export const loadSword = scene => (
    mtlLoader.load('../assets/models/chr_sword.mtl', (materials) => {
      materials.preload()
      objLoader.setMaterials(materials)
      objLoader.load('../assets/models/chr_sword.obj', (object) => {
        object.position.x = 0
        object.position.y = 0
        object.position.z = 0
        object.scale.x = 4
        object.scale.y = 4
        object.scale.z = 4
      })
    })
)

