const THREE = require('three');
let firstTrigger = false;
let secondTrigger = false;
let Trigger;
let Collider;


export default function setupInstructions(instructions, frustum, camera, scene, ){
    frustum.setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse ))
    let allGone = true;
    let light = instructions.children[instructions.children.length-1];
    instructions.children.forEach(obj=>{
        if(frustum.containsPoint(obj.position)){
            allGone = false;
        }
        
    })
    if(allGone){
        light.intensity = 0;
        scene.remove(instructions);
        instructions.name = 'removed';
    }
}

export function SetupSecondInstruction(scene, camera, frustum){
    if(!firstTrigger){
        const geometry = new THREE.BoxGeometry(2.5,3,2.5);
        const material = new THREE.MeshBasicMaterial({color: 0xffff00, transparent:true})
        Trigger = new THREE.Mesh(geometry, material);
        Trigger.name = "Trigger";
        material.opacity = 0;
        scene.add(Trigger);

        Trigger.position.x = 1;
        Trigger.position.y = 3;
        Trigger.position.z = -1;

        firstTrigger = true;
        Collider = scene.getObjectByName('collider');
    }
    if(!secondTrigger){
        let trig = new THREE.Box3().setFromObject(Trigger);
        let col = new THREE.Box3().setFromObject(Collider);
        let allGone = true;
        if (trig.containsBox(col)){
            const secondInstructions = scene.getObjectByName('Instructions2');
            frustum.setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse ));
            secondInstructions.children.forEach(obj=>{
                if(frustum.containsPoint(obj.position)){
                    allGone = false;
                }
            })
            if(allGone){
                scene.remove(secondInstructions);
                scene.remove(Trigger);
                secondTrigger = true;
            }
        }
    }
    

}