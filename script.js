let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = false;
let numberOfPlayers = 0;
let player1Name = "";
let player2Name = "";

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function startGame() {
  numberOfPlayers = parseInt(prompt("Enter number of players (1 or 2):"));
  if (numberOfPlayers === 0 || numberOfPlayers > 2 || isNaN(numberOfPlayers)) {
    alert("Invalid number of players. Please enter 1 or 2.");
    return;
  }
  if (numberOfPlayers === 1) {
    player1Name = prompt("Enter your name:");
    player2Name = "Computer";
  } else if (numberOfPlayers === 2) {
    player1Name = prompt("Enter Player 1's name:");
    player2Name = prompt("Enter Player 2's name:");
  }

  document.getElementById("player1Name").textContent = player1Name;
  document.getElementById("player2Name").textContent = player2Name;

  gameActive = true;
  currentPlayer = "X";
  document.getElementById("turn").textContent = `${player1Name}'s Turn`;
  document.getElementById("result").textContent = "";

  // Clear board
  board = ["", "", "", "", "", "", "", "", ""];
  document.querySelectorAll(".cell").forEach((cell) => (cell.textContent = ""));
}

function cellClicked(index) {
  if (!gameActive || board[index] !== "") return;

  board[index] = currentPlayer;
  document.getElementById(`cell-${index}`).textContent = currentPlayer;

  if (checkWin()) {
    endGame(false);
  } else if (checkDraw()) {
    endGame(true);
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateTurnDisplay();

    if (numberOfPlayers === 1 && currentPlayer === "O") {
      computerMove();
    }
  }
}

function checkWin() {
  for (let combo of winningCombinations) {
    if (
      board[combo[0]] !== "" &&
      board[combo[0]] === board[combo[1]] &&
      board[combo[1]] === board[combo[2]]
    ) {
      return true;
    }
  }
  return false;
}

function checkDraw() {
  return board.every((cell) => cell !== "");
}

function endGame(draw) {
  gameActive = false;
  if (draw) {
    document.getElementById("result").textContent = "Draw!";
  } else {
    let winner = currentPlayer === "X" ? player1Name : player2Name;
    document.getElementById("result").textContent = `${winner} Wins!`;
  }
  document.getElementById("turn").textContent = "";
}

function resetGame() {
  numberOfPlayers = 0;
  player1Name = "";
  player2Name = "";

  document.getElementById("player1Name").textContent = "";
  document.getElementById("player2Name").textContent = "";

  startGame();
}

function updateTurnDisplay() {
  if (currentPlayer === "X") {
    document.getElementById("turn").textContent = `${player1Name}'s Turn`;
  } else {
    if (numberOfPlayers === 1) {
      document.getElementById("turn").textContent = "Computer's Turn";
    } else {
      document.getElementById("turn").textContent = `${player2Name}'s Turn`;
    }
  }
}

function computerMove() {
  // Simple AI: Randomly choose an empty cell
  let emptyCells = board
    .map((cell, index) => (cell === "" ? index : -1))
    .filter((index) => index !== -1);
  let randomIndex = Math.floor(Math.random() * emptyCells.length);
  let moveIndex = emptyCells[randomIndex];

  setTimeout(() => {
    board[moveIndex] = currentPlayer;
    document.getElementById(`cell-${moveIndex}`).textContent = currentPlayer;
    if (checkWin()) {
      endGame(false);
    } else if (checkDraw()) {
      endGame(true);
    } else {
      currentPlayer = "X";
      updateTurnDisplay();
    }
  }, 1000); // Simulate delay for computer's move
}
