const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const Shelter = require('../models/Shelter');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Get all donations (admin only)
router.get('/', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get donations by shelter ID
router.get('/shelter/:shelterId', async (req, res) => {
  try {
    const { shelterId } = req.params;
    const shelter = await Shelter.findById(shelterId);
    
    if (!shelter) {
      return res.status(404).json({ message: 'Shelter not found' });
    }
    
    const donations = await Donation.find({ shelterId }).sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get donations by user ID (requires authentication)
router.get('/user', isAuthenticated, async (req, res) => {
  try {
    const donations = await Donation.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get donation by ID
router.get('/:id', async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    
    res.json(donation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new donation
router.post('/', async (req, res) => {
  try {
    const { amount, donorName, donorEmail, shelterId, userId, message, paymentMethod } = req.body;
    
    // Validate shelter exists
    const shelter = await Shelter.findById(shelterId);
    if (!shelter) {
      return res.status(404).json({ message: 'Shelter not found' });
    }
    
    // Create donation
    const donation = new Donation({
      amount,
      donorName,
      donorEmail,
      shelterId,
      userId,
      message,
      paymentMethod,
      status: 'completed' // In a real app, this would be set after payment processing
    });
    
    const savedDonation = await donation.save();
    res.status(201).json(savedDonation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update donation status (admin only)
router.patch('/:id/status', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'completed', 'failed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
    
    const donation = await Donation.findById(req.params.id);
    
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    
    donation.status = status;
    const updatedDonation = await donation.save();
    
    res.json(updatedDonation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete donation (admin only)
router.delete('/:id', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    
    await Donation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Donation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 