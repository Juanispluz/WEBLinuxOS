const AnimationManager = {
  enabled: true,
  init() { document.body.classList.add('anim-on'); },
  setEnabled(val) {
    this.enabled = val;
    document.body.classList.toggle('anim-on', val);
    document.body.classList.toggle('anim-off', !val);
  },
  toggle() { this.setEnabled(!this.enabled); return this.enabled; }
};
