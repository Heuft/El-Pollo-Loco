let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
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
  document.getElementById("startscreen").classList.add("hidden");
  document.getElementById("canvas").classList.remove("hidden");
  document.getElementById("gameButtons").classList.remove("hidden");
  init();
}

function musicOff() {
  const btn = document.getElementById("toggleMusicBtn");
  if (btn.innerText.includes("🔊")) {
    btn.innerText = "🔇 Musik an";
  } else {
    btn.innerText = "🔊 Musik aus";
  }
}

//let music = new Audio("audio/music.mp3");
//music.loop = true;

//let isMusicOn = true;

//document.getElementById("toggleMusicBtn").addEventListener("click", () => {
//  if (isMusicOn) {
//    music.pause();
//    document.getElementById("toggleMusicBtn").innerText = "🔇 Musik an";
//  } else {
//    music.play();
//    document.getElementById("toggleMusicBtn").innerText = "🔊 Musik aus";
//  }
//  isMusicOn = !isMusicOn;
////});

//document.getElementById("toggleFullscreenBtn").addEventListener("click", () => {
//  let fullscreenEl = document.getElementById("fullscreen");
//  if (!document.fullscreenElement) {
//    fullscreenEl.requestFullscreen();
//  } else {
//    document.exitFullscreen();
//  }
//});
