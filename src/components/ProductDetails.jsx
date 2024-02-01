import React, { useEffect, useState } from 'react'
import styles from '../styles/productDetails.module.css'
import { addProduct } from '../redux/cartRedux'
import { useDispatch, useSelector } from 'react-redux'
import { BsCartCheckFill } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { FaHeartCirclePlus } from "react-icons/fa6";
import ImageGallery from './ImageGallery'
import axios from 'axios';
import { ToastProvider, useToasts } from 'react-toast-notifications';

const ProductDetails = ({ product, availablePlatforms }) => {
  

  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const baseURL = process.env.REACT_APP_BASE_URL
  const { addToast } = useToasts();
  const [allPlatforms, setAllPlatforms] = useState(product.platforms)
  const [selectedPlatform, setSelectedPlatform] = useState(Object.keys(availablePlatforms)[0])
  const [releaseDate, setReleaseDate] = useState('')
  const [availability, setAvailability] = useState(Object.keys(availablePlatforms).length > 0 ? true : false)

  const [tooMuch, setTooMuch] = useState(false)

  useEffect(() => {

    const checkQuantity = async () => {


      try {
        const response = await axios.get(`${baseURL}/products/${product._id}/${selectedPlatform}/quantity`)
        const productQuantity = response.data

        const productsInCart = cart.products.filter(p => p._id === product._id && p.selectedPlatform === selectedPlatform);

        if (productsInCart.length > 0 && productsInCart[0].quantity >= productQuantity) {
          setTooMuch(true)
          delete availablePlatforms[selectedPlatform];

        }
        else setTooMuch(false)






      } catch (error) {
        console.error("Wystąpił błąd podczas pobierania produktów")
      }
    }

    checkQuantity()

  }, [cart, selectedPlatform])




  useEffect(() => {
    if (product.details) {
      {
        const rawDate = product.details.release_date;
        const parsedDate = new Date(rawDate);

        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const formattedDate = parsedDate.toLocaleDateString('en-US', options);
        setReleaseDate(formattedDate)
      }

    } else {

    }
  }, [product.details])



  const [showCartInfo, setShowCartInfo] = useState(false)

  const handlePlatformSelect = (platform) => {

    if (availablePlatforms[platform]) setSelectedPlatform(platform);

  };


  const addToCart = () => {


    if (tooMuch) {
      addToast('Produkt już niedostępny', {
        appearance: 'error',
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
    }
    else {

      document.body.classList.add('overlay-active');



      dispatch(
        addProduct({ ...product, quantity, selectedPlatform })
      )

      setShowCartInfo(true)
    }
  }



  const AddedToCart = () => {

    const continueShopping = () => {
      setShowCartInfo(false);
      document.body.classList.remove('overlay-active');

    }

    const navigate = useNavigate();

    const checkCart = () => {


      navigate('/cart');
    }

    return (

      <div className={styles.Overlay}>
        <div className={styles.AddedToCartContainer}>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

            <BsCartCheckFill size={'7rem'} style={{ margin: '1rem 2rem' }} />
            <h2>Dodano do koszyka</h2>

          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button onClick={continueShopping}>Kontynuuj zakupy</button>
            <button onClick={checkCart}>Sprawdź koszyk</button>
          </div>
        </div>
      </div>
    )
  }



  return (





    <article className={styles.Container}>
      <div className={styles.Wrapper}>
        <div className={styles.Left}>
          <div className={styles.ImgContainer}>
            <img src={product.wideImg} />
          </div>

          <article className={styles.InfoContainer}>
            <div className={styles.Info_Platform}>

              <h3>Platformy</h3>

              <div className={styles.PlatformsContainer}>

                {product.platforms && product.platforms.map((platform, index) => {
                  const isPlatformAvailable = availablePlatforms.hasOwnProperty(platform);

                  return (
                    <div key={index}

                      className={`${styles.Platform} ${selectedPlatform === platform ? styles.Selected_Platform : ''} ${availablePlatforms[platform] ? '' : styles.Platform_Not_Available}`}

                      id={platform}
                      onClick={() => handlePlatformSelect(platform)}
                    >

                      {platform}
                    </div>
                  );
                })}



              </div>
            </div>

            <div className={styles.Info_Tags}>
              <h3>Gatunki</h3>

              <div className={styles.TagsContainer}>

                {product.tags && product.tags.map((tag) => {
                  return (
                    <Link to={`/products/${tag}`}>
                      <div className={styles.Tag}>
                        {tag}
                      </div>
                    </Link>


                  )

                })}


              </div>
            </div>

          </article>

        </div>

        <div className={styles.Right}>
          <div className={styles.Top}>
            <header>
              <span className={styles.Title}>{product.title} <span style={{ fontSize: '1.1rem', fontWeight: '700', color: 'rgb(170, 170, 170)', marginLeft: '0.5rem' }}>{selectedPlatform}</span></span>
              <span className={styles.Price}>{product.price} PLN </span>
            </header>
          </div>
          <hr></hr>
          <div className={styles.Bottom}>
            <div className={styles.BottomContainer}>
              {availability ? (
                <>
                  <button onClick={addToCart}>Dodaj do koszyka</button>

                </>
              ) : (
                <>
                  <span>Produkt tymczasowo niedostępny</span>

                </>
              )}

            </div>
          </div>

        </div>

      </div>

      <div className={styles.MoreInfo}>

        <div>Opis</div>
        <div>Zdjęcia</div>
        {product.platforms.includes('PC') &&
          <div>Wymagania systemowe</div>
        }
        <div>Dodatkowe informacje</div>

      </div>

      <section className={styles.Desc}>
        <h1>Opis</h1>

        <div className={styles.Desc_Content}>
          <h3>{product.title}</h3>
          <h4>Twórca: {product.publisher}</h4>
          <span>
            {product.details && product.details.description}

          </span>


        </div>

      </section>

      <section>
        <ImageGallery />
      </section>








      {product.platforms.includes('PC') &&
        <section className={styles.Requirements_Container}>
          <h1>Wymagania systemowe(PC)</h1>

          <div className={styles.Requirements_Content}>

            <div className={styles.MinimumReq}>
              <span>Minimalne</span>
              <ul style={{ listStyle: 'none' }}>

                {product.details && Object.entries(product.details.requirements.minimal).map(([key, value]) => (
                  <div style={{ display: 'flex', width: '100%' }}>
                    <h4>{key}: </h4><li>{value}</li>
                  </div>
                ))}

              </ul>
            </div>

            <div className={styles.RecommendedReq}>
              <span>Rekomendowane</span>

              <ul style={{ listStyle: 'none' }}>

                {product.details && Object.entries(product.details.requirements.recommended).map(([key, value]) => (
                  <div style={{ display: 'flex', width: '100%' }}>
                    <h4>{key}: </h4><li>{value}</li>
                  </div>
                ))}

              </ul>
            </div>

          </div>
        </section>

      }


      <section className={styles.AdditionalInfo}>
        <h1>Dodatkowe informacje</h1>

        <div className={styles.AdditionalInfo_Wrapper}>
          <div>
            <h3>Obsługiwane języki</h3>
            <ul>

              {product.details && product.details.languages.map((language) => {
                return (

                  <li>{language}</li>

                )

              })}


            </ul>
          </div>


          <div>
            <h3>Data wydania</h3><span>{releaseDate}</span>
            <h3>Twórca</h3><span>{product.publisher}</span>
          </div>


        </div>
      </section>


      {showCartInfo &&

        <AddedToCart />

      }

    </article>


  )
}

export default ProductDetails