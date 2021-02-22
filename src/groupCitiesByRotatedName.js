/*
Problem:
['Tokyo', 'London', 'Rome', 'Donlon', 'Kyoto', 'Paris']
// YOUR ALGORITHM
[
    [ 'Tokyo', 'Kyoto' ],
    [ 'London', 'Donlon' ],
    [ 'Rome' ],
    [ 'Paris' ]
]
*/

// returns word such that letter 0 will be found at position idx in the return value
// permuteWord('foobar', 1) === "rfooba"
const permuteWord = (word, idx) =>
  [...Array(word.length).keys()]
    .map((i) => word.substr((i - idx + word.length) % word.length, 1))
    .join("");

// a high rank means that high UTF-16 code points will be found at the beginning of the string;
// a low rank means that low UTF-16 code points will be found at the beginning of the string;
// assuming strings of equal length. Thus it provides a partial order for string permutations.
const rank = (word, idx) =>
  permuteWord(word, idx)
    .split("")
    .map((l, i) => l.charCodeAt(0) * 65535 * (i + 1))
    .reduce((a, b) => a + b);

// returns a permutation-independent representation of lowercased name
// canonicalName('london') === canonicalName('donlon')
// canonicalName('some') !== canonicalName('different')
const canonicalName = (name) => {
  name = name.toLowerCase();
  let start = [...Array(name.length).keys()]
    .map((i) => [i, rank(name, i)])
    .reduce((a, b) => (a[1] > b[1] ? a : b))[0];
  return permuteWord(name, start);
};

// the desired grouping function
const groupCitiesByRotatedNames = (cities) => {
  let categories = {};
  for (city of cities) {
    let canonical = canonicalName(city);
    if (categories[canonical] === undefined) categories[canonical] = [city];
    else categories[canonical].push(city);
  }
  const result = [];
  for (category in categories) result.push(categories[category]);
  return result;
};
