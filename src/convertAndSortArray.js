const arr = [
  { name: "zlw", age: 24 },
  { name: "wlz", age: 25 },
];

const compare = function (prop, order) {
  return function (obj1, obj2) {
    let val1 = obj1[prop];
    let val2 = obj2[prop];
    if (!val1 || !val2) return 0;
    if (!Number.isNaN(Number(val1)) && !Number.isNaN(Number(val2))) {
      val1 = Number(val1);
      val2 = Number(val2);
    } else {
      val1 = val1.toLowerCase();
      val2 = val2.toLowerCase();
    }
    // may use locateCompare compare string, if string come from unicode \u0041\u006d\u00e9\u006c\u0069\u0065,
    // then use normalize('NFC') convert the string
    switch (order) {
      case "ascending":
        if (val1 < val2) {
          return -1;
        } else if (val1 > val2) {
          return 1;
        } else {
          return 0;
        }
      case "descending":
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
  };
};

arr.sort(compare("age", "descending"));
