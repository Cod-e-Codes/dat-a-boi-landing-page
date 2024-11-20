import React, { useEffect } from 'react';

function AboutUs() {
    useEffect(() => {
        // Reset scroll position to the top of the page
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            {/* Header */}
            <header className="bg-black py-6 shadow-lg sticky top-0 z-10">
                <div className="container mx-auto px-8 flex justify-between items-center">
                    <h1 className="text-3xl font-extrabold tracking-wide">
                        About <span className="text-clemsonOrange">Us</span>
                    </h1>
                    <a
                        href="/dat-a-boi-landing-page/"
                        className="text-gray-400 hover:text-white transition text-sm md:text-base underline"
                    >
                        Back to Home
                    </a>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow px-8 py-16">
                <section className="max-w-5xl mx-auto text-center mb-16">
                    <h2 className="text-5xl font-extrabold mb-8">
                        Who We Are
                    </h2>
                    <p className="text-lg md:text-xl leading-relaxed text-gray-300">
                        At <span className="text-clemsonOrange font-semibold">Dat A Boi Enterprises</span>, we
                        specialize in premium tire sales and professional photography services. Our
                        mission is to provide exceptional quality and customer satisfaction, combining
                        expertise with a passion for excellence.
                    </p>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    <div className="bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                        <h3 className="text-3xl font-semibold mb-4 text-clemsonOrange">Our Vision</h3>
                        <p className="text-md text-gray-300 leading-relaxed">
                            To be a leader in our industry, delivering unmatched products and services
                            that inspire trust and loyalty from our customers.
                        </p>
                    </div>
                    <div className="bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                        <h3 className="text-3xl font-semibold mb-4 text-clemsonOrange">Our Values</h3>
                        <ul className="list-disc list-inside text-md text-gray-300 space-y-2">
                            <li>Commitment to quality</li>
                            <li>Customer-first approach</li>
                            <li>Innovation and creativity</li>
                            <li>Integrity and transparency</li>
                        </ul>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-black py-8 text-center text-lg text-gray-400">
                <p>Follow us:</p>
                <div className="flex justify-center space-x-6 mt-4">
                    <a href="#" className="text-clemsonOrange hover:text-campusBrick">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="text-clemsonOrange hover:text-campusBrick">
                        <i className="fab fa-x-twitter"></i>
                    </a>
                    <a href="#" className="text-clemsonOrange hover:text-campusBrick">
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
                <p className="mt-6">© {new Date().getFullYear()} Dat A Boi Enterprises. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default AboutUs;
