class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 50;
  endScene = false;
  hadFirstContact = false;

  Images_Walking = [
    "../img/4_enemie_boss_chicken/1_walk/G1.png",
    "../img/4_enemie_boss_chicken/1_walk/G2.png",
    "../img/4_enemie_boss_chicken/1_walk/G3.png",
    "../img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  Images_FirstContact = [
    "../img/4_enemie_boss_chicken/2_alert/G5.png",
    "../img/4_enemie_boss_chicken/2_alert/G6.png",
    "../img/4_enemie_boss_chicken/2_alert/G7.png",
    "../img/4_enemie_boss_chicken/2_alert/G8.png",
    "../img/4_enemie_boss_chicken/2_alert/G9.png",
    "../img/4_enemie_boss_chicken/2_alert/G10.png",
    "../img/4_enemie_boss_chicken/2_alert/G11.png",
    "../img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  Images_Hurt = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  Images_Dead = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  Images_Attack = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  /**
   * Creates an instance of the Endboss, loads all necessary images,
   * sets initial position and starts animation.
   */
  constructor() {
    super().loadImage(this.Images_Walking[0]);
    this.loadImages(this.Images_Walking);
    this.loadImages(this.Images_FirstContact);
    this.loadImages(this.Images_Hurt);
    this.loadImages(this.Images_Dead);
    this.loadImages(this.Images_Attack);
    this.x = 3700;
    this.speed = 3;
    this.animate();
  }

  /**
   * Starts the animation loop for the Endboss and initiates tracking
   * when the player reaches a certain point.
   *
   * @param {boolean} hadFirstContact - Whether the Endboss has seen the player.
   */
  animate(hadFirstContact) {
    let i = 0;
    setInterval(() => {
      this.playAllAnimation(i);

      if (world.character.x > 3300 && !hadFirstContact) {
        i = 0;
        hadFirstContact = true;
        backgroundMusic.pause();
        this.handleEndbossMoves();
      }
    }, 150);
  }

  /**
   * Plays the death animation and stops movement.
   */
  playDeadAnimation() {
    this.speed = 0;
    this.playAnimation(this.Images_Dead);
  }

  /**
   * Triggers the end screen after the Endboss is defeated.
   */
  playWin() {
    this.endScene = true;
    playWinEndscreen();
  }

  /**
   * Moves the Endboss to the left and sets its facing direction.
   */
  EndbossMoveLeft() {
    this.moveLeft();
    this.otherDirection = false;
  }

  /**
   * Moves the Endboss to the right and sets its facing direction.
   */
  EndbossMoveRight() {
    this.moveRight();
    this.otherDirection = true;
  }

  /**
   * Determines and plays the appropriate animation for the Endboss
   * based on its current state.
   *
   * @param {number} i - The current animation counter index.
   */
  playAllAnimation(i) {
    if (this.isDead()) {
      this.playDeadAnimation();
      if (!this.endScene) {
        this.playWin();
      }
    } else if (this.isHurt()) {
      this.playAnimation(this.Images_Hurt);
    } else if (this.x - 120 < world.character.x) {
      this.playAnimation(this.Images_Attack);
    } else if (i < 10) {
      this.playAnimation(this.Images_FirstContact);
    } else {
      this.playAnimation(this.Images_Walking);
    }
    i++;
  }

  /**
   * Starts movement behavior for the Endboss to follow the player
   * once first contact has occurred.
   */
  handleEndbossMoves() {
    setInterval(() => {
      if (this.x > world.character.x + 10) {
        this.EndbossMoveLeft();
      } else if (this.x < world.character.x - 30) {
        this.EndbossMoveRight();
      }
    }, 1000 / 60);
  }
}
