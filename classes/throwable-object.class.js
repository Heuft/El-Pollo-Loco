class ThrowableObject extends MovableObject {
  Images_Splash = [
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x, y) {
    super().loadImage("../img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.Images_Splash);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.throw();
    this.animate();
  }

  throw() {
    this.speedY = 18;
    this.applyGravity();
    this.throwInterval = setInterval(() => {
      this.x += 8;
    }, 25);
  }

  applyGravity() {
    this.gravityInterval = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  splash() {
    clearInterval(this.gravityInterval);
    clearInterval(this.throwInterval);
    this.y = 350;
  }

  animate() {
    setInterval(() => {
      if (this.isSplashing) {
        this.playAnimation(this.Images_Splash);
      }
    }, 1000 / 10);
  }
}
