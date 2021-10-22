import db from './firebase.js';
import {collection, getDocs, addDoc, doc, Timestamp} from 'firebase/firestore';
import '../styles/wishes.css';
import message from '../components/message.js';

const THREE = require('three');

export default function interact(raycaster, scene, camera, isAMessage){
    if(!isAMessage)
        {
        raycaster.setFromCamera(new THREE.Vector2(), camera);

        const intersects = raycaster.intersectObjects(scene.children);
        if(intersects[0].object.name == 'Well001' && intersects[0].distance <3){
            setupNewCard();
        }
        else if (intersects[0].object.name == 'message' && intersects[0].distance <3){
            setupFilledCard(intersects[0].object.message)
        }
    }
    else{

    }
}

async function setData(msg){

    
    await addDoc(collection(db, 'messages'), {
        message: msg,
        timestamp: new Timestamp(9, 9)
    });

}

    function setupNewCard(){
        function submitCard(e, message){
            e.stopPropagation();
            setData(message);

            const oldWish = document.getElementById('message');
            oldWish.remove();
        }
        const newWish = message(submitCard);

        document.body.append(newWish);
    }
    function setupFilledCard(message){
        console.log(message);
    }