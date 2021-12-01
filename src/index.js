import modelLoader from './Models/modelLoader.js';
import video from './Models/Well_Water.webm';
import spawnSpirit, {positionNewSpirit, dropSpirits} from './subScripts/SpawnSpirit.js';
import look from './subScripts/look.js';
import movement, {logKey, removeKey} from './subScripts/movement.js';
import interact from './subScripts/interact.js';
import {collection, doc, onSnapshot, query, limit, orderBy} from 'firebase/firestore';
import db from './subScripts/firebase.js';
import setupInstructions, {SetupSecondInstruction} from './subScripts/instructionsSetup.js';
import { Raycaster } from 'three';

const THREE = require('three');
(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()


const main = (function(){
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    const clock = new THREE.Clock();
    const frustum = new THREE.Frustum();
    let mixers = [];
    let collidables = [];
    let spiritArray = [];
    let spiritsAreSetup = false;
    const animateInterval = (1/30);
    let animDelta = 0;
    let instructions;
    

    const light = new THREE.PointLight();
    const InstGlow  = new THREE.PointLight(0xdaa520, .9);

    document.addEventListener('keydown', (e)=>{logKey(e,interact, scene,camera, renderer)});
    document.addEventListener('keyup', removeKey);
    document.addEventListener('click', requestPointerLock);
    document.addEventListener('pointerlockchange', lockChangeDispatch);
    window.addEventListener( 'resize', onWindowResize, false );

    //Light
    light.position.y = 25;
    scene.add(light);
    

    //Load Models
    let models = modelLoader();
    models.then(results=>{
        results.forEach(result =>{
            console.log(result.scene);
            collidables.push(result.scene);
            scene.add(result.scene);
            if(result.scene.name === 'Instructions'){
                instructions = result.scene;
                collidables.pop();
            }
        })

        const theeVideo = document.createElement('video');
        theeVideo.src = video;
        theeVideo.loop = true;
        theeVideo.autoplay = true;
        theeVideo.muted = true;
        theeVideo.play();
        const texture = new THREE.VideoTexture(theeVideo)
        const material = new THREE.MeshBasicMaterial({map:texture});
        material.map.offset.x = -.47;
        material.map.offset.y = -.44;

        console.log(theeVideo);

        results[0].scene.children[6].material = material;

        let softGlow = new THREE.PointLight(0xdaa520, .5);
        softGlow.position.y = .5;
        scene.add(softGlow);

        
        InstGlow.position.x = 25;
        scene.add(InstGlow);
        instructions.children.push(InstGlow);
        console.log(instructions);


    }).catch((e)=>{
        
    })



    camera.position.x = 25;
    camera.position.y = 0;
    camera.rotation.y = Math.PI/2;

    renderer.setClearColor(0x87ceeb, 1);

    function animate(){
        requestAnimationFrame( animate );
        let deltaTime = clock.getDelta();
        animDelta += deltaTime;
        if(animDelta > animateInterval)
        {    movement(camera, scene, collidables);
            if(!spiritsAreSetup){
                spiritsAreSetup = dropSpirits(spiritArray, scene);
            }
            renderer.render( scene, camera );
            
            animDelta = deltaTime%animateInterval;

            mixers.forEach(mixer =>{
                mixer.update(deltaTime);
            })
            
            if(instructions.name != 'removed'){
                try{setupInstructions(instructions, frustum, camera, scene);}
                catch(error){
                    console.error(error);
                }
            }
            else{
                try{SetupSecondInstruction(scene, camera, frustum)}
                catch(error){
                    console.errror(error);
                }
            }
        }
            
        
        

    };
    

    function lockChangeDispatch(){
        if(document.pointerLockElement == renderer.domElement){
            document.addEventListener('mousemove', handleLookEvent);
        }
        else{
            document.removeEventListener('mousemove', handleLookEvent);
        }
    }
    function requestPointerLock(){
        renderer.domElement.requestPointerLock();
    }
    function handleLookEvent(e){
        look(e,camera);
    }


    const q = query(collection(db, 'messages'), orderBy('timestamp'), limit(10));

    const mySnap= onSnapshot(q, (val)=>{
        val.docChanges().forEach((t)=>{
            const newSpirit = Promise.resolve(spawnSpirit(t));
            newSpirit.then(result=>{

                const mixer = new THREE.AnimationMixer(result.scene);
                mixers.push(mixer);
                const action = mixer.clipAction(result.animations[0])

                positionNewSpirit(result.scene);
                spiritArray.push(result.scene);

                scene.add(result.scene);
                action.setLoop(THREE.LoopRepeat);
                action.play();
                spiritsAreSetup = false;
            })

        })
    
    },(error)=>{
        console.log(error);
    }
    )
    animate();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    function onWindowResize(){

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    
        renderer.setSize( window.innerWidth, window.innerHeight );
    
    }
})()




/*
function positionTexture(val1, val2){
    scene.children[1].children[5].material.map.offset.x +=val1;
    scene.children[1].children[5].material.map.offset.y +=val2;
    console.log(scene.children[1].children[5].material.map.offset);
}*/