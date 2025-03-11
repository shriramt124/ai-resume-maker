import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Check, ChevronRight, ChevronLeft, Layers, Eye, Save } from 'lucide-react';

const PreviewPortal = ({ isOpen, onClose, children, formData, onTemplateChange }) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [activeTemplate, setActiveTemplate] = useState(formData?.templateId || 'template1');
    const [downloadSuccess, setDownloadSuccess] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [currentTemplateIndex, setCurrentTemplateIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('preview'); // 'preview' or 'templates'
    const [sessionId, setSessionId] = useState(null);
    const [isCreatingSession, setIsCreatingSession] = useState(false);
    
    const templates = [
        { id: 'template1', name: 'Professional', color: 'from-blue-500 to-indigo-600' },
        { id: 'template2', name: 'Creative', color: 'from-purple-500 to-pink-600' },
        { id: 'template3', name: 'Minimalist', color: 'from-emerald-500 to-teal-600' },
        { id: 'template4', name: 'Modern', color: 'from-red-500 to-orange-600' },
        { id: 'template5', name: 'Classic', color: 'from-gray-500 to-gray-700' },
        { id: 'template6', name: 'Elegant', color: 'from-amber-500 to-yellow-600' },
    ];

    // Create a session when the component mounts or when formData changes significantly
    useEffect(() => {
        if (isOpen && formData && !sessionId && !isCreatingSession) {
            createSession();
        }
    }, [isOpen, formData]);

    useEffect(() => {
        if (formData?.templateId) {
            setActiveTemplate(formData.templateId);
            const index = templates.findIndex(t => t.id === formData.templateId);
            if (index !== -1) setCurrentTemplateIndex(index);
        }
    }, [formData?.templateId]);

    useEffect(() => {
        if (downloadSuccess) {
            const timer = setTimeout(() => {
                setDownloadSuccess(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [downloadSuccess]);
    
    useEffect(() => {
        if (saveSuccess) {
            const timer = setTimeout(() => {
                setSaveSuccess(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [saveSuccess]);

    if (!isOpen) return null;

    // Create a new session with the current form data
    const createSession = async () => {
        try {
            setIsCreatingSession(true);
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
            setIsCreatingSession(false);
        }
    };

    // Update the session with new form data
    const updateSession = async (updatedFormData) => {
        if (!sessionId) return;
        
        try {
            const response = await fetch(`http://localhost:3000/resume/update-preview-session/${sessionId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(updatedFormData)
            });

            if (!response.ok) {
                // If session expired, create a new one
                if (response.status === 404) {
                    await createSession();
                } else {
                    throw new Error('Failed to update preview session');
                }
            }
        } catch (error) {
            console.error('Error updating preview session:', error);
        }
    };

    const handleDownload = async () => {
        try {
            setIsDownloading(true);
            
            // Use sessionId if available, otherwise fall back to query params
            let url;
            if (sessionId) {
                url = `http://localhost:3000/resume/download-pdf?templateId=${activeTemplate}&sessionId=${sessionId}`;
            } else {
                const queryParams = new URLSearchParams({
                    templateId: activeTemplate,
                    data: encodeURIComponent(JSON.stringify(formData))
                }).toString();
                url = `http://localhost:3000/resume/download-pdf?${queryParams}`;
            }

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to download PDF');
            }

            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = `resume-${new Date().toISOString().split('T')[0]}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(downloadUrl);
            document.body.removeChild(a);
            setDownloadSuccess(true);
        } catch (error) {
            console.error('Error downloading PDF:', error);
            alert('Failed to download PDF. Please try again.');
        } finally {
            setIsDownloading(false);
        }
    };

    const handleTemplateChange = (templateId) => {
        setActiveTemplate(templateId);
        onTemplateChange(templateId);
        
        // Update the form data with the new template ID
        const updatedFormData = {
            ...formData,
            templateId: templateId
        };
        
        // Update the session with the new template
        updateSession(updatedFormData);
        
        // Force iframe refresh with new template and session ID
        const previewElement = document.querySelector('iframe');
        if (previewElement) {
            if (sessionId) {
                previewElement.src = `http://localhost:3000/resume/showByTemplateId?templateId=${templateId}&sessionId=${sessionId}&refresh=${Date.now()}`;
            } else {
                // Fall back to the old method if session creation failed
                previewElement.src = `http://localhost:3000/resume/showByTemplateId?templateId=${templateId}&data=${encodeURIComponent(JSON.stringify(updatedFormData))}&refresh=${Date.now()}`;
            }
        }
    };
    
    const handleSave = async () => {
        try {
            setIsSaving(true);
            const updatedFormData = {
                ...formData,
                templateId: activeTemplate
            };
            
            const response = await fetch('http://localhost:3000/resume/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(updatedFormData)
            });

            if (!response.ok) {
                throw new Error('Failed to save resume');
            }
            
            setSaveSuccess(true);
        } catch (error) {
            console.error('Error saving resume:', error);
            alert('Failed to save resume. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const navigateTemplates = (direction) => {
        const newIndex = (currentTemplateIndex + direction + templates.length) % templates.length;
        setCurrentTemplateIndex(newIndex);
        handleTemplateChange(templates[newIndex].id);
    };

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                    animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
                    exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] overflow-hidden"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                        className="h-screen flex items-center justify-center p-4"
                    >
                        <div className="w-[95vw] h-[90vh] bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl flex overflow-hidden relative border border-gray-800/30">
                            {/* Header with title and buttons */}
                            <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 z-20 bg-gradient-to-b from-gray-900/90 to-transparent h-16 backdrop-blur-sm">
                                <div className="flex items-center space-x-3">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-xl font-bold text-white/90"
                                    >
                                        Resume Preview
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="px-3 py-1.5 rounded-full bg-gray-800/90 text-sm font-medium text-gray-300"
                                    >
                                        {templates.find(t => t.id === activeTemplate)?.name || 'Template'}
                                    </motion.div>
                                </div>

                                {/* Mobile tabs - only visible on small screens */}
                                <div className="md:hidden flex items-center gap-2 bg-gray-800/90 rounded-lg p-1.5">
                                    <motion.button
                                        onClick={() => setActiveTab('templates')}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'templates' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-gray-300'}`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Layers className="w-4 h-4" />
                                        Templates
                                    </motion.button>
                                    <motion.button
                                        onClick={() => setActiveTab('preview')}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'preview' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-gray-300'}`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Eye className="w-4 h-4" />
                                        Preview
                                    </motion.button>
                                </div>

                                <div className="hidden md:flex items-center gap-3">
                                    <AnimatePresence mode="wait">
                                        {saveSuccess ? (
                                            <motion.div
                                                key="save-success"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium"
                                            >
                                                <Check className="w-4 h-4" />
                                                Saved
                                            </motion.div>
                                        ) : (
                                            <motion.button
                                                key="save"
                                                onClick={handleSave}
                                                disabled={isSaving}
                                                className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                {isSaving ? (
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    >
                                                        <Save className="w-4 h-4" />
                                                    </motion.div>
                                                ) : (
                                                    <Save className="w-4 h-4" />
                                                )}
                                                {isSaving ? 'Saving...' : 'Save Resume'}
                                            </motion.button>
                                        )}
                                    </AnimatePresence>
                                    
                                    <AnimatePresence mode="wait">
                                        {downloadSuccess ? (
                                            <motion.div
                                                key="download-success"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium"
                                            >
                                                <Check className="w-4 h-4" />
                                                Downloaded
                                            </motion.div>
                                        ) : (
                                            <motion.button
                                                key="download"
                                                onClick={handleDownload}
                                                disabled={isDownloading}
                                                className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                {isDownloading ? (
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    >
                                                        <Download className="w-4 h-4" />
                                                    </motion.div>
                                                ) : (
                                                    <Download className="w-4 h-4" />
                                                )}
                                                {isDownloading ? 'Downloading...' : 'Download PDF'}
                                            </motion.button>
                                        )}
                                    </AnimatePresence>

                                    <motion.button
                                        onClick={onClose}
                                        className="p-2 rounded-lg bg-gray-800/90 text-gray-400 hover:text-gray-200 hover:bg-gray-700/90 transition-colors"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <X className="w-5 h-5" />
                                    </motion.button>
                                </div>
                            </div>

                            {/* Main content area */}
                            <div className="flex flex-1 h-full pt-16">
                                {/* Template selection sidebar - hidden on mobile when preview tab is active */}
                                <div className={`w-72 bg-gray-900/50 border-r border-gray-800/30 flex-shrink-0 overflow-y-auto ${activeTab === 'preview' ? 'hidden md:block' : ''}`}>
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold mb-4 text-gray-200">Choose Template</h3>
                                        <div className="space-y-4">
                                            {templates.map((template, index) => (
                                                <motion.button
                                                    key={template.id}
                                                    onClick={() => handleTemplateChange(template.id)}
                                                    className={`w-full rounded-lg border transition-all overflow-hidden ${activeTemplate === template.id ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-gray-800/50 hover:border-gray-700/50'}`}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <div className="relative">
                                                        {/* Template thumbnail/preview */}
                                                        <div className="h-32 bg-white">
                                                            <div className={`h-full w-full flex items-center justify-center bg-gradient-to-br ${template.color} opacity-10`}>
                                                                {/* Placeholder for actual template thumbnail */}
                                                                <div className="w-3/4 h-4/5 bg-white rounded border border-gray-300 flex flex-col p-2">
                                                                    <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
                                                                    <div className="flex-1 flex flex-col space-y-1">
                                                                        <div className="w-full h-2 bg-gray-100 rounded"></div>
                                                                        <div className="w-3/4 h-2 bg-gray-100 rounded"></div>
                                                                        <div className="w-5/6 h-2 bg-gray-100 rounded"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        {/* Template name and indicator */}
                                                        <div className="p-3 bg-gray-800/80">
                                                            <div className="flex items-center justify-between">
                                                                <div className="font-medium text-gray-200">{template.name}</div>
                                                                {activeTemplate === template.id && (
                                                                    <div className="bg-blue-500 text-white rounded-full p-1">
                                                                        <Check className="w-3 h-3" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className={`h-1 w-16 mt-2 rounded bg-gradient-to-r ${template.color}`} />
                                                        </div>
                                                    </div>
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Preview area - hidden on mobile when templates tab is active */}
                                <div className={`flex-1 ${activeTab === 'templates' ? 'hidden md:block' : ''}`}>
                                    <div className='w-full h-full'>
                                        {children}
                                     </div>
                                           
                                    
                                  
                                </div>
                            </div>

                            {/* Mobile navigation buttons */}
                            <div className="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-gray-800/90 backdrop-blur-sm rounded-lg p-1.5 border border-gray-700/30 shadow-lg">
                                <motion.button
                                    onClick={() => navigateTemplates(-1)}
                                    className="p-2 rounded-md text-gray-400 hover:text-gray-300 hover:bg-gray-700/50"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </motion.button>
                                <div className="px-3 py-1 text-sm font-medium text-gray-300 flex flex-col items-center">
                                    <span className="text-xs text-blue-400">{templates[currentTemplateIndex].name}</span>
                                    <span>{currentTemplateIndex + 1} / {templates.length}</span>
                                </div>
                                <motion.button
                                    onClick={() => navigateTemplates(1)}
                                    className="p-2 rounded-md text-gray-400 hover:text-gray-300 hover:bg-gray-700/50"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </motion.button>
                            </div>
                            
                            {/* Mobile action buttons */}
                            <div className="md:hidden fixed bottom-20 left-1/2 transform -translate-x-1/2 flex items-center gap-3 bg-gray-800/90 backdrop-blur-sm rounded-lg p-2 border border-gray-700/30 shadow-lg">
                                <motion.button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="flex items-center gap-1 px-3 py-1.5 bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {isSaving ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        >
                                            <Save className="w-3 h-3" />
                                        </motion.div>
                                    ) : (
                                        <Save className="w-3 h-3" />
                                    )}
                                    {isSaving ? 'Saving' : 'Save'}
                                </motion.button>
                                
                                <motion.button
                                    onClick={handleDownload}
                                    disabled={isDownloading}
                                    className="flex items-center gap-1 px-3 py-1.5 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {isDownloading ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        >
                                            <Download className="w-3 h-3" />
                                        </motion.div>
                                    ) : (
                                        <Download className="w-3 h-3" />
                                    )}
                                    {isDownloading ? 'Downloading' : 'Download'}
                                </motion.button>
                                
                                <motion.button
                                    onClick={onClose}
                                    className="p-1.5 rounded-lg bg-gray-700/90 text-gray-400 hover:text-gray-200 hover:bg-gray-600/90 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <X className="w-3 h-3" />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default PreviewPortal;


