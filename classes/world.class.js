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

  /**
   * Initializes the game world with canvas and keyboard input.
   * @param {HTMLCanvasElement} canvas - The game canvas.
   * @param {Keyboard} keyboard - The keyboard input handler.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Main loop that periodically checks game events.
   */
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

  /**
   * Checks if the player throws a bottle and creates a new throwable object.
   */
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

  /**
   * Checks for collision between the player and all enemies.
   */
  checkCollision() {
    this.level.enemies.forEach((enemy) => this.handleEnemyCollision(enemy));
  }

  /**
   * Handles the logic when the player collides with an enemy.
   * @param {MovableObject} enemy - The enemy object.
   */
  handleEnemyCollision(enemy) {
    if (!this.character.isColliding(enemy)) return;

    let isFalling = this.character.speedY < 0;
    let isAbove = this.character.isAboveGround();
    let isEnemyType = enemy instanceof Chicken || enemy instanceof SmallChicken;
    let topHit = isFalling && isAbove && isEnemyType;

    if (!topHit && !(isEnemyType && enemy.energy === 90)) {
      this.character.hit();
      playSound("../audio/male_hurt7-48124.mp3", 0.1);
      this.statusBarHealth.setPercent(this.character.energy);
      if (this.character.energy <= 0) this.triggerLose();
    }
  }

  /**
   * Triggers game over due to health loss.
   */
  triggerLose() {
    this.endGame = true;
    playSound("../audio/violin-lose-4-185125.mp3", 0.1);
  }

  /**
   * Checks if the player has landed on top of an enemy and kills the enemy.
   */
  checkEnemyTopCollision() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.handleTopCollision(enemy);
      }
    });
  }

  /**
   * Handles logic when player hits an enemy from above.
   * @param {MovableObject} enemy - The enemy object.
   */
  handleTopCollision(enemy) {
    let isFalling = this.character.speedY < 0;
    let isType = enemy instanceof Chicken || enemy instanceof SmallChicken;
    if (this.character.isAboveGround() && isFalling && isType) {
      this.character.speedY = +25;
      playSound("../audio/jump-sound-14839.mp3", 0.1);
      enemy.die();
    }
  }

  /**
   * Checks if the player collects a bottle.
   */
  checkBottleCollision() {
    this.level.bottlebottom = this.level.bottlebottom.filter((b) => {
      if (this.character.isColliding(b)) {
        playSound("../audio/bottle-clink-101000.mp3", 0.01);
        this.character.getBottle();
        this.statusBarBottle.setPercent(this.character.statusbottle);
        return false;
      }
      return true;
    });
  }

  /**
   * Starts endboss music when the player reaches a specific location.
   */
  startEndbossTheme() {
    if (!endbossThemeSound && world.character.x > 3300) {
      endbossThemeSound = playSound(
        "../audio/ultimatum-120bpm-orchestra-loop-325053.mp3",
        0.1
      );
      endbossThemeSound.loop = true;
    }
  }

  /**
   * Checks if the player collects a coin.
   */
  checkCoinCollision() {
    this.level.coins = this.level.coins.filter((coin) => {
      if (this.character.isColliding(coin)) {
        playSound("../audio/coin-recieved-230517.mp3", 0.01);
        this.character.getCoin();
        this.statusBarCoin.setPercent(this.character.statusCoin);
        return false;
      }
      return true;
    });
  }

  /**
   * Checks for collisions between thrown bottles and enemies.
   */
  checkThrowBottleCollision() {
    this.throwableObject.forEach((bottle) => {
      if (bottle.hasCollided) return;
      this.level.enemies = this.level.enemies.filter((enemy) =>
        this.handleBottleHit(bottle, enemy)
      );
    });
  }

  /**
   * Handles logic when a bottle hits an enemy.
   * @param {ThrowableObject} bottle - The thrown bottle.
   * @param {MovableObject} enemy - The enemy object.
   * @returns {boolean} - Whether the enemy remains.
   */
  handleBottleHit(bottle, enemy) {
    if (!bottle.isColliding(enemy)) return true;

    bottle.hasCollided = true;
    if (enemy instanceof Endboss) bottle.splashY = 200;
    enemy.hit();

    playSound(
      "../audio/Chicken Scream Noise - Sound Effect for editing.mp3",
      0.1
    );
    playSound("../audio/splash-death-splash-46048.mp3", 0.05);
    bottle.splash();

    return this.resolveEnemyHit(enemy);
  }

  /**
   * Resolves the result of an enemy being hit by a bottle.
   * @param {MovableObject} enemy - The enemy object.
   * @returns {boolean} - Whether the enemy remains.
   */
  resolveEnemyHit(enemy) {
    if (enemy instanceof Endboss) {
      this.statusbarEndboss.setPercent(enemy.energy);
      if (enemy.energy <= 0) {
        this.endGame = true;
        playSound("../audio/you-win-sequence-1-183948.mp3", 0.05);
        pauseSound(backgroundMusic);
      }
      return true;
    }

    if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
      enemy.die();
      return true;
    }

    return false;
  }

  /**
   * Assigns the world instance to the character.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Starts playing endboss theme music.
   */
  playEndbossTheme() {
    if (world.character.x > 3300) EndbossTheme.play();
  }

  /**
   * Renders all game elements to the canvas in a loop.
   */
  draw() {
    if (this.endGame) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);

    this.renderScene();

    this.ctx.translate(-this.camera_x, 0);

    requestAnimationFrame(() => this.draw());
  }

  /**
   * Draws all background, characters, enemies, and collectibles.
   */
  renderScene() {
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
  }

  /**
   * Adds multiple objects to the map by drawing each one.
   * @param {Array<DrawableObject>} objects - List of drawable objects.
   */
  addObjectToMap(objects) {
    objects.forEach((o) => this.addToMap(o));
  }

  /**
   * Adds a single object to the map, considering its direction.
   * @param {DrawableObject} mo - The drawable object.
   */
  addToMap(mo) {
    if (mo.otherDirection) this.flipImage(mo);
    mo.draw(this.ctx);
    if (mo.otherDirection) this.flipImageBack(mo);
  }

  /**
   * Flips an image horizontally for mirrored rendering.
   * @param {DrawableObject} mo - The object to flip.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x *= -1;
  }

  /**
   * Reverts the horizontal flip after drawing.
   * @param {DrawableObject} mo - The object to flip back.
   */
  flipImageBack(mo) {
    mo.x *= -1;
    this.ctx.restore();
  }
}
