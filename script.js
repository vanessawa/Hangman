/**
 * keyPressed mit Wort verbinden
 * Platzhalter für Buchstaben
 * countdown Fehlversuche
 * Game over bei 10. fail
 */

class Game {
  solution = "hollywood";
  failedAttempts = [];
}

let game = undefined;
let domProgress = document.querySelector("#progress");
let domAttemptsRemaining = document.querySelector("#attempts_remaining");

function startGame() {
  game = new Game();

  for (const char of game.solution) {
    const domChar = document.createElement("span");
    domChar.innerText = "_";
    domChar.setAttribute("data-spoiler", char);
    domProgress.appendChild(domChar);
  }
  updateAttempts();
}

function guess(char) {
  const matches = document.querySelectorAll(
    'span[data-spoiler="' + char + '"]'
  );
  matches.forEach((span) => {
    span.innerText = char;
  });

  if (matches.length === 0 && !game.failedAttempts.includes(char)) {
    game.failedAttempts.push(char);
    updateAttempts();
  }
}

function updateAttempts() {
  domAttemptsRemaining.innerText = 10 - game.failedAttempts.length;
}

document.body.addEventListener("keydown", (event) => {
  guess(event.key);
});

startGame();
