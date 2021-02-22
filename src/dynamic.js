// min coin change
function minCoinChange(coins, amount) {
  const cache = [];
  const makeChange = (value) => {
    if (!value) {
      return [];
    }
    if (cache[value]) {
      return cache[value];
    }
    let min = [];
    let newMin;
    let newAmount;
    for (let i = 0; i < coins.length; i++) {
      const coin = coins[i];
      newAmount = value - coin;
      if (newAmount >= 0) {
        newMin = makeChange(newAmount);
      }
      if (
        newAmount >= 0 &&
        // min - coin > newMin replace
        (newMin.length < min.length - 1 || !min.length) &&
        (newMin.length || !newAmount)
      ) {
        min = [coin].concat(newMin);
        console.log("new Min " + min + " for " + value);
      }
    }
    return (cache[value] = min);
  };
  return makeChange(amount);
}

console.log(minCoinChange([25, 10, 5, 1], 26));

// knapSack
function knapSack(capacity, weights, values, n) {
  const KS = [];
  for (let i = 0; i <= n; i++) {
    KS[i] = [];
  }
  for (let i = 0; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (i === 0 || w === 0) {
        KS[i][w] = 0;
      } else if (weights[i - 1] <= w) {
        const a = values[i - 1] + KS[i - 1][w - weights[i - 1]];
        const b = KS[i - 1][w];
        KS[i][w] = a > b ? a : b;
      } else {
        KS[i][w] = KS[i - 1][w];
      }
    }
  }
  console.log(KS);
  findValues(n, capacity, KS, weights, values);
  return KS[n][capacity];
}

function findValues(n, capacity, kS, weights, values) {
  let i = n;
  let k = capacity;
  console.log("The all cargos are:");
  while (i > 0 && k > 0) {
    if (kS[i][k] !== kS[i - 1][k]) {
      console.log(
        `cargo ${i} in the bag w,v: ${weights[i - 1]}, ${values[i - 1]}`
      );
      i--;
      k -= kS[i][k];
    } else {
      i--;
    }
  }
}

// knapsack greedy type
// It can't get the optimal solution
function knapSackGreedy(capacity, weights, values) {
  let totalValues = 0;
  let load = 0;
  for (let i = 0; i < values.length && load < capacity; i++) {
    if (weights[i] <= capacity - load) {
      load += weights[i];
      totalValues += values[i];
    } else {
      totalValues += (values[i] * (capacity - load)) / weights[i];
      load += weights[i];
    }
  }
  return totalValues;
}

// Recursive type
function knapSackRecursive(capacity, weights, values, n) {
  if (n === 0 || capacity === 0) {
    return 0;
  }
  if (weights[n - 1] > capacity) {
    return knapSackRecursive(capacity, weights, values, n - 1);
  }
  const a =
    values[n - 1] +
    knapSackRecursive(capacity - weights[n - 1], weights, values, n - 1);
  const b = knapSackRecursive(capacity, weights, values, n - 1);
  return a > b ? a : b;
}

const values = [4, 10, 15],
  weights = [2, 3, 4],
  capacity = 6,
  n = values.length;
console.log("knapSack_values:", knapSack(capacity, weights, values, n));
console.log(
  "knapSackGreedy_values:",
  knapSackGreedy(capacity, weights, values)
);

// Lcs
function lcs(wordX, wordY) {
  const m = wordX.length;
  const n = wordY.length;
  const l = [];
  for (let i = 0; i <= m; i++) {
    l[i] = [];
    for (let j = 0; j <= n; j++) {
      l[i][j] = 0;
    }
  }
  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === 0 || j === 0) {
        l[i][j] = 0;
      } else if (wordX[i - 1] === wordY[j - 1]) {
        l[i][j] = l[i - 1][j - 1] + 1;
      } else {
        const a = l[i - 1][j];
        const b = l[i][j - 1];
        l[i][j] = a > b ? a : b;
      }
    }
  }
  return l[m][n];
}
// lcs Recursive
function lcsRecursive(wordX, wordY, m, n) {
  if (m === 0 || n === 0) {
    return 0;
  }

  if (wordX[m - 1] === wordY[n - 1]) {
    return lcsRecursive(wordX, wordY, m - 1, n - 1) + 1;
  } else {
    const a = lcsRecursive(wordX, wordY, m, n - 1);
    const b = lcsRecursive(wordX, wordY, m - 1, n);
    return a > b ? a : b;
  }
}

console.log(lcsRecursive("acbaed", "abcadf", 6, 6));

// matrix chain order
// function matrixChainOrder(p) {
//   const n = p.length;
//   const m = [];
//   const s = [];
//   for (let i = 1; i <= n; i++) {
//     m[i] = [];
//     m[i][i] = 0;
//   }
//   for (let l = 2; l < n; l++) {
//     for (let i = 1; i <= (n - l) + 1; i++) {
//       const j = (i + l) - 1;
//       m[i][j] = Number.MAX_SAFE_INTEGER;
//       for (let k = i; k <= j - 1; k++) {
//         const q = m[i][k] + m[k + 1][j] + ((p[i - 1] * p[k]) * p[j]);
//         if (q < m[i][j]) {
//           m[i][j] = q;
//         }
//       }
//     }
//     return m[1][n - 1];
//   }
// }
