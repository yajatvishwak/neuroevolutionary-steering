class Ray{
  PVector pos, dir;
  Ray(int x, int y){
    this.pos = new PVector(x,y);
    this.dir = new PVector(1,0);
  }
  void show(){
    stroke(255);
    push();
    translate(this.pos.x, this.pos.y);
    line(0, 0, this.dir.x * 10, this.dir.y * 10);
    pop();
  }
}
