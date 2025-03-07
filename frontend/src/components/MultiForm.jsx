import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ResumeForm = () => {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedIn: "",
      github: "",
      portfolio: "",
      summary: "",
    },
    experience: [
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        current: true,
        description: "",
      },
    ],
    education: [],
    projects: [],
    certifications: [],
    templateId: "template1"
  });
  // Add states to track form inputs and when to refresh
  const [refreshKey, setRefreshKey] = useState(0);
  const [formInputs, setFormInputs] = useState({
    personalInfo: { ...resumeData.personalInfo },
    experience: [...resumeData.experience]
  });
  // Effect to update backend only when resumeData changes
  useEffect(() => {
    const updateBackend = async () => {
      try {
        console.log("Updating resume data:", resumeData);
        const response = await fetch("http://localhost:3000/resume/generate-Resume", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resumeData),
        });

        if (response.ok) {
          // Increment the refresh key to force iframe refresh
          setRefreshKey(prevKey => prevKey + 1);
        }
      } catch (error) {
        console.error("Error updating resume:", error);
      }
    };
    updateBackend();
  }, [resumeData]);
  // Handle input changes without updating resumeData
  const handlePersonalInfoInputChange = (field, value) => {
    setFormInputs(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };
  // Update resumeData when field loses focus
  const handlePersonalInfoBlur = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };
  // Handle experience input changes without updating resumeData
  const handleExperienceInputChange = (index, field, value) => {
    setFormInputs(prev => {
      const newExperience = [...prev.experience];
      newExperience[index] = {
        ...newExperience[index],
        [field]: value
      };
      return { ...prev, experience: newExperience };
    });
  };
  // Update resumeData when experience field loses focus
  const handleExperienceBlur = (index, field, value) => {
    setResumeData(prev => {
      const newExperience = [...prev.experience];
      newExperience[index] = {
        ...newExperience[index],
        [field]: value
      };
      return { ...prev, experience: newExperience };
    });
  };
  // Special handler for checkbox which should update immediately
  const handleExperienceCheckboxChange = (index, field, value) => {
    // Update both formInputs and resumeData for immediate effect
    setFormInputs(prev => {
      const newExperience = [...prev.experience];
      newExperience[index] = {
        ...newExperience[index],
        [field]: value
      };
      return { ...prev, experience: newExperience };
    });

    setResumeData(prev => {
      const newExperience = [...prev.experience];
      newExperience[index] = {
        ...newExperience[index],
        [field]: value
      };
      return { ...prev, experience: newExperience };
    });
  };
  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden">
      {/* Floating Elements Animation */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: Math.random() * window.innerWidth, y: -20 }}
            animate={{
              y: window.innerHeight + 20,
              x: Math.random() * window.innerWidth
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-2 h-2 bg-blue-500/20 rounded-full"
          />
        ))}
      </div>

      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:w-1/2 space-y-6"
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Create Your Resume
            </h1>

            {/* Personal Info Form */}
            <div className="space-y-4 bg-gray-900/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-800/50">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              <div className="space-y-4">
                {Object.entries(formInputs.personalInfo).map(([field, value]) => (
                  <div key={field}>
                    <input
                      type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                      value={value}
                      onChange={(e) => handlePersonalInfoInputChange(field, e.target.value)}
                      onBlur={(e) => handlePersonalInfoBlur(field, e.target.value)}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}
                      className="w-full bg-gray-800/50 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Form */}
            <div className="space-y-4 bg-gray-900/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-800/50">
              <h2 className="text-xl font-semibold">Experience</h2>
              {formInputs.experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50"
                >
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => handleExperienceInputChange(index, "company", e.target.value)}
                    onBlur={(e) => handleExperienceBlur(index, "company", e.target.value)}
                    placeholder="Company"
                    className="w-full bg-gray-800/50 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <input
                    type="text"
                    value={exp.position}
                    onChange={(e) => handleExperienceInputChange(index, "position", e.target.value)}
                    onBlur={(e) => handleExperienceBlur(index, "position", e.target.value)}
                    placeholder="Position"
                    className="w-full bg-gray-800/50 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <div className="flex gap-4">
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) => handleExperienceInputChange(index, "startDate", e.target.value)}
                      onBlur={(e) => handleExperienceBlur(index, "startDate", e.target.value)}
                      placeholder="Start Date"
                      className="w-1/2 bg-gray-800/50 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    <input
                      type="text"
                      value={exp.endDate}
                      onChange={(e) => handleExperienceInputChange(index, "endDate", e.target.value)}
                      onBlur={(e) => handleExperienceBlur(index, "endDate", e.target.value)}
                      placeholder="End Date"
                      className="w-1/2 bg-gray-800/50 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                      disabled={exp.current}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => handleExperienceCheckboxChange(index, "current", e.target.checked)}
                      className="rounded bg-gray-800 border-gray-700 text-blue-500 focus:ring-blue-500"
                    />
                    <label className="text-gray-300">Current Position</label>
                  </div>
                  <textarea
                    value={exp.description}
                    onChange={(e) => handleExperienceInputChange(index, "description", e.target.value)}
                    onBlur={(e) => handleExperienceBlur(index, "description", e.target.value)}
                    placeholder="Description"
                    className="w-full bg-gray-800/50 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors h-32"
                  />
                </motion.div>
              ))}
            </div>

            {/* Download PDF Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const queryParams = new URLSearchParams({
                  templateId: resumeData.templateId,
                  data: JSON.stringify(resumeData)
                }).toString();
                window.open(`http://localhost:3000/download-pdf?${queryParams}`, "_blank");
              }}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
            >
              Download PDF
            </motion.button>
          </motion.div>

          {/* Preview Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:w-1/2 sticky top-6"
          >
            <div className="min-w-[595px] h-[842px] bg-gray-900/50 backdrop-blur-xl border-2 border-gray-800/50 shadow-2xl rounded-2xl overflow-hidden mx-auto transform hover:scale-[1.02] transition-transform duration-300">
              <iframe
                src={`http://localhost:3000/resume/get?templateId=template1&refresh=${refreshKey}`}
                title="Resume Preview"
                className="w-full h-full"
                key={refreshKey}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
