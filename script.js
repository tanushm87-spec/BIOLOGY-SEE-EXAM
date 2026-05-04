import questions from './questions.js';

let currentQuestion = 0;
let score = 0;
let selectedAnswers = new Array(questions.length).fill(null);

const questionText = document.getElementById('question-text');
const optionsDiv = document.getElementById('options');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const resultDiv = document.getElementById('result');
const scoreSpan = document.getElementById('score');

function loadQuestion() {
  const q = questions[currentQuestion];
  questionText.textContent = `${currentQuestion + 1}. ${q.q}`;

  optionsDiv.innerHTML = '';
  q.options.forEach((option, index) => {
    const div = document.createElement('div');
    div.classList.add('option');
    div.textContent = option;
    if (selectedAnswers[currentQuestion] === index) div.classList.add('selected');

    div.onclick = () => {
      selectedAnswers[currentQuestion] = index;
      document.querySelectorAll('.option').forEach(el => el.classList.remove('selected'));
      div.classList.add('selected');
    };
    optionsDiv.appendChild(div);
  });

  prevBtn.disabled = currentQuestion === 0;
  nextBtn.style.display = currentQuestion === questions.length - 1 ? 'none' : 'block';
  submitBtn.style.display = currentQuestion === questions.length - 1 ? 'block' : 'none';
}

function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
}

function calculateScore() {
  score = 0;
  selectedAnswers.forEach((answer, i) => {
    if (answer === questions[i].ans) score++;
  });
}

function showResult() {
  calculateScore();
  document.getElementById('quiz').style.display = 'none';
  resultDiv.style.display = 'block';
  scoreSpan.textContent = `${score} / ${questions.length} (${((score / questions.length) * 100).toFixed(1)}%)`;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  selectedAnswers.fill(null);
  document.getElementById('quiz').style.display = 'block';
  resultDiv.style.display = 'none';
  loadQuestion();
}

// Event Listeners
nextBtn.addEventListener('click', nextQuestion);
prevBtn.addEventListener('click', prevQuestion);
submitBtn.addEventListener('click', showResult);

// Start Quiz
loadQuestion();
