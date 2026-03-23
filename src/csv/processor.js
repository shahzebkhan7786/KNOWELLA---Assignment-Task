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

/* ✅ STATIC DATA (NO FILE SYSTEM) */
const sampleData = [
  { name: "john", age: 28 },
  { name: "alice", age: 22 },
  { name: "bob", age: 35 }
];

exports.processCSV = async (config) => {
  return sampleData
    .filter(row => applyFilters(row, config.filters))
    .map(row => applyTransformations(row, config.transformations));
};
