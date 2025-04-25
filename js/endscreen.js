function playWinEndscreen() {
  let win = document.getElementById("winEndscreen");
  win.classList.remove("hidden");
  win.classList.add("winorLoseOverlay");
}

function playLoseEndscreen() {
  const lose = document.getElementById("loseEndscreen");
  lose.classList.remove("hidden");
  lose.classList.add("winorLoseOverlay");
}

function restartGame() {
  let lose = document.getElementById("loseEndscreen");
  let win = document.getElementById("winEndscreen");

  if (lose) {
    lose.classList.add("hidden");
    lose.classList.remove("winorLoseOverlay");
  }
  if (win) {
    win.classList.add("hidden");
  }

  document.getElementById("canvas").classList.remove("hidden");
  document.getElementById("gameButtons").classList.remove("hidden");

  init();
}
