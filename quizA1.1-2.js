const questions = [
    {
        question: "Wo steht Sandra?",
        answers: [
            { text: "an der Haltestelle Kirche", correct: true},
            { text: "in der nähe von Bahnhof", correct: false},
            { text: "im Haus", correct: false},
            { text: "auf der Straße!", correct: false},
        ]
    },
    {
        question: "Wann kommt der Bus?",
        answers: [
            { text: "nach zehn minuten", correct: false},
            { text: "bald", correct: false},
            { text: "er kommt nicht", correct: false},
            { text: "nach fünf minuten", correct: true},
        ]
    },
    {
        question: "Wer öffnet die Tür?",
        answers: [
            { text: "ein Mann", correct: false},
            { text: "der Busfahrer", correct: true},
            { text: "eine Frau", correct: false},
            { text: "Laura", correct: false},
        ]
    },
    {
        question: "Was will Sandra kaufen?",
        answers: [
            { text: "Apfel!", correct: false},
            { text: "eine Fahrkarte", correct: true},
            { text: "ein Auto", correct: false},
            { text: "zwei Autos", correct: false},
        ]
    },
    {
        question: "Warum kann Sandra nicht sitzen?",
        answers: [
            { text: "weil der Bus voll ist", correct: true},
            { text: "weil sie keine Fahrkarte hat", correct: false},
            { text: "weil sie sehr müde ist", correct: false},
            { text: "weil sie das nicht darf", correct: false},
        ]
    },
    {
        question: "Wer steht links neben Sandra?",
        answers: [
            { text: "ein Mann", correct: true},
            { text: "ihr Ehemann", correct: false},
            { text: "ihr Bruder", correct: false},
            { text: "eine Frau", correct: false},
        ]
    },
    {
        question: "Wie oft hält der Bus?",
        answers: [
            { text: "sehr oft", correct: false},
            { text: "immer", correct: false},
            { text: "oft", correct: true},
            { text: "nie", correct: false},
        ]
    },
    {
        question: "Wo hält der Bus?",
        answers: [
            { text: "im Bahnhof", correct: false},
            { text: "an der Haltestelle Marktplatz", correct: true},
            { text: "in der Nähe ihres Hauses", correct: false},
            { text: "der Bus hält nicht", correct: false},
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