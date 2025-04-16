import React, { useState } from "react";
import "./ContactForm.css";
import { submitPartnerApplication } from "../services/partnerService";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await submitPartnerApplication(formData);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      // Reset form after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      setError("Failed to submit form. Please try again later.");
      console.error("Error submitting form:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-form-container">
      <div className="contact-form-card">
        {/* Left Side - Visual Element */}
        <div className="form-visual">
          <div className="visual-overlay"></div>
          <h2 className="visual-title">Partner With Us</h2>
          <p className="visual-text">
            Join our network of shelters making a difference
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="form-content">
          {isSubmitted ? (
            <div className="success-state">
              <div className="success-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
              <h3>Submission Successful!</h3>
              <p>We'll get back to you within 24 hours</p>
              <button
                className="back-button"
                onClick={() => setIsSubmitted(false)}
              >
                Submit Another
              </button>
            </div>
          ) : (
            <>
              <h2 className="form-title">Become a Partner Shelter</h2>
              {error && <div className="error-message">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder=" "
                    disabled={isLoading}
                  />
                  <label>Your Name *</label>
                </div>

                <div className="input-group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder=" "
                    disabled={isLoading}
                  />
                  <label>Your Email *</label>
                </div>

                <div className="input-group">
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder=" "
                    disabled={isLoading}
                  />
                  <label>Subject *</label>
                </div>

                <div className="input-group">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="form-textarea"
                    placeholder=" "
                    disabled={isLoading}
                  ></textarea>
                  <label>Message *</label>
                </div>

                <button
                  type="submit"
                  className="submit-button"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit Application"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Contact Info Footer */}
      <div className="contact-info-footer">
        <div className="info-block">
          <h3>Address</h3>
          <p>
            MARS International India Pvt. Ltd.,
            <br />
            Survey No. 56/64, Gauaram Village,
            <br />
            Behind Janatha Hotel, Wargal Monmdal,
            <br />
            Medak District, Medak, Telangana, 502279
          </p>
        </div>
        <div className="info-block">
          <h3>Contact</h3>
          <p>contact@in.mars.com</p>
          <p>Tel: 1800 889 21 21 (Toll free)</p>
          <p>Landline: +91 8454 350080/81</p>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
