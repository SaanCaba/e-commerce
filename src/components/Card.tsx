import React from 'react'
import './styles/Card.css'
import { ImPriceTags } from 'react-icons/im'

type DataProduct = {
   product: { 
    id: number
    description: string
    category: string
    image: string
    price: number
    rating: {}
    title: string
}
}

function Card({product}: DataProduct ) {
  return (
    <div className='card-cont m-3'>
        <div className='d-flex   justify-content-center '>
          <div className='d-flex flex-column'>
        <span className='h6 mt-2'>{product.title}</span>
        <span className='text-center mb-3'>{product.category}</span>
        </div>
        </div>
        <div>
        <img className='card-img' src={product.image} />
        <div className='d-flex justify-content-center'>
            <span className='h4 mt-3 '><ImPriceTags color='green' /></span>
            <span className='text-success price h4 mt-3' >${product.price}</span>
        </div>
        </div>
        
    </div>
  )
}

export default Card