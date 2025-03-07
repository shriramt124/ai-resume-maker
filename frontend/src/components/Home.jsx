import React from 'react';
import HeroSection from './sections/HeroSection';
import FeaturesSection from './sections/FeaturesSection';
import CallToAction from './sections/CallToAction';
import TestimonialsSection from './sections/TestimonialsSection';
import FAQSection from './sections/FAQSection';
import TemplateShowcase from './TemplateShowCase';

const ResumeHomePage = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden">
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