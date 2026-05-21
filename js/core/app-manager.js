const Apps = {
  terminal:    {title:'Terminal',              w:'620px', h:'460px', render: c => TerminalApp.render(c)},
  files:       {title:'Explorador',            w:'500px', h:'450px', render: c => FilesApp.render(c), reset: () => FilesApp.reset()},
  calc:        {title:'Calculadora',           w:'300px', h:'420px', render: c => CalculatorApp.render(c)},
  editor:      {title:'Editor de Texto',       w:'620px', h:'460px', render: c => EditorApp.render(c)},
  paint:       {title:'Paint',                 w:'720px', h:'520px', render: c => PaintApp.render(c)},
  minesweeper: {title:'Buscaminas',            w:'380px', h:'470px', render: c => MinesweeperApp.render(c)},
  music:       {title:'Reproductor de Música', w:'500px', h:'460px', render: c => MusicApp.render(c)},
  settings:    {title:'Ajustes del sistema',   w:'520px', h:'500px', render: c => SettingsApp.render(c)},
  about:       {title:'Acerca de',             w:'400px', h:'400px', render: c => AboutApp.render(c)},
};

const AppManager = {
  open(name) {
    const app = Apps[name];
    if (!app) return;
    if (app.reset) app.reset();
    WindowManager.open(name, app.title, app.w, app.h);
    const c = WindowManager.getContent(name);
    if (c && app.render) app.render(c);
  }
};
