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
  });

  useEffect(() => {
    // Send data to backend whenever resumeData changes
    const updateBackend = async () => {
      try {
        await fetch("http://localhost:3000/generate-resume", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resumeData),
        });
      } catch (error) {
        console.error("Error updating resume:", error);
      }
    };
    updateBackend();
  }, [resumeData]);

  const handlePersonalInfoChange = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const handleExperienceChange = (index, field, value) => {
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
            value={resumeData.personalInfo.fullName}
            onChange={(e) => handlePersonalInfoChange("fullName", e.target.value)}
            placeholder="Full Name"
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            value={resumeData.personalInfo.email}
            onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          <input
            type="tel"
            value={resumeData.personalInfo.phone}
            onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
            placeholder="Phone"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            value={resumeData.personalInfo.location}
            onChange={(e) => handlePersonalInfoChange("location", e.target.value)}
            placeholder="Location"
            className="w-full p-2 border rounded"
          />
          <input
            type="url"
            value={resumeData.personalInfo.linkedIn}
            onChange={(e) => handlePersonalInfoChange("linkedIn", e.target.value)}
            placeholder="LinkedIn URL"
            className="w-full p-2 border rounded"
          />
          <input
            type="url"
            value={resumeData.personalInfo.github}
            onChange={(e) => handlePersonalInfoChange("github", e.target.value)}
            placeholder="GitHub URL"
            className="w-full p-2 border rounded"
          />
          <input
            type="url"
            value={resumeData.personalInfo.portfolio}
            onChange={(e) => handlePersonalInfoChange("portfolio", e.target.value)}
            placeholder="Portfolio URL"
            className="w-full p-2 border rounded"
          />
          <textarea
            value={resumeData.personalInfo.summary}
            onChange={(e) => handlePersonalInfoChange("summary", e.target.value)}
            placeholder="Professional Summary"
            className="w-full p-2 border rounded h-32"
          />
        </div>

        {/* Experience Form */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Experience</h2>
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="space-y-2 p-4 border rounded">
              <input
                type="text"
                value={exp.company}
                onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                placeholder="Company"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                value={exp.position}
                onChange={(e) => handleExperienceChange(index, "position", e.target.value)}
                placeholder="Position"
                className="w-full p-2 border rounded"
              />
              <div className="flex gap-4">
                <input
                  type="text"
                  value={exp.startDate}
                  onChange={(e) => handleExperienceChange(index, "startDate", e.target.value)}
                  placeholder="Start Date"
                  className="w-1/2 p-2 border rounded"
                />
                <input
                  type="text"
                  value={exp.endDate}
                  onChange={(e) => handleExperienceChange(index, "endDate", e.target.value)}
                  placeholder="End Date"
                  className="w-1/2 p-2 border rounded"
                  disabled={exp.current}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => handleExperienceChange(index, "current", e.target.checked)}
                  className="rounded"
                />
                <label>Current Position</label>
              </div>
              <textarea
                value={exp.description}
                onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                placeholder="Description"
                className="w-full p-2 border rounded h-32"
              />
            </div>
          ))}
        </div>

        {/* Download PDF Button */}
        <button
          onClick={() => window.open("http://localhost:3000/download-pdf", "_blank")}
          className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
        >
          Download PDF
        </button>
      </div>
      {/* Preview Section */}
      <div className="w-1/2 sticky top-6 overflow-auto">
        <div className="min-w-[595px] h-[842px] border-2 border-gray-300 shadow-lg rounded-lg overflow-auto mx-auto">
          <iframe
            src={`http://localhost:3000/resume?t=${Date.now()}`}
            title="Resume Preview"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
