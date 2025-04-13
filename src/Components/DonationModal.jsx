import React, { useState } from 'react';
import './DonationModal.css';


const DonationModal = ({ shelterName, onClose }) => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pan: '',
    address: ''
  });

  const amountOptions = [500, 1000, 2000, 5000, 10000, 15000, 25000];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 0 && Number(value) <= 1000000)) {
      setCustomAmount(value);
      setSelectedAmount(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = customAmount || selectedAmount;
    if (!amount) {
      alert('Please select or enter a donation amount');
      return;
    }
    console.log('Donation submitted:', {
      shelterName,
      amount,
      isRecurring,
      ...formData
    });
    onClose();
  };

  return (
    <div className="donation-modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button 
          className="close-btn" 
          onClick={onClose}
          aria-label="Close donation modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="modal-header">
          <h2>DONATION AMOUNT</h2>
          <p className="shelter-name">Supporting: {shelterName}</p>
        </div>

        <div className="amount-options">
          {amountOptions.map(amount => (
            <button
              key={amount}
              type="button"
              className={`amount-option ${selectedAmount === amount ? 'selected' : ''}`}
              onClick={() => handleAmountSelect(amount)}
            >
              ₹{amount.toLocaleString('en-IN')}
            </button>
          ))}
        </div>

        <div className="custom-amount">
          <input
            type="number"
            placeholder="Enter custom amount (₹)"
            value={customAmount}
            onChange={handleCustomAmountChange}
            min="100"
            max="1000000"
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="recurring"
              checked={isRecurring}
              onChange={() => setIsRecurring(!isRecurring)}
            />
            <label htmlFor="recurring">Make this donation every month</label>
          </div>

          <h3 className="section-title">Personal Information</h3>

          <div className="form-group">
            <label htmlFor="name">Your Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number*</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              placeholder="10-digit mobile number"
              pattern="[0-9]{10}"
            />
          </div>

          <div className="form-group">
            <label htmlFor="pan">PAN Number*</label>
            <input
              type="text"
              id="pan"
              name="pan"
              value={formData.pan}
              onChange={handleInputChange}
              required
              placeholder="ABCDE1234F"
              pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
              title="Enter valid PAN (e.g., ABCDE1234F)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address*</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              placeholder="Your complete address"
            />
          </div>

          <div className="tax-benefit">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FF7E33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 8V12" stroke="#FF7E33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 16H12.01" stroke="#FF7E33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p>₹500+ donations qualify for 80G tax benefits</p>
          </div>

          <button 
            type="submit" 
            className="donate-button"
            disabled={!selectedAmount && !customAmount}
          >
            Donate Now
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonationModal;