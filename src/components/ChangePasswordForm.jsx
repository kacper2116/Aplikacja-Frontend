import React, { useState, useEffect } from 'react'
import styles from '../styles/Form.module.css'
import {useSelector } from 'react-redux'
import { MdKeyboardReturn } from "react-icons/md";
import { Link, useNavigate} from 'react-router-dom'
import Loading from './Loading'
import axios from 'axios';
import Popup from './Popup';


const ChangePasswordForm = () => {

  const baseURL = process.env.REACT_APP_BASE_URL

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const userToken = useSelector(state => state.user.currentUser);

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState(null)

  const navigate = useNavigate()

  const [showPopup, setShowPopup] = useState(false)

  const handleConfirm = () => {
    setShowPopup(true);
    
    navigate('/')
  };


  console.log(userToken)
  const handlePasswordChange = async (e) => {

    e.preventDefault()

    if (newPassword != confirmPassword) {
      setError('Nowe hasła muszą być identyczne')
     
    } else {

      setIsLoading(true)

      try {
        const response = await axios.patch(`${baseURL}/auth/change-password`,
          {
            oldPassword,
            newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        setMessage(response.data.message)
        setShowPopup(true)
        setSuccess(true)
        setError('')

      } catch (error) {

        setError(error.response?.data?.message || 'Wystąpił błąd podczas zmiany hasła.');
        setSuccess(false)

      } finally {
        setIsLoading(false)
      }

    }

  }


  return (
    <div className={styles.Container}>

  
      <Link to={'/'}>
        <div className={styles.Return_Button}>
          <MdKeyboardReturn size={'2rem'} />
        </div>
      </Link>

      <div className={styles.FormHeader}>
        <h1>Zmiana hasła</h1>
      </div>

      <form onSubmit={handlePasswordChange}>

        <div className={styles.FormField}>
   
          <input name='password' type='password' placeholder='Aktualne hasło' required onChange={(e) => setOldPassword(e.target.value)}></input>
          
        </div>
       
        <div className={styles.FormField}>

          <input name='new-password' type='password' placeholder='Nowe hasło' required onChange={(e) => setNewPassword(e.target.value)}></input>
        </div>

        <div className={styles.FormField}>
  
          <input name='confirm-password' type='password' required placeholder='Powtórz nowe hasło' onChange={(e) => setConfirmPassword(e.target.value)}></input>
        </div>

        <div className={styles.FormField}>

          <button type='submit' disabled={isLoading}>
            {isLoading ? <Loading size={1} /> : 'Zmień hasło'}
          </button>

        </div>

      </form>
      {success && (
        <span>{message}</span>
      )}

      {error && <span className={styles.Error}>{error}</span>}

        {showPopup && 
          <Popup message={"Hasło zostało zmienione"} onConfirm={handleConfirm}/>
        }
      



    </div>
  )

}


export default ChangePasswordForm