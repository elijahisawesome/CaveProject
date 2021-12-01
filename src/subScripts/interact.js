import db from './firebase.js';
import {collection, getDocs, addDoc, doc, Timestamp} from 'firebase/firestore';
import '../styles/wishes.css';
import {readMessageCard, newMessageCard} from '../components/message.js';

const THREE = require('three');

export default function interact(raycaster, scene, camera, renderer){ 
    raycaster.setFromCamera(new THREE.Vector2(), camera);

    const intersects = raycaster.intersectObjects(scene.children);
    if(intersects[0].object.name == 'Well_Blocker' && intersects[0].distance <3){
        setupNewCard(renderer);

        document.querySelector('textarea').focus();

        document.exitPointerLock();
    }
    else if (intersects[0].object.name == 'Spirit' && intersects[0].distance <3){
        setupFilledCard(intersects[0].object.parent.message, renderer)

        document.getElementById('message').focus();

        document.exitPointerLock();
    }
    else{
        console.log(intersects[0].object.name);
        return
    }
}
    


async function setData(msg){
    
    await addDoc(collection(db, 'messages'), {
        message: msg,
        timestamp: Timestamp.now()
    });

}

    function setupNewCard(renderer){
        function submitCard(e, message){
            e.stopPropagation();
            setData(message);

            const oldWish = document.getElementById('message');
            oldWish.remove();
        }
        const newWish = newMessageCard(submitCard, renderer);

        document.body.append(newWish);
    }
    function setupFilledCard(message, renderer){
        const newCard = readMessageCard(message, renderer);

        document.body.append(newCard);
    }