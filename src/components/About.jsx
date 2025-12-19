import React from 'react';
import DOMPurify from 'dompurify';
import { motion } from 'framer-motion';

function About({ userConfig }) {
    return (
        <section
            id="about"
            className="snap-section py-16 md:py-24 my-12 relative flex items-center justify-center"
        >
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto px-6 text-center relative z-10"
            >
                <div className="glass-panel p-10 md:p-16 rounded-3xl">
                    <h2
                        id="aboutTitle"
                        className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400"
                    >
                        {userConfig.aboutSectionTitle}
                    </h2>
                    <div
                        id="aboutContent"
                        className="text-xl md:text-2xl text-slate-300 space-y-6 leading-relaxed"
                    >
                        {userConfig.aboutMeContent.map((p, idx) => (
                            <p
                                key={idx}
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(p) }}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>

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

export default About;
