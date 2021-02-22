// After that, 
// I was only left with around 10 mins and he gave me a problem with a class and asked to implement a method. 
// The class is "Person" with attributes string name, 
// int age, char sex, Person spouse, List<Person> children. 
// The method should return me the oldest sibling pair (also considering there could be half-siblings that is, 
// children from different parents). 

import { swap } from "./utilts.js";

const Gender = {
  Male: 'Male',
  Female: 'Female'
}

Object.freeze(Gender);

class Person {
  constructor(dad, mon, gender, age, level, children=[]) {
    this.father = dad; 
    this.mother = mom; 
    this.gender = gender; 
    this.age = age; 
    this.level = level;
    this.children = children
  }

  setChildren(children) {

  }

  addChildren(child) {
    this.children.push(child)
  }

  getParents() {
    return {
      father: this.father,
      mother: this.mother
    }
  }

  getOlderSister() {
    const allChildFromParents = new Set();
    const father = this.father
    const mother = this.mother
    const myAge = this.age;
    if (father !== null && father.children !== null) {
      allChildFromParents.add(father.children)
    }
    if(mother !== null && mother.children !== null) {
      allChildFromParents.add(mother.children)
    }
    if (allChildrenFromParents.includes(this)) {
      allChildrenFromParents.delete(this); 
    }
    
    const oldestSisters = []; 

    for (child of allChildrenFromParents) { 
      if (child.gender === Gender.Female && child.age > myAge) {
        oldestSisters.push(child)
      }
      return oldestSisters;
    }
  }

  getGreaterAncestors() {
    if ((this.father === null) && (this.mother === null)) {
      return null;
    } else {
      const parents = this.getParents()
      const oldest = [];
      if (parents.mother || parents.father) {
        if (parents.mother) {
          oldest.push(parents.mother)
        }
        if (parents.father) {
          oldest.push(parents.father)
        }
        const fatherAncestors = parents.father.getGreatestAncestors()
        const montherAncestors = parents.monther.getGreatestAncestors()
        if (fatherAncestors && fatherAncestors.length !== 0) {
          oldest.concat(fatherAncestors)
        }
        if (fatherAncestors && montherAncestors.length !== 0) {
          oldest.concat(montherAncestors)
        }
      } else {
        return oldest
      }
    } 
  }
}


// heapfiy

function getLeftIndex(index) {
  return 2 * index + 1;
}

function getRightIndex(index) {
  return 2 * index + 2;
}

function heapify(array, index, size) {
  let element = index;
  const left = getLeftIndex(index);
  const right = getRightIndex(index);
  if (left < size && array[left] > array[element]) {
    element = left;
  }
  if (right < size && array[right] > array[element]) {
    element = right;
  }
  if (index !== element) {
    swap(array, index, element);
    heapify(array, element, size);
  }
}

function buildMaxHeap(array, size) {
  for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
    heapify(array, i, size);
  }
}

function heapSort(array) {
  let heapSize = array.length;
  buildMaxHeap(array, heapSize);

  while (heapSize > 0) {
    swap(array, 0, --heapSize);
    heapify(array, 0, heapSize);
  }
  return array;
}