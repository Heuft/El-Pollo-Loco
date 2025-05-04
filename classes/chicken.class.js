class Chicken extends MovableObject {
  y = 360;
  height = 60;
  width = 60;
  offset = {
    top: -40,
    left: -35,
    right: -35,
    bottom: 0,
  };
  Images_Walking = [
    "../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  Images_Dead = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  constructor() {
    super().loadImage("../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.Images_Walking);
    this.loadImages(this.Images_Dead);
    this.x = this.minX + Math.random() * (this.maxX - this.minX);
    this.speed = 0.5 + Math.random() * 0.75;

    this.animate();
  }

  /**
   * Animate Movement Chicken
   */
  animate() {
    this.moveInterval = setInterval(() => {
      if (!this.isDying) this.moveLeft();
    }, 1000 / 60);

    this.walkingInterval = setInterval(() => {
      if (this.isDying) return;
      if (this.energy == 90) {
        this.playAnimation(this.Images_Dead);
        this.speed = 0;
      } else {
        this.playAnimation(this.Images_Walking);
      }
    }, 150);
  }
}
