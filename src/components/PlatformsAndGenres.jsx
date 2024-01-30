import React, { useState } from 'react'
import Platforms from './Platforms'
import Genres from './Genres'
import styles from '../styles/platformsAndGenres.module.css'


const PlatformsAndGenres = () => {


    const [selectedItem, setSelectedItem] = useState('platforms')

    const selectChange = (item) => {
        setSelectedItem(item)

    }

    return (
        <div className={styles.Container}>

            <div className = {styles.Wrapper}>

                <div className = {`${styles.Platforms} ${selectedItem === 'platforms' ? styles.Active : ''}`} onClick={() => selectChange('platforms')}>
                    <h1>Platformy</h1>

                </div>

                <div className = {`${styles.Platforms} ${selectedItem === 'genres' ? styles.Active :''}`} onClick={() => selectChange('genres')}>
                    <h1>Gatunki</h1>
                </div>

            </div>

            <div style={{display:'flex', justifyContent:'center'}}>

                {selectedItem === 'platforms' ? (
                    <Platforms />
                ) : (
                    <Genres />
                )}

            </div>

        </div>
    )
}

export default PlatformsAndGenres