import React, { useState } from 'react';
import styles from '../styles/Form.module.css'
import axios from 'axios';
import { MdKeyboardReturn } from "react-icons/md";
import { Link } from 'react-router-dom'
import Loading from './Loading'


const RegisterForm = () => {

  const baseURL = process.env.REACT_APP_BASE_URL
  const [loading, setLoading] = useState(false);

  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    agreement: false,
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);


    if (Object.keys(validationErrors).length > 0) {

      return;
    }

    setLoading(true)
    setServerError('')
    try {

      const response = await axios.post(`${baseURL}/auth/register`, formData)
     

    } catch (error) {
      if (error.response) {

        const errorMessage = error.response.data.message
        setServerError(errorMessage)

      } else {
        console.error(error);
        setServerError('Błąd serwera');
      }
    } finally {
      setLoading(false)
    }
  }



  const validateForm = (data) => {
    const errors = {};

    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Hasła nie są identyczne';
    }

    return errors;

  };


  return (
    <div className={styles.Container}>

      <Link to={'/'}>
        <div className={styles.Return_Button}>
          <MdKeyboardReturn size={'2rem'} />
        </div>
      </Link>

      <div className={styles.FormHeader}>
        <h1>Stwórz konto</h1>
        <span style={{ fontSize: '1.1rem', color: 'var(--color2)' }}>Masz już konto?
          <Link to={'/login'}>
            <span className={styles.Form_Link}>Zaloguj się</span>
          </Link>
        </span>
      </div>

      <form onSubmit={handleSubmit}>

        <div className={styles.FormField}>
          <input name='email' type='email' placeholder='Email' value={formData.email} onChange={handleChange} required></input>

        </div>

        <div className={styles.FormField}>
          <input name='username' type='text' placeholder='Login' value={formData.username} onChange={handleChange} required></input>
        </div>

        <div className={styles.FormField}>
          <input name='password' type='password' placeholder='Hasło' value={formData.password} onChange={handleChange} required></input>
        </div>

        <div className={styles.FormField}>
          <input name='confirmPassword' type='password' placeholder='Powtórz hasło' value={formData.confirmPassword} onChange={handleChange} required></input>
          {errors.confirmPassword && <span className={styles.Error}>{errors.confirmPassword}</span>}

        </div>

        <div className={styles.FormField}>
          <div className={styles.DataAgreement}>
            <input name='agreement' type='checkbox' checked={formData.agreement} onChange={handleChange} required></input><label for='checbkox' >Zgadzam się na przetwarzanie danych osobowych</label>
          </div>
        </div>

        <div className={styles.FormField}>
          <button type='submit' disabled={loading}>
            {loading ? <Loading size={1} /> : 'Zarejestruj się'}
          </button>
        </div>


        {serverError && <span className={styles.Error}>{serverError}</span>}

        {success && <span className={styles.Success}>Pomyślnie zarejestrowano</span>}



      </form>



    </div>
  )
}

export default RegisterForm