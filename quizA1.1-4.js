const questions = [
    {
        question: "Was ist richtig?",
        answers: [
            { text: "Mohammed hat zu viel Essen", correct: false},
            { text: "Mohammed hat Hunger", correct: false},
            { text: "Mohammed hat kein Essen zu Hause", correct: true},
            { text: "Mohammed hat Durst", correct: false},
        ]
    },
    {
        question: "Also, was muss Mohammed machen?",
        answers: [
            { text: "Er muss schlafen", correct: false},
            { text: "Er muss etwas essen", correct: false},
            { text: "Er muss saufen!", correct: false},
            { text: "Er muss einkaufen gehen", correct: true},
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
        question: "Was findet Mohammed zuerst??",
        answers: [
            { text: "die Eier", correct: true},
            { text: "das Apfel", correct: false},
            { text: "die Orangesaft", correct: false},
            { text: "die Gurke", correct: false},
        ]
    },
    {
        question: "Was kann Mohammed nicht finden?",
        answers: [
            { text: "die Milch", correct: true},
            { text: "das Apfel", correct: false},
            { text: "die Eier", correct: false},
            { text: "die Tasche", correct: false},
        ]
    },
    {
        question: "Warum ist Mohammed traurig?",
        answers: [
            { text: "weil er keine Milch finden kann", correct: true},
            { text: "weil er krank ist", correct: false},
            { text: "weil er müde ist", correct: false},
            { text: "Er ist nicht traurig, er ist glucklick!", correct: false},
        ]
    },
    {
        question: "Wie viel kostet alles zusammen?",
        answers: [
            { text: "nichts, es ist frei!", correct: false},
            { text: "siebzehn Euro", correct: false},
            { text: "sieben Euro", correct: true},
            { text: "siebzig Euro", correct: false},
        ]
    },
    {
        question: "Was sagt Mohammed am ende?",
        answers: [
            { text: "Einen schönen Tag noch", correct: true},
            { text: "Tschüss", correct: false},
            { text: "Auf wiedersehen!", correct: false},
            { text: "Bis Morgen!", correct: false},
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