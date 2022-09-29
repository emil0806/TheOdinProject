"use strict";
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["main"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/gameboard */ "./src/modules/gameboard.js");


console.log((0,_modules_gameboard__WEBPACK_IMPORTED_MODULE_0__.createGameboard)().displayBoard());


/***/ }),

/***/ "./src/modules/gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createGameboard": () => (/* binding */ createGameboard)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/modules/ship.js");


const createGameboard = () => {
  const board = [];
  for (let i = 0; i < 10; i++) {
    const row = [];
    for (let j = 0; j < 10; j++) {
      row.push("~");
    }
    board.push(row);
  }

  const allShips = [];
  const allShipsData = [];

  const placeShip = (ship, { x, y }, isVertical = false) => {
    const newShip = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(ship);

    // const shipData = [];
    for (let i = 0; i < newShip.getLength(); i++) {
      board[x - 1][y - 1] = "O";
      // shipData.push({ x, y });
      if (isVertical) {
        x += 1;
      } else {
        y += 1;
      }
    }
    // allShipsData.push(shipData);
    // allShips.push(newShip);
    return newShip;
  };

  const receiveAttack = ({ x, y }) => {
    if (board[x - 1][y - 1] === "O") {
      for (let i = 0; i < allShipsData.length; i++) {
        for (let j = 0; j < allShipsData[i].length; j++) {
          if (allShipsData[i][j].x == x && allShipsData[i][j].y == y) {
            allShips[i].hit(j);
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

  const displayBoard = () => {
    return board;
  };

  return { displayBoard, placeShip, receiveAttack };
};




/***/ }),

/***/ "./src/modules/ship.js":
/*!*****************************!*\
  !*** ./src/modules/ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createShip": () => (/* binding */ createShip)
/* harmony export */ });
const maxLength = 5;
const minLength = 2;

const adjustLength = (length) => {
  if (length > maxLength) return maxLength;
  if (length < minLength) return minLength;
  return length;
};

const isInRange = (position) => {
  if (minLength <= position && maxLength >= position) {
    return true;
  } else {
    return false;
  }
};

const createShip = (length) => {
  const shipLength = adjustLength(length);
  const lives = [];
  for (let i = 0; i < length; i++) {
    lives.push("O");
  }

  const getLength = () => {
    return shipLength;
  };

  const hit = (position) => {
    if (isInRange(position)) {
      lives[position - 1] = "X";
    }
    return lives;
  };
  const isSunk = () => {
    let shipSunk = false;
    for (let i = 0; i < shipLength; i++) {
      if (lives[i] === "O") {
        shipSunk = false;
      } else {
        shipSunk = true;
      }
    }
    return shipSunk;
  };
  return { getLength, hit, isSunk };
};




/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFzRDs7QUFFdEQsWUFBWSxtRUFBZTs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZLOztBQUVoQztBQUNBO0FBQ0Esa0JBQWtCLFFBQVE7QUFDMUI7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDZCQUE2QixNQUFNO0FBQ25DLG9CQUFvQixpREFBVTs7QUFFOUI7QUFDQSxvQkFBb0IseUJBQXlCO0FBQzdDO0FBQ0EseUJBQXlCLE1BQU07QUFDL0I7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkIsTUFBTTtBQUNqQztBQUNBLHNCQUFzQix5QkFBeUI7QUFDL0Msd0JBQXdCLDRCQUE0QjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYOztBQUUyQjs7Ozs7Ozs7Ozs7Ozs7O0FDekQzQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsWUFBWTtBQUM5QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGdCQUFnQjtBQUNwQztBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7O0FBRXNCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9zaGlwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUdhbWVib2FyZCB9IGZyb20gXCIuL21vZHVsZXMvZ2FtZWJvYXJkXCI7XG5cbmNvbnNvbGUubG9nKGNyZWF0ZUdhbWVib2FyZCgpLmRpc3BsYXlCb2FyZCgpKTtcbiIsImltcG9ydCBjcmVhdGVTaGlwIGZyb20gXCIuL3NoaXBcIjtcblxuY29uc3QgY3JlYXRlR2FtZWJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBib2FyZCA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBjb25zdCByb3cgPSBbXTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgIHJvdy5wdXNoKFwiflwiKTtcbiAgICB9XG4gICAgYm9hcmQucHVzaChyb3cpO1xuICB9XG5cbiAgY29uc3QgYWxsU2hpcHMgPSBbXTtcbiAgY29uc3QgYWxsU2hpcHNEYXRhID0gW107XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXAsIHsgeCwgeSB9LCBpc1ZlcnRpY2FsID0gZmFsc2UpID0+IHtcbiAgICBjb25zdCBuZXdTaGlwID0gY3JlYXRlU2hpcChzaGlwKTtcblxuICAgIC8vIGNvbnN0IHNoaXBEYXRhID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdTaGlwLmdldExlbmd0aCgpOyBpKyspIHtcbiAgICAgIGJvYXJkW3ggLSAxXVt5IC0gMV0gPSBcIk9cIjtcbiAgICAgIC8vIHNoaXBEYXRhLnB1c2goeyB4LCB5IH0pO1xuICAgICAgaWYgKGlzVmVydGljYWwpIHtcbiAgICAgICAgeCArPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgeSArPSAxO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBhbGxTaGlwc0RhdGEucHVzaChzaGlwRGF0YSk7XG4gICAgLy8gYWxsU2hpcHMucHVzaChuZXdTaGlwKTtcbiAgICByZXR1cm4gbmV3U2hpcDtcbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHsgeCwgeSB9KSA9PiB7XG4gICAgaWYgKGJvYXJkW3ggLSAxXVt5IC0gMV0gPT09IFwiT1wiKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbFNoaXBzRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGFsbFNoaXBzRGF0YVtpXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGlmIChhbGxTaGlwc0RhdGFbaV1bal0ueCA9PSB4ICYmIGFsbFNoaXBzRGF0YVtpXVtqXS55ID09IHkpIHtcbiAgICAgICAgICAgIGFsbFNoaXBzW2ldLmhpdChqKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJvYXJkW3ggLSAxXVt5IC0gMV0gPSBcIlhcIjtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBib2FyZFt4IC0gMV1beSAtIDFdID0gXCIqXCI7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlCb2FyZCA9ICgpID0+IHtcbiAgICByZXR1cm4gYm9hcmQ7XG4gIH07XG5cbiAgcmV0dXJuIHsgZGlzcGxheUJvYXJkLCBwbGFjZVNoaXAsIHJlY2VpdmVBdHRhY2sgfTtcbn07XG5cbmV4cG9ydCB7IGNyZWF0ZUdhbWVib2FyZCB9O1xuIiwiY29uc3QgbWF4TGVuZ3RoID0gNTtcbmNvbnN0IG1pbkxlbmd0aCA9IDI7XG5cbmNvbnN0IGFkanVzdExlbmd0aCA9IChsZW5ndGgpID0+IHtcbiAgaWYgKGxlbmd0aCA+IG1heExlbmd0aCkgcmV0dXJuIG1heExlbmd0aDtcbiAgaWYgKGxlbmd0aCA8IG1pbkxlbmd0aCkgcmV0dXJuIG1pbkxlbmd0aDtcbiAgcmV0dXJuIGxlbmd0aDtcbn07XG5cbmNvbnN0IGlzSW5SYW5nZSA9IChwb3NpdGlvbikgPT4ge1xuICBpZiAobWluTGVuZ3RoIDw9IHBvc2l0aW9uICYmIG1heExlbmd0aCA+PSBwb3NpdGlvbikge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuY29uc3QgY3JlYXRlU2hpcCA9IChsZW5ndGgpID0+IHtcbiAgY29uc3Qgc2hpcExlbmd0aCA9IGFkanVzdExlbmd0aChsZW5ndGgpO1xuICBjb25zdCBsaXZlcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgbGl2ZXMucHVzaChcIk9cIik7XG4gIH1cblxuICBjb25zdCBnZXRMZW5ndGggPSAoKSA9PiB7XG4gICAgcmV0dXJuIHNoaXBMZW5ndGg7XG4gIH07XG5cbiAgY29uc3QgaGl0ID0gKHBvc2l0aW9uKSA9PiB7XG4gICAgaWYgKGlzSW5SYW5nZShwb3NpdGlvbikpIHtcbiAgICAgIGxpdmVzW3Bvc2l0aW9uIC0gMV0gPSBcIlhcIjtcbiAgICB9XG4gICAgcmV0dXJuIGxpdmVzO1xuICB9O1xuICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4gICAgbGV0IHNoaXBTdW5rID0gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChsaXZlc1tpXSA9PT0gXCJPXCIpIHtcbiAgICAgICAgc2hpcFN1bmsgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNoaXBTdW5rID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNoaXBTdW5rO1xuICB9O1xuICByZXR1cm4geyBnZXRMZW5ndGgsIGhpdCwgaXNTdW5rIH07XG59O1xuXG5leHBvcnQgeyBjcmVhdGVTaGlwIH07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=