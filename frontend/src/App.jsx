import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import PetSwipe from './Components/PetSwipe';
import AboutUs from './Components/AboutUs';
import './App.css';
import { AuthProvider } from './Components/AuthContext';
import AdoptionFAQ from './Components/AdoptionFAQ';
import CaringForPets from './Components/CaringForPets';
import HomePage from './Components/HomePage';
import ContactForm from './Components/ContactForm';
import ShelterPage from './Components/ShelterPage';
import ShelterDetailsPage from './Components/ShelterDetailsPage';
import DonationHistory from './Components/DonationHistory';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Profile from './Components/Profile/Profile';
import AddPet from './Components/AddPet';
import ManagePets from './Components/ManagePets';
import PetDetailsPage from './Components/PetDetailsPage';

// Import with error handling
let dogImage;
try {
  dogImage = require('./assets/dog.png');
} catch (e) {
  dogImage = null;
}

const App = () => {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('current_theme') || 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    localStorage.setItem('current_theme', theme);
  }, [theme]);

  return (
    <Router>
      <AuthProvider>
        <div className={`container ${theme}`}>
          <Navbar theme={theme} setTheme={setTheme} />
          <div className="page-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/become-partner" element={<ContactForm />} />
              <Route path="/partner-shelters" element={<ShelterPage />} />
              <Route path="/shelter/:id" element={<ShelterDetailsPage />} />
              <Route path="/find-pet" element={<PetSwipe />} />
              <Route path="/adoption-faq" element={<AdoptionFAQ/>} />
              <Route path="/caring" element={<CaringForPets />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/donations/history" element={<DonationHistory />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/add-pet" element={<AddPet />} />
              <Route path="/manage-pets" element={<ManagePets />} />
              <Route path="/pet/:id" element={<PetDetailsPage />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
