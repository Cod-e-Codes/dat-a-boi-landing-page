import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import TireSales from './pages/TireSales';
import PhotographyPortfolio from './pages/PhotographyPortfolio';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import './styles/index.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/tire-sales" element={<TireSales />} />
                <Route path="/photography-portfolio" element={<PhotographyPortfolio />} />
            </Routes>
        </Router>
    );
}

export default App;
