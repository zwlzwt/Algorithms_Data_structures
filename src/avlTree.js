import { BinarySearchTree } from "./binarySearchTree.js";
import { compare, defaultCompare } from "./utilts.js";
import { BinaryNode } from "./models/linked-list-model.js";

class AVLTree extends BinarySearchTree{
  constructor(compareFn=defaultCompare) {
    super(compareFn);
  }

  getNodeHeight(node) {
    if (node === null) {
      return -1;
    }
    return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right))+1;
  }

  insert(key) {
    this.root = this.insertNode(this.root, key);
  }

  insertNode(node, key) {
    if (node === null) {
      node = new BinaryNode(key);
    } else if (this.compareFn(key, node.element) === compare.LESS_THAN) {
      node.left = this.insertNode(node.left, key);
      if ((this.getNodeHeight(node.left) - this.getNodeHeight(node.right)) > 1) {
        if (this.compareFn(key, node.left.element) === compare.LESS_THAN) {
          node = this.rotationLL(node);
        } else {
          node = this.rotationLR(node);
        }
      }
    } else if (this.compareFn(key, node.element) === compare.BIGGER_THAN) {
      node.right = this.insertNode(node.right, key);
      if ((this.getNodeHeight(node.right) - this.getNodeHeight(node.left)) > 1) {
        if (this.compareFn(key, node.right.element) === compare.BIGGER_THAN) {
          node = this.rotationRR(node);
        } else {
          node = this.rotationRL(node);
        }
      }
    } 
    return node;
  }

  remove(key) {
    this.root = this.removeNode(this.root, key);
  }
  
  removeNode(node, key) {
    node = super.removeNode(node, key);
    if (node === null) {
      return null;
    }
    // balance
    if ((this.getNodeHeight(node.left) - this.getNodeHeight(node.right)) > 1) {
      if (key < node.left.element) {
        node = this.rotationLR(node);
      } else {
        node = this.rotationLL(node);
      }
    }
    if ((this.getNodeHeight(node.right) - this.getNodeHeight(node.left)) > 1) {
      if (key > node.right.element) {
        node = this.rotationRL(node);
      } else {
        node = this.rotationRR(node);
      }
    }
    return node;
  }

  // four kinds of rotation
  rotationLL(node) {
    const tmp = node.left;
    node.left = tmp.right;
    tmp.right = node;
    return tmp;
  }

  rotationRR(node) {
    const tmp = node.right;
    node.right = tmp.left;
    tmp.left = node;
    return tmp;
  }

  rotationLR(node) {
    node.left = this.rotationRR(node.left);
    return this.rotationLL(node);
  }

  rotationRL(node) {
    node.right = this.rotationLL(node.right);
    return this.rotationRR(node);
  }

}

const AVLTreeInstance = new AVLTree();

AVLTreeInstance.insert(11);
AVLTreeInstance.insert(7);
AVLTreeInstance.insert(15);
AVLTreeInstance.insert(5);
AVLTreeInstance.insert(3);
AVLTreeInstance.insert(9);
AVLTreeInstance.insert(10);
AVLTreeInstance.insert(13);
AVLTreeInstance.insert(12);
AVLTreeInstance.insert(14);
AVLTreeInstance.insert(20);
AVLTreeInstance.insert(18);
AVLTreeInstance.insert(25);
AVLTreeInstance.insert(6);
console.log(AVLTreeInstance)

const printNode = (element) => console.log(element)
AVLTreeInstance.inOrderTraverse(printNode);
console.log(AVLTreeInstance.min());
console.log(AVLTreeInstance.max());
console.log(AVLTreeInstance.search(60) ? "find it" : "don't have it");
console.log(AVLTreeInstance.search(14) ? "find it" : "don't have it");
AVLTreeInstance.remove(14);
console.log(AVLTreeInstance.search(14) ? "find it" : "don't have it");

