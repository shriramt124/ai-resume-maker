import React from 'react';
import ProfessionalHeroSection from './sections/ProfessionalHeroSection';
import ProfessionalStatsSection from './sections/ProfessionalStatsSection';
import ProfessionalFeaturesSection from './sections/ProfessionalFeaturesSection';
import ProfessionalCallToAction from './sections/ProfessionalCallToAction';
import ProfessionalTestimonialsSection from './sections/ProfessionalTestimonialsSection';
import ProfessionalFAQSection from './sections/ProfessionalFAQSection';
import ProfessionalTemplateShowcase from './ProfessionalTemplateShowcase';
import ProfessionalCoverLetterShowcase from './ProfessionalCoverLetterShowcase';

const ProfessionalHome = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <ProfessionalHeroSection />
      <ProfessionalStatsSection />
      <ProfessionalFeaturesSection />
      <ProfessionalTemplateShowcase />
      <ProfessionalCoverLetterShowcase />
      <ProfessionalTestimonialsSection />
      <ProfessionalFAQSection />
      <ProfessionalCallToAction />
    </div>
  );
};

export default ProfessionalHome;