const THREE = require('three');
import {spirit} from '../Models/modelLoader.js';

export default function spawnSpirit(_message){
    const message = _message.doc._document.data.value.mapValue.fields.message.stringValue
    return spirit().then(
        function(result){
            result.scene.message = message;
            result.scene.name = 'message';
            return result;
        }
    )
}

function positionNewSpirit(obj){
    obj.position.y = 3;

    obj.scale.x = 3;
    obj.scale.y = 3;
    obj.scale.z = 3;

    obj.position.z = Math.random()*7*(Math.random()>.5 ? 1 : -1);
    obj.position.x = Math.random()*7*(Math.random()>.5 ? 1 : -1);
}

function dropSpirits(spiritArray, scene){
    let down = new THREE.Vector3(0,-1,0);
    let raycaster = new THREE.Raycaster()
    let setupComplete = false;
    if(!!spiritArray[0]){
        setupComplete = true;
    }
    spiritArray.forEach(spirit=>{

        let pos = new THREE.Vector3(spirit.position.x, spirit.position.y+8, spirit.position.z);
        raycaster.set(pos, down);
        const intersects = raycaster.intersectObjects(scene.children);
        try{
            if(intersects[0].distance >1){
                setupComplete = false;
                applyGravity(spirit);
            }
        }
        catch{
            
        }

        
    })
    return setupComplete;
}
function applyGravity(spirit){
    spirit.position.y -= .03;
}
export {positionNewSpirit, dropSpirits}