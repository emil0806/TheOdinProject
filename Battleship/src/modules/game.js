import createGameboard from "./gameboard";
import { newPlayer } from "./player";
import { updateBoardWithShips } from "./updateBoards";
import {
  updatePcBoardAfterAttack,
  updatePlayerBoardAfterAttack,
  makeBoardReady,
} from "./updateBoards";
import { renderPage, boardNotReady, boardReady } from "./renderPage";

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

      pcPlayer.attack({ player: player });
      updatePlayerBoardAfterAttack(playerGameboard);
    })
  );

  const gameBtn = document.getElementById("gameBtn");
  gameBtn.addEventListener("click", () => {
    playerGameboard.resetBoard();
    pcGameboard.resetBoard();

    makeBoardReady();
    startOfGame(playerGameboard, pcGameboard, isVertical);
  });
}

function startOfGame(playerGameboard, pcGameboard, isVertical) {
  if (!playerGameboard.isBoardReady()) {
    boardNotReady(isVertical, playerGameboard);
  } else {
    boardReady();
  }
  placePcShips(pcGameboard);
}

function placePcShips(pcGameboard) {
  pcGameboard.placeShip(4, { x: 2, y: 3 });
  pcGameboard.placeShip(2, { x: 6, y: 7 });
  pcGameboard.placeShip(5, { x: 4, y: 2 }, true);
  pcGameboard.placeShip(3, { x: 5, y: 4 }, true);
  pcGameboard.placeShip(3, { x: 1, y: 10 }, true);
}

export { newGame };
