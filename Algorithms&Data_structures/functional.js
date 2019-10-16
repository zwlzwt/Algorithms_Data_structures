var memoize = function(f) {
  var cache = {};

  return function() {
    
    var arg_str = JSON.stringify(arguments);
    console.log(arg_str);
    cache[arg_str] = cache[arg_str] || f.apply(f, arguments);
    console.log(cache);
    return cache[arg_str];
  };
};

var squareNumber = memoize(function (x) { return x * x; });


console.log(squareNumber(4));
