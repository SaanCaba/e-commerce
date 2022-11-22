import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Cart, SeeCart } from '../interface/interface'
import { cantSeeCart, deleteCart } from '../redux/actions'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import './styles/FlyCart.css'



function FlyCart() {
    const flyCart = useSelector((state:SeeCart) => state.seeCart)
    const cart = useSelector((state: Cart ) => state.cart)
    const dispatch = useDispatch()
    const [click, setClick] = useState({
        type: false,
        id: 0
    })



    const handleRemoveItem = (id : number) : void => {
        dispatch(deleteCart(id))
        if(cart.length === 0) {
          dispatch(cantSeeCart())
        }
      }
   

    return (
    <div className='cont-main-cart'>
    {
        flyCart === true ? (
            <div className='cont-fly-cart'>
                <div className='m-1 d-flex justify-content-center'>
                <AiOutlineShoppingCart color='white' size={28} />
                </div>
                {cart.map((e, i) => {
                    return(
                        <div key={i} className='m-1' >
                            <div className='d-flex flex-column'>
                            <span className='text-light text-center'>{e.title}</span>
                           <span className='font-weight text-center price'>${e.price}</span>
                            </div>
                            <div className='d-flex justify-content-center'>
                            <img className='m-2' src={e.image} />
                            </div>
                            <br/>
                            <button className='text-light bg-danger border-0 h5 w-100' onClick={() => handleRemoveItem(e.id)} >X</button>
                            
                        </div>
                    )
                })}
            </div>
        )
        : ''
    }
    </div>

  )
}

export default FlyCart