import React from 'react';
import { motion} from 'framer-motion';
import HeroSection from './sections/HeroSection';
import FeaturesSection from './sections/FeaturesSection';
import CallToAction from './sections/CallToAction';
import TestimonialsSection from './sections/TestimonialsSection';
import FAQSection from './sections/FAQSection';
 
import TemplateShowcase from './TemplateShowCase';

const ResumeHomePage = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden">
      {/* Floating Elements Animation */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: Math.random() * window.innerWidth, y: -20 }}
            animate={{
              y: window.innerHeight + 20,
              x: Math.random() * window.innerWidth
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-2 h-2 bg-blue-500/20 rounded-full"
          />
        ))}
      </div>

      <HeroSection />
      <FeaturesSection />
      <TemplateShowcase />
      <TestimonialsSection />
      <FAQSection />
      <CallToAction />
    </div>
  );
};

export default ResumeHomePage;