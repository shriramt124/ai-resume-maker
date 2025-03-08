// components/DashboardLayout.jsx
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { BarChart3, XIcon } from 'lucide-react';
import { useState } from 'react';

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="flex h-screen bg-gray-950">
            {/* Mobile menu button */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800/80 rounded-lg"
                onClick={() => setSidebarOpen(true)}
            >
                <BarChart3 className="w-6 h-6 text-white" />
            </button>

            {/* Sidebar */}
            <nav className={`fixed md:relative z-40 bg-gray-900 w-64 h-full transition-all duration-300 
        ${sidebarOpen ? 'left-0' : '-left-full md:left-0'}`}>
                <div className="p-6 flex justify-between items-center">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        ResumeAI
                    </h1>
                    <button
                        className="md:hidden p-2"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <XIcon className="w-6 h-6 text-white" />
                    </button>
                </div>

                <div className="mt-8">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `flex items-center gap-4 p-4 rounded-lg transition-colors ${isActive ? 'bg-gray-800/50 text-blue-400' : 'text-gray-400 hover:bg-gray-700/50'
                            }`
                        }
                    >
                        📊 Overview
                    </NavLink>
                    <NavLink
                        to="/dashboard/createresume"
                        className={({ isActive }) =>
                            `flex items-center gap-4 p-4 rounded-lg transition-colors ${isActive ? 'bg-gray-800/50 text-blue-400' : 'text-gray-400 hover:bg-gray-700/50'
                            }`
                        }
                    >
                        📝 Create Resume
                    </NavLink>
                    <NavLink
                        to="/dashboard/coverletters"
                        className={({ isActive }) =>
                            `flex items-center gap-4 p-4 rounded-lg transition-colors ${isActive ? 'bg-gray-800/50 text-blue-400' : 'text-gray-400 hover:bg-gray-700/50'
                            }`
                        }
                    >
                        📄 Cover Letters
                    </NavLink>
                    <NavLink
                        to="/dashboard/profile"
                        className={({ isActive }) =>
                            `flex items-center gap-4 p-4 rounded-lg transition-colors ${isActive ? 'bg-gray-800/50 text-blue-400' : 'text-gray-400 hover:bg-gray-700/50'
                            }`
                        }
                    >
                        📄 Profile
                    </NavLink>
                    <NavLink
                        to="/dashboard/templates"
                        className={({ isActive }) =>
                            `flex items-center gap-4 p-4 rounded-lg transition-colors ${isActive ? 'bg-gray-800/50 text-blue-400' : 'text-gray-400 hover:bg-gray-700/50'
                            }`
                        }
                    >
                        📄 Templates
                    </NavLink>
                </div>
            </nav>

            {/* Main content */}
            <div className="flex-1 ml-0 md:ml-64 p-6 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;