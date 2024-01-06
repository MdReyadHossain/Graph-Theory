interface IDesign {
    size: number;
    color: string;
    outline: boolean;
}

class Point {
    x: number;
    y: number;
    pointText: string;
    constructor(x: number, y: number, pontText: string = '') {
        this.x = x;
        this.y = y;
        this.pointText = pontText;
    }

    equals(point: Point) {
        return point.x == this.x && point.y == this.y
    }

    draw(ctx: CanvasRenderingContext2D, { size = 16, color = 'white', outline = false } = {}) {
        const rad: number = Math.floor(size / 2);
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.font = '20px Arial';
        ctx.fillText(this.pointText, this.x, this.y - 15);
        ctx.arc(this.x, this.y, rad, 0, Math.PI * 2);
        ctx.fill();
        if (outline) {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'black';
            ctx.arc(this.x, this.y, 8 * 0.5, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
}