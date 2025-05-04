class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 50;
  endScene = false;
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
  hadFirstContact = false;
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

  animate(hadFirstContact) {
    let i = 0;
    setInterval(() => {
      if (this.isDead()) {
        this.speed = 0;
        this.playAnimation(this.Images_Dead);
        if (!this.endScene) {
          this.endScene = true;
          playWinEndscreen();
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

      if (world.character.x > 3300 && !hadFirstContact) {
        i = 0;
        hadFirstContact = true;
        backgroundMusic.pause();

        setInterval(() => {
          if (this.x > world.character.x + 10) {
            this.moveLeft();
            this.otherDirection = false;
          } else if (this.x < world.character.x - 30) {
            this.moveRight();
            this.otherDirection = true;
          }
        }, 1000 / 60);
      }
    }, 150);
  }
}
