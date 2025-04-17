import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo_light from "../assets/logo-black.png";
import logo_dark from "../assets/logo-white.png";
import search_icon_light from "../assets/search-w.png";
import search_icon_dark from "../assets/search-b.png";
import toggle_light from "../assets/night copy.png";
import toggle_dark from "../assets/day copy.png";
import { useAuth } from "./AuthContext";
import Login from "./Login";
import SignUp from "./SignUp";

const Navbar = ({ theme, setTheme }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggle_mode = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  // Close mobile menu when a link is clicked
  const handleNavLinkClick = () => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className={`navbar ${mobileMenuOpen ? "mobile-menu-open" : ""}`}>
      <div className="navbar-left">
        <img
          src={theme === "light" ? logo_light : logo_dark}
          alt="PAWPAW Logo"
          className="logo"
        />

        {/* Mobile menu button */}
        <button
          className={`mobile-menu-button ${mobileMenuOpen ? "menu-open" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        <ul className="nav-links">
          <li>
            <Link to="/" onClick={handleNavLinkClick}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/find-pet" onClick={handleNavLinkClick}>
              Find A Pet
            </Link>
          </li>
          <li>
            <Link to="/adoption-faq" onClick={handleNavLinkClick}>
              Adoption FAQ's
            </Link>
          </li>
          <li>
            <Link to="/caring" onClick={handleNavLinkClick}>
              Caring For Pets
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={handleNavLinkClick}>
              About Us
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-right">
        <div className="search-box">
          <input type="text" placeholder="Search..." />
          <img
            src={theme === "light" ? search_icon_dark : search_icon_light}
            alt="Search"
          />
        </div>

        <div className="auth-buttons">
          {user ? (
            <div className="user-info">
              <span>Welcome, {user.name}</span>
              <button onClick={logout}>Logout</button>
            </div>
          ) : (
            <>
              <button className="login-btn" onClick={() => setShowLogin(true)}>
                Login
              </button>
              <button
                className="signup-btn"
                onClick={() => setShowSignup(true)}
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        <img
          onClick={toggle_mode}
          src={theme === "light" ? toggle_light : toggle_dark}
          alt="Theme Toggle"
          className="toggle-icon"
        />
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Modal Backdrop */}
      {(showLogin || showSignup) && (
        <div
          className="modal-backdrop"
          onClick={() => {
            setShowLogin(false);
            setShowSignup(false);
          }}
        ></div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <div className="auth-modal">
          <Login onClose={() => setShowLogin(false)} />
        </div>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <div className="auth-modal">
          <SignUp onClose={() => setShowSignup(false)} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
