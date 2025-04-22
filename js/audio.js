function playSound(path, volume = 1) {
  const sound = new Audio(path);
  sound.volume = volume;
  sound.play();
  return sound;
}
