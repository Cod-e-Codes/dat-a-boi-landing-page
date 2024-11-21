import React, { useState, useEffect } from "react";

function Contact() {
    useEffect(() => {
        // Reset scroll position to the top of the page
        window.scrollTo(0, 0);
    }, []);

    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSendMessage = (event) => {
        event.preventDefault();
        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            return;
        }

        setIsSending(true);
        setIsSent(false);

        // Simulate sending message
        setTimeout(() => {
            setIsSending(false);
            setIsSent(true);
            setFormData({ name: "", email: "", message: "" });
        }, 2000);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            {/* Header */}
            <header className="bg-black py-6 shadow-lg sticky top-0 z-10">
                <div className="container mx-auto px-6 lg:px-16 flex justify-between items-center">
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">
                        Contact <span className="text-clemsonOrange">Us</span>
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
            <main className="flex-grow px-6 lg:px-16 py-12">
                {/* Get in Touch Section */}
                <section className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Get in Touch</h2>
                    <p className="text-base md:text-lg leading-relaxed text-gray-300">
                        Have questions or need assistance? Contact us today, and our team will be happy to help.
                    </p>
                </section>

                {/* Contact Form */}
                <section className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6 md:p-10">
                    <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center text-clemsonOrange">
                        Send Us a Message
                    </h3>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6" onSubmit={handleSendMessage}>
                        <div className="relative w-full">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full pl-12 py-2 md:py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-clemsonOrange"
                                required
                            />
                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                {/* Icon for Name field */}
                                <i className="fas fa-user"></i>
                            </span>
                        </div>
                        <div className="relative w-full">
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full pl-12 py-2 md:py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-clemsonOrange"
                                required
                            />
                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                {/* Icon for Email field */}
                                <i className="fas fa-envelope"></i>
                            </span>
                        </div>
                        <div className="relative w-full col-span-1 md:col-span-2">
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={handleInputChange}
                                className="w-full pl-12 py-2 md:py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-clemsonOrange h-32 md:h-40"
                                required
                            ></textarea>
                            <span className="absolute left-4 top-2 text-gray-400">
                                {/* Icon for Message field */}
                                <i className="fas fa-comment-alt"></i>
                            </span>
                        </div>
                        <button
                            type="submit"
                            className={`col-span-1 md:col-span-2 px-4 md:px-6 py-2 md:py-3 font-bold text-base md:text-lg bg-gradient-to-b from-clemsonOrange to-campusBrick shadow-md shadow-black/50 hover:outline hover:outline-orange-500 focus:outline focus:outline-orange-500 transition-all duration-100 active:from-campusBrick active:to-orange-800 active:translate-y-px text-white rounded-lg ${isSending ? "bg-gray-500 cursor-not-allowed" : ""
                                }`}
                            disabled={isSending}
                        >
                            {isSending ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                    {isSent && (
                        <p className="text-green-500 mt-6 text-center">
                            Your message has been sent successfully!
                        </p>
                    )}
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

export default Contact;
