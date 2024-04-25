const questions = [
    {
        question: "Mit wem geht Laura ins Kino?",
        answers: [
            { text: "mit ihrem Bruder", correct: false},
            { text: "mit ihrer Oma", correct: false},
            { text: "mit ihrem Freund Killian", correct: true},
            { text: "allein!", correct: false},
        ]
    },
    {
        question: "Was kauft Laura?",
        answers: [
            { text: "Bier!", correct: false},
            { text: "Sie kauft Platz Nummer 11", correct: true},
            { text: "nichts", correct: false},
            { text: "Sie kauft nichts, sie hat kein Geld!", correct: false},
        ]
    },
    {
        question: "Wie ist das Kino?",
        answers: [
            { text: "klein und chaotisch", correct: false},
            { text: "nicht groß", correct: true},
            { text: "groß und häslich", correct: false},
            { text: "klein und gemütlich", correct: false},
        ]
    },
    {
        question: "Was suchen Laura und ihr Freund?",
        answers: [
            { text: "nichts, sie haben alles", correct: false},
            { text: "ihre Plätze", correct: false},
            { text: "die Tasche, Laura kann leider nicht ihre Tasche finden", correct: false},
            { text: "ein Auto", correct: true},
        ]
    },
    {
        question: "Wer sind ins Kino?",
        answers: [
            { text: "nur Laura und ihr Freund", correct: true},
            { text: "viele Leute", correct: false},
            { text: "niemand", correct: false},
            { text: "Laura, ihr Freunde und ihre Eltern", correct: false},
        ]
    },
    {
        question: "Was isst Laura?",
        answers: [
            { text: "Popcorn", correct: true},
            { text: "nichts, sie trinkt Bier!", correct: false},
            { text: "Brot", correct: false},
            { text: "Döner!", correct: false},
        ]
    },
    {
        question: "Wie ist das Film?",
        answers: [
            { text: "sehr interessant", correct: false},
            { text: "nicht so interessant", correct: false},
            { text: "super", correct: false},
            { text: "nah, langweilig", correct: true},
        ]
    },
    {
        question: "Wie lange bleiben Laura und ihr Freund ins Kino?",
        answers: [
            { text: "den ganzen Tag", correct: false},
            { text: "zwei Stunden", correct: false},
            { text: "nur 30 Minuten", correct: true},
            { text: "45 minuten", correct: false},
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