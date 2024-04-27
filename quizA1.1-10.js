const questions = [
    {
        question: "Wo fahren Fatma und Sadja mit ihrer Klasse?",
        answers: [
            { text: "ans Meer", correct: true},
            { text: "ins Ausland", correct: false},
            { text: "in die Berge", correct: true},
            { text: "in die Bar", correct: false},
        ]
    },
    {
        question: "Womit fahren sie?",
        answers: [
            { text: "mit dem Auto", correct: false},
            { text: "mit dem Bus", correct: true},
            { text: "mit dem Flugzeug", correct: false},
            { text: "zu Fuß", correct: false},
        ]
    },
    {
        question: "Wie ist die Fahrt ans Meer?",
        answers: [
            { text: "sehr Lang", correct: true},
            { text: "sehr Kurz", correct: false},
            { text: "beide", correct: false},
            { text: "Es gibt keine Fahrt!", correct: false},
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
        question: "Warum Sadja mag Hotel nicht?",
        answers: [
            { text: "weil es so alt ist und die Fenster und Türen kaputt sind", correct: true},
            { text: "weil es sehr teuer ist", correct: false},
            { text: "Sadja mag das Hotel", correct: false},
            { text: "Sadja hat keine Ahnung warum sie Hotel mag nicht", correct: false},
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
        question: "Wer findet das Hotel super?",
        answers: [
            { text: "Fatma", correct: true},
            { text: "Sadja", correct: false},
            { text: "ihre Lehrerin", correct: false},
            { text: "alle", correct: false},
        ]
    },
    {
        question: "Warum sind Fatma und Sadja sehr müde?",
        answers: [
            { text: "Sie sind müde von der Reise", correct: true},
            { text: "Sie haben viel gespielt", correct: false},
            { text: "Sie haben viel gesprochen", correct: false},
            { text: "Sie sind nicht müde", correct: false},
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