import React from 'react'

import {AiOutlineShoppingCart} from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
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

const token = localStorage.getItem('token')

const history = useHistory()

const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
};

const handleLogin = () => {
    return history.push('/login')
}

  return (
    <div className='bg-success p-2 nav-cont'>
        <div className='row '>
            <div className='col' >
                <span className='nav-title text-light h6'>E-COMMERCE</span>
            </div>
            <div className='col d-flex justify-content-center'>
                {/* PRODUCTS */}
               <span className='text-light h6'>ABOUT US</span> 

            </div>
            <div className='col d-flex justify-content-center'>
                {
               token ?  <span className='text-light h6 log' onClick={handleLogout}>Logout</span>
                : <span className='text-light h6 log' onClick={handleLogin}>Log in</span>
                }
                
                {/* <AiOutlineShoppingCart size={25} color='white' /> */}
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