let isMuted = false;
let activeSounds = [];

/**
 * Load the muted state from local storage if it exists.
 */
let savedMute = localStorage.getItem("isMuted");
if (savedMute !== null) {
  isMuted = savedMute === "true";
}

/**
 * Updates the mute button icon once the DOM has fully loaded.
 */
window.addEventListener("DOMContentLoaded", () => {
  updateMuteButton();
});

/**
 * Plays a sound from the given path with the specified volume.
 * Automatically respects mute state and stores the sound in the activeSounds array.
 *
 * @param {string} path - Path to the audio file.
 * @param {number} [volume=1] - Volume level (0.0 to 1.0).
 * @returns {Audio} The created and playing Audio object.
 */
function playSound(path, volume = 1) {
  let sound = new Audio(path);
  sound.volume = isMuted ? 0 : volume;
  sound.dataset.originalVolume = volume;
  sound.play();
  activeSounds.push(sound);
  return sound;
}

/**
 * Toggles the mute state of the page.
 * Updates the local storage and adjusts volume of all active sounds.
 */
function mutePage() {
  isMuted = !isMuted;
  localStorage.setItem("isMuted", isMuted ? "true" : "false");

  activeSounds.forEach((sound) => {
    if (isMuted) {
      sound.volume = 0;
    } else {
      sound.volume = parseFloat(sound.dataset.originalVolume) || 1;
    }
  });

  updateMuteButton();
  document.activeElement.blur();
}

/**
 * Updates the mute button icon in the DOM depending on the current mute state.
 */
function updateMuteButton() {
  let muteIcon = document.getElementById("muteIcon");
  if (muteIcon) {
    muteIcon.src = isMuted ? "../img/volume.png" : "../img/mute.png";
  }
}

/**
 * Prepares a sound without automatically playing it.
 * Can be set to loop and stores volume and mute state accordingly.
 */
function prepareSound(path, volume = 1.0, loop = false) {
  let sound = new Audio(path);
  sound.volume = isMuted ? 0 : volume;
  sound.loop = loop;
  sound.dataset.originalVolume = volume;

  activeSounds.push(sound);
  return sound;
}

/**
 * Pauses the given sound without resetting its playback position.
 *
 * @param {Audio} sound - The Audio object to pause.
 */
function pauseSound(sound) {
  if (sound && typeof sound.pause === "function") {
    sound.pause();
  }
}

/**
 * Stops the given sound and resets its playback position to the beginning.
 *
 * @param {Audio} sound - The Audio object to stop.
 */
function stopSound(sound) {
  if (sound && typeof sound.pause === "function") {
    sound.pause();
    sound.currentTime = 0;
  }
}
