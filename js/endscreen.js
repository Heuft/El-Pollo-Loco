function playWinEndscreen() {
  let win = document.getElementById("winEndscreen");
  win.classList.remove("hidden");
  win.classList.add("winorLoseOverlay");
}

function playLoseEndscreen() {
  let lose = document.getElementById("loseEndscreen");
  lose.style.display = "flex";
  lose.classList.add("winorLoseOverlay");
}

function restartGame() {
  let lose = document.getElementById("loseEndscreen");
  lose.classList.remove("winorLoseOverlay");
  lose.style.display = "none";
  init();
}
