import { BinaryNode } from './Algorithms&Data_structures/models/linked-list-model.js.js';
import { compare, defaultCompare } from './utilts.js';

export class BinarySearchTree {
  constructor(compareFn=defaultCompare) {
    this.compareFn = compareFn;
    this.root = null;
  }

  insert(key) {
    if (this.root === null) {
      this.root = new BinaryNode(key);
    }else {
      this.insertNode(this.root, key);
    }
  }
  
  
  insertNode(node, key) {
    if (this.compareFn(key, node.element) === compare.LESS_THAN) {
      if (node.left === null) {
        node.left = new BinaryNode(key);
      } else {
        this.insertNode(node.left, key);
      }
    } else if (this.compareFn(key, node.element) === compare.BIGGER_THAN) {
      if (node.right === null) {
        node.right = new BinaryNode(key);
      } else {
        this.insertNode(node.right, key);
      }
    } else {
      return node;
    }
  }

  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback);
  }

  inOrderTraverseNode(node, callback) {
    if (node !== null) {
      // callback(node.element); preOrder
      this.inOrderTraverseNode(node.left, callback);
      callback(node.element, node.color);
      this.inOrderTraverseNode(node.right, callback);
      // callback(node.element); postOrder
    }
  }

  min() {
    return this.minNode(this.root);
  }

  minNode(node) {
    let current = node;
    while(current !== null && current.left !== null) {
      current = current.left;
    }
    return current;
  }

  max() {
    return this.maxNode(this.root);
  }

  maxNode(node) {
    let current = node;
    while (current != null && current.right != null) {
      current = current.right;
    }
    return current;
  }

  search(key) {
    return this.searchNode(this.root, key);
  }

  searchNode(node, key) {
    if (node === null) {
      return null;
    }
    if (this.compareFn(key, node.element) === compare.LESS_THAN) {
      return this.searchNode(node.left, key);
    } else if(this.compareFn(key, node.element) === compare.BIGGER_THAN) {
      return this.searchNode(node.right, key);
    } else {
      return true;
    }
  }

  remove(key) {
    this.root = this.removeNode(this.root, key);
  }

  removeNode(node, key) {
    if (node === null) {
      return null;
    }
    if (this.compareFn(key, node.element) === compare.LESS_THAN) {
      node.left = this.removeNode(node.left, key);
      return node;
    }
    if (this.compareFn(key, node.element) === compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right, key);
      return node;
    }
    else {
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }
      else if(node.left === null) {
        node = node.right;
        return node;
      } else if(node.right === null) {
        node = node.left;
        return node;
      } else {
        const aux = this.minNode(node.right);
        node.element = aux.element;
        node.right = this.removeNode(node.right, aux.element);
        return node;
      }
      
    }
  }
}

// const tree = new BinarySearchTree();
// tree.insert(11);
// tree.insert(7);
// tree.insert(15);
// tree.insert(5);
// tree.insert(3);
// tree.insert(9);
// tree.insert(10);
// tree.insert(13);
// tree.insert(12);
// tree.insert(14);
// tree.insert(20);
// tree.insert(18);
// tree.insert(25);
// tree.insert(6);
// console.log(tree)

// const printNode = (element) => console.log(element)
// tree.inOrderTraverse(printNode);
// console.log(tree.min());
// console.log(tree.max());
// console.log(tree.search(60) ? "find it" : "don't have it");
// console.log(tree.search(14) ? "find it" : "don't have it");
// tree.remove(14);
