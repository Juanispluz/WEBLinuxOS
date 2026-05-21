const SystemVolume = {
  level: 0.75,
  set(v) {
    this.level = Math.max(0, Math.min(1, v));
    document.querySelectorAll('audio,video').forEach(el => el.volume = this.level);
  },
  get() { return this.level; }
};
