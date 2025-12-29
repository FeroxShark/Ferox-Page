import React from 'react';
import { motion } from 'framer-motion';
import ImageWithLoader from './ImageWithLoader';

const FALLBACK_IMAGE = 'img/profile.jpg';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemAnim = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

function Gallery({ userConfig, openLightbox, openModal }) {
    return (
        <section id="gallery" className="py-10">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-100"
            >
                Gallery
            </motion.h2>
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                id="gallery-masonry"
                className="masonry-grid mx-auto px-4 max-w-7xl"
            >
                {userConfig.galleryItems.map((item, idx) => (
                    <motion.div
                        variants={itemAnim}
                        key={idx}
                        className="masonry-item"
                    >
                        <div
                            className="neon-border-card"
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
                                className="w-full h-auto block"
                                onError={(e) => {
                                    e.target.src = FALLBACK_IMAGE;
                                    openModal('Image failed to load.');
                                }}
                            />
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}

export default Gallery;
