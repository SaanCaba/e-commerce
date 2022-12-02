import {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Cart, SeeCart, Total, ValTot } from '../interface/interface'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import './styles/FlyCart.css'
import {FlyCartItem} from './FlyCartItem'
import { useDispatch } from 'react-redux'
import { addTotal, cancel, lessTotal, resetCart, setPayment, valorTotal } from '../redux/actions'
import swal from 'sweetalert'
import { Link } from 'react-router-dom'

function FlyCart() {
    const flyCart = useSelector((state:SeeCart) => state.seeCart)
    const cart = useSelector((state: Cart ) => state.cart)
    const dispatch = useDispatch()
    const total = useSelector((state: Total) => state.total)
    const valTotal = useSelector((state: ValTot) => state.lessTot)


    useEffect(() => {
        
        if(valTotal === true){
            return;
        };
        if(cart.length > 0){
            // al ultimo item añadido le sumamos su precio al total.
            let lastProduct = cart[cart.length - 1]
            dispatch(addTotal(Math.round(lastProduct.price)))
        }
        

    },[cart])

    const handleCancel = () => {
        swal({
            title: "¿Estás seguro?",
            text: "¿Quieres eliminar todo lo del carrito?",
            icon: "warning",
            dangerMode: true,
          })
          .then(willDelete => {
            if (willDelete) {
              swal("Eliminado!", "¡Ahora puedes seguir con tu compra!", "success");
              dispatch(cancel())
              dispatch(setPayment(false))
            }
          });
    }

    const handlePayment = () => {
        dispatch(setPayment(true))
    }

    return (
    <div className='cont-main-cart'>
    {
        flyCart === true ? (
            <div className='cont-fly-cart'>

                <div className='d-flex justify-content-start'>
                    <button className='btn-delete border-0 m-1 rounded  text-light' onClick={() => handleCancel()}>X</button>
                </div>
                <div className='m-1 d-flex justify-content-center'>
                <AiOutlineShoppingCart color='white' size={28} /><span className='bg-success text-light p-1 h6 rounded-circle'>{cart.length}</span>
                </div>
                <div className='cont-main-cart mb-3'>
                <div className=' cont-total-price d-flex justify-content-center rounded'>
                    <div className='flex-column bg-light p-1 rounded'>
                    <div className=''>
                    <span className='text-dark'>Total:</span>   <span className='text-success'>$</span> <span className='text-dark'>{total}</span>
                    </div>
                    </div>
                </div>
                <div className='d-flex justify-content-center' >
                    <button className='w-75 border-0 p-1 rounded btn-compra text-light' onClick={handlePayment} style={{fontWeight:'bold'}} >Comprar</button>
                </div>
                </div>
                {cart.map((e, i) => {
                    return(
                        <div key={i} className='m-1 cont-fly-cart-item' >
                                <FlyCartItem product={e} />
                        </div>
                    )
                })}
                {/* <div className='cont-main-tt'>
                <div className='bg-dark cont-total-cart'>
                <div className='d-flex justify-content-center cont-total-item-cart rounded'>
                <span className='mr-2' >Total: </span><span className='total-price'>${total}</span>
                </div>
                <div className='d-flex justify-content-center cont-comprar mt-2'>
                    <span className='h5 p-2 rounded text-light text-comprar text-center ' onClick={handlePayment} >Comprar</span>
                </div>
                </div>
                </div> */}

            </div>
        )
        : ''
    }
    </div>

  )
}

export default FlyCart