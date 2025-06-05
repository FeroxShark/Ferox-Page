import DOMPurify from 'dompurify';

export default function About({ config }) {
  return (
    <section id="about" className="snap-section py-16 md:py-24 my-12 relative">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2
          id="aboutTitle"
          className="text-4xl md:text-5xl font-bold mb-8 text-red-500"
        >
          {config.aboutSectionTitle}
        </h2>
        <div
          id="aboutContent"
          className="text-xl md:text-2xl text-slate-300 space-y-5"
        >
          {config.aboutMeContent.map((p, idx) => (
            <p
              key={idx}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(p) }}
            />
          ))}
        </div>
      </div>
      <div
        id="scrollAboutToGallery"
        className="scroll-arrow text-3xl text-red-500 absolute bottom-[-2rem] sm:bottom-[-3rem] left-1/2 transform -translate-x-1/2 mt-8"
      >
        <a href="#gallery" aria-label="Scroll to Gallery section">
          <i className="fas fa-chevron-down"></i>
        </a>
      </div>
    </section>
  );
}
