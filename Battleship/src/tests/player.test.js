import createGameboard from "../modules/gameboard";
import { newPlayer } from "../modules/player";
import { calcPcAttack } from "../modules/player";

const createBoardWithShips = () => {
  const board = createGameboard();

  board.placeShip(4, { x: 2, y: 3 });
  board.placeShip(2, { x: 6, y: 7 });
  board.placeShip(5, { x: 4, y: 2 }, true);
  board.placeShip(2, { x: 5, y: 4 }, true);

  return board;
};

describe("player", () => {
  it("create player with name = Cap", () => {
    expect(
      newPlayer({ name: "Cap", board: createBoardWithShips() }).getName()
    ).toBe("Cap");
  });

  it("name = Player is default", () => {
    expect(newPlayer({ board: createBoardWithShips() }).getName()).toBe(
      "Player"
    );
  });
  it("create PC player", () => {
    expect(
      newPlayer({ board: createBoardWithShips(), isPc: true }).getName()
    ).toBe("PC-Player");
  });

  it("return true if player hit a ship", () => {
    const board = createBoardWithShips();
    const player1 = newPlayer({ board });
    const player2 = newPlayer({ board });

    expect(player1.attack({ player: player2, x: 2, y: 3 })).toBe(true);
    expect(player1.attack({ player: player2, x: 9, y: 9 })).toBe(false);
  });

  it("test if pc attack is random", () => {
    const firstAttack = calcPcAttack();
    expect(calcPcAttack).not.toBe(firstAttack);
  });
});
