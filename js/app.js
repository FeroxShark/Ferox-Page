const { useState, useEffect, createContext } = React;

const ThemeContext = createContext();

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error', error, info);
  }
  render() {
    if (this.state.hasError) {
      return React.createElement('p', null, 'Something went wrong.');
    }
    return this.props.children;
  }
}

const SCROLL_OFFSET_SHOW_TO_TOP = 100;
const FALLBACK_IMAGE = 'img/profile.jpg';

const userConfig = {
  profileImageUrl: 'img/profile.jpg',
  welcomeMessageText: 'Ferox',
  socialMediaLinks: [
    {
      icon: 'icons/twitter.svg',
      url: 'https://x.com/Ferox_Shark',
      name: 'Twitter',
    },
    {
      icon: 'icons/instagram.svg',
      url: 'https://www.instagram.com/feroxshark/',
      name: 'Instagram',
    },
    {
      icon: 'icons/steam.svg',
      url: 'https://steamcommunity.com/id/feroxshark/',
      name: 'Steam',
    },
    {
      icon: 'icons/discord.svg',
      url: 'https://discord.com/invite/7uDqm4Khhm',
      name: 'Discord',
    },
    {
      icon: 'icons/telegram.svg',
      url: 'https://t.me/feroxshark',
      name: 'Telegram',
    },
    {
      icon: 'icons/vr-cardboard.svg',
      url: 'https://vrchat.com/home/user/usr_b51db741-9cef-4095-b436-4367176fc4bb',
      name: 'VRChat',
    },
    {
      icon: 'icons/twitch.svg',
      url: 'https://www.twitch.tv/ferox_uwu',
      name: 'Twitch',
    },
    {
      icon: 'icons/paw.svg',
      url: 'https://www.furaffinity.net/user/feroxshark',
      name: 'Fur Affinity',
    },
    {
      icon: 'icons/tiktok.svg',
      url: 'https://www.tiktok.com/@feroxshark',
      name: 'TikTok',
    },
    {
      icon: 'icons/github.svg',
      url: 'https://github.com/FeroxShark',
      name: 'GitHub',
    },
  ],
  aboutSectionTitle: 'Hewo! My name is Ferox',
  aboutMeContent: [
    "I'm a 19-year-old furry from Argentina 🇦🇷",
    'Addicted to White Monster',
    '<br>',
    '<strong>About me:</strong>',
    'I am currently studying Software Engineering at Siglo 21 University and making some investments as a hobby.',
    'I also play VRChat from time to time, feel free to add me if you want.',
  ],
  galleryItems: [
    {
      imageUrl: 'img/gallery/artwork1.jpg',
      description: 'Artwork 1 description (optional)',
    },
    {
      imageUrl: 'img/gallery/artwork2.jpg',
      description: 'Artwork 2 description',
    },
    { imageUrl: 'img/gallery/artwork3.jpg', description: 'Artwork 3' },
    {
      imageUrl: 'img/gallery/artwork4.jpg',
      description:
        'One more artwork with a slightly longer description to test text flow.',
    },
    { imageUrl: 'img/gallery/artwork5.jpg', description: 'Artwork 5' },
    { imageUrl: 'img/gallery/artwork6.jpg', description: 'Artwork 6' },
  ],
  backgroundImages: [
    'img/backgrounds/bg1.jpg',
    'img/backgrounds/bg2.jpg',
    'img/backgrounds/bg3.jpg',
    'img/backgrounds/bg4.jpg',
    'img/backgrounds/bg5.jpg',
  ],
  footerInfo: {
    text: 'Ferox. All rights reserved.',
    lastUpdateDate: 'June 3, 2025',
  },
};

function App() {
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  const [showToTop, setShowToTop] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const slideshowEl = document.getElementById('bgSlideshow');
    const images = userConfig.backgroundImages || [];
    if (images.length > 0) {
      slideshowEl.style.backgroundImage = `url('${images[0]}')`;
    }
  }, []);

  useEffect(() => {
    const handleScroll = () =>
      setShowToTop(window.scrollY > SCROLL_OFFSET_SHOW_TO_TOP);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    if (modalOpen) {
      document.addEventListener('keydown', handleKey);
    }
    return () => document.removeEventListener('keydown', handleKey);
  }, [modalOpen]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const openModal = (message) => {
    setModalMessage(DOMPurify.sanitize(message));
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);
  window.showModal = openModal;

  return React.createElement(
    ThemeContext.Provider,
    { value: { theme, toggleTheme } },
    React.createElement(
      React.Fragment,
      null,
      React.createElement(
        'section',
        {
          id: 'hero',
          className:
            'min-h-screen flex flex-col items-center justify-center relative',
        },
        React.createElement(
          'div',
          {
            className:
              'flex flex-col md:flex-row items-center justify-center md:justify-start w-full max-w-6xl',
          },
          React.createElement('img', {
            id: 'profileImage',
            src: userConfig.profileImageUrl,
            alt: 'Profile Picture',
            className:
              'w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-lg mb-10 md:mb-0 md:mr-14 border-4 border-red-600 shadow-xl object-cover',
            onError: (e) => {
              e.target.src = FALLBACK_IMAGE;
              openModal('Image failed to load.');
            },
          }),
          React.createElement(
            'div',
            { className: 'text-center md:text-left' },
            React.createElement(
              'h1',
              {
                id: 'welcomeMessage',
                className:
                  'text-7xl sm:text-8xl md:text-9xl font-bold mb-5 text-red-600',
              },
              userConfig.welcomeMessageText,
            ),
            React.createElement(
              'div',
              {
                id: 'socialLinks',
                className:
                  'flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-5 mb-14',
              },
              userConfig.socialMediaLinks.map((link) =>
                React.createElement(
                  'a',
                  {
                    key: link.url,
                    href: link.url,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    className:
                      'transition-transform duration-300 hover:scale-110',
                    'aria-label': link.name,
                    title: link.name,
                  },
                  React.createElement('img', {
                    src: link.icon,
                    alt: '',
                    className: 'w-8 h-8',
                    loading: 'lazy',
                  }),
                ),
              ),
              React.createElement(
                'button',
                {
                  onClick: toggleTheme,
                  className: 'mt-4 px-4 py-2 bg-slate-700 text-white rounded',
                },
                theme === 'dark' ? 'Light Mode' : 'Dark Mode',
              ),
            ),
          ),
        ),
        React.createElement(
          'div',
          {
            id: 'scrollHeroToAbout',
            className:
              'scroll-arrow text-3xl text-red-500 absolute bottom-10 left-1/2 transform -translate-x-1/2',
          },
          React.createElement(
            'a',
            { href: '#about', 'aria-label': 'Scroll to About Me section' },
            React.createElement('i', { className: 'fas fa-chevron-down' }),
          ),
        ),
      ),
      React.createElement(
        'section',
        { id: 'about', className: 'py-16 md:py-24 my-12 relative' },
        React.createElement(
          'div',
          { className: 'max-w-4xl mx-auto px-6 text-center' },
          React.createElement(
            'h2',
            {
              id: 'aboutTitle',
              className: 'text-4xl md:text-5xl font-bold mb-8 text-red-500',
            },
            userConfig.aboutSectionTitle,
          ),
          React.createElement(
            'div',
            {
              id: 'aboutContent',
              className: 'text-xl md:text-2xl text-slate-300 space-y-5',
            },
            userConfig.aboutMeContent.map((p, idx) =>
              React.createElement('p', {
                key: idx,
                dangerouslySetInnerHTML: { __html: DOMPurify.sanitize(p) },
              }),
            ),
          ),
        ),
        React.createElement(
          'div',
          {
            id: 'scrollAboutToGallery',
            className:
              'scroll-arrow text-3xl text-red-500 absolute bottom-[-2rem] sm:bottom-[-3rem] left-1/2 transform -translate-x-1/2 mt-8',
          },
          React.createElement(
            'a',
            { href: '#gallery', 'aria-label': 'Scroll to Gallery section' },
            React.createElement('i', { className: 'fas fa-chevron-down' }),
          ),
        ),
      ),
      React.createElement(
        'section',
        { id: 'gallery', className: 'py-16 md:py-24 mt-20' },
        React.createElement(
          'h2',
          {
            className:
              'text-3xl md:text-4xl font-bold text-center mb-12 text-red-500',
          },
          'Gallery',
        ),
        React.createElement(
          'div',
          { id: 'galleryImages', className: 'mx-auto' },
          userConfig.galleryItems.map((item, idx) =>
            React.createElement(
              'div',
              {
                key: idx,
                className:
                  'gallery-card bg-slate-800 rounded-lg overflow-hidden shadow-lg',
              },
              React.createElement('img', {
                src: item.imageUrl,
                alt: item.description || 'Gallery Image',
                className: 'w-full h-auto block',
                loading: 'lazy',
                onError: (e) => {
                  e.target.src = FALLBACK_IMAGE;
                  openModal('Image failed to load.');
                },
              }),
            ),
          ),
        ),
      ),
      React.createElement(
        'footer',
        { className: 'text-center py-10 mt-12 border-t border-slate-700' },
        React.createElement(
          'p',
          { id: 'footerText', className: 'text-slate-400' },
          '\u00A9 ',
          React.createElement(
            'span',
            { id: 'currentYear' },
            new Date().getFullYear(),
          ),
          ' ',
          userConfig.footerInfo.text,
        ),
        React.createElement(
          'p',
          { className: 'text-slate-500 text-sm mt-2' },
          'Last updated: ',
          React.createElement(
            'span',
            { id: 'lastUpdated' },
            userConfig.footerInfo.lastUpdateDate,
          ),
        ),
      ),
      showToTop &&
        React.createElement(
          'button',
          { onClick: scrollToTop, id: 'scrollToTopBtn', title: 'Go to top' },
          React.createElement('i', { className: 'fas fa-arrow-up' }),
        ),
      modalOpen &&
        React.createElement(
          'div',
          {
            id: 'messageModal',
            className: 'modal',
            role: 'dialog',
            'aria-modal': 'true',
            onClick: (e) => {
              if (e.target.id === 'messageModal') closeModal();
            },
          },
          React.createElement(
            'div',
            { className: 'modal-content' },
            React.createElement(
              'span',
              { className: 'modal-close-button', onClick: closeModal },
              '\u00D7',
            ),
            React.createElement('p', {
              id: 'modalMessageText',
              dangerouslySetInnerHTML: { __html: modalMessage },
            }),
          ),
        ),
    ),
  );
}

const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(
  React.createElement(ErrorBoundary, null, React.createElement(App)),
);
