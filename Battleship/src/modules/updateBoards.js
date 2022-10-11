function updateBoardWithShips(gameboard) {
  const board = gameboard.displayBoard();

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] == "O") {
        let cell = document.getElementById("board1").rows[i].cells[j];
        cell.className = "ship";
      }
    }
  }
}

function updatePcBoardAfterAttack(gameboard, { x, y }) {
  const board = gameboard.displayBoard();

  if (board[x - 1][y - 1] === "X") {
    let cell = document.getElementById("board2").rows[x - 1].cells[y - 1];
    cell.className = "hit";
  } else {
    let cell = document.getElementById("board2").rows[x - 1].cells[y - 1];
    cell.className = "missed";
  }
}

function updatePlayerBoardAfterAttack(gameboard) {
  const board = gameboard.displayBoard();
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === "X") {
        let cell = document.getElementById("board1").rows[i].cells[j];
        cell.className = "hit";
      } else if (board[i][j] === "*") {
        let cell = document.getElementById("board1").rows[i].cells[j];
        cell.className = "missed";
      }
    }
  }
}

function makeBoardReady() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let cell = document.getElementById("board1").rows[i].cells[j];
      cell.className = "cell";
      let pcCell = document.getElementById("board2").rows[i].cells[j];
      pcCell.className = "cell";
    }
  }
}

export {
  updateBoardWithShips,
  updatePcBoardAfterAttack,
  updatePlayerBoardAfterAttack,
  makeBoardReady,
};
