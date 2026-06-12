import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Lightbox({ index, userConfig, onClose, showPrev, showNext, onJumpTo }) {
    const items = userConfig.galleryItems;
    const previousFocus = useRef(null);
    const thumbsRef = useRef(null);
    const activeThumbRef = useRef(null);
    const overlayRef = useRef(null);
    const closeBtnRef = useRef(null);

    // Lock scroll + restore focus
    useEffect(() => {
        if (index === null) {
            document.body.style.overflow = '';
            previousFocus.current?.focus();
            return;
        }
        document.body.style.overflow = 'hidden';
        previousFocus.current = document.activeElement;
        // Move focus into the dialog so the keyboard user starts inside it
        closeBtnRef.current?.focus();
    }, [index]);

    // Keyboard navigation + focus trap
    useEffect(() => {
        if (index === null) return;
        const handler = (e) => {
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'Tab') {
                const focusable = overlayRef.current?.querySelectorAll(
                    'button, [href], [tabindex]:not([tabindex="-1"])',
                );
                if (!focusable || focusable.length === 0) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [index, showPrev, showNext]);

    // Preload neighbouring images so arrow navigation doesn't flash
    useEffect(() => {
        if (index === null) return;
        [index - 1, index + 1].forEach((i) => {
            const item = items[(i + items.length) % items.length];
            if (item) {
                const img = new Image();
                img.src = item.imageUrl;
            }
        });
    }, [index, items]);

    // Scroll active thumbnail into view
    useEffect(() => {
        if (index !== null && activeThumbRef.current) {
            activeThumbRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }, [index]);

    const handleDragEnd = (_, info) => {
        if (info.offset.x > 80) showPrev();
        else if (info.offset.x < -80) showNext();
    };

    return (
        <AnimatePresence>
            {index !== null && (
                <motion.div
                    key="lightbox"
                    ref={overlayRef}
                    className="lightbox-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image viewer"
                >
                    {/* Header bar */}
                    <div className="lightbox-header">
                        <span className="lightbox-counter">
                            {index + 1} / {items.length}
                        </span>
                        <button
                            ref={closeBtnRef}
                            className="lightbox-close"
                            onClick={onClose}
                            aria-label="Close"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" aria-hidden="true">
                                <path d="M6 6l12 12M18 6L6 18" />
                            </svg>
                        </button>
                    </div>

                    {/* Main image */}
                    <div className="lightbox-image-container">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={index}
                                src={items[index].imageUrl}
                                alt={items[index].description || `Gallery image ${index + 1}`}
                                initial={{ opacity: 0, scale: 0.97 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.97 }}
                                transition={{ duration: 0.18 }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.15}
                                onDragEnd={handleDragEnd}
                                draggable={false}
                            />
                        </AnimatePresence>
                    </div>

                    {/* Navigation arrows */}
                    <button
                        className="lightbox-arrow lightbox-arrow-prev"
                        onClick={(e) => { e.stopPropagation(); showPrev(); }}
                        aria-label="Previous image"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" aria-hidden="true">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                    <button
                        className="lightbox-arrow lightbox-arrow-next"
                        onClick={(e) => { e.stopPropagation(); showNext(); }}
                        aria-label="Next image"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" aria-hidden="true">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>

                    {/* Thumbnail strip */}
                    <div
                        className="lightbox-thumbs"
                        ref={thumbsRef}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {items.map((item, idx) => (
                            <button
                                key={idx}
                                ref={idx === index ? activeThumbRef : null}
                                className={`lightbox-thumb-btn${idx === index ? ' active' : ''}`}
                                onClick={() => onJumpTo(idx)}
                                aria-label={`View image ${idx + 1}`}
                                aria-pressed={idx === index}
                            >
                                <img src={item.imageUrl} alt="" aria-hidden="true" loading="lazy" decoding="async" />
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default Lightbox;
