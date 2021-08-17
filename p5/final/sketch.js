let walls = [];
let ray;
let particle;
let start, end;

let population = [];
let savedParticles = [];
let TOTAL = 100;
let MUTATION_RATE = 0.5;
let generation = 0;
let noOfFinished = 0;
let limitLifeSpan = 400;
let maxFitnessScore = -1;
let isFinishedGen = false;

function setup() {
  createCanvas(400, 400);
  tf.setBackend("cpu");
  walls.push(new Boundary(50, height - 10, 50, 200));
  walls.push(new Boundary(50, 200, 150, 50));
  walls.push(new Boundary(150, 50, height - 10, 50));
  walls.push(new Boundary(100, height - 10, 100, 200));
  walls.push(new Boundary(100, 200, 175, 100));
  walls.push(new Boundary(175, 100, height - 10, 100));
  walls.push(new Boundary(175, 100, height - 10, 100));
  walls.push(new Boundary(50, height - 10, 100, height - 10));
  walls.push(new Boundary(height - 10, 50, height - 10, 100));
  start = createVector(75, 350);
  end = createVector(350, 75);
  // particle = new Particle();
  for (let i = 0; i < TOTAL; i++) {
    population[i] = new Particle();
  }
}

function draw() {
  background(0);
  for (let wall of walls) {
    wall.show();
  }
  for (let particle of population) {
    particle.update();
    particle.check(end);
    particle.show();
    particle.look(walls);
    particle.checkLifeSpan();
  }
  for (let i = population.length - 1; i >= 0; i--) {
    const particle = population[i];
    if (particle.dead || particle.finished)
      savedParticles.push(population.splice(i, 1)[0]);
  }

  if (population.length === 0) {
    console.log("Generation " + generation);
    console.log("Total finished:" + noOfFinished);
    console.log("Max Fitness:" + maxFitnessScore);
    noOfFinished = 0;
    generation++;
    maxFitnessScore = -1;
    isFinishedGen = false;
    nextGeneration();
  }
  text(`NeuroEvolution in P5`, 10, 30);

  ellipse(start.x, start.y, 10);
  if (isFinishedGen) {
    fill("rgb(0,255,0)");
    ellipse(end.x, end.y, 10);
  } else {
    ellipse(end.x, end.y, 10);
  }
  text(`Generation ${generation}`, 200, 200);
  text(`Max Fitness: ${maxFitnessScore.toFixed(3)}`, 200, 220);
  text(`No of cars that \nreached the target: ${noOfFinished}`, 200, 240);
}
