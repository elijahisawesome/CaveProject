import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import Well_And_Scene from './Well_And_Scene.glb'




const modelLoader = function(){
    let models;
    let loader = new GLTFLoader();
    //let Well_And_Scene = './Well_And_Scene.glb'


    if (process.env.NODE_ENV == 'production'){
        buttonLoc = '/Rolodex-Project' + buttonLoc;
        dexLoc = '/Rolodex-Project' + dexLoc;
        tableAndRoomLoc = '/Rolodex-Project' + tableAndRoomLoc;
    }

    let wellAndScene = loader.loadAsync(
        Well_And_Scene,
        null,
        function(error){console.log(error)}
    )

    
        return Promise.all([wellAndScene]).then((results)=>{
        models = results;
        return models;
    });

    
}

export default modelLoader