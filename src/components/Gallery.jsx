import React from 'react';
import { motion } from 'framer-motion';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.07 }
    }
};

const itemAnim = {
    hidden: { opacity: 0, scale: 0.94, y: 16 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35 } }
};

function Gallery({ userConfig, openLightbox }) {
    return (
        <section id="gallery" className="py-10">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-black text-center mb-10 gradient-text"
            >
                Gallery
            </motion.h2>
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="gallery-grid"
            >
                {userConfig.galleryItems.map((item, idx) => (
                    <motion.div
                        key={idx}
                        variants={itemAnim}
                        className="gallery-card"
                        role="button"
                        tabIndex={0}
                        aria-label={item.description || `Gallery image ${idx + 1}`}
                        onClick={() => openLightbox(idx)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                openLightbox(idx);
                            }
                        }}
                    >
                        <img
                            src={item.imageUrl}
                            alt={`Artwork ${idx + 1}`}
                            loading="lazy"
                        />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}

export default Gallery;
