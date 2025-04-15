import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManagePets.css';

const ManagePets = () => {
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();
  const [editingPet, setEditingPet] = useState(null);

  useEffect(() => {
    const addedPets = JSON.parse(localStorage.getItem('addedPets') || '[]');
    setPets(addedPets);
  }, []);

  const handleDelete = (petId) => {
    if (window.confirm('Are you sure you want to remove this pet?')) {
      const updatedPets = pets.filter(pet => pet.id !== petId);
      localStorage.setItem('addedPets', JSON.stringify(updatedPets));
      setPets(updatedPets);
    }
  };

  const handleEdit = (pet) => {
    setEditingPet(pet);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedPets = pets.map(pet => 
      pet.id === editingPet.id ? editingPet : pet
    );
    localStorage.setItem('addedPets', JSON.stringify(updatedPets));
    setPets(updatedPets);
    setEditingPet(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingPet(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="manage-pets-container">
      <h2>Manage Your Listed Pets</h2>
      
      {editingPet ? (
        <div className="edit-form-container">
          <h3>Edit Pet Details</h3>
          <form onSubmit={handleUpdate} className="edit-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={editingPet.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Breed</label>
              <input
                type="text"
                name="breed"
                value={editingPet.breed}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={editingPet.age}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={editingPet.location}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="bio"
                value={editingPet.bio}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="edit-form-buttons">
              <button type="submit" className="save-button">Save Changes</button>
              <button 
                type="button" 
                className="cancel-button"
                onClick={() => setEditingPet(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="pets-grid">
          {pets.length > 0 ? (
            pets.map(pet => (
              <div key={pet.id} className="pet-card">
                <img src={pet.image} alt={pet.name} className="pet-image" />
                <div className="pet-info">
                  <h3>{pet.name}</h3>
                  <p>{pet.breed} • {pet.age} years</p>
                  <p>{pet.location}</p>
                  <div className="pet-actions">
                    <button 
                      onClick={() => handleEdit(pet)}
                      className="edit-button"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(pet.id)}
                      className="delete-button"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-pets">
              <p>You haven't added any pets yet.</p>
              <button onClick={() => navigate('/add-pet')} className="add-button">
                Add Your First Pet
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManagePets; 