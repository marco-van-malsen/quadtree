// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// QuadTree
// https://www.youtube.com/watch?v=z0YFFg_nBjw

// For more:
// https://github.com/CodingTrain/QuadTree

var alpha = 0; // Orientation around Z axis
var beta = 0; // Orientation around X axis
var gamma = 0; // Orientation around Y axis

var devOrient; // device orientation is used at all
var header = 15; // height for header/footer in number of pixels along Y-axis
var particles; // array of particles

function setup() {
  if (window.DeviceOrientationEvent) window.addEventListener('deviceorientation', onOrientationChange);

  devOrient = deviceOrientation;
  // if (!devOrient) {
  createCanvas(windowWidth, windowHeight);
  // } else if (devOrient = 'landscape') {
  // createCanvas(windowWidth, windowHeight);
  // } else {
  //   createCanvas(windowHeight, windowWidth);
  // }
  particles = [];
  addParticles(50);
}

function draw() {
  // read device orientation
  if (devOrient && devOrient != deviceOrientation) setup();

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
  textAlign(CENTER, CENTER);
  text("Device Orientation=" + devOrient + ", alpha=" + alpha + ", beta=" + beta + ", gamma=" + gamma, 0.5 * width, height - 0.5 * header);

  // setup quad-tree
  var boundary = new Rectangle(0.5 * width, 0.5 * height, width, height - 2 * header);
  var qtree = new QuadTree(boundary, 4);

  // turn off highlight, randomly move particle and add particles to quad-tree
  for (var p of particles) {
    p.setHighlight(false);
    p.move();
    p.offScreen();
    var point = new Point(p.x, p.y, p);
    qtree.insert(point);
  }

  // highlight all particles that are overlapping
  for (var p of particles) {
    var range = new Circle(p.x, p.y, p.d);
    var points = qtree.query(range);
    for (var point of points) {
      var other = point.userData;
      if (p !== other && p.intersects(other)) p.setHighlight(true);
      p.render();
    }
  }
}

// detect window resize
function windowResized() {
  setup();
}

function onOrientationChange(e) {
  alpha = e.alpha;
  beta = e.beta;
  gamma = e.gamma;
  println(alpha + " " + beta + " " + gamma);
}