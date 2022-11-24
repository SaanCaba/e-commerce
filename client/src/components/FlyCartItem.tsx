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
  
  
  
    const cart = useSelector((state: Cart ) => state.cart)
    // sacar este any
    const dispatchRet = useDispatch<any>()
    const dispatch = useDispatch()
    const retDispatch = useDispatch<any>()
    const total = useSelector((state: Total) => state.total)
    const [amount, setAmount] = useState({
        amount: 1
    })

    const [totalItem, setTotalItem] = useState(product.price)

    const handleRemoveItem = (id : number) : void => {
        dispatch(deleteCart(id))
        
        if(cart.length === 0) {
          dispatch(cantSeeCart())
          return dispatchRet(lessTotal(Math.round(total)))
        }
        if(amount.amount > 1){
          dispatch(valorTotal())
          return retDispatch(lessTotal(Math.round(totalItem)))
        }
        
        dispatch(valorTotal())
        dispatch(lessTotal(Math.round(product.price)))
      }
    useEffect(() => {
      // console.log('hola')

    })
      const handleMore = () => {
        if(amount.amount === 3) return;
        setAmount({
            ...amount,
            amount: amount.amount + 1
        })
        
        dispatch(addTotal(Math.round(product.price)))
        setTotalItem((state) => state + product.price)
    }
    
    

    const handleLess = () => {
        if(amount.amount === 1) return;
        setAmount({
            ...amount,
            amount: amount.amount - 1
        })
        dispatch(lessTotal(Math.round(product.price)))
        setTotalItem((state) => state - product.price)

    }
    
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
      <span >{amount.amount}</span>
      <button className='bg-transparent btn-right' onClick={handleMore}>+</button>
      </div>
      {/* <button
        className="text-light bg-danger border-0 h5 w-100"
        onClick={() => handleRemoveItem(product.id)}
      >
        X
      </button> */}
      
    </div>
  );
}

