import {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Cart, SeeCart, Total, ValTot } from '../interface/interface'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import './styles/FlyCart.css'
import {FlyCartItem} from './FlyCartItem'
import { useDispatch } from 'react-redux'
import { addTotal, cancel, lessTotal, resetCart, valorTotal } from '../redux/actions'
import swal from 'sweetalert'

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
            }
          });
    }

    return (
    <div className='cont-main-cart'>
    {
        flyCart === true ? (
            <div className='cont-fly-cart'>

                <div className='d-flex justify-content-start'>
                    <button className=' border-0 m-1 rounded bg-danger text-light' onClick={() => handleCancel()}>X</button>
                </div>

                <div className='m-1 d-flex justify-content-center'>
                <AiOutlineShoppingCart color='white' size={28} /><span className='bg-success text-light p-1 h6 rounded-circle'>{cart.length}</span>
                </div>
                
                {cart.map((e, i) => {
                    return(
                        <div key={i} className='m-1 cont-fly-cart-item' >
                                <FlyCartItem product={e} />
                        </div>
                    )
                })}
                <div className='d-flex justify-content-center cont-total-cart'>
                <span className='mr-2' >Total: </span><span className='total-price'>${total}</span>
                </div>
            </div>
        )
        : ''
    }
    </div>

  )
}

export default FlyCart