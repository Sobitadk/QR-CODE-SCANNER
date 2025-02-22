import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:bg-gray-900 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-3xl font-bold tracking-tight">QR Snack System</h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center gap-x-8 flex-1">
          <Link 
            to="/" 
            className="px-4 py-2 rounded-md hover:bg-white/10 transition-colors duration-200"
          >
            Home
          </Link>
          <Link 
            to="/scan" 
            className="px-4 py-2 rounded-md hover:bg-white/10 transition-colors duration-200"
          >
            Scan QR
          </Link>
          <Link 
            to="/dashboard" 
            className="px-4 py-2 rounded-md hover:bg-white/10 transition-colors duration-200"
          >
            Dashboard
          </Link>
          <Link 
            to="/about" 
            className="px-4 py-2 rounded-md hover:bg-white/10 transition-colors duration-200"
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className="px-4 py-2 rounded-md hover:bg-white/10 transition-colors duration-200"
          >
            Contact
          </Link>
        </div>

        {/* Right Section: Dark Mode & Menu Button */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleDarkMode} 
            className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
          <button 
            onClick={toggleMenu} 
            className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200 md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-gradient-to-r from-blue-600 to-indigo-700 dark:bg-gray-900 p-4 shadow-lg">
          <div className="space-y-4">
            <Link 
              to="/" 
              className="block px-4 py-3 rounded-md hover:bg-white/10 transition-colors duration-200"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              to="/scan" 
              className="block px-4 py-3 rounded-md hover:bg-white/10 transition-colors duration-200"
              onClick={closeMenu}
            >
              Scan QR
            </Link>
            <Link 
              to="/dashboard" 
              className="block px-4 py-3 rounded-md hover:bg-white/10 transition-colors duration-200"
              onClick={closeMenu}
            >
              Dashboard
            </Link>
            <Link 
              to="/about" 
              className="block px-4 py-3 rounded-md hover:bg-white/10 transition-colors duration-200"
              onClick={closeMenu}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="block px-4 py-3 rounded-md hover:bg-white/10 transition-colors duration-200"
              onClick={closeMenu}
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