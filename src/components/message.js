export default function messageCard(submitCard){
    const card = document.createElement('div');
    const inputMessage = document.createElement('textarea');
    const sendMessage = document.createElement('button');
        card.id = 'message';
        card.innerText = 'Message: ';
    card.append(inputMessage);
    card.append(sendMessage);
    
    sendMessage.addEventListener('click', (e)=>{submitCard(e, inputMessage.value)})

    card.addEventListener('click',(e)=>{e.stopPropagation();})
    card.addEventListener('keydown',(e)=>{e.stopPropagation();})
    return card;
}