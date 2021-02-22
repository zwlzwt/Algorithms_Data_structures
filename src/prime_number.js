var countPrimes = function (n) {
  let flagArray = [];
  let result = 0;
  for (let i = 2; i < n; i++) {
    if (flagArray[i] === undefined) {
      flagArray[i] = 1;
      result++;
      let j = 2;
      while (i * j < n) {
        flagArray[i * j] = 0;
        j++;
      }
    }
  }
  return result;
}