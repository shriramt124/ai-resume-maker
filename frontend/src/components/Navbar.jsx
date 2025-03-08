import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Menu, X, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="fixed w-full z-50 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <Sparkles className="text-blue-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                ResumeAI
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
            <Link to="/info" className="text-gray-300 hover:text-white transition-colors">Create Resume</Link>
            <Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link>
            <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
            
            {!user ? (
              <Link to="/login">
                <button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-full font-medium transition-colors">
                  Get Started
                </button>
              </Link>
            ) : (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors"
                >
                  <User size={20} className="text-white" />
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg py-1 z-50 border border-gray-800">
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Profile
                    </Link>
                    <button 
                      onClick={() => {
                        logout();
                        setIsProfileOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      <div className="flex items-center">
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </div>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            {isNavOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isNavOpen && (
        <div className="md:hidden bg-gray-900">
          <div className="container mx-auto px-6 py-4">
            <Link 
              to="/" 
              className="block py-2 text-gray-300 hover:text-white"
              onClick={() => setIsNavOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/info" 
              className="block py-2 text-gray-300 hover:text-white"
              onClick={() => setIsNavOpen(false)}
            >
              Create Resume
            </Link>
            <Link 
              to="/pricing" 
              className="block py-2 text-gray-300 hover:text-white"
              onClick={() => setIsNavOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/contact" 
              className="block py-2 text-gray-300 hover:text-white"
              onClick={() => setIsNavOpen(false)}
            >
              Contact
            </Link>
            
            {!user ? (
              <Link 
                to="/login" 
                className="block mt-4"
                onClick={() => setIsNavOpen(false)}
              >
                <button className="w-full bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-full font-medium transition-colors">
                  Get Started
                </button>
              </Link>
            ) : (
              <div className="mt-4 border-t border-gray-800 pt-4">
                <Link 
                  to="/profile" 
                  className="flex items-center py-2 text-gray-300 hover:text-white"
                  onClick={() => setIsNavOpen(false)}
                >
                  <User size={16} className="mr-2" />
                  Profile
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    setIsNavOpen(false);
                  }}
                  className="flex items-center w-full text-left py-2 text-gray-300 hover:text-white"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;