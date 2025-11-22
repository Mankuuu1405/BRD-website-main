import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed w-full top-0 left-0 z-100 bg-white/80 text-black backdrop-blur-md py-1 px-6 flex justify-between items-center shadow-sm">
      {/* Left - Logo */}
      <div className="text-2xl font-bold flex items-center">
        <img className="w-40 h-auto" src={logo} alt="Logo" />
      </div>

      {/* Center - Desktop Menu */}
      <div className="hidden sm:flex gap-8 text-lg font-medium">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`relative pb-1 transition-all duration-200 hover:text-blue-600 ${
              location.pathname === link.path
                ? "text-blue-700 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-blue-700"
                : "text-gray-700"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Right - Buttons (Desktop only) */}
      {location.pathname !== "/dashboards" && (
        <div className="hidden md:flex gap-6 text-lg">
          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Get Started
          </button>
        </div>
      )}

      {/* Hamburger Icon (Mobile) */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-blue-900 text-white flex flex-col items-center gap-6 py-10 md:hidden transition-all duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`text-lg ${
                location.pathname === link.path ? "underline font-semibold" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Hide button on dashboard page */}
          {location.pathname !== "/dashboards" && (
            <button
              onClick={() => {
                setMenuOpen(false);
                navigate("/signup");
              }}
              className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-500 transition"
            >
              Get Started
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
