import db from './firebase.js';
import {collection, getDocs, addDoc, doc, Timestamp} from 'firebase/firestore';
import '../styles/wishes.css';
import {readMessageCard, newMessageCard} from '../components/message.js';

const THREE = require('three');

export default function interact(raycaster, scene, camera,){ 
    raycaster.setFromCamera(new THREE.Vector2(), camera);

    const intersects = raycaster.intersectObjects(scene.children);
    if(intersects[0].object.name == 'Well001' && intersects[0].distance <3){
        setupNewCard();
        document.exitPointerLock = document.exitPointerLock;
        document.exitPointerLock();
    }
    else if (intersects[0].object.name == 'Spirit' && intersects[0].distance <3){
        setupFilledCard(intersects[0].object.parent.message)
    }
    else{
        console.log(intersects[0]);
    }
}
    


async function setData(msg){
    
    await addDoc(collection(db, 'messages'), {
        message: msg,
        timestamp: Timestamp.now()
    });

}

    function setupNewCard(){
        function submitCard(e, message){
            e.stopPropagation();
            setData(message);

            const oldWish = document.getElementById('message');
            oldWish.remove();
        }
        const newWish = newMessageCard(submitCard);

        document.body.append(newWish);
    }
    function setupFilledCard(message){
        const newCard = readMessageCard(message);

        document.body.append(newCard);
    }