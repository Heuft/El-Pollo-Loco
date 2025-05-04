/**
 * Displays the win end screen by showing the overlay and applying the appropriate class.
 */
function playWinEndscreen() {
  let win = document.getElementById("winEndscreen");
  win.classList.remove("dNone");
  win.classList.add("winorLoseOverlay");
}

/**
 * Displays the lose end screen by showing the overlay and applying the appropriate class.
 */
function playLoseEndscreen() {
  const lose = document.getElementById("loseEndscreen");
  lose.classList.remove("dNone");
  lose.classList.add("winorLoseOverlay");
}

/**
 * Restarts the game after losing.
 * Hides the lose screen, reinitializes the game, and starts the background music.
 */
function restartGame() {
  const lose = document.getElementById("loseEndscreen");
  lose.classList.remove("winorLoseOverlay");
  lose.classList.add("dNone");
  init();
  backgroundMusic.play();
}

/**
 * Restarts the game after winning.
 * Hides the win screen, reinitializes the game, restarts background music,
 * and pauses the endboss theme if it was playing.
 */
function restartGame2() {
  let win = document.getElementById("winEndscreen");
  win.classList.remove("winorLoseOverlay");
  win.classList.add("dNone");
  init();
  backgroundMusic.play();
  pauseSound(endbossThemeSound);
}
