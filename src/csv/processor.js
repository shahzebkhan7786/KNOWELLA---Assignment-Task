const path = require("path");

exports.processCSV = (filePath, config) => {
  return new Promise((resolve, reject) => {
    const results = [];

    const fullPath = path.resolve(filePath);

    fs.createReadStream(fullPath)
      .pipe(csv())
      .on("data", (row) => {
        if (applyFilters(row, config.filters)) {
          results.push(applyTransformations(row, config.transformations));
        }
      })
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
};
