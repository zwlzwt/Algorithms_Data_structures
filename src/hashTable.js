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



// method 2: linear probing if position occupy, move to position+1

class HashMapLinearProbing {
  constructor() {
    super();
  }

  put(key, value){
    if (key != null && value != null) {
      const position = this.hashCode(key);
      // 判断当前要插入的位置在表中是否被占据
      if (this.table[position] == null) {
        // 当前位置没有被占据，将Key & value放进ValuePair中赋值给当前表中要插入位置的元素
        this.table[position] = new ValuePair(key, value);
      } else {
        // 位置被占据，递增index直至找到没有被占据的位置
        let index = position + 1;
        while (this.table[index] != null) {
          index++;
        }
        // 找到没有被占据的位置，将Key & value放进ValuePair中赋值给当前表中要插入位置的元素
        this.table[index] = new ValuePair(key, value);
      }
      return true;
    }
    return false;
  }

  get(key) {
    const position = this.hashCode(key);
    if (this.table[position] != null) {
      // 如果当前位置元素的key等于目标元素的key直接返回当前位置元素的value
      if (this.table[position].key === key) {
        return this.table[position].value;
      }
      // 位置递增直至找到我们要找的元素或者找到一个空位置
      let index = position + 1;
      while (this.table[index] != null && this.table[index].key !== key) {
        index++;
      }
      // 递增结束后，判断当前表中index的key是否等于目标key
      if (this.table[index] != null && this.table[index].key === key) {
        return this.table[index].value;
      }
    }
    return undefined;
  }

  remove(key) {
    const position = this.hashCode(key);
    if (this.table[position] != null) {
      if (this.table[position].key === key) {
        delete this.table[position];
        // 删除后，验证本次删除是否有副作用，调整元素位置
        this.verifyRemoveSideEffect(key, position);
        return true;
      }
      let index = position + 1;
      while (this.table[index] != null && this.table[index].key !== key) {
        index++;
      }
      if (this.table[index] != null && this.table[index].key === key) {
        delete this.table[index];
        this.verifyRemoveSideEffect(key, index);
        return true;
      }
    }
    return false;
  }

  // 验证删除操作是否有副作用
  verifyRemoveSideEffect(key, removedPosition) {
    // 计算被删除key的哈希值
    const hash = this.hashCode(key);
    // 从被删除元素位置的下一个开始遍历表直至找到一个空位置
    // 当找到一个空位置后即表示元素在合适的位置上不需要移动
    let index = removedPosition + 1;
    while (this.table[index] != null) {
      // 计算当前遍历到的元素key的hash值
      const posHash = this.hashCode(this.table[index].key);
      console.log(`当前遍历到的元素的hash= ${posHash} , 上一个被移除key的hash = ${removedPosition}`);
      if (posHash <= hash || posHash <= removedPosition) {
        // 如果当前遍历到的元素的哈希值小于等于被删除元素的哈希值或者小于等于上一个被移除key的哈希值(removedPosition)
        // 需要将当前元素移动至removedPosition位置
        this.table[removedPosition] = this.table[index];
        // 移动完成后，删除当前index位置的元素
        delete this.table[index];
        // 更新removedPosition的值为index
        removedPosition = index;
      }
      index++;
    }
  }
}
