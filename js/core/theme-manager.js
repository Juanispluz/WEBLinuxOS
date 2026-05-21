const THEMES = [
  { id: 'glass', label: 'Glassmorphism' },
  { id: 'skeu',  label: 'Skeuomorphic' },
  { id: 'flat',  label: 'Flat Design' }
];

const THEME_LABELS = {
  glass: 'Glassmorphism',
  skeu:  'Skeuomorphic',
  flat:  'Flat Design'
};

const ThemeManager = {
  currentTheme: 'flat',
  isDark: true,

  init() {
    const saved = localStorage.getItem('weblinux-theme');
    if (saved && THEME_LABELS[saved]) this.currentTheme = saved;
    const savedDark = localStorage.getItem('weblinux-dark');
    if (savedDark !== null) this.isDark = savedDark === 'true';
    document.body.classList.toggle('light', !this.isDark);
    this._loadThemeCSS();
    this._applyIcons();
    this._updateStartMenuIcons();
    const btn = document.getElementById('theme-btn');
    if (btn) btn.title = this.isDark ? 'Modo claro' : 'Modo oscuro';
  },

  setTheme(id) {
    if (!THEME_LABELS[id]) return;
    this.currentTheme = id;
    this._loadThemeCSS();
    this._applyIcons();
    localStorage.setItem('weblinux-theme', id);
    WindowManager._updateTaskbar();
    WindowManager._updateWindowControls();
    WindowManager._updateWindowIcons();
    this._updateStartMenuIcons();
  },

  _loadThemeCSS() {
    let link = document.getElementById('theme-css');
    if (!link) {
      link = document.createElement('link');
      link.id = 'theme-css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    link.href = `css/${this.currentTheme}.css`;
  },

  _applyIcons() {
    const isSkeu = this.currentTheme === 'skeu';
    if (isSkeu) {
      const icons = this.isDark ? ICONS_SKEU_DARK : ICONS_SKEU_LIGHT;
      setIcons(icons);
    } else {
      setIcons(ICONS_DEFAULT);
    }
  },

  toggle() {
    this.isDark = !this.isDark;
    document.body.classList.toggle('light', !this.isDark);
    this._applyIcons();
    applyWallpaper(activeWP);
    this._updateThemeBtnIcon();
    WindowManager._updateTaskbar();
    WindowManager._updateWindowControls();
    WindowManager._updateWindowIcons();
    this._updateStartMenuIcons();
    localStorage.setItem('weblinux-dark', this.isDark);
  },

  _updateStartMenuIcons() {
    document.querySelectorAll('.app-btn[data-app]').forEach(btn => {
      const app = btn.dataset.app;
      const html = appIcons[app] || IC[app] || '';
      if (!html) return;
      const existing = btn.querySelector('svg');
      if (existing) existing.outerHTML = html;
    });
    const shutBtn = document.getElementById('shutdown');
    if (shutBtn) {
      const existing = shutBtn.querySelector('svg');
      if (existing) {
        existing.outerHTML = this.currentTheme === 'skeu'
          ? (this.isDark ? ICONS_SKEU_DARK.power : ICONS_SKEU_LIGHT.power)
          : IC.power;
      }
    }
  },

  _updateThemeBtnIcon() {
    const btn = document.getElementById('theme-btn');
    if (!btn) return;
    btn.innerHTML = this.isDark
      ? `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`
      : `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
    btn.title = this.isDark ? 'Modo claro' : 'Modo oscuro';
  },

  get currentLabel() {
    return THEME_LABELS[this.currentTheme] || 'Glassmorphism';
  }
};
