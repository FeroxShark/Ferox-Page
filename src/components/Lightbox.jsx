import { useEffect, useRef } from 'react';

export default function Lightbox({
  config,
  index,
  onClose,
  showPrev,
  showNext,
}) {
  const imgRef = useRef(null);
  useEffect(() => {
    if (index !== null) {
      imgRef.current.src = config.galleryItems[index].imageUrl;
    }
  }, [index, config.galleryItems]);

  if (index === null) return null;
  return (
    <div
      id="lightbox"
      aria-hidden="true"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="modal"
    >
      <div className="modal-content" role="dialog" aria-modal="true">
        <span className="modal-close-button" onClick={onClose}>
          &times;
        </span>
        <button className="lightbox-nav lightbox-prev" onClick={showPrev}>
          &lsaquo;
        </button>
        <img
          ref={imgRef}
          alt={config.galleryItems[index].description || 'Gallery image'}
        />
        <button className="lightbox-nav lightbox-next" onClick={showNext}>
          &rsaquo;
        </button>
      </div>
    </div>
  );
}
