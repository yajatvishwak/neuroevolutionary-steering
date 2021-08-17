function nextGeneration() {
  calculateFitness(end);
  for (let i = 0; i < TOTAL; i++) {
    population[i] = pickOne();
  }
  for (let i = 0; i < TOTAL; i++) {
    savedParticles[i].dispose();
  }
  savedParticles = [];
}

function pickOne() {
  let index = 0;
  let r = random(1);
  while (r > 0) {
    r = r - savedParticles[index].fitness;
    index++;
  }
  index--;
  let particle = savedParticles[index];
  let child = new Particle(particle.brain);
  child.mutate();
  return child;
}

function calculateFitness(target) {
  let max = 0;
  for (let particle of savedParticles) {
    particle.calculateFitness(target);
    if (particle.fitness > max) {
      max = particle.fitness;
    }
  }
  maxFitnessScore = max;
  let sum = 0;
  for (let particle of savedParticles) {
    sum += particle.fitness;
  }
  for (let particle of savedParticles) {
    particle.fitness = particle.fitness / sum;
  }
}
