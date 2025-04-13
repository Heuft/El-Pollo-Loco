function fullscreen() {
  let fullscreen = document.getElementById("fullscreen");
  openFullscreen(fullscreen);

  function openFullscreen(fullscreen) {
    if (fullscreen.requestFullscreen) {
      fullscreen.requestFullscreen();
    }
  }
}
