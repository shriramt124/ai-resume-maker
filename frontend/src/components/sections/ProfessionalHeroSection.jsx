import React, { useState, useEffect, useRef } from 'react';
import {
    ArrowRight
} from 'lucide-react';
import img1 from "../../assets/r2.png"
import img2 from "../../assets/r4.jpg"
import img3 from "../../assets/r3.jpg"
const ProfessionalHeroSection = () => {
    const [activeTemplate, setActiveTemplate] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const carouselRef = useRef(null);
    
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
    
    // Auto-scrolling is handled by the useEffect

    const templates = [
        { color: 'bg-blue-500', name: 'Modern', image: img1 },
        { color: 'bg-green-500', name: 'Professional', image: img2 },
        { color: 'bg-orange-500', name: 'Creative', image: img3 }
    ];
    
    // Duplicate templates array to create infinite scroll effect
    const extendedTemplates = [...templates, ...templates, ...templates];

    return (
        <section className="py-20 bg-gray-950">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Left Content */}
                    <div className="lg:w-1/2">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Create Your Perfect
                            <span className="block text-blue-500">
                                Resume in Minutes
                            </span>
                        </h1>

                        <p className="text-xl text-gray-400 mb-8">
                            Leverage AI to craft professional resumes that stand out.
                            Get more interviews with smart suggestions and beautiful templates.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors duration-200"
                            >
                                Start Building Free
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Stats with percentages */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
                            <div className="flex flex-col">
                                <div className="bg-green-100/10 rounded-lg p-4 mb-2">
                                    <span className="text-4xl font-bold text-green-500">39%</span>
                                </div>
                                <p className="text-gray-400">more likely to get hired</p>
                            </div>
                            
                            <div className="flex flex-col">
                                <div className="bg-yellow-100/10 rounded-lg p-4 mb-2">
                                    <span className="text-4xl font-bold text-yellow-500">8%</span>
                                </div>
                                <p className="text-gray-400">better pay with your next job</p>
                            </div>
                            
                            <div className="flex flex-col">
                                <div className="bg-blue-100/10 rounded-lg p-4 mb-2">
                                    <span className="text-4xl font-bold text-blue-500">3x</span>
                                </div>
                                <p className="text-gray-400">more interview callbacks</p>
                            </div>
                            
                            <div className="flex flex-col">
                                <div className="bg-purple-100/10 rounded-lg p-4 mb-2">
                                    <span className="text-4xl font-bold text-purple-500">75%</span>
                                </div>
                                <p className="text-gray-400">faster resume creation</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Template Preview Carousel */}
                    <div className="lg:w-1/2 relative">
                        {/* Carousel with fade effect overlays */}
                        <div className="relative overflow-hidden rounded-xl">
                            {/* Left fade gradient overlay */}
                            <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-gray-950/60 via-gray-950/40 to-transparent pointer-events-none"></div>

                            {/* Right fade gradient overlay */}
                            <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-gray-950/60 via-gray-950/40 to-transparent pointer-events-none"></div>
                        
                            {/* Carousel */}
                            <div 
                                ref={carouselRef}
                                className="carousel flex overflow-x-auto gap-4 py-4 px-8 scrollbar-hide scroll-smooth"
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
                                    <div 
                                        key={`template-${index}`} 
                                        className="flex-shrink-0 w-full px-2 transition-all duration-500 transform hover:scale-105"
                                    >
                                        <div className="relative aspect-[3/4] bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-700 hover:shadow-2xl hover:border-gray-600 transition-all duration-500">
                                            <div className={`absolute inset-0 ${template.color} opacity-20`}></div>
                                            
                                            {/* Template Image Display */}
                                            <div className="absolute inset-0">
                                                <img
                                                    src={template.image}
                                                    alt={`${template.name} Template`}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                                    <h3 className="text-xl font-bold mb-1">
                                                        {template.name} Template
                                                    </h3>
                                                    <p className="text-sm text-gray-300">
                                                        Professional and customizable
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

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

export default ProfessionalHeroSection;