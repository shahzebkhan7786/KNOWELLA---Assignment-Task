function distance(a, b) {
  return Math.sqrt(
    Math.pow(a.lat - b.lat, 2) + Math.pow(a.lng - b.lng, 2)
  );
}

exports.optimizeRoute = (points) => {
  if (!points.length) return [];

  const remaining = [...points];
  const route = [];

  let current = remaining.shift();

  while (remaining.length) {
    route.push(current);

    let nearestIndex = 0;
    let minDist = Infinity;

    remaining.forEach((p, i) => {
      const d = distance(current, p);
      if (d < minDist) {
        minDist = d;
        nearestIndex = i;
      }
    });

    current = remaining.splice(nearestIndex, 1)[0];
  }

  route.push(current);
  return route;
};
