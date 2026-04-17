import React from 'react';
import SectionHeader from './SectionHeader';

function Setup({ userConfig }) {
    const rows = userConfig.setup || [];

    return (
        <section
            id="setup"
            className="relative bg-sys-black text-sys-white py-24 md:py-32 px-[5vw] border-b border-sys-white/20"
        >
            <div className="max-w-7xl mx-auto">
                <SectionHeader
                    number="01"
                    title="HARDWARE_SPECS"
                    status="SYS_DIAGNOSTIC: ALL GREEN"
                    theme="dark"
                />

                <div className="brutal-grid dark-grid grid-cols-1 md:grid-cols-3 text-sm font-mono uppercase tracking-wide">
                    {rows.map((row, idx) => (
                        <React.Fragment key={idx}>
                            <div className="p-5 md:p-4 text-sys-purple font-bold">{row.category}</div>
                            <div className="p-5 md:p-4 text-lg md:text-sm font-display tracking-normal">
                                {row.designation}
                            </div>
                            <div className="p-5 md:p-4 text-sys-white/70">{row.status}</div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Setup;
