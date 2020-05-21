function largestNumber(numbers) {
  if (numbers.every(n => n === 0)) return '0';
  return numbers.sort((a, b) => {
    const prev = `${a}` + `${b}`;
    const back = `${b}` + `${a}`;
    if(prev > back) {
      return -1;
    } else if(prev < back) {
      return 1;
    } else {
      return 0
    }
  }).join('').replace(/^0*/g, '') || "0";
}



class BigInt {
  constructor(str) {
    this.str = str;
  }

  plus(bigInt) {
    const a = this.toString(this.str).split('');
    const b = this.toString(bigInt).split('');
    let carry = 0, result = '';
    while (a.length || b.length || carry) {
      let temp = Number.parseInt(a.pop() || 0) + Number.parseInt(b.pop() || 0) + carry;
      result += temp % 10;
      carry = Math.floor(temp / 10);
    }
    return result;
  }

  toString(str) {
    if(!isNaN(str)){
      return str.toString()
    } else {
      return ''
    }
  }
}

function sqrt(n) { return Math.sqrt(n) }
const memoize = fn => {
  let cache = {};
  return function (key) {
    if (!cache[key]) cache[key] = fn.apply(this, arguments);
    return cache[key];
  }
}