import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Download } from 'lucide-react';

const TemplateShowcase = () => {
  const [currentTemplate, setCurrentTemplate] = useState(0);
  const [direction, setDirection] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const templates = [
    {
      name: "Modern Professional",
      category: "Professional",
      rating: 4.9,
      downloads: "12k+",
      color: "from-blue-400 to-purple-500",
      previewImage: "/api/placeholder/300/400"
    },
    {
      name: "Creative Designer",
      category: "Creative",
      rating: 4.8,
      downloads: "8k+",
      color: "from-pink-400 to-red-500",
      previewImage: "/api/placeholder/300/400"
    },
    {
      name: "Executive Suite",
      category: "Business",
      rating: 4.7,
      downloads: "15k+",
      color: "from-green-400 to-teal-500",
      previewImage: "/api/placeholder/300/400"
    },
    {
      name: "Minimalist",
      category: "Simple",
      rating: 4.9,
      downloads: "20k+",
      color: "from-gray-400 to-gray-600",
      previewImage: "/api/placeholder/300/400"
    }
  ];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentTemplate((prev) => (prev + newDirection + templates.length) % templates.length);
  };

  return (
    <section className="py-12 md:py-24 bg-gray-900/50 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/50 to-gray-900">
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 300 + 50}px`,
                height: `${Math.random() * 300 + 50}px`,
                background: `radial-gradient(circle at center, ${
                  ['rgba(59,130,246,0.1)', 'rgba(147,51,234,0.1)', 'rgba(236,72,153,0.1)'][
                    Math.floor(Math.random() * 3)
                  ]
                } 0%, transparent 70%)`,
                transform: `scale(${Math.random() * 1 + 0.5})`,
                animation: `float ${Math.random() * 10 + 10}s infinite linear`
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Professional Templates
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg px-4">
            Choose from our collection of professionally designed templates. 
            Each template is ATS-friendly and fully customizable.
          </p>
        </motion.div>

        {/* Showcase Container */}
        <div className="max-w-6xl mx-auto">
          <div className="relative min-h-[500px] md:min-h-[600px]">
            {/* Template Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTemplate}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="grid md:grid-cols-2 gap-4 md:gap-8 items-center p-4 md:p-6 relative"
                onMouseMove={handleMouseMove}
              >
                {/* Navigation Arrows - Now positioned relative to the grid container */}
                <div className="absolute top-[15%] md:top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none z-20 px-2 md:px-4 w-full">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-lg border border-white/20 pointer-events-auto hover:bg-white/20 transition-colors -translate-x-1/2 md:-translate-x-6"
                    onClick={() => paginate(-1)}
                  >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-lg border border-white/20 pointer-events-auto hover:bg-white/20 transition-colors translate-x-1/2 md:translate-x-6"
                    onClick={() => paginate(1)}
                  >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                  </motion.button>
                </div>

                {/* Template Preview Card */}
                <motion.div
                  className="relative aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden shadow-2xl mx-auto w-full max-w-[300px] md:max-w-none"
                  style={{
                    perspective: "1000px",
                    transform: `rotateY(${(mousePosition.x - 0.5) * 10}deg) rotateX(${(mousePosition.y - 0.5) * -10}deg)`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${templates[currentTemplate].color} opacity-20`} />
                  <img 
                    src={templates[currentTemplate].previewImage}
                    alt={templates[currentTemplate].name}
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                </motion.div>

                {/* Template Info */}
                <div className="flex flex-col justify-center space-y-4 md:space-y-8 text-center md:text-left">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                      {templates[currentTemplate].name}
                    </h3>
                    <div className="flex items-center justify-center md:justify-start gap-2 md:gap-4 mb-4 md:mb-6 flex-wrap">
                      <span className="px-3 md:px-4 py-1 md:py-1.5 bg-white/10 rounded-full text-sm font-medium backdrop-blur-sm">
                        {templates[currentTemplate].category}
                      </span>
                      <div className="flex items-center gap-1 md:gap-2">
                        <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-yellow-400" />
                        <span>{templates[currentTemplate].rating}</span>
                      </div>
                      <div className="flex items-center gap-1 md:gap-2">
                        <Download className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                        <span>{templates[currentTemplate].downloads}</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm md:text-lg leading-relaxed px-4 md:px-0">
                      Perfect for {templates[currentTemplate].category.toLowerCase()} roles. 
                      Optimized for ATS systems and highly customizable to match your style.
                    </p>
                  </motion.div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start px-4 md:px-0">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-colors text-sm md:text-base"
                    >
                      Use This Template
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors text-sm md:text-base"
                    >
                      Preview
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Template Indicators */}
            <div className="flex justify-center gap-2 md:gap-3 mt-4 md:mt-8">
              {templates.map((_, index) => (
                <motion.button
                  key={index}
                  className={`relative h-1.5 rounded-full transition-all duration-300 ${
                    currentTemplate === index ? 'w-6 md:w-8 bg-blue-500' : 'w-3 md:w-4 bg-gray-600'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => {
                    setDirection(index > currentTemplate ? 1 : -1);
                    setCurrentTemplate(index);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TemplateShowcase;