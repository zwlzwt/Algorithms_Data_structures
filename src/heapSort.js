import { swap } from "./utilts.js";


function getLeftIndex(index) {
  return 2 * index + 1;
}

function getRightIndex(index) {
  return 2 * index + 2;
}

function heapify(array, index, size) {
  let element = index;
  const left = getLeftIndex(index);
  const right = getRightIndex(index);
  if (left < size && array[left] > array[element]) {
    element = left;
  }
  if (right < size && array[right] > array[element]) {
    element = right;
  }
  if (index !== element) {
    swap(array, index, element);
    heapify(array, element, size);
  }
}

function buildMaxHeap(array, size) {
  for (let i = Math.floor(size / 2) -1; i >= 0; i--) {
    heapify(array, i, size);
  }
}

function heapSort(array) {
  let heapSize = array.length;
  buildMaxHeap(array, heapSize);

  while (heapSize > 0) {
    swap(array, 0, --heapSize);
    heapify(array, 0, heapSize);
  }
  return array;
}

const array = [7, 6, 3, 5, 4, 1, 2];
console.log('Before sorting: ', array);
console.log('After sorting: ', heapSort(array));
