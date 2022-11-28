class Node {
  constructor(data) {
    this.data = data;
    this.right = null;
    this.left = null;
  }
}

class Tree {
  constructor(array) {
    this.array = this.filteredAndSortedArray(array);
    this.root = this.buildTree(this.array);
  }
  filteredAndSortedArray(arr) {
    let newArray = arr
      .sort((a, b) => a - b)
      .filter((number, i, array) => {
        return !i || number > array[i - 1];
      });
    return newArray;
  }
  buildTree(arr) {
    if (arr.length < 1) return null;
    if (arr.length === 1) return new Node(arr[0]);
    let mid = Math.floor(arr.length / 2);
    let root = new Node(arr[mid]);
    root.left = this.buildTree(arr.slice(0, mid));
    root.right = this.buildTree(arr.slice(mid + 1));
    return root;
  }
  find(value) {
    if (!this.root) return "The tree is empty";
    let node = this.root;
    while (node) {
      if (node.data === value) return node;
      if (node.data > value) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
    return null;
  }
  insert(value) {
    let newNode = new Node(value);
    if (!this.root) return (this.root = newNode);
    let isInserted = false;
    let currentNode = this.root;
    while (!isInserted) {
      if (value < currentNode.data) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          isInserted = true;
        } else {
          currentNode = currentNode.left;
        }
      } else if (value > currentNode.data) {
        if (!currentNode.right) {
          currentNode.right = newNode;
          isInserted = true;
        } else {
          currentNode = currentNode.right;
        }
      } else {
        return "Value already exists!";
      }
    }
  }

  delete(value) {
    this.root = this.deleteRec(value, this.root);
    prettyPrint(this.root);
  }

  deleteRec(value, root) {
    if (!root) return null;
    if (value === root.data) {
      if (!root.left && !root.right) {
        return null;
      } else if (root.right && !root.left) {
        return root.right;
      } else if (root.left && !root.right) {
        return root.left;
      } else {
        root.data = this.minValue(root.right);
        root.right = this.deleteRec(root.data, root.right);
        return root;
      }
    } else if (value < root.data) {
      root.left = this.deleteRec(value, root.left);
    } else if (value > root.data) {
      root.right = this.deleteRec(value, root.right);
    }
    return root;
  }
  minValue(root) {
    let min = root.data;
    while (root.left) {
      min = root.left.data;
      root = root.left;
    }
    return min;
  }
  levelOrderIterative(cb) {
    let arr = [];
    let queue = [];
    queue.push(this.root);
    while (queue.length) {
      let node = queue.shift();
      cb ? cb(node.data) : arr.push(node.data);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return arr;
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (!node) return console.log("Tree is empty!");
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
