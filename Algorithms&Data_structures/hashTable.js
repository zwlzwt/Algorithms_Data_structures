import { defaultToString } from "./utilts.js";
import ValuePair from "./models/valuePair.js";
import LinkedList from "./linkedList.js";

class HashTable {
  constructor(toStrFn=defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }

  loseloseHashCode(key) {
    if (typeof key === 'number') {
      return key;
    }
    const tableKey = this.toStrFn(key);
    let hash = 0;
    for (let i= 0;i < tableKey.length;i++) {
      hash += tableKey.charCodeAt(i);
      //  Avoid numbers that are too large to exceed of range
      return hash % 37;
    }
  }

  put(key, value) {
    if (key !== null && value !== null) {
      const position = this.loseloseHashCode(key);
      this.table[position] = new ValuePair(key, value);
      return true;
    }
    return false;
  }

  get(key) {
    const valuePair = this.table[this.loseloseHashCode(key)];
    return valuePair === undefined ? null : valuePair.value;
  }

  remove(key) {
    const hash = this.loseloseHashCode(key);
    const valuePair = this.table[hash];

    if (valuePair !== null) {
      delete this.table[hash];
      return true;
    }
    return false;
  } 
}

const hash = new HashTable();
hash.put('Gandalf', 'gandalf@email.com');
hash.put('John', 'johnsnow@email.com');
hash.put('Tyrion', 'tyrion@email.com');
console.log(hash.loseloseHashCode('Gandalf') + ' - Gandalf');
console.log(hash.loseloseHashCode('John') + ' - John');
console.log(hash.loseloseHashCode('Tyrion') + ' - Tyrion');

hash.remove('Gandalf');
console.log(hash.get('Gandalf'));


// diferentiate same key ex: Nathan and Sargeras have same hash num
// Method 1: Separate Chaining differentiate

class HashTableSeparateChaining extends HashTable{
  constructor(toStrFn=defaultToString) {
    super(toStrFn);
  }

  putSeparateChaining(key, value) {
    if (key !== null && value !== null) {
      const position = super.loseloseHashCode(key);
      if (this.table[position] === undefined) {
        this.table[position] = new LinkedList();
      }
      this.table[position].push(new ValuePair(key, value));
      return true;
    }
    return false;
  }

  getSeparateChaining(key) {
    const position = super.loseloseHashCode(key);
    const linkedList = this.table[position];
    if (linkedList !== undefined && !linkedList.isEmpty()) {
      let headList = linkedList.getHead();
      while (headList !== null) {
        if (headList.element.key === key) {
          return headList.element.value;
        }
        headList = headList.next;
      }
    }
    return null;
  }

  removeSeparateChaining(key) {
    const position = super.loseloseHashCode(key);
    const linkedList = this.table[position];
    if (linkedList !== undefined && !linkedList.isEmpty()) {
      let current = linkedList.getHead();
      while (current !== null) {
        if (current.element.key === key) {
          linkedList.remove(current.element);
          if (linkedList.isEmpty()) {
            delete this.table[position];
          }
          return true;
        }
        current = current.next;
      }
    }
    return false
  }

  
}

const hashSeparateChaining = new HashTableSeparateChaining();
hashSeparateChaining.putSeparateChaining('Tyrion', 'tyrion@email.com');
console.log(hashSeparateChaining.getSeparateChaining('fuck'));
