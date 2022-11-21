import React, { useEffect } from 'react'
import './styles/Card.css'
import { ImPriceTags } from 'react-icons/im'
import { useDispatch } from 'react-redux'
import { addCart, cantSeeCart, deleteCart, seeCart } from '../redux/actions'
import { useSelector } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast';
import { Cart, DataProduct, DataProductType } from '../interface/interface'
import FlyCart from './FlyCart'





const notify =  () => toast('Agregado al carrito');


function Card({product}: DataProductType ) {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const cart = useSelector((state : Cart ) => state.cart)
  
  const handleClick = () => {
    let findProduct = cart.find(el => el.id === product.id)
    if(!token){
      return toast.error('Necesitas tener usuario para comprar.')
    }
    if(findProduct){
      return toast.error('No podemos agregar el mismo producto al carrito')
    }
    console.log(product)
    dispatch(addCart(product))
    dispatch(seeCart())
    toast.success('Producto agregado correctamente a tu carrito!')
    
  }

  const handleRemoveItem = (id : number) : void => {
    dispatch(deleteCart(id))
    if(cart.length === 0) {
      dispatch(cantSeeCart())
    }
  }



  

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
        <div className='d-flex justify-content-center mb-4'>
          <button className='border-0 border-bottom border-success' onClick={handleClick} >Agregar</button>
          <Toaster />
          {/* {cart.length > 0 && <FlyCart />} */}
        </div>
    </div>
  )
}

export default Card