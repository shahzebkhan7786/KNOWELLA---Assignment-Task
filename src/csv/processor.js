const fs = require("fs");
const csv = require("csv-parser");

function applyFilters(row, filters) {
  return filters.every(f => {
    if (f.operator === ">") return Number(row[f.column]) > f.value;
    if (f.operator === "<") return Number(row[f.column]) < f.value;
    return true;
  });
}

function applyTransformations(row, transformations) {
  transformations.forEach(t => {
    if (t.operation === "uppercase") {
      row[t.column] = row[t.column].toUpperCase();
    }
  });
  return row;
}

exports.processCSV = (filePath, config) => {
  return new Promise((resolve) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        if (applyFilters(row, config.filters)) {
          results.push(applyTransformations(row, config.transformations));
        }
      })
      .on("end", () => resolve(results));
  });
};
