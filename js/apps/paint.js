const PaintApp = {
  render(container) {
    const COLORS = ['#C84B31', '#E74C3C', '#E67E22', '#F1C40F', '#2ECC71', '#1ABC9C', '#3498DB', '#9B59B6', '#ECDBBA', '#fff', '#aaa', '#555', '#111'];
    container.innerHTML = `<div class="paint-app"><div class="paint-toolbar"><div class="paint-group"><button class="paint-tool-btn active" data-tool="brush" title="Pincel">${IC.brush}</button><button class="paint-tool-btn" data-tool="eraser" title="Borrador">${IC.eraser}</button><button class="paint-tool-btn" data-tool="fill" title="Relleno">${IC.fill}</button></div><div class="paint-group">${COLORS.map((c, i) => `<div class="paint-color-btn${i === 0 ? ' active' : ''}" style="background:${c}" data-color="${c}" title="${c}"></div>`).join('')}</div><div class="paint-group"><button class="paint-size-btn active" data-size="4">S</button><button class="paint-size-btn" data-size="10">M</button><button class="paint-size-btn" data-size="20">L</button></div><button class="paint-act-btn" id="paint-clear">${IC.trash} Limpiar</button><button class="paint-act-btn" id="paint-dl">${IC.download} Guardar</button><input type="color" id="paint-custom-color" value="#C84B31" title="Color personalizado" style="width:28px;height:28px;padding:1px;cursor:pointer;border:var(--border-style);"></div><div class="paint-canvas-wrap"><canvas id="paint-canvas" width="640" height="400"></canvas></div></div>`;
    const canvas = container.querySelector('#paint-canvas'), ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 640, 400);
    let tool = 'brush', color = '#C84B31', size = 4, drawing = false, lx = 0, ly = 0;
    const getPos = e => { const r = canvas.getBoundingClientRect(); return { x: (e.clientX - r.left) * (canvas.width / r.width), y: (e.clientY - r.top) * (canvas.height / r.height) }; };
    canvas.addEventListener('mousedown', e => { drawing = true; const p = getPos(e); lx = p.x; ly = p.y; if (tool === 'fill') { floodFill(ctx, Math.floor(p.x), Math.floor(p.y), color); } });
    canvas.addEventListener('mousemove', e => { if (!drawing || tool === 'fill') return; const p = getPos(e); ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(p.x, p.y); ctx.strokeStyle = tool === 'eraser' ? '#fff' : color; ctx.lineWidth = size; ctx.lineCap = 'round'; ctx.stroke(); lx = p.x; ly = p.y; });
    canvas.addEventListener('mouseup', () => drawing = false); canvas.addEventListener('mouseleave', () => drawing = false);
    container.querySelectorAll('.paint-tool-btn').forEach(b => { b.addEventListener('click', () => { container.querySelectorAll('.paint-tool-btn').forEach(x => x.classList.remove('active')); b.classList.add('active'); tool = b.dataset.tool; }); });
    container.querySelectorAll('.paint-color-btn').forEach(b => { b.addEventListener('click', () => { container.querySelectorAll('.paint-color-btn').forEach(x => x.classList.remove('active')); b.classList.add('active'); color = b.dataset.color; }); });
    container.querySelectorAll('.paint-size-btn').forEach(b => { b.addEventListener('click', () => { container.querySelectorAll('.paint-size-btn').forEach(x => x.classList.remove('active')); b.classList.add('active'); size = parseInt(b.dataset.size); }); });
    container.querySelector('#paint-clear').addEventListener('click', () => { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 640, 400); });
    container.querySelector('#paint-dl').addEventListener('click', () => { const a = document.createElement('a'); a.href = canvas.toDataURL(); a.download = 'dibujo.png'; a.click(); });
    container.querySelector('#paint-custom-color').addEventListener('input', e => { color = e.target.value; });
  }
};
function floodFill(ctx, x, y, fillColor) {
  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height), data = imageData.data;
  const idx = (px, py) => (py * ctx.canvas.width + px) * 4;
  const ti = idx(x, y), target = [data[ti], data[ti + 1], data[ti + 2], data[ti + 3]], fill = hexToRgb(fillColor);
  if (!fill || (target[0] === fill[0] && target[1] === fill[1] && target[2] === fill[2])) return;
  const stack = [[x, y]];
  while (stack.length) {
    const [cx, cy] = stack.pop(), ci = idx(cx, cy);
    if (cx < 0 || cx >= ctx.canvas.width || cy < 0 || cy >= ctx.canvas.height) continue;
    if (data[ci] === target[0] && data[ci + 1] === target[1] && data[ci + 2] === target[2] && data[ci + 3] === target[3]) {
      data[ci] = fill[0]; data[ci + 1] = fill[1]; data[ci + 2] = fill[2]; data[ci + 3] = 255;
      stack.push([cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]);
    }
  }
  ctx.putImageData(imageData, 0, 0);
}
function hexToRgb(hex) { const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex); return r ? [parseInt(r[1], 16), parseInt(r[2], 16), parseInt(r[3], 16)] : null; }
