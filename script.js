const questions = [
  { question: "Choose the correct past tense of 'go':", answer: "went" },
  { question: "What is the plural of 'child'?", answer: "children" },
  { question: "Correct article for 'umbrella':", answer: "an" },
  { question: "Is it 'their' or 'there' in 'Look over ___'?", answer: "there" },
  { question: "What is the synonym of 'happy'?", answer: "joyful" }
];

let score = 0;
let highScore = 0;
let timeLeft = 47;
let lives = 3;
let currentQuestionIndex = 0;
let timerInterval;

const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("high-score");
const timerDisplay = document.getElementById("timer");
const livesDisplay = document.getElementById("lives");
const questionDisplay = document.getElementById("question");
const answerInput = document.getElementById("answer");
const startButton = document.getElementById("start-btn");

function startGame() {
  score = 0;
  lives = 3;
  timeLeft = 47;
  currentQuestionIndex = 0;

  scoreDisplay.textContent = score;
  livesDisplay.textContent = lives;
  timerDisplay.textContent = timeLeft;

  answerInput.disabled = false;
  answerInput.value = "";
  startButton.disabled = true;

  nextQuestion();
  startTimer();
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function nextQuestion() {
  if (lives <= 0) {
    endGame();
    return;
  }

  currentQuestionIndex = Math.floor(Math.random() * questions.length);
  questionDisplay.textContent = questions[currentQuestionIndex].question;
}

function checkAnswer() {
  const userAnswer = answerInput.value.trim().toLowerCase();
  const correctAnswer = questions[currentQuestionIndex].answer.toLowerCase();

  if (userAnswer === correctAnswer) {
    score++;
    scoreDisplay.textContent = score;

    if (score > highScore) {
      highScore = score;
      highScoreDisplay.textContent = highScore;
    }
  } else {
    lives--;
    livesDisplay.textContent = lives;
  }

  answerInput.value = "";
  nextQuestion();
}

function endGame() {
  clearInterval(timerInterval);
  questionDisplay.textContent = "Game Over! Press Start to play again.";
  answerInput.disabled = true;
  startButton.disabled = false;
}

startButton.addEventListener("click", startGame);
answerInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkAnswer();
  }
});
