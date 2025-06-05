(() => {
  const canvas = document.createElement('canvas');
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
  const ctx = canvas.getContext('2d');
  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
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
  let last = 0;
  let scrollFactor = 1;

  function onMove(e) {
    const vx = e.movementX;
    const vy = e.movementY;
    particles.push(new Particle(e.clientX, e.clientY, vx, vy));
    if (particles.length > 600) particles.shift();
  }

  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener(
    'scroll',
    () => {
      scrollFactor = 2;
    },
    { passive: true },
  );

  ctx.strokeStyle = 'rgba(255,255,255,0.8)';
  ctx.lineCap = 'round';

  function loop(time) {
    const dt = (time - last) / 16.7;
    last = time;
    ctx.clearRect(0, 0, w, h);
    scrollFactor += (1 - scrollFactor) * 0.1;
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
