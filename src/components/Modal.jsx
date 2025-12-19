import React, { useEffect, useRef } from 'react';

function Modal({ isOpen, message, onClose }) {
    const modalRef = useRef(null);
    const previousFocus = useRef(null);

    useEffect(() => {
        if (!isOpen) return;
        previousFocus.current = document.activeElement;
        const el = modalRef.current;
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
            }
        };
        el.addEventListener('keydown', trap);
        first && first.focus();
        return () => {
            el.removeEventListener('keydown', trap);
            previousFocus.current && previousFocus.current.focus();
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            id="messageModal"
            ref={modalRef}
            className="modal"
            role="dialog"
            aria-modal="true"
            onClick={(e) => {
                if (e.target.id === 'messageModal') onClose();
            }}
        >
            <div className="modal-content">
                <span className="modal-close-button" onClick={onClose}>
                    ×
                </span>
                <p
                    id="modalMessageText"
                    dangerouslySetInnerHTML={{ __html: message }}
                />
            </div>
        </div>
    );
}

export default Modal;
