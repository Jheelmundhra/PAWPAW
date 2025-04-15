import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const sections = useRef([]);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const section = entry.target;
        const direction = entry.boundingClientRect.top < 0 ? 'up' : 'down';
        
        if (entry.isIntersecting) {
          section.classList.add('active', `active-${direction}`);
          section.classList.remove('inactive');
        } else {
          section.classList.add('inactive');
          section.classList.remove('active', 'active-up', 'active-down');
        }
      });
    }, { 
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    });

    sections.current.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleLogin = () => {
    navigate('/signin');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="homepage" ref={containerRef}>
      {/* First Section */}
      <section 
        className="content-section first-section" 
        ref={el => sections.current[0] = el}
        data-section="1"
      >
        <div className="content-wrapper">
          <div className="image-container">
            <img 
              src="src/assets/Dogu2.png" 
              alt="Happy Dog" 
              className="dog-image" 
              data-parallax
            />
            <div className="image-overlay"></div>
          </div>
          <div className="text-content">
            <h2 className="title">
              <span className="title-line">Why</span>
              <span className="title-line">Adopt?</span>
            </h2>
            <div className="paragraph-container">
              <p className="paragraph">
                Thousands of animals wait every day, hoping today will be the day someone chooses them. 
                Their pasts may be uncertain, but their futures are bright — because of people like you. 
                When you adopt, you write a new story, one filled with love, loyalty, and endless tail wags or purrs. 
                Be the reason a shelter pet sleeps peacefully tonight. Adopt and change two lives: theirs and yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Second Section */}
      <section 
        className="content-section second-section" 
        ref={el => sections.current[1] = el}
        data-section="2"
      >
        <div className="content-wrapper reverse">
          <div className="text-content">
            <h2 className="title">
              <span className="title-line">Make a</span>
              <span className="title-line">Difference</span>
            </h2>
            <div className="paragraph-container">
              <p className="paragraph">
                Some heroes don't wear capes — they carry leashes, throw tennis balls, and open their homes to shelter animals. 
                Adoption is an act of courage, compassion, and unconditional love. 
                For every pet you adopt, you create a world where second chances are real and happy endings do happen. 
                Be someone's whole world. Adopt, don't shop.
              </p>
            </div>
          </div>
          <div className="image-container">
            <img 
              src="src/assets/Dogu1.png" 
              alt="Another Happy Dog" 
              className="dog-image" 
              data-parallax
            />
            <div className="image-overlay"></div>
          </div>
        </div>
      </section>

      {/* Third Section */}
      <section 
        className="content-section third-section" 
        ref={el => sections.current[2] = el}
        data-section="3"
      >
        <div className="content-wrapper">
          <div className="image-container">
            <img 
              src="src/assets/Dogu3.png" 
              alt="Rescued Dog" 
              className="dog-image" 
              data-parallax
            />
            <div className="image-overlay"></div>
          </div>
          <div className="text-content">
            <h2 className="title">
              <span className="title-line">Change</span>
              <span className="title-line">a Life</span>
            </h2>
            <div className="paragraph-container">
              <p className="paragraph">
                Every adoption creates a ripple effect - you're not just saving one animal, you're making room for another to be rescued. 
                Shelter pets come with gratitude that lasts a lifetime, and love that knows no bounds. 
                They may not be perfect, but they'll be perfect for you. 
                Open your heart and home to a pet who will cherish you unconditionally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Shelters Section */}
      <section 
        className="content-section shelters-section" 
        ref={el => sections.current[3] = el}
        data-section="4"
      >
        <div className="content-wrapper reverse">
          <div className="text-content">
            <h2 className="title">
              <span className="title-line">Our Preferred</span>
              <span className="title-line">Shelters & NGOs</span>
            </h2>
            <div className="paragraph-container">
              <p className="paragraph">
                Shelters in India play a vital role in reducing number of homeless pets by providing 
                a safe place for abandoned animals to stay until they are adopted into loving homes. 
                These shelters work tirelessly to find caring families for these animals.
              </p>
              <div className="shelter-buttons">
                <a href="/partner-shelters" className="shelter-button">
                  Partner Shelters & NGOs
                </a>
                <a href="/become-partner" className="shelter-button secondary">
                  Contact us to become a partner shelter
                </a>
              </div>
            </div>
          </div>
          <div className="image-container">
            <img 
              src="src/assets/ChatGPT Image Apr 9, 2025 at 10_21_12 PM.png"
              alt="Shelter Volunteers" 
              className="dog-image" 
              data-parallax
            />
            <div className="image-overlay"></div>
          </div>
        </div>
      </section>

      {/* Updated Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-mission">
            <p className="mission-statement">
              Just saving animals' lives. Together we work towards bringing about a significant change 
              in the society towards homeless companion animals. Hats off to them!
            </p>
            <div className="partner-links">
              <a href="/partner-shelters" className="partner-link">Partner Shelters & NGOs</a>
              <a href="/become-partner" className="partner-link">Contact us to become a partner shelter</a>
            </div>
          </div>

          <div className="footer-grid">
            <div className="footer-section">
              <h3 className="footer-heading">Adopt a Pet</h3>
              <ul className="footer-links">
                <li><a href="/">Home</a></li>
                <li><a href="/partner-shelters">Partner Shelters & NGOs</a></li>
                <li><a href="/create-account">Create an account</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3 className="footer-heading">Resources</h3>
              <ul className="footer-links">
                <li><a href="/find-pet">Find a Pet</a></li>
                <li><a href="/pet-care">Caring For Pets</a></li>
                <li><a href="/signin">Sign in</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3 className="footer-heading">About</h3>
              <ul className="footer-links">
                <li><a href="/adoption-faqs">Adoption FAQs</a></li>
                <li><a href="/about-us">About Us</a></li>
                <li><a href="/contact">Contact Us</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3 className="footer-heading">Legal</h3>
              <ul className="footer-links">
                <li><a href="https://mars.com">Visit Mars.com</a></li>
                <li><a href="/modern-slavery">Modern Slavery Act</a></li>
                <li><a href="/privacy">Privacy Statement</a></li>
                <li><a href="/legal">Legal</a></li>
                <li><a href="/accessibility">Accessibility</a></li>
                <li><a href="/supply-chain">CA Supply Chain Transparency</a></li>
                <li><a href="/cookies">Cookies Notice</a></li>
              </ul>
            </div>

            <div className="footer-social">
              <h3 className="footer-heading">Follow Us</h3>
              <div className="social-links">
                <a href="#" className="social-link">FB</a>
                <a href="#" className="social-link">IG</a>
                <a href="#" className="social-link">TW</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="copyright">©2023 Mars or Affiliates.</p>
            <div className="footer-adchoices">
              <a href="/adchoices">AdChoices</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;