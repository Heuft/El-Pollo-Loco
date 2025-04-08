class Level {
  enemies;
  clouds;
  coins;
  bottlebottom;
  backgroundObject;
  level_end_x = 2200;

  constructor(enemies, clouds, backgroundObject, coins, bottlebottom) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.coins = coins;
    this.bottlebottom = bottlebottom;
    this.backgroundObject = backgroundObject;
  }
}
