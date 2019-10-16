const items = new WeakMap();

function PriorityQueue(element, priority) {
  this.element = element;
  this.priority = priority;
}

// queue priority
export default class Queue {
  constructor () {
    items.set(this, []);
  }

  enqueue(element, priority) {
    const itemsEntities = items.get(this);
    let added = false;
    let queueElement = new PriorityQueue(element, priority);
    for (let i = 0;  i < itemsEntities.length; i++) {
      if (queueElement.priority < itemsEntities[i].priority) {
        itemsEntities.splice(i, 0, queueElement);
        added = true;
        break;
      }
    }
    if (!added) {
      itemsEntities.push(queueElement);
    }
  }

  dequeue() {
    return items.get(this).shift();
  }

  front() {
    let queueItems = items.get(this);
    return queueItems[0];
  }
  clear() {
    let queueItems = items.get(this);
    queueItems = [];
  }

  size() {
    return items.get(this).length;
  }

  print() {
    let queueItems = items.get(this);
    console.log(queueItems)
  }

  isEmpty() {
    return items.get(this).length === 0;
  }
}

let queue1 = new Queue();
queue1.isEmpty();
queue1.enqueue('zhao', 3);
queue1.enqueue('wei', 3);
queue1.enqueue('long', 2);
queue1.enqueue('zhang', null);
queue1.enqueue('wan', 1);
queue1.enqueue('tian', 1);
// queue1.dequeue();
queue1.size();
queue1.isEmpty();
queue1.print();

// hot potato queue Loop

function hotPotato(nameList, num) {

  let queue = new Queue();

  for (let i = 0; i < nameList.length; i++) {
    queue.enqueue(nameList[i], null);    
  }

  while (queue.size() > 1) {
    let j = 0;
    while (j < num) {
      j++;
      queue.enqueue(queue.dequeue().element, null)
    }
    const elimated = queue.dequeue();
    console.log(`${elimated.element} elimated person!`)
  }

  return queue.dequeue().element;
}

let names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl'];
let winner = hotPotato(names, 7); 
console.log('The winner is: ' + winner);


// double-end-queue

class Dequeue {
  constructor() {
    items.set(this, []);
  }

  enqueue(element) {
    items.get(this).push(element)
  }

  dequeue() {
    return items.get(this).shift();
  }

  addFront(element) {
    items.get(this).unshift(element)
  }

  addBack(element) {
    let stackItems = items.get(this);
    stackItems.push(element)
  }

  removeFront() {
    return items.get(this).shift();
  }

  removeBack() {
    let stackItems = items.get(this);
    if(this.isEmpty()) {
      return undefined;
    } else {
      return stackItems.pop()
    }
  }
  peekFront() {
    let stackItems = items.get(this);
    if (this.isEmpty()) {
      return undefined;
    } else {
      return stackItems[0];
    }
  }
  peekBack() {
    let stackItems = items.get(this);
    if (this.isEmpty()) {
      return undefined;
    } else {
      return stackItems[stackItems.length - 1];
    }
  }
  clear() {
    let stackItems = items.get(this);
    stackItems = [];
  }

  size() {
    return items.get(this).length;
  }

  print() {
    let stackItems = items.get(this);
    console.log(stackItems)
  }

  isEmpty() {
    return items.get(this).length === 0;
  }

}

function palindromeChecker(aString) {
  if (aString === undefined || aString === null || 
    (aString !== null && aString.length === 0)) {
    return false;
  }

  const deque = new Dequeue();
  const lowerString = aString.toLowerCase().split(" ").join("");
  let isEqual = true;
  let firstChar, lastChar;

  for (let i = 0; i < lowerString.length; i++) {
    deque.enqueue(lowerString.charAt(i));    
  }
  
  while (deque.size() > 1 && isEqual) {
    firstChar = deque.removeFront();
    lastChar = deque.removeBack();
    if (firstChar !== lastChar) {
      isEqual = false;
    }
  }
  return isEqual;
}

console.log('a', palindromeChecker('a'));
console.log('aa', palindromeChecker('aa'));
console.log('kayak', palindromeChecker("kayak"));
console.log('level', palindromeChecker("level"));
console.log('Was it a car or a cat I saw', palindromeChecker('Was it a car or a cat I saw'));
console.log('Step on no pets', palindromeChecker('Step on no pets'));