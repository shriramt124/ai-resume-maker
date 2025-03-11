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
    education: [{ institution: "", degree: "", field: "", graduationDate: "", gpa: "" }],
    projects: [{ name: "", description: "", technologies: "", link: "" }],
    skills: { technical: "", soft: "", languages: "" },
    certifications: [{ name: "", issuer: "", date: "", link: "" }],
    achievements: [{ title: "", description: "", date: "", impact: "" }],
    templateId: "template1",
  });

  const [refreshKey, setRefreshKey] = useState(0);
  const [formInputs, setFormInputs] = useState({ ...resumeData });

  useEffect(() => {
    const updateBackend = async () => {
      try {
        const response = await fetch("http://localhost:3000/resume/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(resumeData),
        });
        if (response.ok) setRefreshKey((prev) => prev + 1);
      } catch (error) {
        console.error("Error updating resume:", error);
      }
    };
    updateBackend();
  }, [resumeData]);

  const handlePersonalInfoInputChange = (field, value) => {
    setFormInputs((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const handlePersonalInfoBlur = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const handleExperienceInputChange = (index, field, value) => {
    setFormInputs((prev) => {
      const newExperience = [...prev.experience];
      newExperience[index] = { ...newExperience[index], [field]: value };
      return { ...prev, experience: newExperience };
    });
  };

  const handleExperienceBlur = (index, field, value) => {
    setResumeData((prev) => {
      const newExperience = [...prev.experience];
      newExperience[index] = { ...newExperience[index], [field]: value };
      return { ...prev, experience: newExperience };
    });
  };

  const handleExperienceCheckboxChange = (index, field, value) => {
    setFormInputs((prev) => {
      const newExperience = [...prev.experience];
      newExperience[index] = { ...newExperience[index], [field]: value };
      return { ...prev, experience: newExperience };
    });
    setResumeData((prev) => {
      const newExperience = [...prev.experience];
      newExperience[index] = { ...newExperience[index], [field]: value };
      return { ...prev, experience: newExperience };
    });
  };

  const handleEducationInputChange = (index, field, value) => {
    setFormInputs((prev) => {
      const newEducation = [...prev.education];
      newEducation[index] = { ...newEducation[index], [field]: value };
      return { ...prev, education: newEducation };
    });
  };

  const handleEducationBlur = (index, field, value) => {
    setResumeData((prev) => {
      const newEducation = [...prev.education];
      newEducation[index] = { ...newEducation[index], [field]: value };
      return { ...prev, education: newEducation };
    });
  };

  const handleProjectsInputChange = (index, field, value) => {
    setFormInputs((prev) => {
      const newProjects = [...prev.projects];
      newProjects[index] = { ...newProjects[index], [field]: value };
      return { ...prev, projects: newProjects };
    });
  };

  const handleProjectsBlur = (index, field, value) => {
    setResumeData((prev) => {
      const newProjects = [...prev.projects];
      newProjects[index] = { ...newProjects[index], [field]: value };
      return { ...prev, projects: newProjects };
    });
  };

  const handleSkillsInputChange = (field, value) => {
    setFormInputs((prev) => ({
      ...prev,
      skills: { ...prev.skills, [field]: value },
    }));
  };

  const handleSkillsBlur = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      skills: { ...prev.skills, [field]: value },
    }));
  };

  const handleCertificationsInputChange = (index, field, value) => {
    setFormInputs((prev) => {
      const newCertifications = [...prev.certifications];
      newCertifications[index] = { ...newCertifications[index], [field]: value };
      return { ...prev, certifications: newCertifications };
    });
  };

  const handleCertificationsBlur = (index, field, value) => {
    setResumeData((prev) => {
      const newCertifications = [...prev.certifications];
      newCertifications[index] = { ...newCertifications[index], [field]: value };
      return { ...prev, certifications: newCertifications };
    });
  };

  const handleAchievementsInputChange = (index, field, value) => {
    setFormInputs((prev) => {
      const newAchievements = [...prev.achievements];
      newAchievements[index] = { ...newAchievements[index], [field]: value };
      return { ...prev, achievements: newAchievements };
    });
  };

  const handleAchievementsBlur = (index, field, value) => {
    setResumeData((prev) => {
      const newAchievements = [...prev.achievements];
      newAchievements[index] = { ...newAchievements[index], [field]: value };
      return { ...prev, achievements: newAchievements };
    });
  };

  const addEducation = () => {
    setFormInputs((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { institution: "", degree: "", field: "", graduationDate: "", gpa: "" },
      ],
    }));
    setResumeData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { institution: "", degree: "", field: "", graduationDate: "", gpa: "" },
      ],
    }));
  };

  const addProject = () => {
    setFormInputs((prev) => ({
      ...prev,
      projects: [...prev.projects, { name: "", description: "", technologies: "", link: "" }],
    }));
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, { name: "", description: "", technologies: "", link: "" }],
    }));
  };

  const addCertification = () => {
    setFormInputs((prev) => ({
      ...prev,
      certifications: [...prev.certifications, { name: "", issuer: "", date: "", link: "" }],
    }));
    setResumeData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, { name: "", issuer: "", date: "", link: "" }],
    }));
  };

  const addAchievement = () => {
    setFormInputs((prev) => ({
      ...prev,
      achievements: [...prev.achievements, { title: "", description: "", date: "", impact: "" }],
    }));
    setResumeData((prev) => ({
      ...prev,
      achievements: [...prev.achievements, { title: "", description: "", date: "", impact: "" }],
    }));
  };

  const removeEducation = (index) => {
    setFormInputs((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const removeProject = (index) => {
    setFormInputs((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const removeCertification = (index) => {
    setFormInputs((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  const removeAchievement = (index) => {
    setFormInputs((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index),
    }));
    setResumeData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Scrollable Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:w-1/2 space-y-6 h-screen overflow-y-auto pr-4"
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Create Your Resume
            </h1>

            {/* Personal Info */}
            <div className="space-y-4 bg-gray-900/50 p-6 rounded-2xl border border-gray-800/50">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              <div className="space-y-4">
                {Object.entries(formInputs.personalInfo).map(([field, value]) => (
                  <input
                    key={field}
                    type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                    value={value}
                    onChange={(e) => handlePersonalInfoInputChange(field, e.target.value)}
                    onBlur={(e) => handlePersonalInfoBlur(field, e.target.value)}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                  />
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-4 bg-gray-900/50 p-6 rounded-2xl border border-gray-800/50">
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
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    value={exp.position}
                    onChange={(e) => handleExperienceInputChange(index, "position", e.target.value)}
                    onBlur={(e) => handleExperienceBlur(index, "position", e.target.value)}
                    placeholder="Position"
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                  />
                  <div className="flex gap-4">
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) => handleExperienceInputChange(index, "startDate", e.target.value)}
                      onBlur={(e) => handleExperienceBlur(index, "startDate", e.target.value)}
                      placeholder="Start Date"
                      className="w-1/2 bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="text"
                      value={exp.endDate}
                      onChange={(e) => handleExperienceInputChange(index, "endDate", e.target.value)}
                      onBlur={(e) => handleExperienceBlur(index, "endDate", e.target.value)}
                      placeholder="End Date"
                      className="w-1/2 bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
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
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 h-32"
                  />
                </motion.div>
              ))}
            </div>

            {/* Education */}
            <div className="space-y-4 bg-gray-900/50 p-6 rounded-2xl border border-gray-800/50">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Education</h2>
                <button
                  onClick={addEducation}
                  className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors"
                >
                  Add Education
                </button>
              </div>
              {formInputs.education.map((edu, index) => (
                <div key={index} className="space-y-4 border-b border-gray-700/50 pb-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Education #{index + 1}</h3>
                    <button
                      onClick={() => removeEducation(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Institution"
                    value={edu.institution}
                    onChange={(e) => handleEducationInputChange(index, "institution", e.target.value)}
                    onBlur={(e) => handleEducationBlur(index, "institution", e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => handleEducationInputChange(index, "degree", e.target.value)}
                    onBlur={(e) => handleEducationBlur(index, "degree", e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Field of Study"
                    value={edu.field}
                    onChange={(e) => handleEducationInputChange(index, "field", e.target.value)}
                    onBlur={(e) => handleEducationBlur(index, "field", e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Graduation Date"
                    value={edu.graduationDate}
                    onChange={(e) => handleEducationInputChange(index, "graduationDate", e.target.value)}
                    onBlur={(e) => handleEducationBlur(index, "graduationDate", e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="GPA (Optional)"
                    value={edu.gpa}
                    onChange={(e) => handleEducationInputChange(index, "gpa", e.target.value)}
                    onBlur={(e) => handleEducationBlur(index, "gpa", e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
              ))}
            </div>

            {/* Projects */}
            <div className="space-y-4 bg-gray-900/50 p-6 rounded-2xl border border-gray-800/50">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Projects</h2>
                <button
                  onClick={addProject}
                  className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors"
                >
                  Add Project
                </button>
              </div>
              {formInputs.projects.map((project, index) => (
                <div key={index} className="space-y-4 border-b border-gray-700/50 pb-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Project #{index + 1}</h3>
                    <button
                      onClick={() => removeProject(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Project Name"
                    value={project.name}
                    onChange={(e) => handleProjectsInputChange(index, "name", e.target.value)}
                    onBlur={(e) => handleProjectsBlur(index, "name", e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                  />
                  <textarea
                    placeholder="Project Description"
                    value={project.description}
                    onChange={(e) => handleProjectsInputChange(index, "description", e.target.value)}
                    onBlur={(e) => handleProjectsBlur(index, "description", e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 min-h-[100px]"
                  />
                  <input
                    type="text"
                    placeholder="Technologies Used"
                    value={project.technologies}
                    onChange={(e) => handleProjectsInputChange(index, "technologies", e.target.value)}
                    onBlur={(e) => handleProjectsBlur(index, "technologies", e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Project Link (Optional)"
                    value={project.link}
                    onChange={(e) => handleProjectsInputChange(index, "link", e.target.value)}
                    onBlur={(e) => handleProjectsBlur(index, "link", e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="space-y-4 bg-gray-900/50 p-6 rounded-2xl border border-gray-800/50">
              <h2 className="text-xl font-semibold">Skills</h2>
              <div className="space-y-4">
                <textarea
                  placeholder="Technical Skills"
                  value={formInputs.skills.technical}
                  onChange={(e) => handleSkillsInputChange("technical", e.target.value)}
                  onBlur={(e) => handleSkillsBlur("technical", e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 min-h-[100px]"
                />
                <textarea
                  placeholder="Soft Skills"
                  value={formInputs.skills.soft}
                  onChange={(e) => handleSkillsInputChange("soft", e.target.value)}
                  onBlur={(e) => handleSkillsBlur("soft", e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 min-h-[100px]"
                />
                <textarea
                  placeholder="Languages"
                  value={formInputs.skills.languages}
                  onChange={(e) => handleSkillsInputChange("languages", e.target.value)}
                  onBlur={(e) => handleSkillsBlur("languages", e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 min-h-[100px]"
                />
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-4 bg-gray-900/50 p-6 rounded-2xl border border-gray-800/50">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Certifications</h2>
                <button
                  onClick={addCertification}
                  className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors"
                >
                  Add Certification
                </button>
              </div>
              {formInputs.certifications.map((cert, index) => (
                <div key={index} className="space-y-4 border-b border-gray-700/50 pb-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Certification #{index + 1}</h3>
                    <button
                      onClick={() => removeCertification(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Certification Name"
                    value={cert.name}
                    onChange={(e) => handleCertificationsInputChange(index, "name", e.target.value)}
                    onBlur={(e) => handleCertificationsBlur(index, "name", e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Issuer"
                    value={cert.issuer}
                    onChange={(e) => handleCertificationsInputChange(index, "issuer", e.target.value)}
                    onBlur={(e) => handleCertificationsBlur(index, "issuer", e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Date"
                    value={cert.date}
                    onChange={(e) => handleCertificationsInputChange(index, "date", e.target.value)}
                    onBlur={(e) => handleCertificationsBlur(index, "date", e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Link (Optional)"
                    value={cert.link}
                    onChange={(e) => handleCertificationsInputChange(index, "link", e.target.value)}
                    onBlur={(e) => handleCertificationsBlur(index, "link", e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
              ))}
            </div>

            {/* Achievements */}
            <div className="space-y-4 bg-gray-900/50 p-6 rounded-2xl border border-gray-800/50">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Achievements</h2>
                <button
                  onClick={addAchievement}
                  className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors"
                >
                  Add Achievement
                </button>
              </div>
              {formInputs.achievements.map((achievement, index) => (
                <div key={index} className="space-y-4 border-b border-gray-700/50 pb-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Achievement #{index + 1}</h3>
                    <button
                      onClick={() => removeAchievement(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Achievement Title"
                    value={achievement.title}
                    onChange={(e) => handleAchievementsInputChange(index, "title", e.target.value)}
                    onBlur={(e) => handleAchievementsBlur(index, "title", e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                  />
                  <textarea
                    placeholder="Description"
                    value={achievement.description}
                    onChange={(e) => handleAchievementsInputChange(index, "description", e.target.value)}
                    onBlur={(e) => handleAchievementsBlur(index, "description", e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 min-h-[100px]"
                  />
                  <input
                    type="text"
                    placeholder="Date"
                    value={achievement.date}
                    onChange={(e) => handleAchievementsInputChange(index, "date", e.target.value)}
                    onBlur={(e) => handleAchievementsBlur(index, "date", e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Impact"
                    value={achievement.impact}
                    onChange={(e) => handleAchievementsInputChange(index, "impact", e.target.value)}
                    onBlur={(e) => handleAchievementsBlur(index, "impact", e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
              ))}
            </div>

            {/* Download Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const queryParams = new URLSearchParams({
                  templateId: resumeData.templateId,
                  data: encodeURIComponent(JSON.stringify(resumeData)),
                }).toString();
                window.open(
                  `http://localhost:3000/download-pdf?${queryParams}`,
                  "_blank"
                );
              }}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
            >
              Download PDF
            </motion.button>
          </motion.div>

          {/* Fixed Preview Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:w-1/2 fixed right-0 top-0 h-screen p-6"
          >
            <div className="min-w-[595px] h-[842px] bg-gray-900/50 backdrop-blur-xl border-2 border-gray-800/50 shadow-2xl overflow-hidden mx-auto transform hover:scale-[1.02] transition-transform duration-300">
              <iframe
                src={`http://localhost:3000/resume/get?templateId=${resumeData.templateId}&refresh=${refreshKey}`}
                title="Resume Preview"
                className="w-full h-full rounded-none"
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