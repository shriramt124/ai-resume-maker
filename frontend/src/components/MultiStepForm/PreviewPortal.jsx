import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Check, ChevronRight, ChevronLeft, Layers, Eye } from 'lucide-react';

const PreviewPortal = ({ isOpen, onClose, children, formData, onTemplateChange }) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [activeTemplate, setActiveTemplate] = useState(formData?.templateId || 'template1');
    const [downloadSuccess, setDownloadSuccess] = useState(false);
    const [currentTemplateIndex, setCurrentTemplateIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('preview'); // 'preview' or 'templates'

    const templates = [
        { id: 'template1', name: 'Professional', color: 'from-blue-500 to-indigo-600' },
        { id: 'template2', name: 'Creative', color: 'from-purple-500 to-pink-600' },
        { id: 'template3', name: 'Minimalist', color: 'from-emerald-500 to-teal-600' },
    ];

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

    if (!isOpen) return null;

    const handleDownload = async () => {
        try {
            setIsDownloading(true);
            const queryParams = new URLSearchParams({
                templateId: activeTemplate,
                data: encodeURIComponent(JSON.stringify(formData))
            }).toString();

            const response = await fetch(`http://localhost:3000/resume/download-pdf?${queryParams}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to download PDF');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `resume-${new Date().toISOString().split('T')[0]}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
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
                                        {downloadSuccess ? (
                                            <motion.div
                                                key="success"
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
                                        <div className="space-y-3">
                                            {templates.map((template, index) => (
                                                <motion.button
                                                    key={template.id}
                                                    onClick={() => handleTemplateChange(template.id)}
                                                    className={`w-full p-4 rounded-lg border transition-all ${activeTemplate === template.id ? 'border-blue-500/50 bg-blue-500/10' : 'border-gray-800/50 hover:border-gray-700/50 bg-gray-800/30'}`}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <div className="text-left">
                                                        <div className="font-medium text-gray-200 mb-1">{template.name}</div>
                                                        <div className={`h-1 w-12 rounded bg-gradient-to-r ${template.color}`} />
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
                            <div className="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-gray-800/90 backdrop-blur-sm rounded-lg p-1.5 border border-gray-700/30">
                                <motion.button
                                    onClick={() => navigateTemplates(-1)}
                                    className="p-2 rounded-md text-gray-400 hover:text-gray-300 hover:bg-gray-700/50"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </motion.button>
                                <div className="px-3 py-1 text-sm font-medium text-gray-300">
                                    {currentTemplateIndex + 1} / {templates.length}
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
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default PreviewPortal;


