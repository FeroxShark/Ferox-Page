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
        <section id="gallery" className="snap-section py-16 md:py-24 mt-32">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-center mb-12 text-red-500"
            >
                Gallery
            </motion.h2>
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                id="gallery-grid"
                className="mx-auto px-4"
            >
                {userConfig.galleryItems.map((item, idx) => (
                    <motion.figure
                        variants={itemAnim}
                        key={idx}
                        className="gallery-card glass-card rounded-xl overflow-hidden cursor-pointer group relative"
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
                        <div className="overflow-hidden">
                            <ImageWithLoader
                                src={item.imageUrl}
                                alt={item.description || 'Gallery Image'}
                                loading="lazy"
                                className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
                                onError={(e) => {
                                    e.target.src = FALLBACK_IMAGE;
                                    openModal('Image failed to load.');
                                }}
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <p className="text-white text-sm font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                {item.description || 'View Image'}
                            </p>
                        </div>
                    </motion.figure>
                ))}
            </motion.div>
        </section>
    );
}

export default Gallery;
