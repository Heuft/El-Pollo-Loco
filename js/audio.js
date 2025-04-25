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
  isMuted = !isMuted;

  activeSounds.forEach((sound) => {
    sound.muted = isMuted;
  });

  updateMuteButton();
}
