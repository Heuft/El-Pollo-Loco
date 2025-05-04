class Bottle extends MovableObject {
  y = 350;
  width = 75;
  height = 75;

  offset = {
    top: 20,
    left: 15,
    right: 15,
    bottom: 20,
  };

  constructor() {
    super().loadImage("../img/6_salsa_bottle/1_salsa_bottle_on_ground.png");

    this.x = this.minX + Math.random() * (this.maxX - this.minX);
  }
}
