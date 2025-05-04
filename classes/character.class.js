/**
 * Represents the main controllable character (Pepe).
 * Handles movement, animation, physics, and interaction with the game world.
 */
class Character extends MovableObject {
  /** @type {number} Character height in pixels. */
  height = 200;

  /** @type {number} Y-position of the character on the canvas. */
  y = 90;

  /** @type {number} Horizontal movement speed. */
  speed = 10;

  /** @type {boolean} Whether the character has already triggered the endscreen. */
  hasTriggeredEndscreen = false;

  /** @type {boolean} Whether the character has landed once after jumping. */
  haslanded = false;

  /** @type {{top: number, left: number, right: number, bottom: number}} Collision offset. */
  offset = {
    top: 120,
    left: 30,
    right: 40,
    bottom: 30,
  };

  /** @type {string[]} Image paths for walking animation. */
  Images_Walking = [
    "../img/2_character_pepe/2_walk/W-21.png",
    "../img/2_character_pepe/2_walk/W-22.png",
    "../img/2_character_pepe/2_walk/W-23.png",
    "../img/2_character_pepe/2_walk/W-24.png",
    "../img/2_character_pepe/2_walk/W-25.png",
    "../img/2_character_pepe/2_walk/W-26.png",
  ];

  /** @type {string[]} Image paths for jumping animation. */
  Images_Jumping = [
    "../img/2_character_pepe/3_jump/J-31.png",
    "../img/2_character_pepe/3_jump/J-32.png",
    "../img/2_character_pepe/3_jump/J-33.png",
    "../img/2_character_pepe/3_jump/J-34.png",
    "../img/2_character_pepe/3_jump/J-35.png",
    "../img/2_character_pepe/3_jump/J-36.png",
    "../img/2_character_pepe/3_jump/J-37.png",
    "../img/2_character_pepe/3_jump/J-38.png",
    "../img/2_character_pepe/3_jump/J-39.png",
  ];

  /** @type {string[]} Image paths for death animation. */
  Images_Dead = [
    "../img/2_character_pepe/5_dead/D-51.png",
    "../img/2_character_pepe/5_dead/D-52.png",
    "../img/2_character_pepe/5_dead/D-53.png",
    "../img/2_character_pepe/5_dead/D-54.png",
    "../img/2_character_pepe/5_dead/D-55.png",
    "../img/2_character_pepe/5_dead/D-56.png",
    "../img/2_character_pepe/5_dead/D-57.png",
  ];

  /** @type {string[]} Image paths for hurt animation. */
  Images_Hurt = [
    "../img/2_character_pepe/4_hurt/H-41.png",
    "../img/2_character_pepe/4_hurt/H-42.png",
    "../img/2_character_pepe/4_hurt/H-43.png",
  ];

  /** @type {string[]} Image paths for idle animation. */
  Images_Idle = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  /** @type {string[]} Image paths for long idle animation. */
  Images_longIdle = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  /** @type {World} Reference to the game world. */
  world;

  /**
   * Initializes the character, loads images, applies gravity, and starts animation.
   */
  constructor() {
    super().loadImage("../img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.Images_Walking);
    this.loadImages(this.Images_Jumping);
    this.loadImages(this.Images_Dead);
    this.loadImages(this.Images_Hurt);
    this.loadImages(this.Images_Idle);
    this.loadImages(this.Images_longIdle);
    this.applyGravity();
    this.hasLandedOnce = false;
    this.animate();
  }

  /**
   * Checks if the character is on the ground and not in the air.
   * @returns {boolean} True if on the ground.
   */
  onGround() {
    return this.y >= 217 && this.speedY <= 0;
  }

  /**
   * Moves the character to the right if the corresponding key is pressed.
   */
  proveKeyRight() {
    if (this.world.keyboard.Right && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.otherDirection = false;
      this.lastMovementTime = Date.now();
    }
  }

  /**
   * Moves the character to the left if the corresponding key is pressed.
   */
  proveKeyLeft() {
    if (this.world.keyboard.Left && this.x > 0) {
      this.moveLeft();
      this.otherDirection = true;
      this.lastMovementTime = Date.now();
    }
  }

  /**
   * Makes the character jump if the space key is pressed and the character is on the ground.
   */
  proveSpace() {
    if (this.world.keyboard.Space && !this.isAboveGround()) {
      this.jump();
      this.lastMovementTime = Date.now();
    }
  }

  /**
   * Continuously checks for input keys and moves the character accordingly.
   */
  proveKeys() {
    setInterval(() => {
      this.proveKeyRight();
      this.proveKeyLeft();
      this.proveSpace();
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);
  }

  /**
   * Animates the character based on current state (walking, jumping, idle, hurt, or dead).
   */
  animate() {
    this.proveKeys();

    setInterval(() => {
      let now = Date.now();
      let timeSinceLastMove = (now - this.lastMovementTime) / 1000;

      if (this.isDead()) {
        this.handleDeath();
      } else if (this.isHurt()) {
        this.playAnimation(this.Images_Hurt);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.Images_Jumping);
      } else if (this.onGround() && !this.hasLandedOnce) {
        this.handleLanding();
      } else if (timeSinceLastMove > 15) {
        this.playAnimation(this.Images_longIdle);
      } else if (timeSinceLastMove > 1) {
        this.playAnimation(this.Images_Idle);
      } else if (this.world.keyboard.Right || this.world.keyboard.Left) {
        this.playAnimation(this.Images_Walking);
      }
    }, 1000 / 12);
  }

  /**
   * Handles logic for character death, including triggering endscreen.
   */
  handleDeath() {
    this.playAnimation(this.Images_Dead);
    if (!this.hasTriggeredEndscreen) {
      this.hasTriggeredEndscreen = true;
      playLoseEndscreen();
    }
  }

  /**
   * Handles logic for when the character lands for the first time.
   */
  handleLanding() {
    this.hasLandedOnce = true;
    this.lastMovementTime = Date.now();
    this.playAnimation(this.Images_Idle);
  }
}
