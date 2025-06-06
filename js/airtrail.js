export function initAirTrail() {
  const canvas = document.createElement('canvas');
  canvas.id = 'airtrail-canvas';
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
  let particles = [];
  let lastX;
  let lastY;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function addParticle(x, y, dx, dy) {
    particles.push({ x, y, dx, dy, life: 1 });
  }

  function handleMove(x, y) {
    if (lastX === undefined) {
      lastX = x;
      lastY = y;
      return;
    }
    const vx = x - lastX;
    const vy = y - lastY;
    lastX = x;
    lastY = y;
    const speed = Math.hypot(vx, vy) * 0.1;
    const baseAngle = Math.atan2(vy, vx);
    for (let i = 0; i < 3; i++) {
      const angle = baseAngle + (Math.random() - 0.5) * 0.5;
      addParticle(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed);
    }
  }

  document.addEventListener('mousemove', (e) =>
    handleMove(e.clientX, e.clientY),
  );
  document.addEventListener(
    'touchmove',
    (e) => {
      const t = e.touches[0];
      if (t) handleMove(t.clientX, t.clientY);
    },
    { passive: true },
  );

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter((p) => p.life > 0);
    for (const p of particles) {
      p.x += p.dx;
      p.y += p.dy;
      p.dy += 0.05; // gravity effect
      p.life -= 0.02;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${p.life})`;
      ctx.fill();
    }
    requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
