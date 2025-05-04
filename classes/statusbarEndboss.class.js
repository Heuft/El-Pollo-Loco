class StatusbarEndboss extends DrawableObject {
  percent = 100;

  Images_StatusBoss = [
    "img/7_statusbars/2_statusbar_endboss/green/green0.png",
    "img/7_statusbars/2_statusbar_endboss/green/green20.png",
    "img/7_statusbars/2_statusbar_endboss/green/green40.png",
    "img/7_statusbars/2_statusbar_endboss/green/green60.png",
    "img/7_statusbars/2_statusbar_endboss/green/green80.png",
    "img/7_statusbars/2_statusbar_endboss/green/green100.png",
  ];

  constructor(percent = 100) {
    super();
    this.loadImages(this.Images_StatusBoss);
    this.percent = percent;
    this.x = 3700;
    this.y = 20;
    this.speed = 3;
    this.width = 200;
    this.height = 60;
    this.animate();
    this.setPercent(this.percent);
  }

  /**
   * Set the Percent of Statusbar
   */
  setPercent(percent) {
    this.percent = percent;
    let path = this.Images_StatusBoss[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Animate Statusbar of Endboss
   */
  animate(hadFirstContact) {
    let i = 0;
    setInterval(() => {
      if (world.character.x > 3300 && !hadFirstContact) {
        i = 0;
        hadFirstContact = true;
        setInterval(() => {
          if (this.x > world.character.x + 10) {
            this.moveLeft();
          } else if (this.x < world.character.x - 10) {
            this.moveRight();
          }
        }, 1000 / 60);
      }
    }, 150);
  }

  /**
   * Index of Statusbar Endboss.
   */
  resolveImageIndex() {
    if (this.percent == 100) {
      return 5;
    } else if (this.percent > 79) {
      return 4;
    } else if (this.percent > 59) {
      return 3;
    } else if (this.percent > 39) {
      return 2;
    } else if (this.percent > 19) {
      return 1;
    } else {
      return 0;
    }
  }
}
