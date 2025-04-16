import React, { useState, useRef } from "react";
import { useAuth } from "./AuthContext";
import "./PetSwipe.css";
import "./AddPetModal.css";

const AddPetModal = ({ onClose, onPetAdded }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    age: "",
    location: "",
    distance: "",
    bio: "",
    owner: "",
    phone: "",
    email: "",
    vaccinated: false,
    neutered: false,
    energyLevel: "Medium",
    goodWith: [],
    featured: false,
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setUploadError("");
    const file = e.target.files[0];
    
    if (!file) {
      console.log("No file selected");
      return;
    }
    
    console.log("File selected:", file.name, file.type, file.size);
    
    // Simple validation
    if (!file.type.startsWith('image/')) {
      setUploadError("Please select an image file");
      return;
    }
    
    setImageFile(file);
    
    // Create a preview URL using an object URL instead of FileReader
    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);
    
    console.log("Image preview created:", objectUrl);
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
  
  const handleImageUploadClick = () => {
    // Programmatically click the file input
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!imageFile) {
      setUploadError("Please upload an image of the pet");
      return;
    }

    // Generate a unique ID for the new pet for frontend use
    const newId = Math.floor(Math.random() * 100000);

    // Prepare the pet object with all required fields
    const newPet = {
      id: newId,
      ...formData,
      age: parseInt(formData.age) || 1,
      timestamp: new Date(),
      action: "liked", // For frontend display purposes
      image: imagePreview, // Use the image preview for display
      imageFile: imageFile, // Pass the file for upload
      featured: formData.featured, // Include featured status
      userId: user ? user._id : null, // Include the user ID if available
    };

    console.log("Submitting pet with image:", imageFile.name);
    
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
            </div>
          </div>
          
          <div className="form-section">
            <h3 className="section-title">Pet Image</h3>
            <div className="form-group">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
                style={{ display: 'none' }}
              />
              
              <button 
                type="button" 
                onClick={handleImageUploadClick}
                className="upload-btn"
              >
                Select Image
              </button>
              
              {imageFile && (
                <p className="file-selected">
                  Selected: {imageFile.name}
                </p>
              )}
              
              {uploadError && (
                <p className="error-message">{uploadError}</p>
              )}
              
              <div className="image-preview-container">
                {imagePreview ? (
                  <img 
                    src={imagePreview} 
                    alt="Pet preview" 
                    className="image-preview" 
                  />
                ) : (
                  <div className="upload-placeholder">
                    <p>Image preview will appear here</p>
                  </div>
                )}
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
                
                {/* Show featured checkbox only for shelter users */}
                {user && user.role === 'shelter' && (
                  <label className="checkbox-label featured-checkbox">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                    />
                    <span className="checkmark"></span>
                    Feature this pet on homepage
                  </label>
                )}
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
            </div>

            <div className="form-group">
              <label>Good With</label>
              <div className="checkbox-group good-with">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value="Kids"
                    checked={formData.goodWith.includes("Kids")}
                    onChange={handleGoodWithChange}
                  />
                  <span className="checkmark"></span>
                  Kids
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value="Other Dogs"
                    checked={formData.goodWith.includes("Other Dogs")}
                    onChange={handleGoodWithChange}
                  />
                  <span className="checkmark"></span>
                  Other Dogs
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value="Cats"
                    checked={formData.goodWith.includes("Cats")}
                    onChange={handleGoodWithChange}
                  />
                  <span className="checkmark"></span>
                  Cats
                </label>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Add Pet
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPetModal;
