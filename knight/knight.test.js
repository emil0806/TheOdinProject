const knightMoves = require("./src/index");

test("Check moves", () => {
  expect(knightMoves([2, 0], [7, 6])).toBe(5);
});
