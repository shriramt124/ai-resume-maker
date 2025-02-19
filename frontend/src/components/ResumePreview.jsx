import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ResumePreview = ({ formData }) => {
    const styles = {
        container: {
            backgroundColor: '#f8f9fa',
            color: '#1f2937',
            padding: '2rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            width: '21cm',
          
            margin: '0 auto',
            transform: 'scale(0.75)',
            transformOrigin: 'top',
            

        },
        header: {
            borderBottom: '2px solid #d1d5db',
            paddingBottom: '1rem',
            marginBottom: '1rem',
        },
        name: {
            fontSize: '2.25rem',
            fontWeight: 'bold',
            color: '#1a202c',
            letterSpacing: '-0.025em',
            marginBottom: '0.5rem'
        },
        contactInfo: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.95rem',
            color: '#4a5568',
            marginTop: '0.75rem',
            lineHeight: '1.5'
        },
        sectionTitle: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#2d3748',
            marginBottom: '1rem',
            paddingBottom: '0.5rem',
            borderBottom: '2px solid #e2e8f0'
        },
        experienceItem: {
            marginBottom: '1.5rem',
            padding: '1rem',
            borderLeft: '3px solid #3b82f6',
            backgroundColor: '#ffffff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            borderRadius: '0.25rem'
        },
        position: {
            fontWeight: '600',
            fontSize: '1.125rem',
            color: '#1a202c',
            marginBottom: '0.25rem'
        },
        date: {
            fontSize: '0.875rem',
            color: '#4b5563',
            fontStyle: 'italic',
            marginBottom: '0.5rem'
        },
        description: {
            marginTop: '0.5rem',
            color: '#374151',
            lineHeight: '1.625'
        },
        educationItem: {
            marginBottom: '1rem',
        },
        degree: {
            fontWeight: 'bold',
        },
        institution: {
            color: '#4b5563',
        },
        graduationDate: {
            fontSize: '0.875rem',
            color: '#4b5563',
        },
        skillsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '1.5rem',
            marginTop: '1rem'
        },
        skillTitle: {
            fontWeight: '600',
            color: '#2d3748',
            marginBottom: '0.75rem',
            fontSize: '1.1rem',
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: '0.25rem'
        },
        skillDescription: {
            color: '#4b5563',
            lineHeight: '1.75',
            fontSize: '0.95rem'
        },
        achievementItem: {
            marginBottom: '1rem',
        },
        title: {
            fontWeight: 'bold',
        },
        impact: {
            fontWeight: 'bold',
            color: '#374151',
            marginTop: '0.25rem',
        },
        projectItem: {
            marginBottom: '1rem',
        },
        projectName: {
            fontWeight: 'bold',
        },
        projectDescription: {
            color: '#374151',
            marginTop: '0.25rem',
        },
        technologies: {
            color: '#4b5563',
            marginTop: '0.25rem',
        },
        link: {
            color: '#2563eb',
            display: 'inline-block',
            marginTop: '0.25rem',
            textDecoration: 'none',
            ':hover': {
                color: '#1e40af',
            },
        },
        certificationItem: {
            marginBottom: '1rem',
        },
        certName: {
            fontWeight: 'bold',
        },
        issuer: {
            color: '#4b5563',
        },
        certDate: {
            fontSize: '0.875rem',
            color: '#4b5563',
        },
    };

   
    return (
        <div>
            {/* Resume Container */}
            <div id="resume-preview" style={styles.container}>
                <div style={styles.header}>
                    <h1 style={styles.name}>{formData.personalInfo.fullName || 'Your Name'}</h1>
                    <div style={styles.contactInfo}>
                        {formData.personalInfo.email && (
                            <span style={styles.contactItem}>📧 {formData.personalInfo.email}</span>
                        )}
                        {formData.personalInfo.phone && (
                            <span style={styles.contactItem}>📱 {formData.personalInfo.phone}</span>
                        )}
                        {formData.personalInfo.location && (
                            <span style={styles.contactItem}>📍 {formData.personalInfo.location}</span>
                        )}
                        {formData.personalInfo.linkedIn && (
                            <span style={styles.contactItem}>📍 {formData.personalInfo.linkedIn}</span>
                        )}
                    </div>
                </div>

                {formData.personalInfo.summary && (
                    <div style={styles.summary}>{formData.personalInfo.summary}</div>
                )}

                {/* Experience Section */}
                {formData.experience.some((exp) => exp.company) && (
                    <div style={styles.section}>
                        <h2 style={styles.sectionTitle}>Experience</h2>
                        {formData.experience.map(
                            (exp, index) =>
                                exp.company && (
                                    <div key={index} style={styles.experienceItem}>
                                        <div style={styles.position}>
                                            {exp.position} at {exp.company}
                                        </div>
                                        <div style={styles.date}>
                                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                        </div>
                                        <div style={styles.description}>{exp.description}</div>
                                    </div>
                                )
                        )}
                    </div>
                )}

                {/* Education Section */}
                {formData.education.some((edu) => edu.institution) && (
                    <div style={styles.section}>
                        <h2 style={styles.sectionTitle}>Education</h2>
                        {formData.education.map(
                            (edu, index) =>
                                edu.institution && (
                                    <div key={index} style={styles.educationItem}>
                                        <div style={styles.degree}>
                                            {edu.degree} in {edu.field}
                                        </div>
                                        <div style={styles.institution}>{edu.institution}</div>
                                        <div style={styles.graduationDate}>
                                            Graduation: {edu.graduationDate} {edu.gpa && `| GPA: ${edu.gpa}`}
                                        </div>
                                    </div>
                                )
                        )}
                    </div>
                )}

                {/* Skills Section */}
                {formData.skills.technical && (
                    <div style={styles.section}>
                        <h2 style={styles.sectionTitle}>Skills</h2>
                        <div style={styles.skillsGrid}>
                            <div>
                                <div style={styles.skillTitle}>Technical Skills</div>
                                <div style={styles.skillDescription}>{formData.skills.technical}</div>
                            </div>
                            {formData.skills.soft && (
                                <div>
                                    <div style={styles.skillTitle}>Soft Skills</div>
                                    <div style={styles.skillDescription}>{formData.skills.soft}</div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Achievements Section */}
                {formData.achievements.some((ach) => ach.title) && (
                    <div style={styles.section}>
                        <h2 style={styles.sectionTitle}>Achievements</h2>
                        {formData.achievements.map(
                            (ach, index) =>
                                ach.title && (
                                    <div key={index} style={styles.achievementItem}>
                                        <div style={styles.title}>{ach.title}</div>
                                        <div style={styles.date}>{ach.date}</div>
                                        <div style={styles.description}>{ach.description}</div>
                                        {ach.impact && <div style={styles.impact}>Impact: {ach.impact}</div>}
                                    </div>
                                )
                        )}
                    </div>
                )}

                {/* Projects Section */}
                {formData.projects.some((proj) => proj.name) && (
                    <div style={styles.section}>
                        <h2 style={styles.sectionTitle}>Projects</h2>
                        {formData.projects.map(
                            (proj, index) =>
                                proj.name && (
                                    <div key={index} style={styles.projectItem}>
                                        <div style={styles.projectName}>{proj.name}</div>
                                        <div style={styles.projectDescription}>{proj.description}</div>
                                        {proj.technologies && (
                                            <div style={styles.technologies}>Technologies: {proj.technologies}</div>
                                        )}
                                        {proj.link && (
                                            <a href={proj.link} target="_blank" rel="noopener noreferrer" style={styles.link}>
                                                Project Link
                                            </a>
                                        )}
                                    </div>
                                )
                        )}
                    </div>
                )}

                {/* Certifications Section */}
                {formData.certifications.some((cert) => cert.name) && (
                    <div style={styles.section}>
                        <h2 style={styles.sectionTitle}>Certifications</h2>
                        {formData.certifications.map(
                            (cert, index) =>
                                cert.name && (
                                    <div key={index} style={styles.certificationItem}>
                                        <div style={styles.certName}>{cert.name}</div>
                                        <div style={styles.issuer}>{cert.issuer}</div>
                                        <div style={styles.certDate}>{cert.date}</div>
                                        {cert.link && (
                                            <a href={cert.link} target="_blank" rel="noopener noreferrer" style={styles.link}>
                                                View Certificate
                                            </a>
                                        )}
                                    </div>
                                )
                        )}
                    </div>
                )}
            </div>
 
        </div>
    );
};

export default ResumePreview;