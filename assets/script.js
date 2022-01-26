// variable for global timer
var time = document.querySelector("#timer");
var score = document.querySelector("#score");
var secondsLeft = 75;
// variables for each class and id selector
var startButtonEl = document.querySelector("#startButton");
var submitScoreEl = document.querySelector("#submitScore");
var highscoreButtonEl = document.querySelector("#highscores");
var questionsEl = document.querySelector("#questions");
var introEl = document.querySelector("#intro");
var rightWrongEl = document.querySelector("#rightWrong");
var answersEl = document.querySelector(".button");
var finalScoreEl = document.querySelector("#finalscore");
var initialsEl = document.querySelector("#initials");
var insertInitialsEl = document.querySelector("#insertinitials");

// creating a variable to hold the list of questions
var questionList = [
  {
    question: "Commonly used data types do NOT include:",
    answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    correctAnswer: "3. alerts",
  },
  {
    question: "Arrays in JavaScript can be used to store _______",
    answers: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    correctAnswer: "4. all of the above",
  },
  {
    question:
      "String values must be enclosed within _____ when being assigned to variables",
    answers: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
    correctAnswer: "3. quotes",
  },
  {
    question:
      "A very useful tool used during development and debuggin for printing content to the debugger is:",
    answers: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    correctAnswer: "4. console.log",
  },
];

var questionListLength = questionList.length;
var questionCount = 0;
// function to set and save your highscore
function setHighscore() {
  finalScoreEl.id = "questions";
  finalScoreEl.textContent = `You scored a ${secondsLeft}!!`;
  initialsEl.classList.remove("hidden");
  insertInitialsEl.classList.remove("hidden");

  initialsEl.addEventListener("keypress", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      saveHighscore();
    }
  });

  function saveHighscore() {
    localStorage.setItem("name", initialsEl.value);
    localStorage.setItem("score", secondsLeft);
    window.location.reload();
  }
}
// timer function
function setTime() {
  var timer = setInterval(function () {
    secondsLeft--;
    time.textContent = `Time:${secondsLeft}s`;

    if (secondsLeft <= 0 || questionCount === questionList.length - 1) {
      clearInterval(timer);
      questionsEl.style.display = "none";
      setHighscore();
    }
  }, 1000);
}

// Function to change the quiz intro text to each question
function nextQuestion() {
  var questionsEl = document.getElementById("questions");
  questionsEl.textContent = questionList[questionCount].question;

  createAnswerButtons();

  // function to create each answer button + add their content
  function createAnswerButtons() {
    for (var i = 0; i < questionList[questionCount].answers.length; i++) {
      var button = document.createElement("button");
      button.className = "options";
      button.textContent = questionList[questionCount].answers[i];
      button.setAttribute("onclick", "checkAnswer(event)");
      questionsEl.appendChild(button);
      {
      }
    }
  }
}
// checks to see if your choice was correct or wrong
function checkAnswer(e) {
  console.log(e.target.textContent);
  if (e.target.textContent === questionList[questionCount].correctAnswer) {
    var right = document.createElement("h3");
    right.textContent = "Correct!";
    right.className = "rightWrong";
    rightWrongEl.appendChild(right);
    setTimeout(function () {
      right.style.display = "none";
    }, 750);
  } else {
    var wrong = document.createElement("h3");
    wrong.textContent = "Wrong!";
    rightWrongEl.appendChild(wrong);
    setTimeout(function () {
      wrong.style.display = "none";
    }, 750);
    secondsLeft = secondsLeft - 10;
  }
  if (questionCount < questionList.length - 1) {
    questionCount++;
    nextQuestion();
  } else {
    setHighscore();
  }
}
// function to view highscores
function viewHighscore() {
  clearInterval(timer);
  if ((startButtonEl.className = "hidden")) {
    startButtonEl.classList.remove("hidden");
  }

  var questionsEl = document.getElementById("questions");
  questionsEl.textContent = "Current Highscore List";
  var score = localStorage.getItem("score")
  var name = localStorage.getItem("name")
  introEl.textContent = name + " " + score
  
}
// event listener for the start button, starts timer, hides start button
// and intro text
startButtonEl.addEventListener("click", function () {
  nextQuestion();
  setTime();
  introEl.className += "hidden";
  startButtonEl.className += "hidden";
});
// event listener for the highscore button
highscoreButtonEl.addEventListener("click", viewHighscore);
