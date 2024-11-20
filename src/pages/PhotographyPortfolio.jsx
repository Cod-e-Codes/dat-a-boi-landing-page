import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

function ServiceCard({ title, description, icon, accentColor }) {
    return (
        <div
            className={`relative bg-gray-700 rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl p-6 pb-16 border-2 ${accentColor}`}
        >
            <i
                className={`${icon} absolute bottom-4 right-4 text-white opacity-10 text-[100px] pointer-events-none`}
                aria-hidden="true"
            ></i>
            <h3 className={`text-xl font-bold mb-2 relative z-10 text-center ${accentColor}`}>
                {title}
            </h3>
            <p className="text-sm text-gray-300 relative z-10 text-center">{description}</p>
        </div>
    );
}

function PhotographyPortfolio() {
    useEffect(() => {
        // Reset scroll position to the top of the page
        window.scrollTo(0, 0);
    }, []);

    const [openFAQ, setOpenFAQ] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => setIsDialogOpen(false);

    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    // Handle input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSendMessage = (event) => {
        event.preventDefault(); // Prevent form submission
        setIsSending(true); // Show loading spinner
        setIsSent(false); // Reset sent state

        // Simulate sending message (e.g., via API)
        setTimeout(() => {
            setIsSending(false); // Stop loading spinner
            setIsSent(true); // Show success message
            setFormData({ name: '', email: '', message: '' }); // Clear the form
        }, 2000); // Simulate 2-second delay
    };

    const openModal = (index) => {
        setSelectedItem(portfolioItems[index]);
        setCurrentImageIndex(0);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentImageIndex(null);
    };

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedItem.collection.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + selectedItem.collection.length) % selectedItem.collection.length);
    };

    const serviceCategories = [
        {
            title: 'Weddings',
            description: 'Beautiful moments captured on your special day.',
            icon: 'fas fa-ring',
            accentColor: 'border-pink-500 text-pink-500',
        },
        {
            title: 'Portraits',
            description: 'Timeless portraits that bring out your personality.',
            icon: 'fas fa-user',
            accentColor: 'border-purple-500 text-purple-500',
        },
        {
            title: 'Landscapes',
            description: 'Stunning views of nature and urban landscapes.',
            icon: 'fas fa-mountain',
            accentColor: 'border-green-500 text-green-500',
        },
        {
            title: 'Events',
            description: 'Memorable highlights from corporate and social events.',
            icon: 'fas fa-calendar-alt',
            accentColor: 'border-yellow-500 text-yellow-500',
        },
        {
            title: 'Products',
            description: 'Showcase your products with professional photography.',
            icon: 'fas fa-box',
            accentColor: 'border-blue-500 text-blue-500',
        },
        {
            title: 'Creative Projects',
            description: 'Unique and artistic photography to inspire.',
            icon: 'fas fa-lightbulb',
            accentColor: 'border-red-500 text-red-500',
        },
    ];

    const testimonials = [
        { name: 'Emily Johnson', comment: 'Incredible photography! Captured every moment perfectly.' },
        { name: 'James Smith', comment: 'Professional and creative, couldn’t have asked for better service.' },
    ];

    const faqs = [
        {
            question: 'How do I book a session?',
            answer: 'Contact us through the form below or call directly at (555) 123-4567.',
        },
        {
            question: 'What are your pricing options?',
            answer:
                'Pricing depends on the type of session and duration. Reach out for a custom quote!',
        },
        {
            question: 'Do you offer destination shoots?',
            answer:
                'Absolutely! I love traveling and can work with you to plan a destination session.',
        },
        {
            question: 'How long does it take to receive my photos?',
            answer:
                'You can expect your photos within 2-3 weeks, depending on the project size.',
        },
        {
            question: 'Do you provide prints or just digital files?',
            answer:
                'I offer both! You can choose from a variety of print options, albums, and digital downloads.',
        },
        {
            question: 'Can I request specific edits for my photos?',
            answer:
                'Yes, I’m happy to accommodate specific requests! Let me know your preferences during the review process.',
        },
    ];

    const portfolioItems = [
        { image: './wedding-bliss.webp', title: 'Wedding Bliss', description: 'A beautiful wedding day captured in every frame.', collection: ['/wedding-bliss.webp', '/wedding-bliss.webp', '/wedding-bliss.webp'], },
        { image: './urban-skyline.webp', title: 'Urban Skyline', description: 'The breathtaking view of the city skyline at dusk.', collection: ['/urban-skyline.webp', '/urban-skyline.webp', '/urban-skyline.webp'], },
        { image: './sunset-beach.webp', title: 'Sunset Beach', description: 'A tranquil sunset over the calm beach waters.', collection: ['/sunset-beach.webp', '/sunset-beach.webp', '/sunset-beach.webp'], },
        { image: './corporate-event.webp', title: 'Corporate Event', description: 'Professional photography at a major corporate event.', collection: ['/corporate-event.webp', '/corporate-event.webp', '/corporate-event.webp'], },
        { image: './product-showcase.webp', title: 'Product Showcase', description: 'Showcasing products in a creative and appealing way.', collection: ['/product-showcase.webp', '/product-showcase.webp', '/product-showcase.webp'], },
        { image: './creative-artwork.webp', title: 'Creative Artwork', description: 'Artistic photography with a creative edge.', collection: ['/creative-artwork.webp', '/creative-artwork.webp', '/creative-artwork.webp'], },
    ];

    return (
        <div>
            <Helmet>
                <title>Professional Photography | Dat A Boi Enterprises</title>
                <meta name="description" content="Capture life's most precious moments with Dat A Boi Studios. We offer expert photography services for weddings, portraits, events, and creative projects with personalized attention to detail." />
                <meta name="keywords" content="professional photography, wedding photography, portrait photography, event photography, creative photography, photography services, photo shoots, photography studio" />
                <meta name="robots" content="index, follow" />
            </Helmet>
            <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                {/* Header */}
                <header className="bg-black py-6 shadow-lg sticky top-0 z-10">
                    <div className="container mx-auto px-8 flex justify-between items-center">
                        <h1 className="text-3xl font-extrabold tracking-wide">
                            Dat A Boi <span className="text-regalia">Photography</span>
                        </h1>
                        <a
                            href="/"
                            className="text-gray-400 hover:text-white transition text-sm md:text-base underline"
                        >
                            Back to Home
                        </a>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="bg-gray-700 text-center py-12 px-4">
                    <h2 className="text-4xl font-extrabold mb-4">Professional Photography Services</h2>
                    <p className="text-lg md:text-xl mb-6">
                        Capturing memories, emotions, and stories through the lens.
                    </p>
                    <button onClick={openDialog} className="w-auto px-6 py-3 bg-gradient-to-b from-purple-600 to-purple-900 rounded-full shadow-md shadow-black/50 hover:outline hover:outline-purple-500 focus:outline focus:outline-purple-500 transition-all duration-100 active:from-purple-800 active:to-purple-900 active:translate-y-px">

                        Book a Session
                    </button>
                </section>

                {/* Modal */}
                {isDialogOpen && (
                    <div
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                        onClick={closeDialog} // Close modal when clicking on the overlay
                    >
                        <div
                            className="bg-gray-800 rounded-lg shadow-lg max-w-lg w-full p-8"
                            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
                        >
                            <h3 className="text-2xl font-bold mb-4 text-white text-center">
                                Book Your Session
                            </h3>
                            <p className="text-gray-300 mb-6 text-center">
                                Fill out the form below to start planning your photography session.
                            </p>
                            <form className="space-y-4">
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        className="w-full pl-12 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                                    />
                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        {/* Icon for Name field */}
                                        <i className="fas fa-user"></i>
                                    </span>
                                </div>
                                <div className="relative w-full">
                                    <input
                                        type="email"
                                        placeholder="Your Email"
                                        className="w-full pl-12 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                                    />
                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        {/* Icon for Email field */}
                                        <i className="fas fa-envelope"></i>
                                    </span>
                                </div>
                                <div className="relative w-full">
                                    <input
                                        type="date"
                                        className="w-full pl-12 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                                    />
                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        {/* Icon for Date field */}
                                        <i className="fas fa-calendar-alt"></i>
                                    </span>
                                </div>
                                <div className="relative w-full">
                                    <textarea
                                        placeholder="Additional Details (Optional)"
                                        className="w-full pl-12 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                                        rows="4"
                                    ></textarea>
                                    <span className="absolute left-4 top-2 text-gray-400">
                                        {/* Icon for Details field */}
                                        <i className="fas fa-comment-alt"></i>
                                    </span>
                                </div>
                                <div className="flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        onClick={closeDialog} // Close modal when clicking Cancel button
                                        className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-regalia hover:bg-diploma text-white py-2 px-4 rounded-lg"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Services Section */}
                <section className="container mx-auto px-8 py-12">
                    <h2 className="text-4xl font-extrabold mb-12 text-center">Picture-Perfect Services for Every Moment</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {serviceCategories.map((category, index) => (
                            <ServiceCard
                                key={index}
                                title={category.title}
                                description={category.description}
                                icon={category.icon}
                                accentColor={category.accentColor}
                            />
                        ))}
                    </div>
                </section>

                {/* Portfolio Gallery */}
                <section className="container mx-auto px-8 py-12">
                    <h3 className="text-3xl font-bold text-center mb-8">Portfolio Gallery</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {portfolioItems.map((item, index) => (
                            <div
                                key={index}
                                className="portfolio-item bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onClick={() => openModal(index)} // Open modal on click, passing index
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className={`w-full h-48 object-cover ${item.title === 'Wedding Bliss' ? 'object-top' : 'object-center'}`}
                                />
                                <div className="content p-6 text-white">
                                    <h4 className="text-xl font-semibold mb-4">{item.title}</h4>
                                    <p className={`description text-gray-300 transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}>{item.description}</p>
                                    <div className={`view-more mt-4 text-sm flex items-center ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                                        <span className="mr-2">View More</span>
                                        <i className="fas fa-arrow-right"></i>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Modal for Collection */}
                {isModalOpen && selectedItem && (
                    <div
                        className="modal fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center"
                        onClick={closeModal}
                    >
                        <div
                            className="modal-content bg-gray-900 p-6 rounded-lg max-w-3xl w-full max-h-screen overflow-y-auto relative mt-16"
                            onClick={(e) => e.stopPropagation()} // Prevent closing modal on content click
                        >
                            {/* Close Icon */}
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 text-white hover:text-gray-400 z-50"
                                aria-label="Close"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>

                            {/* Image Navigation */}
                            <div className="relative flex items-center justify-center">
                                <button
                                    onClick={prevImage}
                                    className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white text-3xl z-10"
                                >
                                    &#60;
                                </button>
                                <img
                                    src={selectedItem.collection[currentImageIndex]}
                                    alt={selectedItem.title}
                                    className="w-full max-h-[70vh] object-contain rounded-lg mb-4"
                                />
                                <button
                                    onClick={nextImage}
                                    className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white text-3xl z-10"
                                >
                                    &#62;
                                </button>
                            </div>

                            {/* Image Index Label */}
                            <div className="text-center text-white mt-4">
                                {currentImageIndex + 1} / {selectedItem.collection.length}
                            </div>

                            {/* Image Title and Description */}
                            <h4 className="text-2xl font-semibold text-white mt-4">{selectedItem.title}</h4>
                            <p className="text-gray-300 mt-2">{selectedItem.description}</p>
                        </div>
                    </div>
                )}

                {/* Testimonials */}
                <section className="bg-gray-800 py-12">
                    <h3 className="text-3xl font-bold text-center mb-8">Client Testimonials</h3>
                    <div className="flex flex-wrap justify-center gap-6">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="max-w-xs bg-gray-700 p-6 rounded-lg shadow-md text-center"
                            >
                                <p className="italic">"{testimonial.comment}"</p>
                                <p className="mt-4 font-bold">- {testimonial.name}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FAQs */}
                <section className="py-12 container mx-auto px-8">
                    <h3 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h3>
                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border-b border-gray-700 pb-4">
                                <button
                                    className="flex justify-between items-center w-full text-left font-bold text-lg text-gray-200"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    {faq.question}
                                    <span>{openFAQ === index ? '-' : '+'}</span>
                                </button>
                                {openFAQ === index && (
                                    <p className="mt-4 text-gray-300">{faq.answer}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact Section */}
                <section className="bg-gray-800 py-12 px-8">
                    <h3 className="text-3xl font-bold text-center mb-6">Contact Us</h3>
                    <form className="max-w-md mx-auto space-y-4 text-center" onSubmit={handleSendMessage}>
                        <div className="relative w-full">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                className="w-full pl-12 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                {/* Replace with your desired icon */}
                                <i className="fas fa-user"></i>
                            </span>
                        </div>
                        <div className="relative w-full">
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                className="w-full pl-12 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                {/* Replace with your desired icon */}
                                <i className="fas fa-envelope"></i>
                            </span>
                        </div>
                        <div className="relative w-full">
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                className="w-full pl-12 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white"
                                rows="5"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                            ></textarea>
                            <span className="absolute left-4 top-2 text-gray-400">
                                {/* Replace with your desired icon */}
                                <i className="fas fa-comment-alt"></i>
                            </span>
                        </div>

                        {/* Conditional rendering for send button and spinner */}
                        <button
                            className={`py-2 px-6 rounded-lg text-white transition-all ${isSending
                                ? 'bg-gray-500 cursor-not-allowed'
                                : 'bg-regalia hover:bg-diploma'
                                }`}
                            disabled={isSending}
                        >
                            {isSending ? 'Sending...' : 'Send Message'}
                        </button>

                        {/* Success message */}
                        {isSent && (
                            <p className="text-green-500 mt-4">Your message has been sent successfully!</p>
                        )}
                    </form>
                </section>

                {/* Footer */}
                <footer className="bg-black py-8 text-center text-lg text-gray-400">
                    <p>Follow us:</p>
                    <div className="flex justify-center space-x-6 mt-4">
                        <a href="#" className="text-regalia hover:text-diploma">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="text-regalia hover:text-diploma">
                            <i className="fab fa-x-twitter"></i>
                        </a>
                        <a href="#" className="text-regalia hover:text-diploma">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                    <p className="mt-6">© {new Date().getFullYear()} Dat A Boi Enterprises. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}

export default PhotographyPortfolio;
