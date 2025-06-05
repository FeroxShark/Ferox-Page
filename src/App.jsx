import { useEffect, useState } from 'react';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Gallery from './components/Gallery.jsx';
import Footer from './components/Footer.jsx';
import Lightbox from './components/Lightbox.jsx';
import MessageModal from './components/MessageModal.jsx';
import ContrastToggle from './components/ContrastToggle.jsx';

const SCROLL_OFFSET_SHOW_TO_TOP = 100;
const DEFAULT_CONFIG = {
  profileImageUrl: 'img/profile.jpg',
  welcomeMessageText: 'Ferox',
  socialMediaLinks: [
    {
      icon: 'icons/twitter.svg',
      url: 'https://x.com/Ferox_Shark',
      name: 'Twitter',
    },
  ],
  aboutSectionTitle: 'Hewo! My name is Ferox',
  aboutMeContent: ['Cya! :3'],
  galleryItems: [],
  backgroundImages: [],
  footerInfo: {
    text: 'Ferox. All rights reserved.',
    lastUpdateDate: 'June 3, 2025',
  },
};

export default function App() {
  const [userConfig, setUserConfig] = useState(DEFAULT_CONFIG);
  const [showToTop, setShowToTop] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [contrast, setContrast] = useState(false);

  useEffect(() => {
    document.body.classList.add('dark');
    fetch('data/config.json')
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then(setUserConfig)
      .catch((err) => console.error('Failed to load config.json', err));
  }, []);

  useEffect(() => {
    const handleScroll = () =>
      setShowToTop(window.scrollY > SCROLL_OFFSET_SHOW_TO_TOP);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (contrast) document.body.classList.add('high-contrast');
    else document.body.classList.remove('high-contrast');
  }, [contrast]);

  const openModal = (message) => setModalMessage(message);
  const closeModal = () => setModalMessage('');
  const openLightbox = (idx) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = () =>
    setLightboxIndex((i) =>
      i > 0 ? i - 1 : userConfig.galleryItems.length - 1,
    );
  const showNext = () =>
    setLightboxIndex((i) =>
      i < userConfig.galleryItems.length - 1 ? i + 1 : 0,
    );
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  window.showModal = openModal;

  return (
    <>
      <Hero config={userConfig} />
      <ContrastToggle
        enabled={contrast}
        onToggle={() => setContrast((c) => !c)}
      />
      <About config={userConfig} />
      <Gallery config={userConfig} openLightbox={openLightbox} />
      <Footer config={userConfig} />
      <div
        id="scrollGalleryToTop"
        className="scroll-arrow text-3xl text-red-500 mt-8 text-center"
      >
        <a href="#hero" aria-label="Back to top">
          <i className="fas fa-chevron-up"></i>
        </a>
      </div>
      {showToTop && (
        <button onClick={scrollToTop} id="scrollToTopBtn" title="Go to top">
          <i className="fas fa-arrow-up"></i>
        </button>
      )}
      <Lightbox
        config={userConfig}
        index={lightboxIndex}
        onClose={closeLightbox}
        showPrev={showPrev}
        showNext={showNext}
      />
      <MessageModal message={modalMessage} onClose={closeModal} />
    </>
  );
}
