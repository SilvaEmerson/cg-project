export const checkCollision = object => {
    let originPoint = object.position.clone();
   
    console.log(object);
    for (var vertexIndex = 0; vertexIndex < object.children.geometry.vertices.length; vertexIndex++) {
        var localVertex = object.geometry.vertices[vertexIndex].clone();
        var globalVertex = localVertex.applyMatrix4(object.matrix);
        var directionVector = globalVertex.sub(object.position);
        var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
        var collisionResults = ray.intersectObjects(objects);
        if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
            console.log(collisionResults[0].object.name);
            collisionResults[0].object.material.transparent = true;
            collisionResults[0].object.material.opacity = 0.4;
        }
    }
}
