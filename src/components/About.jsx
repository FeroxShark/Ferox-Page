import React from 'react';
import DOMPurify from 'dompurify';
import { motion } from 'framer-motion';

function About({ userConfig }) {
    return (
        <section
            id="about"
            className="py-10 relative flex items-center justify-center"
        >
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto px-6 text-center relative z-10"
            >
                <div>
                    <h2
                        id="aboutTitle"
                        className="text-4xl md:text-5xl font-bold mb-8 text-slate-100"
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
        </section>
    );
}

export default About;
