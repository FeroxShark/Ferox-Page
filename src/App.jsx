import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
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
            {/* Scanline overlay */}
            <div className="scanline" aria-hidden="true"></div>

            {/* Persistent HUD frame — corner metadata, mix-blend */}
            <div
                className="fixed inset-0 pointer-events-none z-40 p-[5vw] flex flex-col justify-between mix-blend-difference text-sys-white opacity-70 font-mono text-[10px] uppercase tracking-widest hidden md:flex"
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
                    ^
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
