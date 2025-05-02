class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 1.5;
  energy = 100;
  statusbottle = 0;
  statusCoin = 0;
  lastHit = 0;
  minX = 500;
  maxX = 3500;

  isColliding(mo) {
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x + mo.width &&
      this.y < mo.y + mo.height
    );
  }

  hit() {
    this.energy -= 10;
    this.lastHit = new Date().getTime();
    if (this.energy < 0) {
      this.energy = 0;
    }
  }

  getBottle() {
    this.statusbottle += 20;
    if (this.statusbottle > 100) {
      this.statusbottle = 100;
    }
  }

  throwBottle() {
    this.statusbottle -= 20;
    if (this.statusbottle < 0) {
      this.statusbottle = 0;
    }
  }

  getCoin() {
    this.statusCoin += 19;
    if (this.statusCoin > 100) {
      this.statusCoin = 100;
    }
  }

  isDead() {
    return this.energy == 0;
  }
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;

        if (this.y >= 225) {
          this.y = 225;
          this.speedY = 0;

          if (this instanceof Character && !this.hasLandedOnce) {
            this.hasLandedOnce = true;
            this.loadImage("../img/2_character_pepe/2_walk/W-21.png");
          }
        }
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 225;
    }
  }

  moveRight() {
    this.x += this.speed;
  }
  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 17;
    playSound("../audio/Cartoon Jump Sound Effect.mp3", 0.01);
  }
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
