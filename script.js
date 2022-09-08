const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startgame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++ 
    setNextQuestion();
});

//This is how we start the quiz
//We hide the start button once it is clicked
//We shuffle the questions so that the order is not always the same
//We then remove the 'hide' attribute we added in the CSS so that the whole conatiner is shown 
function startgame() {
    console.log("Started Game");
    startButton.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove("hide");
    setNextQuestion();
}


//This sets the next question and resets the state of the container 
//It also shows the shuffled question
function setNextQuestion () {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}



function showQuestion(questionText) {
    questionElement.innerText = questionText.questionText;
    questionText.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("answer-btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
        answerButtonsElement.append(button);
    })
}




function resetState() {
    nextButton.classList.add("hide");
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}



function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    nextButton.classList.remove("hide"); 
    });
}


function setStatusClass(element, correct) {
    clearStatusClass(element);
    // if (correct) {
    //     element.classlist.add("correct");
    // } else {
    //     element.classList.add("wrong");
    // }
}

function clearStatusClass(element) {
    // element.classList.remove("correct");
    // element.classList.remove("wrong");
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
