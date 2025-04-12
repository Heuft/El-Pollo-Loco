class StatusBar extends DrawableObject {
  ImagesHealth = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png",
  ];

  ImagesCoin = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
  ];

  ImagesBottle = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
  ];

  percent = 100;
  statusbottle = 0;

  constructor(type = type, y = 0) {
    super();
    this.loadImages(this.ImagesHealth);
    this.x = 20;
    this.y = y;
    this.type = type;
    this.width = 200;
    this.height = 60;
    if (type === "health") {
      this.loadImages(this.ImagesHealth);
    } else if (type === "coin") {
      this.loadImages(this.ImagesCoin);
    } else if (type === "bottle") {
      this.loadImages(this.ImagesBottle);
    }
    this.setPercent(100);
  }

  setPercent(percent) {
    this.percent = percent;
    let path = this.ImagesHealth[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  setPercent(percent) {
    this.percent = percent;

    let path;
    if (this.type === "health") {
      path = this.ImagesHealth[this.resolveImageIndex()];
    } else if (this.type === "coin") {
      path = this.ImagesCoin[this.resolveImageIndex()];
    } else if (this.type === "bottle") {
      path = this.ImagesBottle[this.resolveImageIndex()];
    }

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
