import React, { useState, useEffect } from "react";
import "./PetSwipe.css";
import AddPetModal from "./AddPetModal";
import { useAuth } from "./AuthContext";

// Fallback pet data in case API fails
const fallbackPetsData = [
  {
    id: "fallback1",
    name: "Buddy",
    breed: "Golden Retriever",
    age: 2,
    location: "New York",
    distance: "2 miles away",
    image: "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80",
    bio: "Friendly and energetic golden who loves long walks and playing fetch!",
    owner: "Local Shelter",
    phone: "(123) 456-7890",
    email: "shelter@example.com",
    vaccinated: true,
    neutered: true,
    energyLevel: "High",
    goodWith: ["Kids", "Other Dogs"],
  },
  {
    id: "fallback2",
    name: "Luna",
    breed: "Siberian Husky",
    age: 3,
    location: "Chicago",
    distance: "5 miles away",
    image: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea",
    bio: "Beautiful blue-eyed husky who enjoys cold weather and has lots of energy!",
    owner: "Local Shelter",
    phone: "(123) 456-7890",
    email: "shelter@example.com",
    vaccinated: true,
    neutered: false,
    energyLevel: "Very High",
    goodWith: ["Other Dogs"],
  },
];

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PetSwipe = () => {
  const { token } = useAuth();
  const [petsData, setPetsData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatch, setShowMatch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showHistoryPanel, setShowHistoryPanel] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [swipedPets, setSwipedPets] = useState(() => {
    // Load swipe history from localStorage on component mount
    const savedSwipes = localStorage.getItem("swipedPets");
    return savedSwipes ? JSON.parse(savedSwipes) : [];
  });
  const [historyView, setHistoryView] = useState("all");
  const [showAddPetModal, setShowAddPetModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch pets when component mounts
  useEffect(() => {
    fetchPets();
  }, [token]); // Re-fetch when token changes

  // Effect to handle modal display
  useEffect(() => {
    if (showAddPetModal) {
      // When modal is shown, prevent background scrolling
      document.body.style.overflow = "hidden";
    } else {
      // When modal is hidden, restore scrolling
      document.body.style.overflow = "auto";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showAddPetModal]);

  // Effect to save swipedPets to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("swipedPets", JSON.stringify(swipedPets));
  }, [swipedPets]);

  const handleTouchStart = (e) => {
    setStartX(e.touches ? e.touches[0].clientX : e.clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    setCurrentX(x - startX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (currentX > 100) {
      handleSwipe("right");
    } else if (currentX < -100) {
      handleSwipe("left");
    }
    setCurrentX(0);
  };

  const handleSwipe = (direction) => {
    const currentPet = petsData[currentIndex];
    const swipeAction = direction === "right" ? "liked" : "passed";

    if (direction === "right") {
      setShowMatch(true);
      setTimeout(() => {
        setShowMatch(false);
        goToNextPet();
      }, 1500);
    } else {
      goToNextPet();
    }

    // Create new swipedPets array with the current pet
    const updatedSwipedPets = [
      ...swipedPets,
      {
        ...currentPet,
        action: swipeAction,
        timestamp: new Date().toISOString(), // Use ISO string for better JSON serialization
      },
    ];

    setSwipedPets(updatedSwipedPets);
    // localStorage.setItem is now handled by the useEffect
  };

  const goToNextPet = () => {
    setCurrentIndex((prev) => prev + 1);
    setCurrentX(0);
  };

  const handleProfileClick = () => {
    setShowProfile(true);
  };

  const closeProfile = () => {
    setShowProfile(false);
  };

  const toggleHistoryPanel = () => {
    setShowHistoryPanel(!showHistoryPanel);
    setHistoryView("all");
  };

  const resetSwipes = () => {
    setCurrentIndex(0);
    setSwipedPets([]);
    localStorage.removeItem("swipedPets"); // Clear localStorage when resetting
    setShowHistoryPanel(false);
  };

  const currentPet = petsData[currentIndex];

  const filteredSwipedPets = () => {
    switch (historyView) {
      case "liked":
        return swipedPets.filter((pet) => pet.action === "liked");
      case "passed":
        return swipedPets.filter((pet) => pet.action === "passed");
      case "added":
        return swipedPets.filter((pet) => pet.action === "added");
      default:
        return swipedPets;
    }
  };

  const handlePetAdded = async (newPet) => {
    try {
      // Check if we're uploading a file or just using a URL
      if (newPet.imageFile) {
        console.log("Processing file upload:", newPet.imageFile);
        console.log("Image preview data:", newPet.image ? "Preview data exists" : "No preview data");
        console.log("Featured status:", newPet.featured);
        
        // Create FormData for file upload
        const formData = new FormData();
        formData.append("name", newPet.name);
        formData.append("breed", newPet.breed);
        formData.append("age", newPet.age);
        formData.append("location", newPet.location);
        formData.append("description", newPet.bio);
        formData.append("image", newPet.imageFile);
        formData.append("featured", newPet.featured);
        
        // Add user ID if available
        if (newPet.userId) {
          formData.append("userId", newPet.userId);
        }

        console.log("FormData created, sending to backend...");

        // Use the file upload endpoint
        const response = await fetch(`${API_BASE_URL}/pets/add`, {
          method: "POST",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to save pet to database");
        }

        const savedPet = await response.json();
        console.log("Pet saved to database:", savedPet);

        // Revoke the object URL to avoid memory leaks
        if (newPet.image && newPet.image.startsWith('blob:')) {
          URL.revokeObjectURL(newPet.image);
        }

        // Fetch the updated pet list to refresh the data
        fetchPets();

        // Add to swiped pets history
        const updatedSwipedPets = [
          {
            ...newPet,
            id: savedPet.pet._id,
            // Use the returned image URL from the server
            image: savedPet.pet.imageUrl,
            featured: savedPet.pet.featured,
            action: "added",
            timestamp: new Date().toISOString(),
          },
          ...swipedPets,
        ];

        setSwipedPets(updatedSwipedPets);
        // localStorage.setItem is now handled by the useEffect

        // Show a success message
        alert("Pet added successfully and saved to database!");
      } else {
        // Fallback to JSON endpoint if no file is provided
        const response = await fetch(`${API_BASE_URL}/pets/add-json`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify({
            name: newPet.name,
            breed: newPet.breed,
            age: newPet.age,
            location: newPet.location,
            description: newPet.bio,
            imageUrl: newPet.image,
            featured: newPet.featured,
            userId: newPet.userId
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save pet to database");
        }

        const savedPet = await response.json();
        console.log("Pet saved to database:", savedPet);

        // Fetch the updated pet list to refresh the data
        fetchPets();

        // Add to swiped pets history
        const updatedSwipedPets = [
          {
            ...newPet,
            id: savedPet.pet._id,
            featured: savedPet.pet.featured,
            action: "added",
            timestamp: new Date().toISOString(),
          },
          ...swipedPets,
        ];

        setSwipedPets(updatedSwipedPets);
        // Show a success message
        alert("Pet added successfully and saved to database!");
      }
    } catch (error) {
      console.error("Error saving pet to database:", error);
      
      // Revoke the object URL to avoid memory leaks
      if (newPet.image && newPet.image.startsWith('blob:')) {
        URL.revokeObjectURL(newPet.image);
      }
      
      alert("Failed to save pet to database. Please try again.");
    }

    setShowAddPetModal(false);
  };

  // Function to fetch pets from API
  const fetchPets = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/pets`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch pets");
      }

      const data = await response.json();
      console.log("Pets refreshed from database:", data);

      // Map the API data to match our frontend structure
      const formattedPets = data.map((pet) => ({
        id: pet._id,
        name: pet.name,
        breed: pet.breed,
        age: pet.age,
        location: pet.location,
        distance: "5 miles away", // Default value
        image: pet.imageUrl,
        bio: pet.description,
        owner: "Pet Shelter", // Default value
        phone: "(123) 456-7890", // Default value
        email: "shelter@example.com", // Default value
        vaccinated: true, // Default values for these fields
        neutered: true,
        energyLevel: "Medium",
        goodWith: ["Kids", "Other Dogs"],
        status: pet.status,
      }));

      setPetsData(formattedPets.length > 0 ? formattedPets : fallbackPetsData);

      // Reset current index to show the newest pet
      setCurrentIndex(0);
    } catch (err) {
      console.error("Error fetching pets:", err);
      setError("Failed to reload pets.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="history-button-container">
        <div className="action-buttons-container">
          <button
            className="action-btn history-btn"
            onClick={toggleHistoryPanel}
          >
            <span className="btn-icon">🔄</span>
            <span className="btn-text">Swipe History</span>
            <span className="btn-badge">{swipedPets.length}</span>
          </button>
          <button
            className="action-btn add-pet-btn"
            onClick={() => setShowAddPetModal(true)}
          >
            <span className="btn-icon">➕</span>
            <span className="btn-text">Add Pet</span>
          </button>
        </div>
      </div>

      <div className="pet-swipe-container">
        {/* Show loading state */}
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading pets...</p>
          </div>
        )}

        {/* Show error message */}
        {error && !loading && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={fetchPets} className="retry-btn">
              Try Again
            </button>
          </div>
        )}

        {showMatch && (
          <div className="match-popup">
            <div className="match-content">
              <div className="confetti">🎉</div>
              <h2>You liked {currentPet.name}!</h2>
              <p>If {currentPet.owner} likes you back, we'll let you know!</p>
              <div className="heart-pulse">❤️</div>
            </div>
          </div>
        )}

        {showProfile && (
          <div className="profile-modal">
            <div className="profile-content">
              <button className="close-profile-btn" onClick={closeProfile}>
                &times;
              </button>
              <div className="profile-header">
                <img
                  src={currentPet.image}
                  alt={currentPet.name}
                  className="profile-image"
                />
                <div className="profile-basic-info">
                  <h2>
                    {currentPet.name}, {currentPet.age}
                  </h2>
                  <p>{currentPet.breed}</p>
                  <p>
                    📍 {currentPet.location} • {currentPet.distance}
                  </p>
                </div>
              </div>

              <div className="profile-section">
                <h3>About</h3>
                <p>{currentPet.bio}</p>
              </div>

              <div className="profile-section">
                <h3>Details</h3>
                <div className="details-grid">
                  <div>
                    <span className="detail-label">Vaccinated:</span>
                    <span>{currentPet.vaccinated ? "Yes" : "No"}</span>
                  </div>
                  <div>
                    <span className="detail-label">Neutered:</span>
                    <span>{currentPet.neutered ? "Yes" : "No"}</span>
                  </div>
                  <div>
                    <span className="detail-label">Energy Level:</span>
                    <span>{currentPet.energyLevel}</span>
                  </div>
                  <div>
                    <span className="detail-label">Good With:</span>
                    <span>{currentPet.goodWith.join(", ")}</span>
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <h3>Contact Owner</h3>
                <div className="contact-info">
                  <p>
                    <strong>Name:</strong> {currentPet.owner}
                  </p>
                  <p>
                    <strong>Phone:</strong> {currentPet.phone}
                  </p>
                  <p>
                    <strong>Email:</strong> {currentPet.email}
                  </p>
                </div>
              </div>

              <div className="action-buttons">
                <button
                  className="action-btn message-btn"
                  onClick={() =>
                    alert(
                      `Message ${currentPet.owner} about ${currentPet.name}`
                    )
                  }
                >
                  Send Message
                </button>
                <button
                  className="action-btn call-btn"
                  onClick={() =>
                    alert(`Call ${currentPet.owner} at ${currentPet.phone}`)
                  }
                >
                  Call Owner
                </button>
              </div>
            </div>
          </div>
        )}

        {showHistoryPanel && (
          <>
            <div className="history-overlay" onClick={toggleHistoryPanel} />
            <div className="history-panel">
              <div className="history-header">
                <h2>Swipe History</h2>
                <div className="action-buttons">
                  <button 
                    className="clear-all-btn" 
                    onClick={resetSwipes}
                    title="Clear all swipe history"
                  >
                    Clear All
                  </button>
                  <button className="close-panel" onClick={toggleHistoryPanel}>
                    ×
                  </button>
                </div>
              </div>

              <div className="history-stats">
                <button
                  className={`stat-item all-stat ${
                    historyView === "all" ? "active-stat" : ""
                  }`}
                  onClick={() => setHistoryView("all")}
                >
                  <span className="stat-count">{swipedPets.length}</span>
                  <span className="stat-label">All</span>
                </button>
                <button
                  className={`stat-item liked-stat ${
                    historyView === "liked" ? "active-stat" : ""
                  }`}
                  onClick={() => setHistoryView("liked")}
                >
                  <span className="stat-count">
                    {swipedPets.filter((p) => p.action === "liked").length}
                  </span>
                  <span className="stat-label">Likes</span>
                </button>
                <button
                  className={`stat-item passed-stat ${
                    historyView === "passed" ? "active-stat" : ""
                  }`}
                  onClick={() => setHistoryView("passed")}
                >
                  <span className="stat-count">
                    {swipedPets.filter((p) => p.action === "passed").length}
                  </span>
                  <span className="stat-label">Passes</span>
                </button>
                <button
                  className={`stat-item added-stat ${
                    historyView === "added" ? "active-stat" : ""
                  }`}
                  onClick={() => setHistoryView("added")}
                >
                  <span className="stat-count">
                    {swipedPets.filter((p) => p.action === "added").length}
                  </span>
                  <span className="stat-label">Added</span>
                </button>
              </div>

              <div className="history-list">
                {filteredSwipedPets().length > 0 ? (
                  filteredSwipedPets().map((pet, index) => (
                    <div key={index} className={`history-item ${pet.action}`}>
                      <img
                        src={pet.image}
                        alt={pet.name}
                        className="history-pet-image"
                      />
                      <div className="history-pet-info">
                        <div className="pet-name-breed">
                          <h3>{pet.name}</h3>
                          <p>{pet.breed}</p>
                        </div>
                        <div className="pet-action-time">
                          <span className={`action-badge ${pet.action}`}>
                            {pet.action === "liked"
                              ? "Liked"
                              : pet.action === "passed"
                              ? "Passed"
                              : "Added"}
                          </span>
                          <span className="time-ago">
                            {(() => {
                              const hoursDiff = Math.floor(
                                (new Date() - new Date(pet.timestamp)) /
                                  (1000 * 60 * 60)
                              );

                              if (hoursDiff < 1) {
                                const minutesDiff = Math.floor(
                                  (new Date() - new Date(pet.timestamp)) /
                                    (1000 * 60)
                                );
                                return `${minutesDiff} min ago`;
                              } else if (hoursDiff < 24) {
                                return `${hoursDiff}h ago`;
                              } else {
                                const daysDiff = Math.floor(hoursDiff / 24);
                                return `${daysDiff}d ago`;
                              }
                            })()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-history-message">
                    {historyView === "all"
                      ? "No swipe history yet"
                      : historyView === "liked"
                      ? "No liked pets yet"
                      : historyView === "passed"
                      ? "No passed pets yet"
                      : "No pets added yet"}
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {!loading && petsData.length > 0 && currentIndex < petsData.length ? (
          <div
            className="pet-card"
            onClick={handleProfileClick}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleTouchStart}
            onMouseMove={handleTouchMove}
            onMouseUp={handleTouchEnd}
            onMouseLeave={handleTouchEnd}
            style={
              isDragging
                ? {
                    transform: `translateX(${currentX}px) rotate(${
                      currentX / 20
                    }deg)`,
                    opacity: 1 - Math.abs(currentX) / 200,
                  }
                : {}
            }
          >
            <div className="pet-image-container">
              <img
                src={currentPet.image}
                alt={currentPet.name}
                className="pet-image"
              />
              <div className="pet-badge">{currentPet.age} yrs</div>
              {isDragging && (
                <div
                  className={`swipe-indicator ${
                    currentX > 50 ? "like" : currentX < -50 ? "nope" : ""
                  }`}
                >
                  {currentX > 50 ? "LIKE" : currentX < -50 ? "NOPE" : ""}
                </div>
              )}
            </div>

            <div className="pet-details">
              <div className="pet-name-breed">
                <h2>{currentPet.name}</h2>
                <p>{currentPet.breed}</p>
              </div>
              <div className="pet-location">
                <span>
                  📍 {currentPet.location} • {currentPet.distance}
                </span>
              </div>
              <p className="pet-bio-preview">
                {currentPet.bio.substring(0, 60)}...
              </p>
            </div>
          </div>
        ) : (
          !loading && (
            <div className="no-more-pets">
              <h2>You've seen all pets!</h2>
              <p>New pets arrive daily - check back soon!</p>
              <button className="reset-btn" onClick={resetSwipes}>
                Start Over
              </button>
            </div>
          )
        )}

        {!loading && petsData.length > 0 && currentIndex < petsData.length && (
          <div className="swipe-buttons">
            <button
              className="swipe-btn reject-btn"
              onClick={() => handleSwipe("left")}
            >
              ✖ Not for me
            </button>
            <button
              className="swipe-btn like-btn"
              onClick={() => handleSwipe("right")}
            >
              ❤️ Interested
            </button>
          </div>
        )}
      </div>

      {showAddPetModal && (
        <AddPetModal
          onClose={() => setShowAddPetModal(false)}
          onPetAdded={handlePetAdded}
        />
      )}
    </div>
  );
};

export default PetSwipe;
