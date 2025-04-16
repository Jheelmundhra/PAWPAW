import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import api from '../../services/api';
import './AddPetForm.css';

const AddPetForm = ({ onPetAdded }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: '',
    location: '',
    description: '',
    featured: false
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prev => ({
      ...prev,
      [e.target.name]: value
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
      if (!user || (!user._id && !user.id)) {
        setMessage({ text: 'You must be logged in to add a pet', type: 'error' });
        setIsLoading(false);
        return;
      }

      // Create form data for file upload
      const petFormData = new FormData();
      petFormData.append('name', formData.name);
      petFormData.append('breed', formData.breed);
      petFormData.append('age', formData.age);
      petFormData.append('location', formData.location);
      petFormData.append('description', formData.description);
      petFormData.append('featured', formData.featured);
      
      // Use either _id or id, whichever is available
      const userId = user._id || user.id;
      petFormData.append('userId', userId);
      
      if (imageFile) {
        petFormData.append('image', imageFile);
      }

      // Get token - try multiple possible locations
      const token = user.token || user.accessToken || localStorage.getItem('token');
      
      if (!token) {
        setMessage({ text: 'Authentication token not found. Please log in again.', type: 'error' });
        setIsLoading(false);
        return;
      }

      // Add pet through API
      const response = await api.createPet(petFormData, token);

      if (response.pet) {
        setMessage({ text: 'Pet added successfully!', type: 'success' });
        // Reset form
        setFormData({
          name: '',
          breed: '',
          age: '',
          location: '',
          description: '',
          featured: false
        });
        setImageFile(null);
        setImagePreview('');
        
        // Notify parent component
        if (onPetAdded) {
          onPetAdded(response.pet);
        }
      } else {
        setMessage({ text: response.message || 'Error adding pet', type: 'error' });
      }
    } catch (error) {
      console.error('Error adding pet:', error);
      
      let errorMessage = 'Failed to add pet. Please try again.';
      
      // Try to get more detailed error information if available
      if (error.response) {
        try {
          const errorData = await error.response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
          console.log('Could not parse error response:', e);
        }
      }
      
      setMessage({ text: errorMessage, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-pet-form-container">
      <h2>Add New Pet</h2>
      
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="add-pet-form">
        <div className="form-group">
          <label htmlFor="name">Pet Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="breed">Breed *</label>
            <input
              type="text"
              id="breed"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="age">Age (in months) *</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
        </div>
        
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
        
        <div className="form-group">
          <label htmlFor="image">Pet Image *</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            className="file-input"
            required={!imagePreview}
          />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}
        </div>
        
        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />
          <label htmlFor="featured">Feature this pet (will be displayed in the featured section)</label>
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Pet'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPetForm; 