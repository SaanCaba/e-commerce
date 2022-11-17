import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getProducts } from '../redux/actions'
import Card from './Card'
import SearchBar from './SearchBar'
import useCall from './useCall'

type DataProduct = {
    id: number
    description: string
    category: string
    image: string
    price: number
    rating: {}
    title: string
}





function Home() {

    let dispatch = useDispatch()

   let response = useCall<Array<DataProduct>>('https://fakestoreapi.com/products')
   console.log(response.data) 
   if(response.data !== null){
   dispatch(getProducts(response.data))
   }
   //  setProducts(products)

  return (
    <div className=' min-vh-100'>
      {
        response.state === 'loading' || response.state === 'idle' && (
            <div>
              ...Cargando!
            </div>
        ) 
      }
      <div className='d-flex justify-content-center mt-3'>
      <SearchBar />
      </div>
      <div className='d-flex justify-content-center'>
      <div className='cards'>
        {
         response.data !== null && response.data.map((e: any, i: number)=> {
            return (
              <Card key={i} product={e} />
            )
          })
        }
        </div>
        </div>
    </div>
  )
}

export default Home