import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PreviewPortal from './PreviewPortal';
import PersonalInfoForm from './steps/PersonalInfoForm';
import ExperienceForm from './steps/ExperienceForm';
import EducationForm from './steps/EducationForm';
import ProjectsForm from './steps/ProjectsForm';
import SkillsForm from './steps/SkillsForm';
import CertificationsForm from './steps/CertificationsForm';
import AchievementsForm from './steps/AchievementsForm';
import PreviewResume from './PreviewResume';

const MultiStepForm = () => {
    const location = useLocation();
    const [currentStep, setCurrentStep] = useState(1);
    const [showPreview, setShowPreview] = useState(false);
    const [previewUrl, setPreviewUrl] = useState('');
    const [isPreviewLoading, setIsPreviewLoading] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const [formData, setFormData] = useState(location.state?.resumeData || {
        personalInfo: {
            photo: '',
            fullName: 'shriram tiwari',
            email: 'shriramt.124@gmail.com',
            phone: '9516559181',
            location: 'indore',
            linkedIn: '',
            github: '',
            portfolio: '',
            summary: 'i am a full stack developer with proficient in mern stack enxtjs dsa compouter networsk and backend '
        },
        experience: [],
        education: [],
        projects: [],
        skills: {
            technical: '',
            soft: '',
            languages: ''
        },
        certifications: [],
        achievements: [],
        templateId: 'template1' // Default template
    });

    const steps = [
        { id: 1, title: 'Personal Info', component: PersonalInfoForm },
        { id: 2, title: 'Experience', component: ExperienceForm },
        { id: 3, title: 'Education', component: EducationForm },
        { id: 4, title: 'Projects', component: ProjectsForm },
        { id: 5, title: 'Skills', component: SkillsForm },
        { id: 6, title: 'Certifications', component: CertificationsForm },
        { id: 7, title: 'Achievements', component: AchievementsForm },
        { id: 8, title: 'Preview', component: PreviewResume }
    ];

    const handleNext = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const updateFormData = (stepData, step) => {
        setFormData(prev => ({
            ...prev,
            [step]: stepData
        }));
    };

    // Initialize form data from location state if available
    useEffect(() => {
        if (location.state?.resumeData) {
            console.log('Initializing form with existing resume data:', location.state.resumeData);
            setFormData(location.state.resumeData);
        }
    }, [location.state]);

    // Create a preview session when form data changes significantly
    useEffect(() => {
        // Only create a session if we have meaningful data
        if (formData.personalInfo?.fullName && !sessionId) {
            createPreviewSession();
        }
    }, [formData.personalInfo?.fullName]);

    // Create a new session with the current form data
    const createPreviewSession = async () => {
        try {
            setIsPreviewLoading(true);
            const response = await fetch('http://localhost:3000/resume/create-preview-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to create preview session');
            }

            const data = await response.json();
            setSessionId(data.sessionId);
        } catch (error) {
            console.error('Error creating preview session:', error);
        } finally {
            setIsPreviewLoading(false);
        }
    };

    // Update the session with new form data
    const updatePreviewSession = async () => {
        if (!sessionId) return;
        
        try {
            const response = await fetch(`http://localhost:3000/resume/update-preview-session/${sessionId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                // If session expired, create a new one
                if (response.status === 404) {
                    await createPreviewSession();
                } else {
                    throw new Error('Failed to update preview session');
                }
            }
        } catch (error) {
            console.error('Error updating preview session:', error);
        }
    };

    const handlePreview = async () => {
        setIsPreviewLoading(true);
        try {
            // If we have a session ID, update it; otherwise create a new one
            if (sessionId) {
                await updatePreviewSession();
            } else {
                await createPreviewSession();
            }
            setShowPreview(true);
        } catch (error) {
            console.error('Error generating preview:', error);
            // Handle error (e.g., show error message)
        } finally {
            setIsPreviewLoading(false);
        }
    };

    const handleSubmit = async () => {
        setIsPreviewLoading(true);
        try {
            const response = await fetch('http://localhost:3000/resume/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to save resume');
            }

            const data = await response.json();
            setShowPreview(true);
        } catch (error) {
            console.error('Error saving resume:', error);
            // Handle error (e.g., show error message)
        } finally {
            setIsPreviewLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 py-4 sm:py-8 relative">
            <div className="container mx-auto px-2 sm:px-4">
                {/* Progress Bar */}
                <div className="mb-4 sm:mb-8 overflow-x-auto">
                    <div className="flex justify-between mb-2 min-w-[640px] sm:min-w-0">
                        {steps.map((step) => (
                            <div
                                key={step.id}
                                className={`flex-1 text-center ${currentStep >= step.id ? 'text-blue-500' : 'text-gray-500'}`}
                            >
                                <div className="relative">
                                    <div
                                        className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto rounded-full flex items-center justify-center border-2 text-xs sm:text-sm
                    ${currentStep === step.id ? 'border-blue-500 bg-blue-500' :
                                                currentStep > step.id ? 'border-blue-500 bg-blue-500' : 'border-gray-500'}`}
                                    >
                                        {currentStep > step.id ? '✓' : step.id}
                                    </div>
                                    <div className="text-xs sm:text-sm mt-1 sm:mt-2">{step.title}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                            <div className="w-full bg-gray-800 rounded-full">
                                <motion.div
                                    className="bg-blue-500 h-1.5 sm:h-2 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preview Button */}
                <motion.button
                    onClick={handlePreview}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center justify-center gap-2 mb-4"
                    disabled={isPreviewLoading}
                >
                    {isPreviewLoading ? (
                        <span className="animate-spin">⌛</span>
                    ) : (
                        <span>👁️</span>
                    )}
                    Preview Resume
                </motion.button>

                {/* Form Steps */}
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-xl p-6"
                    >
                        {React.createElement(steps[currentStep - 1].component, {
                            formData,
                            updateFormData,
                            handleNext,
                            handlePrevious,
                            isFirstStep: currentStep === 1,
                            isLastStep: currentStep === steps.length,
                            handleSubmit
                        })}
                    </motion.div>
                </AnimatePresence>

                {/* Preview Portal */}
                <PreviewPortal
                    isOpen={showPreview}
                    onClose={() => setShowPreview(false)}
                    formData={formData}
                    onTemplateChange={(template) => setFormData(prev => ({ ...prev, templateId: template }))}
                >
                    <iframe
                        src={sessionId 
                            ? `http://localhost:3000/resume/showByTemplateId?templateId=${formData.templateId}&sessionId=${sessionId}&refresh=${Date.now()}` 
                            : `http://localhost:3000/resume/showByTemplateId?templateId=${formData.templateId}&data=${encodeURIComponent(JSON.stringify(formData))}&refresh=${Date.now()}`
                        }
                        title="Resume Preview"
                        className="rounded-lg bg-white w-full h-full"
                        style={{
                            width: '100%', /* A4 width in pixels */
                            height: '100%', /* A4 height in pixels */
                            border: 'none',
                            display: 'block',
                            margin: '0 auto',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
                        }}
                        frameBorder="0"
                    />
                </PreviewPortal>


            </div>
        </div>
    );
};

export default MultiStepForm;