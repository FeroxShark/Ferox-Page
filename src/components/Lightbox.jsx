import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Lightbox({ index, userConfig, onClose, showPrev, showNext, onJumpTo }) {
    const items = userConfig.galleryItems;
    const previousFocus = useRef(null);
    const thumbsRef = useRef(null);
    const activeThumbRef = useRef(null);

    // Lock scroll + restore focus
    useEffect(() => {
        if (index === null) {
            document.body.style.overflow = '';
            previousFocus.current?.focus();
            return;
        }
        document.body.style.overflow = 'hidden';
        previousFocus.current = document.activeElement;
    }, [index]);

    // Keyboard navigation
    useEffect(() => {
        if (index === null) return;
        const handler = (e) => {
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'ArrowRight') showNext();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [index, showPrev, showNext]);

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
                            className="lightbox-close"
                            onClick={onClose}
                            aria-label="Close"
                        >
                            <i className="fas fa-times" />
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
                        <i className="fas fa-chevron-left" />
                    </button>
                    <button
                        className="lightbox-arrow lightbox-arrow-next"
                        onClick={(e) => { e.stopPropagation(); showNext(); }}
                        aria-label="Next image"
                    >
                        <i className="fas fa-chevron-right" />
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
                                <img src={item.imageUrl} alt="" aria-hidden="true" />
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default Lightbox;
