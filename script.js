<!--Таймер-->
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

<!--Основные функции теста-->
let questionIndex = 0;
const questions = document.querySelectorAll('.question');
const progressNumbers = document.querySelectorAll('.number');
let trueAnswers = 0;
let falseAnswers = 0;
const passExam = document.getElementById('passExam');
const failExam = document.getElementById('failExam');

questions[questionIndex].classList.add('active');
progressNumbers[questionIndex].classList.add('active');

document.querySelectorAll('.question button').forEach(button => {
    button.addEventListener('click', () => {
        const correct = button.getAttribute('data-correct') === 'true';

        if(correct){
            trueAnswers++;
        }else{
            falseAnswers++;
            if (falseAnswers>2){
                failExam.classList.add('active');
                clearInterval(timer);
            }
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
            passExam.classList.add('active');
            clearInterval(timer);
        }
    });
});

<!--Рестарт теста-->

function restartTest(){
    time=1200;

    questions.forEach(q=>q.classList.remove('active'));
    questions[0].classList.add('active');

    progressNumbers.forEach(num=>{
        num.classList.remove('active','completed');
    });
    progressNumbers[0].classList.add('active');

    questionIndex=0;
    trueAnswers=0;
    falseAnswers=0;

    passExam.classList.remove('active');
    failExam.classList.remove('active');

    clearInterval(timer);
    timer = setInterval(UpdateTimer,1000);
}
document.querySelectorAll('.restart').forEach(but=>{
    but.addEventListener('click',restartTest);

});