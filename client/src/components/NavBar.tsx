import React from 'react'

import {AiOutlineShoppingCart} from 'react-icons/ai'
import {BiLogOut, BiLogIn} from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './styles/NavBar.css'
 

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
    <div className='bg-transparent p-2 nav-cont'>
        <div className='row '>
            <div className='col mt-1' >
                <span className='nav-title text-light h6'>E-COMMERCE <AiOutlineShoppingCart size={25} color='white' /></span>
            </div>
            <div className='col d-flex justify-content-center mt-1'>
                {/* PRODUCTS */}
               <span className='text-light h6'>Creator</span> 

            </div>
            <div className='col d-flex justify-content-center mt-1'>
                {
               token ?  <span className='text-light h6 log' onClick={handleLogout}>Logout <BiLogOut size={25} /></span>
                : ''
                }
                
               
            </div>
        </div>
        
    </div>
  )
}

export default NavBar