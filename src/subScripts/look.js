const THREE = require('three');
let eulerCamera = new THREE.Euler(0,Math.PI/2,0, 'YXZ');


export default function look(e, camera){
    eulerCamera.y -= e.movementX * .001
    eulerCamera.x -= e.movementY * .001;

    eulerCamera.x = clamp(eulerCamera.x,  -Math.PI/2, Math.PI/2);

    camera.quaternion.setFromEuler(eulerCamera);
 }

 const clamp = (num, min, max) => Math.min(Math.max(num, min), max);