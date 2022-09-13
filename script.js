const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const openingIntro = document.getElementById("instructions");
const displayHighScore = document.getElementById("player-score");
const timer = document.getElementById("countdown");
const startingMinutes = 8;
const timeScore = document.getElementById("timeScore");
const saveInitialsButton = document.getElementById("save-initials-btn");
const highscoreContainer = document.getElementById("highscore-container");
const restartButton = document.getElementById("restart");
const highscore = document.getElementById("highscore");
const userInfo = document.getElementById("user-info");
var selectedChoice = "" 


var initialsBox = document.getElementById("initials-box");
let score = 0;

let time = startingMinutes * 60;
let timerInterval 
let currentQuestionIndex;


startButton.addEventListener("click", startgame);
startButton.addEventListener("click", hideIntro);
startButton.addEventListener("click", updateCountdown);

//* get timer to subtract 30 seconds when wrong answer is selected
nextButton.addEventListener("click", () => {
    for (var i = 0; i < 4; i++) {
        if (questions[currentQuestionIndex].answers[i].text === selectedChoice && questions[currentQuestionIndex].answers[i].correct === false) {
            console.log("wrong")
            time = time - 30; 
        };
    }
    currentQuestionIndex++ 
    setNextQuestion();
});

function hideIntro() {
    openingIntro.classList.add("hide");
}

//Timer stuff
function updateCountdown () {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 8 ? '0' + seconds : seconds;
    timer.innerHTML = `${minutes}:${seconds}`;
    time--;
    if (time === 0) {
        clearInterval(timerInterval);
        gameOver();
    }
}

function startgame() {
    timerInterval = setInterval(updateCountdown, 1000);
    console.log("Started Game");
    startButton.classList.add("hide");
    timer.classList.remove("hide");
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove("hide");
    setNextQuestion();
}

function setNextQuestion () {
    resetState();
    showQuestion(questions [currentQuestionIndex]);
}

function showQuestion(questionText) {
    questionElement.innerText = questionText.questionText;
    questionText.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("answer-btn");
        button.addEventListener("click",selectAnswer);
        answerButtonsElement.append(button);
    })
    if (currentQuestionIndex === 9) {
        clearInterval(timerInterval);
        gameOver();
    }
}

function resetState() {
    nextButton.classList.add("hide");
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(event) {
    console.log(event.target.innerText);
    selectedChoice = event.target.innerText;
    nextButton.classList.remove("hide"); 
    }


function gameOver () {
    console.log ("GG");
    questionContainerElement.classList.add("hide");
    enterHighscore();
}


function enterHighscore() {
    displayHighScore.classList.remove("hide");
    timeScore.innerText = time;
}

saveInitialsButton.addEventListener("click", saveHighscore);
saveInitialsButton.addEventListener("click", showAllScores);

function saveHighscore() {
    var initialsValue = initialsBox.value;
    console.log(initialsValue);
    var userScore = time;
    var newScore = {
        userInitials: initialsValue,
        userScore: userScore,
    }
    localStorage.setItem("newScore", JSON.stringify(newScore));
}

function showAllScores () {
    displayHighScore.classList.add("hide");
    highscoreContainer.classList.remove("hide");
    timer.classList.add("hide");
    renderLastScore();
}

function renderLastScore() {
    var render = JSON.parse(localStorage.getItem("newScore"));
    console.log(render)
    if (localStorage.getItem("newScore") != null) {
        document.getElementById("user-info").innerHTML = render.userInitials + ":  " + render.userScore;
    }
}


restartButton.addEventListener("click", restartQuiz);
function restartQuiz () {
    window.location.reload();
}


const questions = [
    {
        questionText: "Inside which HTML element do we put the JavaScript?",
        answers: [
            {text: "<script>", correct: true},
            {text: "<Scripting>", correct: false},
            {text: "<javascript>", correct: false},
            {text: "<js>", correct: false},
        ]
    },
    {
        questionText: "What is the correct JavaScript syntax to change the content of the HTML element: <p id='demo'>This is a demonstration.</p>",
        answers: [
            {text: "<#demo.innerHTML = 'Hello World!'", correct: false},
            {text: "document.getelement('P').innerHTML = 'Hello World'", correct: false},
            {text: "document.getElementById('demo').innerHTML = 'Hello World'", correct: true},
            {text: "document.getElementByName('P').innerHTML = 'Hello World'", correct: false},
        ]
    },
    {
        questionText: "Where is the correct place to insert a JavaScript?",
        answers: [
            {text: "The <head> section", correct: false},
            {text: "The <p> section", correct: false},
            {text: "Both the <head> section and the <body> section", correct: true},
            {text: "The <body> section", correct: false},
        ]
    },
    {
        questionText: "What is the correct syntax for refering to an external script called 'xxx.js'?",
        answers: [
            {text: "<script href='xxx.js'> ", correct: false},
            {text: "<script src='xxx.js'> ", correct: true},
            {text: "<script name='xxx.js'>", correct: false},
            {text: "<script link='xxx.js'>", correct: false},
        ]
    },
    {
        questionText: "How do you write 'Hello World' in an alert box?",
        answers: [
            {text: "msgBox('Hello World'); ", correct: false},
            {text: "msg('Hello World');", correct: false},
            {text: "alertBox('Hello world');", correct: false},
            {text: "alert('Hello World');", correct: true},
        ]
    },
    {
        questionText: "How do you write a function in JavaScript?",
        answers: [
            {text: "function myFunction()", correct: true},
            {text: "function = myFunction()", correct: false},
            {text: "function:myFunction()", correct: false},
            {text: "Function (funciton)", correct: false},
        ]
    },
    {
        questionText: "How do you write an if statement?",
        answers: [
            {text: "if i = 5)", correct: false},
            {text: "if i == 5 then", correct: false},
            {text: "if (i==5)", correct: true},
            {text: "if i = 5 then", correct: false},
        ]
    },
    {
        questionText: "How does a FOR loop start",
        answers: [
            {text: "for (i <=5; i++)", correct: false},
            {text: "for (i = 0; i <=5; i++)", correct: true},
            {text: "for (i = 0; i <=5)", correct: false},
            {text: "for i = 1 to 5", correct: false},
        ]
    },
    {
        questionText: "How can you add a comment on JavaScript?",
        answers: [
            {text: "//This is a comment", correct: true},
            {text: "'This is a comment", correct: false},
            {text: "<!--This is a comment-->", correct: false},
            {text: "('This is a comment')", correct: false},
        ]
    },
    {
        questionText: "What is the correct way to write a JavaScript array?",
        answers: [
            {text: "var colors = (1:'red',2:'green', 3:'blue')", correct: false},
            {text: "var colros = 1 =('red'), 2 = ('green'), 3 = ('blue')", correct: false},
            {text: "var colors = 'red', 'green', 'blue'", correct: false},
            {text: "var colors = ['red', 'green', 'blue']", correct: true},
        ]
    }
]
