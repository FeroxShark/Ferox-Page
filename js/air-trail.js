(() => {
  let canvas = document.getElementById('airTrail');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'airTrail';
    Object.assign(canvas.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 2,
    });
    document.body.appendChild(canvas);
  }

  if (!window.PointerEvent) return;

  const ctx  = canvas.getContext('2d');
  const dpr  = window.devicePixelRatio || 1;
  let   w, h;

  function resize() {
    canvas.width  = window.innerWidth  * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width  = '100%';
    canvas.style.height = '100%';
    w = canvas.width  / dpr;
    h = canvas.height / dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  class Particle {
    constructor(x, y, vx, vy) {
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.life = 1;
    }
    update(dt, decay) {
      this.x += this.vx * dt;
      this.y += this.vy * dt;
      this.life -= decay * dt;
      return this.life > 0;
    }
    draw() {
      ctx.globalAlpha = this.life;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x - this.vx * 2, this.y - this.vy * 2);
      ctx.stroke();
    }
  }

  let particles = [];
  let last = performance.now();
  let scrollFactor = 1;
  let lastX;
  let lastY;
  let lastScroll = 0;

  function onMove(e) {
    if (lastX === undefined) {
      lastX = e.clientX;
      lastY = e.clientY;
    }

    const vx = e.clientX - lastX;
    const vy = e.clientY - lastY;
    particles.push(new Particle(e.clientX, e.clientY, vx, vy));
    if (particles.length > 600) particles.shift();

    lastX = e.clientX;
    lastY = e.clientY;
  }

  function resetPointer() {
    lastX = undefined;
    lastY = undefined;
  }

  window.addEventListener(
    'pointerdown',
    (e) => {
      lastX = e.clientX;
      lastY = e.clientY;
    },
    { passive: true }
  );
  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerup', resetPointer, { passive: true });
  window.addEventListener('pointercancel', resetPointer, { passive: true });

  window.addEventListener(
    'scroll',
    () => {
      scrollFactor = 2;
      lastScroll = performance.now();
    },
    { passive: true }
  );

  ctx.strokeStyle = 'rgba(255,255,255,0.8)';
  ctx.lineWidth = 2 * dpr;
  ctx.lineCap = 'round';

  function loop(time) {
    const dt = (time - last) / 16.7;
    last = time;

    ctx.clearRect(0, 0, w, h);
    if (document.visibilityState === 'hidden') {
      requestAnimationFrame(loop);
      return;
    }

    const elapsed = time - lastScroll;
    scrollFactor = 1 + Math.max(0, 1.5 - elapsed / 200);
    const decay = 0.05 * scrollFactor;

    particles = particles.filter((p) => {
      if (p.update(dt, decay)) {
        p.draw();
        return true;
      }
      return false;
    });

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
})();
