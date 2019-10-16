import { BinarySearchTree } from "./binarySearchTree.js";
import { defaultCompare, compare } from "./utilts.js";
import { RedBlackNode, Colors } from "./models/linked-list-model.js";

class RedBlackTree extends BinarySearchTree {
  constructor(compareFn=defaultCompare) {
    super(compareFn);
  }

  insert(key) {
    if (this.root === null) { 
      this.root = new RedBlackNode(key);
      this.root.color = Colors.BLACK;
    } else {
      const newNode = this.insertNode(this.root, key);
      this.fixTreeProperties(newNode);
    }
  }

  insertNode(node, key) {
    if (this.compareFn(key, node.element) === compare.LESS_THAN) {
      if (node.left === null) {
        node.left = new RedBlackNode(key);
        node.left.parent = node;
        return node;
      } else {
        return this.insertNode(node.left, key);
      }
    } else if (this.compareFn(key, node.element) === compare.BIGGER_THAN) {
      if (node.right === null) {
        node.right = new RedBlackNode(key);
        node.right.parent = node;
        return node;
      }
      else {
        return this.insertNode(node.right, key);
      }
    } else if (node.isRed(node.left) && node.isRed(node.right))  {
      node.left.color = Colors.BLACK;
      node.right.color = Colors.BLACK;
    } else {
      return node;
    }
  }

  rotationLL(node) {
    const tmp = node.left;
    node.left = tmp.right;
    if (tmp.right && tmp.right.element) {
      tmp.right.parent = node;
    }
    tmp.parent = node.parent;
    if (!node.parent) {
      this.root = tmp;
    } else {
      if (node === node.parent.left) {
        node.parent.left = tmp;
      }
      else {
        node.parent.right = tmp;
      }
    }
    tmp.right = node;
    node.parent = tmp;
  }

  rotationRR(node) {
    const tmp = node.right;
    node.right = tmp.left;
    if (tmp.left && tmp.left.element) {
      tmp.left.parent = node;
    }
    tmp.parent = node.parent;
    if (!node.parent) {
      this.root = tmp;
    }
    else {
      if (node === node.parent.left) {
        node.parent.left = tmp;
      }
      else {
        node.parent.right = tmp;
      }
    }
    tmp.left = node;
    node.parent = tmp;
  }

  fixTreeProperties(node) {
    while (node && node.parent && node.parent.isRed() && node.color !== Colors.BLACK) {
      let parent = node.parent;
      const grandParent = parent.parent;
      if (grandParent && grandParent.left === parent) {
        const uncle = grandParent.right;
        if (uncle && uncle.color === Colors.RED) {
          grandParent.color = Colors.RED;
          parent.color = Colors.BLACK;
          uncle.color = Colors.BLACK;
          node = grandParent;
        } else {
          if (node === parent.right) {
            this.rotationRR(parent);
            node = parent;
            parent = node.parent;
          } else {
            this.rotationLL(grandParent);
            parent.color = Colors.BLACK;
            grandParent.color = Colors.RED;
            node = parent;
          }
        }
      } else {
        const uncle = grandParent.left;
        if (uncle && uncle.color === Colors.RED) {
          grandParent.color = Colors.RED;
          parent.color = Colors.BLACK;
          uncle.color = Colors.BLACK;
          node = grandParent;
        } else {
          if (node === parent.left) {
            this.rotationLL(parent);
            node = parent;
            parent = node.parent;
          } else {
            this.rotationRR(grandParent);
            parent.color = Colors.BLACK;
            grandParent.color = Colors.RED;
            node = parent;
          }
        }
      }
    }
    this.root.color = Colors.BLACK;
  }
}
const redBlackTree = new RedBlackTree();


redBlackTree.insert(11);
redBlackTree.insert(7);
redBlackTree.insert(15);
redBlackTree.insert(5);
redBlackTree.insert(3);
redBlackTree.insert(9);
redBlackTree.insert(10);
redBlackTree.insert(13);
redBlackTree.insert(12);
redBlackTree.insert(14);
redBlackTree.insert(20);
redBlackTree.insert(18);
redBlackTree.insert(25);
redBlackTree.insert(6);
console.log(redBlackTree)

const printNode = (element, color) => console.log(element, color)
redBlackTree.inOrderTraverse(printNode);
// console.log(redBlackTree.min());
// console.log(redBlackTree.max());
// console.log(redBlackTree.search(60) ? "find it" : "don't have it");
// console.log(redBlackTree.search(14) ? "find it" : "don't have it");
// redBlackTree.remove(14);
// console.log(redBlackTree.search(14) ? "find it" : "don't have it");
