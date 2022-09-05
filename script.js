const startButton = document.getElementById("start-btn");
const questionContainerElement = document.getElementById("question-container");





startButton.addEventListener("click", startgame);

function startgame() {
    console.log("Started Game");
    startButton.classList.add("hide");
    questionContainerElement.classList.remove("hide");
}

function nextQuestion () {

}

function selectAnswer () {

}