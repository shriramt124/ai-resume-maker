import React from 'react';

const ProfessionalCallToAction = () => {
  return (
    <section className="py-20 bg-gray-950">
      <div className="container mx-auto px-6">
        <div className="bg-gray-800 rounded-xl p-12 text-center relative overflow-hidden border border-gray-700 shadow-lg">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Build Your Perfect Resume?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of job seekers who have successfully landed their dream jobs
              using ResumeAI.
            </p>
            <button
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalCallToAction;