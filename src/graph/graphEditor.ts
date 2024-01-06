class GraphEditor {
    canvas: HTMLCanvasElement;
    graph: Graph;
    ctx: CanvasRenderingContext2D;
    selected?: Point | null;
    hovered?: Point | null;
    drag: boolean;
    constructor(canvas: HTMLCanvasElement, graph: Graph) {
        this.canvas = canvas;
        this.graph = graph;
        this.drag = false;
        this.ctx = this.canvas.getContext('2d')!;

        this.#mouseEvent();
    }

    #mouseEvent() {
        this.canvas.addEventListener('mousedown', (event) => {
            if (event.button == 0) {
                const mouse = new Point(event.offsetX, event.offsetY);
                if (this.hovered) {
                    this.#selectToAddSegment(this.hovered);
                    this.drag = true;
                    return;
                }
                this.graph.addPoint(mouse);
                this.#selectToAddSegment(mouse);
                this.hovered = mouse;
            }
        });
        this.canvas.addEventListener('mousemove', (event) => {
            const mouse = new Point(event.offsetX, event.offsetY);
            this.hovered = getNearestPoints(mouse, this.graph.points, 18);
            if (this.drag && this.selected) {
                this.selected.x = mouse.x;
                this.selected.y = mouse.y;
            }
        });
        this.canvas.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            if (this.hovered) {
                this.graph.removePoint(this.hovered);
                if (this.selected == this.hovered) {
                    this.selected = null;
                    console.log('object')
                }
                this.hovered = null;
            } else {
                this.selected = null;
            }
        });
        this.canvas.addEventListener('mouseup', () => this.drag = false);
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
            this.selected.draw(this.ctx, { outline: true });
        }
    }
}