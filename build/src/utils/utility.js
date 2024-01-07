const selectToAddSegment = (graph, point1, point2) => {
  graph.addSegment(new Segment(point1, point2));
  point1 = point2;
};
const getSegmentsIncludingPoint = (point, segments) => {
  const seg = [];
  for (const segment of segments) {
    if (segment.includes(point))
      seg.push(segment);
  }
  return seg;
};
const getNearestPoints = (newPoint, points, threshold) => {
  if (points.length == 0)
    return;
  let minDistance = distanceBetweenPoint(newPoint, points[0]);
  let nearestPoint = void 0;
  for (const point of points) {
    const distance = distanceBetweenPoint(newPoint, point);
    if (distance <= minDistance && distance < threshold) {
      minDistance = distance;
      nearestPoint = point;
    }
  }
  return nearestPoint;
};
const add = (point1, point2) => {
  return new Point(point1.x + point2.x, point1.y + point2.y);
};
const subtract = (point1, point2) => {
  return new Point(point1.x - point2.x, point1.y - point2.y);
};
const scale = (point, scaler) => {
  return new Point(point.x * scaler, point.y * scaler);
};
const distanceBetweenPoint = (point1, point2) => {
  return Math.hypot(point1.x - point2.x, point1.y - point2.y);
};
