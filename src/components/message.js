export default function messageCard(submitCard){
    const card = document.createElement('div');
    const inputMessage = document.createElement('textarea');
    const sendMessage = document.createElement('button');
        card.id = 'message';
        card.innerText = 'Message: ';
    card.append(inputMessage);
    sendMessage.addEventListener('click', (e)=>{submitCard(e)})
    card.append(sendMessage);

    return card;

}