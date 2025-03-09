import React from 'react';
import { motion } from 'framer-motion';

const PersonalInfoForm = ({ formData, updateFormData, handleNext, isFirstStep }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({
      ...formData.personalInfo,
      [name]: value
    }, 'personalInfo');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Personal Information</h2>

      {/* Photo Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Profile Photo</label>
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleChange}
          className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
        <input
          type="text"
          name="fullName"
          value={formData.personalInfo.fullName}
          onChange={handleChange}
          required
          className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
          placeholder="John Doe"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
        <input
          type="email"
          name="email"
          value={formData.personalInfo.email}
          onChange={handleChange}
          required
          className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
          placeholder="john@example.com"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Phone *</label>
        <input
          type="tel"
          name="phone"
          value={formData.personalInfo.phone}
          onChange={handleChange}
          required
          className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
          placeholder="+1 234 567 8900"
        />
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
        <input
          type="text"
          name="location"
          value={formData.personalInfo.location}
          onChange={handleChange}
          className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
          placeholder="City, Country"
        />
      </div>

      {/* LinkedIn */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn Profile</label>
        <input
          type="url"
          name="linkedIn"
          value={formData.personalInfo.linkedIn}
          onChange={handleChange}
          className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
          placeholder="https://linkedin.com/in/johndoe"
        />
      </div>

      {/* GitHub */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">GitHub Profile</label>
        <input
          type="url"
          name="github"
          value={formData.personalInfo.github}
          onChange={handleChange}
          className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
          placeholder="https://github.com/johndoe"
        />
      </div>

      {/* Portfolio */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Portfolio Website</label>
        <input
          type="url"
          name="portfolio"
          value={formData.personalInfo.portfolio}
          onChange={handleChange}
          className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
          placeholder="https://johndoe.com"
        />
      </div>

      {/* Summary */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Professional Summary</label>
        <textarea
          name="summary"
          value={formData.personalInfo.summary}
          onChange={handleChange}
          rows="4"
          className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
          placeholder="Brief professional summary..."
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end space-x-4 mt-8">
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

export default PersonalInfoForm;