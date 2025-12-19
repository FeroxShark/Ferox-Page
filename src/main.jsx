import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initAirTrail } from './components/AirTrail'

// Initialize AirTrail effect
document.addEventListener('DOMContentLoaded', () => {
    initAirTrail();
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
