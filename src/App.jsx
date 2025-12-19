import React, { useState, useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import Modal from './components/Modal';
import Lightbox from './components/Lightbox';

const SCROLL_OFFSET_SHOW_TO_TOP = 100;

const DEFAULT_CONFIG = {
    profileImageUrl: 'img/profile.jpg',
    welcomeMessageText: 'Ferox',
    socialMediaLinks: [],
    aboutSectionTitle: 'Hewo! My name is Ferox',
    aboutMeContent: [],
    galleryItems: [],
    backgroundImages: [],
    footerInfo: {
        text: 'Ferox. All rights reserved.',
        lastUpdateDate: 'June 3, 2025',
    },
};

function App() {
    const [userConfig, setUserConfig] = useState(DEFAULT_CONFIG);

    useEffect(() => {
        document.body.classList.add('dark');
        fetch('data/config.json')
            .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
            .then(setUserConfig)
            .catch((err) => console.error('Failed to load config.json', err));
    }, []);

    const [showToTop, setShowToTop] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(null);

    useEffect(() => {
        const el = document.getElementById('bgSlideshow');
        const images = userConfig.backgroundImages || [];
        if (images.length === 0) return;

        let idx = 0;
        el.style.backgroundImage = `url('${images[idx]}')`;

        const interval = setInterval(() => {
            idx = (idx + 1) % images.length;
            const nextImg = new Image();
            nextImg.src = images[idx];
            nextImg.onload = () => {
                el.style.backgroundImage = `url('${images[idx]}')`;
            };
        }, 8000);

        return () => clearInterval(interval);
    }, [userConfig.backgroundImages]);

    useEffect(() => {
        const handleScroll = () =>
            setShowToTop(window.scrollY > SCROLL_OFFSET_SHOW_TO_TOP);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const openModal = (message) => {
        setModalMessage(DOMPurify.sanitize(message));
        setModalOpen(true);
    };
    const closeModal = () => setModalOpen(false);

    const openLightbox = (idx) => {
        const src = userConfig.galleryItems[idx].imageUrl;
        const img = new Image();
        img.onload = () => setLightboxIndex(idx);
        img.src = src;
    };
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

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') {
                if (lightboxIndex !== null) closeLightbox();
                else closeModal();
            }
        };
        if (modalOpen || lightboxIndex !== null) {
            document.addEventListener('keydown', handleKey);
        }
        return () => document.removeEventListener('keydown', handleKey);
    }, [modalOpen, lightboxIndex]);

    return (
        <>
            <div id="bgSlideshow"></div>
            <div className="overlay"></div>
            <div id="root" className="content-container container mx-auto px-4 py-8">
                <Hero userConfig={userConfig} openModal={openModal} />
                <About userConfig={userConfig} />
                <Gallery
                    userConfig={userConfig}
                    openLightbox={openLightbox}
                    openModal={openModal}
                />
                <Footer userConfig={userConfig} />

                <div
                    id="scrollGalleryToTop"
                    className="scroll-arrow text-3xl text-red-500 mt-8 text-center"
                >
                    <a href="#hero" aria-label="Back to top">
                        <i className="fas fa-chevron-up"></i>
                    </a>
                </div>

                {showToTop && (
                    <button
                        onClick={scrollToTop}
                        id="scrollToTopBtn"
                        title="Go to top"
                        style={{ display: 'block' }}
                    >
                        <i className="fas fa-arrow-up"></i>
                    </button>
                )}
            </div>

            <Lightbox
                index={lightboxIndex}
                userConfig={userConfig}
                onClose={closeLightbox}
                showPrev={showPrev}
                showNext={showNext}
            />

            <Modal isOpen={modalOpen} message={modalMessage} onClose={closeModal} />
        </>
    );
}

export default App;
