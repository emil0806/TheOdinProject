import { updateBoardWithShips } from "./updateBoards";

function renderPage() {
  let container = document.createElement("div");
  container.setAttribute("id", "container");
  container.setAttribute("class", "container");

  let gameContainer = document.createElement("div");
  gameContainer.setAttribute("id", "gameContainer");
  gameContainer.setAttribute("class", "gameContainer");

  let infoContainer = document.createElement("div");
  infoContainer.setAttribute("id", "infoContainer");
  infoContainer.setAttribute("class", "infoContainer");

  let gameBtn = document.createElement("button");
  gameBtn.setAttribute("id", "gameBtn");
  gameBtn.textContent = "New Game";

  let flipBtn = document.createElement("button");
  flipBtn.setAttribute("id", "flipBtn");
  flipBtn.textContent = "Flip ship";

  let infoBox = document.createElement("div");
  infoBox.setAttribute("id", "infoBox");
  infoBox.setAttribute("class", "infoBox");

  let infoText = document.createElement("h3");
  infoText.setAttribute("id", "infoText");
  infoText.setAttribute("class", "infoText");
  infoText.textContent = "Place your ships";

  infoBox.appendChild(infoText);

  infoContainer.appendChild(gameBtn);
  infoContainer.appendChild(flipBtn);
  infoContainer.appendChild(infoBox);

  let boardContainer1 = document.createElement("div");
  boardContainer1.setAttribute("class", "boardContainer");

  let boardContainer2 = document.createElement("div");
  boardContainer2.setAttribute("class", "boardContainer");

  let board = document.createElement("table");

  for (let i = 0; i < 10; i++) {
    let row = board.insertRow(i);
    for (let j = 0; j < 10; j++) {
      let cell = row.insertCell(j);
      cell.innerHTML = "";
      cell.setAttribute("class", "cell");
      cell.setAttribute("id", "cell");
    }
  }

  boardContainer1.appendChild(board).id = "board1";
  boardContainer2.appendChild(board.cloneNode(true)).id = "board2";

  gameContainer.appendChild(boardContainer1).id = "boardContainer1";
  gameContainer.appendChild(infoContainer);
  gameContainer.appendChild(boardContainer2).id = "boardContainer2";

  let header = document.createElement("div");
  header.setAttribute("id", "header");
  header.setAttribute("class", "header");

  let title = document.createElement("h2");
  title.setAttribute("id", "title");
  title.textContent = "Battleship";

  header.appendChild(title);

  let footer = document.createElement("div");
  footer.setAttribute("id", "footer");
  footer.setAttribute("class", "footer");

  let footerText = document.createElement("h4");
  footerText.textContent = "Rules of battleship";

  footer.appendChild(footerText);

  container.appendChild(header);
  container.appendChild(gameContainer);
  container.appendChild(footer);

  document.body.appendChild(container);
}

function boardNotReady(isVertical, playerGameboard) {
  const playerBoard = document.getElementById("board1");
  const pcBoard = document.getElementById("board2");
  const flipBtn = document.getElementById("flipBtn");
  flipBtn.addEventListener("click", () => {
    if (isVertical) {
      isVertical = false;
    } else {
      isVertical = true;
    }
  });

  let numberOfShips = playerGameboard.allShips.length;
  const shipToPlace = [5, 4, 3, 3, 2];

  playerBoard.className = "playerBoardNotReady";
  pcBoard.className = "pcBoardNotReady";

  document.querySelectorAll("#board1 td").forEach((e) => {
    e.addEventListener("mouseover", function (e) {
      let x = e.target.parentElement.rowIndex;
      let y = e.target.cellIndex;

      if (
        (!isVertical && y + shipToPlace[numberOfShips] < 11) ||
        (isVertical && x + shipToPlace[numberOfShips] < 11)
      ) {
        for (let i = 0; i < shipToPlace[numberOfShips]; i++) {
          let shipCell = document.getElementById("board1").rows[x].cells[y];
          shipCell.classList.add("shipPlacement");
          if (!isVertical) {
            y += 1;
          } else {
            x += 1;
          }
        }
      } else {
        if (!isVertical) {
          do {
            let shipCell = document.getElementById("board1").rows[x].cells[y];
            shipCell.classList.add("invalidShip");
            y += 1;
          } while (y < 10);
        } else {
          do {
            let shipCell = document.getElementById("board1").rows[x].cells[y];
            shipCell.classList.add("invalidShip");
            x += 1;
          } while (x < 10);
        }
      }
    });
    e.addEventListener("mouseleave", function (e) {
      let x = e.target.parentElement.rowIndex;
      let y = e.target.cellIndex;

      if (
        (!isVertical && y + shipToPlace[numberOfShips] < 11) ||
        (isVertical && x + shipToPlace[numberOfShips] < 11)
      ) {
        for (let i = 0; i < shipToPlace[numberOfShips]; i++) {
          let shipCell = document.getElementById("board1").rows[x].cells[y];
          shipCell.classList.remove("shipPlacement");
          if (!isVertical) {
            y += 1;
          } else {
            x += 1;
          }
        }
      } else {
        if (!isVertical) {
          do {
            let shipCell = document.getElementById("board1").rows[x].cells[y];
            shipCell.classList.remove("invalidShip");
            y += 1;
          } while (y < 10);
        } else {
          do {
            let shipCell = document.getElementById("board1").rows[x].cells[y];
            shipCell.classList.remove("invalidShip");
            x += 1;
          } while (x < 10);
        }
      }
    });
    e.addEventListener("click", function (e) {
      let x = e.target.parentElement.rowIndex + 1;
      let y = e.target.cellIndex + 1;

      playerGameboard.placeShip(
        shipToPlace[numberOfShips],
        { x: x, y: y },
        isVertical
      );
      updateBoardWithShips(playerGameboard);
      numberOfShips += 1;

      if (playerGameboard.isBoardReady()) {
        boardReady();
        return;
      }
    });
  });
}

function boardReady() {
  const infoText = document.getElementById("infoText");
  infoText.textContent = "Your turn!";

  let playerBoard = document.getElementById("board1");
  const pcBoard = document.getElementById("board2");

  playerBoard.className = "playerBoardReady";
  pcBoard.className = "pcBoardReady";

  let newElement = playerBoard.cloneNode(true);
  playerBoard.parentNode.replaceChild(newElement, playerBoard);
}

export { renderPage, boardNotReady, boardReady };
