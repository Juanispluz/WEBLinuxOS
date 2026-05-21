const FileSystem = {
  data: {
    '/':{type:'dir',children:['home','usr','etc','var','tmp']},
    '/home':{type:'dir',children:['user']},
    '/home/user':{type:'dir',children:['documentos','descargas','escritorio']},
    '/home/user/documentos':{type:'dir',children:['nota.txt','proyecto.txt']},
    '/home/user/descargas':{type:'dir',children:[]},
    '/home/user/escritorio':{type:'dir',children:[]},
    '/usr':{type:'dir',children:['bin','lib']},
    '/etc':{type:'dir',children:['hostname','passwd']},
    '/var':{type:'dir',children:['log']},
    '/tmp':{type:'dir',children:[]}
  },
  contents: {
    '/etc/hostname':'weblinux',
    '/etc/passwd':'root:x:0:0:root:/root:/bin/bash\nuser:x:1000:1000:User:/home/user:/bin/bash',
    '/home/user/documentos/nota.txt':'Esta es una nota de prueba.\nWebLinux OS v2.0',
    '/home/user/documentos/proyecto.txt':'Mi proyecto:\n- Aprender Linux\n- Crear un mini OS\n- Disfrutar!'
  },
  isDir(p) { return this.data[p]?.type === 'dir'; },
  isFile(p) { return Object.hasOwn(this.contents, p); },
  readFile(p) { return this.contents[p] ?? null; },
  listDir(p) { return this.data[p]?.children ?? []; },
  getParent(p) { if (p === '/') return '/'; const pts = p.split('/').filter(Boolean); pts.pop(); return '/' + pts.join('/') || '/'; },
  createDir(path, name) { const full = path === '/' ? '/' + name : path + '/' + name; if (!this.data[full]) { this.data[full] = {type:'dir',children:[]}; this.data[path]?.children.push(name); return true; } return false; },
  writeFile(path, content) { this.contents[path] = content; }
};
