const questions = [
    {
        question: "Was will Timo Heute abend machen?",
        answers: [
            { text: "in die Bar gehen", correct: false},
            { text: "eine Party machen", correct: true},
            { text: "ins Kino gehen", correct: false},
            { text: "ausruhen", correct: false},
        ]
    },
    {
        question: "Wer hat Timo eingeladen?",
        answers: [
            { text: "seine Oma", correct: false},
            { text: "alle seine Freunde", correct: true},
            { text: "seine Ehefrau", correct: false},
            { text: "niemand!", correct: false},
        ]
    },
    {
        question: "Wie geht Timo zu einem Supermarkt?",
        answers: [
            { text: "mit dem Bus", correct: false},
            { text: "mit seinem Auto", correct: true},
            { text: "zu Fuß", correct: false},
            { text: "Er bleibt zu Hause", correct: false},
        ]
    },
    {
        question: "Was kommt in den Kühlscrhank?",
        answers: [
            { text: "Limonade", correct: true},
            { text: "Pizza", correct: false},
            { text: "Borjomi", correct: false},
            { text: "Bier, sehr viel Bier!", correct: false},
        ]
    },
    {
        question: "Timos Freunde sind gekommen. Was ist schon fertig?",
        answers: [
            { text: "Pizza", correct: true},
            { text: "Khinkali", correct: false},
            { text: "Döner", correct: false},
            { text: "Pasta", correct: false},
        ]
    },
    {
        question: "Wie fühlt Timo am endeWie fühlt sich Timo am Ende?",
        answers: [
            { text: "Timo freut sich.", correct: true},
            { text: "Timo ist ein bisschen traurig", correct: false},
            { text: "Timo ist müde", correct: false},
            { text: "Timo will schlafen!", correct: false},
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