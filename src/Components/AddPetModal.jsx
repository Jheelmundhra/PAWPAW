import React, { useState } from "react";
import "./PetSwipe.css";
import "./AddPetModal.css";

const AddPetModal = ({ onClose, onPetAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    age: "",
    location: "",
    distance: "",
    image: "",
    bio: "",
    owner: "",
    phone: "",
    email: "",
    vaccinated: false,
    neutered: false,
    energyLevel: "Medium",
    goodWith: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleGoodWithChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const newGoodWith = checked
        ? [...prev.goodWith, value]
        : prev.goodWith.filter((item) => item !== value);
      return { ...prev, goodWith: newGoodWith };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate a unique ID for the new pet for frontend use
    const newId = Math.floor(Math.random() * 100000);

    // Prepare the pet object with all required fields
    const newPet = {
      id: newId,
      ...formData,
      age: parseInt(formData.age) || 1,
      timestamp: new Date(),
      action: "liked", // For frontend display purposes
      // Make sure we have these fields to match backend model
      bio: formData.bio, // This maps to description in the backend
      image: formData.image, // This maps to imageUrl in the backend
    };

    // Call the onPetAdded callback with the new pet
    onPetAdded(newPet);

    // Close the modal
    onClose();
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 9999 }}>
      <div className="add-pet-modal" style={{ zIndex: 10000 }}>
        <div className="modal-header">
          <h2>Add New Pet</h2>
          <button className="close-btn" onClick={onClose}>
            <span className="close-icon">&times;</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="pet-form">
          <div className="form-section">
            <h3 className="section-title">Basic Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Pet Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Breed</label>
                <input
                  type="text"
                  name="breed"
                  value={formData.breed}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Age (years)</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Distance</label>
                <input
                  type="text"
                  name="distance"
                  value={formData.distance}
                  onChange={handleChange}
                  placeholder="e.g. 2 miles away"
                  required
                />
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">About Your Pet</h3>
            <div className="form-group">
              <label>Bio Description</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Pet Details</h3>
            <div className="details-grid">
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="vaccinated"
                    checked={formData.vaccinated}
                    onChange={handleChange}
                  />
                  <span className="checkmark"></span>
                  Vaccinated
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="neutered"
                    checked={formData.neutered}
                    onChange={handleChange}
                  />
                  <span className="checkmark"></span>
                  Neutered
                </label>
              </div>

              <div className="form-group">
                <label>Energy Level</label>
                <select
                  name="energyLevel"
                  value={formData.energyLevel}
                  onChange={handleChange}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Very High">Very High</option>
                </select>
              </div>

              <div className="form-group">
                <label>Good With</label>
                <div className="good-with-options">
                  {["Kids", "Other Dogs", "Cats"].map((option) => (
                    <label key={option} className="good-with-label">
                      <input
                        type="checkbox"
                        value={option}
                        checked={formData.goodWith.includes(option)}
                        onChange={handleGoodWithChange}
                      />
                      <span className="good-with-checkmark"></span>
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Contact Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  name="owner"
                  value={formData.owner}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Add Pet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPetModal;
