import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import ImageWithLoader from './ImageWithLoader';
import { cn } from '../lib/utils';

const FALLBACK_IMAGE = 'img/profile.jpg';

function Hero({ userConfig, openModal }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    // Reduced rotation limits for better performance
    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

    const rectRef = useRef(null);
    const isMobile = useRef(false);

    useEffect(() => {
        // Simple mobile detection
        isMobile.current = window.matchMedia("(max-width: 768px)").matches;
    }, []);

    const handleMouseEnter = (e) => {
        if (isMobile.current) return;
        rectRef.current = e.currentTarget.getBoundingClientRect();
    };

    const handleMouseMove = (e) => {
        if (isMobile.current || !rectRef.current) return;

        const width = rectRef.current.width;
        const height = rectRef.current.height;

        // Use clientX/Y relative to the cached rect to avoid re-measuring
        const mouseXVal = e.clientX - rectRef.current.left;
        const mouseYVal = e.clientY - rectRef.current.top;

        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        rectRef.current = null;
    };

    return (
        <section
            id="hero"
            className="snap-section min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
        >
            <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl z-10 px-4 gap-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative perspective-1000"
                    onMouseEnter={handleMouseEnter}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d",
                    }}
                >
                    <div className="absolute inset-0 bg-red-600 blur-3xl opacity-20 rounded-full scale-110 animate-pulse -z-10" />
                    <ImageWithLoader
                        id="profileImage"
                        src={userConfig.profileImageUrl}
                        alt="Profile Picture"
                        className="w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-2xl mb-10 md:mb-0 border-4 border-white/10 shadow-2xl object-cover relative z-10 transition-transform duration-100"
                        style={{ transform: "translateZ(50px)" }}
                        onError={(e) => {
                            e.target.src = FALLBACK_IMAGE;
                            openModal('Image failed to load.');
                        }}
                    />
                </motion.div>

                <div className="text-center md:text-left relative z-10 w-full max-w-lg">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        id="welcomeMessage"
                        className="text-6xl sm:text-7xl md:text-8xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600 drop-shadow-sm"
                    >
                        {userConfig.welcomeMessageText}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        id="socialLinks"
                        className="grid grid-cols-2 gap-4 mb-14 w-full"
                    >
                        {userConfig.socialMediaLinks.map((link, index) => {
                            const isLastOdd = index === userConfig.socialMediaLinks.length - 1 && userConfig.socialMediaLinks.length % 2 !== 0;
                            return (
                                <motion.a
                                    key={link.url}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={cn(
                                        "p-4 bg-white/5 rounded-xl backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-red-500/50 transition-all flex items-center justify-center gap-3 group",
                                        isLastOdd && "col-span-2"
                                    )}
                                    aria-label={link.name}
                                    title={link.name}
                                >
                                    <img
                                        src={link.icon}
                                        alt=""
                                        className="w-6 h-6 invert opacity-80 group-hover:opacity-100 transition-opacity"
                                    />
                                    <span className="text-white/80 font-medium group-hover:text-white transition-colors">{link.name}</span>
                                </motion.a>
                            );
                        })}
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
