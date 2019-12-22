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
    if (this.x < 0) {
      this.x = width - this.r;
    } else if (this.x > width) {
      this.x = this.r;
    }

    if (this.y < header) {
      this.y = height - header - this.r;
    } else if (this.y > height - header) {
      this.y = header + this.r;
    }
  }

  // show particle on screen
  render() {
    noStroke();
    fill(this.highlight ? 255 : 100);
    ellipse(this.x, this.y, this.d);
  }

  // turn highlight on or off
  setHighlight(value) {
    this.highlight = value;
  }
}

// add number particles at random location
function addParticles(count) {
  for (let i = 1; i <= count; i++) {
    particles[particles.length] = new Particle(random(width), random(header, height));
  }
}