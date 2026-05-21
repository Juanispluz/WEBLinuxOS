const Commands = {
  currentPath: '/home/user',
  execute(cmd) {
    const [command, ...args] = cmd.trim().split(/\s+/);
    switch (command.toLowerCase()) {
      case '': return '';
      case 'help': return this.help();
      case 'ls': return this.ls();
      case 'cd': return this.cd(args[0]);
      case 'pwd': return this.currentPath;
      case 'cat': return this.cat(args[0]);
      case 'echo': return args.join(' ');
      case 'clear': return '__clear__';
      case 'date': return new Date().toString();
      case 'whoami': return 'guest';
      case 'uname': return args[0] === '-a' ? 'WebLinux 2.0.0 x86_64 GNU/Linux' : 'WebLinux';
      case 'mkdir': return this.mkdir(args[0]);
      case 'touch': return this.touch(args[0]);
      case 'rm': return 'Archivo eliminado (simulacion)';
      case 'calc': return this.calc(args.join(''));
      case 'reboot': return 'Reiniciando...';
      case 'exit': return 'Sesion cerrada';
      case 'tree': return this.tree();
      case 'history': return '1 help\n2 ls\n3 cd /home\n4 pwd';
      case 'hostname': return FileSystem.readFile('/etc/hostname') || 'weblinux';
      case 'ps': return '  PID TTY    TIME CMD\n    1 ?    00:00 init\n  234 ?    00:01 bash';
      case 'df': return 'Filesystem   1K-blocks  Used Available\n/dev/sda1       204800 10240    194560';
      case 'free': return '       total   used   free\nMem:  1024000 512000 512000';
      case 'lamondadetrabajo': {
        const ea = document.getElementById('easter-audio');
        if (ea) { ea.volume = SystemVolume.level; ea.currentTime = 0; ea.play().then(() => NotificationSystem.show('> La Monda de Trabajo','Audio reproduciendo...')).catch(() => NotificationSystem.show('Easter Egg','Coloca lamondadetrabajo.mp3 en el mismo directorio')); }
        return '>>>  ¡LA MONDA DE TRABAJO!  >>>\nreproduciendo: lamondadetrabajo.mp3';
      }
      default: return `Comando no encontrado: ${command}`;
    }
  },
  help() { return `Comandos disponibles:\n  help, ls, cd, pwd, cat, echo, clear, date\n  whoami, uname [-a], mkdir, touch, rm, calc\n  tree, history, hostname, ps, df, free\n  reboot, exit\n  lamondadetrabajo  (comando especial (musica))`; },
  ls() { const f = FileSystem.listDir(this.currentPath); return f.length ? f.join('  ') : '(vacio)'; },
  cd(p) {
    if (!p || p === '/') { this.currentPath = '/'; return ''; }
    if (p === '..') { this.currentPath = FileSystem.getParent(this.currentPath); return ''; }
    const np = p.startsWith('/') ? p : (this.currentPath === '/' ? '/' + p : this.currentPath + '/' + p);
    if (FileSystem.isDir(np)) { this.currentPath = np; return ''; }
    return `Error: Directorio no encontrado: ${p}`;
  },
  cat(p) { if (!p) return 'Uso: cat <archivo>'; const fp = p.startsWith('/') ? p : this.currentPath + '/' + p; return FileSystem.readFile(fp) || `Error: Archivo no encontrado: ${p}`; },
  mkdir(n) { if (!n) return 'Uso: mkdir <dir>'; return FileSystem.createDir(this.currentPath, n) ? '' : 'Error: El directorio ya existe'; },
  touch(n) { if (!n) return 'Uso: touch <archivo>'; return 'Archivo creado (simulacion)'; },
  calc(e) { if (!e) return 'Uso: calc <expr>'; try { return eval(e).toString(); } catch { return 'Error en la expresion'; } },
  tree() { const lines = [this.currentPath]; FileSystem.listDir(this.currentPath).forEach(f => { const cp = this.currentPath === '/' ? '/' + f : this.currentPath + '/' + f; lines.push('--- ' + (FileSystem.isDir(cp) ? '[DIR] ' : '') + f); }); return lines.join('\n'); }
};
