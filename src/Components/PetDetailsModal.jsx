import React from 'react';
import './ShelterPage.css';

const PetDetailsModal = ({ pet, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="pet-details-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>
          &times;
        </button>
        
        <div className="modal-content">
          <div className="modal-header">
            <h2>{pet.name}</h2>
            <div className="pet-basic-info">
              <span className="pet-age">{pet.age}</span>
              <span className="pet-breed">{pet.breed}</span>
            </div>
            <p className="pet-shelter">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              {pet.shelter}
            </p>
          </div>
          
          <div className="modal-body">
            <div className="modal-image" style={{ backgroundImage: `url(${pet.image})` }}></div>
            
            <div className="pet-description">
              <h3>About {pet.name}</h3>
              <p>This adorable {pet.breed.toLowerCase()} is looking for a loving forever home. {pet.name} is currently in the care of {pet.shelter} and is ready to meet potential adopters.</p>
              
              <div className="pet-details-grid">
                <div className="detail-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <div>
                    <span className="detail-label">Age</span>
                    <span className="detail-value">{pet.age}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
                    <path d="M8.5 8.5v.01"></path>
                    <path d="M16 15.5v.01"></path>
                    <path d="M12 12v.01"></path>
                    <path d="M11 17v.01"></path>
                    <path d="M7 14v.01"></path>
                  </svg>
                  <div>
                    <span className="detail-label">Breed</span>
                    <span className="detail-value">{pet.breed}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <div>
                    <span className="detail-label">Location</span>
                    <span className="detail-value">{pet.location || "Mumbai"}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <div>
                    <span className="detail-label">Contact</span>
                    <span className="detail-value">+91 98765 43210</span>
                  </div>
                </div>
              </div>
              
              <div className="adoption-info">
                <h4>Adoption Process</h4>
                <ol>
                  <li>Fill out an adoption application</li>
                  <li>Schedule a meet-and-greet</li>
                  <li>Home visit (if required)</li>
                  <li>Finalize adoption paperwork</li>
                </ol>
              </div>
            </div>
          </div>
          
          <div className="modal-actions">
            <button className="action-button primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              Contact Shelter
            </button>
            <button className="action-button secondary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Schedule Visit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetailsModal;