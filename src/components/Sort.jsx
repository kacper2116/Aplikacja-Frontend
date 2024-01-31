import React, { useState, createContext, useEffect } from 'react'
import styles from '../styles/sort.module.css'
import Select from 'react-select'
import { useLocation, useNavigate } from 'react-router-dom';
import { useSearchParams, setSearchParams } from "react-router-dom";


const Sort = ({ handleSort }) => {


  const [isFiltered, setIsFiltered] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const navigate = useNavigate()
  const location =  useLocation()

  const options = [

    { value: 'Default', label: 'Domyślnie' },
    { value: 'Price ascending', label: 'Cena rosnąco' },
    { value: 'Price descending', label: 'Cena malejąco' },
    { value: 'Name A-Z', label: 'Nazwa A-Z' },
    { value: 'Name Z-A', label: 'Nazwa Z-A' },
    { value: 'Newest', label: 'Najnowsze' },
    { value: 'Oldest', label: 'Najstarsze' },
  ]

  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    handleSort(["sort"], [selectedOption.value])

    const currentSearchParams = searchParams
    const page = currentSearchParams.get('page')

    if(page > 1){

      currentSearchParams.set('page', 1)
      setSearchParams(currentSearchParams);   
    }

  };

  
  const resetFilters = () => {

 

    const pathname = location.pathname;
    setIsFiltered(false)
    navigate(pathname)


  }

 
  useEffect(() => {

    const params = searchParams;
    const sortParams = params.get('sort');


    if (params.has('price') || params.has('genres') || params.has('platforms') || params.has('languages') || params.has('sort')) setIsFiltered(true)
    else setIsFiltered(false)

    if (sortParams) {

    

      const translate = (sortParams) => {
        switch(JSON.parse(sortParams)[0]){
          case 'Default':return'Domyślnie';break;
          case 'Price ascending':return'Cena rosnąco';break;
          case 'Price descending':return'Cena malejąco';break;
          case 'Name A-Z':return'Nazwa A-Z';break;
          case 'Name Z-A':return'Nazwa Z-A';break;
          case 'Newest':return'Najnowsze';break;
          case 'Oldest':return'Najstarsze';break;
        }
      }
      

      setSelectedOption({ value: JSON.parse(sortParams), label: translate(sortParams) })

    }else {
      setSelectedOption({})
    }

  }, [searchParams]);

  return (


    <div className={styles.Container}>
      <label htmlFor="sort">Sortuj</label>
      <Select className={styles.Select} value={selectedOption} name='sort' id='sort' options={options} onChange={handleChange} />

      {isFiltered &&
        <button className={styles.ResetFilters} onClick={() => resetFilters()}>Resetuj filtry</button>
      }
    </div>



  )


}

export default Sort