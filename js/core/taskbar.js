const Taskbar = {
  init() {
    const startBtn = document.getElementById('start-btn');
    const startMenu = document.getElementById('start-menu');
    startBtn.addEventListener('click', e => { e.stopPropagation(); startMenu.classList.toggle('hidden'); });
    document.addEventListener('click', e => { if (!e.target.closest('#start-menu') && !e.target.closest('#start-btn')) startMenu.classList.add('hidden'); });

    const volBtn = document.getElementById('vol-btn');
    const volPopup = document.getElementById('vol-popup');
    const volSlider = document.getElementById('sys-vol-slider');
    const volDisplay = document.getElementById('vol-value-display');
    volBtn.addEventListener('click', e => { e.stopPropagation(); ClockTray.hide(); volPopup.classList.toggle('hidden'); });
    volSlider.addEventListener('input', () => { const v = parseInt(volSlider.value); SystemVolume.set(v / 100); volDisplay.textContent = v + '%'; });
    document.addEventListener('click', e => { if (!e.target.closest('#vol-popup') && !e.target.closest('#vol-btn')) volPopup.classList.add('hidden'); });

    document.getElementById('theme-btn').addEventListener('click', e => { e.stopPropagation(); ThemeManager.toggle(); });
    document.getElementById('clock-area').addEventListener('click', e => { e.stopPropagation(); volPopup.classList.add('hidden'); ClockTray.toggle(); });
    document.addEventListener('click', e => { if (!e.target.closest('#clock-tray') && !e.target.closest('#clock-area')) ClockTray.hide(); });

    document.getElementById('shutdown').addEventListener('click', () => {
      if (confirm('¿Confirmar apagado del sistema?'))
        document.body.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;background:#060816;color:#fff;font-family:system-ui;gap:12px"><div style="color:#C84B31;font-size:1.5rem;letter-spacing:.3em">WEBLINUX</div><div style="color:#444;font-size:.85rem;letter-spacing:.2em">Sistema apagado.</div></div>';
    });

    const update = () => {
      document.getElementById('clock').textContent = new Date().toLocaleTimeString('es', {hour:'2-digit',minute:'2-digit'});
      if (ClockTray.visible) ClockTray.render();
    };
    update();
    setInterval(update, 10000);
  }
};
