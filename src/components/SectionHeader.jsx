import React from 'react';

/**
 * SectionHeader — brutalist numbered section marker
 * "01 // TITLE" in mono, optional right-side status pill
 */
function SectionHeader({ number, title, status, theme = 'dark', className = '' }) {
    const muted = theme === 'dark' ? 'text-sys-white/50' : 'text-sys-black/60';
    const rule = theme === 'dark' ? 'border-sys-white/20' : 'border-sys-black/20';
    const pillBg = theme === 'dark' ? 'bg-sys-white/10 text-sys-white/60' : 'bg-sys-black/10 text-sys-black/70';

    return (
        <div className={`flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b ${rule} pb-4 gap-2 ${className}`}>
            <h2 className="font-mono text-xl md:text-2xl font-bold uppercase text-sys-purple tracking-tight">
                <span className={muted}>{number} //</span> {title}
            </h2>
            {status && (
                <div className={`font-mono text-xs px-3 py-1 uppercase tracking-widest ${pillBg}`}>
                    {status}
                </div>
            )}
        </div>
    );
}

export default SectionHeader;
