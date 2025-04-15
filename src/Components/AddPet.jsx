import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddPet.css';

const AddPet = () => {
  const navigate = useNavigate();
  const [petData, setPetData] = useState({
    name: '',
    breed: '',
    age: '',
    gender: '',
    description: '',
    location: '',
    image: null,
    imagePreview: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPetData(prev => ({
          ...prev,
          image: reader.result, // Store base64 string
          imagePreview: URL.createObjectURL(file)
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new pet object
    const newPet = {
      id: Date.now(), // Generate unique ID
      name: petData.name,
      breed: petData.breed,
      age: parseInt(petData.age),
      location: petData.location,
      distance: '0 miles away', // Default value
      image: petData.image,
      bio: petData.description,
      owner: 'User', // Can be updated with actual user info
      phone: '(XXX) XXX-XXXX', // Can be updated with actual user info
      email: 'user@example.com', // Can be updated with actual user info
      vaccinated: true,
      neutered: true,
      energyLevel: 'Medium',
      goodWith: ['Kids', 'Other Dogs']
    };

    // Get existing pets from localStorage
    const existingPets = JSON.parse(localStorage.getItem('addedPets') || '[]');
    
    // Add new pet to the array
    const updatedPets = [...existingPets, newPet];
    
    // Save to localStorage
    localStorage.setItem('addedPets', JSON.stringify(updatedPets));

    // Show success message
    alert('Pet added successfully!');
    
    // Navigate back to pet swipe
    navigate('/find-pet');
  };

  return (
    <div className="addpet-container">
      <h2>Add a Pet for Adoption</h2>
      <form onSubmit={handleSubmit} className="addpet-form">
        <div className="addpet-form-group">
          <label className="addpet-label" htmlFor="name">Pet's Name</label>
          <input
            className="addpet-input"
            type="text"
            id="name"
            name="name"
            value={petData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="addpet-form-group">
          <label className="addpet-label" htmlFor="breed">Breed</label>
          <input
            className="addpet-input"
            type="text"
            id="breed"
            name="breed"
            value={petData.breed}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="addpet-form-group">
          <label className="addpet-label" htmlFor="age">Age</label>
          <input
            className="addpet-input"
            type="number"
            id="age"
            name="age"
            value={petData.age}
            onChange={handleInputChange}
            required
            min="0"
          />
        </div>

        <div className="addpet-form-group">
          <label className="addpet-label" htmlFor="gender">Gender</label>
          <select
            className="addpet-select"
            id="gender"
            name="gender"
            value={petData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="addpet-form-group">
          <label className="addpet-label" htmlFor="description">Description</label>
          <textarea
            className="addpet-textarea"
            id="description"
            name="description"
            value={petData.description}
            onChange={handleInputChange}
            required
            rows="4"
          />
        </div>

        <div className="addpet-form-group">
          <label className="addpet-label" htmlFor="location">Location</label>
          <input
            className="addpet-input"
            type="text"
            id="location"
            name="location"
            value={petData.location}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="addpet-form-group">
          <label className="addpet-label" htmlFor="image">Pet Photo</label>
          <input
            className="addpet-input"
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {petData.imagePreview && (
            <img
              src={petData.imagePreview}
              alt="Preview"
              className="addpet-image-preview"
            />
          )}
        </div>

        <button type="submit" className="addpet-submit-button">
          Add Pet for Adoption
        </button>
      </form>
    </div>
  );
};

export default AddPet; 