const WALLPAPERS = [
  {id:'default', label:'Aurora', style:'', lightStyle:'background:radial-gradient(ellipse 100% 100% at 50% 0%,#c8d8f8 0%,#d8e4ff 50%,#f0f4ff 100%)'},
  {id:'deep', label:'Profundo', style:'background:radial-gradient(ellipse 80% 60% at 20% 80%,rgba(45,53,97,0.9) 0%,transparent 70%),radial-gradient(ellipse 60% 50% at 80% 20%,rgba(200,75,49,0.45) 0%,transparent 65%),#030509', lightStyle:'background:radial-gradient(ellipse 80% 60% at 20% 80%,rgba(120,140,200,0.4) 0%,transparent 60%),radial-gradient(ellipse 60% 50% at 80% 20%,rgba(200,120,80,0.2) 0%,transparent 60%),#d8e0f0'},
  {id:'violet', label:'Violeta', style:'background:radial-gradient(ellipse 100% 80% at 50% 50%,#0d0824 0%,#040212 100%)', lightStyle:'background:radial-gradient(ellipse 100% 80% at 50% 50%,#d8d0f0 0%,#e8e4f8 100%)'},
  {id:'ocean', label:'Oceano', style:'background:radial-gradient(ellipse 80% 60% at 20% 30%,rgba(0,80,160,0.6) 0%,transparent 60%),radial-gradient(ellipse at 80% 80%,rgba(0,160,160,0.3) 0%,transparent 60%),#020a18', lightStyle:'background:radial-gradient(ellipse 80% 60% at 20% 30%,rgba(100,180,255,0.3) 0%,transparent 60%),radial-gradient(ellipse at 80% 80%,rgba(100,220,220,0.2) 0%,transparent 60%),#d8e8f8'},
  {id:'ember', label:'Brasa', style:'background:radial-gradient(ellipse at 50% 100%,rgba(200,75,49,0.5) 0%,rgba(80,20,5,0.3) 50%,transparent 70%),#06020A', lightStyle:'background:radial-gradient(ellipse at 50% 100%,rgba(220,150,100,0.25) 0%,rgba(200,100,50,0.1) 50%,transparent 70%),#f0e8e0'},
  {id:'mint', label:'Menta', style:'background:radial-gradient(ellipse at 30% 40%,rgba(20,180,120,0.3) 0%,transparent 60%),radial-gradient(ellipse at 80% 80%,rgba(45,53,97,0.4) 0%,transparent 60%),#020C0A', lightStyle:'background:radial-gradient(ellipse at 30% 40%,rgba(120,220,180,0.2) 0%,transparent 60%),radial-gradient(ellipse at 80% 80%,rgba(150,160,200,0.2) 0%,transparent 60%),#e0f0e8'},
  {id:'slate', label:'Pizarra', style:'background:linear-gradient(135deg,#0a0a18 0%,#141420 100%)', lightStyle:'background:linear-gradient(135deg,#e0e0ee 0%,#d0d0e0 100%)'},
  {id:'custom', label:'Color', style:'background:#222233', lightStyle:'background:#D0D0E8'},
];

let activeWP = 'default';
let savedCustomWP = '';

function applyWallpaper(id, src) {
  const desktop = document.getElementById('desktop');
  const isDark = ThemeManager.isDark;
  if (id === 'custom-img') {
    const url = src || savedCustomWP;
    if (!url) { activeWP = 'default'; applyWallpaper('default'); return; }
    desktop.style.cssText = '';
    desktop.style.backgroundImage = `url(${url})`;
    desktop.style.backgroundSize = 'cover';
    desktop.style.backgroundPosition = 'center';
    activeWP = 'custom-img';
    savedCustomWP = url;
    return;
  }
  if (id === 'custom') {
    const color = src || savedCustomWP;
    if (!color) { activeWP = 'default'; applyWallpaper('default'); return; }
    desktop.style.cssText = '';
    desktop.style.background = color;
    activeWP = 'custom';
    savedCustomWP = color;
    return;
  }
  const wp = WALLPAPERS.find(w => w.id === id);
  if (!wp) { desktop.removeAttribute('style'); activeWP = 'default'; return; }
  const style = isDark ? wp.style : (wp.lightStyle || wp.style);
  if (style) desktop.setAttribute('style', style);
  else desktop.removeAttribute('style');
  activeWP = id;
}
