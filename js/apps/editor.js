const EditorApp = {
  render(container, initialContent = '') {
    container.innerHTML = `<div class="editor-app"><div class="editor-toolbar"><button class="editor-btn" id="ed-new">${IC.newfile} Nuevo</button><button class="editor-btn" id="ed-save">${IC.save} Guardar</button><button class="editor-btn" id="ed-dl">${IC.download} Exportar</button></div><textarea class="editor-textarea" id="ed-area" spellcheck="false">${initialContent}</textarea><div class="editor-statusbar"><span id="ed-lines">Líneas: 1</span><span id="ed-chars">Caracteres: 0</span></div></div>`;
    const ta = container.querySelector('#ed-area');
    const update = () => { container.querySelector('#ed-lines').textContent = 'Líneas: ' + ta.value.split('\n').length; container.querySelector('#ed-chars').textContent = 'Caracteres: ' + ta.value.length; };
    ta.addEventListener('input', update); update();
    container.querySelector('#ed-new').addEventListener('click', () => { ta.value = ''; update(); });
    container.querySelector('#ed-save').addEventListener('click', () => { FileSystem.writeFile('/home/user/documentos/editor-save.txt', ta.value); NotificationSystem.show('Editor', 'Guardado correctamente'); });
    container.querySelector('#ed-dl').addEventListener('click', () => { const blob = new Blob([ta.value], { type: 'text/plain' }), a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'documento.txt'; a.click(); });
  }
};
