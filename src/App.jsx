import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Setup from './components/Setup';
import Gallery from './components/Gallery';
import Favorites from './components/Favorites';
import Manifesto from './components/Manifesto';
import Footer from './components/Footer';
import Modal from './components/Modal';
import Lightbox from './components/Lightbox';
import CONFIG from './data/config.json';

const SCROLL_OFFSET_SHOW_TO_TOP = 200;

function App() {
    const [userConfig] = useState(CONFIG);
    const [showToTop, setShowToTop] = useState(false);
    const [hudVisible, setHudVisible] = useState(true);
    const [modalMessage, setModalMessage] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(null);

    useEffect(() => {
        const handleScroll = () =>
            setShowToTop(window.scrollY > SCROLL_OFFSET_SHOW_TO_TOP);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Hide the corner HUD once the footer scrolls into view so it doesn't
    // overlap the footer's own corner metadata.
    useEffect(() => {
        const footer = document.querySelector('footer');
        if (!footer) return;
        const observer = new IntersectionObserver(
            ([entry]) => setHudVisible(!entry.isIntersecting),
            { threshold: 0.01 },
        );
        observer.observe(footer);
        return () => observer.disconnect();
    }, []);

    const openModal = (message) => {
        setModalMessage(message);
        setModalOpen(true);
    };
    const closeModal = () => setModalOpen(false);

    const openLightbox = (idx) => {
        const src = userConfig.galleryItems[idx].imageUrl;
        const img = new Image();
        img.onload = () => setLightboxIndex(idx);
        // Open anyway on error so a broken file never swallows the click.
        img.onerror = () => setLightboxIndex(idx);
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
            {/* Skip to content for keyboard / screen-reader users */}
            <a href="#hero" className="skip-link">
                Skip to content
            </a>

            {/* Scanline overlay */}
            <div className="scanline" aria-hidden="true"></div>

            {/* Persistent HUD frame — corner metadata, mix-blend */}
            <div
                className={`fixed inset-0 pointer-events-none z-40 p-[5vw] flex-col justify-between mix-blend-difference text-sys-white font-mono text-[10px] uppercase tracking-widest hidden md:flex transition-opacity duration-300 ${hudVisible ? 'opacity-70' : 'opacity-0'}`}
                aria-hidden="true"
            >
                <div className="flex justify-between w-full">
                    <div>
                        SYS: FEROX.ARCHIVE
                        <br />
                        SYNC_RATE: <span className="text-sys-yellow">60HZ</span>
                    </div>
                    <div className="text-right">
                        V.1.0.0
                        <br />
                        FEED_STATUS: LIVE
                    </div>
                </div>
                <div className="flex justify-between w-full items-end">
                    <div>THREAD: MAIN_LOOP</div>
                    <div className="text-right">MEM: 99%</div>
                </div>
            </div>

            {/* Main content */}
            <main className="relative z-10">
                <Hero userConfig={userConfig} openModal={openModal} />
                <Setup userConfig={userConfig} />
                <Gallery userConfig={userConfig} openLightbox={openLightbox} />
                <Favorites userConfig={userConfig} />
                <Manifesto userConfig={userConfig} />
                <Footer userConfig={userConfig} />
            </main>

            {showToTop && (
                <button
                    onClick={scrollToTop}
                    id="scrollToTopBtn"
                    aria-label="Back to top"
                    title="Back to top"
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="square"
                        aria-hidden="true"
                    >
                        <path d="M12 19V5M5 12l7-7 7 7" />
                    </svg>
                </button>
            )}

            <Lightbox
                index={lightboxIndex}
                userConfig={userConfig}
                onClose={closeLightbox}
                showPrev={showPrev}
                showNext={showNext}
                onJumpTo={openLightbox}
            />

            <Modal isOpen={modalOpen} message={modalMessage} onClose={closeModal} />
        </>
    );
}

export default App;
