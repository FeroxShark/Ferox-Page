import ImageWithLoader from './ImageWithLoader.jsx';

export default function Hero({ config }) {
  return (
    <section
      id="hero"
      className="snap-section min-h-screen flex flex-col items-center justify-center relative"
    >
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-start w-full max-w-6xl">
        <ImageWithLoader
          id="profileImage"
          src={config.profileImageUrl}
          alt="Profile Picture"
          className="w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-lg mb-10 md:mb-0 md:mr-14 border-4 border-red-600 shadow-xl object-cover"
        />
        <div className="text-center md:text-left">
          <h1
            id="welcomeMessage"
            className="text-7xl sm:text-8xl md:text-9xl font-bold mb-5 text-red-600"
          >
            {config.welcomeMessageText}
          </h1>
          <div
            id="socialLinks"
            className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-5 mb-14"
          >
            {config.socialMediaLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-300 hover:scale-110"
                aria-label={link.name}
                title={link.name}
              >
                <img
                  src={link.icon}
                  alt={`${link.name} icon`}
                  className="w-10 h-10"
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div
        id="scrollHeroToAbout"
        className="scroll-arrow text-3xl text-red-500 absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <a href="#about" aria-label="Scroll to About Me section">
          <i className="fas fa-chevron-down"></i>
        </a>
      </div>
    </section>
  );
}
