import React, { useEffect, useState } from 'react'
import Product from '../components/Product'
import styles from '../styles/listProducts.module.css'
import axios from 'axios'
import Loading from './Loading'
import { RiEmotionUnhappyLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import PageNavigation from '../components/PageNavigation'

const ListProducts = ({ searchParams }) => {

      const [products, setProducts] = useState([]);
      const [totalFilteredProducts, setTotalFilteredProducts] = useState('')
      const [totalPages, setTotalPages] = useState('')
      const { param } = useParams();
      const [serverError, setServerError] = useState(null)
      const baseURL = process.env.REACT_APP_BASE_URL

      const [loading, setLoading] = useState(true);

      console.log(param)

      useEffect(() => {

            //Pozyskanie produktów
            const getProducts = async () => {

                  try {

                        const res = await axios.get(param
                              ? `${baseURL}/products/${param}?${searchParams}`
                              : `${baseURL}/products?${searchParams}`

                        )

                        setProducts(res.data.filteredProducts)
                        setTotalFilteredProducts(res.data.totalFilteredProducts)
                        setTotalPages(res.data.totalPages)


                  } catch (error) {

                        console.log(error)
                  } finally {
                        setLoading(false);
                  }


            }

            getProducts()


      }, [param, searchParams])

      const translateParam = (param) => {
            switch(param){
                  case 'All Games':return 'Wszystkie Gry';break;
                  case 'Latest Games':return 'Najnowsze Gry';break;
            }
      }

      return (

            <section className={styles.Container}>

                  <h2>{translateParam(param)}</h2>

                  {products.length > 0 &&
                        <h4 style={{ marginBottom: '2rem' }}>Wyniki: {totalFilteredProducts}</h4>
                  }
                  
                  <div>

                        {loading ? (
                              <Loading size={'6'} />
                        ) : (
                              products.length > 0 ? (

                                    <>
                                          <div className={styles.Products}>
                                                {products.map((game, index) => {
                                                      return (

                                                            <Product data={game} key={index} />

                                                      )

                                                })}
                                          </div>

                                          {totalPages > 1 &&
                                                <PageNavigation totalFilteredProducts={totalFilteredProducts} totalPages={totalPages} />
                                          }

                                    </>






                              ) : (
                                    <div className={styles.noProductsFound}>Nie znaleziono produktów <RiEmotionUnhappyLine /></div>
                              )


                        )}

                  </div>
            </section>


      )

}

export default ListProducts