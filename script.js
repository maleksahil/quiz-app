const questions = [
    {
        question: "which dc superhero is most famous",
        answers: [
            { text: "superman", correct: false},
            { text: "Batman", correct: true},
            { text: "wonderwoman", correct: false},
            { text: "flash", correct: false},
        ]
    },
    {
        question: "who is most intelligent character in DC",
        answers: [
            { text: "Batman", correct: true},
            { text: "lex luthor", correct: false},
            { text: "Mr. Terrific", correct: false},
            { text: "jocker", correct: false},
        ]
    },
    {
        question: "who is the villan of batman?",
        answers: [
            { text: "bain", correct: true},
            { text: "doomsday", correct: false},
            { text: "cheetah", correct: false},
            { text: "zoom", correct: false},
        ]
    },
    {
        question: "who is the most dangerous man in DC?",
        answers: [
            { text: "lex luthor", correct: false},
            { text: "superman", correct: false},
            { text: "jocker", correct: false},
            { text: "Batman", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function starquiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resateState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resateState(){
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
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resateState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
}

function handelNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handelNextButton();
    }else{
        starquiz();
    }
})

starquiz();