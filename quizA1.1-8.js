const questions = [
    {
        question: "Wen will Mona treffen?",
        answers: [
            { text: "inren Mann", correct: false},
            { text: "inre Freundin", correct: true},
            { text: "inren Freund", correct: false},
            { text: "ihren Opa", correct: false},
        ]
    },
    {
        question: "Wie ist das Wetter?",
        answers: [
            { text: "schlecht", correct: false},
            { text: "sehr schlecht", correct: false},
            { text: "schön, die Sonne scheint", correct: true},
            { text: "kein Info!", correct: false},
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
        question: "Wie heißt Monas Freundin?",
        answers: [
            { text: "Emira", correct: false},
            { text: "Mona", correct: false},
            { text: "Amira", correct: true},
            { text: "Amiran!", correct: false},
        ]
    },
    {
        question: "Wie fährt Mona?",
        answers: [
            { text: "sehr schnell", correct: false},
            { text: "langweillig", correct: false},
            { text: "langsam", correct: true},
            { text: "sehr langsam", correct: false},
        ]
    },
    {
        question: "Wo gehen Mona und ihre Freundin?",
        answers: [
            { text: "in ein Cafe.", correct: true},
            { text: "in eine Kneipe", correct: false},
            { text: "ins Kino", correct: false},
            { text: "nach Hause", correct: false},
        ]
    },
    {
        question: "Wie ist die Polizistin?",
        answers: [
            { text: "sehr aggressiv.", correct: false},
            { text: "sehr hübsch", correct: false},
            { text: "sehr nett", correct: true},
            { text: "schlecht", correct: false},
        ]
    },
    {
        question: "Was ist passiert am ende?",
        answers: [
            { text: "Die Polizistin hat Monas Fahhrad gefunden", correct: true},
            { text: "Wie schade, aber Monas Fahhrad ist nicht gefunden", correct: false},
            { text: "Die Polizistin behält Fahrrad für sich", correct: true},
            { text: "Wir wissen noch nicht", correct: false},
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