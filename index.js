let players = [];
let turn = 0;
let gameOver = false;
let dimension = 3;
let count = 0;

let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];

const startGame = () => {
  if (count !== 0) {
    return;
  }

  count++;

  let gameContainer = document.getElementById("game-container");
  let turnDiv = document.createElement("div");
  turnDiv.id = "turn";
  gameContainer.appendChild(turnDiv);

  let input1 = document.getElementById("p1");
  let input2 = document.getElementById("p2");

  let player1 = input1.value;
  let player2 = input2.value;

  if (isEmpty(player1) || isEmpty(player2)) {
    alert("Player name is required");
    return;
  }

  input1.setAttribute("disabled", true);
  input2.setAttribute("disabled", true);

  let game = document.getElementById("game-container");
  game.classList.remove("hide");

  players.push(player1);
  players.push(player2);

  document.getElementById("turn").innerHTML = players[turn % 2] + "'s turn";
  initGame();
  //console.log("abc");
};

let start = document.getElementById("game-start");
start.addEventListener("click", startGame);

const initGame = () => {
  let gameContainer = document.getElementById("game-container");

  for (let i = 0; i < dimension; i++) {
    let row = document.createElement("div");
    row.className = "row";
    for (let j = 0; j < dimension; j++) {
      let cell = document.createElement("div");
      cell.addEventListener("click", (event) => handleClick(cell, i, j));
      cell.className = "cell";
      cell.id = i.toString() + j.toString();
      row.appendChild(cell);
    }
    gameContainer.appendChild(row);
  }
};

const restartGame = () => {
  location.reload();
};

let restart = document.getElementById("restart");
restart.addEventListener("click", restartGame);

const calculateWinner = () => {
  if (turn < 4) {
    return false;
  }

  const winnerCombinations = [
    ["00", "01", "02"],
    ["10", "11", "12"],
    ["20", "21", "22"],
    ["00", "10", "20"],
    ["01", "11", "21"],
    ["02", "12", "22"],
    ["00", "11", "22"],
    ["20", "11", "02"]
  ];

  for (let i = 0; i < winnerCombinations.length; i++) {
    let val1 = winnerCombinations[i][0];
    let val2 = winnerCombinations[i][1];
    let val3 = winnerCombinations[i][2];

    if (
      board[val1[0]][val1[1]] !== "" &&
      board[val1[0]][val1[1]] === board[val2[0]][val2[1]] &&
      board[val1[0]][val1[1]] === board[val3[0]][val3[1]]
    ) {
      let one = document.getElementById(val1);
      one.className = "win";
      let two = document.getElementById(val2);
      two.className = "win";
      let three = document.getElementById(val3);
      three.className = "win";

      console.log(one);

      return true;
    }
  }

  return false;
};

let handleClick = (cell, i, j) => {
  let el = cell;
  if (el.innerHTML !== "" || gameOver) {
    return;
  }

  board[i][j] = turn % 2 === 0 ? "X" : "O";
  el.innerHTML = board[i][j];

  if (calculateWinner()) {
    let temp1 = document.getElementById("turn");
    temp1.innerHTML = players[turn % 2] + " won";
    temp1.className = "red";
    gameOver = true;

    confetti.start(10000, 200, 300);

    return;
  }
  turn++;

  if (turn === 9) {
    let temp1 = document.getElementById("turn");
    temp1.innerHTML = "Game is drawn";
    temp1.className = "red";
    gameOver = true;
    return;
  }

  if (gameOver) {
    count = 0;
  }

  document.getElementById("turn").innerHTML = players[turn % 2] + "'s turn";
  //console.log("Element is clicked");
};

const isEmpty = (value) => !value || !value.trim();
