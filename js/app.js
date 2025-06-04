const { useState, useEffect } = React;
const { HashRouter, Routes, Route, Link } = ReactRouterDOM;

function useConfig() {
  const [config, setConfig] = useState(null);
  useEffect(() => {
    fetch('data/config.json')
      .then(r => r.json())
      .then(setConfig)
      .catch(err => console.error('Failed to load config', err));
  }, []);
  return config;
}

function BackgroundSlideshow({ images = [] }) {
  useEffect(() => {
    if (!images.length) return;
    const slideshowEl = document.getElementById('bgSlideshow');
    let currentIndex = 0;
    slideshowEl.style.backgroundImage = `url('${images[0]}')`;
    if (images.length === 1) return;
    const change = () => {
      const img = new Image();
      const url = images[currentIndex];
      img.onload = () => {
        slideshowEl.classList.add('fade-out');
        setTimeout(() => {
          slideshowEl.style.backgroundImage = `url('${url}')`;
          slideshowEl.classList.remove('fade-out');
        }, 1000);
      };
      img.src = url;
      currentIndex = (currentIndex + 1) % images.length;
    };
    const interval = setInterval(change, 7000);
    return () => clearInterval(interval);
  }, [images]);
  return null;
}

function Home({ config }) {
  return React.createElement(React.Fragment, null,
    React.createElement('section', { id: 'hero', className: 'min-h-screen flex flex-col items-center justify-center relative' },
      React.createElement('div', { className: 'flex flex-col md:flex-row items-center justify-center md:justify-start w-full max-w-6xl' },
        React.createElement('img', { id: 'profileImage', src: config.profileImageUrl, alt: 'Profile Picture', className: 'w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-lg mb-10 md:mb-0 md:mr-14 border-4 border-red-600 shadow-xl object-cover' }),
        React.createElement('div', { className: 'text-center md:text-left' },
          React.createElement('h1', { id: 'welcomeMessage', className: 'text-7xl sm:text-8xl md:text-9xl font-bold mb-5 text-red-600' }, config.welcomeMessageText),
          React.createElement('div', { id: 'socialLinks', className: 'flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-5 mb-14' },
            config.socialMediaLinks.map(link =>
              React.createElement('a', { key: link.url, href: link.url, target: '_blank', rel: 'noopener noreferrer', className: 'text-slate-300 hover:text-pink-400 transition-colors duration-300 text-5xl', 'aria-label': link.name, title: link.name },
                React.createElement('i', { className: link.iconClass })
              )
            )
          )
        )
      ),
      React.createElement('div', { id: 'scrollHeroToAbout', className: 'scroll-arrow text-3xl text-red-500 absolute bottom-10 left-1/2 transform -translate-x-1/2' },
        React.createElement('a', { href: '#about', 'aria-label': 'Scroll to About Me section' },
          React.createElement('i', { className: 'fas fa-chevron-down' })
        )
      )
    ),
    React.createElement('section', { id: 'about', className: 'py-16 md:py-24 my-12 relative' },
      React.createElement('div', { className: 'max-w-4xl mx-auto px-6 text-center' },
        React.createElement('h2', { id: 'aboutTitle', className: 'text-4xl md:text-5xl font-bold mb-8 text-red-500' }, config.aboutSectionTitle),
        React.createElement('div', { id: 'aboutContent', className: 'text-xl md:text-2xl text-slate-300 space-y-5' },
          config.aboutMeContent.map((p, idx) =>
            React.createElement('p', { key: idx, dangerouslySetInnerHTML: { __html: p } })
          )
        )
      ),
      React.createElement('div', { id: 'scrollAboutToGallery', className: 'scroll-arrow text-3xl text-red-500 absolute bottom-[-2rem] sm:bottom-[-3rem] left-1/2 transform -translate-x-1/2 mt-8' },
        React.createElement(Link, { to: '/gallery', 'aria-label': 'Go to Gallery page' },
          React.createElement('i', { className: 'fas fa-chevron-down' })
        )
      )
    )
  );
}

function Gallery({ config }) {
  return React.createElement('section', { className: 'py-16 md:py-24 mt-20' },
    React.createElement('h2', { className: 'text-3xl md:text-4xl font-bold text-center mb-12 text-red-500' }, 'Gallery'),
    React.createElement('div', { id: 'galleryImages', className: 'mx-auto' },
      config.galleryItems.map((item, idx) =>
        React.createElement('div', { key: idx, className: 'gallery-card bg-slate-800 rounded-lg overflow-hidden shadow-lg' },
          React.createElement('img', { src: item.imageUrl, alt: item.description || 'Gallery Image', className: 'w-full h-auto block' })
        )
      )
    )
  );
}

function Contact() {
  return React.createElement('div', { className: 'py-16 text-center' },
    React.createElement('h2', { className: 'text-3xl font-bold text-red-500 mb-4' }, 'Contact'),
    React.createElement('p', null, 'Coming soon...')
  );
}

function Blog() {
  return React.createElement('div', { className: 'py-16 text-center' },
    React.createElement('h2', { className: 'text-3xl font-bold text-red-500 mb-4' }, 'Blog'),
    React.createElement('p', null, 'Blog posts will appear here.')
  );
}

function Navigation() {
  return React.createElement('nav', { className: 'py-4 mb-8 text-center space-x-4' },
    React.createElement(Link, { to: '/' }, 'Home'),
    React.createElement(Link, { to: '/gallery' }, 'Gallery'),
    React.createElement(Link, { to: '/contact' }, 'Contact'),
    React.createElement(Link, { to: '/blog' }, 'Blog')
  );
}

function Footer({ config }) {
  return React.createElement('footer', { className: 'text-center py-10 mt-12 border-t border-slate-700' },
    React.createElement('p', { id: 'footerText', className: 'text-slate-400' },
      '\u00A9 ',
      React.createElement('span', { id: 'currentYear' }, new Date().getFullYear()),
      ' ', config.footerInfo.text
    ),
    React.createElement('p', { className: 'text-slate-500 text-sm mt-2' }, 'Last updated: ',
      React.createElement('span', { id: 'lastUpdated' }, config.footerInfo.lastUpdateDate)
    )
  );
}

function App() {
  const config = useConfig();
  const [showToTop, setShowToTop] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowToTop(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const openModal = msg => { setModalMessage(msg); setModalOpen(true); };
  const closeModal = () => setModalOpen(false);
  window.showModal = openModal;

  if (!config) {
    return React.createElement('p', null, 'Loading...');
  }

  return React.createElement(HashRouter, null,
    React.createElement(BackgroundSlideshow, { images: config.backgroundImages }),
    React.createElement(Navigation, null),
    React.createElement(Routes, null,
      React.createElement(Route, { path: '/', element: React.createElement(Home, { config }) }),
      React.createElement(Route, { path: '/gallery', element: React.createElement(Gallery, { config }) }),
      React.createElement(Route, { path: '/contact', element: React.createElement(Contact) }),
      React.createElement(Route, { path: '/blog', element: React.createElement(Blog) })
    ),
    React.createElement(Footer, { config }),
    showToTop && React.createElement('button', { onClick: scrollToTop, id: 'scrollToTopBtn', title: 'Go to top' },
      React.createElement('i', { className: 'fas fa-arrow-up' })
    ),
    modalOpen && React.createElement('div', { id: 'messageModal', className: 'modal', onClick: e => { if (e.target.id === 'messageModal') closeModal(); } },
      React.createElement('div', { className: 'modal-content' },
        React.createElement('span', { className: 'modal-close-button', onClick: closeModal }, '\u00D7'),
        React.createElement('p', { id: 'modalMessageText', dangerouslySetInnerHTML: { __html: modalMessage } })
      )
    )
  );
}

ReactDOM.render(React.createElement(App), document.getElementById('root'));

function initializeFooterYear() {
  // The footer year is inserted directly in the React component using
  // new Date().getFullYear(), so this function currently does nothing.
}

initializeFooterYear();
