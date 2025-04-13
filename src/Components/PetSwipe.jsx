import React, { useState } from 'react';
import './PetSwipe.css';


const petsData = [
  {
    id: 1,
    name: 'Buddy',
    breed: 'Golden Retriever',
    age: 2,
    location: 'New York',
    distance: '2 miles away',
    image: 'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80',
    bio: 'Friendly and energetic golden who loves long walks and playing fetch!',
    owner: 'Sarah Johnson',
    phone: '(212) 555-1234',
    email: 'sarah.j@example.com',
    vaccinated: true,
    neutered: true,
    energyLevel: 'High',
    goodWith: ['Kids', 'Other Dogs']
  },

{
  id: 2,
  name: 'Luna',
  breed: 'Siberian Husky',
  age: 3,
  location: 'Chicago',
  distance: '5 miles away',
  image: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea',
  bio: 'Beautiful blue-eyed husky who enjoys cold weather and has lots of energy!',
  owner: 'Michael Chen',
  phone: '(312) 555-5678',
  email: 'michael.c@example.com',
  vaccinated: true,
  neutered: false,
  energyLevel: 'Very High',
  goodWith: ['Other Dogs']
},
{
  id: 3,
  name: 'Max',
  breed: 'German Shepherd',
  age: 4,
  location: 'Los Angeles',
  distance: '1 mile away',
  image: 'https://images.unsplash.com/photo-1567752881298-894bb81f9378',
  bio: 'Loyal and protective companion, great with families and very intelligent.',
  owner: 'David Wilson',
  phone: '(310) 555-9012',
  email: 'david.w@example.com',
  vaccinated: true,
  neutered: true,
  energyLevel: 'Medium',
  goodWith: ['Kids', 'Other Dogs', 'Cats']
},
{
  id: 4,
  name: 'Bella',
  breed: 'Poodle',
  age: 1,
  location: 'Miami',
  distance: '3 miles away',
  image: 'https://images.unsplash.com/photo-1594149929911-78975a43d4f5',
  bio: 'Playful and smart poodle puppy who loves learning new tricks!',
  owner: 'Jessica Martinez',
  phone: '(305) 555-3456',
  email: 'jessica.m@example.com',
  vaccinated: false,
  neutered: false,
  energyLevel: 'Medium',
  goodWith: ['Kids', 'Other Dogs', 'Cats']
},
{
  id: 5,
  name: 'Charlie',
  breed: 'Beagle',
  age: 2,
  location: 'Seattle',
  distance: '7 miles away',
  image: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab2',
  bio: 'Curious and friendly beagle with a great nose for adventure!',
  owner: 'Robert Taylor',
  phone: '(206) 555-7890',
  email: 'robert.t@example.com',
  vaccinated: true,
  neutered: true,
  energyLevel: 'High',
  goodWith: ['Kids', 'Other Dogs']
},
{
  id: 6,
  name: 'Lucy',
  breed: 'Bulldog',
  age: 5,
  location: 'Boston',
  distance: '4 miles away',
  image: 'https://images.unsplash.com/photo-1588943211346-0908a1fb0b01',
  bio: 'Chill and relaxed bulldog who loves naps and short walks.',
  owner: 'Emily Brown',
  phone: '(617) 555-2345',
  email: 'emily.b@example.com',
  vaccinated: true,
  neutered: true,
  energyLevel: 'Low',
  goodWith: ['Kids', 'Other Dogs', 'Cats']
},
{
  id: 7,
  name: 'Cooper',
  breed: 'Dachshund',
  age: 1,
  location: 'Austin',
  distance: '0.5 miles away',
  image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a',
  bio: 'Adorable little sausage dog with lots of personality!',
  owner: 'Daniel Miller',
  phone: '(512) 555-6789',
  email: 'daniel.m@example.com',
  vaccinated: true,
  neutered: false,
  energyLevel: 'Medium',
  goodWith: ['Kids']
},
{
  id: 8,
  name: 'Daisy',
  breed: 'Labrador Retriever',
  age: 2,
  location: 'Denver',
  distance: '6 miles away',
  image: 'https://images.unsplash.com/photo-1544568100-847a948585b9',
  bio: 'Sweet and gentle lab who loves swimming and playing ball.',
  owner: 'Olivia Davis',
  phone: '(303) 555-1234',
  email: 'olivia.d@example.com',
  vaccinated: true,
  neutered: true,
  energyLevel: 'High',
  goodWith: ['Kids', 'Other Dogs', 'Cats']
},
{
  id: 9,
  name: 'Rocky',
  breed: 'Boxer',
  age: 3,
  location: 'Atlanta',
  distance: '2 miles away',
  image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8',
  bio: 'Energetic and goofy boxer who will keep you laughing!',
  owner: 'James Wilson',
  phone: '(404) 555-5678',
  email: 'james.w@example.com',
  vaccinated: true,
  neutered: true,
  energyLevel: 'Very High',
  goodWith: ['Kids', 'Other Dogs']
},
{
  id: 10,
  name: 'Molly',
  breed: 'Shih Tzu',
  age: 4,
  location: 'San Francisco',
  distance: '1 mile away',
  image: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993',
  bio: 'Sweet and affectionate lap dog who loves cuddles.',
  owner: 'Sophia Garcia',
  phone: '(415) 555-9012',
  email: 'sophia.g@example.com',
  vaccinated: true,
  neutered: true,
  energyLevel: 'Low',
  goodWith: ['Kids', 'Other Dogs', 'Cats']
}
];
  
const PetSwipe = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatch, setShowMatch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showHistoryPanel, setShowHistoryPanel] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [swipedPets, setSwipedPets] = useState([]);
  const [historyView, setHistoryView] = useState('all'); // 'all', 'liked', 'passed'

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
      handleSwipe('right');
    } else if (currentX < -100) {
      handleSwipe('left');
    }
    setCurrentX(0);
  };

  const handleSwipe = (direction) => {
    const currentPet = petsData[currentIndex];
    const swipeAction = direction === 'right' ? 'liked' : 'passed';
    
    if (direction === 'right') {
      setShowMatch(true);
      setTimeout(() => {
        setShowMatch(false);
        goToNextPet();
      }, 1500);
    } else {
      goToNextPet();
    }
    
    setSwipedPets([...swipedPets, { 
      ...currentPet, 
      action: swipeAction, 
      timestamp: new Date() 
    }]);
  };

  const goToNextPet = () => {
    setCurrentIndex(prev => prev + 1);
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
    setHistoryView('all');
  };

  const resetSwipes = () => {
    setCurrentIndex(0);
    setSwipedPets([]);
    setShowHistoryPanel(false);
  };

  const currentPet = petsData[currentIndex];

  const filteredSwipedPets = () => {
    switch(historyView) {
      case 'liked':
        return swipedPets.filter(pet => pet.action === 'liked');
      case 'passed':
        return swipedPets.filter(pet => pet.action === 'passed');
      default:
        return swipedPets;
    }
  };

  return (
    <div className="app-container">
      <div className="history-button-container">
        <button className="history-btn" onClick={toggleHistoryPanel}>
          Swipe History ({swipedPets.length})
        </button>
      </div>

      <div className="pet-swipe-container">
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
        <img src={currentPet.image} alt={currentPet.name} className="profile-image" />
        <div className="profile-basic-info">
          <h2>{currentPet.name}, {currentPet.age}</h2>
          <p>{currentPet.breed}</p>
          <p>📍 {currentPet.location} • {currentPet.distance}</p>
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
                    <span>{currentPet.vaccinated ? 'Yes' : 'No'}</span>
                  </div>
                  <div>
                    <span className="detail-label">Neutered:</span>
                    <span>{currentPet.neutered ? 'Yes' : 'No'}</span>
                  </div>
                  <div>
                    <span className="detail-label">Energy Level:</span>
                    <span>{currentPet.energyLevel}</span>
                  </div>
                  <div>
                    <span className="detail-label">Good With:</span>
                    <span>{currentPet.goodWith.join(', ')}</span>
                  </div>
                </div>
              </div>
              
              <div className="profile-section">
                <h3>Contact Owner</h3>
                <div className="contact-info">
                  <p><strong>Name:</strong> {currentPet.owner}</p>
                  <p><strong>Phone:</strong> {currentPet.phone}</p>
                  <p><strong>Email:</strong> {currentPet.email}</p>
                </div>
              </div>
              
              <div className="action-buttons">
                <button 
                  className="action-btn message-btn"
                  onClick={() => alert(`Message ${currentPet.owner} about ${currentPet.name}`)}
                >
                  Send Message
                </button>
                <button 
                  className="action-btn call-btn"
                  onClick={() => alert(`Call ${currentPet.owner} at ${currentPet.phone}`)}
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
                <button className="close-panel" onClick={toggleHistoryPanel}>×</button>
              </div>
              
              <div className="history-stats">
                <button 
                  className={`stat-item ${historyView === 'all' ? 'active-stat' : ''}`}
                  onClick={() => setHistoryView('all')}
                >
                  <span className="stat-count">{swipedPets.length}</span>
                  <span className="stat-label">All</span>
                </button>
                <button 
                  className={`stat-item liked-stat ${historyView === 'liked' ? 'active-stat' : ''}`}
                  onClick={() => setHistoryView('liked')}
                >
                  <span className="stat-count">
                    {swipedPets.filter(p => p.action === 'liked').length}
                  </span>
                  <span className="stat-label">Likes</span>
                </button>
                <button 
                  className={`stat-item passed-stat ${historyView === 'passed' ? 'active-stat' : ''}`}
                  onClick={() => setHistoryView('passed')}
                >
                  <span className="stat-count">
                    {swipedPets.filter(p => p.action === 'passed').length}
                  </span>
                  <span className="stat-label">Passes</span>
                </button>
              </div>

              <div className="history-list">
                {filteredSwipedPets().length > 0 ? (
                  filteredSwipedPets().map((pet, index) => (
                    <div key={index} className={`history-item ${pet.action}`}>
                      <img src={pet.image} alt={pet.name} className="history-pet-image" />
                      <div className="history-pet-info">
                        <div className="pet-name-breed">
                          <h3>{pet.name}</h3>
                          <p>{pet.breed}</p>
                        </div>
                        <div className="pet-action-time">
                          <span className={`action-badge ${pet.action}`}>
                            {pet.action === 'liked' ? 'Liked' : 'Passed'}
                          </span>
                          <span className="time-ago">
                            {Math.floor((new Date() - new Date(pet.timestamp)) / (1000 * 60 * 60))}h ago
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-history-message">
                    {historyView === 'all' 
                      ? 'No swipe history yet' 
                      : historyView === 'liked' 
                        ? 'No liked pets yet' 
                        : 'No passed pets yet'}
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {currentIndex < petsData.length ? (
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
            style={isDragging ? {
              transform: `translateX(${currentX}px) rotate(${currentX / 20}deg)`,
              opacity: 1 - Math.abs(currentX) / 200
            } : {}}
          >
            <div className="pet-image-container">
              <img src={currentPet.image} alt={currentPet.name} className="pet-image" />
              <div className="pet-badge">{currentPet.age} yrs</div>
              {isDragging && (
                <div className={`swipe-indicator ${currentX > 50 ? 'like' : currentX < -50 ? 'nope' : ''}`}>
                  {currentX > 50 ? 'LIKE' : currentX < -50 ? 'NOPE' : ''}
                </div>
              )}
            </div>
            
            <div className="pet-details">
              <div className="pet-name-breed">
                <h2>{currentPet.name}</h2>
                <p>{currentPet.breed}</p>
              </div>
              <div className="pet-location">
                <span>📍 {currentPet.location} • {currentPet.distance}</span>
              </div>
              <p className="pet-bio-preview">{currentPet.bio.substring(0, 60)}...</p>
            </div>
          </div>
        ) : (
          <div className="no-more-pets">
            <h2>You've seen all pets!</h2>
            <p>New pets arrive daily - check back soon!</p>
            <button className="reset-btn" onClick={resetSwipes}>
              Start Over
            </button>
          </div>
        )}

        {currentIndex < petsData.length && (
          <div className="swipe-buttons">
            <button 
              className="swipe-btn reject-btn" 
              onClick={() => handleSwipe('left')}
            >
              ✖ Not for me
            </button>
            <button 
              className="swipe-btn like-btn" 
              onClick={() => handleSwipe('right')}
            >
              ❤️ Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetSwipe;