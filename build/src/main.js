const addRandomSegment = () => {
  const point1 = Math.floor(Math.random() * graph.points.length);
  const point2 = Math.floor(Math.random() * graph.points.length);
  if (point1 != point2) {
    const segementSuccess = graph.tryAddSegment(new Segment(graph.points[point1], graph.points[point2]));
    console.log(segementSuccess);
  } else
    console.log(false);
  ctx.clearRect(0, 0, city.width, city.height);
  graph.draw(ctx);
};
const removeRandomSegment = () => {
  const index = Math.floor(Math.random() * graph.segments.length);
  const removeSuccress = graph.removeSegment(graph.segments[index]);
  ctx.clearRect(0, 0, city.width, city.height);
  graph.draw(ctx);
  console.log(removeSuccress);
};
const addRandomPoint = () => {
  const pointSuccess = graph.tryAddPoint(new Point(Math.floor(Math.random() * city.width), Math.floor(Math.random() * city.height)));
  ctx.clearRect(0, 0, city.width, city.height);
  graph.draw(ctx);
};
const removeRandomPoint = () => {
  const index = Math.floor(Math.random() * graph.points.length);
  const removeSuccress = graph.removePoint(graph.points[index]);
  ctx.clearRect(0, 0, city.width, city.height);
  graph.draw(ctx);
  console.log(removeSuccress);
};
const clearGraph = () => {
  graph.disposeGraph();
  ctx.clearRect(0, 0, city.width, city.height);
  graph.draw(ctx);
  graphEditor.selected = void 0;
};
const city = document.getElementById("city");
const ctx = city.getContext("2d");
city.height = window.innerHeight - 200;
city.width = window.innerWidth - 50;
const p1 = new Point(800, 200, "p1");
const p2 = new Point(1500, 200, "p2");
const p3 = new Point(1400, 700, "p3");
const p4 = new Point(600, 500, "p4");
const s1 = new Segment(p1, p2);
const s2 = new Segment(p2, p3);
const s3 = new Segment(p3, p4);
const s4 = new Segment(p4, p2);
const s5 = new Segment(p4, p1);
const graph = new Graph([p1, p4], [s5]);
const viewPort = new ViewPort(city);
const graphEditor = new GraphEditor(viewPort, graph);
const animate = () => {
  ctx.clearRect(0, 0, city.width, city.height);
  ctx.save();
  ctx.translate(viewPort.center.x, viewPort.center.y);
  ctx.scale(1 / viewPort.view, 1 / viewPort.view);
  const offset = viewPort.getOffset();
  ctx.translate(offset.x, offset.y);
  graphEditor.display();
  ctx.restore();
  requestAnimationFrame(animate);
};
animate();
