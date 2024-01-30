import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import Product from '../components/Product'
import Section from '../components/Section'
import Footer from '../components/Footer'
import { slides } from '../data'
import { games } from '../data'
import LogoBar from '../components/LogoBar'
import PlatformsAndGenres from '../components/PlatformsAndGenres'

const Home = () => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Navbar />
      <Slider data={slides} />
      <Section category="Najnowsze Gry" numberOfProducts={5} />
      <Section category="Wszystkie Gry" numberOfProducts={10} />

      <PlatformsAndGenres />

      <LogoBar />
      <Footer />

      

    </div>

  )
}

export default Home