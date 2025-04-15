import React, { useState, useEffect } from 'react';
import './DonationHistory.css';

const DonationHistory = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/donations/history', {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
        const data = await response.json();
        setDonations(data);
      } catch (error) {
        setError('Failed to load donation history');
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="donation-history-container">
      <h2>Your Donation History</h2>
      {donations.length === 0 ? (
        <p>No donations yet</p>
      ) : (
        <div className="donations-list">
          {donations.map((donation) => (
            <div key={donation._id} className="donation-card">
              <div className="donation-amount">${donation.amount}</div>
              <div className="donation-details">
                <p>To: {donation.shelter.name}</p>
                <p>Date: {new Date(donation.createdAt).toLocaleDateString()}</p>
                {donation.message && <p>Message: {donation.message}</p>}
              </div>
              <div className="donation-status">
                Status: <span className={donation.status}>{donation.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonationHistory; 