import React from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
    Users,
    Layout,
    Star,
    ArrowRight
} from 'lucide-react';

const HeroSection = () => {
  const [isHoveringDemo, setIsHoveringDemo] = React.useState(false);
  const { scrollY } = useScroll();
  const [activeTemplate, setActiveTemplate] = React.useState(0);

  // Parallax and scroll effects
  const headerY = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  // Auto-rotate templates
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveTemplate((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const templates = [
    { color: 'from-blue-400 to-purple-500', name: 'Modern' },
    { color: 'from-green-400 to-teal-500', name: 'Professional' },
    { color: 'from-orange-400 to-red-500', name: 'Creative' }
  ];

  return (
    <motion.section
      style={{ y: headerY }}
      className="min-h-screen pt-24 relative"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Create Your Perfect
              <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Resume in Minutes
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-400 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Leverage AI to craft professional resumes that stand out. 
              Get more interviews with smart suggestions and beautiful templates.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2"
              >
                Start Building Free
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-gray-700 hover:border-gray-600 px-8 py-4 rounded-full font-semibold"
                onMouseEnter={() => setIsHoveringDemo(true)}
                onMouseLeave={() => setIsHoveringDemo(false)}
              >
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {[
                { icon: Users, value: '50K+', label: 'Active Users' },
                { icon: Layout, value: '100+', label: 'Templates' },
                { icon: Star, value: '4.9/5', label: 'User Rating' }
              ].map((stat, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="p-3 bg-gray-800 rounded-lg">
                    <stat.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Template Preview */}
          <motion.div 
            className="lg:w-1/2 relative"
            style={{ scale, opacity }}
          >
            <div className="relative w-full aspect-[3/4] bg-gray-800 rounded-lg overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTemplate}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className={`absolute inset-0 bg-gradient-to-br ${templates[activeTemplate].color} opacity-10`}
                />
              </AnimatePresence>
              
              {/* Template Content Placeholder */}
              <div className="absolute inset-0 p-8">
                <div className="h-full border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">
                      {templates[activeTemplate].name} Template
                    </h3>
                    <p className="text-gray-400">
                      Professional and customizable
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Template Selector */}
            <div className="flex justify-center mt-6 gap-4">
              {templates.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    activeTemplate === index ? 'bg-blue-500' : 'bg-gray-700'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setActiveTemplate(index)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;