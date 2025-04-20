// CheckoutForm.js
import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router';

// Define the CheckoutForm functional component
const CheckoutForm = () => {
  // Get access to the stripe and elements objects
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  // State to manage payment success and error messages
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [paymentError, setPaymentError] = useState(null);

  //var stripe = Stripe('pk_test_51R0ypT05kJS07DP4C49agBdS9M2yNohIuVaP1gj4YPCJOOBHFIi7brn2NsImB6Z3QQlA4xxipwMMOtQHnHhsuj8z00KHVEt3CI');
  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if Stripe and Elements are available
    if (!stripe || !elements) {
      return;
    }

    // Get the CardElement instance
    const cardElement = elements.getElement(CardElement);

    try {
      //Greate the token using the createToken method
      const { token } = await stripe.createToken(cardElement);
      await handlePayment(token.id);
    } catch (error) {
      console.error(error);
      // Set payment error state if an error occurs
      setPaymentError(error.message || 'An error occurred during payment.');
      setPaymentSuccess(null);
    }
  };

  // Function to handle the payment and get the token.id
  const handlePayment = async (tokenId) => {
    try {
      const response = await axios.post('http://localhost:5000/api/payment', {
        token: tokenId,
      });
      if (response.data.success) {
        // Set payment success state if successful
        setPaymentSuccess('Payment successful!');
        setPaymentError(null);
        navigate('/booksstore/books');
      } else {
        setPaymentError('Payment failed. Please try again.');
        setPaymentSuccess(null);
      }
    } catch (error) {
      console.error(error);
      // Set payment error state if an error occurs
      setPaymentError('An error occurred while processing your payment.');
      setPaymentSuccess(null);
    }
  };

  // Render the form with CardElement and submit button
  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <CardElement options={styles.cardElement} />
      <button 
         type="submit"
         style={stripe ? styles.submitButton : { ...styles.submitButton, ...styles.disabledButton }}
         disabled={!stripe}
      >
        Pay
      </button>
      {/* Display payment error or success message if available */}
      {paymentError && <div style={styles.error}>{paymentError}</div>}
      {paymentSuccess && <div style={styles.success}>{paymentSuccess}</div>}
    </form>
  );
};
export default CheckoutForm;


const styles = {
  form: {
    width: '400px',
    margin: 'auto',
  },
  cardElement: {
    fontSize: '16px',
    color: '#32325d',
  },
  submitButton: {
    marginTop: '16px',
    padding: '10px 15px',
    backgroundColor: '#5cb85c',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  disabledButton: {
    backgroundColor: '#b3b3b3', // Adjust the color for disabled state
    cursor: 'not-allowed',
  },
  error: {
    color: 'red',
    marginTop: '8px',
  },
  success: {
    color: 'green',
    marginTop: '8px',
  },
};