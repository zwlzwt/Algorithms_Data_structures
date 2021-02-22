function parseJosn(json) {
  for (const key in json) {
    const v = json[key];
    if (parseNumber(v) !== null) {
      json[key] = parseNumber(v);
    } else if (parseBooleans(v) !== null) {
      json[key] = parseBooleans(v);
    } else if (parseNull(v) === null ) {
      json[key] = parseNull(v);
    }

  }

  return json;

  function parseNull(v) {
    if (v === 'null') {
      return null;
    } else {
      return;
    }
  }

  function parseBooleans(v) {
    // 基本同上
    v = v.toLowerCase()

    if (v === 'false') {
      return false
    } else if (v === 'true') {
      return true
    } else {
      return null
    }
  }

  function parseNumber(str) {
    let i = 0
    let start = i
    if (str[i] === "-") i++
    if (str[i] === "0") {
      i++
    } else if (str[i] >= "1" && str[i] <= "9") {
      i++
      while (str[i] >= "0" && str[i] <= "9") {
        i++;
      }
    }

    if (str[i] === ".") {
      i++
      while (str[i] >= "0" && str[i] <= "9") {
        i++
      }
    }
    if (str[i] === "e" || str[i] === "E") {
      i++
      if (str[i] === "-" || str[i] === "+") {
        i++
      }
      while (str[i] >= "0" && str[i] <= "9") {
        i++
      }
    }
    if (i > start) {
      return Number(str.slice(start, i));
    }
  }
  return null
}