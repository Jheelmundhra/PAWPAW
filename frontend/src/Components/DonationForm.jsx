import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import './DonationForm.css';

const stripePromise = loadStripe('your_publishable_key'); // Replace with your Stripe publishable key
const API_BASE_URL = 'http://localhost:5004/api';

const DonationForm = ({ shelterId, shelterName }) => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const stripe = await stripePromise;
      
      // Create payment intent
      const response = await fetch(`${API_BASE_URL}/donations/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ amount: parseFloat(amount) })
      });

      const { clientSecret } = await response.json();

      // Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement('card'),
          billing_details: {
            name: 'User Name' // You can get this from your auth context
          }
        }
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        // Create donation record
        await fetch(`${API_BASE_URL}/donations`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({
            amount: parseFloat(amount),
            shelterId,
            message,
            paymentIntentId: result.paymentIntent.id
          })
        });

        // Show success message or redirect
        alert('Thank you for your donation!');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="donation-form-container">
      <h2>Donate to {shelterName}</h2>
      <form onSubmit={handleSubmit} className="donation-form">
        <div className="form-group">
          <label htmlFor="amount">Donation Amount ($)</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message (Optional)</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="3"
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Donate'}
        </button>
      </form>
    </div>
  );
};

export default DonationForm; 