let time= 1200;
const Timer = document.getElementById('timer');
const timer = setInterval(UpdateTimer,1000);
function UpdateTimer(){
    const minutes = Math.floor(time/60);
    let seconds = time%60;
    Timer.textContent= `${minutes}:${seconds}`;

    if (time === 0){
        clearInterval(timer);
        alert('Время вышло');
    }else{
        time--;
    }
}
