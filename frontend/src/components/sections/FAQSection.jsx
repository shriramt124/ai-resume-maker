import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';

const FAQSection = () => {
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
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Everything you need to know about ResumeAI. Can't find the answer you're looking for? Feel free to contact us.
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence>
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="mb-4"
              >
                <motion.button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className={`w-full p-6 text-left bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl transition-all duration-300 ${expandedIndex === index ? 'ring-2 ring-blue-500' : 'hover:bg-gray-800/70'}`}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold pr-8">{faq.question}</h3>
                    <motion.div
                      animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {expandedIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="mt-4 text-gray-400 leading-relaxed">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;