import React, { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';

const ProfessionalFAQSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    {
      question: "How does ResumeAI help improve my resume?",
      answer: "ResumeAI uses advanced algorithms to analyze your experience and skills, suggesting impactful phrases and formatting improvements. It ensures your resume is ATS-friendly and highlights your key achievements effectively."
    },
    {
      question: "Are the templates ATS-friendly?",
      answer: "Yes, all our templates are specifically designed to be ATS (Applicant Tracking System) friendly. They use standard fonts, clear headings, and proper formatting that can be easily parsed by recruitment software."
    },
    {
      question: "Can I customize the templates?",
      answer: "Absolutely! Every template is fully customizable. You can modify colors, fonts, layouts, and sections to match your preferences while maintaining professional formatting."
    },
    {
      question: "How much does it cost?",
      answer: "We offer both free and premium plans. The free plan includes basic templates and features, while premium plans unlock advanced AI suggestions, unlimited exports, and premium templates."
    },
    {
      question: "Can I export my resume in different formats?",
      answer: "Yes, you can export your resume in multiple formats including PDF, Word, and plain text. Premium users also get access to special formats like LaTeX and web-based resume links."
    },
    {
      question: "How secure is my data?",
      answer: "We take data security seriously. All your information is encrypted and stored securely. We never share your personal data with third parties without your explicit consent."
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about ResumeAI. Can't find the answer you're looking for? Feel free to contact us.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">No results found. Try a different search term.</p>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => (
              <div 
                key={index} 
                className="mb-4 bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
              >
                <button
                  className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                >
                  <h3 className="font-semibold text-lg">{faq.question}</h3>
                  <ChevronDown 
                    className={`w-5 h-5 transition-transform duration-200 ${expandedIndex === index ? 'transform rotate-180' : ''}`} 
                  />
                </button>
                
                <div 
                  className={`px-6 overflow-hidden transition-all duration-200 ${expandedIndex === index ? 'pb-6 max-h-96' : 'max-h-0'}`}
                >
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfessionalFAQSection;