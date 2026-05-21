const MinesweeperApp = {
  render(container) {
    const ROWS = 9, COLS = 9, MINES = 10;
    let board = [], revealed = [], flagged = [], gameOver = false, firstClick = true, timer = 0, timerInterval = null;
    const init = () => {
      board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
      revealed = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
      flagged = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
      gameOver = false; firstClick = true; timer = 0; clearInterval(timerInterval);
    };
    const placeMines = (excludeR, excludeC) => {
      let placed = 0;
      while (placed < MINES) {
        const r = Math.floor(Math.random() * ROWS), c = Math.floor(Math.random() * COLS);
        if (board[r][c] !== -1 && !(r === excludeR && c === excludeC)) { board[r][c] = -1; placed++; }
      }
      for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
        if (board[r][c] === -1) continue;
        let n = 0;
        for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) { const nr = r + dr, nc = c + dc; if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc] === -1) n++; }
        board[r][c] = n;
      }
    };
    const reveal = (r, c) => {
      if (r < 0 || r >= ROWS || c < 0 || c >= COLS || revealed[r][c] || flagged[r][c]) return;
      revealed[r][c] = true;
      if (board[r][c] === 0) for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) reveal(r + dr, c + dc);
    };
    const draw = () => {
      const flagCount = flagged.flat().filter(Boolean).length;
      container.querySelector('#mines-flags').textContent = String(MINES - flagCount).padStart(3, '0');
      container.querySelector('#mines-timer').textContent = String(timer).padStart(3, '0');
      const boardEl = container.querySelector('.mines-board');
      boardEl.innerHTML = '';
      for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
        const cell = document.createElement('div'); cell.className = 'mines-cell';
        if (revealed[r][c]) {
          cell.classList.add('revealed');
          if (board[r][c] === -1) cell.classList.add('mine'), cell.textContent = '[M]';
          else if (board[r][c] > 0) { cell.textContent = board[r][c]; cell.dataset.n = board[r][c]; }
        } else if (flagged[r][c]) { cell.classList.add('flagged'); cell.textContent = '[F]'; }
        cell.addEventListener('click', () => {
          if (gameOver || revealed[r][c] || flagged[r][c]) return;
          if (firstClick) { firstClick = false; placeMines(r, c); timerInterval = setInterval(() => { timer++; draw(); }, 1000); }
          if (board[r][c] === -1) {
            reveal(r, c); gameOver = true; clearInterval(timerInterval);
            for (let i = 0; i < ROWS; i++) for (let j = 0; j < COLS; j++) if (board[i][j] === -1) revealed[i][j] = true;
            draw(); container.querySelector('.mines-msg').textContent = '!! ¡Boom!'; container.querySelector('.mines-msg').className = 'mines-msg lose'; return;
          }
          reveal(r, c);
          const safe = revealed.flat().filter(Boolean).length;
          if (safe === ROWS * COLS - MINES) { gameOver = true; clearInterval(timerInterval); container.querySelector('.mines-msg').textContent = '** ¡Ganaste!'; container.querySelector('.mines-msg').className = 'mines-msg win'; }
          draw();
        });
        cell.addEventListener('contextmenu', e => { e.preventDefault(); if (gameOver || revealed[r][c]) return; flagged[r][c] = !flagged[r][c]; draw(); });
        boardEl.appendChild(cell);
      }
    };
    container.innerHTML = `<div class="mines-app"><div class="mines-header"><div class="mines-stat" id="mines-flags">010</div><button class="mines-reset" id="mines-reset">Nueva</button><div class="mines-stat" id="mines-timer">000</div></div><div class="mines-board"></div><div class="mines-msg"></div></div>`;
    container.querySelector('#mines-reset').addEventListener('click', () => { init(); draw(); });
    init(); draw();
  }
};
