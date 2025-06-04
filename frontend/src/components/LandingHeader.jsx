// src/components/LandingHeader.jsx
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const LandingHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role"); // 'admin' or 'client'
    setIsAuthenticated(!!token);
    setRole(userRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    navigate("/");
  };

  const dashboardLink = role === "admin" ? "/admin/dashboard" : "/client/dashboard";

  return (
    <header className="bg-[#7E22CE] shadow-md fixed top-0 left-0 right-0 z-50 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-orange-600">🔥 FireLog</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          <a href="#overview" className="hover:text-orange-600">Overview</a>
          <a href="#pricing" className="hover:text-orange-600">Pricing</a>
          <a href="#about" className="hover:text-orange-600">About Us</a>

          {isAuthenticated ? (
            <>
              <Link to={dashboardLink}>
                <button className="px-4 py-2 rounded bg-orange-600 text-white text-sm hover:bg-orange-700">
                  Dashboard
                </button>
              </Link>
              <button onClick={handleLogout} className="px-4 py-2 rounded border text-sm hover:bg-gray-100">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="px-4 py-2 rounded border text-sm hover:bg-gray-100">Login</button>
              </Link>
              <Link to="/register">
                <button className="px-4 py-2 rounded bg-orange-600 text-white text-sm hover:bg-orange-700">Sign Up</button>
              </Link>
            </>
          )}
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
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white shadow text-gray-700">
          <a href="#overview" className="block hover:text-orange-600">Overview</a>
          <a href="#pricing" className="block hover:text-orange-600">Pricing</a>
          <a href="#about" className="block hover:text-orange-600">About Us</a>

          {isAuthenticated ? (
            <>
              <Link to={dashboardLink} className="block px-2 py-2 hover:bg-gray-100 rounded">Dashboard</Link>
              <button onClick={handleLogout} className="w-full text-left px-2 py-2 hover:bg-gray-100 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="block px-2 py-2 hover:bg-gray-100 rounded">Login</Link>
              <Link to="/register" className="block px-2 py-2 bg-orange-600 text-white hover:bg-orange-700 rounded">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default LandingHeader;
