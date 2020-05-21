const arr = [{ name: "zlw", age: 24 }, { name: "wlz", age: 25 }];

const compare = function (prop, order) {
  return function (obj1, obj2) {
    var val1 = obj1[prop];
    var val2 = obj2[prop];
    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
      val1 = Number(val1);
      val2 = Number(val2);
    }
    switch (order) {
      case 'asce':
        if (val1 < val2) {
          return -1;
        } else if (val1 > val2) {
          return 1;
        } else {
          return 0;
        }
      case 'desce':
        if (val1 > val2) {
          return -1;
        } else if (val1 < val2) {
          return 1;
        } else {
          return 0;
        }
      default:
        return 0;
    }
    
  }
}

arr.sort(compare('age', 'desce'));