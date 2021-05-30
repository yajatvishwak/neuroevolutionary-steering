class Wall{
  PVector a,b; 
  Wall(int x1, int y1, int x2, int y2){
     this.a = new PVector(x1, y1);
     this.b = new PVector(x2, y2);
   }
   void show() {
    stroke(255);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
   }
 
 }
