const THREE = require('three');
let eulerCamera = new THREE.Euler(0,0,0, 'YXZ');


export default function look(e, camera){
    eulerCamera.y -= e.movementX * .01;
    eulerCamera.x -= e.movementY * .01;
    camera.quaternion.setFromEuler(eulerCamera);
 }