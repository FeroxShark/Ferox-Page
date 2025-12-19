import React from 'react';

function Footer({ userConfig }) {
    return (
        <footer className="text-center py-10 mt-12 border-t border-slate-700">
            <p id="footerText" className="text-slate-400">
                © <span id="currentYear">{new Date().getFullYear()}</span>{' '}
                {userConfig.footerInfo.text}
            </p>
            <p className="text-slate-500 text-sm mt-2">
                Last updated:{' '}
                <span id="lastUpdated">{userConfig.footerInfo.lastUpdateDate}</span>
            </p>
        </footer>
    );
}

export default Footer;
