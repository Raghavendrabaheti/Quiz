const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonElement = document.getElementById('answer-btn');
let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
    quizScore = 0;
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonElement.firstChild) {
        answerButtonElement.removeChild(answerButtonElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    setStatusClass(document.body, correct);
    Array.from(answerButtonElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === 'true');
    });

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }

    if (correct) {
        quizScore++;
    }
    document.getElementById('right-answer').innerText = quizScore;
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'What is the time complexity of accessing an element in an array?',
        answers: [
            { text: 'O(1)', correct: true },
            { text: 'O(n)', correct: false },
            { text: 'O(log n)', correct: false },
            { text: 'O(n^2)', correct: false },
        ],
    },
    {
        question: 'What data structure would you use to implement a LIFO order?',
        answers: [
            { text: 'Queue', correct: false },
            { text: 'Linked List', correct: false },
            { text: 'Stack', correct: true },
            { text: 'Binary Tree', correct: false },
        ],
    },
    {
        question: 'Which of the following sorting algorithms has the best average-case time complexity?',
        answers: [
            { text: 'Bubble Sort', correct: false },
            { text: 'Selection Sort', correct: false },
            { text: 'Insertion Sort', correct: false },
            { text: 'Merge Sort', correct: true },
        ],
    },
    {
        question: 'What is the time complexity of binary search?',
        answers: [
            { text: 'O(1)', correct: false },
            { text: 'O(log n)', correct: true },
            { text: 'O(n)', correct: false },
            { text: 'O(n^2)', correct: false },
        ],
    },
    {
        question: 'What is a binary search tree (BST)?',
        answers: [
            { text: 'Graph', correct: false },
            { text: 'Linked List', correct: false },
            { text: 'Heap', correct: false },
            { text: 'Tree', correct: true },
        ],
    },
    {
        question: 'How do you detect a cycle in a linked list?',
        answers: [
            { text: 'Two Pointers', correct: true },
            { text: 'Queue', correct: false },
            { text: 'Stack', correct: false },
            { text: 'Hash Table', correct: false },
        ],
    },
    {
        question: 'Which technique involves breaking down a problem into simpler subproblems?',
        answers: [
            { text: 'Recursion', correct: false },
            { text: 'Iteration', correct: false },
            { text: 'Dynamic Programming', correct: true },
            { text: 'Greedy Algorithm', correct: false },
        ],
    },
    {
        question: 'What method calls itself to solve a problem?',
        answers: [
            { text: 'Iteration', correct: false },
            { text: 'Recursion', correct: true },
            { text: 'Looping', correct: false },
            { text: 'Dynamic Programming', correct: false },
        ],
    },
    {
        question: 'What data structure uses a hash function to map keys to values?',
        answers: [
            { text: 'Stack', correct: false },
            { text: 'Array', correct: false },
            { text: 'Queue', correct: false },
            { text: 'Hash Table', correct: true },
        ],
    },
    {
        question: 'Which data structure is used to process elements based on priority?',
        answers: [
            { text: 'Queue', correct: false },
            { text: 'Priority Queue', correct: true },
            { text: 'Linked List', correct: false },
            { text: 'Stack', correct: false },
        ],
    },
];

function checkAnswer(selected, correct) {
    if (selected === correct) {
        score++;
        rightAnswerElement.textContent = `Score: ${score}`;
        document.body.classList.add('correct');
    } else {
        document.body.classList.add('wrong');
    }
    nextButton.classList.remove('hide');
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < totalQuestions) {
        loadQuestion('easy');  // Replace with dynamic difficulty
        nextButton.classList.add('hide');
        document.body.classList.remove('correct', 'wrong');
    } else {
        showFinalScore();
    }
}

function showFinalScore() {
    questionContainer.classList.add('hide');
    nextButton.classList.add('hide');
    finalScoreText.textContent = score;
    finalScoreContainer.classList.remove('hide');
}

function restartQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    rightAnswerElement.textContent = `Score: 0`;
    finalScoreContainer.classList.add('hide');
    difficultyContainer.classList.add('hide');
    document.getElementById('start-container').classList.remove('hide');
}