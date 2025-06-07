document.addEventListener('DOMContentLoaded', () => {
  import('./app.js');
  import('./airtrail.js').then((m) => m.initAirTrail());

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

  // AirTrail effect handles pointer events internally
});
