import React from 'react';
import SectionHeader from './SectionHeader';

const CATEGORY_LABELS = {
    games: { label: 'INTERACTIVE', color: 'text-sys-yellow', hoverBg: 'hover:bg-sys-purple hover:text-sys-white' },
    music: { label: 'SONIC', color: 'text-sys-purple', hoverBg: 'hover:bg-sys-yellow hover:text-sys-black' },
    other: { label: 'MISC', color: 'text-sys-yellow', hoverBg: 'hover:bg-sys-purple hover:text-sys-white' },
};

function Favorites({ userConfig }) {
    const favorites = userConfig.favorites || { games: [], music: [], other: [] };

    // Flatten all to a single master list with category
    const rows = [];
    Object.entries(favorites).forEach(([key, items]) => {
        items.forEach((item) => rows.push({ ...item, categoryKey: key }));
    });

    return (
        <section
            id="favorites"
            className="relative bg-sys-black text-sys-white py-24 md:py-32 px-[5vw] border-b border-sys-white/20"
        >
            <div className="max-w-5xl mx-auto">
                <SectionHeader
                    number="03"
                    title="CORE_DATABASE"
                    status={`${rows.length} ENTRIES // INSPIRATIONS`}
                    theme="dark"
                />

                <div className="flex flex-col gap-px bg-sys-white/10 border border-sys-white/10">
                    {/* Header row */}
                    <div className="grid grid-cols-12 gap-4 p-4 text-sys-white/50 font-mono text-[10px] bg-sys-black uppercase tracking-widest">
                        <div className="col-span-1">ID</div>
                        <div className="col-span-3">CATEGORY</div>
                        <div className="col-span-5 md:col-span-6">ASSET_NAME</div>
                        <div className="col-span-3 md:col-span-2 text-right">META</div>
                    </div>

                    {rows.map((row, idx) => {
                        const meta = CATEGORY_LABELS[row.categoryKey] || CATEGORY_LABELS.other;
                        const id = String(idx + 1).padStart(3, '0');
                        const Tag = row.url ? 'a' : 'div';
                        const linkProps = row.url
                            ? { href: row.url, target: '_blank', rel: 'noopener noreferrer' }
                            : {};
                        return (
                            <Tag
                                key={`${row.categoryKey}-${idx}`}
                                {...linkProps}
                                className={`group grid grid-cols-12 gap-4 p-4 items-center bg-[#0a0a0a] ${meta.hoverBg} hover-snap ${row.url ? 'cursor-pointer' : ''}`}
                            >
                                <div className="col-span-1 font-mono text-xs text-sys-white/40 group-hover:text-inherit">
                                    {id}
                                </div>
                                <div className={`col-span-3 font-mono text-[10px] uppercase tracking-widest ${meta.color} group-hover:text-inherit`}>
                                    {meta.label}
                                </div>
                                <div className="col-span-5 md:col-span-6 font-display text-xl md:text-3xl uppercase tracking-tighter leading-tight">
                                    {row.title}
                                    {row.url && (
                                        <span className="ml-3 font-mono text-[10px] align-middle opacity-0 group-hover:opacity-100">
                                            [ ↗ ]
                                        </span>
                                    )}
                                </div>
                                <div className="col-span-3 md:col-span-2 text-right font-mono text-[10px] uppercase tracking-widest text-sys-white/60 group-hover:text-inherit">
                                    {row.caption}
                                </div>
                            </Tag>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default Favorites;
