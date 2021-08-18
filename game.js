//The status of game is stored to be manipulated later
var gameStatus = document.querySelector(".status");

//boolean variable that states the game mode
var isGameActive = true;
//Used to display whose the current players is
var currentPlayer = "X";
//Stores the the state the game is currently at
var currentState = ["", "", "", "", "", "", "", "", ""];
//Counters for winnings and ties
var player1Count = 0;
var player2Count = 0;
var tieCount = 0;
var computerCount = 0;
var playingAgainst = "";
var p1Results = document.querySelector(".p1-results");
var tieResults = document.querySelector(".tie-results");
var p2Results = document.querySelector(".p2-results");
var modal = document.getElementById("modal");
//Play audios
function clickAudio() {
  document.getElementById("clickAudio").play();
}
function winAudio() {
  document.getElementById("winAudio").play();
}
function restartAudio() {
  document.getElementById("restartAudio").play();
}
//Modal form function
function displayModal() {
  modal.style.display = "block";
}
//Getting the player choice
function playerChoice() {
  if (document.getElementById("computer-pl").checked) {
    playingAgainst = "computer";
    document.getElementById("p2-label").innerHTML = "Computer";
    document.getElementById("p1-label").innerHTML = "You";
    document.getElementById("tie").style.marginLeft = "60px";
    document.getElementById("p2-label").style.marginLeft = "50px";
    document.getElementById("p1-label").style.marginLeft = "70px";
    modal.style.display = "none";
  } else if (document.getElementById("another-pl").checked) {
    playingAgainst = "human";
    modal.style.display = "none";
  } else {
    alert("You have to check one of the choices!");
  }
  console.log(playingAgainst);
}

//Messages to be displayed throught the game
function winMsg() {
  if (currentPlayer == "X") {
    player1Count++;
    p1Results.innerHTML = player1Count;
  } else if (currentPlayer == "O") {
    player2Count++;
    p2Results.innerHTML = player2Count;
  }
  winAudio();
  return "Player " + currentPlayer + " has won!";
}
function tieMsg() {
  tieCount++;
  tieResults.innerHTML = tieCount;
  return "Game ended in a tie!";
}
function currentPlayerTurn() {
  return "It's " + currentPlayer + "'s turn";
}

//Display the current player
gameStatus.innerHTML = currentPlayerTurn();

//Conditions at which a winning will happen
const winnerIndices = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//When a cell is clicked this function is envoked to get the index number of the cell.
function CellClicked(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute("cell-index"));

  //When cell is not empty or game is not active, do nothing.
  if (currentState[clickedCellIndex] !== "" || !isGameActive) {
    return;
  }
  //When cell is empty or game is active call those functions.
  playAction(clickedCell, clickedCellIndex);
  checkGameState();
}

/* This function performs the play action. It writes the value of X or O 
in the clicked cell based on current player value, as well as updating the currentState array */
function playAction(clickedCell, clickedCellIndex) {
  currentState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}
//When computer plays
function computerPlays() {
  changePlayer();
  document
    .querySelectorAll(".cell")
    .forEach((cell) => cell.removeEventListener("click", CellClicked));
  document.getElementById("sub-text").innerHTML = "The computer is thinking...";
  //wait 2 seconds then call function for computer to play
  setTimeout(computerPlayAction, 2000);
}
//Computer play action
function computerPlayAction() {
  if (playingAgainst == "computer") {
    var randomIndex = Math.floor(Math.random() * 9);
    var continueLoop = true;
    while (continueLoop) {
      if (currentState[randomIndex] !== "") {
        randomIndex = Math.floor(Math.random() * 9);
      } else {
        currentState[randomIndex] = "O";
        document.getElementById(randomIndex).innerHTML = "O";
        checkGameStateforComputer();
        document.getElementById("sub-text").innerHTML = "";
        document
          .querySelectorAll(".cell")
          .forEach((cell) => cell.addEventListener("click", CellClicked));
        continueLoop = false;
      }
    }
  }
}
//function updates the current player and games status values
function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  gameStatus.innerHTML = currentPlayerTurn();
}
function checkGameStateforComputer() {
  var isWon = false;
  for (var i = 0; i <= 7; i++) {
    const index = winnerIndices[i];
    var cell1 = currentState[index[0]];
    var cell2 = currentState[index[1]];
    var cell3 = currentState[index[2]];

    //if any of the winner cells are empty continue looping
    if (cell1 === "" || cell2 === "" || cell3 === "") {
      continue;
    }
    //if one if the winning inidces matches it's a win and the looping is stopped
    if (cell1 === cell2 && cell2 === cell3) {
      isWon = true;
      break;
    }
  }
  //Update game status when there's a win
  if (isWon) {
    gameStatus.innerHTML = winMsg();
    isGameActive = false;
    return;
  }

  /* After the loop is finished and there's no win and there's no cells left to play,
    it's decalred a tie. */
  var isTie = !currentState.includes("");
  if (isTie) {
    gameStatus.innerHTML = tieMsg();
    isGameActive = false;
    return;
  }
  changePlayer();
}
//function checks the current state of the game to see if there's a winning or tie
function checkGameState() {
  var isWon = false;
  for (var i = 0; i <= 7; i++) {
    const index = winnerIndices[i];
    var cell1 = currentState[index[0]];
    var cell2 = currentState[index[1]];
    var cell3 = currentState[index[2]];

    //if any of the winner cells are empty continue looping
    if (cell1 === "" || cell2 === "" || cell3 === "") {
      continue;
    }
    //if one if the winning inidces matches it's a win and the looping is stopped
    if (cell1 === cell2 && cell2 === cell3) {
      isWon = true;
      break;
    }
  }
  //Update game status when there's a win
  if (isWon) {
    gameStatus.innerHTML = winMsg();
    isGameActive = false;
    return;
  }

  /* After the loop is finished and there's no win and there's no cells left to play,
    it's decalred a tie. */
  var isTie = !currentState.includes("");
  if (isTie) {
    gameStatus.innerHTML = tieMsg();
    isGameActive = false;
    return;
  }
  //Change player turn
  if (playingAgainst == "human") {
    changePlayer();
  } else if (playingAgainst == "computer") {
    computerPlays();
  }
}

//Function activates the game and emptys the current game state
function restartGame() {
  isGameActive = true;
  currentPlayer = "X";
  currentState = ["", "", "", "", "", "", "", "", ""];
  gameStatus.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
}
//Adding event listeners
document.getElementById("start-btn").addEventListener("click", playerChoice);
document.getElementById("start-btn").addEventListener("click", clickAudio);
document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", CellClicked));
document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", clickAudio));
document.querySelector(".restart").addEventListener("click", restartGame);
document.querySelector(".restart").addEventListener("click", restartAudio);
