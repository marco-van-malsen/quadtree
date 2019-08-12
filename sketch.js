// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// QuadTree
// https://www.youtube.com/watch?v=z0YFFg_nBjw

// For more:
// https://github.com/CodingTrain/QuadTree

let particles = [];

function setup() {
  createCanvas(800, 600);
  for (let i = 0; i < 1000; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
}

function draw() {
  background(0);

  let boundary = new Rectangle(width * 0.5, height * 0.5, width, height);
  let qtree = new QuadTree(boundary, 4);

  for (let p of particles) {
    p.move();
    p.setHighlight(false);
    let point = new Point(p.x, p.y, p);
    qtree.insert(point);
  }

  for (let p of particles) {
    let range = new Circle(p.x, p.y, p.r * 2);
    let points = qtree.query(range);
    for (let point of points) {
      let other = point.userData;
      if (p !== other && p.intersects(other)) p.setHighlight(true);
      p.render();
    }
  }
}