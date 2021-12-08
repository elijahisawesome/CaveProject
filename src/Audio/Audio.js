const THREE = require('three');
import amb from './Ambient_Guitar.mp3';
import stb1 from './Synth_Stab.mp3';
import stb2 from './Violin_Stab.mp3';
import footfall from './FootFall.mp3';
import chime1 from './Chime1.mp3';
import chime2 from './Chime2.mp3';
import chime3 from './Chime3.mp3';

let listener;
let footLoaded = false;
let footfallSound;
let chimes = [chime1, chime2, chime3];
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

function secondRandomizer(sound){
    setInterval(() =>{
        sound.play();
    }, Math.round(Math.random()*10000)+8000)
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

function getSpiritSound(mesh){
    clone(chimes[Math.round(2*Math.random())], mesh);
}

function clone(sound, mesh){

    if(!mesh.hasSoundAttached){
        let chime = new THREE.PositionalAudio(listener);
        audioLoader.load(sound, (buffer)=>{
        chime.setBuffer(buffer);
        chime.setRefDistance(.3);
        chime.setLoop(false);
        secondRandomizer(chime);
        mesh.children[0].add(chime);
        })
    }

}
export {playWalkingSound, getSpiritSound}