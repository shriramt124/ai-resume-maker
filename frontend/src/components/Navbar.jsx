import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

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
            <button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-full font-medium transition-colors">
              Get Started
            </button>
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
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;