import React from "react";
import "./ShelterPage.css";

const ShelterDetailsModal = ({ shelter, onClose }) => {
  if (!shelter) return null;

  // Default achievements if not provided by the shelter data
  const achievements = shelter.achievements || [
    "Rescued and rehabilitated hundreds of animals",
    "Conducted regular adoption drives and awareness programs",
    "Provided medical care to injured stray animals",
    "Worked with local authorities to improve animal welfare",
  ];

  // Default current needs if not provided
  const currentNeeds = shelter.currentNeeds || [
    "Dog and cat food donations",
    "Medical supplies",
    "Blankets and bedding",
    "Volunteers for weekend support",
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="pet-details-card shelter-details-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-modal" onClick={onClose}>
          &times;
        </button>

        <div className="card-image-container">
          <div
            className="pet-image"
            style={{ backgroundImage: `url(${shelter.image})` }}
          ></div>
        </div>

        <div className="card-content">
          <div className="pet-header">
            <h2>{shelter.name}</h2>
            <div className="pet-meta">
              <span className="pet-breed">{shelter.location}</span>
              <span className="established-year">
                Est. {shelter.established}
              </span>
            </div>
          </div>

          <div className="shelter-description">
            <p>{shelter.fullDescription || shelter.description}</p>
          </div>

          <div className="shelter-details-section">
            <h3>Our Achievements</h3>
            <ul className="achievements-list">
              {achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>

          <div className="shelter-details-section">
            <h3>Current Needs</h3>
            <ul className="needs-list">
              {currentNeeds.map((need, index) => (
                <li key={index}>{need}</li>
              ))}
            </ul>
          </div>

          <div className="contact-section">
            <h3>Contact Information</h3>
            <div className="detail-row">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <div>
                <span className="detail-label">Address</span>
                <span className="detail-value">{shelter.address}</span>
              </div>
            </div>

            <div className="detail-row">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <div>
                <span className="detail-label">Phone</span>
                <span className="detail-value">{shelter.phone}</span>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button className="primary-button">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              Support Shelter
            </button>
            <button className="secondary-button" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShelterDetailsModal;
