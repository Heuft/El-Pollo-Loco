function playWinEndscreen() {
  let win = document.getElementById("winEndscreen");
  win.classList.remove("dNone");
  win.classList.add("winorLoseOverlay");
}

function playLoseEndscreen() {
  const lose = document.getElementById("loseEndscreen");
  lose.classList.remove("dNone");
  lose.classList.add("winorLoseOverlay");
}

function restartGame() {
  const lose = document.getElementById("loseEndscreen");
  lose.classList.remove("winorLoseOverlay");
  lose.classList.add("dNone");
  init();
}

function restartGame2() {
  let win = document.getElementById("winEndscreen");
  win.classList.remove("winorLoseOverlay");
  win.classList.add("dNone");
  init();
}
