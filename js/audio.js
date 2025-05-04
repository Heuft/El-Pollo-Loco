let isMuted = false;
let activeSounds = [];

function playSound(path, volume = 1) {
  const sound = new Audio(path);
  sound.volume = isMuted ? 0 : volume;
  sound.dataset.originalVolume = volume;
  sound.play();
  activeSounds.push(sound);
  return sound;
}

function mutePage() {
  isMuted = !isMuted;

  activeSounds.forEach((sound) => {
    if (isMuted) {
      sound.volume = 0;
    } else {
      sound.volume = parseFloat(sound.dataset.originalVolume) || 1;
    }
  });

  updateMuteButton();
}

function updateMuteButton() {
  const muteIcon = document.getElementById("muteIcon");

  if (isMuted) {
    muteIcon.src = "../img/mute.png";
  } else {
    muteIcon.src = "../img/volume.png";
  }
}

function prepareSound(path, volume = 1.0, loop = false) {
  const sound = new Audio(path);
  sound.volume = isMuted ? 0 : volume;
  sound.loop = loop;
  sound.dataset.originalVolume = volume;

  activeSounds.push(sound);
  return sound;
}

function pauseSound(sound) {
  if (sound && typeof sound.pause === "function") {
    sound.pause();
  }
}

function stopSound(sound) {
  if (sound && typeof sound.pause === "function") {
    sound.pause();
    sound.currentTime = 0;
  }
}
