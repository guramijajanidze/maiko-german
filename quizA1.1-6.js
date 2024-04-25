const questions = [
    {
        question: "Wohin geht Talia heute?",
        answers: [
            { text: "in die Uni", correct: true},
            { text: "nach Hause", correct: false},
            { text: "ins Kino", correct: false},
            { text: "in die Schule", correct: false},
        ]
    },
    {
        question: "Was trägt Thalia heute?",
        answers: [
            { text: "ein T-Shirt von Silbermond", correct: true},
            { text: "eine Jacke", correct: false},
            { text: "ein Pullover", correct: false},
            { text: "ein Kleid", correct: false},
        ]
    },
    {
        question: "Wer sitzen in dem Bus?",
        answers: [
            { text: "viele Studenten", correct: true},
            { text: "Thalias Nachbarn", correct: false},
            { text: "Thalias Verwandte", correct: false},
            { text: "nur Thalia", correct: false},
        ]
    },
    {
        question: "Wann beginnt das Seminar?",
        answers: [
            { text: "um 10:15", correct: true},
            { text: "um 10:13", correct: false},
            { text: "Heute gibt es kein Seminar", correct: false},
            { text: "sehr bald!", correct: true},
        ]
    },
    {
        question: "Was ist los mit dem Handy?",
        answers: [
            { text: "Handyfällt nach unten, aber es ist nicht kaputt", correct: true},
            { text: "Handyfällt nach unten und es ist kaputt", correct: false},
            { text: "Thalia hat es verloren", correct: false},
            { text: "Nichts, alles in ordnung", correct: false},
        ]
    },
    {
        question: "Wie viele Freunde hat Thalia in der Uni?",
        answers: [
            { text: "keine", correct: true},
            { text: "viele", correct: false},
            { text: "nur eine", correct: false},
            { text: "drei", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

    /*function adjective () {
        if (score === 8) {
            console.log("Du bist super!")
        }  else if (score > 5) {
            console.log("Das ist auch Okay...") 
        } else {
            console.log("Du bist Bandzi!")
        }
    }*/


function showScore(){
    resetState();
    questionElement.innerHTML = `Dein Ergebnis ist ${score} / ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();