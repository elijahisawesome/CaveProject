import { Vector2 } from 'three';

const THREE = require('three');

export default function collisionDetection(camera, collider, raycaster, moving, collidables){
    if(!!collider && collider.position != camera.position){
        collider.position.y = camera.position.y+.3;
        collider.position.z = camera.position.z;
        collider.position.x = camera.position.x;

        const positions = new THREE.BufferAttribute(collider.geometry.attributes.position.array, 3);
        let vector = new THREE.Vector3();
        let vertexCount = positions.count/3;

        for (let i = 0; i < vertexCount; i ++){
            vector.fromBufferAttribute(positions, i);
            vector.applyMatrix4(collider.matrixWorld);

            let directionVector = vector.sub(collider.position);

            raycaster.set(collider.position, directionVector.clone().normalize())
            let collisionResults = raycaster.intersectObjects(collidables);
            if (collisionResults.length>0 && collisionResults[0].distance < directionVector.length()){
                let newDirVector = new Vector2(Math.atan2(collisionResults[0].face.normal.x, collisionResults[0].face.normal.z), Math.atan2(collisionResults[0].face.normal.z, collisionResults[0].face.normal.x))
                if((collisionResults[0].face.normal.x > 0 && collisionResults[0].face.normal.z > 0) || collisionResults[0].face.normal.x < 0 && collisionResults[0].face.normal.z < 0){
                    camera.position.x = camera.position.x + Math.cos(newDirVector.x)*.1;
                    camera.position.z = camera.position.z + Math.sin(newDirVector.y)*.1;
                }
                else if(collisionResults[0].face.normal.x > 0){
                    camera.position.x = camera.position.x + Math.sin(newDirVector.x)*.1;
                    camera.position.z = camera.position.z + Math.sin(newDirVector.y)*.1;
                }
                else if (collisionResults[0].face.normal.x <0){
                    camera.position.x = camera.position.x - Math.cos(newDirVector.x)*.1;
                    camera.position.z = camera.position.z + Math.sin(newDirVector.y)*.1;
                }
            }
        }
        /*
        positions.forEach((pos, index) =>
        {
            vector.fromBufferAttribute(positions, index);
            vector.applyMatrix4(collider.matrixWorld);
            
            let directionVector = vector.subSelf(collider.position);

            let ray= new THREE.Ray(collider.position, directionVector.clone().normalize());
            let collisionResults = ray.intersectObjects();
            if (collisionResults.length>0 && collisionResults[0].distance < directionVector.length()){
                console.log('collision');
            }
        }
        )*/
    }
}

function applyCollisionBox(camera, scene){
    
    const geometry = new THREE.CylinderGeometry(.5, .5, 1, 8);
    const material = new THREE.MeshBasicMaterial({color:0x00ff00});
    const sphere = new THREE.Mesh(geometry,material);
    sphere.name = 'collider';

    scene.add(sphere);
    sphere.position.y = camera.position.y+.3;
    sphere.position.z = camera.position.z;
    sphere.position.x = camera.position.x;

    console.log(sphere);

    return sphere;
}

export {applyCollisionBox}