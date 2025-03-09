import React from 'react';
import { motion } from 'framer-motion';

const PreviewResume = ({ formData, handlePrevious, handleSubmit }) => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-6">Preview Your Resume</h2>

      {/* Personal Information */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-blue-400">Personal Information</h3>
        <div className="bg-gray-800/50 p-6 rounded-xl space-y-2">
          <p><span className="text-gray-400">Name:</span> {formData.personalInfo.fullName}</p>
          <p><span className="text-gray-400">Email:</span> {formData.personalInfo.email}</p>
          <p><span className="text-gray-400">Phone:</span> {formData.personalInfo.phone}</p>
          {formData.personalInfo.location && (
            <p><span className="text-gray-400">Location:</span> {formData.personalInfo.location}</p>
          )}
          {formData.personalInfo.linkedIn && (
            <p><span className="text-gray-400">LinkedIn:</span> {formData.personalInfo.linkedIn}</p>
          )}
          {formData.personalInfo.github && (
            <p><span className="text-gray-400">GitHub:</span> {formData.personalInfo.github}</p>
          )}
          {formData.personalInfo.portfolio && (
            <p><span className="text-gray-400">Portfolio:</span> {formData.personalInfo.portfolio}</p>
          )}
          {formData.personalInfo.summary && (
            <p><span className="text-gray-400">Summary:</span> {formData.personalInfo.summary}</p>
          )}
        </div>
      </section>

      {/* Experience */}
      {formData.experience.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-blue-400">Experience</h3>
          <div className="space-y-4">
            {formData.experience.map((exp, index) => (
              <div key={index} className="bg-gray-800/50 p-6 rounded-xl space-y-2">
                <p className="font-medium">{exp.position} at {exp.company}</p>
                <p className="text-sm text-gray-400">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </p>
                <p className="text-gray-300">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {formData.education.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-blue-400">Education</h3>
          <div className="space-y-4">
            {formData.education.map((edu, index) => (
              <div key={index} className="bg-gray-800/50 p-6 rounded-xl space-y-2">
                <p className="font-medium">{edu.degree} in {edu.field}</p>
                <p>{edu.institution}</p>
                <p className="text-sm text-gray-400">Graduated: {edu.graduationDate}</p>
                {edu.gpa && <p className="text-sm text-gray-400">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {formData.projects.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-blue-400">Projects</h3>
          <div className="space-y-4">
            {formData.projects.map((project, index) => (
              <div key={index} className="bg-gray-800/50 p-6 rounded-xl space-y-2">
                <p className="font-medium">{project.name}</p>
                <p className="text-gray-300">{project.description}</p>
                {project.technologies && (
                  <p className="text-sm text-gray-400">Technologies: {project.technologies}</p>
                )}
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" 
                    className="text-blue-400 hover:text-blue-300 text-sm">View Project</a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-blue-400">Skills</h3>
        <div className="bg-gray-800/50 p-6 rounded-xl space-y-4">
          {formData.skills.technical && (
            <div>
              <p className="font-medium mb-2">Technical Skills</p>
              <p className="text-gray-300">{formData.skills.technical}</p>
            </div>
          )}
          {formData.skills.soft && (
            <div>
              <p className="font-medium mb-2">Soft Skills</p>
              <p className="text-gray-300">{formData.skills.soft}</p>
            </div>
          )}
          {formData.skills.languages && (
            <div>
              <p className="font-medium mb-2">Languages</p>
              <p className="text-gray-300">{formData.skills.languages}</p>
            </div>
          )}
        </div>
      </section>

      {/* Certifications */}
      {formData.certifications.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-blue-400">Certifications</h3>
          <div className="space-y-4">
            {formData.certifications.map((cert, index) => (
              <div key={index} className="bg-gray-800/50 p-6 rounded-xl space-y-2">
                <p className="font-medium">{cert.name}</p>
                <p>{cert.issuer}</p>
                <p className="text-sm text-gray-400">Earned: {cert.date}</p>
                {cert.link && (
                  <a href={cert.link} target="_blank" rel="noopener noreferrer" 
                    className="text-blue-400 hover:text-blue-300 text-sm">View Certificate</a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Achievements */}
      {formData.achievements.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-blue-400">Achievements</h3>
          <div className="space-y-4">
            {formData.achievements.map((achievement, index) => (
              <div key={index} className="bg-gray-800/50 p-6 rounded-xl space-y-2">
                <p className="font-medium">{achievement.title}</p>
                {achievement.date && (
                  <p className="text-sm text-gray-400">Date: {achievement.date}</p>
                )}
                {achievement.description && (
                  <p className="text-gray-300">{achievement.description}</p>
                )}
                {achievement.impact && (
                  <p className="text-gray-300">Impact: {achievement.impact}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

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
          type="button"
          onClick={handleSubmit}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-medium transition-colors duration-200"
        >
          Submit Resume
        </motion.button>
      </div>
    </div>
  );
};

export default PreviewResume;