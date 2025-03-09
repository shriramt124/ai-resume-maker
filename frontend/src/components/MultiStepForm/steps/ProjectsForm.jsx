import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';

const ProjectsForm = ({ formData, updateFormData, handleNext, handlePrevious }) => {
  const [projects, setProjects] = useState(formData.projects || []);

  const handleAddProject = () => {
    setProjects([...projects, {
      name: '',
      description: '',
      technologies: '',
      link: ''
    }]);
  };

  const handleRemoveProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
    updateFormData(updatedProjects, 'projects');
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = projects.map((proj, i) => {
      if (i === index) {
        return { ...proj, [field]: value };
      }
      return proj;
    });
    setProjects(updatedProjects);
    updateFormData(updatedProjects, 'projects');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Projects</h2>

      {projects.map((project, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="p-6 bg-gray-800/50 rounded-xl space-y-4 relative"
        >
          <button
            type="button"
            onClick={() => handleRemoveProject(index)}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>

          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Project Name *</label>
            <input
              type="text"
              value={project.name}
              onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
              required
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
              placeholder="Project Name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
            <textarea
              value={project.description}
              onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
              required
              rows="4"
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
              placeholder="Describe your project..."
            />
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Technologies Used</label>
            <input
              type="text"
              value={project.technologies}
              onChange={(e) => handleProjectChange(index, 'technologies', e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
              placeholder="React, Node.js, MongoDB, etc."
            />
          </div>

          {/* Project Link */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Project Link</label>
            <input
              type="url"
              value={project.link}
              onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
              placeholder="https://github.com/yourusername/project"
            />
          </div>
        </motion.div>
      ))}

      {/* Add Project Button */}
      <motion.button
        type="button"
        onClick={handleAddProject}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 border-2 border-dashed border-gray-700 rounded-xl text-gray-400 hover:text-gray-300 hover:border-gray-600 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Add Project
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

export default ProjectsForm;