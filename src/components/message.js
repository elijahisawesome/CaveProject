import bkg from '../styles/burnt-parchment.jpg';
import openingMessage from '../subScripts/openingMessage';

function newMessageCard(submitCard, renderer){
    const card = document.createElement('div');
    const inputMessage = document.createElement('textarea');
    const sendMessage = document.createElement('button');
    const deleteCard = document.createElement('button');
        card.id = 'message';
        card.innerText = 'Message: ';
    card.append(inputMessage);
    card.append(sendMessage);
    card.append(deleteCard);

    sendMessage.innerText = 'Send Message';
    deleteCard.innerText = 'Back';
    deleteCard.classList.add('back');
    
    deleteCard.addEventListener('click', (e)=>{

        const card = document.getElementById('message');
        card.remove();
        requestPointerLock(renderer);
    })

    sendMessage.addEventListener('click', (e)=>{submitCard(e, inputMessage.value)})

    card.style.backgroundImage = `url(${bkg})`;
    card.addEventListener('click',(e)=>{e.stopPropagation();})
    card.addEventListener('keydown',(e)=>{e.stopPropagation();})
    return card;
}

function readMessageCard(msg, renderer){
    const card = document.createElement('div');
    card.classList.add('read');

    const readMessage = document.createElement('textarea');
    readMessage.classList.add('textBox')
    readMessage.readOnly=true;

    const deleteCard = document.createElement('button');
        card.id = 'message';
        readMessage.innerText = msg;
    card.append(readMessage);
    card.append(deleteCard);
    
    deleteCard.innerText = 'Back';
    deleteCard.classList.add('back');
    
    deleteCard.addEventListener('click', (e)=>{
        const card = document.getElementById('message');
        card.remove();
        requestPointerLock(renderer);
    })

    card.style.backgroundImage = `url(${bkg})`;
    card.addEventListener('click',(e)=>{e.stopPropagation();})
    card.addEventListener('keydown',(e)=>{e.stopPropagation();})
    return card;
}

function openingMessageCard(renderer){
    const card = document.createElement('div');
    card.classList.add('read');

    const readMessage = document.createElement('textarea');
    readMessage.classList.add('textBox')
    readMessage.readOnly=true;

    const deleteCard = document.createElement('button');
    card.id = 'message';
    readMessage.value = openingMessage();
    card.append(readMessage);
    card.append(deleteCard);
    
    deleteCard.innerText = 'Back';
    deleteCard.classList.add('back');
    
    deleteCard.addEventListener('click', (e)=>{
        const card = document.getElementById('message');
        card.remove();
        requestPointerLock(renderer);
    })

    card.style.backgroundImage = `url(${bkg})`;
    readMessage.style.width = '350px';
    readMessage.style.textAlign = 'left';
    card.addEventListener('click',(e)=>{e.stopPropagation();})
    card.addEventListener('keydown',(e)=>{e.stopPropagation();})
    return card;
}

export {readMessageCard, newMessageCard, openingMessageCard}

const requestPointerLock = function(renderer){
    renderer.domElement.requestPointerLock();
}