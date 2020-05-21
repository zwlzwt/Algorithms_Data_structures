//var csv is the CSV file with headers
function csvJSON(csv) {

  const lines = csv.split("\n");

  const result = [];

  const headers = lines[0].split(",");

  for (let i = 1; i < lines.length; i++) {

    const obj = {};
    const currentline = lines[i].split(",");

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);

  }

  //return result; //JavaScript object
  return JSON.stringify(result); //JSON
}

//var tsv is the TSV file with headers
function tsvJSON(tsv) {

  var lines = tsv.split("\n");

  var result = [];

  var headers = lines[0].split("\t");

  for (var i = 1; i < lines.length; i++) {

    var obj = {};
    var currentline = lines[i].split("\t");

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);

  }

  //return result; //JavaScript object
  return JSON.stringify(result); //JSON
}