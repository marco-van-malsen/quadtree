// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// QuadTree
// https://www.youtube.com/watch?v=z0YFFg_nBjw

// For more:
// https://github.com/CodingTrain/QuadTree

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 4;
    this.highlight = false;
  }

  intersects(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    return (d < this.r + other.r);
  }

  move() {
    this.x += random(-1, 1);
    this.y += random(-1, 1);
  }

  render() {
    noStroke();
    fill(this.highlight ? 255 : 100);
    ellipse(this.x, this.y, this.r * 2);
  }

  setHighlight(value) {
    this.highlight = value;
  }
}