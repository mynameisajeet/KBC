let currentQuestionIndex = 0;
let questions = [];
let score = 0;
let wrongAnswers = 0;
const maxWrongAnswers = 3;
const lifelinesRemaining = 3;

fetch('question.json')
    .then(response => response.json())
    .then(data => {
        questions = shuffleArray(data);
        showQuestion();
    });

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function resetOptions() {
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('correct', 'incorrect');
        option.disabled = false;
    });
}

function showQuestion() {
    resetOptions();

    const questionElement = document.getElementById('question');
    const optionA = document.getElementById('A');
    const optionB = document.getElementById('B');
    const optionC = document.getElementById('C');
    const optionD = document.getElementById('D');
    const nextButton = document.getElementById('next-btn');
    const lifelineElement = document.getElementById('lifelines-remaining');

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    optionA.innerText = `A. ${currentQuestion.A}`;
    optionB.innerText = `B. ${currentQuestion.B}`;
    optionC.innerText = `C. ${currentQuestion.C}`;
    optionD.innerText = `D. ${currentQuestion.D}`;

    nextButton.style.display = 'none';

    lifelineElement.innerText = `Lifelines Remaining: ${lifelinesRemaining - wrongAnswers}`;

    document.querySelectorAll('.option').forEach(option => {
        option.onclick = () => {
            const selectedAnswer = option.id;
            if (selectedAnswer === currentQuestion.answer) {
                option.classList.add('correct');
                score++;
            } else {
                option.classList.add('incorrect');
                const correctOption = document.getElementById(currentQuestion.answer);
                if (correctOption) {
                    correctOption.classList.add('correct');
                }
                wrongAnswers++;
            }
            nextButton.style.display = 'block';
            document.querySelectorAll('.option').forEach(btn => {
                btn.disabled = true;
            });

            if (wrongAnswers >= maxWrongAnswers) {
                endQuiz();
            }
        };
    });
}

function endQuiz() {
    const totalPrize = score * 1000;
    const prizeMessage = document.getElementById('prize-message');
    prizeMessage.innerHTML = `Congratulations! Your score: ${score} <br> Total Prize Money: ₹${totalPrize}`;
    prizeMessage.style.display = 'block'; // Show the prize message card

    // Disable the next button
    document.getElementById('next-btn').disabled = true;

    // Show the new game button
    document.getElementById('new-game-btn').style.display = 'block';
}

document.getElementById('new-game-btn').onclick = () => {
    location.reload(); // Reload the page to start a new game
};


/*function startNewGame() {
    currentQuestionIndex = 0;
    score = 0;
    wrongAnswers = 0;
    document.getElementById('new-game-btn').style.display = 'none'; // Hide new game button
    document.getElementById('prize-message').style.display = 'none'; // Hide prize message
    fetch('question.json')
        .then(response => response.json())
        .then(data => {
            questions = shuffleArray(data);
            showQuestion();
        });
}*/



document.getElementById('next-btn').onclick = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        alert(`Quiz completed! Your score: ${score}`);
        endQuiz();
    }
};
