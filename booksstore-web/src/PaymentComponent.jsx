// PaymentComponent.js
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import Header from './Header';
import Footer from './Footer';
import Cookies from 'js-cookie';

//Create a Stripe promise (stripePromise) using the loadStripe function. This promise is used to load the Stripe.js script asynchronously.
const stripePromise = loadStripe('pk_test_51R0ypT05kJS07DP4C49agBdS9M2yNohIuVaP1gj4YPCJOOBHFIi7brn2NsImB6Z3QQlA4xxipwMMOtQHnHhsuj8z00KHVEt3CI');
const PaymentComponent = () => {

  const TotalAmount = Cookies.get('totalamount');

  return (
    <div>
      <Header></Header>
      <h2 className='title'>Stripe Payment</h2>
      <br /><br />
      <div className="paymentdiv">
          <div>
              <h4>Total Amount</h4>
          </div>
          <div>
          <h4>&#8377;{TotalAmount}</h4>
          </div>
      </div>
      <br /><br />
      {/* Wrap the CheckoutForm component with the Elements component and provide the Stripe promise */}
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
      <Footer></Footer>
    </div>
  );
};
export default PaymentComponent;