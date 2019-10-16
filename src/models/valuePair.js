export default class ValuePair {
  constructor(key, value) {
    this.key = key;
    this.element = value;
  }

  pairToString() {
    return `${this.key}: ${this.element}`;
  }
}
