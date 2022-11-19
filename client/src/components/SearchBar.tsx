import React from 'react'
import { useDispatch } from 'react-redux'
import { getAgainProducts, searchProduct } from '../redux/actions'
import { FaSearch } from 'react-icons/fa'

import './styles/SearchBar.css'

function SearchBar() {

  const dispatch = useDispatch()

  const handleSearch =  ( e : React.FormEvent<HTMLInputElement>  ) => {
      if(e.currentTarget.value === ''){
        dispatch(getAgainProducts())
      }
      dispatch(searchProduct(e.currentTarget.value.toUpperCase()))
  }

  return (
    <div>
       <input type='text' className='border-0 border-bottom border-success ' onChange={handleSearch} placeholder='Buscá tu producto ideal...' /> <FaSearch /> 
    </div>
  )
}

export default SearchBar