import React from 'react';
import './AboutUs.css'; // Import the CSS

const AboutUs = () => {
  const toggle_mode = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
};

  
  return (
    <section className="about-us-section">
      <div className="about-title-container">
        <h2 className="about-us-title">ABOUT US</h2>
        <img 
          src="src/assets/aboutdog.png"
          alt="Happy dog" 
          className="about-dog-image" 
        />
      </div>
      <div className="about-us-cards">
        <div className="about-us-card">
          <img src="https://res.cloudinary.com/da1dzhidd/image/upload/v1745149612/Jheel/Heart_fjsvmb.png" alt="Heart Icon" />
          <h3>Love That Lasts a Lifetime</h3>
          <p>Every adoption story begins with a wagging tail and a happy "woof!" Our furry friends aren’t just pets—they’re family. When you adopt, you’re not just giving a dog a home; you’re gaining a loyal companion who’ll fill your days with love, laughter, and endless cuddles.</p>
        </div>

        <div className="about-us-card">
          <img src="https://res.cloudinary.com/da1dzhidd/image/upload/v1745149624/Jheel/Dogu_velgqj.png" alt="Steps Icon" />
          <h3>🐾 Meet Your Perfect Match</h3>
          <p>Finding your ideal furry friend is about more than just adoption—it’s about connection. We carefully match each dog’s personality with your lifestyle, ensuring a bond that lasts a lifetime. Let’s find your happily ever after together.</p>
        </div>

        <div className="about-us-card">
          <img src="https://res.cloudinary.com/da1dzhidd/image/upload/v1745149631/Jheel/Mail_hq6p4q.png" alt="Envelope Icon" />
          <h3>Stay Connected</h3>
          <p>We pledge to uphold the highest standards of kindness in every adoption, ensuring ethical and transparent matches. With confidence, our experts guide you through every step, from application to homecoming. Above all, we treat every dog, adopter, and process with unwavering respect. Your journey matters to us—questions? We’re just a message away.</p>
      </div>
      </div>
    </section>
  );
};

export default AboutUs;
