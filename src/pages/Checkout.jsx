import React, { useEffect, useState } from 'react'
import Payment from '../components/Payment'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import Loading from '../components/Loading'
import { FaCircleCheck } from "react-icons/fa6";
import { FaCircleXmark } from "react-icons/fa6";
import { MdKeyboardReturn } from "react-icons/md";
import { clearCart } from "../redux/cartRedux"
import styles from '../styles/checkout.module.css'
import { useDispatch } from 'react-redux';


const Checkout = () => {

  const [searchParams] = useSearchParams();

  const redirectStatus = searchParams.get('redirect_status');
  const baseURL = process.env.REACT_APP_BASE_URL
  const dispatch = useDispatch();

  const userToken = useSelector(state => state.user.currentUser);
  const cart = useSelector((state) => state.cart)
  const guest = useSelector((state) => state.guest.guestInfo)


  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [loading, setLoading] = useState(true)

  const [guestOrUser, setguestOrUser] = useState('')
  const urlSearchParams = new URLSearchParams(window.location.search);

  const paymentIntent = urlSearchParams.get('payment_intent');
  const clientSecret = urlSearchParams.get('payment_intent_client_secret');
  const navigate = useNavigate()

  

  useEffect(() => {

    const handleCheckout = async () => {

      try {

        if(paymentIntent){

        
        if (userToken) {

          const response = await axios.post(`${baseURL}/checkout`, {
            paymentIntentId: paymentIntent,
            products: cart.products,

          },
            {
              headers: {
                Authorization: `Bearer ${userToken}`
              }
            }

          )

          if (response.data.success) {

            setSuccess(true)
            dispatch(clearCart());
            
            setguestOrUser('user')

          }

        } else {

          const response = await axios.post('http://localhost:5000/api/checkout/guest', {
            paymentIntentId: paymentIntent,
            guestEmail: guest.email,
            products: cart.products
          })

      

          if (response.data.success) {
            setSuccess(true)
            setguestOrUser('guest')

          } else console.log("edsads")
        }
      }

      } catch (error) {

        console.error('Błąd podczas przekazywania danych do serwera:', error);
        setError(error)
        setSuccess(false)

      } finally {
        setLoading(false)
        window.history.replaceState({}, document.title, window.location.pathname);

      }
    }

    handleCheckout();

  }, [])



  console.log(guestOrUser)
  return (

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>


      <div className={styles.Overlay}></div>


      {loading ? (
        <Loading size={5} />
      ) : (

        success ? (
          <>

            {guestOrUser === 'user' && (
              <div className={styles.Checkout_Success}>

                <div>

                  <span style={{ fontSize: '4rem', margin: '2rem' }}> Płatność zakończona pomyślnie</span>

                  <Link to={'/orders'}>
                    <div className={styles.Return_Button}>
                      Przejdź do zamówień
                      <MdKeyboardReturn size={'3rem'} />
                    </div>
                  </Link>


                </div>

              </div>

            )}


            {guestOrUser === 'guest' && (
              <div className={styles.Checkout_Success}>

                <div>

                  <span style={{ fontSize: '4rem', margin: '2rem' }}> Płatność zakończona pomyślnie</span>
                  <span style={{fontSize:'1rem', marginBottom:'1rem'}}>Klucz został wysłany na adres : {guest.email}</span>
                  <Link to={'/'}>
                    <div className={styles.Return_Button}>
                      Powrót na stronę główną
                      <MdKeyboardReturn size={'3rem'} />
                    </div>
                  </Link>


                </div>

              </div>

            )}



          </>
        ) : (

          <div className={styles.Checkout_Failure}>


            <div>

              <span style={{ fontSize: '4rem', margin: '2rem' }}> Płatność zakończona niepowodzeniem</span>

              <Link to={'/'}>
                <div className={styles.Return_Button}>
                  Powrót na stronę główną
                  <MdKeyboardReturn size={'3rem'} />
                </div>
              </Link>


            </div>

          </div>
        )

      )

      }









    </div>
  )
}

export default Checkout