import bkg from '../styles/burnt-parchment.jpg';

function newMessageCard(submitCard){
    const card = document.createElement('div');
    const inputMessage = document.createElement('textarea');
    const sendMessage = document.createElement('button');
        card.id = 'message';
        card.innerText = 'Message: ';
    card.append(inputMessage);
    card.append(sendMessage);
    
    sendMessage.addEventListener('click', (e)=>{submitCard(e, inputMessage.value)})

    card.style.backgroundImage = `url(${bkg})`;
    card.addEventListener('click',(e)=>{e.stopPropagation();})
    card.addEventListener('keydown',(e)=>{e.stopPropagation();})
    return card;
}

function readMessageCard(msg){
    const card = document.createElement('div');
    card.classList.add('read');
    const readMessage = document.createElement('div');
    readMessage.classList.add('textBox')
    const deleteCard = document.createElement('button');
        card.id = 'message';
        readMessage.innerText = msg;
    card.append(readMessage);
    card.append(deleteCard);
    
    
    deleteCard.addEventListener('click', (e)=>{
        const card = document.getElementById('message');
        card.remove();
    })

    card.style.backgroundImage = `url(${bkg})`;
    card.addEventListener('click',(e)=>{e.stopPropagation();})
    card.addEventListener('keydown',(e)=>{e.stopPropagation();})
    return card;
}

export {readMessageCard, newMessageCard}