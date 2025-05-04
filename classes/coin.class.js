class Coin extends MovableObject {
  width = 125;
  height = 125;
  offset = {
    top: 0,
    left: 25,
    right: 25,
    bottom: 0,
  };

  constructor(x, y) {
    super().loadImage("../img/8_coin/coin_1.png");

    this.x = x;
    this.y = y;
  }
}
