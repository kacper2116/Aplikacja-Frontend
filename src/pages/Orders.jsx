import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import { jwtDecode } from "jwt-decode";
import { useSelector } from 'react-redux';
import styles from '../styles/orders.module.css'
import { useNavigate, useParams } from 'react-router-dom';



const Orders = () => {

  const [orders, setOrders] = useState([])
  const userToken = useSelector(state => state.user.currentUser);
  const [showOrderDetails, setshowOrderDetails] = useState(false);
  const { param } = useParams();


  const navigate = useNavigate()

  useEffect(() => {
    const getOrders = async () => {

      try {
        const response = await axios.get(`http://localhost:5000/api/orders/${jwtDecode(userToken).sub}`, {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        })

        if(response.data && response.data.message){
          setOrders([])
          console.log("Brak zamówień")
        }else if (response.data && response.data.orders){
          setOrders(response.data.orders)
        }

      } catch (error) {

        if(error.response){
          console.error("Błąd odpowiedzi od serwera", error.response.data)
        }else if (error.request){
          console.error("Brak odpowiedzi od serwera", error.request)
        }else console.error("Błąd serwera", error.message)

      }

    }

    getOrders()

  }, [])

  const goToOrderDetails = (orderId) => {
    navigate(`/order/${orderId}`)
  }


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      <Navbar />


      {orders.length > 0 ? 
      (

      <div className={styles.Container}>

        <div className={styles.Info_Properties}>

          <div>Id</div>
          <div>Name</div>
          <div>Status</div>
          <div>Payment method</div>
          <div>Date</div>
          <div>Value</div>
          <div>Details</div>

        </div>

        {orders && orders.map((order) => {
          return (

            <div className={styles.Order} key={order._id}>
              <div>{order._id}</div>
              <div>{order.products[0].title} {order.products[0].platform}</div>
              <div>{order.status}</div>
              <div>{order.paymentMethod}</div>
              <div>{new Date(order.createdAt).toLocaleString()}</div>
              <div>{order.orderValue} {order.currency}</div>
              <div onClick={() => goToOrderDetails(order._id)}>Show Details</div>

            </div>

          )

        })}

      </div>
      ): (
        <div style={{marginTop:'10rem'}}>
          <h1>Brak zamówień</h1>
        </div>
      )
}
      <Footer />
    </div>
  )
}

export default Orders