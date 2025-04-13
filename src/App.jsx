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
    <AuthProvider>
      <Router>
        <div className={`container ${theme}`}>
          <Navbar theme={theme} setTheme={setTheme} />
          <div className="page-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/become-partner" element={<ContactForm />} />
              <Route path="/partner-shelters" element={<ShelterPage />} />
              <Route path="/find-pet" element={<PetSwipe />} />
              <Route path="/adoption-faq" element={<AdoptionFAQ/>} />
              <Route path="/caring" element={<CaringForPets />} />
              <Route path="/about" element={<AboutUs />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
