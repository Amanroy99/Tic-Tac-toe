const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diagonals
];

function handleClick(e) {
  const index = e.target.dataset.index;

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add("taken");

  if (checkWinner()) {
    statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    statusText.textContent = "😃 It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  return winningCombinations.some(combo => {
    return combo.every(index => board[index] === currentPlayer);
  });
}

function restartGame() {
  currentPlayer = "X";
  gameActive = true;
  board = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `Player X's turn`;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
restartBtn.addEventListener("click", restartGame);