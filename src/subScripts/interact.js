import db from './firebase.js';
import {collection, getDocs, addDoc, doc} from 'firebase/firestore';

const THREE = require('three');

export default function interact(raycaster, scene, camera){
    raycaster.setFromCamera(new THREE.Vector2(), camera);

    const intersects = raycaster.intersectObjects(scene.children);
    if(intersects[0].object.name == 'Well001' && intersects[0].distance <3){
        console.log('interacting!');
        setData();
    }
}

async function setData(){

    await addDoc(collection(db, 'messages'), {
        message: 'Hoobidie boobide'
    });
}