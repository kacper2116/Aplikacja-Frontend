import React from 'react'
import styles from '../styles/product.module.css'
import { Link } from 'react-router-dom'
import { IoGameController } from "react-icons/io5";

const Product = ({ data }) => {

	
	return (

		<Link to = {`/product?id=${data._id}`}>	
		
		<div className={styles.Container}>

		
			<div className={styles.Img} style={{ backgroundImage: `url(${data.coverImg})` }} />
			<div className={styles.Info}>
				<div className={styles.Info__Title}><span>{data.title}</span></div>
				<div className={styles.Info__Price}><span>{data.price} </span><span className = {styles.Currency}> PLN</span></div>
			</div>

			
		</div>
		</Link>
	)
}

export default Product