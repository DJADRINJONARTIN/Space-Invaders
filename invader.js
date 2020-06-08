class Invader {
  constructor(x, y, img) {
		this.x = x;
    this.y = y;
    this.xspeed = 1;
    this.img = img;
    this.w = this.img.width / 2;
    this.h = this.img.height / 2;
  }

  collides(b) {
    return (b.x > this.x 
          && b.x < this.x + this.w
          && b.y > this.y
          && b.y < this.y + this.h);
  }

  shiftDown() {
    this.y += this.h;
    this.xspeed *= -1;
  }

  update() {
    this.x += this.xspeed;
  }

  show() {
    image(this.img, this.x, this.y, this.w, this.h);
  }
}