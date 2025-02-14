import React from 'react';

const ResumePreview = ({ formData }) => (
    <div className="bg-white text-gray-900 p-8 shadow-lg w-[21cm] mx-auto transform scale-[0.75] origin-top">
        <div className="max-w-4xl mx-auto">
            <header className="border-b-2 border-gray-300 pb-4 mb-4">
                <h1 className="text-3xl font-bold text-gray-800">{formData.personalInfo.fullName || 'Your Name'}</h1>
                <div className="flex flex-wrap gap-3 text-sm text-gray-600 mt-2">
                    {formData.personalInfo.email && (
                        <span className="flex items-center gap-1">
                            <span>📧</span> {formData.personalInfo.email}
                        </span>
                    )}
                    {formData.personalInfo.phone && (
                        <span className="flex items-center gap-1">
                            <span>📱</span> {formData.personalInfo.phone}
                        </span>
                    )}
                    {formData.personalInfo.location && (
                        <span className="flex items-center gap-1">
                            <span>📍</span> {formData.personalInfo.location}
                        </span>
                    )}
                </div>
                {formData.personalInfo.summary && (
                    <p className="mt-4 text-gray-700">{formData.personalInfo.summary}</p>
                )}
            </header>

            {formData.experience.some(exp => exp.company) && (
                <section className="mb-6">
                    <h2 className="text-xl font-bold mb-3 text-gray-800">Experience</h2>
                    {formData.experience.map((exp, index) => (
                        exp.company && (
                            <div key={index} className="mb-4">
                                <h3 className="font-semibold">{exp.position} at {exp.company}</h3>
                                <p className="text-sm text-gray-600">
                                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                </p>
                                <p className="mt-2 text-gray-700">{exp.description}</p>
                            </div>
                        )
                    ))}
                </section>
            )}

            {formData.education.some(edu => edu.institution) && (
                <section className="mb-6">
                    <h2 className="text-xl font-bold mb-3 text-gray-800">Education</h2>
                    {formData.education.map((edu, index) => (
                        edu.institution && (
                            <div key={index} className="mb-4">
                                <h3 className="font-semibold">{edu.degree} in {edu.field}</h3>
                                <p className="text-gray-600">{edu.institution}</p>
                                <p className="text-sm text-gray-600">
                                    Graduation: {edu.graduationDate} {edu.gpa && `| GPA: ${edu.gpa}`}
                                </p>
                            </div>
                        )
                    ))}
                </section>
            )}

            {formData.skills.technical && (
                <section className="mb-6">
                    <h2 className="text-xl font-bold mb-3 text-gray-800">Skills</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-semibold mb-2">Technical Skills</h3>
                            <p className="text-gray-700">{formData.skills.technical}</p>
                        </div>
                        {formData.skills.soft && (
                            <div>
                                <h3 className="font-semibold mb-2">Soft Skills</h3>
                                <p className="text-gray-700">{formData.skills.soft}</p>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {formData.achievements.some(ach => ach.title) && (
                <section className="mb-6">
                    <h2 className="text-xl font-bold mb-3 text-gray-800">Achievements</h2>
                    {formData.achievements.map((ach, index) => (
                        ach.title && (
                            <div key={index} className="mb-4">
                                <h3 className="font-semibold">{ach.title}</h3>
                                <p className="text-sm text-gray-600">{ach.date}</p>
                                <p className="mt-1 text-gray-700">{ach.description}</p>
                                {ach.impact && (
                                    <p className="mt-1 text-gray-700 font-medium">Impact: {ach.impact}</p>
                                )}
                            </div>
                        )
                    ))}
                </section>
            )}

            {formData.projects.some(proj => proj.name) && (
                <section className="mb-6">
                    <h2 className="text-xl font-bold mb-3 text-gray-800">Projects</h2>
                    {formData.projects.map((proj, index) => (
                        proj.name && (
                            <div key={index} className="mb-4">
                                <h3 className="font-semibold">{proj.name}</h3>
                                <p className="text-gray-700 mt-1">{proj.description}</p>
                                {proj.technologies && (
                                    <p className="text-gray-600 mt-1">Technologies: {proj.technologies}</p>
                                )}
                                {proj.link && (
                                    <a href={proj.link} className="text-blue-600 hover:text-blue-800 mt-1 inline-block">
                                        Project Link
                                    </a>
                                )}
                            </div>
                        )
                    ))}
                </section>
            )}

            {formData.certifications.some(cert => cert.name) && (
                <section className="mb-6">
                    <h2 className="text-xl font-bold mb-3 text-gray-800">Certifications</h2>
                    {formData.certifications.map((cert, index) => (
                        cert.name && (
                            <div key={index} className="mb-4">
                                <h3 className="font-semibold">{cert.name}</h3>
                                <p className="text-gray-600">{cert.issuer}</p>
                                <p className="text-sm text-gray-600">{cert.date}</p>
                                {cert.link && (
                                    <a href={cert.link} className="text-blue-600 hover:text-blue-800 mt-1 inline-block">
                                        View Certificate
                                    </a>
                                )}
                            </div>
                        )
                    ))}
                </section>
            )}
        </div>
    </div>
);

export default ResumePreview;
