import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Added this import
import "./Navbar.css";
import logo_light from '../assets/logo-black.png';
import logo_dark from '../assets/logo-white.png';
import search_icon_light from '../assets/search-w.png';
import search_icon_dark from '../assets/search-b.png';
import toggle_light from '../assets/night copy.png';
import toggle_dark from '../assets/day copy.png';
import { useAuth } from './AuthContext';
import Login from './Login';
import Signup from './Signup';

const Navbar = ({ theme, setTheme }) => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const { user, logout } = useAuth();

    const toggle_mode = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
    };

    return (
        <div className='navbar'>
            <div className="navbar-left">
                <img 
                    src={theme === 'light' ? logo_light : logo_dark} 
                    alt="PAWPAW Logo" 
                    className='logo' 
                />
                <ul className='nav-links'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/find-pet">Find A Pet</Link></li> {/* This will show the swipe feature */}
                    <li><Link to="/adoption-faq">Adoption FAQ's</Link></li>
                    <li><Link to="/caring">Caring For Pets</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                </ul>
            </div>

            <div className="navbar-right">
                <div className='search-box'>
                    <input type="text" placeholder='Search...' />
                    <img src={theme === 'light' ? search_icon_dark : search_icon_light} alt="Search" />
                </div>

                <div className="auth-buttons">
                    {user ? (
                        <div className="user-info">
                            <span>Welcome, {user.name}</span>
                            <button onClick={logout}>Logout</button>
                        </div>
                    ) : (
                        <>
                            <button className="login-btn" onClick={() => setShowLogin(true)}>Login</button>
                            <button className="signup-btn" onClick={() => setShowSignup(true)}>Sign Up</button>
                        </>
                    )}
                </div>

                <img 
                    onClick={toggle_mode} 
                    src={theme === 'light' ? toggle_light : toggle_dark} 
                    alt="Theme Toggle" 
                    className='toggle-icon' 
                />
            </div>

            {/* Modal Backdrop */}
            {(showLogin || showSignup) && (
                <div className="modal-backdrop" onClick={() => {
                    setShowLogin(false);
                    setShowSignup(false);
                }}></div>
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
                    <Signup onClose={() => setShowSignup(false)} />
                </div>
            )}
        </div>
    );
};

export default Navbar;