import React, { useEffect, useState } from 'react'
import styles from '../styles/cart.module.css'
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import { FiDelete } from "react-icons/fi";
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { increaseQuantity, decreaseQuantity, removeProduct } from '../redux/cartRedux';
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { RiDeleteBin2Line } from "react-icons/ri";
import Payment from './Payment';
import { addGuest } from "../redux/guestActions";
import axios from 'axios';
import { ToastProvider, useToasts } from 'react-toast-notifications';


const KEY = process.env.REACT_APP_STRIPE

const Cart = () => {


  const cart = useSelector((state) => state.cart)

  const dispatch = useDispatch();

  const [stripeToken, setStripeToken] = useState(null)
  const navigate = useNavigate()

  const { addToast } = useToasts();

  const user = useSelector(state => state.user.currentUser);
  const guest = useSelector(state => state.guest.guestInfo);
  const [email, setEmail] = useState('')

  const handleIncreaseQuantity = (product) => {


    const checkQuantity = async () => {
    
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${product._id}/${product.selectedPlatform}/quantity`)
        const productQuantity = response.data
       
        
        if (product.quantity + 1 <= productQuantity) {
          dispatch(increaseQuantity({ name: product.name }));
          console.log("essa")
        }

        
        else {
         
          addToast('Too many products!', {
            appearance: 'error', 
            autoDismiss: true, 
            autoDismissTimeout: 3000,
          });
        }

      } catch (error) {

      }

    }

    checkQuantity()

  };

  const handleDecreaseQuantity = (product) => {
    dispatch(decreaseQuantity({ name: product.name }));
  };

  const removeItemFromCart = (productName) => {
    dispatch(removeProduct({ name: productName }));
   
  };


  const [showPayments, setShowPayments] = useState(false)


  const handleCheckout = async (e) => {

    try {
      if (email.length > 0) {
        setShowPayments(true)
        await dispatch(addGuest(email));

      }
      else setShowPayments(false)
    } catch (error) {
      console.log(error)
    }



  }



  return (

    <div>
      {cart.products.length > 0 &&
        <div className={styles.Container}>


          <div className={styles.Wrapper}>



            <div className={styles.Cart}>
              <h2>Twój koszyk</h2>
              <hr></hr>

              <div className={styles.Info_Properties}>

                <span></span>
                <span>Nazwa</span>
                <span>Cena</span>
                <span>Ilość</span>
                <span>Suma</span>

              </div>

              <div className={styles.Products}>


                {cart.products.map(product => (


                  <div className={styles.Product} key={product.name}>

                    <RiDeleteBin2Line className={styles.RemoveFromCartButton} onClick={() => removeItemFromCart(product.name)}></RiDeleteBin2Line>

                    <img src={product.coverImg} ></img>

                    <div className={styles.Product_Name}>{product.title + ' ' + product.selectedPlatform}</div>


                    <div className={styles.Product_Price}>{product.price}</div>
                    <div className={styles.Product_Quantity}>
                      <IoMdRemoveCircleOutline size={'2rem'} className={styles.Product_Quantity_Button} onClick={() => handleDecreaseQuantity(product)} />
                      <span>{product.quantity}</span>
                      <IoMdAddCircleOutline size={'2rem'} className={styles.Product_Quantity_Button} onClick={() => handleIncreaseQuantity(product)} /></div>

                    <div className={styles.Product_TotalPrice}>{(product.price * product.quantity).toFixed(2)}</div>



                  </div>

                ))}

              </div>

            </div>

            <div className={styles.Summary}>

              <h2>Podsumowanie</h2>

              <div className={styles.Summary_Info}>
                <h2>Wartość zamówienia</h2>
                <h1>{cart.total}$</h1>
              </div>



              <div className={styles.Discount}>

                <h2>Kod rabatowy</h2>

                <div className={styles.DiscountWrapper}>
                  <input type='text' placeholder='Wpisz swój kod'></input>
                  <button className={styles.DiscountButton}>Ok</button>
                </div>

              </div>

              {!user && !guest &&

                <div className={styles.Guest_Panel}>

                  <span>Kup bez logowania</span>


                  <form onSubmit={() => handleCheckout()}>
                    <input type='email' placeholder='E-mail' required='true' onChange={(e) => setEmail(e.target.value)}></input>

                    <Link to={'/login?redirect=cart'}>
                      <span className={styles.Login_Link}>Lub zaloguj się</span>
                    </Link>
                    <button type='submit'>Płatność</button>
                  </form>
                </div>

              }

              {(user || guest) &&

                <div className={styles.Payment_Container}>
                  <h2>Metoda płatności</h2>
                  <Payment className={styles.Payment} />
                </div>

              }


            </div>

          </div>




        </div>
      }

      {cart.products <= 0 &&

        <div style={{ marginTop: '10rem' }}>

          <h1>Your cart is empty</h1>
        </div>

      }

    </div>
  )
}

export default Cart