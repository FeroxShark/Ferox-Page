import React from 'react';
import { motion } from 'framer-motion';
import ImageWithLoader from './ImageWithLoader';
import { cn } from '../lib/utils';

const FALLBACK_IMAGE = 'img/profile.jpg';

function Hero({ userConfig, openModal }) {
    return (
        <section
            id="hero"
            className="snap-section min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
        >
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start w-full max-w-6xl z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                >
                    <div className="absolute inset-0 bg-red-600 blur-3xl opacity-20 rounded-full scale-110 animate-pulse" />
                    <ImageWithLoader
                        id="profileImage"
                        src={userConfig.profileImageUrl}
                        alt="Profile Picture"
                        className="w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-2xl mb-10 md:mb-0 md:mr-14 border-4 border-white/10 shadow-2xl object-cover relative z-10 hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                            e.target.src = FALLBACK_IMAGE;
                            openModal('Image failed to load.');
                        }}
                    />
                </motion.div>

                <div className="text-center md:text-left relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        id="welcomeMessage"
                        className="text-7xl sm:text-8xl md:text-9xl font-bold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800 drop-shadow-sm"
                    >
                        {userConfig.welcomeMessageText}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        id="socialLinks"
                        className="flex flex-wrap justify-center md:justify-start gap-6 mb-14"
                    >
                        {userConfig.socialMediaLinks.map((link, index) => (
                            <motion.a
                                key={link.url}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-red-500/50 transition-colors"
                                aria-label={link.name}
                                title={link.name}
                            >
                                <img
                                    src={link.icon}
                                    alt=""
                                    className="w-8 h-8 invert opacity-80 hover:opacity-100 transition-opacity"
                                    loading="lazy"
                                />
                            </motion.a>
                        ))}
                    </motion.div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                id="scrollHeroToAbout"
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            >
                <a
                    href="#about"
                    aria-label="Scroll to About Me section"
                    className="flex flex-col items-center gap-2 text-red-500/80 hover:text-red-500 transition-colors"
                >
                    <span className="text-sm uppercase tracking-widest opacity-50">Scroll</span>
                    <i className="fas fa-chevron-down text-2xl animate-bounce"></i>
                </a>
            </motion.div>
        </section>
    );
}

export default Hero;
