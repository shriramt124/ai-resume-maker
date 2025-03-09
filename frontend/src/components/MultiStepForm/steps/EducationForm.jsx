import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';

const EducationForm = ({ formData, updateFormData, handleNext, handlePrevious }) => {
  const [educations, setEducations] = useState(formData.education || []);

  const handleAddEducation = () => {
    setEducations([...educations, {
      institution: '',
      degree: '',
      field: '',
      graduationDate: '',
      gpa: ''
    }]);
  };

  const handleRemoveEducation = (index) => {
    const updatedEducations = educations.filter((_, i) => i !== index);
    setEducations(updatedEducations);
    updateFormData(updatedEducations, 'education');
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducations = educations.map((edu, i) => {
      if (i === index) {
        return { ...edu, [field]: value };
      }
      return edu;
    });
    setEducations(updatedEducations);
    updateFormData(updatedEducations, 'education');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Education</h2>

      {educations.map((education, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="p-6 bg-gray-800/50 rounded-xl space-y-4 relative"
        >
          <button
            type="button"
            onClick={() => handleRemoveEducation(index)}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>

          {/* Institution */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Institution *</label>
            <input
              type="text"
              value={education.institution}
              onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
              required
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
              placeholder="University or School Name"
            />
          </div>

          {/* Degree */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Degree *</label>
            <input
              type="text"
              value={education.degree}
              onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
              required
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
              placeholder="Bachelor's, Master's, etc."
            />
          </div>

          {/* Field of Study */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Field of Study *</label>
            <input
              type="text"
              value={education.field}
              onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
              required
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
              placeholder="Computer Science, Business, etc."
            />
          </div>

          {/* Graduation Date */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Graduation Date *</label>
            <input
              type="month"
              value={education.graduationDate}
              onChange={(e) => handleEducationChange(index, 'graduationDate', e.target.value)}
              required
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* GPA */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">GPA</label>
            <input
              type="text"
              value={education.gpa}
              onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
              placeholder="3.8/4.0"
            />
          </div>
        </motion.div>
      ))}

      {/* Add Education Button */}
      <motion.button
        type="button"
        onClick={handleAddEducation}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 border-2 border-dashed border-gray-700 rounded-xl text-gray-400 hover:text-gray-300 hover:border-gray-600 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Add Education
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

export default EducationForm;