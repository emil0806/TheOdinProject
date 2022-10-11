import createShip from "./ship";

const createGameboard = () => {
  const board = [];
  for (let i = 0; i < 10; i++) {
    const row = [];
    for (let j = 0; j < 10; j++) {
      row.push("~");
    }
    board.push(row);
  }
  let allShips = [];
  let allShipsData = [];

  const placeShip = (ship, { x, y }, isVertical = false) => {
    const newShip = createShip(ship);

    const shipData = [];
    for (let i = 0; i < newShip.getLength(); i++) {
      board[x - 1][y - 1] = "O";
      shipData.push({ x, y });
      if (isVertical) {
        x += 1;
      } else {
        y += 1;
      }
    }
    allShipsData.push(shipData);
    allShips.push(newShip);
    return newShip;
  };

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j] = "~";
      }
    }
    allShips.splice(0, allShips.length);
    allShipsData.splice(0, allShipsData.length);
  };

  const receiveAttack = ({ x, y }) => {
    if (board[x - 1][y - 1] === "O") {
      for (let i = 0; i < allShipsData.length; i++) {
        for (let j = 0; j < allShipsData[i].length; j++) {
          if (allShipsData[i][j].x == x && allShipsData[i][j].y == y) {
            allShips[i].hit(j + 1);
          }
        }
      }
      board[x - 1][y - 1] = "X";
      return true;
    } else {
      board[x - 1][y - 1] = "*";
      return false;
    }
  };

  const isAllShipsSunk = () => {
    let checkIfSunk = true;
    for (let i = 0; i < allShips.length; i++) {
      if (!allShips[i].isSunk()) {
        checkIfSunk = false;
        break;
      }
    }
    return checkIfSunk;
  };

  const isBoardReady = () => {
    if (allShips.length == 5) {
      return true;
    } else {
      return false;
    }
  };
  const displayBoard = () => {
    return board;
  };

  return {
    displayBoard,
    placeShip,
    resetBoard,
    receiveAttack,
    isAllShipsSunk,
    isBoardReady,
    allShips,
  };
};

export default createGameboard;
