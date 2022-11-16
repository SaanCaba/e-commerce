import React, { useEffect, useState } from 'react'
import Card from './Card'
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

   let response = useCall<Array<DataProduct>>('https://fakestoreapi.com/products')
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
      <div className='d-flex justify-content-center'>
      <div className='cards'>
        {
         response.data !== null && response.data.map((e: any)=> {
            return (
              <Card product={e} />
            )
          })
        }
        </div>
        </div>
    </div>
  )
}

export default Home