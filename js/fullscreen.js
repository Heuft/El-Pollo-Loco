function enterFullscreen() {
  let fullscreen = document.getElementById("fullscreen");
  if (fullscreen.requestFullscreen) {
    fullscreen.requestFullscreen();
  } else if (fullscreen.mozRequestFullScreen) {
    fullscreen.mozRequestFullScreen();
  } else if (fullscreen.webkitRequestFullscreen) {
    fullscreen.webkitRequestFullscreen();
  } else if (fullscreen.msRequestFullscreen) {
    fullscreen.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

function toggleFullscreen() {
  if (
    !document.fullscreenElement &&
    !document.mozFullScreenElement &&
    !document.webkitFullscreenElement &&
    !document.msFullscreenElement
  ) {
    enterFullscreen();
  } else {
    exitFullscreen();
  }
}
