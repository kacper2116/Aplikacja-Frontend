import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import Section from '../components/Section'
import Footer from '../components/Footer'
import LogoBar from '../components/LogoBar'
import PlatformsAndGenres from '../components/PlatformsAndGenres'

const Home = () => {

  const slides = ['https://firebasestorage.googleapis.com/v0/b/aplikacja-80393.appspot.com/o/images%2Fslides%2Fslide%207.png?alt=media&token=46efdc24-bbb8-4f20-848d-2ee4c11a119f',
  'https://firebasestorage.googleapis.com/v0/b/aplikacja-80393.appspot.com/o/images%2Fslides%2Fslide%206.png?alt=media&token=aeba3e54-fe04-4d2f-866c-2712ec553927',
  'https://firebasestorage.googleapis.com/v0/b/aplikacja-80393.appspot.com/o/images%2Fslides%2Fslide%205.jpg?alt=media&token=bc450e15-5074-4855-bfdc-d7e3a63bfd52',
  'https://firebasestorage.googleapis.com/v0/b/aplikacja-80393.appspot.com/o/images%2Fslides%2Fslide%203.jpg?alt=media&token=53ffa663-8a79-4692-94bd-1354e83d00bd',
  'https://firebasestorage.googleapis.com/v0/b/aplikacja-80393.appspot.com/o/images%2Fslides%2Fslide%204.jpg?alt=media&token=07995b3f-a79b-4c45-89eb-6de16c17fd7d',
  
]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Navbar />
      <Slider data={slides} />
      <Section category="Latest Games" numberOfProducts={5} />
      <Section category="All Games" numberOfProducts={10} />

      <PlatformsAndGenres />

      <LogoBar />
      <Footer />

      

    </div>

  )
}

export default Home