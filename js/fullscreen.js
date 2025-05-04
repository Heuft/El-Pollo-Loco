/**
 * Requests fullscreen mode for the element with the ID 'fullscreen'.
 * Supports various browser-specific implementations.
 */
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

/**
 * Exits fullscreen mode using the appropriate method depending on the browser.
 */
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

/**
 * Toggles fullscreen mode on and off.
 * If no element is currently in fullscreen, it will enter fullscreen.
 * Otherwise, it exits fullscreen mode.
 */
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
