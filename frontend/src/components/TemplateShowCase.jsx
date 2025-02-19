import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Download, ArrowRight } from 'lucide-react';

const TemplateShowcase = () => {
  const [currentTemplate, setCurrentTemplate] = useState(0);
  const [direction, setDirection] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const templates = [
    {
      name: "Modern Professional",
      category: "Professional",
      color: "from-blue-400 to-purple-500",
      previewImage: "https://placehold.co/300x400/1a1a1a/ffffff?text=Modern+Professional"
    },
    {
      name: "Creative Designer",
      category: "Creative",
      color: "from-pink-400 to-red-500",
      previewImage: "https://placehold.co/300x400/1a1a1a/ffffff?text=Creative+Designer"
    },
    {
      name: "Executive Suite",
      category: "Business",
      color: "from-green-400 to-teal-500",
      previewImage: "https://placehold.co/300x400/1a1a1a/ffffff?text=Executive+Suite"
    },
    {
      name: "Minimalist",
      category: "Simple",
      color: "from-gray-400 to-gray-600",
      previewImage: "https://placehold.co/300x400/1a1a1a/ffffff?text=Minimalist"
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

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentTemplate]);

  return (
    <section className="py-8 md:py-24 bg-gray-900/50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `scale(${Math.random() * 1 + 0.5})`
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Choose Your Template
          </h2>
          <div className="flex justify-center md:justify-end mb-4 md:mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/templates'}
              className="px-4 md:px-6 py-2 md:py-3 text-sm md:text-base rounded-xl font-semibold bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
            >
              View All Templates
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </motion.button>
          </div>
        </motion.div>

        <div className="relative overflow-hidden">
          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between z-10 px-2 md:px-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-lg border border-white/20"
              onClick={() => paginate(-1)}
            >
              <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-lg border border-white/20"
              onClick={() => paginate(1)}
            >
              <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
            </motion.button>
          </div>

          {/* Templates Carousel */}
          <div className="overflow-hidden px-4 md:px-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTemplate}
                initial={{ opacity: 0, x: direction > 0 ? 200 : -200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -200 : 200 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center gap-4 md:gap-12"
              >
                {[...Array(3)].map((_, index) => {
                  const templateIndex = (currentTemplate + index - 1 + templates.length) % templates.length;
                  return (
                    <motion.div
                      key={index}
                      className="relative group"
                      whileHover={{ scale: 1.05, y: -10 }}
                      onMouseMove={handleMouseMove}
                    >
                      <div className="w-[280px] md:w-96 h-[24rem] md:h-[32rem] rounded-2xl overflow-hidden bg-white/5 backdrop-blur-2xl border border-white/10 relative">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-border-glow" />
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-gray-800/90" />
                        <div className={`absolute inset-0 bg-gradient-to-br ${templates[templateIndex].color} opacity-10`} />
                        <img
                          src={templates[templateIndex].previewImage}
                          alt={templates[templateIndex].name}
                          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
                        />
                        
                        {/* Hover Overlay with Glassmorphism */}
                        <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-4 md:p-8">
                          <div className="bg-white/10 backdrop-blur-xl p-4 md:p-8 rounded-xl border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{templates[templateIndex].name}</h3>
                            <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-8 text-center">{templates[templateIndex].category}</p>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="w-full px-4 md:px-8 py-2 md:py-4 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-colors flex items-center justify-center gap-2 md:gap-3 text-sm md:text-lg shadow-lg"
                            >
                              Use Template
                              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Template Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {templates.map((_, index) => (
              <motion.button
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${currentTemplate === index ? 'w-8 bg-blue-500' : 'w-2 bg-gray-600'}`}
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
    </section>
  );
};

export default TemplateShowcase;