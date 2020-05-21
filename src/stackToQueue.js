import Stack from "./stack";
const Stack1 = new Stack();
const Stack2 = new Stack();

// implement enqueue method by using only stacks
// and the push and pop functions
function Enqueue(element) {
  Stack1.push(element);
}

// implement dequeue method by pushing all elements
// from stack 1 into stack 2, which reverses the order
// and then popping from stack 2
function Dequeue() {
  if (Stack2.isEmpty()) {
    if (Stack1.isEmpty()) { return 'Cannot dequeue because queue is empty'; }
    while (!Stack1.length.isEmpty()) {
      const p = Stack1.pop();
      Stack2.push(p);
    }
  }
  return Stack2.pop();
}

Enqueue('a');
Enqueue('b');
Enqueue('c');
Dequeue(); 