const MusicApp = {
  tracks: [],
  currentIndex: -1,
  render(container) {
    container.innerHTML = `<div class="music-app"><div class="music-drop-zone"><input type="file" id="music-file-input" accept="audio/*,.mp3,.mp4,.m4a,.ogg,.wav,.flac" multiple style="display:none"><button class="music-upload-btn" id="music-upload-btn">${IC.folder} Subir música</button><span class="music-upload-hint">MP3, MP4, M4A, WAV, OGG</span></div><div class="music-playlist" id="music-playlist"><div class="music-empty">${IC.music}<br><br>Sube tu música para comenzar</div></div><div class="music-controls"><div class="music-now-playing" id="music-now-playing">Sin reproducción</div><audio id="music-audio" style="display:none"></audio><div class="music-progress-wrap"><span class="music-time" id="music-current-time">0:00</span><input type="range" id="music-progress" min="0" max="100" value="0" class="music-progress-bar"><span class="music-time" id="music-duration">0:00</span></div><div class="music-btns"><button class="music-ctrl-btn" id="music-prev" title="Anterior">|<</button><button class="music-ctrl-btn" id="music-play" title="Reproducir/Pausar">></button><button class="music-ctrl-btn" id="music-next" title="Siguiente">>|</button><input type="range" id="music-vol" min="0" max="100" value="75" class="music-vol-slider" title="Volumen"></div></div></div>`;
    this._bind(container);
    this._refreshPlaylist(container);
  },
  _bind(container) {
    const fileInput = container.querySelector('#music-file-input'), audio = container.querySelector('#music-audio');
    const playBtn = container.querySelector('#music-play'), prevBtn = container.querySelector('#music-prev'), nextBtn = container.querySelector('#music-next');
    const progressBar = container.querySelector('#music-progress'), volSlider = container.querySelector('#music-vol');
    const nowPlaying = container.querySelector('#music-now-playing'), curTime = container.querySelector('#music-current-time'), durEl = container.querySelector('#music-duration');
    container.querySelector('#music-upload-btn').addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', e => {
      Array.from(e.target.files).forEach(f => { const url = URL.createObjectURL(f); this.tracks.push({ name: f.name.replace(/\.[^.]+$/, ''), url }); });
      this._refreshPlaylist(container);
    });
    audio.volume = SystemVolume.level;
    volSlider.value = SystemVolume.level * 100;
    playBtn.addEventListener('click', () => {
      if (this.currentIndex < 0 && this.tracks.length > 0) this._play(0, container);
      else if (audio.paused) { audio.play(); playBtn.textContent = '||'; playBtn.classList.add('playing'); }
      else { audio.pause(); playBtn.textContent = '>'; playBtn.classList.remove('playing'); }
    });
    prevBtn.addEventListener('click', () => { if (this.currentIndex > 0) this._play(this.currentIndex - 1, container); });
    nextBtn.addEventListener('click', () => { if (this.currentIndex < this.tracks.length - 1) this._play(this.currentIndex + 1, container); });
    audio.addEventListener('timeupdate', () => {
      if (audio.duration) { progressBar.value = (audio.currentTime / audio.duration) * 100; curTime.textContent = this._fmt(audio.currentTime); }
    });
    audio.addEventListener('loadedmetadata', () => { durEl.textContent = this._fmt(audio.duration); });
    audio.addEventListener('ended', () => {
      playBtn.textContent = '>'; playBtn.classList.remove('playing');
      if (this.currentIndex < this.tracks.length - 1) this._play(this.currentIndex + 1, container);
    });
    progressBar.addEventListener('input', () => { if (audio.duration) audio.currentTime = (progressBar.value / 100) * audio.duration; });
    volSlider.addEventListener('input', () => { audio.volume = volSlider.value / 100; });
  },
  _play(idx, container) {
    this.currentIndex = idx;
    const t = this.tracks[idx], audio = container.querySelector('#music-audio'), playBtn = container.querySelector('#music-play'), nowPlaying = container.querySelector('#music-now-playing');
    audio.src = t.url; audio.volume = SystemVolume.level;
    audio.play(); playBtn.textContent = '||'; playBtn.classList.add('playing');
    nowPlaying.textContent = '>  ' + t.name;
    container.querySelectorAll('.music-track').forEach((el, i) => el.classList.toggle('active', i === idx));
    NotificationSystem.show('> Reproduciendo', t.name);
  },
  _refreshPlaylist(container) {
    const playlist = container.querySelector('#music-playlist');
    if (this.tracks.length === 0) { playlist.innerHTML = `<div class="music-empty">${IC.music}<br><br>Sube tu música para comenzar</div>`; return; }
    playlist.innerHTML = this.tracks.map((t, i) => `<div class="music-track${i === this.currentIndex ? ' active' : ''}" data-idx="${i}">${IC.music}<span class="music-track-name">${t.name}</span></div>`).join('');
    playlist.querySelectorAll('.music-track').forEach(el => { el.addEventListener('click', () => this._play(parseInt(el.dataset.idx), container)); });
  },
  _fmt(s) { if (!s || isNaN(s)) return '0:00'; const m = Math.floor(s / 60), sec = Math.floor(s % 60).toString().padStart(2, '0'); return `${m}:${sec}`; }
};
