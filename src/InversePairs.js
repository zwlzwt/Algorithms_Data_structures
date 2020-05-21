// 在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组，求出这个数组中的逆序对的总数。



// 示例 1:

// 输入: [7, 5, 6, 4]
// 输出: 5

function mergeSort(array, compareFn = defaultCompare) {
  if (array.length > 1) {
    const { length } = array;
    const middle = Math.floor(length / 2);
    const left = mergeSort(array.slice(0, middle), compareFn);
    const right = mergeSort(array.slice(middle, length), compareFn);
    array = merge(left, right, compareFn);
  }
  return array;
}

function merge(left, right, compareFn) {
  let sum = 0;
  let i = 0;
  let j = 0;
  const result = [];
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++])
      
    } else {
      result.push(right[j++])
      sum += left.length - i
    }

  };
  // merge rest array
  return result.concat(i < left.length ? left.slice(i) : right.slice(j));
}