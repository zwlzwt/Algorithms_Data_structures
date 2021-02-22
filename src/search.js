import { defaultEquals, defaultCompare, compare } from "./utilts.js";
import { quickSort } from "./sorting.js";

function lesserOrEquals(a, b, compareFn) {
  return (
    compareFn(a, b) === compare.LESS_THAN || compareFn(a, b) === compare.EQUALS
  );
}

//  sequential search
const DO_NOT_EXIST = null;
function sequentialSearch(array, value, equalsFn = defaultEquals) {
  for (let i = 0; i < array.length; i++) {
    if (equalsFn(value, array[i])) {
      return i;
    }
  }
  return DO_NOT_EXIST;
}

// binary search
function binarySearch(array, value, compareFn = defaultCompare) {
  // first of all we need sort the array
  const sortedArray = quickSort(array);
  let low = 0;
  let high = sortedArray.length - 1;
  while (lesserOrEquals(low, high, compareFn)) {
    const mid = Math.floor((low + high) / 2);
    const element = sortedArray[mid];
    if (compareFn(element, value) === Compare.LESS_THAN) {
      low = mid + 1;
    } else if (compareFn(element, value) === Compare.BIGGER_THAN) {
      high = mid - 1;
    } else {
      return mid;
    }
  }
  return DO_NOT_EXIST;
}
