import React, { useState, useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import Modal from './components/Modal';
import Lightbox from './components/Lightbox';
import CONFIG from './data/config.json';

const SCROLL_OFFSET_SHOW_TO_TOP = 100;

function App() {
    const [userConfig] = useState(CONFIG);

    useEffect(() => {
        document.body.classList.add('dark');
    }, []);

    const [showToTop, setShowToTop] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(null);

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

            {/* Fixed Background Image */}
            <div
                className="fixed inset-0 w-full h-full z-0"
                style={{
                    backgroundImage: `url(${userConfig.backgroundImages[0]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            />

            <div id="main-wrapper" className="min-h-screen flex items-center justify-center p-4 relative z-10">
                <div className="main-glass-container relative z-10">
                    <Hero userConfig={userConfig} openModal={openModal} />
                    <About userConfig={userConfig} />
                    <Gallery
                        userConfig={userConfig}
                        openLightbox={openLightbox}
                        openModal={openModal}
                    />
                    <Footer userConfig={userConfig} />
                </div>

                <div
                    id="scrollGalleryToTop"
                    className="scroll-arrow text-3xl text-slate-400 hover:text-[hsl(var(--primary))] transition-colors mt-8 text-center"
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
