import createGameboard from "./gameboard";
import { newPlayer } from "./player";
import {
  updatePcBoardAfterAttack,
  updatePlayerBoardAfterAttack,
  makeBoardReady,
} from "./updateBoards";
import { boardNotReady, boardReady } from "./renderPage";

function newGame() {
  const playerGameboard = createGameboard();
  const pcGameboard = createGameboard();

  const player = newPlayer({
    name: "Player 1",
    board: playerGameboard,
    isPc: false,
  });
  const pcPlayer = newPlayer({ board: pcGameboard, isPc: true });
  let isVertical = false;

  const infoText = document.getElementById("infoText");

  startOfGame(playerGameboard, pcGameboard, isVertical);

  document.querySelectorAll("#board2 td").forEach((e) =>
    e.addEventListener("click", function (e) {
      const x = e.target.parentElement.rowIndex + 1;
      const y = e.target.cellIndex + 1;
      if (x === undefined || y === undefined) {
        return;
      }
      player.attack({ player: pcPlayer, x: x, y: y });
      updatePcBoardAfterAttack(pcGameboard, { x: x, y: y });
      if (gameOver(playerGameboard, pcGameboard)) {
        return;
      }
      infoText.textContent = "PC makes move!";

      pcPlayer.attack({ player: player });

      setTimeout(function () {
        updatePlayerBoardAfterAttack(playerGameboard);
        if (gameOver(playerGameboard, pcGameboard)) {
          return;
        }
        infoText.textContent = "Your turn!";
      }, 600);
    })
  );

  const gameBtn = document.getElementById("gameBtn");
  gameBtn.addEventListener("click", () => {
    playerGameboard.resetBoard();
    pcGameboard.resetBoard();

    makeBoardReady();
    startOfGame(playerGameboard, pcGameboard, isVertical);
    infoText.textContent = "Place your ships";
  });
}

function startOfGame(playerGameboard, pcGameboard, isVertical) {
  if (!playerGameboard.isBoardReady()) {
    boardNotReady(isVertical, playerGameboard);
  } else {
    boardReady();
  }
  const shipsToPlace = [5, 4, 3, 3, 2];
  for (let i = 0; i < 5; i++) {
    placePcShips(pcGameboard, shipsToPlace[i]);
  }
}

let shipLocations = [];

function placePcShips(pcGameboard, shipLength) {
  let x = Math.floor(Math.random() * (10 - 1 + 1) + 1);
  let y = Math.floor(Math.random() * (10 - 1 + 1) + 1);
  let vert = Math.random() < 0.5;

  const checkValidCoords = (x, y) => {
    if ((vert && x + shipLength < 10) || (!vert && y + shipLength < 10)) {
      for (let h = 0; h < shipLength; h++) {
        for (let i = 0; i < shipLocations.length; i++) {
          if (x === shipLocations[i].x && y === shipLocations[i].y) {
            return false;
          }
        }
        if (vert) {
          x += 1;
        } else {
          y += 1;
        }
      }
    } else {
      return false;
    }

    return true;
  };
  do {
    x = Math.floor(Math.random() * (10 - 1 + 1) + 1);
    y = Math.floor(Math.random() * (10 - 1 + 1) + 1);
  } while (checkValidCoords(x, y) == false);

  pcGameboard.placeShip(shipLength, { x: x, y: y }, vert);

  for (let i = 0; i < shipLength; i++) {
    shipLocations.push({ x, y });
    if (vert) {
      x += 1;
    } else {
      y += 1;
    }
  }
}

function gameOver(playerGameboard, pcGameboard) {
  const infoText = document.getElementById("infoText");
  const playerBoard = document.getElementById("board1");
  const pcBoard = document.getElementById("board2");

  if (playerGameboard.isAllShipsSunk()) {
    infoText.textContent = "Game Over. You lost!";
    playerBoard.className = "pcBoardNotReady";
    pcBoard.className = "pcBoardNotReady";
    return true;
  } else if (pcGameboard.isAllShipsSunk()) {
    infoText.textContent = "You Won!";
    playerBoard.className = "pcBoardNotReady";
    pcBoard.className = "pcBoardNotReady";
    return true;
  } else {
    return;
  }
}
export { newGame };
