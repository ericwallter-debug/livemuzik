import React, { useState } from 'react';
import { Menu, X, Music } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToEvents = () => {
    const eventsSection = document.getElementById('events');
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false); // Close mobile menu if open
  };

  return (
    <header className="relative bg-white/10 backdrop-blur-md border-b border-white/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Music className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">ShowGoEW1</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">
              Home
            </a>
            <button onClick={scrollToEvents} className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">
              Events
            </button>
          </div>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-white/20 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-white/20 shadow-lg">
            <div className="px-4 py-4 space-y-4">
              <a href="#" className="block text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">
                Home
              </a>
              <button onClick={scrollToEvents} className="block text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">
                Events
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;