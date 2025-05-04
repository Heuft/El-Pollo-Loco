class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 1.5;
  energy = 100;
  statusbottle = 0;
  statusCoin = 0;
  lastHit = 0;
  cooldown = 1000;
  minX = 500;
  maxX = 3500;

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  /**
   * Checks if this object is colliding with another movable object.
   * @param {MovableObject} mo - The other object to check collision with.
   * @returns {boolean} True if the objects are colliding.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Applies damage to the object, reducing energy. Adds cooldown to prevent rapid re-hit.
   */
  hit() {
    let now = new Date().getTime();

    if (now - this.lastHit < this.cooldown) return;
    if ((this.statusCoin = 100)) {
      this.energy -= 20;
      this.lastHit = new Date().getTime();
    } else this.energy -= 10;
    this.lastHit = new Date().getTime();
    if (this.energy < 0) {
      this.energy = 0;
    }
  }

  /**
   * Increases the bottle status by 20, up to a max of 100.
   */
  getBottle() {
    this.statusbottle += 20;
    if (this.statusbottle > 100) {
      this.statusbottle = 100;
    }
  }

  /**
   * Decreases the bottle status by 20, down to a min of 0.
   */
  throwBottle() {
    this.statusbottle -= 20;
    if (this.statusbottle < 0) {
      this.statusbottle = 0;
    }
  }

  /**
   * Marks this object as dying, plays death animation, removes from enemy list after delay.
   */
  die() {
    this.isDying = true;
    this.playAnimation(this.Images_Dead);
    this.speed = 0;

    setTimeout(() => {
      let index = world.level.enemies.indexOf(this);
      if (index > -1) {
        world.level.enemies.splice(index, 1);
      }
    }, 1000);
  }

  /**
   * Increases coin collection status by 19, up to a max of 100.
   */
  getCoin() {
    this.statusCoin += 19;
    if (this.statusCoin > 100) {
      this.statusCoin = 100;
    }
  }

  /**
   * Checks if the object's energy has dropped to 0.
   * @returns {boolean} True if the object is dead.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Checks if the object was recently hit and is still in the hurt state.
   * @returns {boolean} True if within 1 second of last hit.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * Applies gravity effect by decreasing vertical speed and updating y-position at intervals.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
        if (this instanceof Character) {
          if (this.y >= 225) {
            this.y = 225;
            this.speedY = 0;
          }
        }
      }
    }, 1000 / 25);
  }

  /**
   * Determines whether the object is above the ground.
   * @returns {boolean} True if above ground level.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 225;
    }
  }

  /**
   * Makes the object jump by setting an upward vertical speed and playing a sound.
   */
  jump() {
    this.speedY = 17;
    playSound("../audio/Cartoon Jump Sound Effect.mp3", 0.01);
  }

  /**
   * Plays a looping animation from the provided image list.
   * @param {string[]} images - Array of image paths used for animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
