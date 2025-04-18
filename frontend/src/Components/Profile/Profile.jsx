import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import AddPetForm from './AddPetForm';
import api from '../../services/api';
import './Profile.css';

const API_BASE_URL = 'https://pawpaw-backend.onrender.com/api';

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);
  const [userPets, setUserPets] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        // Attempt to get user info if not available from context
        if (!user) {
          const response = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (!response.ok) {
            throw new Error('Failed to fetch profile');
          }

          const userData = await response.json();
          setFormData({
            name: userData.name,
            email: userData.email,
            phone: userData.phone || '',
            address: userData.address || ''
          });
        } else {
          setFormData({
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || '',
            address: user.address || ''
          });
        }

        // If user is a shelter, fetch their pets
        if (user && (user.role === 'shelter' || user.role === 'admin')) {
          await fetchUserPets();
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, user]);

  const fetchUserPets = async () => {
    try {
      const userId = user._id || user.id;
      const pets = await api.getPetsByUser(userId);
      setUserPets(pets);
    } catch (error) {
      console.error('Error fetching user pets:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedUser = await response.json();
      setEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePetAdded = (newPet) => {
    setUserPets(prevPets => [newPet, ...prevPets]);
  };

  if (loading) return <div className="profile-loading">Loading...</div>;
  if (error) return <div className="profile-error">{error}</div>;

  const isShelter = user && (user.role === 'shelter' || user.role === 'admin');

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>{editing ? 'Edit Profile' : 'My Profile'}</h2>
        {!editing && (
          <button onClick={() => setEditing(true)} className="edit-button">
            Edit Profile
          </button>
        )}
      </div>

      <div className="profile-content">
        {editing ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
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
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
              />
            </div>
            <div className="profile-actions">
              <button type="submit" className="save-button">Save Changes</button>
              <button type="button" onClick={() => setEditing(false)} className="cancel-button">
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-info">
            <div className="info-group">
              <label>Name</label>
              <p>{formData.name}</p>
            </div>
            <div className="info-group">
              <label>Email</label>
              <p>{formData.email}</p>
            </div>
            <div className="info-group">
              <label>Phone</label>
              <p>{formData.phone || 'Not provided'}</p>
            </div>
            <div className="info-group">
              <label>Address</label>
              <p>{formData.address || 'Not provided'}</p>
            </div>
            {isShelter && (
              <div className="info-group">
                <label>Role</label>
                <p>{user.role}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Pet Form for Shelter Users */}
      {isShelter && (
        <div className="shelter-section">
          <h3>Manage Pets</h3>
          <AddPetForm onPetAdded={handlePetAdded} />

          {userPets.length > 0 && (
            <div className="user-pets-section">
              <h3>Your Listed Pets</h3>
              <div className="pets-grid">
                {userPets.map(pet => (
                  <div key={pet._id} className="pet-card">
                    <div className="pet-image">
                      <img src={pet.imageUrl} alt={pet.name} />
                      {pet.featured && <span className="featured-badge">Featured</span>}
                    </div>
                    <div className="pet-info">
                      <h4>{pet.name}</h4>
                      <p>{pet.breed}, {pet.age} months</p>
                      <p className="pet-location">{pet.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile; 