import React, { useState, useEffect, useContext } from 'react';
import styles from '../styles/filtr.module.css'
import RangeSlider from './RangeSlider'
import MultiSelectList from './MultiSelectList';
import axios from 'axios'

const Filtr = ({handleFilters}) => {

    
    const [platforms, setPlatforms] = useState([])
    const [genres, setGenres] = useState([])
    const [languages, setLanguages] = useState([])

    useEffect(() => {
        const getPlatforms = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/api/platforms`)
    
            setPlatforms(response.data.map(platform => platform.name))
    
          } catch (error) {
    
          }
        }

        getPlatforms()

        const getGenres = async () => {
            try {
              const response = await axios.get(`http://localhost:5000/api/genres`)
      
              setGenres(response.data.map(genre => genre.name))
      
            } catch (error) {
      
            }
          }

          getGenres()

          const getLanguages = async () => {
            try {
              const response = await axios.get(`http://localhost:5000/api/languages`)
      
              setLanguages(response.data.map(language => language.name))
      
            } catch (error) {
      
            }
          }

          getLanguages()
    
      }, [])

      console.log(platforms)


  return (

    <div className = {styles.Container}>

        <div className = {styles.FilterSection}>
            <div className = {styles.Price}>
                <h2>Price</h2>
                <RangeSlider name = {"price"}  functionSetFilter = {handleFilters} />
            </div>
        </div>

        <div className = {styles.FilterSection}>
            <div className = {styles.Category}>
           
            <MultiSelectList name = {"genres"} label="gatunek" listItems={genres} functionSetFilter = {handleFilters} />
               
            </div>
        </div>

        <div className = {styles.FilterSection}>
            <div className = {styles.Platform}>
           
            <MultiSelectList name = {"platforms"} label="platforma"  listItems={platforms} functionSetFilter = {handleFilters} />
               
            </div>
        </div>

        <div className = {styles.FilterSection}>
            <div className = {styles.Laungage}>
           
            <MultiSelectList name = {"languages"} label="język"listItems={languages} functionSetFilter = {handleFilters}/>
               
            </div>
        </div>



    </div>
  )
}

export default Filtr