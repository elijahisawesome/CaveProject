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