// Function to create new node
const node = (x = null, y = null, parentNode = null) => {
  return {
    x,
    y,
    parentNode,
  };
};
// All possible moves for knight
const possibleMoves = [
  [1, 2],
  [1, -2],
  [-1, 2],
  [-1, -2],
  [2, 1],
  [2, -1],
  [-2, 1],
  [-2, -1],
];
// Gameboard function
const gameBoard = (start, end, queue = [], parentNode = null) => {
  // Creates start node by calling function node
  let startNode = node(...start, parentNode);
  // Creates end node by calling function node
  let endNode = node(...end, parentNode);
  // Temporary queue
  let tempQueue = [];
  // Loops through the possible moves to make sure none of them goes out of the gameboard
  possibleMoves.forEach((move) => {
    if (
      startNode.x + move[0] >= 0 &&
      startNode.x + move[0] < 8 &&
      startNode.y + move[1] >= 0 &&
      startNode.y + move[1] < 8
    ) {
      const x = startNode.x + move[0];
      const y = startNode.y + move[1];
      tempQueue.push(node(x, y, startNode));
      queue.push(node(x, y, startNode));
    }
  });

  let result = tempQueue.filter((node) => {
    return node.x === endNode.x && node.y === endNode.y;
  });

  if (result[0] === undefined) {
    const nextNode = queue.shift();
    result = gameBoard(
      [nextNode.x, nextNode.y],
      end,
      queue,
      nextNode.parentNode
    );
  }

  return result;
};
// Function for knight moves
const knightMoves = (start, end) => {
  console.log(start, end);
  for (let i = 0; i < 2; i++) {
    if (start[i] > 7 || end[i] > 7) {
      console.log("Please start on gameboard!");
      return;
    }
  }
  const move = gameBoard(start, end);

  let currentNode = move[0];
  let count = 0;
  let path = "";

  while (currentNode !== null) {
    path = `[${currentNode.x}, ${currentNode.y}]\n${path}`;
    currentNode = currentNode.parentNode;
    count++;
  }

  console.log(`You made it in ${count - 1} moves!`);
  console.log("Here's your path:");
  console.log(path);
};

knightMoves([2, 0], [7, 6]);
