import React, { useMemo } from 'react';

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

function Manifesto({ userConfig }) {
    const age = useMemo(() => getAge(userConfig.birthday), [userConfig.birthday]);
    const manifesto = userConfig.manifesto || { sections: [], pullQuote: '' };

    // Plain-text interpolation for {{age}}
    const interpolate = (txt) => String(txt).replace('{{age}}', age);

    return (
        <section
            id="manifesto"
            className="relative bg-sys-white text-sys-black py-24 md:py-32 px-[5vw] border-t border-sys-black border-b-[8px] border-b-sys-black"
        >
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
                {/* Sticky marker */}
                <div className="md:col-span-3">
                    <div className="md:sticky md:top-12 font-mono text-xl md:text-2xl font-bold uppercase text-sys-purple tracking-tight border-l-4 border-sys-purple pl-4">
                        04 // DIRECTIVE
                    </div>
                    <div className="hidden md:block mt-6 font-mono text-[10px] uppercase tracking-widest text-sys-black/50 pl-5 leading-relaxed">
                        <div className="text-sys-purple mb-1">&gt;&gt; SUBJECT</div>
                        <div>{userConfig.welcomeMessageText}</div>
                        <div className="text-sys-purple mt-3 mb-1">&gt;&gt; AGE</div>
                        <div>{age} CYCLES</div>
                        <div className="text-sys-purple mt-3 mb-1">&gt;&gt; LOCATION</div>
                        <div>{userConfig.location}</div>
                    </div>
                </div>

                {/* Content */}
                <div className="md:col-span-9 font-body text-lg md:text-xl leading-relaxed">
                    {manifesto.intro && (
                        <p className="drop-cap mb-10 text-sys-black">
                            {interpolate(manifesto.intro)}
                        </p>
                    )}

                    {manifesto.pullQuote && (
                        <div className="my-10 md:my-12 p-6 md:p-8 bg-sys-yellow border-t-2 border-b-2 border-sys-black relative">
                            <div className="absolute top-0 left-0 w-3 h-3 border-r border-b border-sys-black"></div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 border-l border-t border-sys-black"></div>
                            <p className="font-display text-2xl md:text-4xl uppercase leading-none tracking-tight">
                                &ldquo;{manifesto.pullQuote}&rdquo;
                            </p>
                        </div>
                    )}

                    <div className="space-y-6">
                        {(manifesto.sections || []).map((block, idx) => (
                            <p key={idx} className="text-sys-black/90">
                                {interpolate(block)}
                            </p>
                        ))}
                    </div>

                    {/* HUD status strip */}
                    <div className="mt-12 border border-sys-black p-4 font-mono text-xs inline-flex flex-wrap gap-6 md:gap-8 uppercase tracking-widest bg-white">
                        <div>
                            <span className="text-sys-purple block mb-1">MODE</span>
                            <span className="font-bold">READ_ONLY</span>
                        </div>
                        <div>
                            <span className="text-sys-purple block mb-1">BRIDGES_BUILT</span>
                            <span className="font-bold">ONE</span>
                        </div>
                        <div>
                            <span className="text-sys-purple block mb-1">FUEL_LEVEL</span>
                            <span className="font-bold">WHITE_MONSTER</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Manifesto;
