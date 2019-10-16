import { defaultCompare, compare, swap } from "./utilts.js";

class MinHeap {
  constructor(compareFn=defaultCompare) {
    this.compareFn = compareFn;
    this.heap = [];
  }

  getLeftIndex(index) {
    return 2*index + 1;
  }

  getRightIndex(index) {
    return 2*index + 2;
  }

  getParentIndex(index) {
    if (index === 0) {
      return null;
    }
    return Math.floor((index - 1)/2);
  }

  siftUp(index) {
    let parent = this.getParentIndex(index);
    while (index > 0 && this.compareFn(this.heap[parent], this.heap[index]) === compare.BIGGER_THAN) {
      swap(this.heap, parent, index);
      index = parent;
      parent = this.getParentIndex(index);
    }
  }

  siftDown(index) {
    let element = index;
    const left = this.getLeftIndex(index);
    const right = this.getRightIndex(index);
    const size = this.size();
    if (left < size && this.compareFn(this.heap[element], this.heap[left]) === compare.BIGGER_THAN) {
      element = left;
    }
    if (right < size && this.compareFn(this.heap[element], this.heap[right]) === compare.BIGGER_THAN) {
      element = right;
    }
    if (index !== element) {
      swap(this.heap, index, element);
      this.siftDown(element);
    }
  }

  insert(value) {
    if (value !== null) {
      this.heap.push(value);
      this.siftUp(this.heap.length - 1);
      return true;
    }
    return false;
  }

  extract() {
    if (this.isEmpty()) {
      return null;
    }
    if (this.size() === 1) {
      return this.heap.shift();
    }
    const removedValue = this.heap.shift();
    this.heap.unshift(this.heap.pop());
    this.siftDown(0);
    return removedValue;
  }

  size() {
    return this.heap.length;
  }
  isEmpty() {
    return this.size() === 0;
  }
  findMinimum() {
    return this.isEmpty() ? undefined : this.heap[0];
  }
}


class MaxHeap extends MinHeap {
  constructor(compareFn=defaultCompare) {
    super(compareFn);
    this.compareFn = (a, b) => compareFn(b, a);
  }
}

const minheap = new MinHeap();
for (let i = 1; i < 10; i++) {
  minheap.insert(i);
}
console.log('Extract minimum: ', minheap.extract()); // 1
console.log(minheap);

const maxheap = new MaxHeap();
for (let i = 1; i < 10; i++) {
  maxheap.insert(i);
}
console.log('Extract maximum: ', maxheap.extract()); // 1
console.log(maxheap);