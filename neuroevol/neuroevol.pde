Wall[] walls;
Particle p;
void setup(){
 size(400,400);
 walls = new Wall[5];
 for(int i =0 ; i< walls.length; i++){
   walls[i] = new Wall(random(width),random(height),random(width),random(height));
 }
 walls[walls.length-4] = (new Boundary(0, 0, width, 0));
 walls[walls.length-3] = (new Boundary(width, 0, width, height));
 walls[walls.length-2] = (new Boundary(width, height, 0, height));
 walls[walls.length-1] = (new Boundary(0, height, 0, 0));
 p = new Particle();
}

void draw(){
  background(0);
  for(Wall w : walls){
    w.show();
    
  }
  p.show();
  p.look(walls);

  p.updatePos(mouseX, mouseY);
  
}
