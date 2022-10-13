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
  let x = Math.floor(Math.random() * (10 - 1 + 1) + 1);
  let y = Math.floor(Math.random() * (10 - 1 + 1) + 1);
  const checkValidAttack = (x, y) => {
    for (let i = 0; i < allPcAttacks.length; i++) {
      if (x === allPcAttacks[i].x && y === allPcAttacks[i].y) {
        return false;
      }
    }
    return true;
  };

  do {
    x = Math.floor(Math.random() * (10 - 1 + 1) + 1);
    y = Math.floor(Math.random() * (10 - 1 + 1) + 1);
  } while (checkValidAttack(x, y) == false);

  const coords = { x, y };
  allPcAttacks.push(coords);
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
