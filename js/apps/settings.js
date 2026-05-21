const SettingsApp = {
  render(container) {
    container.addEventListener('contextmenu', e => { e.preventDefault(); e.stopPropagation(); });
    container.innerHTML = `<div class="settings-app"><div class="settings-tabs"><button class="stab active" data-tab="appearance">Apariencia</button><button class="stab" data-tab="system">Sistema</button><button class="stab" data-tab="info">Información</button></div><div class="settings-content" id="settings-content"></div></div>`;
    const tabs = container.querySelectorAll('.stab'), content = container.querySelector('#settings-content');
    const render = tab => { tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tab)); if (tab === 'appearance') this._appearance(content); else if (tab === 'system') this._system(content); else this._info(content); };
    tabs.forEach(t => t.addEventListener('click', () => render(t.dataset.tab))); render('appearance');
  },
  _appearance(el) {
    el.innerHTML = `
      <div class="settings-section">
        <h3>Fondo de pantalla</h3>
        <div class="wp-grid" id="wp-grid">${WALLPAPERS.map(w => `<div><div class="wp-item${w.id === activeWP ? ' wp-active' : ''}" data-wp="${w.id}"><div class="wp-half" style="${w.style}"></div><div class="wp-half" style="${w.lightStyle || w.style}"></div></div><div class="wp-label">${w.label}</div></div>`).join('')}</div>
        <div class="custom-color-row">
          <label>Color:</label><input type="color" id="wp-color" value="#1A1A2E">
          <button class="editor-btn" id="wp-apply-color">Aplicar</button>
          <input type="file" id="wp-img-input" accept="image/*" style="display:none">
          <button class="editor-btn" id="wp-img-btn">${IC.image} Imagen</button>
        </div>
      </div>
      <div class="settings-section">
        <h3>Interfaz</h3>
        <div class="settings-row"><label>Modo oscuro</label><div class="toggle${ThemeManager.isDark ? ' on' : ''}" id="tog-theme"></div></div>
        <div class="settings-row"><label>Animaciones</label><div class="toggle${AnimationManager.enabled ? ' on' : ''}" id="tog-anim"></div></div>
        <div class="settings-row"><label>Auto-ocultar barra de tareas</label><div class="toggle${TaskbarManager.autoHide ? ' on' : ''}" id="tog-taskbar"></div></div>
      </div>
      <div class="settings-section">
        <h3>Tema de interfaz</h3>
        <div class="settings-row"><label>Tema visual</label><select class="theme-select" id="theme-select">${THEMES.map(t => `<option value="${t.id}"${t.id === ThemeManager.currentTheme ? ' selected' : ''}>${t.label}</option>`).join('')}</select></div>
      </div>`;
    el.querySelectorAll('.wp-item').forEach(item => item.addEventListener('click', () => { el.querySelectorAll('.wp-item').forEach(i => i.classList.remove('wp-active')); item.classList.add('wp-active'); applyWallpaper(item.dataset.wp); }));
    el.querySelector('#wp-apply-color').addEventListener('click', () => { const c = el.querySelector('#wp-color').value; el.querySelectorAll('.wp-item').forEach(i => i.classList.remove('wp-active')); applyWallpaper('custom', c); });
    el.querySelector('#wp-img-btn').addEventListener('click', () => el.querySelector('#wp-img-input').click());
    el.querySelector('#wp-img-input').addEventListener('change', e => { const file = e.target.files[0]; if (!file) return; el.querySelectorAll('.wp-item').forEach(i => i.classList.remove('wp-active')); applyWallpaper('custom-img', URL.createObjectURL(file)); });
    const togTheme = el.querySelector('#tog-theme'); togTheme.addEventListener('click', () => { ThemeManager.toggle(); togTheme.classList.toggle('on', ThemeManager.isDark); });
    const togAnim = el.querySelector('#tog-anim'); togAnim.addEventListener('click', () => { AnimationManager.toggle(); togAnim.classList.toggle('on', AnimationManager.enabled); });
    const togTB = el.querySelector('#tog-taskbar'); togTB.addEventListener('click', () => { TaskbarManager.toggle(); togTB.classList.toggle('on', TaskbarManager.autoHide); });
    el.querySelector('#theme-select').addEventListener('change', e => { ThemeManager.setTheme(e.target.value); });
  },
  _system(el) {
    el.innerHTML = `<div class="settings-section"><h3>Audio</h3><div class="settings-row"><label>Volumen del sistema</label><div style="display:flex;align-items:center;gap:8px;flex:1;max-width:180px"><input type="range" id="set-vol" min="0" max="100" value="${Math.round(SystemVolume.level * 100)}" style="flex:1"><span class="val" id="set-vol-val">${Math.round(SystemVolume.level * 100)}%</span></div></div></div><div class="settings-section"><h3>Notificaciones</h3><div class="settings-row"><label>Notificaciones activas</label><div class="toggle${NotificationSystem.enabled ? ' on' : ''}" id="tog-notif"></div></div></div>`;
    const volRange = el.querySelector('#set-vol'), volVal = el.querySelector('#set-vol-val');
    volRange.addEventListener('input', () => { const v = parseInt(volRange.value); SystemVolume.set(v / 100); volVal.textContent = v + '%'; document.getElementById('sys-vol-slider').value = v; document.getElementById('vol-value-display').textContent = v + '%'; });
    const togNotif = el.querySelector('#tog-notif'); togNotif.addEventListener('click', () => { NotificationSystem.setEnabled(!NotificationSystem.enabled); togNotif.classList.toggle('on', NotificationSystem.enabled); });
  },
  _info(el) {
    el.innerHTML = `<div class="settings-section"><h3>Sistema</h3><div class="settings-row"><label>Nombre</label><span class="val">WebLinux</span></div><div class="settings-row"><label>Versión</label><span class="val">2.0.0</span></div><div class="settings-row"><label>Estilo</label><span class="val">${ThemeManager.currentLabel}</span></div><div class="settings-row"><label>Kernel</label><span class="val">WebLinux 2.0.0 x86_64</span></div><div class="settings-row"><label>Usuario</label><span class="val">guest</span></div><div class="settings-row"><label>Home</label><span class="val">/home/user</span></div></div>`;
  }
};
