import modelLoader from './Models/modelLoader.js';
import video from './Models/Well_Water.webm';

const THREE = require('three');

const main = (function(){
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    const raycaster = new THREE.Raycaster();

    const light = new THREE.PointLight();
    let grounded = false;
    let movementKey = '';
    let movementArray = [false, false, false, false];
    let eulerCamera = new THREE.Euler(0,0,0, 'YXZ');

    document.addEventListener('keydown', logKey);
    document.addEventListener('keyup', removeKey);
    document.addEventListener('mousemove', look);
    document.addEventListener('click', requestPointerLock);

    

    function logKey(e){
        if(e.key== 'w'){
            movementArray[0] = true;
        }
        if(e.key == 'a'){
            movementArray[1] = true;
        }
        if(e.key == 's'){
            movementArray[2] = true;
        }
        if(e.key == 'd'){
            movementArray[3] = true;
        }

        //testing shit
        if(e.key == 'ArrowUp'){
            positionTexture(.01, 0);
        }
        if(e.key == 'ArrowDown'){
            positionTexture(-.01, 0);
        }
        if(e.key == 'ArrowLeft'){
            positionTexture(0, -.01);
        }
        if(e.key == 'ArrowRight'){
            positionTexture(0, .01);
        }
    }
    function removeKey(e){
        if(e.key == 'w'){
            movementArray[0] = false;
        }
        if(e.key == 'a'){
            movementArray[1] = false;
        }
        if(e.key == 's'){
            movementArray[2] = false;
        }
        if(e.key == 'd'){
            movementArray[3] = false;
        }
    }

    //spin off to own script.
    function look(e){
       eulerCamera.y -= e.movementX * .001;
       eulerCamera.x -= e.movementY * .001;
       camera.quaternion.setFromEuler(eulerCamera);
    }

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
        material.wrapS = 1000;
        material.wrapT = 1000;

        console.log(results[0].scene.children[5].material.map);
        console.log(material.map);

        results[0].scene.children[5].material = material;
    }).catch((e)=>{
        console.error(e);wd
    })



    camera.position.z = 10;
    camera.position.y = 5;


    function animate(){
        requestAnimationFrame( animate );
        movement();
        renderer.render( scene, camera );
    };

    function positionTexture(val1, val2){
        scene.children[1].children[5].material.map.offset.x +=val1;
        scene.children[1].children[5].material.map.offset.y +=val2;
    }

    function requestPointerLock(){
        renderer.domElement.requestPointerLock();
    }

    function groundCheck(){
        let down = new THREE.Vector3(0,-1,0);
        raycaster.set(camera.position, down);
        const intersects = raycaster.intersectObjects(scene.children);
        try{        if(intersects[0].distance <3){
            grounded = true;
        }
        else{
            grounded = false;
        }}
        catch(error){console.error(error)}

    }

    function movement(){
        groundCheck();
        if(!grounded){
            applyGravity(camera);
            console.log(scene.children);
        }
        applyMovement(camera);

    }
    function applyGravity(char){
        char.position.y -= .2;
    }
    function applyMovement(char){
        if(movementArray[0]){
            char.position.z -= .1* Math.cos(char.rotation.y);
            char.position.x -= .1 * Math.sin(char.rotation.y);
        }
        if(movementArray[1]){
            char.position.z += .1* Math.sin(char.rotation.y);
            char.position.x -= .1 * Math.cos(char.rotation.y);
        }
        if(movementArray[2]){
            char.position.z += .1* Math.cos(char.rotation.y);
            char.position.x += .1 * Math.sin(char.rotation.y);
        }
        if(movementArray[3]){
            char.position.z -= .1* Math.sin(char.rotation.y);
            char.position.x += .1 * Math.cos(char.rotation.y);
        }
    }
    animate();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
})()