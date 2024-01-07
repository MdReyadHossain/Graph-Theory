class ViewPort {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.view = 1;
    this.center = new Point(canvas.width / 2, canvas.height / 2);
    this.offset = scale(this.center, -1);
    this.drag = {
      start: new Point(0, 0),
      end: new Point(0, 0),
      offset: new Point(0, 0),
      active: false
    };
    this.#mouseEvent();
  }
  getPointer(event) {
    return new Point((event.offsetX - this.center.x) * this.view - this.offset.x, (event.offsetY - this.center.y) * this.view - this.offset.y);
  }
  getOffset() {
    return add(this.offset, this.drag.offset);
  }
  #mouseEvent() {
    this.canvas.addEventListener("wheel", (event) => {
      const wheelDirection = Math.sign(event.deltaY);
      this.view += wheelDirection * 0.1;
      this.view = this.view < 1 ? 1 : this.view > 5 ? 5 : this.view;
      console.log(this.view);
    });
    this.canvas.addEventListener("mousedown", (event) => {
      if (event.button == 1) {
        this.drag.start = this.getPointer(event);
        this.drag.active = true;
      }
    });
    this.canvas.addEventListener("mousemove", (event) => {
      if (this.drag.active) {
        this.drag.end = this.getPointer(event);
        this.drag.offset = subtract(this.drag.end, this.drag.start);
      }
    });
    this.canvas.addEventListener("mouseup", () => {
      if (this.drag.active) {
        this.offset = add(this.offset, this.drag.offset);
        this.drag = {
          start: new Point(0, 0),
          end: new Point(0, 0),
          offset: new Point(0, 0),
          active: false
        };
      }
    });
  }
}
