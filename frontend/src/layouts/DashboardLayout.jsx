// components/DashboardLayout.jsx
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { BarChart3, XIcon } from 'lucide-react';
import { useState } from 'react';

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="flex h-screen bg-gray-950 overflow-hidden">
            {/* Mobile menu button */}
            <button
                className="md:hidden fixed top-6 left-6 z-50 p-3 bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-lg hover:bg-gray-700/80 transition-colors"
                onClick={() => setSidebarOpen(true)}
            >
                <BarChart3 className="w-5 h-5 text-white" />
            </button>

            {/* Sidebar */}
            <nav className={`fixed md:sticky top-0 z-40 h-screen w-72 transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                <div className="h-full bg-gray-900/95 backdrop-blur-sm border-r border-gray-800/50 shadow-xl flex flex-col">
                    <div className="p-6 flex justify-between items-center">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            ResumeAI
                        </h1>
                        <button
                            className="md:hidden p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <XIcon className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>

                    <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive ? 'bg-blue-500/10 text-blue-400 font-medium' : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'}`
                            }
                        >
                            📊 Overview
                        </NavLink>
                        {/* <NavLink
                            to="/dashboard/createresume"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive ? 'bg-blue-500/10 text-blue-400 font-medium' : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'}`
                            }
                        >
                            📝 Create Resume
                        </NavLink> */}
                        <NavLink
                            to="/dashboard/coverletters"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive ? 'bg-blue-500/10 text-blue-400 font-medium' : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'}`
                            }
                        >
                            📄 Cover Letters
                        </NavLink>
                        <NavLink
                            to="/dashboard/profile"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive ? 'bg-blue-500/10 text-blue-400 font-medium' : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'}`
                            }
                        >
                            👤 Profile
                        </NavLink>
                        <NavLink
                            to="/dashboard/templates"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive ? 'bg-blue-500/10 text-blue-400 font-medium' : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'}`
                            }
                        >
                            🎨 Templates
                        </NavLink>
                    </div>
                </div>
            </nav>

            {/* Main content */}
            <main className="flex-1 overflow-y-auto bg-gray-950/50 backdrop-blur-sm p-4 md:p-6">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;