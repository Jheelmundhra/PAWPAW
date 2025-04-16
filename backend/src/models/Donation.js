const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donationSchema = new Schema({
  amount: {
    type: Number,
    required: true,
    min: 1
  },
  donorName: {
    type: String,
    required: true,
    trim: true
  },
  donorEmail: {
    type: String,
    required: true,
    trim: true
  },
  shelterId: {
    type: Schema.Types.ObjectId,
    ref: 'Shelter',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false // Optional, as anonymous donations are allowed
  },
  message: {
    type: String,
    trim: true
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'paypal', 'bank_transfer'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Donation', donationSchema); 