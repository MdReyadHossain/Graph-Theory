class Graph {
    points: Array<Point>;
    segments: Array<Segment>
    constructor(points: Point[] = [], segments: Segment[] = []) {
        this.points = points;
        this.segments = segments;
    }

    nC2(n: number) {
        return (n / 2 * n - 1) == this.segments.length;
    }

    addPoint(point: Point) {
        this.points.push(point);
    }

    removePoint(point: Point) {
        const segments: Segment[] = getSegmentsIncludingPoint(point, this.segments);
        for (const segment of segments)
            this.removeSegment(segment);

        const index = this.points.indexOf(point);
        if (index !== -1) {
            this.points.splice(index, 1);
            return true;
        }
        return false;
    }

    containPoint(point: Point) {
        return this.points.find((p) => p.equals(point))
    }

    // testing random add point
    tryAddPoint(point: Point) {
        if (this.containPoint(point)) return false;

        this.addPoint(point);
        return true;
    }

    addSegment(segment: Segment) {
        const n: number = this.points.length;
        if (!this.nC2(n) && !this.containSegment(segment))
            this.segments.push(segment);
        else
            return console.log('all segments filled');
    }

    containSegment(segment: Segment) {
        return this.segments.find((s) => s.equals(segment));
    }

    // testing random add segment
    tryAddSegment(segment: Segment) {
        if (this.containSegment(segment)) return false;

        this.addSegment(segment);
        return true;
    }

    removeSegment(segment: Segment) {
        const index = this.segments.indexOf(segment);
        if (index !== -1) {
            this.segments.splice(index, 1);
            return true;
        }
        return false;
    }

    // testing remove segment
    tryRemoveSegment() {
        if (this.segments.length == 0) {
            return false
        }
        this.segments.pop();
        return true;
    }

    disposeGraph() {
        this.points.length = 0;
        this.segments.length = 0;
    }

    draw(ctx: CanvasRenderingContext2D) {
        for (const segment of this.segments) {
            segment.draw(ctx);
        }

        for (const point of this.points) {
            point.draw(ctx);
        }
    }
}