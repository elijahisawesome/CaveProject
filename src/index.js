import modelLoader from './Models/modelLoader.js';
import video from './Models/Well_Water.webm';
import spawnSpirit from './subScripts/SpawnSpirit.js';
import look from './subScripts/look.js';
import movement, {logKey, removeKey} from './subScripts/movement.js';
import interact from './subScripts/interact.js';
import {collection, doc, onSnapshot, query, limit, orderBy} from 'firebase/firestore';
import db from './subScripts/firebase.js';

const THREE = require('three');

const main = (function(){
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    
    let testbuffer=1;

    const light = new THREE.PointLight();
    

    document.addEventListener('keydown', (e)=>{logKey(e,interact, scene,camera)});
    document.addEventListener('keyup', removeKey);
    document.addEventListener('mousemove', (e)=>{look(e, camera)});
    document.addEventListener('click', requestPointerLock);

    //Light
    light.position.x = 5;
    light.position.y = 5;
    light.position.z = 2;
    scene.add(light);
    

    //Load Models
    let models = modelLoader();
    models.then(results=>{
        results.forEach(result =>{
            console.log(result.scene);
            scene.add(result.scene);
        })

        
        const theeVideo = document.createElement('video');
        theeVideo.src = video;
        theeVideo.loop = true;
        theeVideo.autoplay = true;
        const texture = new THREE.VideoTexture(theeVideo)
        const material = new THREE.MeshBasicMaterial({map:texture});
        material.map.offset.x = -.47;
        material.map.offset.y = -.44;

        results[0].scene.children[5].material = material;

    }).catch((e)=>{
        //console.error(e);
    })



    camera.position.z = 10;
    camera.position.y = 5;


    function animate(){
        requestAnimationFrame( animate );
        movement(camera, scene);
        renderer.render( scene, camera );
    };

    function positionTexture(val1, val2){
        scene.children[1].children[5].material.map.offset.x +=val1;
        scene.children[1].children[5].material.map.offset.y +=val2;
        console.log(scene.children[1].children[5].material.map.offset);
    }

    function requestPointerLock(){
        renderer.domElement.requestPointerLock();
    }

    const q = query(collection(db, 'messages'), orderBy('timestamp'), limit(10));

    const mySnap= onSnapshot(q, (val)=>{
        val.docChanges().forEach((t)=>{
            const newSpirit = spawnSpirit(t);
            newSpirit.position.x = testbuffer;
            newSpirit.position.y = testbuffer;
            newSpirit.position.z = testbuffer;
            testbuffer++;
            scene.add(newSpirit);
        })
    
    },(error)=>{
        console.log(error);
    }
    )
    animate();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
})()