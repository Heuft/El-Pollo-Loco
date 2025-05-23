let level1;
function initLevel() {
  level1 = new Level(
    [
      new Chicken(),
      new Endboss(),
      new SmallChicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
    ],
    [new Cloud(), new Cloud(), new Cloud(), new Cloud()],
    [
      new BackgroundObject("../img/5_background/layers/air.png", -719),
      new BackgroundObject(
        "../img/5_background/layers/3_third_layer/2.png",
        -719
      ),
      new BackgroundObject(
        "../img/5_background/layers/2_second_layer/2.png",
        -719
      ),
      new BackgroundObject(
        "../img/5_background/layers/1_first_layer/2.png",
        -719
      ),
      new BackgroundObject("../img/5_background/layers/air.png", 0),
      new BackgroundObject("../img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject(
        "../img/5_background/layers/2_second_layer/1.png",
        0
      ),
      new BackgroundObject("../img/5_background/layers/1_first_layer/1.png", 0),
      new BackgroundObject("../img/5_background/layers/air.png", 719),
      new BackgroundObject(
        "../img/5_background/layers/3_third_layer/2.png",
        719
      ),
      new BackgroundObject(
        "../img/5_background/layers/2_second_layer/2.png",
        719
      ),
      new BackgroundObject(
        "../img/5_background/layers/1_first_layer/2.png",
        719
      ),
      new BackgroundObject("../img/5_background/layers/air.png", 719 * 2),
      new BackgroundObject(
        "../img/5_background/layers/3_third_layer/1.png",
        719 * 2
      ),
      new BackgroundObject(
        "../img/5_background/layers/2_second_layer/1.png",
        719 * 2
      ),
      new BackgroundObject(
        "../img/5_background/layers/1_first_layer/1.png",
        719 * 2
      ),
      new BackgroundObject("../img/5_background/layers/air.png", 719 * 3),
      new BackgroundObject(
        "../img/5_background/layers/3_third_layer/2.png",
        719 * 3
      ),
      new BackgroundObject(
        "../img/5_background/layers/2_second_layer/2.png",
        719 * 3
      ),
      new BackgroundObject(
        "../img/5_background/layers/1_first_layer/2.png",
        719 * 3
      ),
      new BackgroundObject("../img/5_background/layers/air.png", 719 * 4),
      new BackgroundObject(
        "../img/5_background/layers/3_third_layer/1.png",
        719 * 4
      ),
      new BackgroundObject(
        "../img/5_background/layers/2_second_layer/1.png",
        719 * 4
      ),
      new BackgroundObject(
        "../img/5_background/layers/1_first_layer/1.png",
        719 * 4
      ),
      new BackgroundObject("../img/5_background/layers/air.png", 719 * 5),
      new BackgroundObject(
        "../img/5_background/layers/3_third_layer/2.png",
        719 * 5
      ),
      new BackgroundObject(
        "../img/5_background/layers/2_second_layer/2.png",
        719 * 5
      ),
      new BackgroundObject(
        "../img/5_background/layers/1_first_layer/2.png",
        719 * 5
      ),
    ],
    [
      new Coin(450, 320),
      new Coin(600, 320),
      new Coin(480, 280),
      new Coin(570, 280),
      new Coin(525, 250),
      new Coin(2000, -15),
    ],
    [
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
    ]
  );
}
