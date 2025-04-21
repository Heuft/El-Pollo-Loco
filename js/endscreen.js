function playWinEndscreen() {
  let win = document.getElementById("winEndscreen");
  win.classList.remove("hidden");
  win.classList.add("winorLoseOverlay");
}

function playLoseEndscreen() {
  let lose = document.getElementById("loseEndscreen");
  lose.classList.remove("hidden");
  lose.classList.add("winorLoseOverlay");
}
