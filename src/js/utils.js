import * as THREE from "three";
import * as CANNON from "cannon";


export const initCannon = mesh => {
    let world = new CANNON.World();
    world.gravity.set(0,0,0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;
    let shape = new CANNON.Box(new CANNON.Vec3(1,1,1));
    
    let body = new CANNON.Body({
        mass: 1
    });

    body.addShape(shape);
    world.addBody(body);
    return body;
}

export const updateCannon = (body, origin) => {
    origin.position.copy(body.position)
}


const createBoudingCubeVertices = mesh => {
    var helper = new THREE.BoundingBoxHelper(mesh, 0xff0000);
    console.log(helper)
}

export const checkCollision = (object, scene) => {
    let originPoint = object.position.clone();
    let prevPosition = new THREE.Vector3();
    let raycaster = new THREE.Raycaster();
    raycaster.far = 1.0;
    [new THREE.Vector3(0, 0, 1),
      new THREE.Vector3(1, 0, 1),
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(1, 0, -1),
      new THREE.Vector3(0, 0, -1),
      new THREE.Vector3(-1, 0, -1),
      new THREE.Vector3(-1, 0, 0),
      new THREE.Vector3(-1, 0, 1)].forEach(ray => {
        raycaster.set(object.position, ray)
        let collisions = raycaster.intersectObject(scene.getObjectByName( "scenario", true ), true);
        (collisions.length > 0)
          ? (() => {
              object.children[0].material.transparent = true
              object.children[0].material.opacity = 0.4
          })()
          : prevPosition.set(...object.position.toArray());
    });

  
   // for (var vertexIndex = 0; vertexIndex < object.children[0].geometry.attributes.position.count; vertexIndex++) {
   //     let currentPosition = object.children[0].geometry.attributes.position
   //     
   //     let localVertex = new THREE.Vector3(
   //         currentPosition.getX(vertexIndex),
   //         currentPosition.getY(vertexIndex),
   //         currentPosition.getZ(vertexIndex));

   //     var globalVertex = localVertex.applyMatrix4(object.matrix);
   //     var directionVector = globalVertex.sub(object.position);
   //     //console.log(directionVector);
   //     var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
   //     var collisionResults = ray.intersectObjects(scene.children);
   //     if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
   //        console.log(collisionResults[0].object.name);
   //        // collisionResults[0].object.material.transparent = true;
   //        // collisionResults[0].object.material.opacity = 0.4;
   //     }
   // }
}
