const NotificationSystem = {
  enabled: true,
  history: [],
  unread: 0,
  show(title, body='') {
    this.history.unshift({title, body, time: new Date()});
    if (this.history.length > 50) this.history.pop();
    if (!this.enabled) return;
    this.unread++;
    this._updateDot();
    const container = document.getElementById('notif-container');
    const toast = document.createElement('div');
    toast.className = 'notif-toast';
    toast.innerHTML = `<div class="notif-toast-title">${title}</div>${body ? `<div class="notif-toast-body">${body}</div>` : ''}`;
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('notif-visible'));
    setTimeout(() => {
      toast.classList.remove('notif-visible');
      setTimeout(() => toast.remove(), 320);
    }, 3000);
  },
  _updateDot() {
    const dot = document.getElementById('notif-dot');
    if (dot) dot.classList.toggle('hidden', this.unread === 0);
  },
  clearUnread() { this.unread = 0; this._updateDot(); },
  setEnabled(val) { this.enabled = val; }
};
