class Graph {
  constructor(points = [], segments = []) {
    this.points = points;
    this.segments = segments;
  }
  nC2(n) {
    return n / 2 * n - 1 == this.segments.length;
  }
  addPoint(point) {
    this.points.push(point);
  }
  removePoint(point) {
    const segments = getSegmentsIncludingPoint(point, this.segments);
    for (const segment of segments)
      this.removeSegment(segment);
    const index = this.points.indexOf(point);
    if (index !== -1) {
      this.points.splice(index, 1);
      return true;
    }
    return false;
  }
  containPoint(point) {
    return this.points.find((p) => p.equals(point));
  }
  tryAddPoint(point) {
    if (this.containPoint(point))
      return false;
    this.addPoint(point);
    return true;
  }
  addSegment(segment) {
    const n = this.points.length;
    if (!this.nC2(n) && !this.containSegment(segment))
      this.segments.push(segment);
    else
      return console.log("all segments filled");
  }
  containSegment(segment) {
    return this.segments.find((s) => s.equals(segment));
  }
  tryAddSegment(segment) {
    if (this.containSegment(segment))
      return false;
    this.addSegment(segment);
    return true;
  }
  removeSegment(segment) {
    const index = this.segments.indexOf(segment);
    if (index !== -1) {
      this.segments.splice(index, 1);
      return true;
    }
    return false;
  }
  tryRemoveSegment() {
    if (this.segments.length == 0) {
      return false;
    }
    this.segments.pop();
    return true;
  }
  disposeGraph() {
    this.points.length = 0;
    this.segments.length = 0;
  }
  draw(ctx) {
    for (const segment of this.segments) {
      segment.draw(ctx);
    }
    for (const point of this.points) {
      point.draw(ctx);
    }
  }
}
