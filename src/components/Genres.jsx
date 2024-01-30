import React, { useEffect, useState } from 'react'
import styles from '../styles/categories.module.css'

import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'


const Categories = () => {

  const baseURL = process.env.REACT_APP_BASE_URL

  const [genres, setGenres] = useState(null)
  const navigate = useNavigate();

  const handleGenreClick = (genreName) => {
    navigate(`/products/${genreName}`);
  };


  useEffect(() => {
    const getGenres = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/genres`)

        setGenres(res.data)

      } catch (error) {

      }
    }

    getGenres()

  }, [])



  return (
    <div className={styles.Container}>

      <div className={styles.Genres}>


        {genres && genres.map((genre) => (

        
          <div key={genre.name} onClick={() => handleGenreClick(genre.name)}>
            <div className={styles.Genre} key={genre.name}>
              {genre.name}
            </div>
          </div>
         
        ))}

      </div>


    </div>
  )
}

export default Categories