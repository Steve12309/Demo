var countSeconds = "0" + 0;
var countMinuteds = "0" + 0;

function Count() {
  setTimeout(function goUp() {
    countSeconds++;
    if (countSeconds == 60) {
      countSeconds = 0;
    }
    if (countSeconds < 10) {
      countSeconds = "0" + countSeconds;
    }
  }, 1000);
  setTimeout(function () {
    if (countSeconds == 59) {
      countMinuteds++;
      countMinuteds = "0" + countMinuteds;
    }
    if (countMinuteds == 90) {
      countSeconds = "0" + 0;
      countMinuteds = "0" + 0;
      alert("Stop play or you will die by the author of this game");
    }
  }, 1000);
  document.getElementById("timeSecond-played").innerHTML = countSeconds;
  document.getElementById("timeMinute-played").innerHTML = countMinuteds + ":";
  setTimeout("Count()", 1000);
}
Count();

var playerScissor = document.getElementById("Player-Scissors");
var playerRock = document.getElementById("Player-Rock");
var playerPaper = document.getElementById("Player-Paper");
var playerChoice = document.getElementById("FinalPlayerChoice");
var robotChoice = document.getElementById("FinalRobotChoice");
var resultGame = document.getElementById("resultText");
var aiScore = document.getElementById("Robot");
var playerScore = document.getElementById("Player");
var scorePlayer = 0;
var scoreAI = 0;
var robotFirstChoice = document.querySelector(".special11");
var robotSecondChoice = document.querySelector(".special12");
var robotThirdChoice = document.querySelector(".special13");
var choiceRobotArea = document.querySelector(".robot-choices");
var loadingAnimation = document.querySelector(".loading");
var hello = document.querySelector(".player-choices");
loadingAnimation.classList.add("display");

playerPaper.addEventListener("click", function () {
  playerChoice.className = "fa-solid fa-hand change";
  let playerResult = "Paper";
  setTimeout(AIGenerate(playerResult), 4000);
  choiceRobotArea.classList.remove("display");
  robotFirstChoice.classList.remove("display");
  robotSecondChoice.classList.remove("display");
  robotThirdChoice.classList.remove("display");
});

playerScissor.addEventListener("click", function () {
  playerChoice.className =
    "fa-solid fa-hand-scissors fa-flip-horizontal change";
  let playerResult = "Scissors";
  setTimeout(AIGenerate(playerResult), 4000);
  choiceRobotArea.classList.remove("display");
  robotFirstChoice.classList.remove("display");
  robotSecondChoice.classList.remove("display");
  robotThirdChoice.classList.remove("display");
});

playerRock.addEventListener("click", function () {
  playerChoice.className = "fa-solid fa-hand-back-fist change";
  let playerResult = "Rock";
  setTimeout(AIGenerate(playerResult), 4000);
  choiceRobotArea.classList.remove("display");
  robotFirstChoice.classList.remove("display");
  robotSecondChoice.classList.remove("display");
  robotThirdChoice.classList.remove("display");
});

playerPaper.onmouseup = function () {
  hello.classList.add("display2");
};
playerScissor.onmouseup = function () {
  hello.classList.add("display2");
};
playerRock.onmouseup = function () {
  hello.classList.add("display2");
};

function AIGenerate(x) {
  let robotRandom = "";
  let result = "";
  let random = Math.floor(Math.random() * 3 + 1);
  if (random == 1) {
    setTimeout(function a() {
      robotChoice.className = "fa-regular fa-hand-scissors change";
      robotFirstChoice.classList.remove("display");
      robotSecondChoice.classList.remove("display");
      choiceRobotArea.classList.add("display");
      setTimeout(function f() {
        loadingAnimation.classList.remove("display");
      }, 1000);
      setTimeout(function f() {
        loadingAnimation.classList.add("display");
      }, 4000);
      setTimeout(function e() {
        resultGame.innerText = result;
        resultGame.classList.remove("display");
        aiScore.innerText = scoreAI;
        playerScore.innerText = scorePlayer;
      }, 4000);
    }, 4000);
    resultGame.classList.add("display");
    setTimeout(function d() {
      robotFirstChoice.classList.add("display");
      robotSecondChoice.classList.add("display");
    }, 2000);
    robotRandom = "Scissors";
  }
  if (random == 2) {
    setTimeout(function b() {
      robotChoice.className = "fa-regular fa-hand-back-fist change";
      robotFirstChoice.classList.remove("display");
      robotThirdChoice.classList.remove("display");
      choiceRobotArea.classList.add("display");
      setTimeout(function f() {
        loadingAnimation.classList.remove("display");
      }, 1000);
      setTimeout(function f() {
        loadingAnimation.classList.add("display");
      }, 4000);
      setTimeout(function e() {
        resultGame.innerText = result;
        resultGame.classList.remove("display");
        aiScore.innerText = scoreAI;
        playerScore.innerText = scorePlayer;
      }, 4000);
    }, 4000);
    resultGame.classList.add("display");
    setTimeout(function d() {
      robotFirstChoice.classList.add("display");
      robotThirdChoice.classList.add("display");
    }, 2000);
    robotRandom = "Rock";
  }
  if (random == 3) {
    setTimeout(function c() {
      robotChoice.className = "fa-regular fa-hand change";
      robotSecondChoice.classList.remove("display");
      robotThirdChoice.classList.remove("display");
      choiceRobotArea.classList.add("display");
      setTimeout(function f() {
        loadingAnimation.classList.remove("display");
      }, 1000);
      setTimeout(function f() {
        loadingAnimation.classList.add("display");
      }, 4000);
      setTimeout(function e() {
        resultGame.innerText = result;
        resultGame.classList.remove("display");
        aiScore.innerText = scoreAI;
        playerScore.innerText = scorePlayer;
      }, 4000);
    }, 4000);
    resultGame.classList.add("display");
    setTimeout(function d() {
      robotSecondChoice.classList.add("display");
      robotThirdChoice.classList.add("display");
    }, 2000);
    robotRandom = "Paper";
  }

  if (robotRandom === "Rock") {
    if (x === "Scissors") {
      result = "You Lose";
      scoreAI++;
    } else if (x === "Paper") {
      result = "You Win";
      scorePlayer++;
    } else {
      result = "Tie";
    }
  } else if (robotRandom === "Paper") {
    if (x === "Rock") {
      result = "You Lose";
      scoreAI++;
    } else if (x === "Scissors") {
      result = "You Win";
      scorePlayer++;
    } else {
      result = "Tie";
    }
  } else if (robotRandom === "Scissors") {
    if (x === "Paper") {
      result = "You Lose";
      scoreAI++;
    } else if (x === "Rock") {
      result = "You Win";
      scorePlayer++;
    } else {
      result = "Tie";
    }
  }
  setTimeout(function haiz() {
    hello.classList.remove("display2");
  }, 8000);
}
