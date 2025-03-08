import React, { useState, useEffect } from 'react';
import { ChevronDown, Search, Mail, X, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProfessionalFAQSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [highlightedText, setHighlightedText] = useState([]);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

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
      question: "How secure is my data?",
      answer: "We take data security seriously. All your information is encrypted and stored securely. We never share your personal data with third parties without your explicit consent."
    },
    {
      question: "How does ResumeAI help improve my resume?",
      answer: "ResumeAI uses advanced algorithms to analyze your experience and skills, suggesting impactful phrases and formatting improvements. It ensures your resume is ATS-friendly and highlights your key achievements effectively."
    },
    
  ];

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setHighlightedText([]);
      return;
    }
    const query = searchQuery.toLowerCase();
    const newHighlightedText = faqs.map(faq => {
      const questionMatches = getMatchPositions(faq.question.toLowerCase(), query);
      const answerMatches = getMatchPositions(faq.answer.toLowerCase(), query);
      return { questionMatches, answerMatches };
    });
    setHighlightedText(newHighlightedText);
  }, [searchQuery]);

  const getMatchPositions = (text, query) => {
    const matches = [];
    let index = text.indexOf(query);
    while (index !== -1) {
      matches.push({ start: index, end: index + query.length });
      index = text.indexOf(query, index + 1);
    }
    return matches;
  };

  const highlightText = (text, matches) => {
    if (!matches || matches.length === 0 || searchQuery.trim() === '') {
      return text;
    }
    let result = [];
    let lastEnd = 0;
    matches.forEach((match, index) => {
      if (match.start > lastEnd) {
        result.push(text.substring(lastEnd, match.start));
      }
      result.push(
        <span key={index} className="bg-blue-500/30 text-white font-medium px-1 rounded">
          {text.substring(match.start, match.end)}
        </span>
      );
      lastEnd = match.end;
    });
    if (lastEnd < text.length) {
      result.push(text.substring(lastEnd));
    }
    return result;
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    // Simulate form submission
    setTimeout(() => {
      setShowContactForm(false);
      setFormSubmitted(false);
      setFormState({ name: '', email: '', message: '' });
    }, 2000);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-950 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-6">
            Everything you need to know about ResumeAI. Can't find the answer you're looking for? Feel free to contact us.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowContactForm(true)}
            className="inline-flex items-center px-5 py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg font-medium text-sm transition-all duration-200 gap-2 group"
          >
            <MessageSquare className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
            Ask a Question
          </motion.button>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <motion.div
            className={`relative transition-all duration-300 ${searchFocused ? 'scale-105' : 'scale-100'}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${searchFocused ? 'text-blue-400' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full pl-12 pr-4 py-4 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700/50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        </div>

        {/* FAQ Accordion */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {filteredFaqs.length === 0 ? (
            <motion.div
              className="text-center py-12 px-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-2">No results found for "{searchQuery}"</p>
              <p className="text-gray-500 text-sm">Try a different search term or browse all questions.</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                Clear Search
              </button>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => {
                const isExpanded = expandedIndex === index;
                const faqHighlights = highlightedText[faqs.indexOf(faq)];
                return (
                  <motion.div
                    key={index}
                    className={`bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden shadow-lg transition-all duration-300 ${isExpanded ? 'shadow-blue-500/5' : ''}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <button
                      className={`w-full text-left p-6 flex justify-between items-center focus:outline-none group ${isExpanded ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10' : ''}`}
                      onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    >
                      <h3 className="font-semibold text-lg pr-4">
                        {searchQuery && faqHighlights ?
                          highlightText(faq.question, faqHighlights.questionMatches) :
                          faq.question
                        }
                      </h3>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isExpanded ? 'bg-blue-500/20' : 'bg-gray-700/50'}`}>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'transform rotate-180' : ''}`}
                        />
                      </div>
                    </button>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 border-t border-gray-700/30 pt-4">
                            <p className="text-gray-300">
                              {searchQuery && faqHighlights ?
                                highlightText(faq.answer, faqHighlights.answerMatches) :
                                faq.answer
                              }
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* FAQ count indicator */}
        <div className="flex justify-center mt-12">
          <div className="bg-gray-800/50 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-700/30">
            <span className="text-gray-400 font-medium">
              <span className="text-blue-400 font-bold">{faqs.length}</span> frequently asked questions
            </span>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {showContactForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowContactForm(false)}
          >
            <motion.div
              className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-full max-w-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-200">
                  {formSubmitted ? 'Message Sent!' : 'Contact Us'}
                </h3>
                {!formSubmitted && (
                  <button
                    onClick={() => setShowContactForm(false)}
                    className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                )}
              </div>

              {formSubmitted ? (
                <div className="text-center py-8">
                  <Mail className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <p className="text-gray-300 mb-2">Your message has been sent!</p>
                  <p className="text-gray-500 text-sm">We'll get back to you within 24 hours</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                    <input
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                    <textarea
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full inline-flex items-center justify-center px-5 py-3 bg-blue-500 hover:bg-blue-600 border border-transparent rounded-lg font-medium text-white transition-all duration-200 gap-2 group"
                  >
                    <MessageSquare className="w-5 h-5 group-hover:text-white" />
                    Send Message
                  </motion.button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProfessionalFAQSection;