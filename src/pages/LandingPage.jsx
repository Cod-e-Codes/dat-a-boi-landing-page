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
                <meta name="description" content="Discover premium tire sales and professional photography services at Dat A Boi Enterprises. We offer high-quality tires for every vehicle and stunning photography for events, portraits, and creative projects." />
                <meta name="keywords" content="tire sales, photography, car tires, premium tires, professional photography, event photography, portrait photography, creative photography" />
                <meta name="robots" content="index, follow" />
            </Helmet>
            {/* Hero Section */}
            <div className="flex-grow flex flex-col items-center justify-center px-8 text-center py-12">
                <div className="flex flex-col md:flex-row items-center justify-center px-8 text-center py-12">
                    <img src="./dab-logo-with-text.png" alt="Dat A Boi Enterprises Logo" className="w-auto sm:w-auto md:w-auto lg:w-1/3 object-contain" />

                </div>
                <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12">
                    Discover the perfect combination of premium tire sales and stunning photography services. We bring you unmatched quality, tailored to meet your needs.
                </p>

                {/* Service Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
                    <Link
                        to="/tire-sales"
                        className="relative bg-campusBrick rounded-lg shadow-lg p-8 pb-16 transform transition-transform hover:scale-105 hover:shadow-xl overflow-hidden"
                    >
                        <h2 className="text-2xl font-bold mb-4 relative z-10">
                            Tire Sales
                        </h2>
                        <p className="text-sm md:text-base relative z-10">
                            Shop high-quality tires designed for every vehicle and terrain. Experience reliability, durability, and performance with our premium selection.
                        </p>
                        {/* Icon Background */}
                        <i
                            className="fas fa-car absolute bottom-4 right-4 text-white opacity-10 text-[200px] pointer-events-none"
                            aria-hidden="true"
                        ></i>
                    </Link>
                    <Link
                        to="/photography-portfolio"
                        className="relative bg-diploma rounded-lg shadow-lg p-8 pb-16 transform transition-transform hover:scale-105 hover:shadow-xl overflow-hidden"
                    >
                        <h2 className="text-2xl font-bold mb-4 relative z-10">
                            Photography
                        </h2>
                        <p className="text-sm md:text-base relative z-10">
                            Explore captivating photography that captures life’s most memorable moments. Perfect for events, portraits, and creative projects.
                        </p>
                        {/* Icon Background */}
                        <i
                            className="fas fa-camera absolute bottom-4 right-4 text-white opacity-10 text-[200px] pointer-events-none"
                            aria-hidden="true"
                        ></i>
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-8 py-12">
                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {['Tire Sales', 'Photography', 'About Us', 'Contact'].map((link) => (
                                <li key={link}>
                                    <Link to={`/${link.toLowerCase().replace(/ /g, '-')}`} className="hover:underline">
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
                                    {/* Replace this with your desired icon */}
                                    <i className="fas fa-envelope"></i>
                                </span>
                            </div>
                            <button
                                type="submit"
                                className={`w-full px-4 py-3 rounded-lg transition ${isSubscribing ? 'bg-gray-500 cursor-not-allowed' : 'bg-clemsonOrange hover:bg-campusBrick'
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
                    <p className="text-gray-400">
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