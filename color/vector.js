function sub(a, b) {
  return { x: b.x - a.x, y: b.y - a.y };
}
function add(a, b) {
  return { x: b.x + a.x, y: b.y + a.y };
}
function magnitude(a) {
  return Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2));
}
function normalize(a) {
  let mag = magnitude(a);
  return { x: a.x / mag, y: a.y / mag };
}
function scale(a, s) {
  return { x: a.x * s, y: a.y * s };
}
function distance(aX, aY, bX, bY) {
  return Math.sqrt(Math.pow(aX - bX, 2) + Math.pow(aY - bY, 2));
}
function random(n) {
  return (Math.random() - 0.5) * n;
}

function pointsAlongLine(startx, starty, endx, endy, spacing) {
  let dist = distance(startx, starty, endx, endy);
  let points = [];

  let start = { x: startx, y: starty };
  let end = { x: endx, y: endy };
  for (var d = 0; d <= dist + 1; d += spacing) {
    let relative = sub(end, start);
    let delta = scale(normalize(relative), -d);
    let point = add(start, delta);
    points.push(point);
    if (points.length >= 10000) break;
  }
  return points;
}
export { sub, add, magnitude, normalize, distance, pointsAlongLine, random };
