import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-content">
                <p className="footer-message">
                    Just saving animals' lives. Together we work towards bringing about a significant change in
                    the society towards homeless companion animals. Hats off to them!
                </p>
                
                <div className="footer-buttons">
                    <Link to="/partner-shelters" className="footer-btn">Partner Shelters & NGOs</Link>
                    <Link to="/become-partner" className="footer-btn">Contact us to become a partner shelter</Link>
                </div>

                <div className="footer-sections">
                    <div className="footer-section">
                        <h3>Adopt a Pet</h3>
                        <Link to="/">Home</Link>
                        <Link to="/partner-shelters">Partner Shelters & NGOs</Link>
                        <Link to="/create-account">Create an account</Link>
                    </div>

                    <div className="footer-section">
                        <h3>Resources</h3>
                        <Link to="/find-pet">Find a Pet</Link>
                        <Link to="/caring">Caring For Pets</Link>
                        <Link to="/signin">Sign in</Link>
                    </div>

                    <div className="footer-section">
                        <h3>About</h3>
                        <Link to="/adoption-faq">Adoption FAQs</Link>
                        <Link to="/about">About Us</Link>
                        <Link to="/contact">Contact Us</Link>
                    </div>

                    <div className="footer-section">
                        <h3>Legal</h3>
                        <a href="https://mars.com">Visit Mars.com</a>
                        <Link to="/modern-slavery">Modern Slavery Act</Link>
                        <Link to="/privacy">Privacy Statement</Link>
                        <Link to="/legal">Legal</Link>
                        <Link to="/accessibility">Accessibility</Link>
                        <Link to="/supply-chain">CA Supply Chain Transparency</Link>
                        <Link to="/cookies">Cookies Notice</Link>
                    </div>

                    <div className="footer-section">
                        <h3>Follow Us</h3>
                        <div className="social-links">
                            <a href="#" className="social-link">FB</a>
                            <a href="#" className="social-link">IG</a>
                            <a href="#" className="social-link">TW</a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>©2023 Mars or Affiliates.</p>
                    <a href="#" className="ad-choices">AdChoices</a>
                </div>
            </div>
        </div>
    );
};

export default Footer; 