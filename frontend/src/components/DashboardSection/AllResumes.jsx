import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, Edit, Download, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function AllResumes() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/resume', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch resumes');
      }

      const data = await response.json();
      console.log(data, "from the all resumes")
      setResumes(data);
    } catch (error) {
      console.error('Error fetching resumes:', error);
      setError('Failed to load your resumes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditResume = (resume) => {
    // Navigate to the MultiStepForm with the selected resume data
    navigate('/dashboard/createresume', { state: { resumeData: resume } });
  };

  const handlePreviewResume = (templateId, resumeId) => {
    // Open resume preview in a new tab
    window.open(`http://localhost:3000/resume/showByTemplateId?templateId=${templateId}&resumeId=${resumeId}`, '_blank');
  };

  const handleDownloadResume = async (templateId, resumeId) => {
    try {
      window.open(`http://localhost:3000/resume/download-pdf?templateId=${templateId}&resumeId=${resumeId}`, '_blank');
    } catch (error) {
      console.error('Error downloading resume:', error);
    }
  };

  // Function to format date (assuming we might add createdAt/updatedAt later)
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 inline-block">
          <p className="text-red-400">{error}</p>
        </div>
        <button
          onClick={fetchResumes}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          My Resumes
        </h1>
        <button
          onClick={() => navigate('/dashboard/createresume')}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors flex items-center gap-2"
        >
          <span>Create New</span>
        </button>
      </div>

      {resumes.length === 0 ? (
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-xl p-8 text-center">
          <h3 className="text-xl font-semibold mb-4">No resumes found</h3>
          <p className="text-gray-400 mb-6">Create your first resume to get started</p>
          <button
            onClick={() => navigate('/dashboard/createresume')}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
          >
            Create Resume
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <motion.div
              key={resume._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <div className="relative">
                {/* Template preview thumbnail with iframe */}
                <div className={`h-40 w-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center overflow-hidden`}>
                  <div className="bg-white/90 w-32 h-40 rounded shadow-md flex items-center justify-center relative scale-[0.6] transform origin-center">
                    <iframe
                      src={`http://localhost:3000/resume/showByTemplateId?templateId=${resume.templateId}&resumeId=${resume._id}&preview=thumbnail`}
                      title="Resume Preview"
                      className="absolute inset-0 w-full h-full border-0"
                      sandbox="allow-same-origin"
                    />
                  </div>
                </div>

                {/* Quick action buttons */}
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => handlePreviewResume(resume.templateId, resume._id)}
                    className="p-2 bg-gray-800/80 backdrop-blur-sm rounded-lg hover:bg-gray-700/80 transition-colors"
                    title="Preview"
                  >
                    <Eye className="w-4 h-4 text-blue-400" />
                  </button>
                  <button
                    onClick={() => handleDownloadResume(resume.templateId, resume._id)}
                    className="p-2 bg-gray-800/80 backdrop-blur-sm rounded-lg hover:bg-gray-700/80 transition-colors"
                    title="Download"
                  >
                    <Download className="w-4 h-4 text-green-400" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1 truncate">
                  {resume.personalInfo.fullName}
                </h3>
                <p className="text-gray-400 text-sm mb-3 truncate">
                  {resume.personalInfo.email}
                </p>

                <div className="flex items-center text-gray-500 text-xs mb-4">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>Template: {resume.templateId}</span>
                </div>

                <button
                  onClick={() => handleEditResume(resume)}
                  className="w-full py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg transition-colors flex items-center justify-center gap-2 text-blue-400"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Resume</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllResumes;