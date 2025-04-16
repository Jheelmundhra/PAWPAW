import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import api from '../services/api';
import './AddShelterModal.css';

const AddShelterModal = ({ isOpen, onClose, onShelterAdded }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.match('image.*')) {
      setMessage({ text: 'Please select an image file', type: 'error' });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage({ text: 'File size should not exceed 5MB', type: 'error' });
      return;
    }

    setImageFile(file);

    // Show image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      console.log('User object:', user); // Debug log to see user structure
      
      // Check if user exists and has either id or _id property
      if (!user || (!user._id && !user.id)) {
        setMessage({ text: 'You must be logged in to add a shelter', type: 'error' });
        setIsLoading(false);
        return;
      }

      // Create form data for file upload
      const shelterFormData = new FormData();
      shelterFormData.append('name', formData.name);
      shelterFormData.append('description', formData.description);
      shelterFormData.append('location', formData.location);
      shelterFormData.append('contactEmail', formData.contactEmail);
      shelterFormData.append('contactPhone', formData.contactPhone);
      shelterFormData.append('website', formData.website);
      
      // Use either _id or id, whichever is available
      const userId = user._id || user.id;
      shelterFormData.append('userId', userId);
      
      if (imageFile) {
        shelterFormData.append('image', imageFile);
      }

      // Get token - try multiple possible locations
      const token = user.token || user.accessToken || localStorage.getItem('token');
      
      if (!token) {
        setMessage({ text: 'Authentication token not found. Please log in again.', type: 'error' });
        setIsLoading(false);
        return;
      }
      
      console.log('Using token:', token); // Debug log for token
      
      const response = await api.createShelter(shelterFormData, token);

      if (response.shelter) {
        setMessage({ text: 'Shelter added successfully!', type: 'success' });
        // Reset form
        setFormData({
          name: '',
          description: '',
          location: '',
          contactEmail: '',
          contactPhone: '',
          website: '',
        });
        setImageFile(null);
        setImagePreview('');
        
        // Notify parent component
        if (onShelterAdded) {
          onShelterAdded(response.shelter);
        }
        
        // Close modal after a delay
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setMessage({ text: response.message || 'Error adding shelter', type: 'error' });
      }
    } catch (error) {
      console.error('Error adding shelter:', error);
      
      let errorMessage = 'Failed to add shelter. Please try again.';
      
      // Try to get more detailed error information if available
      if (error.response) {
        try {
          const errorData = await error.response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
          console.log('Could not parse error response:', e);
        }
      }
      
      // Check if it's a CORS error
      if (error.message && error.message.includes('has been blocked by CORS policy')) {
        errorMessage = 'Server connection issue (CORS). Please contact support.';
      }
      
      setMessage({ text: errorMessage, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOutsideClick}>
      <div className="modal-content shelter-modal">
        <div className="modal-header">
          <h2>Add New Shelter</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="shelter-form">
          <div className="form-group">
            <label htmlFor="name">Shelter Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
            ></textarea>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="location">Location *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="contactEmail">Contact Email *</label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="contactPhone">Contact Phone *</label>
              <input
                type="tel"
                id="contactPhone"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="website">Website (Optional)</label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="image">Shelter Image (Optional)</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              className="file-input"
            />
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-button" 
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? 'Adding...' : 'Add Shelter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddShelterModal; 