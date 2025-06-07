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
  let lastX, lastY;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize, { passive: true });
  resize();

  function addParticle(x, y, dx, dy) {
    // Limita la cantidad para evitar lag
    if (particles.length > 200) particles.shift();
    particles.push({ x, y, dx, dy, life: 1, prevX: x, prevY: y });
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
    const speed = Math.hypot(vx, vy) * 0.2;
    const baseAngle = Math.atan2(vy, vx);
    for (let i = 0; i < 2; i++) {
      const angle = baseAngle + (Math.random() - 0.5) * 0.4;
      addParticle(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed);
    }
  }

  window.addEventListener(
    'pointermove',
    (e) => handleMove(e.clientX, e.clientY),
    { passive: true },
  );
  window.addEventListener(
    'touchmove',
    (e) => {
      const t = e.touches[0];
      if (t) handleMove(t.clientX, t.clientY);
    },
    { passive: true },
  );

  function update() {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'lighter';
    particles = particles.filter((p) => p.life > 0.02);
    for (const p of particles) {
      p.prevX = p.x;
      p.prevY = p.y;
      p.x += p.dx;
      p.y += p.dy;
      p.life -= 0.02;
      ctx.beginPath();
      ctx.moveTo(p.prevX, p.prevY);
      ctx.lineTo(p.x, p.y);
      ctx.strokeStyle = `rgba(255, 0, 255, ${p.life})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
