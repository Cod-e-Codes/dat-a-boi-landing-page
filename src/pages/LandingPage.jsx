import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function LandingPage() {
    useEffect(() => {
        // Reset scroll position to the top of the page
        window.scrollTo(0, 0);
    }, []);

    const [isSubscribing, setIsSubscribing] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [email, setEmail] = useState('');

    const handleSubscription = (event) => {
        event.preventDefault(); // Prevent form submission
        if (!email.trim()) return; // Ignore empty submissions

        setIsSubscribing(true); // Show loading spinner
        setIsSubscribed(false); // Reset subscribed state

        // Simulate subscription process (e.g., API call)
        setTimeout(() => {
            setIsSubscribing(false); // Stop loading spinner
            setIsSubscribed(true); // Show confirmation message
            setEmail(''); // Clear the email input
        }, 2000); // Simulate 2-second delay
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <Helmet>
                <title>Dat A Boi Enterprises | Premium Tire Sales & Photography Services</title>
                <meta
                    name="description"
                    content="Discover premium tire sales and professional photography services at Dat A Boi Enterprises. We offer high-quality tires for every vehicle and stunning photography for events, portraits, and creative projects."
                />
                <meta
                    name="keywords"
                    content="tire sales, photography, car tires, premium tires, professional photography, event photography, portrait photography, creative photography"
                />
                <meta name="robots" content="index, follow" />
            </Helmet>
            {/* Hero Section */}
            <div className="relative flex-grow flex flex-col items-center justify-center text-center">
                {/* Split Video Background */}
                <div className="absolute inset-0 flex w-full h-full z-0">
                    <video
                        className="w-1/2 h-full object-cover"
                        src="./tire.mp4"
                        autoPlay
                        loop
                        muted
                    />
                    <video
                        className="w-1/2 h-full object-cover"
                        src="./camera.mp4"
                        autoPlay
                        loop
                        muted
                    />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-gray-900 opacity-80 z-0"></div>

                {/* Content */}
                <div className="relative z-10 px-8 py-12 text-white">
                    <img
                        src="./dab-logo-with-text.png"
                        alt="Dat A Boi Enterprises Logo"
                        className="mx-auto w-1/3 md:w-1/4 object-contain mb-8"
                    />
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        Driving Excellence in Tires and Photography
                    </h1>
                    <p className="mt-4 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                        At Dat A Boi Enterprises, we’re proud to lead diverse business ventures with a shared commitment to quality and customer satisfaction. Explore our premium tire sales and professional photography services—distinct yet unified by a passion for excellence.
                    </p>
                    <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
                        <Link
                            to="/tire-sales"
                            className="w-auto px-6 py-3 bg-gradient-to-b from-clemsonOrange to-campusBrick rounded-full shadow-md shadow-black/50 hover:outline hover:outline-orange-500 focus:outline focus:outline-orange-500 transition-all duration-100 active:from-campusBrick active:to-orange-800 active:translate-y-px text-center"
                        >
                            Shop Tires
                        </Link>
                        <Link
                            to="/photography-portfolio"
                            className="w-auto px-6 py-3 bg-gradient-to-b from-purple-600 to-purple-900 rounded-full shadow-md shadow-black/50 hover:outline hover:outline-purple-500 focus:outline focus:outline-purple-500 transition-all duration-100 active:from-purple-800 active:to-purple-900 active:translate-y-px text-center"
                        >
                            View Photography
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-8 py-12">
                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {['Tire Sales', 'Photography Portfolio', 'About Us', 'Contact'].map((link) => (
                                <li key={link}>
                                    <Link
                                        to={`/${link.toLowerCase().replace(/ /g, '-')}`}
                                        className="hover:underline"
                                    >
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                        <div className="flex flex-col space-y-4">
                            {[
                                { name: 'Facebook', icon: 'fab fa-facebook-f', link: 'https://facebook.com' },
                                { name: 'Instagram', icon: 'fab fa-instagram', link: 'https://instagram.com' },
                                { name: 'Twitter', icon: 'fab fa-x-twitter', link: 'https://twitter.com' },
                            ].map((social) => (
                                <a
                                    key={social.name}
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition"
                                >
                                    <i className={`${social.icon} mr-2`}></i> {social.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</h3>
                        <form className="space-y-4" onSubmit={handleSubscription}>
                            <div className="relative w-full">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-12 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-clemsonOrange"
                                    required
                                />
                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <i className="fas fa-envelope"></i>
                                </span>
                            </div>
                            <button
                                type="submit"
                                className={`w-full px-4 py-3 rounded-lg bg-gradient-to-b from-clemsonOrange to-campusBrick shadow-md shadow-black/50 hover:outline hover:outline-orange-500 focus:outline focus:outline-orange-500 transition-all duration-100 active:from-campusBrick active:to-orange-800 active:translate-y-px ${isSubscribing ? 'bg-gray-500 cursor-not-allowed' : ''
                                    }`}
                                disabled={isSubscribing}
                            >
                                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                            </button>
                        </form>
                        {isSubscribed && (
                            <p className="text-green-500 mt-4">Thank you for subscribing!</p>
                        )}
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
                    <p>
                        © {new Date().getFullYear()} Dat A Boi Enterprises. All rights reserved.
                    </p>
                    <p>
                        Designed and Developed by{' '}
                        <a
                            href="https://www.cod-e-codes.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-clemsonOrange hover:text-white hover:underline transition"
                        >
                            CodēCodes
                        </a>
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;
