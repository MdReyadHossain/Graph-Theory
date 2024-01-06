class GraphEditor {
    canvas: HTMLCanvasElement;
    graph: Graph;
    ctx: CanvasRenderingContext2D;
    selected?: Point;
    constructor(canvas: HTMLCanvasElement, graph: Graph) {
        this.canvas = canvas;
        this.graph = graph;
        this.ctx = this.canvas.getContext('2d')!;

        this.#addEventListener();
    }

    #addEventListener() {
        this.canvas.addEventListener('click', (event) => {
            const mouse = new Point(event.offsetX, event.offsetY);
            this.graph.addPoint(mouse);
            this.selected = mouse;
        })
    }

    display() {
        this.graph.draw(this.ctx);
        if (this.selected) {
            this.selected.draw(this.ctx, { outline: true });
        }
    }
}