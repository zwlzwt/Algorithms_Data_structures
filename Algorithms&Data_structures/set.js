class SetMock {
  constructor() {
    this.items = {};
  }

  has(element) {
    // 不用in操作符因为会检查prototype上的property
    // 不用items.hasOwnProperty有可能对象本身有改写hasOwnProperty风险
    return Object.prototype.hasOwnProperty.call(this.items, element);
  }

  add(element) {
    if (!this.has(element)) {
      this.items[element] = element;
      return true;
    }
    return false;
  }

  delete(element) {
    if (this.has(element)) {
      delete this.items[element];
      return true
    }
    return false;
  }

  clear() {
    this.items = {};
  }

  size() {
    return Object.keys(this.items).length;
  }

  // tradition way
  sizeLegacy() {
    let count = 0;
    for (const key in this.items) {
      if (this.items.hasOwnProperty(key)) {
        count++;        
      }
    }
    return count;
  }

  values() {
    return Object.values(this.items);
  }

  // trandition way
  valuesLegacy() {
    const values = [];
    for (const key in this.items) {
      if (this.items.hasOwnProperty(key)) {
        values.push(key);        
      }
    }
    return values;
  }

  // Algebra of sets
  union(otherSet) {
    //  means to {...this.items, ...otherSet.items};
    const unionSet = new SetMock();
    this.values().forEach(element => unionSet.add(element));
    otherSet.values().forEach(element => unionSet.add(element));
    return unionSet;
  }

  intersection(otherSet) {
    const intersectionSet = new SetMock();
    const values = this.values();
    const otherSetValues = otherSet.values();
    let smallerSet = values;
    let biggerSet = otherSetValues;

    if (values.length - otherSetValues.length > 0) {
      smallerSet = otherSetValues;
      biggerSet = values;
    }
    // old way
    // for (let i = 0; i < smallerSet.length; i++) {
    //   if (biggerSet.has(values[i])) {
    //     intersectionSet.add(values[i]);
    //   }
    // }
    // new way
    smallerSet.forEach(element => {
      if(biggerSet.includes(element)) {
        intersectionSet.add(element);
      }
    })
    return intersectionSet;
  }

  difference(otherSet) {
    const differenceSet = new SetMock();
    this.values().forEach(element => {
      if (!otherSet.has(element)) {
        differenceSet.add(element);
      }
    })
    return differenceSet;
  }

  isSubsetOf(otherSet) {
    if (this.size() > otherSet.size()) {
      return false;
    }
    let subSet = true;
    this.values().every(element => {
      if (!otherSet.has(element)) {
        subSet = false;
        return false;
      }
      return true;
    })
    return subSet;
  }

}

const setItemsA = new SetMock();
setItemsA.add("zhao");
setItemsA.add("wei");
setItemsA.add("long");
setItemsA.add("love");
setItemsA.add("wp");
setItemsA.add("family");
const setItemsB = new SetMock();
setItemsB.add("zhang");
setItemsB.add("wan");
setItemsB.add("tian");
setItemsB.add("love");
setItemsB.delete("wan");
setItemsB.add("family");
const setItemsC = new SetMock();
setItemsC.add("zhao");
setItemsC.add("wei");
setItemsC.add("long");
console.log(setItemsC.isSubsetOf(setItemsA));
console.log(setItemsC.isSubsetOf(setItemsB));
const setItemsAB = setItemsA.union(setItemsB);
const setItemsAInterSectionB = setItemsA.intersection(setItemsB);
const setItemsDifferenceSet = setItemsA.difference(setItemsB);
console.log(setItemsA);
console.log(setItemsB);
console.log(setItemsAB.values());
console.log(setItemsAInterSectionB.values());
console.log(setItemsDifferenceSet.values());
// original set Algebra of sets
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
console.log(new Set([...a, ...b]));

// 交集
console.log(new Set([...a].filter(x => b.has(x))));

// 差集
console.log(new Set([...a].filter(x => !b.has(x))));