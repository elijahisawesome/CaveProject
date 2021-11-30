const THREE = require('three');
let eulerCamera = new THREE.Euler(0,Math.PI/2,0, 'YXZ');


export default function look(e, camera){
    eulerCamera.y -= e.movementX * .001;
    eulerCamera.x -= e.movementY * .001;
    camera.quaternion.setFromEuler(eulerCamera);
 }