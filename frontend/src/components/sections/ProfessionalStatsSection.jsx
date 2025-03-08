import React from 'react';
import { Users, Clock, Award, TrendingUp } from 'lucide-react';

const ProfessionalStatsSection = () => {
    return (
        <section className="py-16 bg-gray-900">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Join over <span className="text-blue-500">46,573,000</span></h2>
                    <div className="h-1 w-64 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto"></div>
                    <h3 className="text-2xl md:text-3xl font-bold mt-4">users worldwide</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Stat Card 1 */}
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg overflow-hidden relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-blue-600/20 rounded-lg">
                                    <Users className="w-6 h-6 text-blue-500" />
                                </div>
                                <span className="text-5xl font-bold text-blue-500">94%</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Success Rate</h3>
                            <p className="text-gray-400">Of our users land interviews within 30 days of using our platform</p>
                        </div>
                    </div>

                    {/* Stat Card 2 */}
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg overflow-hidden relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-teal-600/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-green-600/20 rounded-lg">
                                    <Clock className="w-6 h-6 text-green-500" />
                                </div>
                                <span className="text-5xl font-bold text-green-500">10x</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Time Saved</h3>
                            <p className="text-gray-400">Create professional resumes in minutes instead of hours</p>
                        </div>
                    </div>

                    {/* Stat Card 3 */}
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg overflow-hidden relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-purple-600/20 rounded-lg">
                                    <Award className="w-6 h-6 text-purple-500" />
                                </div>
                                <span className="text-5xl font-bold text-purple-500">250+</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Templates</h3>
                            <p className="text-gray-400">Professional templates designed by HR experts and designers</p>
                        </div>
                    </div>

                    {/* Stat Card 4 */}
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg overflow-hidden relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-red-600/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-orange-600/20 rounded-lg">
                                    <TrendingUp className="w-6 h-6 text-orange-500" />
                                </div>
                                <span className="text-5xl font-bold text-orange-500">35%</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Salary Increase</h3>
                            <p className="text-gray-400">Average salary increase reported by users after using our platform</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfessionalStatsSection;