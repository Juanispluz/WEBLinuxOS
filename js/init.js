document.addEventListener('DOMContentLoaded', () => {
  AnimationManager.init();
  ThemeManager.init();
  WindowManager.init();
  ContextMenu.init();
  TaskbarManager.init();
  Taskbar.init();
  applyWallpaper('default');
  const desktop = document.getElementById('desktop');
  desktop.addEventListener('contextmenu', e => {
    if (e.target.closest('.window')) return;
    e.preventDefault();
    ContextMenu.show(e.clientX, e.clientY, [
      { label: 'Terminal', icon: IC.terminal + '&nbsp;', action: () => AppManager.open('terminal') },
      { label: 'Explorador', icon: IC.folder + '&nbsp;', action: () => AppManager.open('files') },
      { label: 'Reproductor', icon: IC.music + '&nbsp;', action: () => AppManager.open('music') },
      { label: 'Paint', icon: IC.paint + '&nbsp;', action: () => AppManager.open('paint') },
      { label: 'Buscaminas', icon: IC.bomb + '&nbsp;', action: () => AppManager.open('minesweeper') },
      '-',
      { label: 'Ajustes', icon: IC.settings + '&nbsp;', action: () => AppManager.open('settings') }
    ]);
  });
  document.querySelectorAll('.app-btn[data-app]').forEach(btn => {
    btn.addEventListener('click', () => {
      AppManager.open(btn.dataset.app);
      document.getElementById('start-menu').classList.add('hidden');
    });
  });
  setTimeout(() => NotificationSystem.show('WebLinux v2.0', 'Bienvenido al sistema'), 800);
  setTimeout(() => NotificationSystem.show('Consejo', 'Escribe "lamondadetrabajo" en la terminal'), 2500);
});
