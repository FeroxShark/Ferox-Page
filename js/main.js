document.addEventListener('DOMContentLoaded', () => {
  import('./app.js');
// Cargamos el efecto solo en dispositivos táctiles / pointer “coarse”.
const isTouchDevice =
  ('ontouchstart' in window) ||
  navigator.maxTouchPoints > 0 ||
  window.matchMedia('(hover: none) and (pointer: coarse)').matches;

if (isTouchDevice) {
  import('./air-trail.js');
}

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
});
