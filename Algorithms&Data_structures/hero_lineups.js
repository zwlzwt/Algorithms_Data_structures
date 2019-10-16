// parmas heros number >= 5
console.time("花费时间")
function lineupsCounts(heros, choosenNum, baseNum) {
  const minimum = heros - choosenNum + 1  
  const arrangeNum = arrangement(heros, minimum, baseNum)
  // combination
  return arrangeNum/fab(choosenNum, baseNum)
}

// Tail Call 优化
function fab(n, baseNum) {
  if (n === 0) {
    return baseNum
  }
  return fab(n-1, n*baseNum)
}
function arrangement(heros, limit, baseNum) {
  if (heros < limit) {
    return baseNum
  }
  return arrangement(heros - 1, limit, heros*baseNum)
}

console.log(lineupsCounts(111, 5, 1) * lineupsCounts(106, 5, 1))
console.timeEnd("花费时间")