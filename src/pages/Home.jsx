import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import Section from '../components/Section'
import Footer from '../components/Footer'
import LogoBar from '../components/LogoBar'
import PlatformsAndGenres from '../components/PlatformsAndGenres'

const Home = () => {

  const slides = ['https://firebasestorage.googleapis.com/v0/b/aplikacja-80393.appspot.com/o/images%2Fslides%2Fwide.jpg?alt=media&token=bcefcb3c-8155-475a-b79e-02a24918a156',
  'https://firebasestorage.googleapis.com/v0/b/aplikacja-80393.appspot.com/o/images%2Fslides%2Fwide2.jpg?alt=media&token=eeb41dd7-581c-4e60-b705-49a71d3de480',
  'https://firebasestorage.googleapis.com/v0/b/aplikacja-80393.appspot.com/o/images%2Fslides%2Fwide3.jpg?alt=media&token=5ae83a6a-e2a7-4f37-8191-e49aba80516f',
  'https://firebasestorage.googleapis.com/v0/b/aplikacja-80393.appspot.com/o/images%2Fslides%2Fwide4.jpg?alt=media&token=69174e1f-80ae-4a20-b7b8-6e6a6b969275',
  'https://firebasestorage.googleapis.com/v0/b/aplikacja-80393.appspot.com/o/images%2Fslides%2Fwide5.jpg?alt=media&token=fa7c7c57-0edb-4959-8cb7-ff945db22b3d',
  
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