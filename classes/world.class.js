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
      if (this.endGame) return;
      this.checkCollision();
      this.checkThrowObjects();
      this.checkBottleCollision();
      this.checkCoinCollision();
      this.checkEnemyTopCollision();
      this.checkThrowBottleCollision();
      this.startEndbossTheme();
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
          let isSpecialEnemyWith90Energy = isEnemyType && enemy.energy === 90;

          if (!isSpecialEnemyWith90Energy) {
            this.character.hit();

            playSound("../audio/male_hurt7-48124.mp3", 0.1);
            this.statusBarHealth.setPercent(this.character.energy);

            if (this.character.energy <= 0) {
              this.endGame = true;
              playSound("../audio/violin-lose-4-185125.mp3", 0.1);
            }
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
          playSound("../audio/jump-sound-14839.mp3", 0.1);
          return false;
        }
      }
      return true;
    });
  }

  checkBottleCollision() {
    this.level.bottlebottom = this.level.bottlebottom.filter((bottlebottom) => {
      if (this.character.isColliding(bottlebottom)) {
        playSound("../audio/bottle-clink-101000.mp3", 0.01);
        this.character.getBottle();
        this.statusBarBottle.setPercent(this.character.statusbottle);
        return false;
      }
      return true;
    });
  }

  startEndbossTheme() {
    if (!endbossThemeSound && world.character.x > 3300) {
      endbossThemeSound = playSound(
        "../audio/ultimatum-120bpm-orchestra-loop-325053.mp3",
        0.1
      );
      endbossThemeSound.loop = true;
    }
  }

  checkCoinCollision() {
    this.level.coins = this.level.coins.filter((coins) => {
      if (this.character.isColliding(coins)) {
        playSound("../audio/coin-recieved-230517.mp3", 0.01);
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
          playSound(
            "../audio/Chicken Scream Noise - Sound Effect for editing.mp3",
            0.1
          );
          if (enemy instanceof Endboss) {
            this.statusbarEndboss.setPercent(enemy.energy);
            playSound(
              "../audio/Chicken Scream Noise - Sound Effect for editing.mp3",
              0.1
            );
            if (enemy.energy <= 0) {
              this.endGame = true;
              playSound("../audio/you-win-sequence-1-183948.mp3", 0.1);
              pauseSound(backgroundMusic);
            }
          }
        }
      });
    });
  }

  setWorld() {
    this.character.world = this;
  }

  playEndbossTheme() {
    if (world.character.x > 3300) EndbossTheme.play();
  }

  draw() {
    if (this.endGame) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectToMap(this.level.backgroundObject);
    this.addObjectToMap(this.level.clouds);

    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusBarCoin);
    this.ctx.translate(this.camera_x, 0);
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
