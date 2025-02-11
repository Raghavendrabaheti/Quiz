const startButton = document.getElementById("start-btn");
const difficultyContainer = document.getElementById("difficulty-container");
const questionContainer = document.getElementById("question-container");
const answerButtons = document.getElementById("answer-btn");
const nextButton = document.getElementById("next-btn");
const finalScoreContainer = document.getElementById("final-score-container");
const finalScoreText = document.getElementById("final-score-text");
const scoreDisplay = document.getElementById("right-answer");
const restartButton = document.getElementById("restart-btn");

let shuffledQuestions, currentQuestionIndex, score = 0;
let questionsByDifficulty = {};

// Load questions from JSON file
fetch("question.json")
    .then(response => response.json())
    .then(data => {
        questionsByDifficulty = data;
    })
    .catch(error => console.error("Error loading questions:", error));

startButton.addEventListener("click", () => {
    startButton.classList.add("hide");
    difficultyContainer.classList.remove("hide");
});

document.getElementById("easy-btn").addEventListener("click", () => startGame("easy"));
document.getElementById("medium-btn").addEventListener("click", () => startGame("medium"));
document.getElementById("hard-btn").addEventListener("click", () => startGame("hard"));

function startGame(difficulty) {
    difficultyContainer.classList.add("hide");
    questionContainer.classList.remove("hide");
    nextButton.classList.add("hide"); // Hide Next button at the start

    let allQuestions = questionsByDifficulty[difficulty] || [];
    if (allQuestions.length < 10) {
        console.error("Not enough questions available!");
        return;
    }
    
    shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5).slice(0, 10);
    currentQuestionIndex = 0;
    score = 0;
    scoreDisplay.innerText = `Score: ${score}`;
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}
function showQuestion(questionObj) {
    clearMessage(); // Remove previous feedback message

    document.getElementById("question").innerText = questionObj.question;
    answerButtons.innerHTML = "";
    nextButton.classList.add("hide"); // Hide Next button until answer is selected

    questionObj.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(button, answer.correct));
        answerButtons.appendChild(button);
    });
}

function selectAnswer(button, correct) {
    clearMessage();

    if (correct) {
        button.classList.add("correct");
        score++;
        scoreDisplay.innerText = `Score: ${score}`;
        showMessage("Correct answer!", "green");
    } else {
        button.classList.add("wrong");
        showMessage("Wrong answer!", "red");
    }

    // Disable all buttons and show correct answer
    Array.from(answerButtons.children).forEach(btn => {
        btn.disabled = true;
        if (shuffledQuestions[currentQuestionIndex].answers.find(a => a.correct).text === btn.innerText) {
            btn.classList.add("correct");
        }
    });

    // Show the Next button after answering
    nextButton.classList.remove("hide");
}

// Show correct/wrong message
function showMessage(text, color) {
    clearMessage();
    const message = document.createElement("p");
    message.innerText = text;
    message.style.color = color;
    message.style.fontSize = "1.2rem";
    message.style.marginTop = "10px";
    message.id = "feedback-message";
    questionContainer.appendChild(message);
}

// Remove old messages
function clearMessage() {
    const oldMessage = document.getElementById("feedback-message");
    if (oldMessage) {
        oldMessage.remove();
    }
}

// When "Next" button is clicked
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    } else {
        endQuiz();
    }
});
function endQuiz() {
    // Ensure question-related elements are hidden
    questionContainer.classList.add("hide");
    answerButtons.classList.add("hide");
    nextButton.classList.add("hide");

    // Show the final score container
    finalScoreContainer.classList.remove("hide");

    // Debugging: Ensure finalScoreText exists before updating
    if (finalScoreText) {
        finalScoreText.innerText = `Final Score: ${score}`;
    } else {
        console.error("finalScoreText element not found!");
    }
}

// Restart Quiz
restartButton.addEventListener("click", () => {
    finalScoreContainer.classList.add("hide");
    startButton.classList.remove("hide");
});