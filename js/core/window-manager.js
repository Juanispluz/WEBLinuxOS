const WindowManager = {
  windows: {},
  zTop: 10,
  init() {
    document.getElementById('desktop').addEventListener('mousedown', e => {
      const win = e.target.closest('.window');
      if (win) this._focus(win.dataset.id);
    });
  },
  open(id, title, w, h) {
    if (this.windows[id]) {
      const ex = this.windows[id];
      if (ex.minimized) { ex.minimized = false; ex.el.classList.remove('hidden'); this._focusEl(ex.el, id); }
      else this._focusEl(ex.el, id);
      return;
    }
    const el = document.createElement('div');
    el.className = 'window';
    el.dataset.id = id;
    const ox = 60 + Object.keys(this.windows).length * 28;
    const oy = 40 + Object.keys(this.windows).length * 28;
    el.style.cssText = `left:${Math.min(ox, window.innerWidth - 340)}px;top:${Math.min(oy, window.innerHeight - 280)}px;width:${w};height:${h};z-index:${++this.zTop}`;
    el.innerHTML = `<div class="window-header"><span class="window-title">${title}</span><div class="window-controls"><button class="window-btn minimize" data-action="minimize">${IC.minimize}</button><button class="window-btn maximize" data-action="maximize">${IC.maximize}</button><button class="window-btn close" data-action="close">${IC.close}</button></div></div><div class="window-content"></div><div class="window-resize"></div>`;
    el.querySelectorAll('.window-btn').forEach(btn => btn.addEventListener('click', e => { e.stopPropagation(); const a = btn.dataset.action; if (a === 'close') this.close(id); else if (a === 'minimize') this.minimize(id); else if (a === 'maximize') this.maximize(id); }));
    this._makeDraggable(el);
    this._makeResizable(el);
    document.getElementById('desktop').appendChild(el);
    this.windows[id] = { el, title, minimized: false };
    this._updateTaskbar();
  },
  close(id) { const w = this.windows[id]; if (!w) return; w.el.remove(); delete this.windows[id]; this._updateTaskbar(); },
  minimize(id) { const w = this.windows[id]; if (!w) return; w.minimized = true; w.el.classList.add('hidden'); this._updateTaskbar(); },
  maximize(id) { const w = this.windows[id]; if (!w) return; w.el.classList.toggle('maximized'); },
  _focus(id) { const w = this.windows[id]; if (w) this._focusEl(w.el, id); },
  _focusEl(el, id) { el.style.zIndex = ++this.zTop; this._updateTaskbar(); },
  getContent(id) { return this.windows[id]?.el.querySelector('.window-content'); },
  _updateTaskbar() {
    const bar = document.getElementById('taskbar-apps');
    if (!bar) return;
    bar.innerHTML = '';
    Object.entries(this.windows).forEach(([id, w]) => {
      const btn = document.createElement('button');
      btn.className = 'taskbar-app' + (w.minimized ? ' minimized' : '');
      btn.innerHTML = (appIcons[id] || '') + `<span>${w.title}</span>`;
      btn.addEventListener('click', () => {
        if (w.minimized) { w.minimized = false; w.el.classList.remove('hidden'); this._focusEl(w.el, id); }
        else if (w.el.style.zIndex == this.zTop) this.minimize(id);
        else this._focusEl(w.el, id);
      });
      bar.appendChild(btn);
    });
  },
  _updateWindowIcons() {
    Object.values(this.windows).forEach(w => {
      w.el.querySelectorAll('[data-ic]').forEach(el => {
        const key = el.dataset.ic;
        if (IC[key]) el.outerHTML = IC[key];
      });
    });
  },
  _updateWindowControls() {
    Object.values(this.windows).forEach(w => {
      const btns = w.el.querySelectorAll('.window-btn');
      btns.forEach(btn => {
        const action = btn.dataset.action;
        if (action === 'minimize') btn.innerHTML = IC.minimize;
        else if (action === 'maximize') btn.innerHTML = IC.maximize;
        else if (action === 'close') btn.innerHTML = IC.close;
      });
    });
  },
  _makeDraggable(el) {
    const header = el.querySelector('.window-header');
    let ox = 0, oy = 0, sx = 0, sy = 0, dragging = false;
    header.addEventListener('mousedown', e => {
      if (e.target.closest('.window-btn') || el.classList.contains('maximized')) return;
      dragging = true; sx = e.clientX; sy = e.clientY; ox = el.offsetLeft; oy = el.offsetTop; e.preventDefault();
    });
    document.addEventListener('mousemove', e => {
      if (!dragging) return;
      el.style.left = Math.max(0, Math.min(ox + (e.clientX - sx), window.innerWidth - el.offsetWidth)) + 'px';
      el.style.top = Math.max(0, Math.min(oy + (e.clientY - sy), window.innerHeight - el.offsetHeight)) + 'px';
    });
    document.addEventListener('mouseup', () => dragging = false);
  },
  _makeResizable(el) {
    const handle = el.querySelector('.window-resize');
    let resizing = false, sx = 0, sy = 0, sw = 0, sh = 0;
    handle.addEventListener('mousedown', e => { resizing = true; sx = e.clientX; sy = e.clientY; sw = el.offsetWidth; sh = el.offsetHeight; e.preventDefault(); e.stopPropagation(); });
    document.addEventListener('mousemove', e => { if (!resizing) return; el.style.width = Math.max(280, sw + (e.clientX - sx)) + 'px'; el.style.height = Math.max(200, sh + (e.clientY - sy)) + 'px'; });
    document.addEventListener('mouseup', () => resizing = false);
  }
};
