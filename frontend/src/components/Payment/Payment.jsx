import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/config';
import { useAuth } from '../../context/AuthContext';
import './payment.css';

const Payment = ({ booking, onSuccess, onCancel }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: ''
  });
  const [validationErrors, setValidationErrors] = useState({});

  const validateCardNumber = (number) => {
    // Remove spaces and dashes
    const cleanNumber = number.replace(/[\s-]/g, '');
    // Check if it's a valid credit card number (basic Luhn algorithm)
    let sum = 0;
    let isEven = false;
    
    // Loop through values starting from the rightmost digit
    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNumber.charAt(i));

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  };

  const validateExpiryDate = (date) => {
    const [month, year] = date.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (!month || !year) return false;
    
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);

    if (monthNum < 1 || monthNum > 12) return false;
    if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) return false;

    return true;
  };

  const validateForm = () => {
    const errors = {};
    
    // Card holder name validation
    if (!cardDetails.cardHolderName.trim()) {
      errors.cardHolderName = 'Card holder name is required';
    } else if (cardDetails.cardHolderName.length < 3) {
      errors.cardHolderName = 'Card holder name must be at least 3 characters';
    }

    // Card number validation
    if (!cardDetails.cardNumber.trim()) {
      errors.cardNumber = 'Card number is required';
    } else if (!validateCardNumber(cardDetails.cardNumber)) {
      errors.cardNumber = 'Invalid card number';
    }

    // Expiry date validation
    if (!cardDetails.expiryDate.trim()) {
      errors.expiryDate = 'Expiry date is required';
    } else if (!validateExpiryDate(cardDetails.expiryDate)) {
      errors.expiryDate = 'Invalid expiry date';
    }

    // CVV validation
    if (!cardDetails.cvv.trim()) {
      errors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(cardDetails.cvv)) {
      errors.cvv = 'CVV must be 3 or 4 digits';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }
    // Format expiry date
    else if (name === 'expiryDate') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d{0,2})/, '$1/$2')
        .substr(0, 5);
    }
    // Format CVV (numbers only)
    else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substr(0, 4);
    }

    setCardDetails(prev => ({
      ...prev,
      [name]: formattedValue
    }));

    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update booking status to confirmed
      const response = await fetch(`${BASE_URL}/booking/${booking._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          status: 'confirmed',
          paymentDetails: {
            amount: booking.totalAmount,
            date: new Date().toISOString(),
            cardLast4: cardDetails.cardNumber.replace(/\s/g, '').slice(-4)
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to confirm payment');
      }

      onSuccess();
      navigate('/my-bookings');
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="payment__container">
      <div className="payment__card">
        <h3>Complete Your Payment</h3>
        <div className="payment__details">
          <p>Tour: {booking.tourId?.title || 'Tour'}</p>
          <p>Amount: ${booking.totalAmount}</p>
          <p>Guests: {booking.guestsSize}</p>
        </div>
        <form onSubmit={handleSubmit} className="payment__form">
          <div className="form__group">
            <label>Card Holder Name</label>
            <input
              type="text"
              name="cardHolderName"
              value={cardDetails.cardHolderName}
              onChange={handleInputChange}
              placeholder="John Doe"
              className={validationErrors.cardHolderName ? 'error' : ''}
            />
            {validationErrors.cardHolderName && (
              <span className="error-message">{validationErrors.cardHolderName}</span>
            )}
          </div>
          <div className="form__group">
            <label>Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={cardDetails.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              className={validationErrors.cardNumber ? 'error' : ''}
            />
            {validationErrors.cardNumber && (
              <span className="error-message">{validationErrors.cardNumber}</span>
            )}
          </div>
          <div className="form__row">
            <div className="form__group">
              <label>Expiry Date</label>
              <input
                type="text"
                name="expiryDate"
                value={cardDetails.expiryDate}
                onChange={handleInputChange}
                placeholder="MM/YY"
                maxLength="5"
                className={validationErrors.expiryDate ? 'error' : ''}
              />
              {validationErrors.expiryDate && (
                <span className="error-message">{validationErrors.expiryDate}</span>
              )}
            </div>
            <div className="form__group">
              <label>CVV</label>
              <input
                type="text"
                name="cvv"
                value={cardDetails.cvv}
                onChange={handleInputChange}
                placeholder="123"
                maxLength="4"
                className={validationErrors.cvv ? 'error' : ''}
              />
              {validationErrors.cvv && (
                <span className="error-message">{validationErrors.cvv}</span>
              )}
            </div>
          </div>
          {error && <div className="payment__error">{error}</div>}
          <div className="payment__actions">
            <button
              type="button"
              onClick={onCancel}
              className="btn secondary__btn"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={processing}
              className="btn primary__btn payment__button"
            >
              {processing ? 'Processing...' : `Pay $${booking.totalAmount}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment; 