import { defaultCompare, compare, swap } from "./utilts.js";

// test function
function createNonSortedArray(size) {
  const array = [];
  for (let i = size; i > 0; i--) {
    array.push(i);
  }
  return array;
}

// swap es2015 type
// const swapEs = (array, a, b) => [array[a], array[b]] = [array[b], array[a]];

// bubble
function bubbleSort(array, compareFn=defaultCompare) {
  for (let i = 0; i < array.length; i++) {
    //  optimization minus sorted value
    for (let j = 0; j < array.length-1-i; j++) {
      if (compareFn(array[j], array[j+1]) === compare.BIGGER_THAN) {
        swap(array, j, j+1);
      }          
    }
  }
  return array;
}


let arrayBubble = createNonSortedArray(10); 
console.log(arrayBubble.join()); 
arrayBubble = bubbleSort(arrayBubble); 
console.log(arrayBubble.join());


// selection sort
function selectionSort(array, compareFn=defaultCompare) {
  const { length } = array;
  let minIndex;
  for (let i = 0; i < length-1; i++) {
    minIndex = i;
    for (let j = i; j < length; j++) {
      if (compareFn(array[minIndex], array[j]) === compare.BIGGER_THAN) {
        minIndex = j;
      }
    }
    if (minIndex!==i) {
      swap(array, minIndex, i);
    }
  }
  return array;
}

let arraySelection = createNonSortedArray(5);
console.log(arraySelection.join());
arraySelection = selectionSort(arraySelection);
console.log(arraySelection.join());

// insert sort
function insertSort(array, compareFn=defaultCompare) {
  const { length } = array;
  for (let i = 0; i < length; i++) {
    let j = i;
    let temp = array[i];
    while (j < length-1 && compareFn(temp, j+1)===compare.BIGGER_THAN) {
      array[i] = array[j+1];
      j++;
    }
    array[j] = temp;
  }
  return array;
}
let arrayInsert = createNonSortedArray(15);
console.log(arrayInsert.join());
arrayInsert = insertSort(arrayInsert);
console.log(arrayInsert.join());

// merge sort
function mergeSort(array, compareFn=defaultCompare) {
  if (array.length > 1) {
    const { length } = array;
    const middle = Math.floor(length/2);
    const left = mergeSort(array.slice(0, middle), compareFn);
    const right = mergeSort(array.slice(middle, length), compareFn);
    array = merge(left, right, compareFn);
  }
  return array;
}

function merge(left, right, compareFn) {
  let i = 0;
  let j = 0;
  const result = [];
  while (i < left.length && j < right.length) {
    result.push(
      compareFn(left[i], right[j]) === compare.LESS_THAN ? left[i++] : right[j++]
    );
  };
  // merge rest array
  return result.concat(i < left.length ? left.slice(i) : right.slice(j));
}
let arrayMerge = createNonSortedArray(8);
console.log(arrayMerge.join());
arrayMerge = mergeSort(arrayMerge);
console.log(arrayMerge.join());

// quick sort
export function quickSort(array, compareFn=defaultCompare) {
  return quick(array, 0, array.length - 1, compareFn);
}

function quick(array, left, right, compareFn) {
  let index;
  if (array.length > 1) {
    index = partition(array, left, right, compareFn);
    if (left < index-1) {
      quick(array, left, index-1, compareFn);
    }
    if (index < right) {
      quick(array, index, right, compareFn);
    }
  }
  return array;
}

function partition(array, left, right, compareFn) {
  //  if use first or random number, it will be inefficient on already sorted arrays
  const pivot = array[Math.floor((right + left) / 2)];
  let i = left;
  let j = right;
  while (i <= j) {
    while (compareFn(array[i], pivot) === compare.LESS_THAN) {
      i++
    }
    while (compareFn(array[j], pivot) === compare.BIGGER_THAN) {
      j--
    }
    if (i<=j) {
      swap(array, i, j);
      i++;
      j--;
    }
  }
  return i;
}

let arrayQuick = createNonSortedArray(50);
console.log(arrayQuick.join());
arrayQuick = quickSort(arrayQuick);
console.log(arrayQuick.join());


// counting sort only use for Integer, if max value too large, O(n+k) The k range will also be large
function countingSort(array) {
  if (array.length < 2) {
    return array;
  }
  const maxValue = findMaxValue(array);

  const counts = new Array(maxValue + 1).fill(0);
  array.forEach(element => {
    counts[element]++;
  });
  let sortedIndex = 0;
  counts.forEach((count, i) => {
    while (count > 0) {
      array[sortedIndex++] = i;
      count--;
    }
  });
  return array;
}

function findMaxValue(array) {
  let max = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
    }
  }
  return max;
}

let arrayCounting = [4,7,9,12,11,10,8,5,3];
console.log(arrayCounting.join());
arrayCounting = countingSort(arrayCounting);
console.log(arrayCounting.join());

// bucket sort
function bucketSort(array, bucketSize=5) {
  if (array.length < 2) {
    return array;
  }
  const buckets = createBuckets(array, bucketSize); 
  return sortBuckets(buckets);
}

function createBuckets(array, bucketSize) {
  let minValue = array[0];
  let maxValue = array[0];

  for (let i = 1; i < array.length; i++) {
    if (array[i] < minValue) {
      minValue = array[i];
    } else if (array[i] > maxValue) {
      maxValue = array[i];
    }
  }

  const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
  const buckets = [];
  for (let i = 0; i < bucketCount; i++) {
    buckets[i] = [];
  }
  for (let i = 0; i < array.length; i++) { 
    const bucketIndex = Math.floor((array[i] - minValue) / bucketSize);
    buckets[bucketIndex].push(array[i]);
  }
  return buckets;
}

function sortBuckets(buckets) {
  const sortedArray = [];
  for (let i = 0; i < buckets.length; i++) {
    if (buckets[i] !== null) {
      insertSort(buckets[i]);
      sortedArray.push(...buckets[i]);
    }
  }
  return sortedArray;
}

let arrayBuckets = [4, 7, 9, 12, 11, 10, 8, 5, 90, 24, 56];
console.log(arrayBuckets .join());
arrayBuckets = bucketSort(arrayBuckets);
console.log(arrayBuckets .join());

// radix sort
function findMinValue(array) {
  let min = array[0];
  let i = 1;
  while (i < array.length) {
    if (array[i] < min) {
      min = array[i];
    }
    i++;
  }
  return min;
}
function radixSort(array, radixBase = 10) {
  if (array.length < 2) {
    return array;
  }
  const minValue = findMinValue(array);
  const maxValue = findMaxValue(array);
  let significantDigit = 1; 
  // Repeat every radixBase
  while ((maxValue - minValue) / significantDigit >= 1) { 
    array = countingSortForRadix(array, radixBase, significantDigit, minValue);
    significantDigit *= radixBase;
  }
  return array;
}

function countingSortForRadix(array, radixBase, significantDigit, minValue) {
  let bucketsIndex;
  const buckets = [];
  const aux = [];
  for (let i = 0; i < radixBase; i++) {
    buckets[i] = 0;
  }
  for (let i = 0; i < array.length; i++) {
    bucketsIndex = Math.floor(((array[i] - minValue) / significantDigit) % radixBase);
    buckets[bucketsIndex]++;
  }
  // Calculate the number of digits in each position plus the previous position
  for (let i = 1; i < radixBase; i++) {
    buckets[i] += buckets[i - 1];
  }
  for (let i = array.length - 1; i >= 0; i--) {
    bucketsIndex = Math.floor(((array[i] - minValue) / significantDigit) % radixBase);
    console.log(buckets);
    // reduce the number of each digit by one.
    aux[--buckets[bucketsIndex]] = array[i];
  }
  for (let i = 0; i < array.length; i++) {
    array[i] = aux[i];
  }
  return array;
}
let arrayRadix = [456, 789, 123, 1, 32, 4, 243, 321, 42, 90, 10, 999];
console.log(arrayRadix.join());
arrayRadix = radixSort(arrayRadix);
console.log(arrayRadix.join());
