class Level {
  enemies;
  clouds;
  coins;
  backgroundObject;
  level_end_x = 2200;

  constructor(enemies, clouds, backgroundObject, coins) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.coins = coins;
    this.backgroundObject = backgroundObject;
  }
}
