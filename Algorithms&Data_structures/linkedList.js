import { defaultEquals } from './utilts.js';
import { Node, DoubleNode } from './models/linked-list-model.js';

// 单向链表
export default class LinkedList {
  constructor(equalsFn = defaultEquals) {
    this.count = 0;
    this.head = null;
    this.equalsFn = equalsFn;
  }

  push(element) {
    const node = new Node(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = node;
    }
    this.count++
  }

  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head;
      if (index === 0) {
        this.head = current.next;
      } else {
        const previous = this.getElementAt(index-1);
        current = previous.next;
        previous.next = current.next;
      }
      this.count--;
      return current.element;
    }
    return null;
  }

  getElementAt(index) {
    if (index >= 0 && index < this.count) {
      let node = this.head;
      for (let i = 0; i < index && node !== null; i++) {
        node = node.next;
      }
      return node;
    }
    return null;
  }

  insert(element, index) {
    if (index >= 0 && index < this.count) {
      const node = new Node(element);
      if (index === 0) {
        const current = this.head;
        node.next = current;
        this.head = node;
      } else {
        const previous = this.getElementAt(index-1);
        const current = previous.next;
        previous.next = node;
        node.next = current;
      }
      this.count++;
      return true;
    } 
    return null;
  }

  indexOf(element) {
    let current = this.head;
    for (let i = 0; i < this.count; i++) {
      if (this.equalsFn(element, current.element)) {
        return i;
      }
      current = current.next;
    }
    return null;
  }

  remove(element) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }

  size() {
    return this.count;
  }
  
  isEmpty() {
    return this.size() === 0; 
  }

  getHead() {
    return this.head;
  }

  linkToString() {
    if (this.head == null) { 
      return '';
    }
    let objString = `${this.head.element}`;
    let current = this.head.next; 
    for (let i = 1; i < this.size() && current != null; i++) { 
      objString = `${objString}\n${current.element}`;
      current = current.next;
    }
    console.log(objString);
  }
}

// 双向链表
class DoublyLinkedList extends LinkedList {
  constructor(equalsFn=defaultEquals) {
    super(equalsFn);
    this.tail = null;
  }

  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new DoubleNode(element);
      let current = this.head;
      if (index === 0) {
        if (this.head === null) {
          this.head = node;
          this.tail = node;
        } else {
          node.next = this.head;
          current.prev = node;
          this.head = node;
        }

      } else if(index === this.count) {
        current = this.tail;
        current.next = node;
        node.prev = current
        this.tail = node;
      } else {
        const previous = this.getElementAt(index - 1);
        const current = previous.next;
        previous.next = node;
        node.prev = previous;
        node.next = current;
        current.prev = node;
      }
      this.count++
      return true;
    }
    return null;
  }

  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head;
      if (index === 0) {
        this.head = current.next;
        if (current === null) {
          return null;
        } else if(this.count === 1) {
          this.tail = null;
        } else {
          this.head.prev = null;
        }
      } else if(index === this.count-1) {
        current = this.tail;
        this.tail = current.prev;
        this.tail.next = null;
      } else {
        current = this.getElementAt(index);
        const previous = current.prev;
        previous.next = current.next;
        current.next.prev = previous;
      }
      this.count--;
      return current.element;
    }
    return null;
  }
}

// 循环列表
class CircularLinkedList extends LinkedList {
  constructor(equalsFn=defaultEquals) {
    super(equalsFn);
  }

  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element);
      let current = this.head;
      if (index === 0) {
        if (this.head === null) {
          this.head = node;
          node.next = this.head;
        } else {
          node.next = current;
          current = this.getElementAt(this.size());
          current.next = node;
          this.head = node;
        }

      } else {
        const previous = this.getElementAt(index - 1);
        node.next = previous.next;
        previous.next = node;
      }
      this.count++;
      return true;
    }
    return null;
  }

  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head;
      if (index === 0) {
        if (current === null) {
          return null
        } else if(this.size() === 1){
          this.head = null;
        } else {
          const removed = this.head;
          current = this.getElementAt(this.size());
          this.head = this.head.next;
          current.next = this.head;
          current = removed;
        }
      } else {
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        previous.next = current.next;
      }
      this.count--;
      return current.element;
    }
    return null;
  }
}


const linkItem = new LinkedList()
linkItem.push(1);
linkItem.push(2);
linkItem.push(3);
linkItem.insert(5,2);
linkItem.remove(5);
linkItem.linkToString();

const DoublyItem = new DoublyLinkedList();
DoublyItem.insert(3, 0);
DoublyItem.insert(4, 1);
DoublyItem.insert(5, 2);
DoublyItem.insert(6, 3);
DoublyItem.removeAt(2);
DoublyItem.linkToString();

const CircularItem = new CircularLinkedList();
CircularItem.insert(19, 0);
CircularItem.insert(20, 1);
CircularItem.insert(21, 2);
CircularItem.insert(23, 3);
CircularItem.insert(24, 4);
CircularItem.removeAt(2);
CircularItem.linkToString();