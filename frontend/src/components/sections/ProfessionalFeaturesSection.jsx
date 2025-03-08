import React from 'react';
import { Sparkles, Layout, Download, CheckCircle, AtSign, Trophy, DollarSign } from 'lucide-react';

const ProfessionalFeaturesSection = () => {
    return (
        <section className="py-20 bg-gray-900">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose ResumeAI?</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Built with cutting-edge technology to help you create the perfect resume
                        for your dream job.
                    </p>
                </div>

                {/* Main Features (3-column layout from image) */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {[
                        {
                            icon: AtSign,
                            title: 'Easy with AI',
                            description: 'Quickly generate formal phrases and summaries. Sound professional, faster.'
                        },
                        {
                            icon: Trophy,
                            title: 'Beat the competition',
                            description: 'Our tested resume templates are designed to make you more attractive to recruiters.'
                        },
                        {
                            icon: DollarSign,
                            title: 'Get paid more',
                            description: 'A higher salary begins with a strong resume. Our salary analyzer tells you if your job offer is competitive (or not).'
                        }
                    ].map((feature, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg flex flex-col md:flex-row items-start gap-4"
                        >
                            <div className="p-3 bg-blue-600/20 rounded-lg mb-4 md:mb-0">
                                <feature.icon className="w-6 h-6 text-blue-500" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-400">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Features (4-column layout) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        {
                            icon: Sparkles,
                            title: 'AI-Powered Writing',
                            description: 'Smart suggestions and auto-completion to perfect your content.'
                        },
                        {
                            icon: Layout,
                            title: 'Beautiful Templates',
                            description: 'Professional designs that catch the recruiters eye.'
                        },
                        {
                            icon: Download,
                            title: 'Easy Export',
                            description: 'Download in multiple formats including PDF, Word, and more.'
                        },
                        {
                            icon: CheckCircle,
                            title: 'ATS-Friendly',
                            description: 'Optimized for Applicant Tracking Systems.'
                        }
                    ].map((feature, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg"
                        >
                            <div className="p-3 bg-blue-600/20 rounded-lg w-fit mb-4">
                                <feature.icon className="w-6 h-6 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProfessionalFeaturesSection;