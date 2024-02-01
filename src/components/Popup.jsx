import React, { useState } from 'react'
import styles from '../styles/popup.module.css'

const Popup = ({message, onConfirm}) => {

    const [isConfirmed, setIsConfirmed] = useState(false)

    const handleConfirm = () => {

        setIsConfirmed(true)
        onConfirm()
    }

  return (

    <>

    <div className = {styles.Overlay}>

    </div>

    <div className = {styles.Container}>
        <span className = {styles.Message}>{message}</span>
        <button onClick={handleConfirm} >OK</button>
    </div>
    </>
  )
}

export default Popup