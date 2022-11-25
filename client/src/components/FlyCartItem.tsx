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
  // amount: {
  //   amount : number
  // }
  // setAmount: React.Dispatch<React.SetStateAction<{amount: number}>>
  product: DataProduct
}


export const FlyCartItem: React.FC<PropsItem>   = ( {product}: PropsItem ) : JSX.Element => {
  
  
  
    // sacar este any
    const dispatch = useDispatch()
    // const [amount, setAmount] = useState(1)

    const [totalItem, setTotalItem] = useState(product.price)


      const handleMore = () => {
        // if(amount === 3) return;
        // setAmount((amt) => amt + 1)
        if(product.qty === 3) return;
       product.qty !== undefined ? product.qty += 1 : product.qty = 1
        
        dispatch(addTotal(Math.round(product.price)))
        setTotalItem((state) => state + product.price)
    }
    
    

    const handleLess = () => {
        // if(amount < 1){
        //  return dispatch(deleteCart(product.id))
        // }
        // setAmount((amt) => amt - 1)
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

    console.log(product)
    
    return (
    <div className='cont-flycart-item'>
      <div className="d-flex flex-column ">
        <span className="text-light text-center">{product.title}</span>
      </div>
      <div className="d-flex justify-content-center">
        <img className="m-2" src={product.image} />
      </div>
      <div className='d-flex justify-content-center'>
      <span className="font-weight text-center price">${product.price}</span>

      </div>

      <br />
      <div className='d-flex justify-content-center mb-2 cont-amount'>
      <button className='bg-transparent btn-left' onClick={handleLess}>-</button>
      <span >{product.qty}</span>
      <button className='bg-transparent btn-right' onClick={handleMore}>+</button>
      
      </div>
      <div className='d-flex justify-content-center'>
        <button className='bg-danger btn me-2 text-light' onClick={() => handleClickRemove() } >DELETE ITEM</button>
      </div>
      
    </div>
  );
}

