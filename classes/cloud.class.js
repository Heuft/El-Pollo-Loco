class Cloud extends MovableObject {
  y = 50;
  width = 500;
  height = 250;

  constructor() {
    super().loadImage("../img/5_background/layers/4_clouds/1.png");

    this.x = 500 + Math.random() * 2000;
    this.animate();
    this.speed = 0.5 + Math.random() * 0.9;
  }

  /**
   * Animate all Clouds
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 12);
  }
}
