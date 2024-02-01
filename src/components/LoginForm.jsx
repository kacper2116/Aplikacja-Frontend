import React, { useState, useEffect} from 'react'
import styles from '../styles/Form.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { login } from "../redux/userActions";
import { resetError } from '../redux/userRedux';
import { MdKeyboardReturn } from "react-icons/md";
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Loading from './Loading'




const LoginForm = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const { isFetching, error } = useSelector((state) => state.user)
  const [searchParams, setSearchParams] = useSearchParams();

  const redirect = searchParams.get('redirect');

  const navigate = useNavigate()

  const handleLogin = async (e) => {

    e.preventDefault()

    try {
      await login(dispatch, { username, password })
      if(redirect)navigate(`/${redirect}`)

     
    } catch (error) {
      console.log(error)
    }

  }


  useEffect(() => {

    dispatch(resetError());
}, [dispatch]);


  return (
    <div className={styles.Container}>

      <Link to={'/'}>
        <div className={styles.Return_Button}>
          <MdKeyboardReturn size={'2rem'} />
        </div>
      </Link>

      <div className={styles.FormHeader}>
        <h1>Logowanie</h1>
        <span style={{ fontSize: '1.1rem',color:'var(--color2)' }}>Nie masz konta?
          <Link to={'/register'}>
            <span className={styles.Form_Link} >Zarejestruj się</span>
          </Link>
        </span>
      </div>

    <form onSubmit={handleLogin}>

      <div className={styles.FormField}>
       
        <input name='login' type='text' placeholder='Login' required onChange={(e) => setUsername(e.target.value)}></input>
      </div>

      <div className={styles.FormField}>
    
        <input name='password' type='password' required placeholder='Hasło' onChange={(e) => setPassword(e.target.value)}></input>
      </div>

      <div className={styles.FormField}>

        <button type='submit' disabled={isFetching}>
            {isFetching ? <Loading size={1} /> : 'Zaloguj się'}
          </button>

      </div>

      </form>

      {error && <span className={styles.Error}>{error}</span>}

     

    </div>
  )
} 

export default LoginForm