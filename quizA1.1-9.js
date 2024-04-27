const questions = [
    {
        question: "Wie alt ist Lotta?",
        answers: [
            { text: "drei Jahre alt", correct: false},
            { text: "neun Jahre alt", correct: false},
            { text: "acht Jahre alt", correct: true},
            { text: "Wir wissen nicht", correct: false},
        ]
    },
    {
        question: "Warum kann sie nicht heute in die Schule gehen?",
        answers: [
            { text: "weil sie krank ist", correct: true},
            { text: "weil sie müde ist", correct: false},
            { text: "weil sie vaul ist", correct: false},
            { text: "weil die Schule ist geschlossen", correct: false},
        ]
    },
    {
        question: "Wer kommt ins Zimmer?",
        answers: [
            { text: "Lottas Mutter", correct: false},
            { text: "Lotas Vater", correct: true},
            { text: "ihr Onkel", correct: false},
            { text: "ihre Oma", correct: false},
        ]
    },
    {
        question: "Wo legt Lotas Vater eine Hand?",
        answers: [
            { text: "auf Lotas Bein", correct: false},
            { text: "auf Lotas Kopf", correct: true},
            { text: "auf Lotas Bauch", correct: false},
            { text: "auf Lotas Hand", correct: false},
        ]
    },
    {
        question: "Wo fahren Lota und ihr Vater?",
        answers: [
            { text: "in die Schule", correct: false},
            { text: "Sie bleiben zu Hause", correct: false},
            { text: "zum Arzt", correct: true},
            { text: "nirgends", correct: false},
        ]
    },
    {
        question: "Was legen auf einem Tisch?",
        answers: [
            { text: "Zeitungen", correct: true},
            { text: "Bücher", correct: false},
            { text: "Tassen", correct: false},
            { text: "Flaschen", correct: false},
        ]
    },
    {
        question: "Was mag Lotta sehr?",
        answers: [
            { text: "die Pferde", correct: true},
            { text: "die Hunde", correct: false},
            { text: "die Katzen", correct: false},
            { text: "die Mäuse", correct: false},
        ]
    },
    {
        question: "Warum ist Lottas Vater sauer?",
        answers: [
            { text: "weil zwei Stunden gehen vorbei, aber niemand kommt", correct: true},
            { text: "weil der Arzt sehr professioneller ist", correct: false},
            { text: "weil Lotta nicht mehr krank ist", correct: false},
            { text: "Das ist Falsch, er ist nicht sauer", correct: false},
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