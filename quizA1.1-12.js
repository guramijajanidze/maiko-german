const questions = [
    {
        question: "Was ist passiert heute?",
        answers: [
            { text: "Es ist Annas Geburtstag", correct: true},
            { text: "Es ist Weihnachten", correct: false},
            { text: "Es ist Ostern", correct: false},
            { text: "Es ist ein gewöhnlicher Tag", correct: false},
        ]
    },
    {
        question: "Was will Anna essen?",
        answers: [
            { text: "alles!", correct: false},
            { text: "Spaghetti und Salat", correct: false},
            { text: "Sie weiß noch nicht", correct: true},
            { text: "Nichts, sie will nur etwas trinken", correct: false},
        ]
    },
    {
        question: "Was empfiehlt Fridolin?",
        answers: [
            { text: "Spaghetti", correct: false},
            { text: "die Suppen", correct: true},
            { text: "beide", correct: false},
            { text: "Nichts", correct: false},
        ]
    },
    {
        question: "Was bestellt Fridolin?",
        answers: [
            { text: "Kartoffelsuppe", correct: true},
            { text: "Käse", correct: false},
            { text: "eine Pizza", correct: false},
            { text: "das Bier!!!", correct: false},
        ]
    },
    {
        question: "Was bestellt Mathilde?",
        answers: [
            { text: "auch eine Kartoffelsuppe", correct: false},
            { text: "eine Tomatensuppe", correct: true},
            { text: "die Gürke", correct: false},
            { text: "nur Brot", correct: false},
        ]
    },
    {
        question: "Was empfiehlt Mathilde?",
        answers: [
            { text: "nur Spaghetti", correct: false},
            { text: "die Spaghetti mit Tomatensoße", correct: true},
            { text: "Salat", correct: false},
            { text: "Bier, nur Bier!", correct: false},
        ]
    },
    {
        question: "Was isst Anna jeden Tag zu Hause?",
        answers: [
            { text: "Spaghetti", correct: true},
            { text: "Suppe", correct: false},
            { text: "Käse", correct: false},
            { text: "Brot", correct: false},
        ]
    },
    {
        question: "Wann kommt der Kellner zurück?",
        answers: [
            { text: "nach 15 minuten", correct: true},
            { text: "nach eine Stunde", correct: false},
            { text: "sehr spät", correct: true},
            { text: "Sie kommt nicht zurück", correct: false},
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