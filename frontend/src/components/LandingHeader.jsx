// src/components/LandingHeader.jsx
import { useState } from "react";
import { Menu, X } from "lucide-react";
import {Link} from 'react-router-dom';

const LandingHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-orange-600">🔥 FireLog</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          <a href="#overview" className="text-gray-700 hover:text-orange-600">Overview</a>
          <a href="#pricing" className="text-gray-700 hover:text-orange-600">Pricing</a>
          <a href="#about" className="text-gray-700 hover:text-orange-600">About Us</a>
          <Link to="/login">
            <button className="px-4 py-2 rounded border text-sm hover:bg-gray-100" >Login</button>
          </Link>
          <Link to="/register">
            <button className="px-4 py-2 rounded bg-orange-600 text-white text-sm hover:bg-orange-700">Sign Up</button>
            </Link>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white shadow">
          <a href="#overview" className="block text-gray-700 hover:text-orange-600">Overview</a>
          <a href="#pricing" className="block text-gray-700 hover:text-orange-600">Pricing</a>
          <a href="#about" className="block text-gray-700 hover:text-orange-600">About Us</a>
          <button className="w-full text-left px-2 py-2 rounded hover:bg-gray-100">Login</button>
          <button className="w-full text-left px-2 py-2 rounded bg-orange-600 text-white hover:bg-orange-700">Sign Up</button>
        </div>
      )}
    </header>
  );
};

export default LandingHeader;
