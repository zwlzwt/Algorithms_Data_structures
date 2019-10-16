function fibonacciNumber(num, ac1=1, ac2=1) {
  if (typeof num === 'number' && Number.isInteger(num)) {
    if (num <= 1) {
      return ac2;
    }
    return fibonacciNumber(num-1, ac2, ac1+ac2);
  }
  console.log("The input must be integer!");
}

console.time("fibonacci-time");
console.log(fibonacciNumber(100));
console.timeEnd("fibonacci-time");



function fibonacciArray(num) {
  const fibonacci = [];
  fibonacci[1] = 1;
  fibonacci[2] = 2;
  
  for (let i = 3; i < num; i++) {
    fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
  }
  
  for (var i = 1; i < fibonacci.length; i++) { 
    console.log(fibonacci[i]);       
  }
}

fibonacciArray(20);
