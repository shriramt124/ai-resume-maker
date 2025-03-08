import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Download, ArrowRight, Eye } from 'lucide-react';
import img1 from "../assets/r2.png"
import img2 from "../assets/r4.jpg"
import img3 from "../assets/r3.jpg"
import img4 from "../assets/r5.png"

const ProfessionalTemplateShowcase = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const carouselRef = useRef(null);

    // Expanded template data with more options
    const templates = [
        {
            id: 1,
            name: "Modern Professional",
            category: "Professional",
            color: "bg-blue-500",
            previewImage: img1,
            rating: 5,
            users: 120,
            description: "Clean and professional design perfect for corporate environments."
        },
        {
            id: 2,
            name: "Creative Designer",
            category: "Creative",
            color: "bg-pink-500",
            previewImage: img2,
            rating: 4.9,
            users: 98,
            description: "Stand out with this bold template for creative professionals."
        },
        {
            id: 3,
            name: "Executive Suite",
            category: "Business",
            color: "bg-green-500",
            previewImage: img3,
            rating: 4.8,
            users: 85,
            description: "Elegant and sophisticated design for senior professionals."
        },
        {
            id: 4,
            name: "Minimalist",
            category: "Simple",
            color: "bg-gray-500",
            previewImage: img4,
            rating: 4.7,
            users: 110,
            description: "Clean, simple design that lets your experience speak for itself."
        },
        {
            id: 5,
            name: "Tech Innovator",
            category: "Technology",
            color: "bg-purple-500",
            previewImage: img1,
            rating: 4.9,
            users: 75,
            description: "Modern template designed for tech professionals and developers."
        },
        {
            id: 6,
            name: "Healthcare Professional",
            category: "Healthcare",
            color: "bg-teal-500",
            previewImage: img3,
            rating: 4.8,
            users: 62,
            description: "Specialized template for medical and healthcare professionals."
        },
        {
            id: 7,
            name: "Academic CV",
            category: "Education",
            color: "bg-amber-500",
            previewImage: img2,
            rating: 4.7,
            users: 55,
            description: "Comprehensive template for academic and research positions."
        },
        {
            id: 8,
            name: "Graduate Entry",
            category: "Entry Level",
            color: "bg-indigo-500",
            previewImage: img4,
            rating: 4.6,
            users: 130,
            description: "Perfect for recent graduates and those new to the workforce."
        }
    ];

    // Duplicate templates array to create infinite scroll effect
    const extendedTemplates = [...templates, ...templates];

    // Mouse event handlers for draggable carousel
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - carouselRef.current.offsetLeft);
        setScrollLeft(carouselRef.current.scrollLeft);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carouselRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed multiplier
        carouselRef.current.scrollLeft = scrollLeft - walk;
    };

    // Touch event handlers for mobile
    const handleTouchStart = (e) => {
        setIsDragging(true);
        setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
        setScrollLeft(carouselRef.current.scrollLeft);
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        carouselRef.current.scrollLeft = scrollLeft - walk;
    };

    // Auto scroll effect
    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        const autoScroll = setInterval(() => {
            if (!isDragging) {
                carousel.scrollLeft += 1; // Slow continuous scroll

                // Reset scroll position when reaching the end to create infinite effect
                if (carousel.scrollLeft >= (carousel.scrollWidth - carousel.clientWidth) / 2) {
                    carousel.scrollLeft = 0;
                }
            }
        }, 30);

        return () => clearInterval(autoScroll);
    }, [isDragging]);

    // Scroll left/right with buttons
    const handleScrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollLeft -= 300;
        }
    };

    const handleScrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollLeft += 300;
        }
    };

    // Template card component
    const TemplateCard = ({ template }) => {
        const [isHovered, setIsHovered] = useState(false);

        return (
            <div
                className="flex-shrink-0 w-[350px] mx-4 transition-all duration-500 transform hover:scale-105"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    opacity: 1,
                    transition: 'all 0.5s ease',
                }}
            >
                <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-xl h-full relative group hover:shadow-2xl hover:border-gray-600 transition-all duration-500">
                    {/* Template Preview */}
                    <div className="relative h-full">
                        <div className={`absolute inset-0 ${template.color} opacity-20`}></div>
                        <img
                            src={template.previewImage}
                            alt={template.name}
                            className="w-full h-full object-cover"
                        />

                        {/* Hover overlay with information only (buttons removed) */}
                        <div
                            className={`absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/90 to-transparent flex flex-col items-center justify-end p-6 transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <div className="w-full">
                                <h3 className="font-bold text-2xl mb-2">{template.name}</h3>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`inline-block px-2 py-1 rounded-full ${template.color} bg-opacity-20 text-xs font-medium`}>
                                        {template.category}
                                    </span>
                                    <div className="flex items-center">
                                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                        <span className="text-xs text-gray-400 ml-1">{template.rating}</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-400 mb-4">{template.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-950 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Proven resume templates</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-6">
                        These resume templates are here because they work.
                        Every one is tried and tested on real hiring managers
                    </p>
                    <div className="flex justify-center md:justify-end">
                        <a
                            href="/templates"
                            className="px-6 py-3 rounded-lg font-semibold bg-gray-800 border border-gray-700 hover:bg-gray-700 transition-colors duration-200 flex items-center gap-2 group"
                        >
                            View All Templates
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>

                {/* Carousel Container */}
                <div className="relative max-w-7xl mx-auto">
                    {/* Carousel with fade effect overlays */}
                    <div className="relative overflow-hidden">
                        {/* Left fade gradient overlay */}
                        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent pointer-events-none"></div>

                        {/* Right fade gradient overlay */}
                        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-gray-900 via-gray-900/80 to-transparent pointer-events-none"></div>

                        {/* Carousel */}
                        <div
                            ref={carouselRef}
                            className="carousel flex overflow-x-auto gap-4 py-8 px-8 scrollbar-hide scroll-smooth"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            onMouseMove={handleMouseMove}
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleMouseUp}
                            onTouchMove={handleTouchMove}
                        >
                            {/* Render duplicated templates for infinite effect */}
                            {extendedTemplates.map((template, index) => (
                                <TemplateCard key={`${template.id}-${index}`} template={template} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Template count indicator */}
                <div className="flex justify-center mt-8">
                    <div className="bg-gray-800/50 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-700/30">
                        <span className="text-gray-400 font-medium">
                            <span className="text-blue-400 font-bold">{templates.length}</span> professional templates available
                        </span>
                    </div>
                </div>
            </div>

            {/* Custom CSS for hiding scrollbar */}
            <style jsx>{`
        .carousel::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </section>
    );
};

export default ProfessionalTemplateShowcase;