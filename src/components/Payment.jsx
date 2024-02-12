import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import styles from '../styles/payment.module.css'


import CheckoutForm from "./CheckoutForm";
import { useSelector } from "react-redux";

const stripePromise = loadStripe("pk_test_51OFe18IwpyhMM9K7XISefWatZkYRa10kXTRN2ocEzo6s3LqsaK3ORRJgm7NfMQnW2AQx6f3kq2hziW5sDUGWMkbD00BeewkNAU");


const Payment = () => {

  const [clientSecret, setClientSecret] = useState("");
  const cart = useSelector((state) => state.cart)
  const baseURL = process.env.REACT_APP_BASE_URL

  useEffect(() => {

    const productsInfo = cart.products.map(product => ({
      productId: product._id,
      platform: product.selectedPlatform,
      quantity: product.quantity,
    }));

 


    fetch(`${baseURL}/checkout/payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ products: productsInfo }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [cart]);

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: 'rgb(243, 146, 55)',
      colorBackground: '#f5f5f5',
      colorText: 'rgb(0, 0, 0)',
      colorTextSecondary :'rgb(175, 175, 175)',
     
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className={styles.Container}>
      {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
      )}
    </div>
  );
}

export default Payment