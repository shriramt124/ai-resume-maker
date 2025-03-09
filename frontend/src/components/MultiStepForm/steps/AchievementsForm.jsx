import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';

const AchievementsForm = ({ formData, updateFormData, handleNext, handlePrevious }) => {
  const [achievements, setAchievements] = useState(formData.achievements || []);

  const handleAddAchievement = () => {
    setAchievements([...achievements, {
      title: '',
      description: '',
      date: '',
      impact: ''
    }]);
  };

  const handleRemoveAchievement = (index) => {
    const updatedAchievements = achievements.filter((_, i) => i !== index);
    setAchievements(updatedAchievements);
    updateFormData(updatedAchievements, 'achievements');
  };

  const handleAchievementChange = (index, field, value) => {
    const updatedAchievements = achievements.map((achievement, i) => {
      if (i === index) {
        return { ...achievement, [field]: value };
      }
      return achievement;
    });
    setAchievements(updatedAchievements);
    updateFormData(updatedAchievements, 'achievements');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Achievements</h2>

      {achievements.map((achievement, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="p-6 bg-gray-800/50 rounded-xl space-y-4 relative"
        >
          <button
            type="button"
            onClick={() => handleRemoveAchievement(index)}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>

          {/* Achievement Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Achievement Title *</label>
            <input
              type="text"
              value={achievement.title}
              onChange={(e) => handleAchievementChange(index, 'title', e.target.value)}
              required
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
              placeholder="Achievement Title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              value={achievement.description}
              onChange={(e) => handleAchievementChange(index, 'description', e.target.value)}
              rows="4"
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
              placeholder="Describe your achievement..."
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
            <input
              type="month"
              value={achievement.date}
              onChange={(e) => handleAchievementChange(index, 'date', e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Impact */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Impact</label>
            <textarea
              value={achievement.impact}
              onChange={(e) => handleAchievementChange(index, 'impact', e.target.value)}
              rows="4"
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
              placeholder="Describe the impact of your achievement..."
            />
          </div>
        </motion.div>
      ))}

      {/* Add Achievement Button */}
      <motion.button
        type="button"
        onClick={handleAddAchievement}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 border-2 border-dashed border-gray-700 rounded-xl text-gray-400 hover:text-gray-300 hover:border-gray-600 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Add Achievement
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
          Preview Resume
        </motion.button>
      </div>
    </form>
  );
};

export default AchievementsForm;