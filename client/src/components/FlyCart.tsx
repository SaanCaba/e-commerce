import {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Cart, SeeCart, Total, ValTot } from '../interface/interface'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import './styles/FlyCart.css'
import {FlyCartItem} from './FlyCartItem'
import { useDispatch } from 'react-redux'
import { addTotal, cancel, lessTotal, resetCart, valorTotal } from '../redux/actions'



function FlyCart() {
    const flyCart = useSelector((state:SeeCart) => state.seeCart)
    const cart = useSelector((state: Cart ) => state.cart)
    const dispatch = useDispatch<any>()
    const total = useSelector((state: Total) => state.total)
    // const [total, setTotal] = useState(0)
    const valTotal = useSelector((state: ValTot) => state.lessTot)


    useEffect(() => {
        // let totalPrice = cart.reduce((a,v) => a + v.price ,0)
        
        if(valTotal === true){
            return;
        };
        
        if(cart.length !== 0){
            let lastProduct = cart[cart.length - 1]
            dispatch(addTotal(Math.round(lastProduct.price)))
        }
        

    },[cart])

    const handleCancel = () => {
        dispatch(cancel())
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
                <AiOutlineShoppingCart color='white' size={28} />
                </div>
                
                {cart.map((e, i) => {
                    return(
                        <div key={i} className='m-1 cont-fly-cart-item' >
                                <FlyCartItem product={e} />
                        </div>
                    )
                })}
                <div className='d-flex justify-content-center cont-total-cart'>
                <span >Total: ${total}</span>
                </div>
            </div>
        )
        : ''
    }
    </div>

  )
}

export default FlyCart