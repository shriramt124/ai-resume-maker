import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [direction, setDirection] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "Google",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      text: "ResumeAI transformed my job search. The AI suggestions helped me highlight my achievements perfectly. Landed my dream job at Google!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      company: "Microsoft",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      text: "The templates are not just beautiful, they're ATS-friendly too. Got more interviews in two weeks than I did in months.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer",
      company: "Apple",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      text: "As a designer, I'm impressed by the aesthetic and functionality. Created a stunning resume that perfectly showcases my portfolio.",
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentTestimonial]);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gray-900/50">
      {/* Animated background elements */}
      <div className="absolute inset-0">
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

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Success Stories
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Join thousands of professionals who've transformed their careers with ResumeAI
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto relative">
          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between z-10 px-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-lg border border-white/20"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-lg border border-white/20"
              onClick={nextTestimonial}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Testimonials Carousel */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex flex-col items-center"
              >
                <div className="relative mb-8">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500/20"
                  >
                    <img
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -bottom-3 -right-3 bg-blue-500 rounded-full p-2"
                  >
                    <Quote className="w-4 h-4" />
                  </motion.div>
                </div>

                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    </motion.div>
                  ))}
                </div>

                <motion.blockquote
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl text-center max-w-4xl mb-6 text-gray-300 italic"
                >
                  {testimonials[currentTestimonial].text}
                </motion.blockquote>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center"
                >
                  <h3 className="text-xl font-semibold mb-2">{testimonials[currentTestimonial].name}</h3>
                  <p className="text-gray-400">
                    {testimonials[currentTestimonial].role} at{' '}
                    <span className="text-blue-400">{testimonials[currentTestimonial].company}</span>
                  </p>
                </motion.div>

                {/* Testimonial Navigation Dots */}
                <div className="flex justify-center gap-3 mt-8">
                  {testimonials.map((_, index) => (
                    <motion.button
                      key={index}
                      className={`h-2 rounded-full transition-all duration-300 ${currentTestimonial === index ? 'w-8 bg-blue-500' : 'w-2 bg-gray-600'}`}
                      whileHover={{ scale: 1.2 }}
                      onClick={() => {
                        setDirection(index > currentTestimonial ? 1 : -1);
                        setCurrentTestimonial(index);
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;