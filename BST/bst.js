class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.array = [...removeDublicates(mergeSort(array))];
    this.root = this.buildTree(this.array, 0, this.array.length - 1);
    this.preorderArray = [];
    this.inorderArray = [];
    this.postorderArray = [];
  }

  buildTree(array, start, end) {
    if (start > end) {
      return null;
    }
    let mid = parseInt((start + end) / 2);
    let node = new Node(array[mid]);

    node.left = this.buildTree(array, start, mid - 1);
    node.right = this.buildTree(array, mid + 1, end);

    return node;
  }

  insert(value, root = this.root) {
    if (root == null) {
      return (root = new Node(value));
    }
    if (root.data < value) {
      root.right = this.insert(value, root.right);
    } else {
      root.left = this.insert(value, root.left);
    }
    return root;
  }

  delete(value, root = this.root) {
    if (root == null) {
      return root;
    }
    if (value < root.data) {
      root.left = this.delete(value, root.left);
    } else if (value > root.data) {
      root.right = this.delete(value, root.right);
    } else {
      if (root.left == null) {
        return root.right;
      } else if (root.right == null) {
        return root.left;
      }
      root.data = minValue(root.right);
      root.right = this.delete(root.data, root.right);
    }
    return root;
  }

  find(value, root = this.root) {
    if (root == null) {
      return false;
    }
    if (root.data == value) {
      return root;
    }
    if (root.data > value) {
      return this.find(value, root.left);
    } else if (root.data < value) {
      return this.find(value, root.right);
    }
    return root;
  }

  levelOrder(root) {
    const queue = [];
    const result = [];

    if (root == null) return;

    queue.push(root);

    while (queue.length > 0) {
      let current = queue.shift(root);
      result.push(current.data);

      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
    }
    return result;
  }

  preorder(root) {
    if (root == null) return;

    if (root.data !== undefined) {
      this.preorderArray.push(root.data);
    }
    if (root.left !== null) {
      this.preorder(root.left);
    }
    if (root.right !== null) {
      this.preorder(root.right);
    }
  }

  inorder(root) {
    if (root == null) return;

    if (root.left !== null) {
      this.inorder(root.left);
    }
    if (root.data !== undefined) {
      this.inorderArray.push(root.data);
    }
    if (root.right !== null) {
      this.inorder(root.right);
    }
  }

  postorder(root) {
    if (root == null) return;

    if (root.left !== null) {
      this.postorder(root.left);
    }

    if (root.right !== null) {
      this.postorder(root.right);
    }

    if (root.data !== undefined) {
      this.postorderArray.push(root.data);
    }
  }

  height(root) {
    if (root == null) {
      return -1;
    } else {
      let left = this.height(root.left);
      let right = this.height(root.right);
      return Math.max(left, right) + 1;
    }
  }

  depth(node, root = this.root) {
    let depth = -1;

    if (node == null) return depth;

    if (
      root == node ||
      (depth = this.depth(node, root.left)) >= 0 ||
      (depth = this.depth(node, root.right) >= 0)
    ) {
      return depth + 1;
    }
    return depth;
  }

  isBalanced(root) {
    if (root == null) return false;

    let leftPart = root.left;
    let rightPart = root.right;

    if (Math.abs(this.height(leftPart) - this.height(rightPart)) > 1) {
      return false;
    } else {
      return true;
    }
  }

  rebalance() {
    if (this.isBalanced(this.root)) return this.root;

    let rebalanceArray = [];
    this.preorder(this.root);
    rebalanceArray = [...this.preorderArray];

    let balancedArray = new Tree(rebalanceArray);

    return balancedArray;
  }
}

function minValue(root) {
  let minV = root.data;
  while (root.left != null) {
    minV = root.left.data;
    root = root.left;
  }
  return minV;
}

function merge(left, right) {
  let sorted = [];

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      sorted.push(left.shift());
    } else {
      sorted.push(right.shift());
    }
  }
  return [...sorted, ...left, ...right];
}
function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  } else {
    let leftSide = arr.splice(0, Math.floor(arr.length / 2));
    let rightSide = arr;
    return merge(mergeSort(leftSide), mergeSort(rightSide));
  }
}

function removeDublicates(array) {
  return [...new Set(array)];
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// Driver
function driver() {
  function randomArr(length, max) {
    const randomArr = Array.from({ length }, () =>
      Math.floor(Math.random() * max)
    );

    return randomArr;
  }

  let newTree = new Tree(randomArr(20, 20));

  console.log(prettyPrint(newTree.root));
  console.log("Balanced:", newTree.isBalanced(newTree.root));

  console.log("Level order =>", newTree.levelOrder(newTree.root));
  newTree.preorder(newTree.root);
  console.log("Preorder =>", newTree.preorderArray);
  newTree.inorder(newTree.root);
  console.log("Inorder =>", newTree.inorderArray);
  newTree.postorder(newTree.root);
  console.log("Postorder =>", newTree.postorderArray);

  let newArr = randomArr(10, 50);
  for (let i = 0; i < newArr.length; i++) {
    newTree.insert(newArr[i]);
  }
  console.log(prettyPrint(newTree.root));
  console.log("Balanced:", newTree.isBalanced(newTree.root));

  newTree = newTree.rebalance();
  console.log(prettyPrint(newTree.root));
  console.log("Balanced:", newTree.isBalanced(newTree.root));
  console.log("Level order =>", newTree.levelOrder(newTree.root));
  newTree.preorder(newTree.root);
  console.log("Preorder =>", newTree.preorderArray);
  newTree.inorder(newTree.root);
  console.log("Inorder =>", newTree.inorderArray);
  newTree.postorder(newTree.root);
  console.log("Postorder =>", newTree.postorderArray);
}

driver();
