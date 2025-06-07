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
  ctx.lineCap = 'round';
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(255, 0, 255, 0.8)';

  let lastX;
  let lastY;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize, { passive: true });
  resize();

  function drawLine(x, y) {
    if (lastX === undefined) {
      lastX = x;
      lastY = y;
      return;
    }
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    lastX = x;
    lastY = y;
  }

  window.addEventListener(
    'pointermove',
    (e) => drawLine(e.clientX, e.clientY),
    { passive: true },
  );
  window.addEventListener(
    'touchmove',
    (e) => {
      const t = e.touches[0];
      if (t) drawLine(t.clientX, t.clientY);
    },
    { passive: true },
  );

  function fade() {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'source-over';
    requestAnimationFrame(fade);
  }
  requestAnimationFrame(fade);
}
