const AboutApp = {
  render(container) {
    container.addEventListener('contextmenu', e => { e.preventDefault(); e.stopPropagation(); });
    container.innerHTML = `<div class="about-app"><div class="about-logo"><svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="2" y="2" width="13" height="13" rx="2" fill="white"/><rect x="17" y="2" width="13" height="13" rx="2" fill="white" opacity=".7"/><rect x="2" y="17" width="13" height="13" rx="2" fill="white" opacity=".7"/><rect x="17" y="17" width="13" height="13" rx="2" fill="white" opacity=".4"/></svg></div><div class="about-title">WebLinux</div><div class="about-version">Versión 2.0.0 — ${ThemeManager.currentLabel}</div><div class="about-desc">Mini sistema operativo en tu navegador.<br>Modo oscuro/claro • 3 temas visuales<br>Notificaciones • Reproductor de música<br>Calendario • Fondo personalizado</div><div class="about-badge">${ThemeManager.currentLabel} v2.0</div></div>`;
  }
};
