import React, { useEffect, useState } from 'react'
import styles from '../styles/productDetails.module.css'
import { addProduct } from '../redux/cartRedux'
import { useDispatch, useSelector } from 'react-redux'
import { BsCartCheckFill } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';

const ProductDetails = ({ product, availablePlatforms }) => {

  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()

  const [allPlatforms, setAllPlatforms] = useState(product.platforms)
  const [selectedPlatform, setSelectedPlatform] = useState('')
  const [releaseDate, setReleaseDate] = useState('')
  const [availability, setAvailability] = useState(false)

  useEffect(() => {

    setAvailability(Object.keys(availablePlatforms).length > 0 ? true : false)
    if (product.platforms) setSelectedPlatform(Object.keys(availablePlatforms)[0]);

  }, [])


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

    document.body.classList.add('overlay-active');



    dispatch(
      addProduct({ ...product, quantity, selectedPlatform })
    )

    setShowCartInfo(true)
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
    <div className={styles.Container}>
      <div className={styles.Wrapper}>
        <div className={styles.Left}>
          <div className={styles.ImgContainer}>
            <img src={product.wideImg} />
          </div>

          <div className={styles.InfoContainer}>
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

          </div>

        </div>

        <div className={styles.Right}>
          <div className={styles.Top}>
            <span className={styles.Title}>{product.title} {selectedPlatform}</span>
            <span className={styles.Price}>{product.price} &euro; </span>
          </div>
          <hr></hr>
          <div className={styles.Bottom}>
            <div className={styles.BottomContainer}>
              {availability ? (
                <button onClick={addToCart}>Dodaj do koszyka</button>
              ) : (
                <span>Product tymczasowo niedostępny</span>
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

      <div className={styles.Desc}>
        <h1>Opis</h1>

        <div className={styles.Desc_Content}>
          <h3>{product.title}</h3>
          <h4>Twórca: {product.publisher}</h4>
          <span>
            {product.details && product.details.description}

          </span>


        </div>

      </div>
      {/* <ImageGallery data={data.gallery} /> */}



      {product.platforms.includes('PC') &&
        <div className={styles.Requirements_Container}>
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
        </div>

      }


      <div className={styles.AdditionalInfo}>
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
      </div>


      {showCartInfo &&

        <AddedToCart />

      }

    </div>
  )
}

export default ProductDetails