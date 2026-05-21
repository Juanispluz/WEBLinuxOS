const TaskbarManager = {
  autoHide: false,
  _peek: false,
  init() {
    document.addEventListener('mousemove', e => {
      if (!this.autoHide) return;
      const tb = document.getElementById('taskbar');
      const near = e.clientY >= window.innerHeight - 4;
      const rect = tb.getBoundingClientRect();
      const on = e.clientY >= rect.top - 10;
      const peek = near || on;
      if (peek !== this._peek) { this._peek = peek; tb.classList.toggle('taskbar-peek', peek); }
    });
  },
  setAutoHide(val) {
    this.autoHide = val;
    document.body.classList.toggle('taskbar-hidden', val);
    if (!val) document.getElementById('taskbar').classList.remove('taskbar-peek');
  },
  toggle() { this.setAutoHide(!this.autoHide); return this.autoHide; }
};
