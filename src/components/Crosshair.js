export default function xhair(){
    try{
        let xhair = document.getElementById('Crosshair');
        xhair.remove();
    }
    catch{}
    const crosshair = document.createElement('div');
    crosshair.id = 'Crosshair';

    let h = window.innerHeight;
    let w = window.innerWidth;

    crosshair.style.top = `${h/2}px`;
    crosshair.style.left = `${w/2}px`;

    document.body.append(crosshair);
}