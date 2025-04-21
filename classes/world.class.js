class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBarHealth = new StatusBar("health", 0, 100);
  statusBarCoin = new StatusBar("coin", 50, 0);
  statusBarBottle = new StatusBar("bottle", 100, 0);
  statusbarEndboss = new StatusbarEndboss();
  throwableObject = [];
  endGame = false;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  run() {
    setInterval(() => {
      this.checkCollision();
      this.checkThrowObjects();
      this.checkBottleCollision();
      this.checkCoinCollision();
      this.checkEnemyTopCollision();
      this.checkThrowBottleCollision();
    }, 200);
  }

  checkThrowObjects() {
    if (this.keyboard.D && this.character.statusbottle > 19) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100
      );
      this.character.throwBottle();
      this.statusBarBottle.setPercent(this.character.statusbottle);
      this.throwableObject.push(bottle);
    }
  }

  checkCollision() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        let isFalling = this.character.speedY < 0;
        let isAboveGround = this.character.isAboveGround();
        let isEnemyType =
          enemy instanceof Chicken || enemy instanceof SmallChicken;

        let isTopCollision = isFalling && isAboveGround && isEnemyType;

        if (!isTopCollision) {
          this.character.hit();
          this.statusBarHealth.setPercent(this.character.energy);
          if (this.character.energy <= 0) {
            this.endGame = true;
          }
        }
      }
    });
  }

  checkEnemyTopCollision() {
    this.level.enemies = this.level.enemies.filter((enemy) => {
      if (this.character.isColliding(enemy)) {
        let isFalling = this.character.speedY < 0;

        if (
          this.character.isAboveGround() &&
          isFalling &&
          (enemy instanceof Chicken || enemy instanceof SmallChicken)
        ) {
          enemy.isDead();
          this.character.speedY = +25;
          return false;
        }
      }
      return true;
    });
  }

  checkBottleCollision() {
    this.level.bottlebottom = this.level.bottlebottom.filter((bottlebottom) => {
      if (this.character.isColliding(bottlebottom)) {
        //Sound
        this.character.getBottle();
        this.statusBarBottle.setPercent(this.character.statusbottle);
        return false;
      }
      return true;
    });
  }

  checkCoinCollision() {
    this.level.coins = this.level.coins.filter((coins) => {
      if (this.character.isColliding(coins)) {
        //Sound
        this.character.getCoin();
        this.statusBarCoin.setPercent(this.character.statusCoin);
        return false;
      }
      return true;
    });
  }

  checkThrowBottleCollision() {
    this.throwableObject.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
          enemy.hit();
          if (enemy instanceof Endboss) {
            this.statusbarEndboss.setPercent(enemy.energy);
            if (enemy.energy <= 0) {
              this.endGame = true;
            }
          }
        }
      });
    });
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    if (this.endGame) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectToMap(this.level.backgroundObject);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusBarCoin);
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectToMap(this.level.clouds);
    this.addObjectToMap(this.level.enemies);
    this.addToMap(this.statusbarEndboss);
    this.addObjectToMap(this.throwableObject);
    this.addObjectToMap(this.level.coins);
    this.addObjectToMap(this.level.bottlebottom);
    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
