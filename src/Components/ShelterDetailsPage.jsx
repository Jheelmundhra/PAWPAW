import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ShelterDetailsPage.css";
import DonationModal from "./DonationModal";

const ShelterDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showDonationModal, setShowDonationModal] = React.useState(false);

  const shelters = [
    {
      id: 1,
      name: "PRAINIMAL FOUNDATION",
      location: "Pune",
      address: "B56, Purandar Society, Kashid Nagar, Pimple Gurav",
      phone: "+918669695454",
      description:
        "Officially established in 2020, combining Marathi 'PRANI' and English 'Animal' to reflect our cross-cultural mission.",
      established: "2020",
      image: "src/assets/shelters/pune.jpg",
      fullDescription:
        "PRAINIMAL FOUNDATION has been at the forefront of animal welfare in Pune since 2020. Our mission is to provide care, shelter, and medical attention to injured and abandoned animals while promoting responsible pet ownership in our community.",
      achievements: [
        "Rescued over 500 animals in 2022",
        "Successfully rehabilitated 300+ street dogs",
        "Conducted 50+ awareness programs in schools",
        "Established a 24/7 animal emergency response team",
      ],
      currentNeeds: [
        "Dog food and cat food",
        "Medical supplies",
        "Blankets and bedding",
        "Volunteers for weekend support",
      ],
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
      image: "src/assets/shelters/darjeeling.jpg",
      fullDescription:
        "Since 1993, Darjeeling Animal Shelter has been a pioneer in animal welfare in West Bengal. We've transformed the landscape of animal care in the region through dedicated service and community engagement.",
      achievements: [
        "Eliminated street animal poisoning through partnerships",
        "Treated over 10,000 animals since inception",
        "Established first mobile veterinary unit in the region",
        "Created a network of animal welfare volunteers",
      ],
      currentNeeds: [
        "Winter blankets for animals",
        "Veterinary medicines",
        "Food supplies",
        "Transport vehicle maintenance",
      ],
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
      image: "src/assets/shelters/hyderabad.jpg",
      fullDescription:
        "People for Animals Hyderabad has been a cornerstone of animal welfare in the city since 1990. We've grown from a small group of passionate individuals to a full-fledged animal welfare organization.",
      achievements: [
        "Established first animal hospital in Hyderabad",
        "Conducted over 100,000 sterilizations",
        "Created city-wide animal welfare awareness",
        "Implemented animal birth control programs",
      ],
      currentNeeds: [
        "Medical equipment",
        "Surgical supplies",
        "Animal food",
        "Volunteer veterinarians",
      ],
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
      image: "src/assets/shelters/udaipur.jpg",
      fullDescription:
        "Animal Aid Unlimited has been transforming the lives of street animals in Udaipur since 2002. Our specialized care for disabled animals has made us a unique institution in animal welfare.",
      achievements: [
        "Built specialized facilities for disabled animals",
        "Rescued over 50,000 animals",
        "Developed innovative rehabilitation techniques",
        "Created a model for street animal care",
      ],
      currentNeeds: [
        "Specialized equipment for disabled animals",
        "Regular medical supplies",
        "Construction materials for shelter expansion",
        "Trained caregivers",
      ],
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
      image: "src/assets/shelters/delhi.jpg",
      fullDescription:
        "As Delhi's oldest animal shelter, we've been setting the standard for animal care since 1980. Our legacy of compassion has touched the lives of countless animals and inspired generations of animal welfare workers.",
      achievements: [
        "Treated over 1 million animals since inception",
        "Established Delhi's first animal ambulance service",
        "Created comprehensive animal welfare guidelines",
        "Trained hundreds of veterinary professionals",
      ],
      currentNeeds: [
        "Ambulance maintenance",
        "Medical supplies",
        "Food for animals",
        "Infrastructure upgrades",
      ],
    },
  ];

  // Add console.log to debug
  console.log("ID from URL:", id);
  const shelter = shelters.find((s) => s.id === parseInt(id));
  console.log("Found shelter:", shelter);

  if (!shelter) {
    return (
      <div className="shelter-not-found">
        <h2>Shelter Not Found</h2>
        <button onClick={() => navigate("/partner-shelters")}>
          Back to Shelters
        </button>
      </div>
    );
  }

  return (
    <div className="shelter-details-page">
      <button
        className="back-button"
        onClick={() => navigate("/partner-shelters")}
      >
        ← Back to Shelters
      </button>

      <div className="shelter-hero">
        <img
          src={shelter.image}
          alt={shelter.name}
          className="shelter-main-image"
        />
        <div className="shelter-hero-content">
          <h1>{shelter.name}</h1>
          <div className="shelter-badges">
            <span className="badge">Est. {shelter.established}</span>
            <span className="badge">{shelter.location}</span>
          </div>
        </div>
      </div>

      <div className="shelter-content">
        <div className="shelter-main-info">
          <section className="about-section">
            <h2>About Us</h2>
            <p>{shelter.fullDescription}</p>
          </section>

          <section className="achievements-section">
            <h2>Our Achievements</h2>
            <ul className="achievements-list">
              {shelter.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className="shelter-sidebar">
          <div className="contact-card">
            <h3>Contact Information</h3>
            <div className="contact-info">
              <p>
                <strong>Address:</strong>
                <br />
                {shelter.address}
              </p>
              <p>
                <strong>Phone:</strong>
                <br />
                {shelter.phone}
              </p>
            </div>
          </div>

          <div className="needs-card">
            <h3>Current Needs</h3>
            <ul className="needs-list">
              {shelter.currentNeeds.map((need, index) => (
                <li key={index}>{need}</li>
              ))}
            </ul>
          </div>

          <button
            className="support-button"
            onClick={() => setShowDonationModal(true)}
          >
            Support This Shelter
          </button>
        </div>
      </div>

      {showDonationModal && (
        <div className="modal-overlay">
          <div className="donation-modal">
            <DonationModal
              shelterName={shelter.name}
              onClose={() => setShowDonationModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShelterDetailsPage;
