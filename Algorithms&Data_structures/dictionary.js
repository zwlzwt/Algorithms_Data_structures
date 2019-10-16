import { defaultToString } from './utilts.js';
import ValuePair from './models/valuePair.js';

export default class Dictionary {
  constructor(toStrFn=defaultToString) {
    this.toStrFn =  toStrFn;
    this.table = {};
  }

  set(key, value) {
    if (key !== null && value !== null) {
      this.table[this.toStrFn(key)] = new ValuePair(key, value);
      return true;
    }
    return false;
  }

  remove(key) {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)];
      return true;
    }
    return false;
  }

  hasKey(key) {
    return this.table[this.toStrFn(key)] !== null;
  }

  get(key) {
    const valuePair = this.table[this.toStrFn(key)];
    return valuePair === null ? null : valuePair.element;
  }

  clear() {
    this.table = {};
  }

  size() {
    return this.keyValues().length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  keys() {
    return this.keyValues().map(keyValuePairs => keyValuePairs.key);
  }

  values() {
    return this.keyValues().map(keyValuePairs => keyValuePairs.element);
  }

  // trandition way
  keyValuesLegacy() {
    const keyValuesPairs = [];
    const object = this.table;
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        keyValuesPairs.push(object[key]);
      }
    }
    return keyValuesPairs;
  }

  keyValues() {
    return Object.values(this.table);
  }

  loopDic(callback) {
    const valuePairs = this.keyValues();
    for (let i = 0; i < valuePairs.length; i++) {
      const result = callback(valuePairs[i].key, valuePairs[i].element);
      if (result === false) {
        break;
      }
    }
  }

  keyValuesToString() {
    if (this.isEmpty()) {
      return '';
    }
    const valuePairs = this.keyValues();
    let objString = '';
    for (let i = 0; i < valuePairs.length; i++) {
      objString = `${objString}\n${valuePairs[i].pairToString()}`;
    }
    return objString;
  }
}


const dictionary = new Dictionary();
dictionary.set('Gandalf', 'gandalf@email.com');
dictionary.set('John', 'johnsnow@email.com');
dictionary.set('Tyrion', 'tyrion@email.com');

console.log(dictionary.hasKey('Gandalf'));
console.log(dictionary.size());
console.log(dictionary.keys());
console.log(dictionary.values());
console.log(dictionary.get('Tyrion'));

dictionary.remove('John');
console.log(dictionary.keys());
console.log(dictionary.values());
console.log(dictionary.keyValues());

dictionary.loopDic((k, v) => {
  console.log('loopDic: ', `key: ${k}, value: ${v}`);
});

console.log(dictionary.keyValuesToString());