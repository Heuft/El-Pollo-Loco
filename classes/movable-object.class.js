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
      this.x < mo.x &&
      this.y < mo.y + mo.height
    );
  }

  hit() {
    this.energy -= 10;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
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
      if (this.isAboveGround() || this.speedY > 0) this.y -= this.speedY;
      this.speedY -= this.acceleration;
    }, 1000 / 25);
  }
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 217;
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
  }
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
