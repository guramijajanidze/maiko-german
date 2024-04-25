const questions = [
    {
        question: "Woher kommt Emma?",
        answers: [
            { text: "Berlin", correct: false},
            { text: "Tbilisi", correct: false},
            { text: "Hamburg", correct: true},
            { text: "Ich habe keine Ahnung!", correct: false},
        ]
    },
    {
        question: "Wie viele Jahre hat Emma in Hamburg gelebt?",
        answers: [
            { text: "zehn", correct: false},
            { text: "drei", correct: false},
            { text: "zwanzig", correct: true},
            { text: "Sie hat dort nie gelebt", correct: false},
        ]
    },
    {
        question: "Wie ist Emmas Haus?",
        answers: [
            { text: "klein und chaotisch", correct: false},
            { text: "groß und schön", correct: true},
            { text: "groß und häslich", correct: false},
            { text: "klein und gemütlich", correct: false},
        ]
    },
    {
        question: "Was sind in dem Auto?",
        answers: [
            { text: "ganz allles!", correct: false},
            { text: "nur Kleidung und Teller", correct: false},
            { text: "Bücher, Kleidung, Teller, Tassen und noch mehr", correct: true},
            { text: "nur ein Buch und die Tasche", correct: false},
        ]
    },
    {
        question: "Wie sind Bücher?",
        answers: [
            { text: "klein und schwer", correct: false},
            { text: "schwer", correct: true},
            { text: "leicht", correct: false},
            { text: "leicht und groß", correct: false},
        ]
    },
    {
        question: "Wie ist Emma?",
        answers: [
            { text: "klein aber mutig", correct: false},
            { text: "stark", correct: true},
            { text: "schwach", correct: false},
            { text: "klug und stark", correct: false},
        ]
    },
    {
        question: "Was braucht Emma?",
        answers: [
            { text: "Sie braucht eine Pause, weil sie sehr müde ist", correct: false},
            { text: "Sie braucht Schokolade!", correct: false},
            { text: "Sie braucht eine Pause, weil sie ein bisschen müde ist", correct: true},
            { text: "Sie braucht Tee", correct: false},
        ]
    },
    {
        question: "Was ist passiert am ende?",
        answers: [
            { text: "Nichts, alles ist in ordnung!", correct: false},
            { text: "Emma ist gegangen", correct: false},
            { text: "Emma hört etwas von unten aus dem Keller.", correct: true},
            { text: "Emma geht spazieren", correct: false},
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