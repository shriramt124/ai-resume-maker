import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const ProfessionalCoverLetterShowcase = () => {
    // State to track active tab (0 for Cover Letter, 1 for Features)
    const [activeTab, setActiveTab] = useState(0);

    return (
        <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-950 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Professional Cover Letter Examples
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-6">
                        Stand out from the competition with our expertly crafted cover letter examples
                    </p>
                    <div className="flex justify-center md:justify-end">
                        <a
                            href="/cover-letters"
                            className="px-6 py-3 rounded-lg font-semibold bg-gray-800 border border-gray-700 hover:bg-gray-700 transition-colors duration-200 flex items-center gap-2 group"
                        >
                            View All Examples
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>

                {/* Tab buttons for small screens */}
                <div className="md:hidden flex mb-6 border border-gray-700 rounded-lg overflow-hidden">
                    <button 
                        className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${activeTab === 0 ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'}`}
                        onClick={() => setActiveTab(0)}
                    >
                        Cover Letter
                    </button>
                    <button 
                        className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${activeTab === 1 ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'}`}
                        onClick={() => setActiveTab(1)}
                    >
                        Features
                    </button>
                </div>

                {/* Cover Letter Example and Features */}
                <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-800 shadow-xl">
                    {/* Cover Letter Example - Show on large screens or when active tab is 0 */}
                    <div className={`lg:w-3/5 p-8 bg-white backdrop-blur-sm ${(activeTab === 0 || window.innerWidth >= 768) ? 'block' : 'hidden md:block'}`}>
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-inner h-full">
                            <h3 className="text-xl font-bold mb-6 text-gray-800">Professional Cover Letter</h3>
                            
                            <div className="text-gray-700 space-y-4 text-sm md:text-base">
                                <p>Dear Hiring Manager,</p>
                                
                                <p>I am writing to express my strong interest in the [Position] role at [Company Name], as 
                                advertised on your company website. With my track record of [relevant achievement] and 
                                expertise in [relevant skill], I am confident in my ability to contribute significantly to your 
                                team.</p>
                                
                                <p>In my current role at [Current Company], I have successfully [specific achievement with 
                                metrics]. This experience has honed my skills in [relevant skills] and prepared me to take 
                                on new challenges in a dynamic environment like [Company Name].</p>
                                
                                <p>What particularly draws me to [Company Name] is your commitment to [company 
                                value/achievement]. I am impressed by your recent [specific company project/initiative] 
                                and would be thrilled to contribute to similar innovative projects.</p>
                                
                                <p>Thank you for considering my application. I look forward to discussing how my skills and 
                                experience align with your team's needs.</p>
                                
                                <p>Sincerely,</p>
                                <p>[Your Name]</p>
                            </div>
                        </div>
                    </div>

                    {/* Key Features - Show on large screens or when active tab is 1 */}
                    <div className={`lg:w-2/5 p-8 flex flex-col justify-center ${(activeTab === 1 || window.innerWidth >= 768) ? 'block' : 'hidden md:block'}`}>
                        <h3 className="text-xl font-bold mb-6 text-blue-400">Key Features</h3>
                        
                        <div className="space-y-6">
                            <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700/30 hover:border-blue-500/30 hover:bg-blue-900/10 transition-all duration-300">
                                <h4 className="font-medium mb-2">Professional tone with clear structure</h4>
                                <p className="text-gray-400 text-sm">Our templates maintain a professional voice while following proper business letter formatting.</p>
                            </div>
                            
                            <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700/30 hover:border-blue-500/30 hover:bg-blue-900/10 transition-all duration-300">
                                <h4 className="font-medium mb-2">Specific achievements with metrics</h4>
                                <p className="text-gray-400 text-sm">Showcase your impact with quantifiable results that demonstrate your value to potential employers.</p>
                            </div>
                            
                            <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700/30 hover:border-blue-500/30 hover:bg-blue-900/10 transition-all duration-300">
                                <h4 className="font-medium mb-2">Company research demonstration</h4>
                                <p className="text-gray-400 text-sm">Show that you've done your homework by referencing specific company initiatives or values.</p>
                            </div>
                            
                            <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700/30 hover:border-blue-500/30 hover:bg-blue-900/10 transition-all duration-300">
                                <h4 className="font-medium mb-2">Clear value proposition</h4>
                                <p className="text-gray-400 text-sm">Articulate exactly how your skills and experience will benefit the company.</p>
                            </div>
                        </div>
                        
                        <button className="mt-8 w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors duration-200">
                            Use This Template
                        </button>
                    </div>
                </div>
                
                {/* Additional information */}
                <div className="mt-12 text-center">
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Our cover letter examples are crafted by professional resume writers and have been proven to help job seekers land interviews across various industries.
                    </p>
                </div>
            </div>

            {/* Fix for window.innerWidth reference in SSR */}
            <script dangerouslySetInnerHTML={{ __html: `
                document.addEventListener('DOMContentLoaded', function() {
                    const updateVisibility = () => {
                        const coverLetter = document.querySelector('.cover-letter-section');
                        const features = document.querySelector('.features-section');
                        if (coverLetter && features) {
                            if (window.innerWidth >= 768) {
                                coverLetter.classList.remove('hidden');
                                features.classList.remove('hidden');
                            }
                        }
                    };
                    window.addEventListener('resize', updateVisibility);
                    updateVisibility();
                });
            `}} />
        </section>
    );
};

export default ProfessionalCoverLetterShowcase;