let time = 1200;
const Timer = document.getElementById('timer');
const timer = setInterval(UpdateTimer, 1000);

function UpdateTimer(){
    const minutes = Math.floor(time/60);
    let seconds = time%60;
    Timer.textContent = `${minutes}:${seconds}`;
    if(time === 0){
        clearInterval(timer);
        alert('Время вышло');
    }else{
        time--;
    }
}

let questionIndex = 0;
const questions = document.querySelectorAll('.question');
const progressNumbers = document.querySelectorAll('.number');

questions[questionIndex].classList.add('active');
progressNumbers[questionIndex].classList.add('active');

document.querySelectorAll('.question button').forEach(button => {
    button.addEventListener('click', () => {
        const correct = button.getAttribute('data-correct') === 'true';

        if(correct){
            alert('Правильно');
        }else{
            alert('Неправильно');
        }

        questions[questionIndex].classList.remove('active');

        for (let i = 0; i <= questionIndex; i++){
            progressNumbers[i].classList.remove('active');
            progressNumbers[i].classList.add('completed');
        }

        questionIndex++;

        if(questionIndex < questions.length) {
            questions[questionIndex].classList.add('active');
            progressNumbers[questionIndex].classList.add('active');
        }else{
            alert('Вы прошли тест');
            clearInterval(timer);
        }
    });
});