import React, { useEffect, useRef } from 'react';

function Lightbox({ index, userConfig, onClose, showPrev, showNext }) {
    const lightboxRef = useRef(null);
    const lightboxImgRef = useRef(null);
    const previousFocus = useRef(null);

    useEffect(() => {
        if (index === null) {
            document.body.style.overflow = '';
            return;
        }
        document.body.style.overflow = 'hidden';
        previousFocus.current = document.activeElement;
        const el = lightboxRef.current;
        const focusable = el.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const trap = (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        e.preventDefault();
                        last.focus();
                    }
                } else if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            } else if (e.key === 'ArrowLeft') {
                showPrev();
            } else if (e.key === 'ArrowRight') {
                showNext();
            }
        };
        el.addEventListener('keydown', trap);
        first && first.focus();
        return () => {
            el.removeEventListener('keydown', trap);
            previousFocus.current && previousFocus.current.focus();
            document.body.style.overflow = '';
        };
    }, [index, showPrev, showNext]);

    if (index === null) return null;

    return (
        <div
            id="lightbox"
            aria-hidden="true"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div
                className="modal-content"
                ref={lightboxRef}
                role="dialog"
                aria-modal="true"
            >
                <span className="modal-close-button" onClick={onClose}>
                    ×
                </span>
                <button className="lightbox-nav lightbox-prev" onClick={showPrev}>
                    ‹
                </button>
                <img
                    ref={lightboxImgRef}
                    src={userConfig.galleryItems[index].imageUrl}
                    alt={
                        userConfig.galleryItems[index].description
                            ? userConfig.galleryItems[index].description
                            : 'Gallery image'
                    }
                />
                <button className="lightbox-nav lightbox-next" onClick={showNext}>
                    ›
                </button>
            </div>
        </div>
    );
}

export default Lightbox;
