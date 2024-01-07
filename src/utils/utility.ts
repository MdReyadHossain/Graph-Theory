const selectToAddSegment = (graph: Graph, point1: Point, point2: Point) => {
    graph.addSegment(new Segment(point1, point2));
    point1 = point2;
}

const getSegmentsIncludingPoint = (point: Point, segments: Segment[]) => {
    const seg: Segment[] = [];
    for (const segment of segments) {
        if (segment.includes(point))
            seg.push(segment);
    }

    return seg;
}

const getNearestPoints = (newPoint: Point, points: Point[], threshold: number) => {
    if (points.length == 0)
        return;
    let minDistance: number = distanceBetweenPoint(newPoint, points[0]);
    let nearestPoint: Point | undefined = undefined;
    for (const point of points) {
        const distance: number = distanceBetweenPoint(newPoint, point);
        if (distance <= minDistance && distance < threshold) {
            minDistance = distance;
            nearestPoint = point;
        }
    }
    return nearestPoint;
}

const add = (point1: Point, point2: Point) => {
    return new Point(point1.x + point2.x, point1.y + point2.y);
}

const subtract = (point1: Point, point2: Point) => {
    return new Point(point1.x - point2.x, point1.y - point2.y);
}

const scale = (point: Point, scaler: number) => {
    return new Point(point.x * scaler, point.y * scaler);
}

const distanceBetweenPoint = (point1: Point, point2: Point) => {
    return Math.hypot(point1.x - point2.x, point1.y - point2.y);
}