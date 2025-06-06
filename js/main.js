document.addEventListener('DOMContentLoaded', () => {
  import('./app.js');

  const bg = document.getElementById('bgSlideshow');
  const hero = document.getElementById('hero');
  const preloadSrc = 'https://placehold.co/1920x1080.webp';

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      bg.style.backgroundImage = `url('${preloadSrc}')`;
      observer.disconnect();
    }
  });
  if (hero) {
    observer.observe(hero);
  }

  const createTrail = (x, y) => {
    const dot = document.createElement('div');
    dot.className = 'cursor-trail';
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    document.body.appendChild(dot);
    requestAnimationFrame(() => {
      dot.classList.add('fade-out');
    });
    dot.addEventListener('transitionend', () => dot.remove());
  };

  document.addEventListener('mousemove', (e) => {
    createTrail(e.clientX, e.clientY);
  });

  document.addEventListener(
    'touchmove',
    (e) => {
      const touch = e.touches[0];
      if (touch) createTrail(touch.clientX, touch.clientY);
    },
    { passive: true },
  );
});
