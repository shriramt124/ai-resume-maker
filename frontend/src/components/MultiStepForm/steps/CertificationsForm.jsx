import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';

const CertificationsForm = ({ formData, updateFormData, handleNext, handlePrevious }) => {
  const [certifications, setCertifications] = useState(formData.certifications || []);

  const handleAddCertification = () => {
    setCertifications([...certifications, {
      name: '',
      issuer: '',
      date: '',
      link: ''
    }]);
  };

  const handleRemoveCertification = (index) => {
    const updatedCertifications = certifications.filter((_, i) => i !== index);
    setCertifications(updatedCertifications);
    updateFormData(updatedCertifications, 'certifications');
  };

  const handleCertificationChange = (index, field, value) => {
    const updatedCertifications = certifications.map((cert, i) => {
      if (i === index) {
        return { ...cert, [field]: value };
      }
      return cert;
    });
    setCertifications(updatedCertifications);
    updateFormData(updatedCertifications, 'certifications');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Certifications</h2>

      {certifications.map((certification, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="p-6 bg-gray-800/50 rounded-xl space-y-4 relative"
        >
          <button
            type="button"
            onClick={() => handleRemoveCertification(index)}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>

          {/* Certification Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Certification Name *</label>
            <input
              type="text"
              value={certification.name}
              onChange={(e) => handleCertificationChange(index, 'name', e.target.value)}
              required
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
              placeholder="AWS Solutions Architect, Google Cloud Professional, etc."
            />
          </div>

          {/* Issuer */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Issuing Organization *</label>
            <input
              type="text"
              value={certification.issuer}
              onChange={(e) => handleCertificationChange(index, 'issuer', e.target.value)}
              required
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
              placeholder="Amazon Web Services, Google, etc."
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Date Earned *</label>
            <input
              type="month"
              value={certification.date}
              onChange={(e) => handleCertificationChange(index, 'date', e.target.value)}
              required
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Link */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Credential Link</label>
            <input
              type="url"
              value={certification.link}
              onChange={(e) => handleCertificationChange(index, 'link', e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
              placeholder="https://www.credential.net/..."
            />
          </div>
        </motion.div>
      ))}

      {/* Add Certification Button */}
      <motion.button
        type="button"
        onClick={handleAddCertification}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 border-2 border-dashed border-gray-700 rounded-xl text-gray-400 hover:text-gray-300 hover:border-gray-600 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Add Certification
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

export default CertificationsForm;