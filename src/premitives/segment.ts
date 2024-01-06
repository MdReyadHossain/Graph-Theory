class Segment {
    point1: Point;
    point2: Point;
    constructor(point1: Point, point2: Point) {
        this.point1 = point1;
        this.point2 = point2;
    }

    equals(segment: Segment) {
        return this.includes(segment.point1) && this.includes(segment.point2);
    }

    includes(point: Point) {
        return this.point1.equals(point) || this.point2.equals(point);
    }

    draw(ctx: CanvasRenderingContext2D, { width = 2, color = 'black', dash = false } = {}) {
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        if (dash)
            ctx.setLineDash([3, 3]);
        ctx.moveTo(this.point1.x, this.point1.y);
        ctx.lineTo(this.point2.x, this.point2.y);
        ctx.stroke();
        ctx.setLineDash([]);
    }
}