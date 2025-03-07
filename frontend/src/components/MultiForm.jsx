import React, { useState, useEffect } from "react";

const ResumeForm = () => {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: "John Doe",
      email: "johndoe@example.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      linkedIn: "https://www.linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      portfolio: "https://johndoe.com",
      summary: "Highly motivated software engineer.",
    },
    experience: [
      {
        company: "Tech Solutions Inc.",
        position: "Senior Software Engineer",
        startDate: "Jan 2020",
        endDate: "Present",
        current: true,
        description: "Led the development of a SaaS platform.",
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
    <div className="flex p-6 gap-6 bg-white text-black">
      {/* Form Section */}
      <div className="w-1/2 space-y-6">
        <h1 className="text-2xl font-bold">Enter Resume Details</h1>

        {/* Personal Info Form */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Personal Information</h2>
          <input
            type="text"
            value={formInputs.personalInfo.fullName}
            onChange={(e) => handlePersonalInfoInputChange("fullName", e.target.value)}
            onBlur={(e) => handlePersonalInfoBlur("fullName", e.target.value)}
            placeholder="Full Name"
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            value={formInputs.personalInfo.email}
            onChange={(e) => handlePersonalInfoInputChange("email", e.target.value)}
            onBlur={(e) => handlePersonalInfoBlur("email", e.target.value)}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          <input
            type="tel"
            value={formInputs.personalInfo.phone}
            onChange={(e) => handlePersonalInfoInputChange("phone", e.target.value)}
            onBlur={(e) => handlePersonalInfoBlur("phone", e.target.value)}
            placeholder="Phone"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            value={formInputs.personalInfo.location}
            onChange={(e) => handlePersonalInfoInputChange("location", e.target.value)}
            onBlur={(e) => handlePersonalInfoBlur("location", e.target.value)}
            placeholder="Location"
            className="w-full p-2 border rounded"
          />
          <input
            type="url"
            value={formInputs.personalInfo.linkedIn}
            onChange={(e) => handlePersonalInfoInputChange("linkedIn", e.target.value)}
            onBlur={(e) => handlePersonalInfoBlur("linkedIn", e.target.value)}
            placeholder="LinkedIn URL"
            className="w-full p-2 border rounded"
          />
          <input
            type="url"
            value={formInputs.personalInfo.github}
            onChange={(e) => handlePersonalInfoInputChange("github", e.target.value)}
            onBlur={(e) => handlePersonalInfoBlur("github", e.target.value)}
            placeholder="GitHub URL"
            className="w-full p-2 border rounded"
          />
          <input
            type="url"
            value={formInputs.personalInfo.portfolio}
            onChange={(e) => handlePersonalInfoInputChange("portfolio", e.target.value)}
            onBlur={(e) => handlePersonalInfoBlur("portfolio", e.target.value)}
            placeholder="Portfolio URL"
            className="w-full p-2 border rounded"
          />
          <textarea
            value={formInputs.personalInfo.summary}
            onChange={(e) => handlePersonalInfoInputChange("summary", e.target.value)}
            onBlur={(e) => handlePersonalInfoBlur("summary", e.target.value)}
            placeholder="Professional Summary"
            className="w-full p-2 border rounded h-32"
          />
        </div>

        {/* Experience Form */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Experience</h2>
          {formInputs.experience.map((exp, index) => (
            <div key={index} className="space-y-2 p-4 border rounded">
              <input
                type="text"
                value={exp.company}
                onChange={(e) => handleExperienceInputChange(index, "company", e.target.value)}
                onBlur={(e) => handleExperienceBlur(index, "company", e.target.value)}
                placeholder="Company"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                value={exp.position}
                onChange={(e) => handleExperienceInputChange(index, "position", e.target.value)}
                onBlur={(e) => handleExperienceBlur(index, "position", e.target.value)}
                placeholder="Position"
                className="w-full p-2 border rounded"
              />
              <div className="flex gap-4">
                <input
                  type="text"
                  value={exp.startDate}
                  onChange={(e) => handleExperienceInputChange(index, "startDate", e.target.value)}
                  onBlur={(e) => handleExperienceBlur(index, "startDate", e.target.value)}
                  placeholder="Start Date"
                  className="w-1/2 p-2 border rounded"
                />
                <input
                  type="text"
                  value={exp.endDate}
                  onChange={(e) => handleExperienceInputChange(index, "endDate", e.target.value)}
                  onBlur={(e) => handleExperienceBlur(index, "endDate", e.target.value)}
                  placeholder="End Date"
                  className="w-1/2 p-2 border rounded"
                  disabled={exp.current}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => handleExperienceCheckboxChange(index, "current", e.target.checked)}
                  className="rounded"
                />
                <label>Current Position</label>
              </div>
              <textarea
                value={exp.description}
                onChange={(e) => handleExperienceInputChange(index, "description", e.target.value)}
                onBlur={(e) => handleExperienceBlur(index, "description", e.target.value)}
                placeholder="Description"
                className="w-full p-2 border rounded h-32"
              />
            </div>
          ))}
        </div>

        {/* Download PDF Button */}
        <button
          onClick={() => {
            const queryParams = new URLSearchParams({
              templateId: resumeData.templateId,
              data: JSON.stringify(resumeData)
            }).toString();
            window.open(`http://localhost:3000/download-pdf?${queryParams}`, "_blank");
          }}
          className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
        >
          Download PDF
        </button>
      </div>
      {/* Preview Section */}
      <div className="w-1/2 sticky top-6 overflow-auto">
        <div className="min-w-[595px] h-[842px] border-2 border-gray-300 shadow-lg rounded-lg overflow-auto mx-auto">
          <iframe
            src={`http://localhost:3000/resume/get?templateId=template1&refresh=${refreshKey}`}
            title="Resume Preview"
            className="w-full h-full"
            key={refreshKey} // Add key prop to force re-render
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
