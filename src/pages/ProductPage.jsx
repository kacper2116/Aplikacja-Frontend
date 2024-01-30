import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Product from '../components/Product'
import Section from '../components/Section'
import Footer from '../components/Footer'
import LogoBar from '../components/LogoBar'
import ProductDetails from '../components/ProductDetails'
import { useLocation } from 'react-router-dom'
import { useSearchParams } from "react-router-dom";
import axios from 'axios'
import Loading from '../components/Loading'

const ProductPage = () => {

  const baseURL = process.env.REACT_APP_BASE_URL

  const location = useLocation()
  const [searchParams] = useSearchParams();

  const [product, setProduct] = useState({})
  const [availablePlatforms, setAvailablePlatforms] = useState({})
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

 
  useEffect(() => {
    
    const getProduct = async () => {

      setLoading(true)
      try {
        let productId = searchParams.get('id')
        const response = await axios.get(`http://localhost:5000/api/products/find/`+productId)
      
        if(response){
          setProduct(response.data.product)
          setAvailablePlatforms(response.data.availablePlatforms)
          console.log(product)

        }


      } catch (error) {
        setError(true)
      }finally{
        setLoading(false)
      }
    }
    getProduct()
 
  },[searchParams])
  
  return (

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight:'100vh'}}>
      <Navbar />
      {loading ? (
        <Loading size={10}/>
      ):(
        <ProductDetails product={product} availablePlatforms={availablePlatforms}/>
      )}
      
      <Footer />
    </div>
  )
}

export default ProductPage