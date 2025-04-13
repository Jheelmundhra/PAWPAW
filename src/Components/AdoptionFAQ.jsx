import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiPlus, FiMinus } from 'react-icons/fi';
import './AdoptionFAQ.css';

const AdoptionFAQ = () => {
  const [activeFilter, setActiveFilter] = useState('Any');
  const [expandedId, setExpandedId] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const faqs = [
    {
      id: 1,
      question: "How do I know if I am well-prepared to adopt a pet?",
      answer: "Pets bring so much to our lives, but owning a pet is a lifelong commitment. There is an online assessment for you to complete on our portal after you decide to adopt a pet. This assessment allows you to evaluate your suitability and readiness to adopt a pet. Please ensure that you engage in responsible pet ownership practices and fully consider your conditions. Once you register, check the online assessment link here https://adopt-a-pet.in/pet-assessment",
      category: "Preparation"
    },
    {
      id: 2,
      question: "How do I know the breed and the health status of the pet?",
      answer: "Each pet's profile includes detailed information about their breed and health status. Our shelter conducts thorough health checks before listing any pet for adoption. You can also request medical records during your visit.",
      category: "Pet Info"
    },
    {
      id: 3,
      question: "How do I adopt a pet from your portal?",
      answer: "1. Browse available pets 2. Complete the adoption application 3. Schedule a meet-and-greet 4. Finalize paperwork 5. Bring your new pet home!",
      category: "Adoption Process"
    },
    {
      id: 4,
      question: "Can I adopt more than one pet?",
      answer: "Yes, we encourage adopting pets in pairs when appropriate. Some pets come as bonded pairs that must be adopted together.",
      category: "Adoption Process"
    },
    {
      id: 5,
      question: "Can I return the pet to the shelter if I cannot adopt it anymore?",
      answer: "Yes, we have a lifetime return policy. If you can no longer care for your pet, we require they be returned to us rather than rehomed.",
      category: "Post-Adoption"
    },
    {
      id: 6,
      question: "What kind of pets do you have in your portal currently?",
      answer: "We typically have dogs, cats, rabbits, and occasionally small animals like guinea pigs. Check our live listings for current availability.",
      category: "Pet Info"
    },
    {
      id: 7,
      question: "How do I create an account on your portal?",
      answer: "Click 'Sign Up' and provide your email, basic information, and create a password. You'll need to verify your email before applying to adopt.",
      category: "Account / Login"
    },
    {
      id: 8,
      question: "What should I do after making an appointment with the shelter?",
      answer: "Bring a valid ID, proof of address, and any household members who will interact with the pet. Arrive 10 minutes early to complete paperwork.",
      category: "Appointment with Shelter"
    },
    {
      id: 9,
      question: "How do I check my appointment time?",
      answer: "Your appointment confirmation email contains all details. You can also view upcoming appointments in your portal account dashboard.",
      category: "Appointment with Shelter"
    },
    {
      id: 10,
      question: "What's the best way to contact your shelter?",
      answer: "For fastest response, use the contact form in your portal account. You can also email contact@adopt-a-pet.in or call +1 (555) 123-4567 during business hours.",
      category: "Contact Us"
    }
  ];

  const categories = ['Any', 'Adoption Process', 'Account / Login', 'Appointment with Shelter', 'Contact Us'];

  const filteredFaqs = activeFilter === 'Any' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeFilter);

  return (
    <div className="faq-container">
      <div className="faq-header">
      <img src="src/assets/BigShoeLight.png" alt="Happy dog" className="header-dog-image" />
      <h1>Adoption FAQs</h1>
      </div>
      
      <div className="filter-section">
        <div 
          className="filter-header"
          onClick={() => setShowFilters(!showFilters)}
        >
          <span>Filter Selection</span>
          {showFilters ? <FiChevronUp /> : <FiChevronDown />}
        </div>
        
        {showFilters && (
          <div className="filter-content">
            <div className="filter-options">
              {categories.map(category => (
                <div 
                  key={category}
                  className={`filter-option ${activeFilter === category ? 'active' : ''}`}
                  onClick={() => setActiveFilter(category)}
                >
                  <span className="dash">-</span> {category}
                </div>
              ))}
            </div>
            <div className="apply-section">
              <button className="apply-btn">Apply</button>
            </div>
          </div>
        )}
      </div>

      <div className="faq-list">
        {filteredFaqs.map(faq => (
          <div key={faq.id} className="faq-item">
            <div 
              className="faq-question"
              onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
            >
              <span>{faq.question}</span>
              <span className="toggle-icon">
                {expandedId === faq.id ? <FiMinus /> : <FiPlus />}
              </span>
            </div>
            
            {expandedId === faq.id && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdoptionFAQ;