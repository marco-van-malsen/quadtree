// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// QuadTree
// https://www.youtube.com/watch?v=z0YFFg_nBjw

// For more:
// https://github.com/CodingTrain/QuadTree

var boundary; // boundary where particles may freely roam
var header = 15; // height for header/footer in number of pixels along Y-axis
var particles; // array of particles

function setup() {
  // create canvas
  createCanvas(windowWidth, windowHeight);

  // defaults
  rectMode(CENTER);

  // define boundary
  boundary = new Rectangle(0.5 * width, 0.5 * (height + header), width, height - header);

  // add particles
  particles = [];
  addParticles(100);
}

function draw() {
  // background
  background(0);

  // get current framerate
  var fps = frameRate();

  // add more particles if framerate allows
  if (fps > 60) addParticles(50);

  // show stats in header
  fill(255);
  noStroke();
  textAlign(LEFT, CENTER);
  text("Particles: " + particles.length, 5, 0.5 * header);
  textAlign(CENTER, CENTER);
  text("QUAD-TREE", 0.5 * width, 0.5 * header);
  textAlign(RIGHT, CENTER);
  text(int(fps) + " FPS", width - 5, 0.5 * header);

  // setup quad-tree
  var qtree = new QuadTree(boundary, 4);

  // turn off highlight, randomly move particle and add particles to quad-tree
  for (var p of particles) {
    p.highlight = false;
    p.move();
    p.offScreen();
    qtree.insert(new Point(p.x, p.y, p));
  }

  // highlight all particles that are overlapping
  for (var p of particles) {
    var points = qtree.query(new Circle(p.x, p.y, p.d));
    for (var point of points) {
      var other = point.userData;
      if (p !== other && p.intersects(other)) p.highlight = true;
      p.render();
    }
  }
}