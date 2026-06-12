import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch(error, info) {
        console.error('ErrorBoundary caught an error', error, info);
    }
    render() {
        if (this.state.hasError) {
            return (
                <div
                    role="alert"
                    className="min-h-screen flex flex-col items-center justify-center gap-4 bg-sys-black text-sys-white font-mono uppercase tracking-widest p-8 text-center"
                >
                    <p className="text-sys-purple">SYS_FAULT // RENDER_HALTED</p>
                    <p className="text-sys-white/70 text-sm">
                        Something broke. Try reloading the page.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-2 bg-sys-yellow text-sys-black px-6 py-3 font-bold tracking-widest hover:bg-sys-purple hover:text-sys-white"
                    >
                        [ RELOAD ]
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
