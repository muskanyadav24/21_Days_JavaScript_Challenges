const questions = [
  {
    question: "What is JavaScript?",
    options: ["Language", "Framework", "Library", "Tool"],
    answer: "Language"
  },
  {
    question: "Which is used for styling?",
    options: ["HTML", "CSS", "JS", "Node"],
    answer: "CSS"
  },
  {
    question: "Which runs in browser?",
    options: ["Python", "Java", "C++", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "Which tag is used for JavaScript in HTML?",
    options: ["<js>", "<script>", "<javascript>", "<code>"],
    answer: "<script>"
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Microsoft", "Google", "Netscape", "Apple"],
    answer: "Netscape"
  }
];

// State variables
let currentIndex = 0;
let score = 0;
let time = 30;
let timer;
let selected = "";

// Elements
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const timerEl = document.getElementById("timer");
const resultBox = document.getElementById("result");
const scoreEl = document.getElementById("score");

const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("start-screen");
const quizContainer = document.querySelector(".quiz-container");

// Load Question
function loadQuestion() {
  let q = questions[currentIndex];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  selected = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;

    btn.onclick = (e) => {
      selectAnswer(option, e);
    };

    optionsEl.appendChild(btn);
  });
}

// Select Answer
function selectAnswer(option, event) {
  selected = option;

  const buttons = document.querySelectorAll("#options button");
  buttons.forEach(btn => {
    btn.style.background = "#f1f1f1";
    btn.style.color = "#000";
  });

  event.target.style.background = "#67C090";
  event.target.style.color = "#fff";
}

// Next Button
nextBtn.onclick = () => {
  if (!selected) {
    alert("Please select an option!");
    return;
  }

  if (selected === questions[currentIndex].answer) {
    score++;
  }

  currentIndex++;

  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
};

// Timer
function startTimer() {
  timer = setInterval(() => {
    time--;
    timerEl.textContent = "Time: " + time;

    if (time <= 0) {
      endQuiz();
    }
  }, 1000);
}

// End Quiz
function endQuiz() {
  clearInterval(timer);

  quizContainer.classList.add("hidden");
  resultBox.classList.remove("hidden");

  scoreEl.textContent = score + " / " + questions.length;
}

// Start Button Click
startBtn.onclick = () => {
  startScreen.classList.add("hidden");
  quizContainer.classList.remove("hidden");

  loadQuestion();
  startTimer();
};