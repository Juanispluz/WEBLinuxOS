const CalculatorApp = {
  val: '0', expr: '',
  render(container) {
    this.val = '0'; this.expr = '';
    container.innerHTML = `<div class="calc-app"><div class="calc-display"><div class="calc-expr" id="calc-expr"></div><div class="calc-val" id="calc-val">0</div></div><div class="calc-grid"><button class="calc-btn clr" data-v="C">C</button><button class="calc-btn op" data-v="/">/</button><button class="calc-btn op" data-v="*">x</button><button class="calc-btn clr" data-v="back"><=</button><button class="calc-btn" data-v="7">7</button><button class="calc-btn" data-v="8">8</button><button class="calc-btn" data-v="9">9</button><button class="calc-btn op" data-v="-">-</button><button class="calc-btn" data-v="4">4</button><button class="calc-btn" data-v="5">5</button><button class="calc-btn" data-v="6">6</button><button class="calc-btn op" data-v="+">+</button><button class="calc-btn" data-v="1">1</button><button class="calc-btn" data-v="2">2</button><button class="calc-btn" data-v="3">3</button><button class="calc-btn eq" data-v="=" style="grid-row:span 2">=</button><button class="calc-btn wide" data-v="0">0</button><button class="calc-btn" data-v=".">.</button></div></div>`;
    const valEl = container.querySelector('#calc-val'), exprEl = container.querySelector('#calc-expr');
    container.querySelectorAll('.calc-btn').forEach(btn => btn.addEventListener('click', () => {
      const v = btn.dataset.v;
      if (v === 'C') { this.val = '0'; this.expr = ''; }
      else if (v === 'back') { this.val = this.val.length > 1 ? this.val.slice(0, -1) : '0'; }
      else if (v === '=') { try { exprEl.textContent = this.val; this.val = String(eval(this.val)); } catch { this.val = 'Error'; } }
      else { this.val = this.val === '0' && !'+-*/'.includes(v) ? v : this.val + v; }
      valEl.textContent = this.val;
    }));
  }
};
