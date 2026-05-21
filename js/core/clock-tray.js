const ClockTray = {
  visible: false,
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  toggle() {
    this.visible = !this.visible;
    const tray = document.getElementById('clock-tray');
    if (this.visible) {
      tray.classList.remove('hidden');
      NotificationSystem.clearUnread();
      this.render();
    } else {
      tray.classList.add('hidden');
    }
  },
  hide() { this.visible = false; document.getElementById('clock-tray').classList.add('hidden'); },
  render() {
    const tray = document.getElementById('clock-tray');
    const now = new Date();
    const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    const firstDay = new Date(this.year, this.month, 1).getDay();
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
    let calCells = '';
    for (let i = 0; i < firstDay; i++) calCells += '<div></div>';
    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = d === now.getDate() && this.month === now.getMonth() && this.year === now.getFullYear();
      calCells += `<div class="tray-cal-date${isToday ? ' today' : ''}">${d}</div>`;
    }
    const notifHTML = NotificationSystem.history.length
      ? NotificationSystem.history.slice(0, 10).map(n =>
        `<div class="tray-notif-item"><div class="tray-notif-title">${n.title}</div>${n.body ? `<div class="tray-notif-body">${n.body}</div>` : ''}<div class="tray-notif-time">${n.time.toLocaleTimeString('es',{hour:'2-digit',minute:'2-digit'})}</div></div>`
      ).join('')
      : '<div class="tray-notif-empty">Sin notificaciones recientes</div>';
    tray.innerHTML = `
      <div class="tray-time">${now.toLocaleTimeString('es',{hour:'2-digit',minute:'2-digit'})}</div>
      <div class="tray-date-full">${now.toLocaleDateString('es',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</div>
      <div class="tray-calendar">
        <div class="tray-cal-nav">
          <button class="tray-nav-btn" id="cal-prev"><</button>
          <span>${months[this.month]} ${this.year}</span>
          <button class="tray-nav-btn" id="cal-next">></button>
        </div>
        <div class="tray-cal-grid">
          <div class="tray-cal-day-name">Do</div><div class="tray-cal-day-name">Lu</div>
          <div class="tray-cal-day-name">Ma</div><div class="tray-cal-day-name">Mi</div>
          <div class="tray-cal-day-name">Ju</div><div class="tray-cal-day-name">Vi</div>
          <div class="tray-cal-day-name">Sa</div>
          ${calCells}
        </div>
      </div>
      <div class="tray-section-title">Notificaciones</div>
      <div class="tray-notif-list">${notifHTML}</div>
      ${NotificationSystem.history.length ? '<button class="tray-clear-btn" id="tray-clear">Limpiar todo</button>' : ''}`;
    tray.querySelector('#cal-prev')?.addEventListener('click', e => { e.stopPropagation(); this.month--; if (this.month < 0) { this.month = 11; this.year--; } this.render(); });
    tray.querySelector('#cal-next')?.addEventListener('click', e => { e.stopPropagation(); this.month++; if (this.month > 11) { this.month = 0; this.year++; } this.render(); });
    tray.querySelector('#tray-clear')?.addEventListener('click', e => { e.stopPropagation(); NotificationSystem.history = []; this.render(); });
  }
};
