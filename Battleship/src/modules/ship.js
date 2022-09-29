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

export default createShip;
