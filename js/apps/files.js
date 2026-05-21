const FilesApp = {
  currentPath: '/home/user',
  reset() { this.currentPath = '/home/user'; },
  render(container) {
    container.innerHTML = '';
    const app = document.createElement('div'); app.className = 'files-app'; container.appendChild(app);
    this._draw(app);
  },
  _draw(container) {
    const parent = FileSystem.getParent(this.currentPath), files = FileSystem.listDir(this.currentPath);
    container.innerHTML = `<div class="files-toolbar"><button class="files-nav-btn" id="files-back" ${this.currentPath === '/' ? 'disabled' : ''} title="Atras">${IC.back}</button><div class="files-path-bar">${this.currentPath}</div></div><div class="files-grid" id="files-grid"></div>`;
    if (this.currentPath !== '/') container.querySelector('#files-back').addEventListener('click', () => { this.currentPath = parent; this._draw(container); });
    const grid = container.querySelector('#files-grid');
    if (!files || files.length === 0) { grid.innerHTML = '<div class="files-empty">Carpeta vacía</div>'; return; }
    files.forEach(name => {
      const full = this.currentPath === '/' ? '/' + name : this.currentPath + '/' + name, isDir = FileSystem.isDir(full);
      const item = document.createElement('div'); item.className = 'file-item';
      item.innerHTML = `<div class="file-icon">${isDir ? IC.folder : IC.file}</div><div class="file-name">${name}</div>`;
      item.addEventListener('dblclick', () => {
        if (isDir) { this.currentPath = full; this._draw(container); }
        else { const content = FileSystem.readFile(full) || '', eid = 'editor-' + Date.now(); WindowManager.open(eid, 'Editor — ' + name, '620px', '460px'); const c = WindowManager.getContent(eid); if (c) EditorApp.render(c, content); }
      });
      item.addEventListener('contextmenu', e => { e.preventDefault(); e.stopPropagation(); ContextMenu.show(e.clientX, e.clientY, [{ label: 'Abrir', action: () => item.dispatchEvent(new MouseEvent('dblclick')) }, { label: 'Eliminar', action: () => alert('No implementado') }]); });
      grid.appendChild(item);
    });
  }
};
