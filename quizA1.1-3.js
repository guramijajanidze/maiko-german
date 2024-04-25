const questions = [
    {
        question: "Wie alt ist Lukas?",
        answers: [
            { text: "er ist 25 Jahre alt", correct: false},
            { text: "er ist 18 Jahre alt", correct: false},
            { text: "er ist 22 Jahre alt", correct: true},
            { text: "wir wissen das nicht!", correct: false},
        ]
    },
    {
        question: "Wo ist Lukas im Moment??",
        answers: [
            { text: "er ist in Berlin", correct: false},
            { text: "er ist in München", correct: true},
            { text: "er ist in Tbilisi", correct: false},
            { text: "er ist in Deutschland", correct: true},
        ]
    },
    {
        question: "Wie und Wohin fährt Lukas?",
        answers: [
            { text: "Er fährt nach Deutschland mit Bus", correct: false},
            { text: "Er fährt nach Italien mit Bus", correct: false},
            { text: "Er fährt nach Italien mit seinem Auto", correct: true},
            { text: "Er fährt nach Deutschland mit seinem Auto", correct: false},
        ]
    },
    {
        question: "Was hat Lukas?",
        answers: [
            { text: "Er hat eine Tasche!", correct: true},
            { text: "Er hat nichts", correct: false},
            { text: "Er hat Rucksack", correct: false},
            { text: "Er hat viel Gepäck", correct: false},
        ]
    },
    {
        question: "Wie ist das Wetter?",
        answers: [
            { text: "Es regnet", correct: false},
            { text: "Die Sonne scheint", correct: true},
            { text: "Wir haben kein Info über das Wetter", correct: false},
            { text: "Es ist kalt", correct: false},
        ]
    },
    {
        question: "Wer steht links neben Sandra?",
        answers: [
            { text: "ein Mann", correct: true},
            { text: "ihr Ehemann", correct: false},
            { text: "ihr Bruder", correct: false},
            { text: "eine Frau", correct: false},
        ]
    },
    {
        question: "Wie ist die Natur in Bayern?",
        answers: [
            { text: "sehr schön", correct: true},
            { text: "häslich", correct: false},
            { text: "nicht so gut", correct: false},
            { text: "es gibt keine Natur in Bayern!", correct: false},
        ]
    },
    {
        question: "Was denkt Lukas am ende?",
        answers: [
            { text: "Er denkt, dass Blumen in der Schweiz schön sind", correct: false},
            { text: "Er denkt, dass Bäume und Blumen in Deutschland schön sind", correct: true},
            { text: "Er denkt, dass Blumen in Italien schön sind", correct: false},
            { text: "Er denkt nichts, er schläft", correct: false},
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