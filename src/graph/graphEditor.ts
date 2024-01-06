class GraphEditor {
    canvas: HTMLCanvasElement;
    graph: Graph;
    ctx: CanvasRenderingContext2D;
    selected?: Point | null;
    hovered?: Point | null;
    drag: boolean;
    mouse: Point;
    constructor(canvas: HTMLCanvasElement, graph: Graph) {
        this.canvas = canvas;
        this.graph = graph;
        this.drag = false;
        this.mouse = new Point(0, 0);
        this.ctx = this.canvas.getContext('2d')!;

        this.#mouseEvent();
    }

    #mouseEvent() {
        this.canvas.addEventListener('mousedown', (event) => {
            if (event.button == 0) {
                if (this.hovered) {
                    this.#selectToAddSegment(this.hovered);
                    this.drag = true;
                    return;
                }
                this.graph.addPoint(this.mouse);
                this.#selectToAddSegment(this.mouse);
                this.hovered = this.mouse;
            }
        });
        this.canvas.addEventListener('mousemove', (event) => {
            this.mouse = new Point(event.offsetX, event.offsetY);
            this.hovered = getNearestPoints(this.mouse, this.graph.points, 18);
            if (this.drag && this.selected) {
                this.selected.x = this.mouse.x;
                this.selected.y = this.mouse.y;
            }
        });
        this.canvas.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            if (this.selected)
                this.selected = null;
            else if (this.hovered)
                this.#removePoint(this.hovered);
        });
        this.canvas.addEventListener('mouseup', () => this.drag = false);
    }

    #removePoint(point: Point) {
        this.graph.removePoint(point);
        if (this.selected == point)
            this.selected = null;
        this.hovered = null;
    }

    #selectToAddSegment(point: Point) {
        if (this.selected)
            this.graph.addSegment(new Segment(this.selected, point));
        this.selected = point;
    }

    display() {
        this.graph.draw(this.ctx);
        if (this.hovered) {
            this.hovered.draw(this.ctx, { filled: true });
        }
        if (this.selected) {
            const point: Point = this.hovered ? this.hovered : this.mouse;
            const newSegment = new Segment(this.selected, point);
            newSegment.draw(this.ctx, { dash: true });
            this.selected.draw(this.ctx, { outline: true });
        }
    }
}