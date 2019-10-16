// create private property use WeakMap
const items = new WeakMap();



export default class Stack {
  constructor() {
    items.set(this, []);
  }

  push(element) {
    let stackItems = items.get(this);
    stackItems.push(element)
  }

  pop() {
    let stackItems = items.get(this);
    return stackItems.pop()
  }
  peek() {
    let stackItems = items.get(this);
    return stackItems[stackItems.length - 1];
  }
  clear() {
    let stackItems = items.get(this);
    stackItems = [];
  }

  print() {
    let stackItems = items.get(this);
    console.log(stackItems)
  }

  isEmpty() {
    let stackItems = items.get(this);
    return stackItems.length === 0;
  }
}


let stack1 = new Stack();
stack1.isEmpty();
stack1.push(5);
stack1.push(8);
stack1.print();
stack1.push(11);
stack1.print();
stack1.push(15);
stack1.pop();
stack1.isEmpty();
stack1.clear();
let stack2 = new Stack();
stack2.print();


// change to any positional notation (binary, hex..)

function divideBy2(decNumber, base) {
  let remStack = new Stack(); 
  let binaryString = "";
  let digits = "0123456789ABCDEF";
  while (decNumber > 0) {
    remStack.push(decNumber % base);
    decNumber = Math.floor(decNumber / base);
  }
  while (!remStack.isEmpty()) {
    binaryString += digits[remStack.pop()]; 
  }
  console.log(binaryString);
}

divideBy2(993, 16);