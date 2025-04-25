function playWinEndscreen() {
  let win = document.getElementById("winEndscreen");
  win.classList.remove("hidden");
  win.classList.add("winorLoseOverlay");
}

function playLoseEndscreen() {
  const lose = document.getElementById("loseEndscreen");
  lose.style.display = "flex";
  lose.classList.remove("hidden");
  lose.classList.add("winorLoseOverlay");
}

//function restartGame() {
// let lose = document.getElementById("loseEndscreen");
// let win = document.getElementById("winEndscreen");

//if (lose) {
//  lose.classList.add("hidden");
//   lose.classList.remove("winorLoseOverlay");
// }
//if (win) {
//  win.classList.add("hidden");
//}

//document.getElementById("canvas").classList.remove("hidden");
//document.getElementById("gameButtons").classList.remove("hidden");

//init();
//}

function restartGame() {
  const lose = document.getElementById("loseEndscreen");
  const win = document.getElementById("winEndscreen");

  if (lose) {
    lose.classList.add("hidden");
    lose.classList.remove("winorLoseOverlay");
    lose.style.display = "none";
    console.log("Verloren-Endscreen ausgeblendet");
  }

  if (win) {
    win.classList.add("hidden");
    win.classList.remove("winorLoseOverlay");
    win.style.visibility = "hidden";
    win.style.display = "none";
  }

  init();
}
