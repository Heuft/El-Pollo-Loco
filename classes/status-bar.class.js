class StatusBar extends DrawableObject {
  Images = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png",
  ];

  percent = 100;

  constructor() {
    super();
    this.loadImages(this.Images);
    this.x = 50;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercent(100);
  }

  setPercent(percent) {
    this.percent = percent;
    let path = this.Images[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percent == 100) {
      return 5;
    } else if (this.percent > 80) {
      return 4;
    } else if (this.percent > 60) {
      return 3;
    } else if (this.percent > 40) {
      return 2;
    } else if (this.percent > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
