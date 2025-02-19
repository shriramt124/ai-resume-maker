import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';

const TemplatesGallery = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const templates = [
    {
      id: 1,
      name: "Modern Professional",
      category: "Professional",
      type: ["experienced"],
      color: "from-blue-400 to-purple-500",
      previewImage: "https://placehold.co/300x400/1a1a1a/ffffff?text=Modern+Professional"
    },
    {
      id: 2,
      name: "Creative Designer",
      category: "Creative",
      type: ["experienced", "fresher"],
      color: "from-pink-400 to-red-500",
      previewImage: "https://placehold.co/300x400/1a1a1a/ffffff?text=Creative+Designer"
    },
    {
      id: 3,
      name: "Executive Suite",
      category: "Business",
      type: ["experienced"],
      color: "from-green-400 to-teal-500",
      previewImage: "https://placehold.co/300x400/1a1a1a/ffffff?text=Executive+Suite"
    },
    {
      id: 4,
      name: "Minimalist",
      category: "Simple",
      type: ["fresher", "student"],
      color: "from-gray-400 to-gray-600",
      previewImage: "https://placehold.co/300x400/1a1a1a/ffffff?text=Minimalist"
    },
    {
      id: 5,
      name: "Student Classic",
      category: "Academic",
      type: ["student"],
      color: "from-blue-400 to-indigo-500",
      previewImage: "https://placehold.co/300x400/1a1a1a/ffffff?text=Student+Classic"
    },
    {
      id: 6,
      name: "Fresh Graduate",
      category: "Entry Level",
      type: ["fresher", "student"],
      color: "from-purple-400 to-pink-500",
      previewImage: "https://placehold.co/300x400/1a1a1a/ffffff?text=Fresh+Graduate"
    },
  ];

  const filters = [
    { id: 'all', label: 'All Templates' },
    { id: 'experienced', label: 'Experienced' },
    { id: 'fresher', label: 'Fresher' },
    { id: 'student', label: 'Student' },
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || template.type.includes(selectedFilter);
    return matchesSearch && matchesFilter;
  });

  return (
    <section className="py-12 md:py-24 bg-gray-900/50 min-h-screen relative overflow-hidden">
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
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Resume Templates
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Choose from our collection of professional resume templates
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative w-full md:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                className="w-full md:w-auto px-6 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl backdrop-blur-sm flex items-center justify-center gap-2 hover:bg-gray-800/70 transition-all duration-300"
              >
                <Filter className="w-5 h-5" />
                <span>Filter: {filters.find(f => f.id === selectedFilter)?.label}</span>
              </motion.button>

              <AnimatePresence>
                {isFilterMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute z-50 mt-2 w-full md:w-64 bg-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-xl"
                  >
                    {filters.map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => {
                          setSelectedFilter(filter.id);
                          setIsFilterMenuOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-700/50 transition-colors ${selectedFilter === filter.id ? 'bg-blue-500/20 text-blue-400' : ''}`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <AnimatePresence>
            {filteredTemplates.map((template) => (
              <motion.div
                key={template.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative group"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden bg-white/5 backdrop-blur-2xl border border-white/10 relative">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-border-glow" />
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-gray-800/90" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-10`} />
                  <img
                    src={template.previewImage}
                    alt={template.name}
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
                  />
                  
                  {/* Hover Overlay with Glassmorphism */}
                  <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-8">
                    <div className="bg-white/10 backdrop-blur-xl p-8 rounded-xl border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        {template.name}
                      </h3>
                      <p className="text-gray-300 text-base mb-6">{template.category}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {template.type.map((type) => (
                          <span
                            key={type}
                            className="px-3 py-1 rounded-full bg-white/10 text-sm text-gray-300"
                          >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </span>
                        ))}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-colors flex items-center justify-center gap-2 text-lg shadow-lg"
                      >
                        Use Template
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default TemplatesGallery;