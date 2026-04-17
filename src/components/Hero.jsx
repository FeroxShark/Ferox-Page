import React from 'react';
import { motion } from 'framer-motion';
import ImageWithLoader from './ImageWithLoader';

const FALLBACK_IMAGE = 'img/profile.jpg';

function Hero({ userConfig, openModal }) {
    const { welcomeMessageText, handle, location, status, tagline, socialMediaLinks } = userConfig;

    return (
        <section
            id="hero"
            className="relative min-h-[90vh] flex flex-col justify-center px-[5vw] pt-24 pb-12 bg-sys-black text-sys-white hud-bracket hud-bracket-tl hud-bracket-br border-b border-sys-white/20"
        >
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-10 items-end relative z-10">
                {/* Left HUD ident column */}
                <div className="col-span-1 md:col-span-4 font-mono text-sm tracking-widest leading-relaxed flex flex-col gap-6 uppercase">
                    <div>
                        <span className="text-sys-purple block mb-1">&gt;&gt; HANDLE</span>
                        <p>{handle}</p>
                    </div>
                    <div>
                        <span className="text-sys-purple block mb-1">&gt;&gt; ORIGIN</span>
                        <p>{location}</p>
                    </div>
                    <div>
                        <span className="text-sys-purple block mb-1">&gt;&gt; STATUS</span>
                        <p>
                            <span className="text-sys-yellow">■</span> {status}
                        </p>
                    </div>
                    <div className="h-px w-full bg-sys-white/20 my-2"></div>

                    {/* Social icon strip */}
                    <div className="grid grid-cols-5 gap-px bg-sys-white/10 border border-sys-white/10">
                        {socialMediaLinks.map((link) => (
                            <a
                                key={link.url}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={link.name}
                                className="group relative flex items-center justify-center aspect-square bg-sys-black hover:bg-sys-yellow hover-snap"
                            >
                                <div
                                    className="h-5 w-5 bg-sys-white group-hover:bg-sys-black hover-snap"
                                    style={{
                                        maskImage: `url(${link.icon})`,
                                        WebkitMaskImage: `url(${link.icon})`,
                                        maskSize: 'contain',
                                        WebkitMaskSize: 'contain',
                                        maskRepeat: 'no-repeat',
                                        WebkitMaskRepeat: 'no-repeat',
                                        maskPosition: 'center',
                                        WebkitMaskPosition: 'center',
                                    }}
                                />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Right massive typography + profile */}
                <div className="col-span-1 md:col-span-8 flex flex-col gap-8">
                    <div className="flex items-end gap-6">
                        <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 border border-sys-white/30 overflow-hidden">
                            <ImageWithLoader
                                id="profileImage"
                                src={userConfig.profileImageUrl}
                                alt="Profile"
                                className="w-full h-full object-cover hover-snap"
                                onError={(e) => {
                                    e.target.src = FALLBACK_IMAGE;
                                    openModal && openModal('Image failed to load.');
                                }}
                            />
                        </div>
                        <div className="font-mono text-xs uppercase tracking-widest text-sys-white/60 pb-2">
                            <div>REGISTERED</div>
                            <div className="text-sys-yellow">2005-12-19</div>
                        </div>
                    </div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="font-display text-[18vw] md:text-[14vw] leading-[0.85] tracking-tighter uppercase m-0"
                    >
                        <span className="block">{welcomeMessageText}</span>
                        <span className="block text-stroke-white">_SHARK</span>
                    </motion.h1>

                    <div className="flex items-center gap-4">
                        <div className="h-[2px] flex-grow bg-sys-yellow"></div>
                        <p className="font-mono text-sm md:text-base uppercase tracking-widest text-sys-yellow">
                            {tagline}
                        </p>
                    </div>
                </div>
            </div>

            {/* Ambient geometric decor */}
            <div className="hidden md:block absolute top-[20%] right-[8%] w-48 h-48 border border-sys-purple/40 rotate-45 pointer-events-none"></div>
            <div className="hidden md:block absolute bottom-[15%] left-[45%] w-24 h-24 border border-sys-white/10 rotate-12 pointer-events-none"></div>
        </section>
    );
}

export default Hero;
