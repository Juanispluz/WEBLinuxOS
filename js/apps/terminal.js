const TerminalApp = {
  render(container) {
    container.addEventListener('contextmenu', e => { e.preventDefault(); e.stopPropagation(); });
    container.innerHTML = `<div class="terminal-app"><div class="terminal-line terminal-info">WebLinux v2.0 — escriba "help"</div><div class="terminal-input-line"><span class="terminal-prompt">guest@weblinux:~$</span><input type="text" class="terminal-input" id="term-input" autocomplete="off" spellcheck="false"></div></div>`;
    const wrap = container.querySelector('.terminal-app'), input = container.querySelector('#term-input'), history = [];
    let histIdx = -1;
    input.addEventListener('keydown', e => {
      if (e.key === 'ArrowUp') { e.preventDefault(); if (histIdx < history.length - 1) { histIdx++; input.value = history[history.length - 1 - histIdx] || ''; } }
      if (e.key === 'ArrowDown') { e.preventDefault(); if (histIdx > 0) { histIdx--; input.value = history[history.length - 1 - histIdx] || ''; } else { histIdx = -1; input.value = ''; } }
      if (e.key !== 'Enter') return;
      const cmd = input.value.trim(); if (cmd) history.push(cmd); histIdx = -1;
      const promptLine = document.createElement('div'); promptLine.className = 'terminal-line';
      promptLine.innerHTML = `<span style="color:var(--c-primary)">guest@weblinux:${Commands.currentPath}$</span> ${cmd}`;
      input.parentElement.parentElement.insertBefore(promptLine, input.parentElement);
      const result = Commands.execute(cmd);
      if (result === '__clear__') { Array.from(wrap.querySelectorAll('.terminal-line')).forEach(l => l.remove()); } else if (result) { const out = document.createElement('div'); out.className = 'terminal-line terminal-out'; out.textContent = result; input.parentElement.parentElement.insertBefore(out, input.parentElement); }
      input.value = ''; wrap.scrollTop = wrap.scrollHeight;
    });
    wrap.addEventListener('click', () => input.focus()); input.focus();
  }
};
