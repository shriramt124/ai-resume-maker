import React from 'react';
import { motion } from 'framer-motion';

const SkillsForm = ({ formData, updateFormData, handleNext, handlePrevious }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({
      ...formData.skills,
      [name]: value
    }, 'skills');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Skills</h2>

      {/* Technical Skills */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Technical Skills</label>
        <textarea
          name="technical"
          value={formData.skills.technical}
          onChange={handleChange}
          rows="4"
          className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
          placeholder="Programming languages, frameworks, tools, etc. (e.g., JavaScript, React, Node.js)"
        />
      </div>

      {/* Soft Skills */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Soft Skills</label>
        <textarea
          name="soft"
          value={formData.skills.soft}
          onChange={handleChange}
          rows="4"
          className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
          placeholder="Communication, leadership, problem-solving, etc."
        />
      </div>

      {/* Languages */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Languages</label>
        <textarea
          name="languages"
          value={formData.skills.languages}
          onChange={handleChange}
          rows="4"
          className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
          placeholder="English (Native), Spanish (Fluent), etc."
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between space-x-4 mt-8">
        <motion.button
          type="button"
          onClick={handlePrevious}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-colors duration-200"
        >
          Previous
        </motion.button>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors duration-200"
        >
          Next Step
        </motion.button>
      </div>
    </form>
  );
};

export default SkillsForm;