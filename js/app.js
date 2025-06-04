const { useState, useEffect } = React;

const userConfig = {
    profileImageUrl: "https://placehold.co/800x800.webp",
    welcomeMessageText: "Ferox",
    socialMediaLinks: [
        { iconPath: "img/icons/twitter.svg", url: "https://x.com/Ferox_Shark", name: "Twitter" },
        { iconPath: "img/icons/instagram.svg", url: "https://www.instagram.com/feroxshark/", name: "Instagram" },
        { iconPath: "img/icons/steam.svg", url: "https://steamcommunity.com/id/feroxshark/", name: "Steam" },
        { iconPath: "img/icons/discord.svg", url: "https://discord.com/invite/7uDqm4Khhm", name: "Discord" },
        { iconPath: "img/icons/telegram.svg", url: "https://t.me/feroxshark", name: "Telegram" },
        { iconPath: "img/icons/vrchat.svg", url: "https://vrchat.com/home/user/usr_b51db741-9cef-4095-b436-4367176fc4bb", name: "VRChat" },
        { iconPath: "img/icons/twitch.svg", url: "https://www.twitch.tv/ferox_uwu", name: "Twitch" },
        { iconPath: "img/icons/paw.svg", url: "https://www.furaffinity.net/user/feroxshark", name: "Fur Affinity" },
        { iconPath: "img/icons/tiktok.svg", url: "https://www.tiktok.com/@feroxshark", name: "TikTok" },
        { iconPath: "img/icons/github.svg", url: "https://github.com/FeroxShark", name: "GitHub" }
    ],
    aboutSectionTitle: "Hewo! My name is Ferox",
    aboutMeContent: [
        "I'm a 19-year-old furry from Argentina 🇦🇷",
        "Addicted to White Monster",
        "<br>",
        "<strong>About me:</strong>",
        "I am currently studying Software Engineering at Siglo 21 University and making some investments as a hobby.",
        "I also play VRChat from time to time, feel free to add me if you want."
    ],
    galleryItems: [
        { imageUrl: "https://placehold.co/800x600.webp?text=Art1", description: "Artwork 1 description (optional)" },
        { imageUrl: "https://placehold.co/800x600.webp?text=Art2", description: "Artwork 2 description" },
        { imageUrl: "https://placehold.co/800x600.webp?text=Art3", description: "Artwork 3" },
        { imageUrl: "https://placehold.co/800x600.webp?text=Art4", description: "One more artwork with a slightly longer description to test text flow." },
        { imageUrl: "https://placehold.co/800x600.webp?text=Art5", description: "Artwork 5" },
        { imageUrl: "https://placehold.co/800x600.webp?text=Art6", description: "Artwork 6" }
    ],
    backgroundImages: [
        'https://placehold.co/1920x1080.webp'
    ],
    footerInfo: {
        text: "Ferox. All rights reserved.",
        lastUpdateDate: "June 3, 2025"
    }
};

function App() {
    const [showToTop, setShowToTop] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalOpen, setModalOpen] = useState(false);



    useEffect(() => {
        const handleScroll = () => setShowToTop(window.scrollY > 100);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const openModal = (message) => {
        setModalMessage(message);
        setModalOpen(true);
    };
    const closeModal = () => setModalOpen(false);
    window.showModal = openModal;

    return (
        React.createElement(React.Fragment, null,
            React.createElement("section", { id: "hero", className: "min-h-screen flex flex-col items-center justify-center relative" },
                React.createElement("div", { className: "flex flex-col md:flex-row items-center justify-center md:justify-start w-full max-w-6xl" },
                    React.createElement("picture", null,
                        React.createElement("source", {
                            type: "image/avif",
                            srcSet: "https://placehold.co/400x400.avif 400w, https://placehold.co/800x800.avif 800w",
                            sizes: "(min-width:1024px) 18rem, (min-width:768px) 16rem, 14rem"
                        }),
                        React.createElement("source", {
                            type: "image/webp",
                            srcSet: "https://placehold.co/400x400.webp 400w, https://placehold.co/800x800.webp 800w",
                            sizes: "(min-width:1024px) 18rem, (min-width:768px) 16rem, 14rem"
                        }),
                        React.createElement("img", {
                            id: "profileImage",
                            src: userConfig.profileImageUrl,
                            alt: "Profile Picture",
                            className: "w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-lg mb-10 md:mb-0 md:mr-14 border-4 border-red-600 shadow-xl object-cover",
                            loading: "eager"
                        })
                    ),
                    React.createElement("div", { className: "text-center md:text-left" },
                        React.createElement("h1", { id: "welcomeMessage", className: "text-7xl sm:text-8xl md:text-9xl font-bold mb-5 text-red-600" }, userConfig.welcomeMessageText),
                        React.createElement("div", { id: "socialLinks", className: "flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-5 mb-14" },
                            userConfig.socialMediaLinks.map(link =>
                                React.createElement("a", { key: link.url, href: link.url, target: "_blank", rel: "noopener noreferrer", className: "transition-colors duration-300", "aria-label": link.name, title: link.name },
                                    React.createElement("img", { src: link.iconPath, alt: `${link.name} icon`, className: "w-10 h-10", loading: "lazy" })
                                )
                            )
                        )
                    )
                ),
                React.createElement("div", { id: "scrollHeroToAbout", className: "scroll-arrow text-3xl text-red-500 absolute bottom-10 left-1/2 transform -translate-x-1/2" },
                    React.createElement("a", { href: "#about", "aria-label": "Scroll to About Me section" },
                        React.createElement("img", { src: "img/icons/chevron-down.svg", alt: "Scroll down", className: "w-6 h-6" })
                    )
                )
            ),
            React.createElement("section", { id: "about", className: "py-16 md:py-24 my-12 relative" },
                React.createElement("div", { className: "max-w-4xl mx-auto px-6 text-center" },
                    React.createElement("h2", { id: "aboutTitle", className: "text-4xl md:text-5xl font-bold mb-8 text-red-500" }, userConfig.aboutSectionTitle),
                    React.createElement("div", { id: "aboutContent", className: "text-xl md:text-2xl text-slate-300 space-y-5" },
                        userConfig.aboutMeContent.map((p, idx) =>
                            React.createElement("p", { key: idx, dangerouslySetInnerHTML: { __html: p } })
                        )
                    )
                ),
                React.createElement("div", { id: "scrollAboutToGallery", className: "scroll-arrow text-3xl text-red-500 absolute bottom-[-2rem] sm:bottom-[-3rem] left-1/2 transform -translate-x-1/2 mt-8" },
                    React.createElement("a", { href: "#gallery", "aria-label": "Scroll to Gallery section" },
                        React.createElement("img", { src: "img/icons/chevron-down.svg", alt: "Scroll down", className: "w-6 h-6" })
                    )
                )
            ),
            React.createElement("section", { id: "gallery", className: "py-16 md:py-24 mt-20" },
                React.createElement("h2", { className: "text-3xl md:text-4xl font-bold text-center mb-12 text-red-500" }, "Gallery"),
                React.createElement("div", { id: "galleryImages", className: "mx-auto" },
                    userConfig.galleryItems.map((item, idx) => {
                        const smallAvif = item.imageUrl.replace('800x600.webp', '400x300.avif');
                        const largeAvif = item.imageUrl.replace('.webp', '.avif');
                        const smallWebp = item.imageUrl.replace('800x600', '400x300');
                        return React.createElement("div", { key: idx, className: "gallery-card bg-slate-800 rounded-lg overflow-hidden shadow-lg" },
                            React.createElement("picture", null,
                                React.createElement("source", { type: "image/avif", srcSet: `${smallAvif} 400w, ${largeAvif} 800w`, sizes: "(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" }),
                                React.createElement("source", { type: "image/webp", srcSet: `${smallWebp} 400w, ${item.imageUrl} 800w`, sizes: "(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" }),
                                React.createElement("img", { src: item.imageUrl, alt: item.description || 'Gallery Image', className: "w-full h-auto block", loading: "lazy" })
                            )
                        );
                    })
                )
            ),
            React.createElement("footer", { className: "text-center py-10 mt-12 border-t border-slate-700" },
                React.createElement("p", { id: "footerText", className: "text-slate-400" },
                    "\u00A9 ",
                    React.createElement("span", { id: "currentYear" }, new Date().getFullYear()),
                    " ", userConfig.footerInfo.text
                ),
                React.createElement("p", { className: "text-slate-500 text-sm mt-2" }, "Last updated: ",
                    React.createElement("span", { id: "lastUpdated" }, userConfig.footerInfo.lastUpdateDate)
                )
            ),
            showToTop && React.createElement("button", { onClick: scrollToTop, id: "scrollToTopBtn", title: "Go to top" },
                React.createElement("img", { src: "img/icons/arrow-up.svg", alt: "Go to top", className: "w-6 h-6" })
            ),
            modalOpen && React.createElement("div", { id: "messageModal", className: "modal", onClick: e => { if (e.target.id === 'messageModal') closeModal(); } },
                React.createElement("div", { className: "modal-content" },
                    React.createElement("span", { className: "modal-close-button", onClick: closeModal }, "\u00D7"),
                    React.createElement("p", { id: "modalMessageText", dangerouslySetInnerHTML: { __html: modalMessage } })
                )
            )
        )
    );
}

ReactDOM.render(React.createElement(App), document.getElementById('root'));

function initializeFooterYear() {
    // The footer year is inserted directly in the React component using
    // new Date().getFullYear(), so this function currently does nothing.
}

initializeFooterYear(); // Placeholder call pending future footer logic

