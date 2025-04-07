class Coin extends MovableObject {
  y = 330;
  width = 125;
  height = 125;

  constructor() {
    super().loadImage("../img/8_coin/coin_1.png");

    this.x = 300;
  }
}
