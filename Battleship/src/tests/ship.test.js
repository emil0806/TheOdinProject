import createShip from "../modules/ship";

describe("createShip", () => {
  it("creates ship with length 3", () => {
    expect(createShip(3).getLength()).toBe(3);
  });
  it("length = 5, when given higher than 5", () => {
    expect(createShip(8).getLength()).toBe(5);
  });
  it("length = 2, when given lower than 2", () => {
    expect(createShip(0).getLength()).toBe(2);
  });

  it("hit ship in position 2", () => {
    expect(createShip(4).hit(2)).toStrictEqual(["O", "X", "O", "O"]);
  });
  it("missed ship with length 4", () => {
    expect(createShip(4).hit(10)).toStrictEqual(["O", "O", "O", "O"]);
  });
  it("missed ship with length 2", () => {
    expect(createShip(2).hit(0)).toStrictEqual(["O", "O"]);
  });

  it("determine whether ship is sunk", () => {
    const ship = createShip(4);
    expect(ship.isSunk()).toBe(false);
    ship.hit(1);
    expect(ship.isSunk()).toBe(false);
    ship.hit(2);
    expect(ship.isSunk()).toBe(false);
    ship.hit(3);
    expect(ship.isSunk()).toBe(false);
    ship.hit(4);
    expect(ship.isSunk()).toBe(true);
  });
});
