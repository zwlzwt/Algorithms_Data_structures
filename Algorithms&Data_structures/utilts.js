export const compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0
}

// const swap = (array, a, b) => [array[a], array[b]] = [array[b], array[a]];
export function swap(array, a, b) {
  const tmp = array[a];
  array[a] = array[b];
  array[b] = tmp;
}

export function defaultEquals(a, b) {
  return a === b;
}

export function defaultCompare(a, b) {
  if (a === b) {
    return compare.EQUALS;
  }
  return a < b ? compare.LESS_THAN : compare.BIGGER_THAN;
}

export function defaultToString(item) {
  if (item === null) {
    return "Null";
  } else if (item === undefined) {
    return "Undefined";
  } else if (typeof item === 'string' || item instanceof String) {
    return `${item}`;
  }
  return item.toString();
  // if item is object, you can define your own toStrFn to describe key on prototype
  // ex: function Dog(name) {
  //   this.name = name;
  // }

  // var dog1 = new Dog('Gabby');

  // Dog.prototype.toString = function dogToString() {
  //   return `${this.name}`;
  // }
}