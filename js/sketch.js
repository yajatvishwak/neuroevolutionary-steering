

let walls = [];
let ray;
let particle;


// start of track
let start, end;

function setup() {
  createCanvas(400, 400);

  walls.push(new Boundary(50, 350, 50, 200));
  walls.push(new Boundary(50, 200, 150, 50));
  walls.push(new Boundary(150, 50, 350, 50));
  walls.push(new Boundary(100, 350, 100, 200));
  walls.push(new Boundary(100, 200, 175, 100));
  walls.push(new Boundary(175, 100, 350, 100));
  start = createVector(75, 350)
  end = createVector(350, 75) 
  particle = new Particle(start.x, start.y);
}

function draw() {
  background(0);
  for (let wall of walls) {
    wall.show();
  }
  particle.update(mouseX, mouseY);
  particle.show();
  particle.look(walls);


  ellipse(start.x ,start.y, 10);
  ellipse(end.x, end.y, 10);
}
