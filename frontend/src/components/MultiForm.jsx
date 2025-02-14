import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Download, Save, User, Briefcase, GraduationCap, Code, Award, Languages, Phone, Trophy, Edit, Eye } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ResumePreview from './ResumePreview';

const ResumeForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [activeTab, setActiveTab] = useState('edit');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const resumePreviewRef = useRef(null);

  // Keep all your existing state and form data
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedIn: '',
      portfolio: '',
      summary: ''
    },
    experience: [{
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }],
    education: [{
      institution: '',
      degree: '',
      field: '',
      graduationDate: '',
      gpa: ''
    }],
    projects: [{
      name: '',
      description: '',
      technologies: '',
      link: ''
    }],
    achievements: [{
      title: '',
      description: '',
      date: '',
      impact: ''
    }],
    skills: {
      technical: '',
      soft: '',
      languages: ''
    },
    certifications: [{
      name: '',
      issuer: '',
      date: '',
      link: ''
    }]
  });

  // Add PDF generation function
  const downloadPDF = async () => {
    if (!resumePreviewRef.current) return;

    try {
      setIsGeneratingPDF(true);
      const element = resumePreviewRef.current;

      // Store original HTML and CSS
      const originalHTML = element.innerHTML;
      const originalStyles = element.getAttribute('style') || '';

      // Convert oklch colors to RGB equivalents
      const tempHTML = originalHTML.replace(/oklch\([^)]+\)/g, (match) => {
        // Add your oklch to RGB conversions here
        if (match.includes('oklch(0.855 0.194 258.888)')) return '#3b82f6'; // blue
        if (match.includes('oklch(0.92 0.01 258.888)')) return '#f3f4f6'; // light gray
        return '#000000'; // default fallback
      });

      // Create temporary element with converted colors
      element.innerHTML = tempHTML;
      element.style.transform = 'scale(1)';
      element.style.width = '21cm';

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: true,
        width: element.scrollWidth,
        height: element.scrollHeight,
      });

      // Restore original content and styles
      element.innerHTML = originalHTML;
      element.setAttribute('style', originalStyles);

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(canvas, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('resume.pdf');
    } catch (error) {
      console.error('PDF generation failed:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };
  const steps = [
    { title: 'Personal Info', icon: User },
    { title: 'Experience', icon: Briefcase },
    { title: 'Education', icon: GraduationCap },
    { title: 'Projects', icon: Code },
    { title: 'Achievements', icon: Trophy },
    { title: 'Skills', icon: Languages },
    { title: 'Certifications', icon: Award }
  ];

  const handleInputChange = (section, field, value, index = null) => {
    setFormData(prev => {
      if (index !== null) {
        const newArray = [...prev[section]];
        newArray[index] = { ...newArray[index], [field]: value };
        return { ...prev, [section]: newArray };
      }
      return {
        ...prev,
        [section]: typeof prev[section] === 'object' && !Array.isArray(prev[section])
          ? { ...prev[section], [field]: value }
          : value
      };
    });
  };

  const addItem = (section) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], { ...formData[section][0] }]
    }));
  };

  const removeItem = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };
  const renderPersonalInfo = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Full Name"
          className="input-field"
          value={formData.personalInfo.fullName}
          onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="input-field"
          value={formData.personalInfo.email}
          onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone"
          className="input-field"
          value={formData.personalInfo.phone}
          onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          className="input-field"
          value={formData.personalInfo.location}
          onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
        />
        <input
          type="url"
          placeholder="LinkedIn URL"
          className="input-field"
          value={formData.personalInfo.linkedIn}
          onChange={(e) => handleInputChange('personalInfo', 'linkedIn', e.target.value)}
        />
        <input
          type="url"
          placeholder="Portfolio URL"
          className="input-field"
          value={formData.personalInfo.portfolio}
          onChange={(e) => handleInputChange('personalInfo', 'portfolio', e.target.value)}
        />
      </div>
      <textarea
        placeholder="Professional Summary"
        className="input-field h-32"
        value={formData.personalInfo.summary}
        onChange={(e) => handleInputChange('personalInfo', 'summary', e.target.value)}
      />
    </div>
  );
  const renderExperience = () => (
    <div className="space-y-6">
      {formData.experience.map((exp, index) => (
        <div key={index} className="p-4 bg-gray-800 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Experience {index + 1}</h3>
            {formData.experience.length > 1 && (
              <button
                onClick={() => removeItem('experience', index)}
                className="text-red-400 hover:text-red-300"
              >
                Remove
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Company"
              className="input-field"
              value={exp.company}
              onChange={(e) => handleInputChange('experience', 'company', e.target.value, index)}
            />
            <input
              type="text"
              placeholder="Position"
              className="input-field"
              value={exp.position}
              onChange={(e) => handleInputChange('experience', 'position', e.target.value, index)}
            />
            <input
              type="date"
              className="input-field"
              value={exp.startDate}
              onChange={(e) => handleInputChange('experience', 'startDate', e.target.value, index)}
            />
            <input
              type="date"
              className="input-field"
              value={exp.endDate}
              onChange={(e) => handleInputChange('experience', 'endDate', e.target.value, index)}
              disabled={exp.current}
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={exp.current}
              onChange={(e) => handleInputChange('experience', 'current', e.target.checked, index)}
              className="rounded bg-gray-700 border-gray-600"
            />
            <label>Current Position</label>
          </div>
          <textarea
            placeholder="Description"
            className="input-field h-32"
            value={exp.description}
            onChange={(e) => handleInputChange('experience', 'description', e.target.value, index)}
          />
        </div>
      ))}
      <button
        onClick={() => addItem('experience')}
        className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
      >
        Add Experience
      </button>
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-6">
      {formData.education.map((edu, index) => (
        <div key={index} className="p-4 bg-gray-800 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Education {index + 1}</h3>
            {formData.education.length > 1 && (
              <button
                onClick={() => removeItem('education', index)}
                className="text-red-400 hover:text-red-300"
              >
                Remove
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Institution"
              className="input-field"
              value={edu.institution}
              onChange={(e) => handleInputChange('education', 'institution', e.target.value, index)}
            />
            <input
              type="text"
              placeholder="Degree"
              className="input-field"
              value={edu.degree}
              onChange={(e) => handleInputChange('education', 'degree', e.target.value, index)}
            />
            <input
              type="text"
              placeholder="Field of Study"
              className="input-field"
              value={edu.field}
              onChange={(e) => handleInputChange('education', 'field', e.target.value, index)}
            />
            <input
              type="date"
              className="input-field"
              value={edu.graduationDate}
              onChange={(e) => handleInputChange('education', 'graduationDate', e.target.value, index)}
            />
            <input
              type="number"
              placeholder="GPA"
              className="input-field"
              value={edu.gpa}
              onChange={(e) => handleInputChange('education', 'gpa', e.target.value, index)}
              step="0.01"
              min="0"
              max="4"
            />
          </div>
        </div>
      ))}
      <button
        onClick={() => addItem('education')}
        className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
      >
        Add Education
      </button>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      {formData.projects.map((project, index) => (
        <div key={index} className="p-4 bg-gray-800 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Project {index + 1}</h3>
            {formData.projects.length > 1 && (
              <button
                onClick={() => removeItem('projects', index)}
                className="text-red-400 hover:text-red-300"
              >
                Remove
              </button>
            )}
          </div>
          <input
            type="text"
            placeholder="Project Name"
            className="input-field"
            value={project.name}
            onChange={(e) => handleInputChange('projects', 'name', e.target.value, index)}
          />
          <textarea
            placeholder="Project Description"
            className="input-field h-32"
            value={project.description}
            onChange={(e) => handleInputChange('projects', 'description', e.target.value, index)}
          />
          <input
            type="text"
            placeholder="Technologies Used (comma-separated)"
            className="input-field"
            value={project.technologies}
            onChange={(e) => handleInputChange('projects', 'technologies', e.target.value, index)}
          />
          <input
            type="url"
            placeholder="Project Link"
            className="input-field"
            value={project.link}
            onChange={(e) => handleInputChange('projects', 'link', e.target.value, index)}
          />
        </div>
      ))}
      <button
        onClick={() => addItem('projects')}
        className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
      >
        Add Project
      </button>
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-4">
      <div>
        <label className="block mb-2">Technical Skills</label>
        <textarea
          placeholder="Enter technical skills (e.g., Programming Languages, Frameworks, Tools)"
          className="input-field h-32"
          value={formData.skills.technical}
          onChange={(e) => handleInputChange('skills', 'technical', e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-2">Soft Skills</label>
        <textarea
          placeholder="Enter soft skills (e.g., Leadership, Communication, Problem Solving)"
          className="input-field h-32"
          value={formData.skills.soft}
          onChange={(e) => handleInputChange('skills', 'soft', e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-2">Languages</label>
        <textarea
          placeholder="Enter languages and proficiency levels"
          className="input-field h-32"
          value={formData.skills.languages}
          onChange={(e) => handleInputChange('skills', 'languages', e.target.value)}
        />
      </div>
    </div>
  );

  const renderCertifications = () => (
    <div className="space-y-6">
      {formData.certifications.map((cert, index) => (
        <div key={index} className="p-4 bg-gray-800 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Certification {index + 1}</h3>
            {formData.certifications.length > 1 && (
              <button
                onClick={() => removeItem('certifications', index)}
                className="text-red-400 hover:text-red-300"
              >
                Remove
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Certification Name"
              className="input-field"
              value={cert.name}
              onChange={(e) => handleInputChange('certifications', 'name', e.target.value, index)}
            />
            <input
              type="text"
              placeholder="Issuing Organization"
              className="input-field"
              value={cert.issuer}
              onChange={(e) => handleInputChange('certifications', 'issuer', e.target.value, index)}
            />
            <input
              type="date"
              className="input-field"
              value={cert.date}
              onChange={(e) => handleInputChange('certifications', 'date', e.target.value, index)}
            />
            <input
              type="url"
              placeholder="Certification Link"
              className="input-field"
              value={cert.link}
              onChange={(e) => handleInputChange('certifications', 'link', e.target.value, index)}
            />
          </div>
        </div>
      ))}
      <button
        onClick={() => addItem('certifications')}
        className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
      >
        Add Certification
      </button>
    </div>
  );

  // New Achievements Section
  const renderAchievements = () => (
    <div className="space-y-6">
      {formData.achievements.map((achievement, index) => (
        <div key={index} className="p-4 bg-gray-800 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Achievement {index + 1}</h3>
            {formData.achievements.length > 1 && (
              <button
                onClick={() => removeItem('achievements', index)}
                className="text-red-400 hover:text-red-300"
              >
                Remove
              </button>
            )}
          </div>
          <input
            type="text"
            placeholder="Achievement Title"
            className="input-field"
            value={achievement.title}
            onChange={(e) => handleInputChange('achievements', 'title', e.target.value, index)}
          />
          <textarea
            placeholder="Achievement Description"
            className="input-field h-32"
            value={achievement.description}
            onChange={(e) => handleInputChange('achievements', 'description', e.target.value, index)}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="date"
              placeholder="Date"
              className="input-field"
              value={achievement.date}
              onChange={(e) => handleInputChange('achievements', 'date', e.target.value, index)}
            />
            <input
              type="text"
              placeholder="Impact/Result"
              className="input-field"
              value={achievement.impact}
              onChange={(e) => handleInputChange('achievements', 'impact', e.target.value, index)}
            />
          </div>
        </div>
      ))}
      <button
        onClick={() => addItem('achievements')}
        className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
      >
        Add Achievement
      </button>
    </div>
  );
 
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderPersonalInfo();
      case 1:
        return renderExperience();
      case 2:
        return renderEducation();
      case 3:
        return renderProjects();
      case 4:
        return renderAchievements();
      case 5:
        return renderSkills();
      case 6:
        return renderCertifications();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Mobile Tab Switcher */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-800 border-b border-gray-700 z-50">
        <div className="flex">
          <button
            onClick={() => setActiveTab('edit')}
            className={`flex-1 p-4 text-center ${activeTab === 'edit' ? 'bg-blue-600' : 'bg-gray-800'}`}
          >
            <Edit className="h-5 w-5 mx-auto mb-1" />
            Edit
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 p-4 text-center ${activeTab === 'preview' ? 'bg-blue-600' : 'bg-gray-800'}`}
          >
            <Eye className="h-5 w-5 mx-auto mb-1" />
            Preview
          </button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex h-screen pt-0">
        {/* Left Side - Form */}
        <div className="w-1/2 overflow-y-auto bg-gray-900 border-r border-gray-700">
          <nav className="bg-gray-800 p-4">
            <div className="flex space-x-2 overflow-x-auto">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`flex items-center gap-2 p-2 rounded-lg whitespace-nowrap ${currentStep === index
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-700 text-gray-300'
                      }`}
                  >
                    <StepIcon className="h-4 w-4" />
                    <span>{step.title}</span>
                  </button>
                );
              })}
            </div>
          </nav>
          <div className="p-6">
            {renderCurrentStep()}
          </div>
        </div>

        {/* Right Side - Preview */}
        <div className="w-1/2 bg-gray-800 overflow-y-auto">
          <div className="p-6" ref={resumePreviewRef}>
            <ResumePreview formData={formData} />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden min-h-screen pt-20 pb-20">
        {activeTab === 'edit' ? (
          <div className="p-4">
            <nav className="mb-4 overflow-x-auto">
              <div className="flex space-x-2 w-max">
                {steps.map((step, index) => {
                  const StepIcon = step.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => setCurrentStep(index)}
                      className={`flex items-center gap-2 p-2 rounded-lg whitespace-nowrap ${currentStep === index
                          ? 'bg-blue-600 text-white'
                          : 'hover:bg-gray-700 text-gray-300'
                        }`}
                    >
                      <StepIcon className="h-4 w-4" />
                      <span>{step.title}</span>
                    </button>
                  );
                })}
              </div>
            </nav>
            {renderCurrentStep()}
          </div>
        ) : (
          <div className="p-4 overflow-x-auto">
            <div ref={resumePreviewRef}>
              <ResumePreview formData={formData} />
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 flex gap-2">
        <button
          onClick={downloadPDF}
          disabled={isGeneratingPDF}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 transition-colors"
        >
          <Download className="h-5 w-5" />
          {isGeneratingPDF ? 'Generating...' : 'Export PDF'}
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 transition-colors"
          onClick={() => console.log('Save form data:', formData)}
        >
          <Save className="h-5 w-5" />
          Save Resume
        </button>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        .input-field {
          width: 100%;
          padding: 0.75rem;
          border-radius: 0.5rem;
          background-color: #1f2937;
          border: 1px solid #374151;
          color: #f3f4f6;
          transition: border-color 0.2s;
        }
        
        .input-field:focus {
          outline: none;
          border-color: #3b82f6;
        }
        
        .input-field::placeholder {
          color: #6b7280;
        }

        @media print {
          .resume-preview {
            transform: scale(1) !important;
            height: auto !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumeForm;