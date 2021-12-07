const THREE = require('three');
import amb from './Ambient_Guitar.mp3';
import stb1 from './Synth_Stab.mp3';
import stb2 from './Violin_Stab.mp3';
import footfall from './FootFall.mp3';

let listener;
let footLoaded = false;
let footfallSound;
const audioLoader = new THREE.AudioLoader();

export default function(_listener){
    listener = _listener;
    const amb1 = new THREE.Audio(listener);
    const stab1 = new THREE.Audio(listener);
    const stab2 = new THREE.Audio(listener);
    

    audioLoader.load(amb,(buffer)=>{
        amb1.setBuffer(buffer);
        amb1.setLoop(true);
        amb1.setVolume(1);
        amb1.play();
    })
    audioLoader.load(stb1,(buffer)=>{
        stab1.setBuffer(buffer);
        stab1.setLoop(false);
        stab1.setVolume(1);
        randomizer(stab1, 15);
    })
    audioLoader.load(stb2,(buffer)=>{
        stab2.setBuffer(buffer);
        stab2.setLoop(false);
        stab2.setVolume(.2);
        randomizer(stab2, 27);
    })
}

function randomizer(sound, interval){
    setInterval(()=>{sound.play()}, interval*interval*100)
}

function playWalkingSound(){
    if(!footLoaded){
        footfallSound = new THREE.Audio(listener);
        audioLoader.load(footfall, (buffer)=>{
            footfallSound.setBuffer(buffer);
            footfallSound.setLoop(false);
            footfallSound.setVolume(1);
            footfallSound.stop();
        })

        footLoaded= true;
    }
    if(!footfallSound.isPlaying){
        footfallSound.play();
    }

}

export {playWalkingSound}