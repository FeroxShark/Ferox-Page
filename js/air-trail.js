(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches) {
    return;
  }

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

  const supportsPointer = !!window.PointerEvent;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const baseColor = 'rgba(255,255,255,0.8)';
  const baseWidth = 2;
  const maxParticles =
    navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4
      ? 300
      : 600;
  let w, h;

  function resize() {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    w = canvas.width / dpr;
    h = canvas.height / dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  class Particle {
    constructor(x, y, vx, vy, life = 1, width = baseWidth, color = baseColor) {
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.life = life;
      this.width = width;
      this.color = color;
    }
    update(dt, decay) {
      this.x += this.vx * dt;
      this.y += this.vy * dt;
      this.life -= decay * dt;
      return this.life > 0;
    }
    draw() {
      ctx.globalAlpha = this.life;
      ctx.strokeStyle = this.color;
      ctx.lineWidth = this.width * dpr;
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

  function getCoords(event) {
    if (event.touches && event.touches[0]) {
      return [event.touches[0].clientX, event.touches[0].clientY];
    }
    return [event.clientX, event.clientY];
  }

  function onMove(e) {
    const [x, y] = getCoords(e);
    if (lastX === undefined) {
      lastX = x;
      lastY = y;
    }

    const vx = x - lastX;
    const vy = y - lastY;
    const speed = Math.hypot(vx, vy);
    const width = baseWidth + Math.min(5, speed / 10);
    const hue = (200 + speed * 15) % 360;
    const color = `hsla(${hue},100%,70%,0.8)`;
    const pointerType = e.pointerType || (e.touches ? 'touch' : 'mouse');
    const life = pointerType === 'touch' ? 1.5 : 1;
    particles.push(new Particle(x, y, vx, vy, life, width, color));
    if (particles.length > maxParticles) particles.shift();

    lastX = x;
    lastY = y;
  }

  function resetPointer() {
    lastX = undefined;
    lastY = undefined;
  }

  const startTracking = (e) => {
    [lastX, lastY] = getCoords(e);
  };

  if (supportsPointer) {
    window.addEventListener('pointerdown', startTracking, { passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerup', resetPointer, { passive: true });
    window.addEventListener('pointercancel', resetPointer, { passive: true });
    window.addEventListener('pointerleave', resetPointer, { passive: true });
  } else {
    window.addEventListener('touchstart', startTracking, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', resetPointer, { passive: true });
    window.addEventListener('touchcancel', resetPointer, { passive: true });
    window.addEventListener('mouseleave', resetPointer, { passive: true });
  }

  window.addEventListener(
    'scroll',
    () => {
      scrollFactor = 2;
      lastScroll = performance.now();
    },
    { passive: true },
  );

  ctx.strokeStyle = baseColor;
  ctx.lineWidth = baseWidth * dpr;
  ctx.lineCap = 'round';
  ctx.filter = 'blur(1px)';

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
