const THREE = require('three');

export default function spawnSpirit(_message){
    const message = _message.doc._document.data.value.mapValue.fields.message.stringValue
    const geometry = new THREE.SphereGeometry(1, 3, 2);
    const material = new THREE.MeshBasicMaterial({color:0x00ff00});
    const sphere = new THREE.Mesh(geometry,material);
    sphere.message = message;
    sphere.name = 'message';

    return sphere;
}