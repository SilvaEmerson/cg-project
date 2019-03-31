import * as THREE from "three";



export const updateCannon = (body, origin) => {
    origin.position.copy(body.position)
}


const createBoudingCubeVertices = mesh => {
    var helper = new THREE.BoundingBoxHelper(mesh, 0xff0000);
}

export const checkCollision = (object, scene) => {
    let originPoint = object.position.clone();
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
          //do some action when collide
          ? (() => {
              object.children[0].material.transparent = true
              object.children[0].material.opacity = 0.4
          })()
          : undefined;
    });

  
}
