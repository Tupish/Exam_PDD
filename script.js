<!--Таймер-->
let time = 1200;
const Timer = document.getElementById('timer');
let timer = setInterval(UpdateTimer, 1000);

function UpdateTimer() {
    const minutes = Math.floor(time/60);
    let seconds = time%60;
    Timer.textContent = `${minutes}:${seconds}`;
    if(time === 0){
        clearInterval(timer);
        finishExam(false);
    }else{
        time--;
    }
}

<!--Основные функции теста-->
let questionIndex = 0;
let trueAnswers = 0;
let falseAnswers = 0;
let extraQuestionsShown = 0;
let maxExtraQuestions = 0;
let inExtraQuestions = false;

const extraQuestions = document.querySelectorAll('.extra-question');
const questions = document.querySelectorAll('.question');
const progressNumbers = document.querySelectorAll('.progress-bar > .number:not(.extra-number)');
const extraNumbersContainer = document.querySelector('.extra-numbers-container');
const extraNumbers = document.querySelectorAll('.extra-number');
const passExam = document.getElementById('passExam');
const failExam = document.getElementById('failExam');

questions[questionIndex].classList.add('active');
progressNumbers[questionIndex].classList.add('active');

<!--Окончание экзамена: сдан или не сдан-->
function finishExam(passed) {
    clearInterval(timer);
    if (passed) {
        passExam.classList.add('active');
    } else {
        failExam.classList.add('active');
    }
}

<!--Проверка правильности ответа-->
function checkAnswer(correct){
    if(correct){
        trueAnswers++;
    }else{
        falseAnswers++;
        if (falseAnswers === 3){
            finishExam(false);
            return;
        }
    }

    if(!inExtraQuestions){
        questions[questionIndex].classList.remove('active');
        progressNumbers[questionIndex].classList.remove('active');
        progressNumbers[questionIndex].classList.add('completed');

        questionIndex++;

        if(questionIndex < questions.length){
            questions[questionIndex].classList.add('active');
            progressNumbers[questionIndex].classList.add('active');
        }else{
            checkMainQuestionsResult();
        }
    }else{
        const currentExtraIndex = extraQuestionsShown - 1;

        extraQuestions[currentExtraIndex].classList.remove('active');
        extraNumbers[currentExtraIndex].classList.remove('active');
        extraNumbers[currentExtraIndex].classList.add('completed');

        checkExtraQuestionsResult();
    }
}

<!--Проверка на надобность доп. вопросов-->
function checkMainQuestionsResult(){
    if(falseAnswers === 0){
        finishExam(true);
    }else if (falseAnswers === 1){
        maxExtraQuestions = 5;
        startExtraQuestions();
    }else if (falseAnswers === 2){
        maxExtraQuestions = 10;
        startExtraQuestions();
    }
}

<!--Вызов доп. вопросов-->
function startExtraQuestions(){
    inExtraQuestions = true;
    questions.forEach(q => q.classList.remove('active'));

    extraQuestions.forEach(q => q.classList.remove('active'));

    extraNumbersContainer.style.display = 'flex';

    extraNumbers.forEach((num, index) => {
        num.style.display = index < maxExtraQuestions ? 'block' : 'none';
    });

    if(extraQuestions.length > 0){
        extraQuestions[0].classList.add('active');
        extraNumbers[0].classList.add('active');
        extraQuestionsShown = 1;
    }else{
        finishExam(false);
    }
}

<!--Проверка доп. вопросов-->
function checkExtraQuestionsResult(){
    if (extraQuestionsShown < maxExtraQuestions && extraQuestionsShown < extraQuestions.length) {
        extraQuestions[extraQuestionsShown].classList.add('active');
        extraNumbers[extraQuestionsShown].classList.add('active');

        extraQuestionsShown++;
    }else{
        finishExam(falseAnswers <= 2);
    }
}

document.querySelectorAll('.question button, .extra-question button').forEach(button => {
    button.addEventListener('click', () => {
        const correct = button.getAttribute('data-correct') === 'true';
        checkAnswer(correct);
    });
});

<!--Рестарт теста-->
function restartTest(){
    time = 1200;

    questions.forEach(q => q.classList.remove('active'));
    questions[0].classList.add('active');
    extraQuestions.forEach(q => q.classList.remove('active'));

    progressNumbers.forEach(num => {
        num.classList.remove('active', 'completed');
    });
    progressNumbers[0].classList.add('active');

    extraNumbersContainer.style.display = 'none';
    extraNumbers.forEach(num => {
        num.classList.remove('active', 'completed');
        num.style.display = 'none';
    });

    questionIndex = 0;
    trueAnswers = 0;
    falseAnswers = 0;
    extraQuestionsShown = 0;
    maxExtraQuestions = 0;
    inExtraQuestions = false;

    passExam.classList.remove('active');
    failExam.classList.remove('active');

    clearInterval(timer);
    timer = setInterval(UpdateTimer, 1000);
}

document.querySelectorAll('.restart').forEach(but => {
    but.addEventListener('click', restartTest);
});