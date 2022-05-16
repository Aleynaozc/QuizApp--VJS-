let QUESTIONS = [];
let activeQuestionIndex = 0,
    questionsCount = 0,
    selectedAnswer,
    interval = 0,
    time,
    counter,
    timeValue = 20,
    totalCorrectChoise = 0;
const modal = document.querySelector(".quiz__modal");
const closePage = document.getElementById('closePage')
const timeCount = document.querySelector('.timer');

const getQuestions = () => {
    fetch("./questions.json")
        .then((res) => {
            return res.json();
        })
        .then((questions) => {
            QUESTIONS = questions;
            questionsCount = QUESTIONS.length;
        });

};


const updateQuizOrder = () => {

    let quizOrderEl = document.querySelector("#quizOrder");
    quizOrderEl.innerHTML = 'Question ' + parseInt(activeQuestionIndex +1) +' of ' + questionsCount;

    if (activeQuestionIndex == questionsCount - 1) {
        document.querySelector('.next__title').innerHTML = 'COMPLETE'
    }
    updateQuestion();

};

const createQuestionAnswer = (activeQuestion) => {
    let questionAnswerHTML = "";
    activeQuestion.answers.forEach(answer => {
        questionAnswerHTML +=
            `<div class="answer__button"  id="answerButton" data-id="${answer.id}" onclick="selectChoice(this)">
        <p class="question__answer "> ${answer.text}</p>
        </div>`;
    });
    return questionAnswerHTML;
};

const updateQuestion = () => {
    const activeQuestion = QUESTIONS[activeQuestionIndex];
    let questionHTML = ` <div class="questions__area">
    <p class="questions-title"> ${activeQuestion.text} </p>
    </div>
    <div class="answer__area__container">
           ${createQuestionAnswer(activeQuestion)}
    </div>
    `;
    const questionContainerEl = document.querySelector('#questionContainer')
    questionContainerEl.innerHTML = questionHTML;
}
//Select Button
const selectChoice = (el) => {

    const questionAnswerEls = Array.from(
        document.querySelectorAll(".answer__button")
    );
    questionAnswerEls.find((el) => {
        if (el.classList.contains("answer__color__change"))
            el.classList.remove("answer__color__change");

    });

    selectedAnswer = el.dataset.id;
    el.classList.add("answer__color__change")

};

const checkAnswer = () => {
    const selectedAnswerObj = QUESTIONS[activeQuestionIndex].answers.find(
        (a) => a.id == selectedAnswer
    );
    if (selectedAnswerObj.isCorrect)
        totalCorrectChoise++;
}


const nextQuestion = () => {
    if (selectedAnswer) {
        checkAnswer();
        if (activeQuestionIndex < questionsCount - 1) {
            clearInterval(counter);
            startTimer(timeValue);
            activeQuestionIndex++;
            updateQuizOrder();
        } else { // OPEN CONGRAT MODAL IF U'RE DONE successfully
            clearInterval(counter);
            if (totalCorrectChoise == questionsCount) {
                let modalHTML = ` <img class="modal-gif"src="assets/images/congratulations-congrats.gif">
        `
        ;
                modal.innerHTML = modalHTML;
                modal.classList.add("show");
                setTimeout(closeModal, 7000)
               
            } else { //OPEN REPEAT MODAL
                let modalHTML = ` <div class="repat__modal">
            <button class="repat-button" onclick="repatQuiz()">Repat Again</button>
        </div>
        `;
                modal.innerHTML = modalHTML;
                modal.classList.add("show");
            }

        }

    }

}
//Close congrats modal
const closeModal = () => {
if (totalCorrectChoise == questionsCount) {
    window.location.href = "http://127.0.0.1:5500/mainpage.html";
    modal.classList.remove("show");
    } 
    
}


//Close Question Page/Return Main PAge
const closeQuestionPage = () => {
    window.location.href = "http://127.0.0.1:5500/mainpage.html";
}
closePage.addEventListener('click', closeQuestionPage);



//COUNTDOWN COUNTER
function startTimer(time) {
    counter = setInterval(timer, 1000)
    function timer() {
        timeCount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if (time < 0) {
            clearInterval(counter);
            document.querySelector('.timer').innerHTML = 'DONE'
        
        }
    }
}
window.onload = function () {
    startTimer(timeValue);
}


//Close repeat Modal
const closeRepeatModal = () => {
    modal.classList.remove("show");
}

const repatQuiz = () => {
    activeQuestionIndex = 0,
    selectedAnswer = undefined;
    totalCorrectChoise = 0;
    timeValue = 20;
    updateQuizOrder();
    closeRepeatModal();
    clearInterval(counter);
    startTimer(timeValue);
}




getQuestions();
setTimeout(() => {
    updateQuizOrder();

}, 100);

