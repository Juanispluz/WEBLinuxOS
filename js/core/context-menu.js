const ContextMenu = {
  el: null,
  init() {
    this.el = document.createElement('div');
    this.el.id = 'context-menu';
    this.el.className = 'hidden';
    document.body.appendChild(this.el);
    document.addEventListener('click', () => this.hide());
    document.addEventListener('keydown', e => { if (e.key === 'Escape') this.hide(); });
  },
  show(x, y, items) {
    this.el.innerHTML = '';
    this.el.classList.remove('hidden');
    items.forEach(item => {
      if (item === '-') { const sep = document.createElement('div'); sep.className = 'ctx-sep'; this.el.appendChild(sep); return; }
      const btn = document.createElement('button');
      btn.className = 'context-menu-item';
      btn.innerHTML = (item.icon || '') + item.label;
      btn.addEventListener('click', () => { this.hide(); item.action(); });
      this.el.appendChild(btn);
    });
    const vw = window.innerWidth, vh = window.innerHeight;
    const w = this.el.offsetWidth || 175, h = this.el.offsetHeight || 200;
    this.el.style.left = Math.min(x, vw - w - 4) + 'px';
    this.el.style.top = Math.min(y, vh - h - 4) + 'px';
  },
  hide() { this.el.classList.add('hidden'); }
};
