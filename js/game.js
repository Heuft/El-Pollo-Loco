let canvas;
let world;
let keyboard = new Keyboard();
let backgroundMusic = playSound(
  "../audio/Western Background Music - OLD WEST MUSIC -  Ambient  Instrumental.mp3",
  0.05
);

function init() {
  canvas = document.getElementById("canvas");
  initLevel();
  world = new World(canvas, keyboard);
}

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

function startGame() {
  playSound("../audio/game-start-6104.mp3", 0.1);
  backgroundMusic.play();
  document.getElementById("startscreen").classList.add("hidden");
  document.getElementById("canvas").classList.remove("hidden");
  document.getElementById("gameButtons").classList.remove("hidden");
  init();
}

function toggleMusic() {
  const btn = document.getElementById("toggleMusicBtn");
  const mediaElements = document.querySelectorAll("audio");

  const isCurrentlyOn = btn.innerText.includes("🔊");

  mediaElements.forEach((el) => {
    el.muted = isCurrentlyOn;
    if (!isCurrentlyOn && el.volume === 0) {
      el.volume = 1.0;
    }
  });

  if (isCurrentlyOn) {
    btn.innerText = "🔇 Musik an";
  } else {
    btn.innerText = "🔊 Musik aus";
  }
}
