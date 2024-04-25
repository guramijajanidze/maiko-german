const questions = [
    {
        question: "Was möchte Tanja kaufen?",
        answers: [
            { text: "eine Tasche", correct: false},
            { text: "eine Jacke", correct: false},
            { text: "einen Pullover", correct: true},
            { text: "nichts", correct: false},
        ]
    },
    {
        question: "Wo geht sie einkaufen?",
        answers: [
            { text: "in ein Modegeschäft", correct: true},
            { text: "in ein Supermarkt", correct: false},
            { text: "in ein Einkaufszentrum", correct: false},
            { text: "sie kauft Online ein", correct: false},
        ]
    },
    {
        question: "Was nimmt Mohammed?",
        answers: [
            { text: "die Tasche", correct: false},
            { text: "ein Korb", correct: true},
            { text: "nichts", correct: false},
            { text: "alles", correct: false},
        ]
    },
    {
        question: "Was findet Tanja den Pullover?",
        answers: [
            { text: "Sie findet den Pullover sehr schön", correct: true},
            { text: "Sie findet den Pullover sehr gemütlich", correct: false},
            { text: "Sie findet den Pullover sehr groß", correct: false},
            { text: "Sie findet den Pullover sehr häslich", correct: false},
        ]
    },
    {
        question: "Was hat sie verloren??",
        answers: [
            { text: "die Jacke", correct: true},
            { text: "das Apfel", correct: false},
            { text: "die Tasche", correct: false},
            { text: "den Pullover", correct: false},
        ]
    },
    {
        question: "Wer hat Tanjas Jacke in der Hand?",
        answers: [
            { text: "Tanja", correct: false},
            { text: "niemand", correct: false},
            { text: "Eine Frau an der Kasse", correct: true},
            { text: "Ein Mann an der Kasse", correct: false},
        ]
    },
    {
        question: "Wo hat die Frau die Jacke gefunden?",
        answers: [
            { text: "an der Kasse", correct: false},
            { text: "in derUmkleidekabine", correct: true},
            { text: "Sie hat die Jacke gefunden nicht", correct: false},
            { text: "Sie weiß nicht", correct: false},
        ]
    },
    {
        question: "Wohin geht Tanja am ende?",
        answers: [
            { text: "zu Hause", correct: true},
            { text: "ins Kino", correct: false},
            { text: "zu einem anderen Geschäft", correct: false},
            { text: "Sie bleibt dort", correct: false},
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