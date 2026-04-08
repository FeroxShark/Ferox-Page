import React, { useMemo } from 'react';
import DOMPurify from 'dompurify';
import { motion } from 'framer-motion';

function getAge(birthday) {
    const birth = new Date(birthday + 'T00:00:00');
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

function About({ userConfig }) {
    const age = useMemo(() => getAge(userConfig.birthday), [userConfig.birthday]);

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
                        className="text-4xl md:text-5xl font-black mb-8 gradient-text"
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
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(
                                        p.replace('{{age}}', age)
                                    ),
                                }}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

export default About;
