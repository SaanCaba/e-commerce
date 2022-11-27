import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { DataProduct, DataProductType, Total, ValTot } from "../interface/interface";
import { Cart, SeeCart } from '../interface/interface'
import { addCart, addTotal, cantSeeCart, deleteCart, lessTotal, resetCart, valorTotal } from '../redux/actions'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import './styles/FlyCart.css'
import { Dispatch } from 'redux';

interface PropsItem {
  product: DataProduct
}


export const FlyCartItem: React.FC<PropsItem>   = ( {product}: PropsItem ) : JSX.Element => {
  
  
  
    const dispatch = useDispatch()

    const [totalItem, setTotalItem] = useState(product.price)

    const [lessTitle, setLessTitle] = useState('')

      const handleMore = () => {
        if(product.qty === 3) return;
       product.qty !== undefined ? product.qty += 1 : product.qty = 1
        
        dispatch(addTotal(Math.round(product.price)))
        setTotalItem((state) => state + product.price)
    }
    
    

    const handleLess = () => {
        if(product.qty === 1) return;
        
       product.qty !== undefined ? product.qty -= 1 : product.qty = 1
        dispatch(lessTotal(Math.round(product.price)))
        setTotalItem((state) => state - product.price)

    }

    const handleClickRemove = () => {
      dispatch(deleteCart(product.id))
      if(product.qty !== undefined){
        dispatch(lessTotal(Math.round(product.price * product.qty)))
      }
    }

    useEffect(()=>{
      if(product.title.length > 29){
        setLessTitle(product.title.slice(0,28) + '...')
      }else{
        setLessTitle('')
      }
    },[])

    
    
    return (
    <div className='cont-flycart-item border-top border-success' style={{height:'240px'}} >
      <div className="d-flex flex-column ">
        <span title={product.title} className="text-light text-center">{lessTitle.length > 0 ? lessTitle : product.title}</span>
      </div>
      <div className="d-flex justify-content-center" style={{height:'80px'}}>
        <img className="m-2" src={product.image} />
      </div>
      <div className='d-flex justify-content-center'>
      <span className="font-weight text-center price">${product.price}</span>

      </div>

      <br />
      <div className='d-flex justify-content-center mb-2 cont-amount'>
      <button className='bg-transparent btn-left' onClick={handleLess}>
        <span className='h5'>-</span>
      </button>
      <span >{product.qty}</span>
      <button className='bg-transparent btn-right' onClick={handleMore}>
        <span className='h5'>+</span>
      </button>
      
      </div>
      <div className='d-flex justify-content-center'>
        <button className='btn btn-danger me-2 text-light' onClick={() => handleClickRemove() } >DELETE ITEM</button>
      </div>
      
    </div>
  );
}

