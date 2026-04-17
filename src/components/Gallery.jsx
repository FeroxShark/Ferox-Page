import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';

function Gallery({ userConfig, openLightbox }) {
    const items = userConfig.galleryItems || [];

    return (
        <section
            id="gallery"
            className="relative bg-sys-white text-sys-black py-24 md:py-32 px-[5vw] border-t-8 border-t-sys-yellow border-b border-sys-black"
        >
            <div className="max-w-[1600px] mx-auto w-full">
                <SectionHeader
                    number="02"
                    title="VISUAL_ARCHIVE"
                    status={`${items.length} FILES // SELECT_TARGET`}
                    theme="light"
                />

                <div className="brutal-grid light-grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[240px] md:auto-rows-[280px]">
                    {items.map((item, idx) => {
                        const id = String(idx + 1).padStart(3, '0');
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.04 }}
                                role="button"
                                tabIndex={0}
                                aria-label={item.description || `Artwork ${idx + 1}`}
                                onClick={() => openLightbox(idx)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        openLightbox(idx);
                                    }
                                }}
                                className="group relative overflow-hidden bg-sys-black cursor-pointer"
                            >
                                <img
                                    src={item.imageUrl}
                                    alt={`Artwork ${idx + 1}`}
                                    loading="lazy"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 border-[6px] border-transparent group-hover:border-sys-yellow pointer-events-none hover-snap"></div>
                                <div className="absolute bottom-3 left-3 bg-sys-black text-sys-white px-2 py-1 font-mono text-[10px] uppercase tracking-widest">
                                    FILE_{id}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default Gallery;
