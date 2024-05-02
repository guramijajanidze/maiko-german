const questions = [
    {
        question: "Wo steht Tim?",
        answers: [
            { text: "im Bahnhof am Gleis 5", correct: true},
            { text: "auf der Straße", correct: false},
            { text: "im Haus", correct: true},
            { text: "im Flughafen", correct: false},
        ]
    },
    {
        question: "Wo fliegt Tim heute?",
        answers: [
            { text: "in den Urlaub", correct: true},
            { text: "auf der Geschäftsreise", correct: false},
            { text: "keine Info", correct: false},
            { text: "nach Hause", correct: false},
        ]
    },
    {
        question: "Warum ist Tim nervös?",
        answers: [
            { text: "weil er etwas vergessen hat", correct: false},
            { text: "weil der Zug noch nicht da ist", correct: true},
            { text: "beide", correct: false},
            { text: "weil er hatweil er den Weg verloren hat", correct: false},
        ]
    },
    {
        question: "Wie ist das Hotel?",
        answers: [
            { text: "groß und alt", correct: true},
            { text: "klein und alt", correct: false},
            { text: "groß und neu", correct: false},
            { text: "klein und neu", correct: false},
        ]
    },
    {
        question: "Wie viele Personen sitzen im Zug?",
        answers: [
            { text: "viele", correct: false},
            { text: "nur drei", correct: true},
            { text: "nur Tim", correct: false},
            { text: "mehr als Zehn", correct: false},
        ]
    },
    {
        question: "Welche Platz hat Tim?",
        answers: [
            { text: "die Nummer 23", correct: true},
            { text: "die Nummer 32", correct: false},
            { text: "die Nummer 12", correct: false},
            { text: "die Nummer 13", correct: false},
        ]
    },
    {
        question: "Wann ist Tim am Flughafen?",
        answers: [
            { text: "um 8:30 Uhr", correct: true},
            { text: "um 9:30 Uhr ", correct: false},
            { text: "zu spät", correct: false},
            { text: "zu früh", correct: false},
        ]
    },
    {
        question: "Wohin gehen Männer und Frauen auf den Straßen?",
        answers: [
            { text: "nach Hause", correct: false},
            { text: "ins Kino", correct: false},
            { text: "zur Arbeit", correct: true},
            { text: "Wir wissen nicht", correct: false},
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