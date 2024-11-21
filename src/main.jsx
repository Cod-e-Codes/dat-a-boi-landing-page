import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // Use HashRouter
import LandingPage from './pages/LandingPage';
import TireSales from './pages/TireSales';
import PhotographyPortfolio from './pages/PhotographyPortfolio';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import './styles/index.css';

function App() {
    return (
        <Router> {/* HashRouter doesn't need basename */}
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/tire-sales" element={<TireSales />} />
                <Route path="/photography-portfolio" element={<PhotographyPortfolio />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </Router>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
