const RED = "RED";
const BLACK = "BLACK";

export const Colors = {
  RED,
  BLACK
}

export class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

export class BinaryNode {
  constructor(element) {
    this.element = element;
    this.left = null;
    this.right = null;
  }
}

export class DoubleNode extends Node {
  constructor(element, prev) {
    super(element);
    this.prev = prev;
  }
}

export class RedBlackNode extends BinaryNode {
  constructor(element) {
    super(element);
    this.color = Colors.RED;
    this.parent = null;    
  }

  isRed() {
    return this.color === Colors.RED;
  }
}