// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// QuadTree
// https://www.youtube.com/watch?v=z0YFFg_nBjw

// For more:
// https://github.com/CodingTrain/QuadTree

class Particle {
  constructor(x, y, index) {
    this.y = y;
    this.x = x;
    this.r = 4;
    this.d = this.r * 2;
    this.highlight = false;
  }

  // check if this particle intersects with 'other'
  intersects(other) {
    var d = dist(this.x, this.y, other.x, other.y);
    return (d < this.r + other.r);
  }

  // random particle movement
  move() {
    this.x += random(-1, 1);
    this.y += random(-1, 1);
  }

  // move particles to other side of the screen
  offScreen() {
    if (this.x < boundary.l) {
      this.x = boundary.r - this.r;
    } else if (this.x > boundary.r) {
      this.x = boundary.l + this.r;
    }

    if (this.y < boundary.u) {
      this.y = boundary.d - this.r;
    } else if (this.y > boundary.d) {
      this.y = boundary.u + this.r;
    }
  }

  // show particle on screen
  render() {
    noStroke();
    fill(this.highlight ? 255 : 100);
    ellipse(this.x, this.y, this.d);
  }
}

// add number particles at random location
function addParticles(count) {
  for (var i = 1; i <= count; i++) {
    particles[particles.length] = new Particle(random(boundary.l, boundary.r), random(boundary.u, boundary.d));
  }
}