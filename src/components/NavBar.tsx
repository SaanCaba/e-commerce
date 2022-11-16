import React from 'react'

import {AiOutlineShoppingCart} from 'react-icons/ai'
import './styles/NavBar.css'



function NavBar() {
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
            </div>
        </div>
    </div>
  )
}

export default NavBar