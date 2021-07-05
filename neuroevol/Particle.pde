class Particle{
  PVector pos;
  Ray[] rays;
  Particle(){
    this.rays = new Ray[360];
    this.pos = new PVector(width/2, height/2);
    for(int a = 0; a<360; a++){
      this.rays[a] = new Ray(this.pos, radians(a));
    } 
  }
  void show(){
    fill(255); 
    ellipse(this.pos.x, this.pos.y, 4, 4);
    for(Ray ray: this.rays ){
      ray.show();
    }  
  }
  void updatePos(float x , float y){
     this.pos.x = x; 
     this.pos.y = y;
  }
   void look(Wall[] walls) {
    for (int i = 0; i < this.rays.length; i++) {
      Ray ray = this.rays[i];
      PVector closest = null;
      float record = 999999999;
      for (Wall wall : walls) {
        PVector pt = ray.cast(wall);
        if (pt != null) {
          float d = PVector.dist(this.pos, pt);
          if (d < record) {
            record = d;
            closest = pt;
          }
        }
      }
      if (closest != null) {
        // colorMode(HSB);
        // stroke((i + frameCount * 2) % 360, 255, 255, 50);
        stroke(255, 100);
        line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
    }
  }
  
}
    
