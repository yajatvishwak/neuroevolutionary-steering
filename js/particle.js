class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.sight = 50;
    this.maxspeed = 3;
    this.rays = [];
    for (let a = 0; a < 360; a += 45) {
      this.rays.push(new Ray(this.pos, radians(a)));
    }
    console.log(this.rays.length);
    this.brain = new NeuralNetwork(this.rays.length, this.rays.length, 1);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update(x, y) {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.acc.set(0, 0);
  }

  look(walls) {
    const inputs = [];
    for (let i = 0; i < this.rays.length; i++) {
      const ray = this.rays[i];
      let closest = null;
      let record = this.sight;
      for (let wall of walls) {
        const pt = ray.cast(wall);
        if (pt) {
          const d = p5.Vector.dist(this.pos, pt);
          if (d < record && d < this.sight) {
            record = d;
            closest = pt;
          }
        }
      }
      inputs[i] = map(record, 0, 50, 1, 0);

      if (closest) {
        stroke(255, 100);
        line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
    }
    const output = this.brain.predict(inputs);
    const angle = map(output[0], 0, 1, 0, TWO_PI);
    const steering = p5.Vector.fromAngle(angle);
    steering.setMag(this.maxspeed);
    steering.sub(this.vel);
    this.applyForce(steering);
    console.log(output);
  }

  show() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, 4);
  }
}
