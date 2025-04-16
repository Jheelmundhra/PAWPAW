import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './ManagePets.css';

const API_BASE_URL = 'http://localhost:5004/api';

const ManagePets = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Redirect if not logged in or not a shelter
    if (!user) {
      navigate('/login');
      return;
    }

    fetchUserPets();
  }, [user, navigate]);

  const fetchUserPets = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/pets?userId=${user._id}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch pets');
      }

      const data = await response.json();
      setPets(data);
    } catch (err) {
      console.error('Error fetching pets:', err);
      setError('Failed to load your pets');
    } finally {
      setLoading(false);
    }
  };

  const toggleFeatured = async (petId, currentStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/pets/${petId}/toggle-featured`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : "",
        }
      });

      if (!response.ok) {
        throw new Error('Failed to update pet');
      }

      const data = await response.json();
      console.log('Pet updated:', data);

      // Update the local state to reflect the change
      setPets(prevPets => 
        prevPets.map(pet => 
          pet._id === petId ? { ...pet, featured: !currentStatus } : pet
        )
      );
    } catch (err) {
      console.error('Error updating pet:', err);
      alert('Failed to update pet status. Please try again.');
    }
  };

  const handleAddPet = () => {
    navigate('/add-pet');
  };

  return (
    <div className="manage-pets-container">
      <div className="manage-pets-header">
        <h1>Manage Your Pets</h1>
        <button className="add-pet-button" onClick={handleAddPet}>
          Add New Pet
        </button>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your pets...</p>
        </div>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={fetchUserPets} className="retry-button">
            Try Again
          </button>
        </div>
      ) : pets.length === 0 ? (
        <div className="no-pets-container">
          <h2>You haven't added any pets yet</h2>
          <p>Start by adding your first pet for adoption</p>
          <button className="add-pet-button" onClick={handleAddPet}>
            Add Your First Pet
          </button>
        </div>
      ) : (
        <div className="pets-grid">
          {pets.map(pet => (
            <div key={pet._id} className="pet-card">
              <div className="pet-image-container">
                <img src={pet.imageUrl} alt={pet.name} className="pet-image" />
                {pet.featured && <div className="featured-badge">Featured</div>}
              </div>
              <div className="pet-info">
                <h3>{pet.name}</h3>
                <p>{pet.breed}, {pet.age} years</p>
                <p>Status: <span className={`status-${pet.status}`}>{pet.status}</span></p>
                <div className="pet-actions">
                  <button 
                    className={`feature-toggle-btn ${pet.featured ? 'featured' : ''}`}
                    onClick={() => toggleFeatured(pet._id, pet.featured)}
                  >
                    {pet.featured ? 'Remove from Featured' : 'Feature This Pet'}
                  </button>
                  <button 
                    className="edit-btn"
                    onClick={() => navigate(`/edit-pet/${pet._id}`)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManagePets; 