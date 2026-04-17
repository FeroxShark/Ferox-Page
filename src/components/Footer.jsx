import React from 'react';

function Footer({ userConfig }) {
    const year = new Date().getFullYear();
    const contact = userConfig.footerInfo?.contactEmail;

    return (
        <footer className="relative bg-sys-yellow text-sys-black overflow-hidden py-16 md:py-20 px-[5vw] border-t border-sys-purple border-b-8 border-b-sys-purple">
            {/* Dot pattern overlay */}
            <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                    backgroundSize: '16px 16px',
                }}
            ></div>

            <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end relative z-10 gap-12">
                <div className="font-mono uppercase text-sm leading-relaxed max-w-sm">
                    <p className="font-bold text-base md:text-lg mb-4 text-sys-purple tracking-widest">
                        WARNING // CONNECTION_TERMINATING
                    </p>
                    <p className="text-sys-black/90">
                        End of transmission. {userConfig.footerInfo?.text}
                    </p>
                    {contact && (
                        <a
                            href={contact}
                            className="inline-block mt-6 bg-sys-black text-sys-yellow px-6 py-3 font-bold tracking-widest hover:bg-sys-purple hover:text-sys-white hover-snap"
                        >
                            [ ESTABLISH_CONTACT ]
                        </a>
                    )}
                </div>

                <div className="text-left md:text-right w-full md:w-auto">
                    <h2 className="font-display text-[12vw] md:text-[6vw] leading-[0.8] uppercase tracking-tighter text-sys-black">
                        END_OF<br />TRANSMISSION
                    </h2>
                    <div className="font-mono text-[10px] md:text-xs mt-4 flex flex-wrap justify-start md:justify-end gap-4 md:gap-6 text-sys-black/70 font-bold uppercase tracking-widest">
                        <span>SYS.YEAR: {year}</span>
                        <span>LAST_SYNC: {userConfig.footerInfo?.lastUpdateDate}</span>
                        <span>SESSION_ID: 0XF83A_B</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
