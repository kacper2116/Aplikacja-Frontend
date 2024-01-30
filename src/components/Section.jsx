import React, { useState, useRef, useEffect } from 'react'
import styles from '../styles/section.module.css'
import Product from '../components/Product'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Loading from './Loading'

import axios from 'axios'

const Section = ({ category, numberOfProducts }) => {

  const baseURL = process.env.REACT_APP_BASE_URL
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([]);

  console.log(baseURL)

  useEffect(() => {

    const getProducts = async () => {

      setLoading(true)
      try {
        const res = await axios.get(`${baseURL}/products?category=${category}`)

        setProducts(res.data)

      } catch (error) {
        console.error("Wystąpił błąd podczas pobierania produktów")
      }

      finally {
        setLoading(false)
      }
    }

    getProducts()


  }, [])


  const games = products

  const [showedProducts, setShowedProducts] = useState([]);

  useEffect(() => {
    setShowedProducts(games.slice(0, numberOfProducts));
  }, [products]);

  const [startIndex, setStartIndex] = useState(numberOfProducts);
  const productsRef = useRef(null);



  const showMoreProducts = () => {

    const moreProducts = games.slice(startIndex, startIndex + 5);
    setShowedProducts((prevState) => [...prevState, ...moreProducts]);
    setStartIndex(startIndex + 5);

  };


  const hideProducts = () => {

    if (productsRef.current) {
      const topOffset = productsRef.current.offsetTop;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }

    setShowedProducts(games.slice(0, numberOfProducts));
    setStartIndex(numberOfProducts);
  };




  return (

    <div className={styles.Container} ref={productsRef}>
      <h2 className={styles.SectionTitle}>{category}</h2>

      {loading ? (
        <Loading size={5}/>
      ):(

     

      <div className={styles.Products}>

        {showedProducts.map((game, index) => {
          return (

            <Product data={game} key={index} />


          )

        })}

      </div>

)}
      {startIndex < games.length && startIndex < 15 ? (
        <button className={`${styles.SectionButton} ${styles.SectionButton_ShowMore}`} onClick={() => showMoreProducts()}><p>Pokaż więcej</p> <IoIosArrowDown size="2rem" className={styles.SectionButtonIcon} /></button>

      ) : (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', marginTop:'3rem' }}>
          <button className={`${styles.SectionButton} ${styles.SectionButton_Hide}`} onClick={() => hideProducts()}> <IoIosArrowUp size="4rem" className={styles.SectionButtonIcon} /></button>
          <button className={`${styles.SectionButton} ${styles.SectionButton_ShowAll}`} > <Link to={`/products/${category}`}>Zobacz więcej z <span style={{ fontWeight: '900' }}>{category}</span></Link> </button>
        </div>
      )}




    </div>


  )
}

export default Section