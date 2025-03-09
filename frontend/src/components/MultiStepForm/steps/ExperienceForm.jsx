import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';

const ExperienceForm = ({ formData, updateFormData, handleNext, handlePrevious }) => {
  const [experiences, setExperiences] = useState(formData.experience || []);

  const handleAddExperience = () => {
    setExperiences([...experiences, {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }]);
  };

  const handleRemoveExperience = (index) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(updatedExperiences);
    updateFormData(updatedExperiences, 'experience');
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = experiences.map((exp, i) => {
      if (i === index) {
        return { ...exp, [field]: value };
      }
      return exp;
    });
    setExperiences(updatedExperiences);
    updateFormData(updatedExperiences, 'experience');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Work Experience</h2>

      {experiences.map((experience, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="p-6 bg-gray-800/50 rounded-xl space-y-4 relative"
        >
          <button
            type="button"
            onClick={() => handleRemoveExperience(index)}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Company *</label>
            <input
              type="text"
              value={experience.company}
              onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
              required
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
              placeholder="Company Name"
            />
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Position *</label>
            <input
              type="text"
              value={experience.position}
              onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
              required
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
              placeholder="Job Title"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Start Date *</label>
              <input
                type="month"
                value={experience.startDate}
                onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                required
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">End Date</label>
              <input
                type="month"
                value={experience.endDate}
                onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                disabled={experience.current}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Current Position */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={`current-${index}`}
              checked={experience.current}
              onChange={(e) => handleExperienceChange(index, 'current', e.target.checked)}
              className="w-4 h-4 rounded border-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
            />
            <label htmlFor={`current-${index}`} className="text-sm text-gray-300">
              I currently work here
            </label>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              value={experience.description}
              onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
              rows="4"
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
              placeholder="Describe your responsibilities and achievements..."
            />
          </div>
        </motion.div>
      ))}

      {/* Add Experience Button */}
      <motion.button
        type="button"
        onClick={handleAddExperience}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 border-2 border-dashed border-gray-700 rounded-xl text-gray-400 hover:text-gray-300 hover:border-gray-600 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Add Experience
      </motion.button>

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

export default ExperienceForm;