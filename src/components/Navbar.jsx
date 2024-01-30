import React, { useEffect, useRef, useState } from 'react'
import { MdClear } from 'react-icons/md'
import { AiOutlineSearch } from 'react-icons/ai'
import styles from '../styles/navbar.module.css'
import { Badge } from "@material-ui/core";
import { IoMdCart } from "react-icons/io";
import { useSelector } from 'react-redux'
import { FaUser, FaSignOutAlt, FaLock } from 'react-icons/fa';
import Logo from '../img/Logo.png';
import Loading from './Loading'
import { TbBrandShopee } from "react-icons/tb";
import { useSearchParams, setSearchParams } from "react-router-dom";

import { Link, Navigate, useNavigate, useNavigation } from 'react-router-dom'
import { logout } from '../redux/userActions'
import { useDispatch } from 'react-redux';
import { jwtDecode } from "jwt-decode";

import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL



const Navbar = () => {

  const baseURL = process.env.REACT_APP_BASE_URL

  const [searchParams, setSearchParams] = useSearchParams()

  const quantity = useSelector(state => state.cart.quantity)
  const user = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);

  const displayUserPanel = () => {
    setIsOpen(!isOpen);
  };

  const handleOutsideClick = (event) => {
    if (
      panelRef.current &&
      !panelRef.current.contains(event.target)

    ) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);


  //Wyszukiwarka

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false)

  const maxResults = 5;
  const displayedResults = searchResults.slice(0, maxResults);

  const resultsContainerRef = useRef(null);


  //Monitorowanie kliknięcia poza wyszukiwarką w celu schowania wyników

  const handleClickOutside = (event) => {

    if (resultsContainerRef.current && !resultsContainerRef.current.contains(event.target)) {
      setSearchResultsVisible(false);

    }
  };

  useEffect(() => {

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  /////////////////////////////////////////////////////////////////////

  const navigate = useNavigate()


  useEffect(() => {


    const handleSearch = async () => {

      try {

        setLoading(true)

        if (searchTerm != '' && searchTerm != undefined) {
          const response = await axios.get(`${baseURL}/products/search?query=${searchTerm}`);
          setSearchResults(response.data);
          setNoResults(false)

        } else {

          setSearchResults([]);
        }

      } catch (error) {

        setNoResults(true)

      } finally {
        setLoading(false)

      }


    };

    handleSearch()


  }, [searchTerm])


  const handleResultClick = (productId) => {

    navigate(`/product?id=${productId}`)
    setSearchResultsVisible(false)

  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {

      seeMore();
    }
  };

  const seeMore = () => {


    searchParams.set("text", { searchTerm })

    navigate({
      pathname: '/products',
      search: `?text=${searchTerm}`
    });


    setSearchResultsVisible(false)

  }

  return (


    <div className={styles.Container}>


      <div className={styles.Left}>

        <Link to={'/'}>
          <img className={styles.Logo} src={Logo} />
        </Link>


        <div className={styles.SearchContainer} ref={resultsContainerRef}>


          <div className={styles.SearchBar}>
            <AiOutlineSearch style={{ fontSize: "2rem" }} />
            <input className={styles.SearchInput} placeholder='Search' value={searchTerm === undefined ? '' : searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onFocus={() => setSearchResultsVisible(true)} onKeyPress={handleKeyPress} />
            <MdClear className={styles.ClearButton} style={{ fontSize: "2rem" }} onClick={() => { setSearchTerm(undefined) }} />
          </div>


          {searchResultsVisible && (searchTerm != '' && searchTerm != undefined) && (

            <div>


              <>

                <div className={styles.SearchResults}>

                  {loading ? (
                    <div className = {styles.Loading}>
                      <Loading size={3} />
                    </div>
                  ) : (

                    <>

                      {noResults ? (
                        <div className={styles.NoResults}>Brak wyników</div>
                      ) : (
                        <>
                          {displayedResults.map((result) => (
                            <div key={result._id} onClick={() => handleResultClick(result._id)}>
                              <img src={result.coverImg} alt={result.title} />
                              <h3>{result.title}</h3>
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: '1rem', fontWeight: '700', textAlign: 'center' }}>{result.price}</span>
                                <span style={{ fontSize: '0.8rem', fontWeight: '600', textAlign: 'center' }}>PLN</span>
                              </div>
                            </div>
                          ))}
                          {searchResults.length > maxResults && (
                            <div className={styles.SearchResultsSummary}>
                              <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{searchResults.length} Wyników</span>
                              <button className={styles.SeeMoreButton} onClick={() => seeMore()} >Zobacz więcej</button>
                            </div>
                          )}
                        </>
                      )}

                    </>
                  )}

                </div>

              </>

            </div>

          )}

        </div>

      </div>



      <div className={styles.Right}>

        {!user &&
          <Link to={'/login'}>
            <span className={styles.Login}>Zaloguj</span>
          </Link>
        }

        {!user &&
          <Link to={'/register'}>
            <span className={styles.Register}>Zarejestruj</span>
          </Link>
        }



        {user &&

          <div className={styles.UserPanel} ref={panelRef} onClick={displayUserPanel}>

            <div>
              <FaUser /><span>{jwtDecode(user).username}</span>
            </div>

            {isOpen && (

              <div className={styles.User_dropdown_menu}>

                <div>
                  <FaSignOutAlt /> <span onClick={() => dispatch(logout())}>Logout</span>
                </div>

                <div>
                  <FaLock /> <span>Change Password</span>
                </div>

                <div>
                  <TbBrandShopee /><span onClick={() => navigate('/orders')}>My orders</span>
                </div>

              </div>
            )

            }

          </div>

        }

        <Link to='/cart'>
          <Badge badgeContent={quantity} color="primary" className={styles.Cart_Badge}>
            <IoMdCart color="action" size='2rem' />
          </Badge>
        </Link>

      </div>

    </div>
  )
}

export default Navbar