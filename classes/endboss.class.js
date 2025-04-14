class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 50;
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
  hadFirstContact = false;
  constructor() {
    super().loadImage(this.Images_Walking[0]);
    this.loadImages(this.Images_Walking);
    this.loadImages(this.Images_FirstContact);
    this.loadImages(this.Images_Hurt);
    this.loadImages(this.Images_Dead);
    this.x = 3700;
    this.speed = 2 + Math.random() * 0.75;
    this.animate();
  }

  animate(hadFirstContact) {
    let i = 0;
    setInterval(() => {
      if (i < 10) {
        this.playAnimation(this.Images_FirstContact);
      } else {
        this.playAnimation(this.Images_Walking);
      }
      i++;

      if (world.character.x > 3300 && !hadFirstContact) {
        i = 0;
        hadFirstContact = true;
        setInterval(() => {
          this.moveLeft();
        }, 1000 / 60);
      }
    }, 150);
  }
  playHurtAnimation() {
    let i = 0;
    let hurtInterval = setInterval(() => {
      if (i >= this.Images_Hurt.length) {
        clearInterval(hurtInterval);
        return;
      }
      this.img = this.imageCache[this.Images_Hurt[i]];
      i++;
    }, 200);
  }
}
