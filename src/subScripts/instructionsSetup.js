const THREE = require('three');

export default function setupInstructions(instructions, frustum, camera, scene){
    frustum.setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse ))
    let allGone = true;
    instructions.children.forEach(obj=>{
        if(frustum.containsPoint(obj.position)){
            allGone = false;
        }
        
        //implement despawning once not looked at
    })
    if(allGone){
        scene.remove(instructions);
        instructions.name = 'removed';
    }
}