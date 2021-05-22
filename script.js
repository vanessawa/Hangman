/**
 * Display all keys that have been tried already
 */

solution = "hollywood";
words = ["hollywood", "star", "fame", "boulevard"];

let domProgress = document.querySelector("#progress");
let domAttemptsRemaining = document.querySelector("#attempts_remaining");
let failedAttempts = document.querySelector("#wrong");

function startGame() {
  // clear
  domProgress.innerHTML = "";
  failedAttempts.innerHTML = "";

  // TODO choose word

  // initialize the charakters
  for (const char of solution) {
    const domChar = document.createElement("span");
    domChar.innerText = "_";
    domChar.setAttribute("data-spoiler", char);
    domProgress.appendChild(domChar);
  }
  updateGameState();
}

function guess(char) {
  if (failedAttempts.children.length === 10) {
    alert("game over");
    return;
  }

  const charSelector = 'span[data-spoiler="' + char + '"]';
  const viewMatches = domProgress.querySelectorAll(charSelector);
  const failedMatches = failedAttempts.querySelectorAll(charSelector);

  viewMatches.forEach((span) => {
    span.innerText = char;
  });

  if (viewMatches.length === 0 && failedMatches.length === 0) {
    const domChar = document.createElement("span");
    domChar.innerText = char;
    failedAttempts.appendChild(domChar);
  }
  updateGameState();
}

function updateGameState() {
  document.body.style.backgroundColor = "white";

  if (domProgress.innerText === solution) {
    document.body.style.backgroundColor = "green";
    domAttemptsRemaining.innerText = "You won";
    return;
  }

  let attemptsRemaining = 10 - failedAttempts.children.length;

  if (attemptsRemaining === 0) {
    domAttemptsRemaining.innerText = "You fail";
    document.body.style.backgroundColor = "red";
    return;
  }
}

document.body.addEventListener("keypress", (event) =>
  guess(event.key.toLocaleLowerCase())
);

startGame();
