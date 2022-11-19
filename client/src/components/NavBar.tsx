import React from 'react'

import {AiOutlineShoppingCart} from 'react-icons/ai'
import { useSelector } from 'react-redux'
import './styles/NavBar.css'



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
 
 type Cart = {
   cart : DataProduct[]
 }

function NavBar() {

//   const cart = useSelector((state : Cart ) => state.cart)



  return (
    <div className='bg-success p-2'>
        <div className='row '>
            <div className='col' >
                <span className='nav-title'>E-COMMERCE</span>
            </div>
            <div className='col d-flex justify-content-center'>
                {/* PRODUCTS */}
                ABOUT US

            </div>
            <div className='col d-flex justify-content-center'>
                <AiOutlineShoppingCart size={25} color='white' />
                {/* <div>
                    <span className='bg-danger p-1  rounded-2'>
                        {cart.length}
                    </span>
                </div> */}
            </div>
        </div>
        
    </div>
  )
}

export default NavBar