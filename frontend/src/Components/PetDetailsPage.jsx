import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { apiService } from "../config/api";
import "./PetDetailsPage.css";

const PetDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        setLoading(true);
        const data = await apiService.pets.getById(id);
        setPet(data);
      } catch (err) {
        console.error("Error fetching pet details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  const handleAdoptRequest = () => {
    // Handle adoption request logic here
    alert("Adoption request sent! The shelter will contact you soon.");
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Function to toggle featured status if the user is the owner or admin
  const toggleFeatured = async () => {
    if (!user || (user._id !== pet.addedBy && user.role !== "admin")) {
      return;
    }

    try {
      const data = await apiService.pets.toggleFeatured(id, token);

      setPet((prev) => ({
        ...prev,
        featured: !prev.featured,
      }));

      alert(
        `Pet ${data.pet.featured ? "featured" : "unfeatured"} successfully!`
      );
    } catch (err) {
      console.error("Error updating pet:", err);
      alert("Failed to update pet. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="pet-details-loading">
        <div className="loading-spinner"></div>
        <p>Loading pet details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pet-details-error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={handleBack} className="back-button">
          Go Back
        </button>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="pet-details-not-found">
        <h2>Pet Not Found</h2>
        <p>Sorry, we couldn't find the pet you're looking for.</p>
        <button onClick={handleBack} className="back-button">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="pet-details-page">
      <div className="pet-details-container">
        <button onClick={handleBack} className="back-button">
          &larr; Back
        </button>

        <div className="pet-details-content">
          <div className="pet-details-image-container">
            <img
              src={pet.imageUrl}
              alt={pet.name}
              className="pet-details-image"
            />
            {pet.featured && <div className="featured-badge">Featured</div>}
          </div>

          <div className="pet-details-info">
            <div className="pet-details-header">
              <div>
                <h1>{pet.name}</h1>
                <div className="pet-tags">
                  <span className="pet-breed">{pet.breed}</span>
                  <span className="pet-age">{pet.age} years old</span>
                  <span className="pet-location">{pet.location}</span>
                </div>
              </div>

              {/* Show featured toggle if user is the owner or admin */}
              {user && (user._id === pet.addedBy || user.role === "admin") && (
                <button
                  className={`feature-toggle-btn ${
                    pet.featured ? "featured" : ""
                  }`}
                  onClick={toggleFeatured}
                >
                  {pet.featured ? "Remove Featured" : "Feature This Pet"}
                </button>
              )}
            </div>

            <div className="pet-status">
              Status:{" "}
              <span className={`status-${pet.status}`}>{pet.status}</span>
            </div>

            <div className="pet-details-section">
              <h2>About</h2>
              <p>{pet.description}</p>
            </div>

            {pet.status === "available" && (
              <button className="adopt-button" onClick={handleAdoptRequest}>
                Request to Adopt
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetailsPage;
