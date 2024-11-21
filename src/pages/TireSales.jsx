import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';

function TireCard({ title, description, icon, accentColor }) {
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

function TireDetailsModal({ tire, onClose, addToCart }) {
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(tire.sizes[0]); // Default to the first size

    if (!tire) return null; // If there's no selected tire, return null to hide the modal

    // Function to handle clicking outside the modal to close it
    const handleOutsideClick = (e) => {
        if (e.target.classList.contains('overlay')) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overlay"
            onClick={handleOutsideClick} // Trigger close on outside click
        >
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 max-w-full relative" onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white text-lg"
                >
                    ×
                </button>

                {/* Tire Image */}
                <img
                    src={tire.image}
                    alt={tire.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                />

                {/* Tire Details */}
                <h3 className="text-2xl font-bold text-clemsonOrange mb-2">{tire.name}</h3>
                <p className="text-gray-300 mb-4">{tire.description}</p>
                <p className="text-lg font-semibold text-gray-300">Price: ${tire.price}</p>
                <p className="text-lg font-semibold text-gray-300">Discount: {tire.discount}% off</p>
                <p className="text-lg font-semibold text-gray-300">Availability: {tire.availability}</p>
                <p className="text-lg font-semibold text-gray-300">Rating: {tire.rating} / 5</p>
                <p className="text-lg font-semibold text-gray-300">Category: {tire.category}</p>
                <p className="text-lg font-semibold text-gray-300">Brand: {tire.brand}</p>

                {/* Size Selection */}
                <div className="mt-4">
                    <label className="block text-lg text-gray-300">Select Size:</label>
                    <select
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="w-full p-2 bg-gray-600 text-white rounded-lg mt-2"
                    >
                        {tire.sizes.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Quantity Selection */}
                <div className="mt-4">
                    <label className="block text-lg text-gray-300">Quantity:</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        min="1"
                        className="w-full p-2 bg-gray-600 text-white rounded-lg mt-2"
                    />
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={() => {
                        // Log to check if quantity is correct
                        console.log("Adding to cart", { ...tire, selectedSize, quantity });

                        // Add to cart with selected quantity
                        addToCart({
                            ...tire,
                            selectedSize,
                            quantity,
                        });
                        onClose(); // Close modal after adding to cart
                    }}
                    className={`mt-6 px-6 py-2 bg-gradient-to-b from-clemsonOrange to-campusBrick shadow-md shadow-black/50 hover:outline hover:outline-orange-500 focus:outline focus:outline-orange-500 transition-all duration-100 active:from-campusBrick active:to-orange-800 active:translate-y-px text-white rounded-lg w-full`}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

function TireSales() {
    useEffect(() => {
        // Reset scroll position to the top of the page
        window.scrollTo(0, 0);
    }, []);

    const searchAndFilterRef = useRef(null);

    const scrollToSearchAndFilter = () => {
        const headerHeight = document.querySelector('header').offsetHeight; // Get the header height
        const targetPosition = searchAndFilterRef.current?.offsetTop; // Get the target section's position
        const button = document.activeElement; // Get the currently focused button

        if (targetPosition !== undefined) {
            window.scrollTo({
                top: targetPosition - headerHeight, // Adjust for header height
                behavior: 'smooth',
            });

            // Unfocus the button
            if (button && button.blur) {
                button.blur(); // Remove focus from the button
            }
        }
    };

    const [openFAQ, setOpenFAQ] = useState(null);

    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const addToCart = (item) => {
        // Default quantity to 1 if not provided
        const quantity = item.quantity || 1;

        // Check if the item already exists in the cart
        const existingItemIndex = cart.findIndex(
            (cartItem) =>
                cartItem.id === item.id && cartItem.selectedSize === item.selectedSize
        );

        if (existingItemIndex !== -1) {
            // If item already exists, update its quantity
            const updatedCart = [...cart];
            updatedCart[existingItemIndex].quantity += quantity;
            setCart(updatedCart);
        } else {
            // If item doesn't exist in the cart, add it with the selected quantity
            setCart((prevCart) => [...prevCart, { ...item, quantity }]);
        }
    };

    const removeFromCart = (productName) => {
        setCart((prevCart) =>
            prevCart
                .map((item) =>
                    item.name === productName ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const [selectedTire, setSelectedTire] = useState(null); // State to hold the selected tire

    // Open the modal and set the selected tire
    const openTireDetails = (tire) => {
        setSelectedTire(tire);
    };

    // Close the modal
    const closeTireDetails = () => {
        setSelectedTire(null);
    };

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

    const tireCategories = [
        {
            title: 'All-Season Tires',
            description: 'Reliable performance throughout the year, perfect for everyday driving.',
            icon: 'fas fa-cloud-sun',
            accentColor: 'border-blue-500 text-blue-500',
        },
        {
            title: 'Performance Tires',
            description: 'Designed for speed and precision, ideal for sports and high-performance cars.',
            icon: 'fas fa-tachometer-alt',
            accentColor: 'border-red-500 text-red-500',
        },
        {
            title: 'Off-Road Tires',
            description: 'Built for rugged terrains, ensuring maximum traction and durability.',
            icon: 'fas fa-mountain',
            accentColor: 'border-green-500 text-green-500',
        },
    ];

    const testimonials = [
        { name: 'John Doe', comment: 'Great tires and excellent customer service!' },
        { name: 'Jane Smith', comment: 'I found the perfect tires for my car, highly recommend!' },
    ];

    const faqs = [
        { question: 'Do you offer free shipping?', answer: 'Yes, on orders over $100.' },
        { question: 'Can I return tires if they don’t fit?', answer: 'Returns are accepted within 30 days.' },
        { question: 'How do I know which tires are right for my car?', answer: 'Check your car’s manual or consult our experts for personalized recommendations.' },
        { question: 'What payment options do you accept?', answer: 'We accept credit cards, PayPal, and financing options for qualifying purchases.' },
        { question: 'Are your tires covered by a warranty?', answer: 'Yes, all our tires come with manufacturer warranties. Details vary by brand.' },
        { question: 'How can I track my order?', answer: 'You will receive a tracking link via email once your order has shipped.' },
    ];

    const [catalog, setCatalog] = useState([
        {
            name: "All-Season Tire A1",
            price: 120,
            description: "Reliable all-weather performance.",
            image: "./all-season-tire.webp",
            rating: 4.5,
            availability: "In Stock",
            sizes: ["205/55R16", "225/60R17"],
            category: "All-Season",
            discount: 10,  // 10% off
            id: "A1-001",
            brand: "BrandX"
        },
        {
            name: "Performance Tire P2",
            price: 200,
            description: "Optimized for high-speed stability.",
            image: "./performance-tire.webp",
            rating: 4.7,
            availability: "In Stock",
            sizes: ["225/45R18", "245/40R19"],
            category: "Performance",
            discount: 15,  // 15% off
            id: "P2-002",
            brand: "BrandY"
        },
        {
            name: "Off-Road Tire O3",
            price: 180,
            description: "Maximum traction on rugged terrain.",
            image: "./off-road-tire.webp",
            rating: 4.6,
            availability: "In Stock",
            sizes: ["255/70R16", "265/75R16"],
            category: "Off-Road",
            discount: 5,  // 5% off
            id: "O3-003",
            brand: "BrandZ"
        },
        {
            name: "All-Season Tire A2",
            price: 140,
            description: "Enhanced durability and comfort.",
            image: "./all-season-tire-2.webp",
            rating: 4.4,
            availability: "Out of Stock",
            sizes: ["195/65R15", "215/55R17"],
            category: "All-Season",
            discount: 0,  // No discount
            id: "A2-004",
            brand: "BrandX"
        },
        {
            name: "Performance Tire P3",
            price: 220,
            description: "For precision handling and grip.",
            image: "./performance-tire-2.webp",
            rating: 4.8,
            availability: "In Stock",
            sizes: ["235/50R18", "245/45R19"],
            category: "Performance",
            discount: 20,  // 20% off
            id: "P3-005",
            brand: "BrandY"
        },
        {
            name: "Off-Road Tire O4",
            price: 190,
            description: "Built for adventure and endurance.",
            image: "./off-road-tire-2.webp",
            rating: 4.3,
            availability: "In Stock",
            sizes: ["275/70R17", "285/75R16"],
            category: "Off-Road",
            discount: 0,  // No discount
            id: "O4-006",
            brand: "BrandZ"
        }
    ]);

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('');

    const handleSearch = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    const handleSort = (event) => {
        const sortCriteria = event.target.value;
        setSortOption(sortCriteria);

        let sortedCatalog = [...catalog];
        if (sortCriteria === 'Price: Low to High') {
            sortedCatalog.sort((a, b) => a.price - b.price);
        } else if (sortCriteria === 'Price: High to Low') {
            sortedCatalog.sort((a, b) => b.price - a.price);
        }
        setCatalog(sortedCatalog);
    };

    const filteredCatalog = catalog.filter((item) =>
        item.name.toLowerCase().includes(searchQuery)
    );

    return (
        <div>
            <Helmet>
                <title>Tire Sales | Dat A Boi Enterprises</title>
                <meta name="description" content="Shop high-quality tires at unbeatable prices from Dat A Boi Enterprises. Explore our wide selection of car, truck, and SUV tires with fast delivery and expert advice." />
                <meta name="keywords" content="tire sales, buy tires, car tires, truck tires, SUV tires, affordable tires, tire shop, tire delivery" />
                <meta name="robots" content="index, follow" />
            </Helmet>
            <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                {/* Header */}
                <header className="bg-black py-6 shadow-lg sticky top-0 z-10">
                    <div className="container mx-auto px-8 flex justify-between items-center">
                        <h1 className="text-3xl font-extrabold tracking-wide">
                            Dat A Boi <span className="text-clemsonOrange">Tires</span>
                        </h1>
                        <a
                            href="/dat-a-boi-landing-page/"
                            className="text-gray-400 hover:text-white transition text-sm md:text-base underline"
                        >
                            Back to Home
                        </a>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="bg-gray-700 text-center py-12 px-4">
                    <h2 className="text-4xl font-extrabold mb-4">Find the Perfect Tire for Your Ride</h2>
                    <p className="text-lg md:text-xl mb-6">
                        Explore our wide selection of premium tires for every vehicle and terrain.
                    </p>
                    <button onClick={scrollToSearchAndFilter} className="w-auto px-6 py-3 bg-gradient-to-b from-clemsonOrange to-campusBrick rounded-full shadow-md shadow-black/50 hover:outline hover:outline-orange-500 focus:outline focus:outline-orange-500 transition-all duration-100 active:from-campusBrick active:to-orange-800 active:translate-y-px">
                        Shop Now
                    </button>
                </section>

                {/* Main Content */}
                <main className="flex-grow flex flex-col items-center px-8 py-12">
                    <section className="max-w-5xl text-center mb-12">
                        <h2 className="text-4xl font-extrabold mb-6">Premium Tires for Every Need</h2>
                    </section>

                    {/* Tire Categories */}
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mb-8">
                        {tireCategories.map((tire, index) => (
                            <TireCard
                                key={index}
                                title={tire.title}
                                description={tire.description}
                                icon={tire.icon}
                                accentColor={tire.accentColor}
                            />
                        ))}
                    </section>

                    {/* Search and Sort */}
                    <div ref={searchAndFilterRef} className="w-full max-w-6xl mb-8">
                        <div className="flex flex-wrap items-center gap-4 bg-gray-800 p-4 rounded-lg shadow-md">
                            <input
                                type="text"
                                placeholder="Search tires..."
                                className="flex-1 px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring focus:ring-clemsonOrange focus:outline-none shadow-sm"
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                            <select
                                className="flex-shrink-0 px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring focus:ring-clemsonOrange focus:outline-none shadow-sm"
                                value={sortOption}
                                onChange={handleSort}
                            >
                                <option value="">Sort by</option>
                                <option value="Price: Low to High">Price: Low to High</option>
                                <option value="Price: High to Low">Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    {/* Catalog Section */}
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
                        {filteredCatalog.map((product) => (
                            <div
                                key={product.id} // Use unique `id` for the key
                                className="bg-gray-700 rounded-lg shadow-lg p-6 text-center cursor-pointer"
                                onClick={() => openTireDetails(product)} // Open modal on card click
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                                <h4 className="text-xl font-bold mb-2 text-clemsonOrange">{product.name}</h4>
                                <p className="text-gray-300">{product.description}</p>
                                <p className="text-lg font-semibold mt-4">${product.price}</p>

                                {/* Add to Cart Button */}
                                <button
                                    className={`mt-4 px-6 py-2 bg-gradient-to-b from-clemsonOrange to-campusBrick shadow-md shadow-black/50 hover:outline hover:outline-orange-500 focus:outline focus:outline-orange-500 transition-all duration-100 active:from-campusBrick active:to-orange-800 active:translate-y-px text-white rounded-lg`}
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent modal from opening when clicking the Add to Cart button
                                        addToCart(product); // Add to Cart function
                                    }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))}
                    </section>

                    {/* Display Modal if a tire is selected */}
                    {selectedTire && (
                        <TireDetailsModal tire={selectedTire} onClose={closeTireDetails} addToCart={addToCart} />
                    )}

                </main>

                {/* Floating Action Button */}
                <div className="fixed bottom-8 right-8 z-50">
                    <button
                        className="relative bg-gradient-to-b from-clemsonOrange to-campusBrick shadow-md shadow-black/50 hover:outline hover:outline-orange-500 focus:outline focus:outline-orange-500 transition-all duration-100 active:from-campusBrick active:to-orange-800 active:translate-y-px text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl"
                        onClick={toggleCart}
                    >
                        <i className="fas fa-shopping-cart"></i>
                        {/* Badge */}
                        {cart.length > 0 && (
                            <span className="absolute top-0 right-0 bg-regalia text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {cart.length}
                            </span>
                        )}
                    </button>
                </div>

                {/* Cart Drawer */}
                {isCartOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-20"
                        onClick={() => setIsCartOpen(false)} // Close cart when overlay is clicked
                    >
                        <div
                            className="fixed top-0 right-0 h-full w-80 bg-gray-800 shadow-lg p-6 z-30"
                            onClick={(e) => e.stopPropagation()} // Prevent click event from propagating to overlay
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-2xl font-bold">Your Cart</h3>
                                <button
                                    className="text-gray-400 hover:text-white transition"
                                    onClick={() => setIsCartOpen(false)} // Close cart when close button is clicked
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                            {cart.length === 0 ? (
                                <p className="text-gray-400">Your cart is empty.</p>
                            ) : (
                                <ul className="space-y-4">
                                    {cart.map((item) => (
                                        <li key={item.name} className="flex justify-between items-center">
                                            <div>
                                                <p className="font-bold text-clemsonOrange">{item.name}</p>
                                                <p className="text-sm text-gray-400">
                                                    ${item.price} × {item.quantity}
                                                </p>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button
                                                    className="px-3 py-1 bg-gradient-to-b from-red-500 to-red-700 shadow-md shadow-black/50 hover:outline hover:outline-red-400 focus:outline focus:outline-red-400 transition-all duration-100 active:from-red-700 active:to-red-900 active:translate-y-px text-white rounded-lg"
                                                    onClick={() => removeFromCart(item.name)}
                                                >
                                                    −
                                                </button>
                                                <button
                                                    className="px-3 py-1 bg-gradient-to-b from-green-500 to-green-700 shadow-md shadow-black/50 hover:outline hover:outline-green-400 focus:outline focus:outline-green-400 transition-all duration-100 active:from-green-700 active:to-green-900 active:translate-y-px text-white rounded-lg"
                                                    onClick={() => addToCart(item)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <div className="mt-6">
                                <p className="text-lg font-bold">Total: ${totalPrice.toFixed(2)}</p>
                                <button
                                    className="mt-4 w-full py-2 bg-gradient-to-b from-clemsonOrange to-campusBrick shadow-md shadow-black/50 hover:outline hover:outline-orange-500 focus:outline focus:outline-orange-500 transition-all duration-100 active:from-campusBrick active:to-orange-800 active:translate-y-px text-white rounded-lg"
                                >
                                    Checkout
                                </button>
                            </div>
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
                    <h3 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h3>
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
                            className={`py-2 px-6 bg-gradient-to-b from-clemsonOrange to-campusBrick shadow-md shadow-black/50 hover:outline hover:outline-orange-500 focus:outline focus:outline-orange-500 transition-all duration-100 active:from-campusBrick active:to-orange-800 active:translate-y-px text-white rounded-lg ${isSending ? 'bg-gray-500 cursor-not-allowed' : ''
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
        </div>
    );
}

export default TireSales;
