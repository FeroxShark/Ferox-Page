import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import ImageWithLoader from './ImageWithLoader';
import { cn } from '../lib/utils';

const PixelLink = ({ link, isLastOdd }) => {
    const containerRef = useRef(null);
    const [pixels, setPixels] = useState([]);
    const pixelRefs = useRef([]);
    const currentHue = useRef(0); // Mutable ref for dynamic color

    // Generate grid on mount/resize
    useEffect(() => {
        if (!containerRef.current) return;
        const resizeObserver = new ResizeObserver(() => {
            const rect = containerRef.current.getBoundingClientRect();
            const cellSize = 12; // 12px cells, significantly denser
            const cols = Math.ceil(rect.width / cellSize);
            const rows = Math.ceil(rect.height / cellSize);
            // Add a small buffer to ensure coverage
            const newPixels = Array.from({ length: cols * rows }, (_, i) => ({
                id: i,
                x: (i % cols) * cellSize,
                y: Math.floor(i / cols) * cellSize,
                size: cellSize
            }));
            setPixels(newPixels);
            pixelRefs.current = pixelRefs.current.slice(0, newPixels.length);
        });
        resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    const animationFrameId = useRef(null);

    // New Random Hue on EVERY Enter
    const handleMouseEnter = () => {
        currentHue.current = Math.floor(Math.random() * 360);
    };

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Optimize: Use requestAnimationFrame to throttle updates to screen refresh rate
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = requestAnimationFrame(() => {
            pixelRefs.current.forEach((pixel, index) => {
                if (!pixel) return;
                const px = pixels[index].x + pixels[index].size / 2;
                const py = pixels[index].y + pixels[index].size / 2;

                // True Euclidean Distance
                const dist = Math.hypot(x - px, y - py);
                const radius = 20; // Tight core

                if (dist < radius) {
                    // CORE: Solid Light
                    pixel.style.transition = 'none'; // Instant ON
                    pixel.style.opacity = '1';
                    pixel.style.backgroundColor = `hsl(${currentHue.current}, 100%, 60%)`;
                    pixel.style.boxShadow = `0 0 10px hsl(${currentHue.current}, 100%, 60%)`;
                } else {
                    // OUTER: Exponential Decay
                    // Divisor 50 = Long "throw" to cover the whole box
                    const decay = Math.exp(-(dist - radius) / 50);

                    // Always apply, no cutoff
                    pixel.style.transition = 'none';
                    pixel.style.opacity = decay.toFixed(3);
                    pixel.style.backgroundColor = `hsl(${currentHue.current}, 100%, 60%)`;
                    pixel.style.boxShadow = 'none';
                }
            });
        });
    };

    const handleMouseLeave = () => {
        cancelAnimationFrame(animationFrameId.current);
        pixelRefs.current.forEach(pixel => {
            if (pixel) {
                pixel.style.transition = 'opacity 0.5s ease-out'; // Slow smooth fade
                pixel.style.opacity = '0';
                pixel.style.backgroundColor = 'transparent';
                pixel.style.boxShadow = 'none';
            }
        });
    };

    return (
        <motion.a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            ref={containerRef}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "group relative overflow-hidden rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-md transition-all neon-border-card decoration-0",
                isLastOdd && "col-span-2"
            )}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Background Grid Layer */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {pixels.map((p, i) => (
                    <div
                        key={p.id}
                        ref={el => pixelRefs.current[i] = el}
                        className="pixel-cell absolute"
                        style={{
                            left: p.x,
                            top: p.y,
                            width: p.size,
                            height: p.size,
                            opacity: 0,
                            willChange: 'opacity, background-color'
                        }}
                    />
                ))}
            </div>

            {/* Content Layer (z-10 to stay above grid) */}
            <div className="relative z-10 flex items-center justify-center gap-3 pointer-events-none">
                <div
                    className="h-6 w-6 bg-white/80 transition-colors group-hover:bg-white"
                    style={{
                        maskImage: `url(${link.icon})`,
                        WebkitMaskImage: `url(${link.icon})`,
                        maskSize: 'contain',
                        WebkitMaskSize: 'contain',
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskPosition: 'center'
                    }}
                />
                <span className="font-medium text-white/80 transition-colors group-hover:text-white">
                    {link.name}
                </span>
            </div>
        </motion.a>
    );
};


const FALLBACK_IMAGE = 'img/profile.jpg';

function Hero({ userConfig, openModal }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

    const rectRef = useRef(null);
    const isMobile = useRef(false);

    useEffect(() => {
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
        <section id="hero" className="flex flex-col items-center justify-center relative overflow-hidden py-10">
            <div className="flex flex-col md:flex-row items-center justify-center w-full z-10 gap-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative perspective-1000"
                    onMouseEnter={handleMouseEnter}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                >
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
                        className="text-6xl sm:text-7xl md:text-8xl font-bold mb-8 text-slate-100 drop-shadow-sm"
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
                            return <PixelLink key={link.url} link={link} isLastOdd={isLastOdd} />;
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
