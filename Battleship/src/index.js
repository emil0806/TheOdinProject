import { renderPage } from "./modules/renderPage";
import { newGame } from "./modules/game";
import {
  updatePcBoardAfterAttack,
  updatePlayerBoardAfterAttack,
} from "./modules/updateBoards";
import createGameboard from "./modules/gameboard";
import "./css/styles.css";

renderPage();

newGame();
