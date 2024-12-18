const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0, 
  },
  paymentMethod: {
    type: String,
    enum: ['Stripe', 'PayPal'], 
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'], 
    default: 'pending',
  },
}, { 
  timestamps: true,
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
