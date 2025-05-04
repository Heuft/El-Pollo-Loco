let canvas;
let world;
let keyboard = new Keyboard();
let backgroundMusic = prepareSound(
  "../audio/Western Background Music - OLD WEST MUSIC -  Ambient  Instrumental.mp3",
  0.05,
  true
);
let endbossThemeSound;

/**
 * Initializes the game by getting the canvas element,
 * initializing the level, and creating a new World instance.
 */
function init() {
  canvas = document.getElementById("canvas");
  initLevel();
  world = new World(canvas, keyboard);
}

/**
 * Listens for keydown events and updates the keyboard state accordingly.
 */
window.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    keyboard.Right = true;
  }
  if (e.keyCode == 37) {
    keyboard.Left = true;
  }
  if (e.keyCode == 32) {
    keyboard.Space = true;
  }
  if (e.keyCode == 38) {
    keyboard.Up = true;
  }
  if (e.keyCode == 40) {
    keyboard.Down = true;
  }
  if (e.keyCode == 68) {
    keyboard.D = true;
  }
});

/**
 * Listens for keyup events and resets the keyboard state.
 */
window.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    keyboard.Right = false;
  }
  if (e.keyCode == 37) {
    keyboard.Left = false;
  }
  if (e.keyCode == 32) {
    keyboard.Space = false;
  }
  if (e.keyCode == 38) {
    keyboard.Up = false;
  }
  if (e.keyCode == 40) {
    keyboard.Down = false;
  }
  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});

/**
 * Removes the start screen UI and begins background music.
 * Also prepares the game canvas and buttons for gameplay.
 */
function removeStartScreen() {
  playSound("../audio/game-start-6104.mp3", 0.1);
  backgroundMusic.play();
  document.getElementById("startscreen").classList.add("hidden");
  document.getElementById("canvas").classList.remove("hidden");
  document.getElementById("gameButtons").classList.remove("hidden");
  document.getElementById("panels").classList.remove("hidden");
  document.getElementById("panels").classList.add("panels");
  keyboard.touchEvent();
}

/**
 * Starts the game by removing the start screen and initializing the world.
 */
function startGame() {
  removeStartScreen();
  init();
}
