import collisionDetection, {applyCollisionBox} from './collisionDetection.js';

const THREE = require('three');
const raycaster = new THREE.Raycaster();


let movementArray = [false, false, false, false];
let grounded = false;
let jumping = false;
let moving = false;
let appliedCollisionBox = false;
let collider;

let defaultRotation = new THREE.Quaternion()

function logKey(e, interact,scene,camera){
    if(e.key== 'w'){
        movementArray[0] = true;
    }
    if(e.key == 'a'){
        movementArray[1] = true;
    }
    if(e.key == 's'){
        movementArray[2] = true;
    }
    if(e.key == 'd'){
        movementArray[3] = true;
    }
    if(e.key =='e'){
        interact(raycaster, scene,camera);
    }
    if(e.key ==' '){
        jump(camera);
    }
    /*
        testing
        if(e.key == 'ArrowUp'){
            positionTexture(.01, 0);
        }
        if(e.key == 'ArrowDown'){
            positionTexture(-.01, 0);
        }
        if(e.key == 'ArrowLeft'){
            positionTexture(0, -.01);
        }
        if(e.key == 'ArrowRight'){
            positionTexture(0, .01);
        }*/
}
function removeKey(e){
    if(e.key == 'w'){
        movementArray[0] = false;
    }
    if(e.key == 'a'){
        movementArray[1] = false;
    }
    if(e.key == 's'){
        movementArray[2] = false;
    }
    if(e.key == 'd'){
        movementArray[3] = false;
    }
    if(e.key =='e'){
        
    }
    if(e.key =='Space'){
        
    }
}
function jump(char){
    if(grounded){
        jumping = true;
        setTimeout(()=>{jumping = false}, 500)
    }
}

export default function movement(camera, scene, collidables){
    if(!appliedCollisionBox){
        appliedCollisionBox = true;
        collider = applyCollisionBox(camera,scene);
    }
    groundCheck(camera, scene);
    if(!grounded && !jumping){
        applyGravity(camera);
    }
    else if(jumping){
        applyJump(camera)
    }
    applyMovement(camera);
    collisionDetection(camera, collider, raycaster, moving, collidables);
    
    
}

function groundCheck(camera, scene){
    let down = new THREE.Vector3(0,-1,0);
    raycaster.set(camera.position, down);
    const intersects = raycaster.intersectObjects(scene.children);
    try{        
        if(intersects[0].distance <3 && !jumping){
            if(intersects[0].object.name == 'Well001'){
                return;
            }
        grounded = true;
        camera.position.y = intersects[0].point.y +2;
    }
    else{
        grounded = false;
    }}
    catch(error){}
}

function applyJump(char){
    char.position.y += .2;
}
function applyGravity(char){
    char.position.y -= .2;
}
function applyMovement(char){
    if(char.rotation.z >Math.PI/2 || char.rotation.z < -Math.PI/2)
    {        
        if(movementArray[0]){
            char.position.z += .1* Math.cos(char.rotation.y);
            char.position.x -= .1 * Math.sin(char.rotation.y);
        }
        if(movementArray[1]){
            char.position.z += .1* Math.sin(char.rotation.y);
            char.position.x += .1 * Math.cos(char.rotation.y);
        }
        if(movementArray[2]){
            char.position.z -= .1* Math.cos(char.rotation.y);
            char.position.x += .1 * Math.sin(char.rotation.y);
        }
        if(movementArray[3]){
            char.position.z -= .1* Math.sin(char.rotation.y);
            char.position.x -= .1 * Math.cos(char.rotation.y);
        }
    }
    else{
        if(movementArray[0]){
            char.position.z -= .1* Math.cos(char.rotation.y);
            char.position.x -= .1 * Math.sin(char.rotation.y);
        }
        if(movementArray[1]){
            char.position.z += .1* Math.sin(char.rotation.y);
            char.position.x -= .1 * Math.cos(char.rotation.y);
        }
        if(movementArray[2]){
            char.position.z += .1* Math.cos(char.rotation.y);
            char.position.x += .1 * Math.sin(char.rotation.y);
        }
        if(movementArray[3]){
            char.position.z -= .1* Math.sin(char.rotation.y);
            char.position.x += .1 * Math.cos(char.rotation.y);
        }
    }
    
}


export {logKey, removeKey};

