/*
Vehicle has 8 sensors,that means 8 input to the neural network
Rays will have max distance. FOV is set.

The possible values of it fitness inputs are 
  1) hitting a wall   - Score : 1
  2) not hitting a wall - Score : 0
Map sensor reading from 0 => 1 as inverse to the length of the
Ray where it intersects upto 50px(FOV)


NN Archietecture:
inputs : 8 inputs from sensor of the car,
hidden : 8 arbitary
output : 1 


Evolving for "desired velocity" i.e.
calculate : Steering = desired velocity - current velocity
apply:  the steering to acc;
Assuming going at max speed,
output should be a number between 0,1


*/

class Particle {
  constructor(brain) {
    this.dead = false;
    this.fitness = 0;
    this.finished = false;
    this.pos = createVector(start.x, start.y);
    this.vel = createVector();
    this.acc = createVector();
    this.sight = 50;
    this.maxSpeed = 3;
    this.lifeSpan = 0;

    this.rays = [];
    for (let a = 0; a < 360; a += 45) {
      this.rays.push(new Ray(this.pos, radians(a)));
    }
    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(this.rays.length, this.rays.length, 1);
    }
  }
  dispose() {
    this.brain.dispose();
  }
  mutate() {
    this.brain.mutate(MUTATION_RATE);
  }

  // physics engine using eulers integration
  applyForce(force) {
    this.acc.add(force);
  }
  update() {
    this.lifeSpan++;
    if (!this.dead && !this.finished) {
      this.pos.add(this.vel);
      this.vel.add(this.acc);
      this.vel.limit(this.maxSpeed);
      this.acc.set(0, 0);
    }
  }
  checkLifeSpan() {
    if (this.lifeSpan === limitLifeSpan) {
      this.dead = true;
    }
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
            // record - find the closest wall
            // sight  - see upto only sight pixels (FOV)
            record = d;
            closest = pt;
          }
        }
      }
      inputs[i] = map(record, 0, 50, 1, 0);
      if (record < 2) {
        this.dead = true;
        // hits wall
      }

      if (closest) {
        // colorMode(HSB);
        // stroke((i + frameCount * 2) % 360, 255, 255, 50);
        stroke(255, 100);
        line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
    }
    const output = this.brain.predict(inputs);
    const angle = map(output[0], 0, 1, 0, TWO_PI);
    const steering = p5.Vector.fromAngle(angle);
    steering.sub(this.vel);
    steering.setMag(this.maxSpeed);
    this.applyForce(steering);
  }
  // checks if vehicle is close to the target
  check(target) {
    const d = p5.Vector.dist(this.pos, target);
    if (d < 10) {
      this.finished = true;
    }
  }
  // calculates fitness of the particle from current pos to target
  calculateFitness(target) {
    if (this.finished) {
      this.fitness = 1;
    } else {
      const d = p5.Vector.dist(this.pos, target);
      this.fitness = constrain(1 / d, 0, 1);
    }
  }

  show() {
    if (this.finished) {
      fill(0, 128, 0);
      noOfFinished++;
      isFinishedGen = true;
    } else {
      fill(255);
    }

    ellipse(this.pos.x, this.pos.y, 8);
  }
}
