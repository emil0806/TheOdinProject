import createGameboard from "./gameboard";

const validName = (name, isPc) => {
  if (!name && !isPc) return "Player";
  if (!name && isPc) return "PC-Player";
  return name;
};

const playerAttack = ({ player, x, y }) => {
  return player.receiveAttack({ player, x, y });
};

const allPcAttacks = [];

const pcAttack = ({ player }) => {
  let x;
  let y;
  let numberOfAttacks = 0;

  const calcPcAttack = () => {
    x = Math.floor(Math.random() * (10 - 1 + 1) + 1);
    y = Math.floor(Math.random() * (10 - 1 + 1) + 1);
    checkValidAttack(x, y);
  };
  const checkValidAttack = (x, y) => {
    for (let i = 0; i < allPcAttacks.length; i++) {
      if (x === allPcAttacks[i].x && y === allPcAttacks[i].y) {
        calcPcAttack();
      }
    }
  };
  calcPcAttack();

  const coords = { x, y };
  allPcAttacks.push(coords);
  console.log(allPcAttacks);
  return player.receiveAttack({ x, y });
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

export { newPlayer };
