import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import Well_And_Scene from './Well_And_Scene.glb'
import Text_And_Keys from './Well_Text_And_Keys.glb';
import Second_Tex_And_Keys from './Well_Interact_Text_And_Key.glb';
import Well_Assisters from './Well_Assisters.glb';
import Spirits from './Spirit.glb';

let loader = new GLTFLoader();


const modelLoader = function(){
    let models;
    //let Well_And_Scene = './Well_And_Scene.glb'


    if (process.env.NODE_ENV == 'production'){
        buttonLoc = '/Rolodex-Project' + buttonLoc;
        dexLoc = '/Rolodex-Project' + dexLoc;
        tableAndRoomLoc = '/Rolodex-Project' + tableAndRoomLoc;
    }

    let wellAndScene = loader.loadAsync(
        Well_And_Scene,
        null,
        function(error){console.error(error)}
    )
    let textAndKeys = loader.loadAsync(
        Text_And_Keys,
        null,
        function(error){console.error(error)}
    )
    let Assisters = loader.loadAsync(
        Well_Assisters,
        null,
        function(error){console.error(error)}
    )
    let SecondTAK = loader.loadAsync(
        Second_Tex_And_Keys,
        null,
        function(error){console.error(error)}
    )



    
        return Promise.all([wellAndScene, textAndKeys, Assisters, SecondTAK]).then((results)=>{
        models = results;
        models[1].scene.name = 'Instructions';
        models[3].scene.name = 'Instructions2';
        return models;
    });

    
}

const spirit = function(){
    let spirits = loader.loadAsync(
        Spirits,
        null,
        function(error){console.error(error)}
    )
    return Promise.resolve(spirits);
}

export default modelLoader
export {spirit}