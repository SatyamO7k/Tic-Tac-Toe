const setupDiv = document.getElementById("setup");
const gameDiv = document.getElementById("game");
const playerXInput = document.getElementById("player-x");
const playerOInput = document.getElementById("player-o");
const startButton = document.getElementById("start");
const skipButton = document.getElementById("skip");
const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");
const newGameButton = document.getElementById("new-game");
const resetAllButton = document.getElementById("reset-all");
const xScoreSpan = document.getElementById("x-score");
const oScoreSpan = document.getElementById("o-score");
const xNameSpan = document.getElementById("x-name");
const oNameSpan = document.getElementById("o-name");
const drawsSpan = document.getElementById("draws");
const confetti = document.getElementById("confetti");
const themeToggle = document.getElementById("theme-toggle");

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let xWins = 0;
let oWins = 0;
let draws = 0;
let playerXName = "Player X";
let playerOName = "Player O";
let isDarkMode = false;

// Toggle theme
themeToggle.addEventListener("click", () => {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle("dark", isDarkMode);
  const icon = themeToggle.querySelector("i");
  if (isDarkMode) {
    icon.classList.hide("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
});

// Start game
startButton.addEventListener("click", startGame);
skipButton.addEventListener("click", () => {
  playerXName = "Player X";
  playerOName = "Player O";
  startGame();
});

function startGame() {
  playerXName = playerXInput.value || "Player X";
  playerOName = playerOInput.value || "Player O";
  xNameSpan.textContent = playerXName;
  oNameSpan.textContent = playerOName;
  xScoreSpan.innerHTML = `<span class="neon-name">${playerXName}</span>: 0`;
  oScoreSpan.innerHTML = `<span class="neon-name o">${playerOName}</span>: 0`;
  setupDiv.style.display = "none";
  gameDiv.style.display = "block";
  status.textContent = `${playerXName}'s turn`;
}

// Handle cell click
function handleCellClick(e) {
  const index = e.target.getAttribute("data-index");
  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer.toLowerCase());

  if (checkWin()) {
    const winner = currentPlayer === "X" ? playerXName : playerOName;
    status.textContent = ` Congrats 🎉 ${winner} wins!`;
    gameActive = false;
    if (currentPlayer === "X") xWins++;
    else oWins++;
    updateScoreboard();
    celebrate();
    return;
  }

  if (checkDraw()) {
    status.textContent = "It's a draw 😓!";
    gameActive = false;
    draws++;
    updateScoreboard();
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  status.textContent = `${
    currentPlayer === "X" ? playerXName : playerOName
  }'s turn`;
}

// Check for win
function checkWin() {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  return winningConditions.some((condition) =>
    condition.every(
      (index) =>
        gameState[index] && gameState[index] === gameState[condition[0]]
    )
  );
}

// Check for draw
function checkDraw() {
  return gameState.every((cell) => cell !== "");
}

// Update scoreboard
function updateScoreboard() {
  xScoreSpan.innerHTML = `<span class="neon-name">${playerXName}</span>: ${xWins}`;
  oScoreSpan.innerHTML = `<span class="neon-name o">${playerOName}</span>: ${oWins}`;
  drawsSpan.textContent = draws;
}

// New game
function newGame() {
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  status.textContent = `${playerXName}'s turn`;
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("x", "o");
  });
}

// Reset all
function resetAll() {
  xWins = 0;
  oWins = 0;
  draws = 0;
  newGame();
  updateScoreboard();
}

// Attach event listeners
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
newGameButton.addEventListener("click", newGame);
resetAllButton.addEventListener("click", resetAll);
