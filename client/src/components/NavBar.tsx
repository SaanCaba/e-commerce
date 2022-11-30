import React, {useEffect} from 'react'

import {FaUser} from 'react-icons/fa'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {BiLogOut, BiLogIn} from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { UserInfo } from '../interface/interface'
import './styles/NavBar.css'
import swal from 'sweetalert'
 

function NavBar() {

const user = useSelector((state: UserInfo) => state.user)
const getUserLoc = localStorage.getItem('userLog')
const token = localStorage.getItem('token')

const history = useHistory()

const handleLogout = () => {
  swal({
    title: "Estás seguro de cerrar sesión?",
    text: "",
    icon: "warning",
    dangerMode: true,
  })
  .then((sure)=>{
    if(sure){
      localStorage.removeItem("token");
      localStorage.removeItem('userLog')
      window.open(`https://deploy-back-production.up.railway.app/auth/logout`, "_self");
    }
  })
  
    
};

  return (
    <div className='bg-transparent p-2 nav-cont'>
        <div className='d-flex justify-content-around '>
            <div className='' >
            <span> <AiOutlineShoppingCart size={25} color='white' /></span>
              <span className='nav-title text-light h6' style={{marginLeft:'4px'}}  >E-COMMERCE</span>
            </div>
            <div className=''>
                {/* PRODUCTS */}
                <a className='text-decoration-none' href='https://new-portfolio-chi-one.vercel.app/' target='_blank'>
                <span className='text-light h6'>Creador</span> 
                </a>

            </div>
            <div className=''>
                {
               token ?  <span className='text-light h6 log' onClick={handleLogout}>Logout <BiLogOut size={25} /></span>
                : ''
                }
               
            </div>
            <div className='' style={{marginRight:'0px'}} >
              <div className='' style={{width:'max-content'}}>
                <div className='d-flex justify-content-center'>
              <span ><FaUser color='white' /></span> 
              <div style={{marginLeft:'10px'}} >
              <span  className='text-nowrap h6 text-light'>{getUserLoc?.replace(/['"]+/g, '')}</span>  
              </div>
                </div>
              </div>
            </div>
            
        </div>
        
    </div>
  )
}

export default NavBar