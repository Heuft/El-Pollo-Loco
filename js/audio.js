let isMuted = false;
let activeSounds = [];

function playSound(path, volume = 1) {
  if (isMuted) return null;

  const sound = new Audio(path);
  sound.volume = volume;
  sound.play();

  activeSounds.push(sound);

  return sound;
}

function mutePage() {
  activeSounds.forEach((sound) => {
    sound.muted = isMuted;
  });

  updateMuteButton();
}

function updateMuteButton() {
  const muteIcon = document.getElementById("muteIcon");
  isMuted = !isMuted;

  if (isMuted) {
    muteIcon.src = "../img/mute.png";
  } else {
    muteIcon.src = "../img/volume.png";
  }
}

function prepareSound(path, volume = 1.0, loop = false) {
  const sound = new Audio(path);
  sound.volume = volume;
  sound.loop = loop;
  return sound;
}
