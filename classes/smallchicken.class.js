class SmallChicken extends MovableObject {
  y = 360;
  height = 60;
  width = 60;
  Images_Walking = [
    "../img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "../img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "../img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  constructor() {
    super().loadImage("../img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.Images_Walking);
    this.x = 300 + Math.random() * 600;
    this.speed = 0.2 + Math.random() * 0.75;

    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
    setInterval(() => {
      this.playAnimation(this.Images_Walking);
    }, 150);
  }
}
