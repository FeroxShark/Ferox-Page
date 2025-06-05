import ImageWithLoader from './ImageWithLoader.jsx';

export default function Gallery({ config, openLightbox }) {
  return (
    <section id="gallery" className="snap-section py-16 md:py-24 mt-32">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-red-500">
        Gallery
      </h2>
      <div id="gallery-grid" className="mx-auto">
        {config.galleryItems.map((item, idx) => (
          <figure
            key={idx}
            className="gallery-card bg-slate-800 rounded-lg shadow-lg"
            role="button"
            tabIndex={0}
            onClick={() => openLightbox(idx)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(idx);
              }
            }}
          >
            <ImageWithLoader
              src={item.imageUrl}
              alt={item.description || 'Gallery Image'}
              loading="lazy"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
