import React, { useState, useEffect } from "react";
import "./ShelterPage.css";
import DonationModal from "./DonationModal";
import { useNavigate } from "react-router-dom";
import PetDetailsModal from "./PetDetailsModal";
import { useAuth } from "./AuthContext";
import AddShelterModal from "./AddShelterModal";
import ShelterDetailsModal from "./ShelterDetailsModal";
import api from "../services/api";

const ShelterPage = () => {
  const [selectedShelter, setSelectedShelter] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showShelterDetailsModal, setShowShelterDetailsModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [showAnimalFilters, setShowAnimalFilters] = useState(false);
  const [animalFilters, setAnimalFilters] = useState({
    shelter: "",
    city: "",
    zipcode: "",
    radius: 5,
    petType: "",
  });
  const [showAddShelterModal, setShowAddShelterModal] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [shelters, setShelters] = useState([
    {
      id: 1,
      name: "PRAINIMAL FOUNDATION",
      location: "Pune",
      address: "B56, Purandar Society, Kashid Nagar, Pimple Gurav",
      phone: "+918669695454",
      description:
        "Officially established in 2020, combining Marathi 'PRANI' and English 'Animal' to reflect our cross-cultural mission.",
      established: "2020",
      image:
        "https://images.pexels.com/photos/12195421/pexels-photo-12195421.jpeg",
    },
    {
      id: 2,
      name: "DARJEELING ANIMAL SHELTER",
      location: "West Bengal",
      address: "Kothi Gaon, Harsing Hatta, Lebong 734105",
      phone: "+917365050368",
      description:
        "Saved thousands of animals since 1993, eliminating street poisoning through municipal partnerships.",
      established: "1993",
      image:
        "https://images.pexels.com/photos/11931735/pexels-photo-11931735.jpeg",
    },
    {
      id: 3,
      name: "PEOPLE FOR ANIMALS",
      location: "Hyderabad",
      address: "Opp. Goodwill School, Begum Bazar, 500012",
      phone: "+919505537388",
      description:
        "Pioneering animal welfare since 1990 when the concept was new to the city.",
      established: "1990",
      image:
        "https://images.pexels.com/photos/11683889/pexels-photo-11683889.jpeg",
    },
    {
      id: 4,
      name: "ANIMAL AID UNLIMITED",
      location: "Udaipur",
      address: "Near Bhuvana Circus, Kanak Durga Temple",
      phone: "+919828022020",
      description:
        "Rescues and treats injured street animals since 2002 with special care for disabled animals.",
      established: "2002",
      image:
        "https://images.pexels.com/photos/4697573/pexels-photo-4697573.jpeg",
    },
    {
      id: 5,
      name: "SANJAY GANDHI ANIMAL CARE",
      location: "Delhi",
      address: "Near Raja Garden, New Delhi 110015",
      phone: "+919810156789",
      description:
        "Delhi's oldest shelter providing medical care to thousands annually since 1980.",
      established: "1980",
      image:
        "https://images.pexels.com/photos/30556343/pexels-photo-30556343/free-photo-of-heartwarming-image-of-a-rescued-dog-shaking-hand.jpeg",
    },
  ]);

  const animals = [
    {
      id: 1,
      name: "Bulbha",
      age: "Juvenile <6 to12 months>",
      breed: "Indie",
      shelter: "World For All Animal Care and Adoptions",
      image:
        "https://images.pexels.com/photos/2023384/pexels-photo-2023384.jpeg",
    },
    {
      id: 2,
      name: "Push",
      age: "Young adult <13 to 24 months>",
      breed: "Indie",
      shelter: "World For All Animal Care and Adoptions",
      image:
        "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg",
    },
    {
      id: 3,
      name: "Barti",
      age: "Juvenile <6 to12 months>",
      breed: "Indie",
      shelter: "World For All Animal Care and Adoptions",
      image:
        "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg",
    },
    {
      id: 4,
      name: "Delilah",
      age: "Juvenile <6 to12 months>",
      breed: "Indie",
      shelter: "World For All Animal Care and Adoptions",
      image:
        "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
    },
    {
      id: 5,
      name: "Pepper",
      age: "Puppy <0 to 5month>",
      breed: "Indie",
      shelter: "World For All Animal Care and Adoptions",
      image: "https://images.pexels.com/photos/774731/pexels-photo-774731.jpeg",
    },
    {
      id: 6,
      name: "Ragul",
      age: "Puppy <0 to 5month>",
      breed: "Indie",
      shelter: "People for Animals",
      image: "https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg",
    },
    {
      id: 7,
      name: "Pasta",
      age: "Juvenile <6 to12 months>",
      breed: "Indie",
      shelter: "World For All Animal Care and Adoptions",
      image: "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg",
    },
  ];

  const locations = [...new Set(shelters.map((shelter) => shelter.location))];
  const years = [
    ...new Set(shelters.map((shelter) => shelter.established)),
  ].sort();
  const shelterNames = [...new Set(shelters.map((shelter) => shelter.name))];

  const handleSupportClick = (shelter) => {
    setSelectedShelter(shelter);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedShelter(null);
  };

  const handleLearnMoreClick = (shelter) => {
    setSelectedShelter(shelter);
    setShowShelterDetailsModal(true);
  };

  const handleCloseShelterDetailsModal = () => {
    setShowShelterDetailsModal(false);
    setSelectedShelter(null);
  };

  const handleAnimalFilterChange = (e) => {
    const { name, value } = e.target;
    setAnimalFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [selectedPet, setSelectedPet] = useState(null);

  const handlePetDetailsClick = (pet) => {
    setSelectedPet(pet);
  };

  const handleClosePetModal = () => {
    setSelectedPet(null);
  };

  const filteredShelters = shelters.filter((shelter) => {
    const matchesSearch =
      shelter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shelter.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = selectedLocation
      ? shelter.location === selectedLocation
      : true;
    const matchesYear = selectedYear
      ? shelter.established === selectedYear
      : true;

    return matchesSearch && matchesLocation && matchesYear;
  });

  const filteredAnimals = animals.filter((animal) => {
    const matchesShelter = animalFilters.shelter
      ? animal.shelter === animalFilters.shelter
      : true;
    const matchesCity = animalFilters.city
      ? animal.location.includes(animalFilters.city)
      : true;
    const matchesPetType = animalFilters.petType
      ? animal.type === animalFilters.petType
      : true;

    return matchesShelter && matchesCity && matchesPetType;
  });

  const handleAddShelterClick = () => {
    console.log("Current user:", user); // Debug log to see the user structure

    if (!user) {
      console.log("No user found, redirecting to login");
      navigate("/login", { state: { from: "/partner-shelters" } });
      return;
    }

    // Check if the user has a token or if there's one in localStorage
    const hasToken = !!(
      user.token ||
      user.accessToken ||
      localStorage.getItem("token")
    );

    if (!hasToken) {
      console.log("No token found, redirecting to login");
      navigate("/login", { state: { from: "/partner-shelters" } });
      return;
    }

    setShowAddShelterModal(true);
  };

  // Update the useEffect with image path handling
  useEffect(() => {
    const fetchShelters = async () => {
      try {
        console.log("Attempting to fetch shelters from API...");
        const fetchedShelters = await api.getShelters();
        if (fetchedShelters && Array.isArray(fetchedShelters)) {
          console.log("Successfully fetched shelters:", fetchedShelters);

          // Process shelters to handle image paths correctly
          const processedShelters = fetchedShelters.map((shelter) => {
            // Handle different possible image property names
            const imageUrl =
              shelter.imageUrl || shelter.image || shelter.imagePath;

            // If the image path is relative, make it absolute
            let image = imageUrl;
            if (
              imageUrl &&
              !imageUrl.startsWith("http") &&
              !imageUrl.startsWith("data:")
            ) {
              // Assuming uploads are served from /uploads directory
              image = `http://localhost:5004/uploads/${imageUrl.replace(
                /^\/uploads\//,
                ""
              )}`;
            }

            return {
              ...shelter,
              // Use the original property name, but also provide 'image' for consistency
              image: image,
              imageUrl: image,
            };
          });

          setShelters(processedShelters);
        } else {
          console.log(
            "No shelters returned from API or invalid format, using defaults"
          );
        }
      } catch (error) {
        console.error("Error fetching shelters:", error);
        // Will use the default shelters set in useState
      }
    };

    fetchShelters();
  }, []);

  const handleShelterAdded = (newShelter) => {
    console.log("Adding new shelter to list:", newShelter);

    // Handle image path for the new shelter
    let processedShelter = { ...newShelter };

    // Process image URL if it exists
    if (newShelter.imageUrl || newShelter.image || newShelter.imagePath) {
      const imageUrl =
        newShelter.imageUrl || newShelter.image || newShelter.imagePath;

      // If the image path is relative, make it absolute
      if (
        imageUrl &&
        !imageUrl.startsWith("http") &&
        !imageUrl.startsWith("data:")
      ) {
        const fullImageUrl = `http://localhost:5004/uploads/${imageUrl.replace(
          /^\/uploads\//,
          ""
        )}`;
        processedShelter.image = fullImageUrl;
        processedShelter.imageUrl = fullImageUrl;
      }
    }

    // Properly update the shelters state with the processed shelter
    setShelters((prevShelters) => {
      // Check if the new shelter is a valid object
      if (!newShelter || typeof newShelter !== "object") {
        console.error("Invalid shelter object received:", newShelter);
        return prevShelters;
      }

      // Add the new shelter to the beginning of the array
      return [processedShelter, ...prevShelters];
    });
  };

  // Add this function to handle image loading
  const handleImageLoad = (event, shelterId) => {
    console.log(`Image for shelter ${shelterId} loaded successfully`);
    // Remove loading class if it exists
    if (event.target.parentElement) {
      event.target.parentElement.classList.remove("loading");
    }
  };

  // Add this function to handle image loading failures
  const handleImageError = (event, shelter) => {
    console.error(`Image failed to load for shelter:`, shelter);
    // Add error class to show the error styling
    if (event.target.parentElement) {
      event.target.parentElement.classList.add("error");
    }

    // Try to set a fallback image
    event.target.src =
      "https://images.pexels.com/photos/4588018/pexels-photo-4588018.jpeg";
  };

  return (
    <div className="shelters-page">
      <div className="page-header">
        <h1>Our Partner Shelters</h1>
        <p className="subtitle">
          Creating safe havens for animals across India
        </p>
        <button className="add-shelter-button" onClick={handleAddShelterClick}>
          Add Your Shelter
        </button>
      </div>

      <div className="filters-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search shelters by name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-controls">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="filter-select"
          >
            <option key="all-locations" value="">
              All Locations
            </option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="filter-select"
          >
            <option key="all-years" value="">
              All Years
            </option>
            {years.map((year) => (
              <option key={year} value={year}>
                Since {year}
              </option>
            ))}
          </select>

          <button
            className="action-button outline"
            onClick={() => setShowAnimalFilters(!showAnimalFilters)}
          >
            {showAnimalFilters
              ? "Hide Shelter Animals"
              : "Show Shelter Animals"}
          </button>
        </div>
      </div>

      {showAnimalFilters ? (
        // < className="animal-filters-container">
        //   <h2>Search Shelter Animals</h2>
        //   <div className="animal-filters">
        //     <div className="filter-group">
        //       <label>Shelter or City</label>
        //       <select
        //         name="shelter"
        //         value={animalFilters.shelter}
        //         onChange={handleAnimalFilterChange}
        //         className="filter-select"
        //       >
        //         <option key="select-shelter" value="">
        //           Select Shelter or City
        //         </option>
        //         {shelterNames.map((shelter) => (
        //           <option key={shelter} value={shelter}>
        //             {shelter}
        //           </option>
        //         ))}
        //       </select>
        //     </div>

        //     <div className="filter-group">
        //       <label>Zipcode</label>
        //       <input
        //         type="text"
        //         name="zipcode"
        //         value={animalFilters.zipcode}
        //         onChange={handleAnimalFilterChange}
        //         placeholder="Enter zipcode"
        //         className="filter-select"
        //       />
        //     </div>

        //     <div className="filter-group">
        //       <label>Radius (km)</label>
        //       <select
        //         name="radius"
        //         value={animalFilters.radius}
        //         onChange={handleAnimalFilterChange}
        //         className="filter-select"
        //       >
        //         <option key="radius-5" value="5">
        //           5 km
        //         </option>
        //         <option key="radius-10" value="10">
        //           10 km
        //         </option>
        //         <option key="radius-25" value="25">
        //           25 km
        //         </option>
        //         <option key="radius-50" value="50">
        //           50 km
        //         </option>
        //       </select>
        //     </div>

        //     <div className="filter-group">
        //       <label>Pet Type (Optional)</label>
        //       <select
        //         name="petType"
        //         value={animalFilters.petType}
        //         onChange={handleAnimalFilterChange}
        //         className="filter-select"
        //       >
        //         <option key="all-pets" value="">
        //           All Pets
        //         </option>
        //         <option key="dogs" value="dog">
        //           Dogs
        //         </option>
        //         <option key="cats" value="cat">
        //           Cats
        //         </option>
        //         <option key="birds" value="bird">
        //           Birds
        //         </option>
        //         <option key="other" value="other">
        //           Other
        //         </option>
        //       </select>
        //     </div>

        //     <button className="action-button">Search Animals</button>
        //   </div>

          <div className="featured-animals">
            <h3>Featured Pets</h3>
            <div className="animals-list">
              {animals.map((animal) => (
                <div key={animal.id} className="animal-card">
                  <div
                    className="animal-image"
                    style={{ backgroundImage: `url(${animal.image})` }}
                  ></div>
                  <div className="animal-info">
                    <h4>{animal.name}</h4>
                    <p>{animal.age}</p>
                    <p>{animal.breed}</p>
                    <p className="shelter-name">{animal.shelter}</p>
                    <button
                      className="pet-details-button"
                      onClick={() => handlePetDetailsClick(animal)}
                    >
                      Pet Details ▶
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="action-button outline">Find more pets</button>
          </div>
        
      ) : (
        <div className="shelters-grid">
          {filteredShelters.length > 0 ? (
            filteredShelters.map((shelter) => (
              <div key={shelter.id || shelter._id} className="shelter-card">
                <div
                  className="card-image loading"
                  style={{
                    backgroundImage: `url(${
                      shelter.image ||
                      shelter.imageUrl ||
                      "https://images.pexels.com/photos/4588018/pexels-photo-4588018.jpeg"
                    })`,
                  }}
                >
                  {/* Hidden image to test loading */}
                  <img
                    src={
                      shelter.image ||
                      shelter.imageUrl ||
                      "https://images.pexels.com/photos/4588018/pexels-photo-4588018.jpeg"
                    }
                    alt=""
                    style={{ display: "none" }}
                    onLoad={(e) =>
                      handleImageLoad(e, shelter.id || shelter._id)
                    }
                    onError={(e) => handleImageError(e, shelter)}
                  />
                  <div className="established-badge">
                    Since{" "}
                    {shelter.established ||
                      new Date(shelter.createdAt || Date.now()).getFullYear()}
                  </div>
                </div>

                <div className="card-content">
                  <div className="shelter-header">
                    <h2>{shelter.name}</h2>
                    <h3>{shelter.location}</h3>
                  </div>

                  <div className="contact-info">
                    <div className="contact-item">
                      <svg viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      <span>{shelter.address || shelter.location}</span>
                    </div>

                    <div className="contact-item">
                      <svg viewBox="0 0 24 24">
                        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                      </svg>
                      <span>{shelter.contactPhone || shelter.phone}</span>
                    </div>
                  </div>

                  <p className="shelter-description">{shelter.description}</p>

                  <div className="card-actions">
                    <button
                      className="action-button"
                      onClick={() => handleSupportClick(shelter)}
                    >
                      <svg viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                      Support
                    </button>
                    <button
                      className="action-button outline"
                      onClick={() => handleLearnMoreClick(shelter)}
                    >
                      <svg viewBox="0 0 24 24">
                        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                      </svg>
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No shelters found matching your criteria</p>
            </div>
          )}
        </div>
      )}

      {showModal && selectedShelter && (
        <DonationModal
          shelterName={selectedShelter.name}
          onClose={handleCloseModal}
        />
      )}

      {selectedPet && (
        <PetDetailsModal pet={selectedPet} onClose={handleClosePetModal} />
      )}

      {showShelterDetailsModal && selectedShelter && (
        <ShelterDetailsModal
          shelter={selectedShelter}
          onClose={handleCloseShelterDetailsModal}
        />
      )}

      {showAddShelterModal && (
        <AddShelterModal
          isOpen={showAddShelterModal}
          onClose={() => setShowAddShelterModal(false)}
          onShelterAdded={handleShelterAdded}
        />
      )}
    </div>
  );
};

export default ShelterPage;
