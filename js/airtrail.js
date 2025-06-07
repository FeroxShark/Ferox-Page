export function initAirTrail() {
  const canvas = document.createElement('canvas');
  canvas.id = 'airTrail';
  Object.assign(canvas.style, {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 9999,
  });
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  ctx.lineWidth = Math.max(1.5, 2 * window.devicePixelRatio);
  ctx.strokeStyle = 'rgba(255,255,255,0.8)';
  ctx.globalCompositeOperation = 'lighter';

  let particles = [];
  let lastX;
  let lastY;
  let lastScroll = 0;
  let lastFrame = performance.now();

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize, { passive: true });
  resize();

  class Particle {
    constructor(x, y, vx, vy) {
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.life = 1; // 1 → 0
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

  function addParticle(x, y, vx, vy) {
    if (particles.length > 600) particles.shift();
    particles.push(new Particle(x, y, vx, vy));
  }

  function handleMove(x, y) {
    if (lastX === undefined) {
      lastX = x;
      lastY = y;
      return;
    }
    const dx = x - lastX;
    const dy = y - lastY;
    lastX = x;
    lastY = y;
    const speed = Math.hypot(dx, dy);
    const baseAngle = Math.atan2(dy, dx);
    for (let i = 0; i < 3; i++) {
      const angle = baseAngle + (Math.random() - 0.5) * 0.4;
      const v = speed * 0.2 * (0.7 + Math.random() * 0.3);
      addParticle(x, y, Math.cos(angle) * v, Math.sin(angle) * v);
    }
  }

  window.addEventListener('pointermove', (e) => {
    handleMove(e.clientX, e.clientY);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    const t = e.touches[0];
    if (t) handleMove(t.clientX, t.clientY);
  }, { passive: true });

  window.addEventListener('scroll', () => {
    lastScroll = performance.now();
  }, { passive: true });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') particles = [];
  });

  function update() {
    const now = performance.now();
    const dt = (now - lastFrame) / 16.67; // scaled to ~60fps
    lastFrame = now;

    if (particles.length < 400) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    } else {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    const baseDecay = 0.05; // ~400ms at 60fps
    const scrollDecay = Math.max(0, 1 - (now - lastScroll) / 300);
    const decay = baseDecay * (1 + scrollDecay);

    particles = particles.filter((p) => {
      const alive = p.update(dt, decay);
      if (alive) p.draw();
      return alive;
    });

    if (document.visibilityState !== 'hidden') {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}
