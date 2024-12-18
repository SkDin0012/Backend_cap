import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPaymentIntent } from '../redux/slices/paymentSlice';
import '../Login.css';

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    amount: '',
    currency: 'usd',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch();
  const { loading, error: paymentError } = useSelector((state) => state.payment);
  const userId = useSelector((state) => state.user.userInfo?.userId || null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!userId) {
      setError('User not logged in. Please log in to continue.');
      return;
    }

    const { amount, currency } = formData;

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Please enter a valid amount.');
      return;
    }

    const paymentData = {
      user: userId,
      amount: Math.round(Number(amount) * 100),
      currency,
      payment_method_types: ['card'],
    };

    console.log('Submitting payment data:', paymentData);

    try {
      await dispatch(createPaymentIntent(paymentData)).unwrap();
      setSuccessMessage('Payment submitted successfully!');

      setFormData({
        cardNumber: '',
        expiryDate: '',
        cvc: '',
        amount: '',
        currency: 'usd',
      });
    } catch (err) {
      console.error('Error during payment submission:', err);
      setError(paymentError?.message || 'Failed to submit payment');
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5>Payment Information</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
          {paymentError && <div className="alert alert-danger">{paymentError.message || JSON.stringify(paymentError)}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}

          <div className="mb-3">
            <label htmlFor="amount" className="form-label">Amount</label>
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Amount"
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="currency" className="form-label">Currency</label>
            <select name="currency" value={formData.currency} onChange={handleChange} className="form-control" required>
              <option value="usd">USD</option>
              <option value="inr">INR</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="cardNumber" className="form-label">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              maxLength="16"
              value={formData.cardNumber}
              onChange={handleChange}
              className="form-control"
              required
              placeholder="1234 5678 9012 3456"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="expiryDate" className="form-label">Expiry Date (MM/YY)</label>
            <input
              type="text"
              name="expiryDate"
              placeholder="MM/YY"
              maxLength="5"
              value={formData.expiryDate}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="cvc" className="form-label">CVC</label>
            <input
              type="text"
              name="cvc"
              maxLength="3"
              value={formData.cvc}
              onChange={handleChange}
              className="form-control"
              required
              placeholder="123"
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Processing...' : 'Pay'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
