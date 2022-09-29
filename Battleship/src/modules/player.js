import createGameboard from "./gameboard";

const validName = (name, isPc) => {
  if (!name && !isPc) return "Player";
  if (!name && isPc) return "PC-Player";
  return name;
};

const playerAttack = ({ player, x, y }) => {
  return player.receiveAttack({ x, y });
};

const allPcAttacks = [];

const calcPcAttack = () => {
  let x = Math.floor(Math.random() * 10);
  let y = Math.floor(Math.random() * 10);
  let coords = checkValidAttack(x, y);
  return coords;
};

const checkValidAttack = (x, y) => {
  for (let i = 0; i < allPcAttacks.length; i++) {
    if (x === allPcAttacks[i].x && y === allPcAttacks[i].y) {
      calcPcAttack();
    }
  }
  return { x, y };
};

const pcAttack = ({ player }) => {
  const coords = calcPcAttack();

  return player.receiveAttack(coords);
};

const newPlayer = ({ name = "", board, isPc = false }) => {
  const getName = () => {
    const playerName = validName(name, isPc);
    return playerName;
  };
  const receiveAttack = board.receiveAttack.bind(board);
  const attack = isPc ? pcAttack : playerAttack;

  return { getName, receiveAttack, attack };
};

export { newPlayer, calcPcAttack };
