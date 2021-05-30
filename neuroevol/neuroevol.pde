Wall w;
Ray r;
void setup(){
 size(400,400);
 w = new Wall(300,150,300,200);
 r = new Ray(100,200);
}

void draw(){
  background(0);
  w.show();
  r.show();
}
