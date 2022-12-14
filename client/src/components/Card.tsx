import React, { useEffect } from 'react'
import './styles/Card.css'
import { ImPriceTags } from 'react-icons/im'
import { useDispatch } from 'react-redux'
import { addCart, cantSeeCart, deleteCart, resetCart, seeCart } from '../redux/actions'
import { useSelector } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast';
import { Cart, DataProduct, DataProductType } from '../interface/interface'
import FlyCart from './FlyCart'





const notify =  () => toast('Agregado al carrito');


function Card({product}: DataProductType) {
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
    if(cart.length === 0){
      dispatch(resetCart(0))
    }
    dispatch(addCart(product))
    dispatch(seeCart())
    toast.success('Producto agregado correctamente a tu carrito!')
    
  }


  return (
    <div className='card-cont m-3'>
      <div className="m-4 all-cards" style={{width: '18rem'}}>
        <div>
        <img src={product.image}  className="card-img-top card-img" alt="..." />
        </div>
      <div className='d-flex   justify-content-center '>
          <div className='d-flex flex-column'>
            <div className='' style={{height: '70px'}}>
            <span className='h6 mt-2 '>{product.title}</span>
            </div>
        <span className='text-center mb-3 text-uppercase mt-3'>Categoría: {product.category}</span>
        <div className='d-flex justify-content-center'>
            <span className='text-success price h4 mt-3' >${product.price}</span>
        </div>
        <div className='d-flex justify-content-center mb-4'>
          <button className='border-0 border-bottom border-success bg-transparent btn-hover' onClick={handleClick} >Comprar</button>
        </div> 
        </div>
        
        </div>
    <Toaster  />
</div>
    </div>
  )
}

export default Card