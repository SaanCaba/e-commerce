import React,{useState} from 'react'
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import axios from 'axios'
import { useSelector } from 'react-redux';
import { Total } from '../../interface/interface';
import swal from 'sweetalert';
import '../styles/Checkout.css'
import { useDispatch } from 'react-redux';
import { cancel, setPayment } from '../../redux/actions';


function CheckoutForm() {
    const dispatch = useDispatch()
    const stripe:any = useStripe()
    const elements = useElements()
    const total = useSelector((state: Total) => state.total)
    const [loader, setLoader] = useState(false)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
          }
   const {error, paymentMethod} = await stripe?.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })
       
        if(!error){
            const {id} = paymentMethod;
          try {
            swal(`Quieres realizar esta compra por $${total}?`, '', 'warning')
            .then(async (success) => {
                if(success){
                    setLoader(true)
                    const {data} =  await axios.post('http://localhost:8080/checkout', {
                        id: id,
                        //el precio tiene que ser mayor a 0.50 USD
                        amount: 10000
                    } )
                   
                    console.log(data)
                    swal(data.message, `tu pago de ${total} fue acreditado.`, 'success')
                    elements.getElement(CardElement)?.clear();
                    setLoader(false)
                    dispatch(setPayment(false))
                    dispatch(cancel())
                }else{
                    swal('Compra Cancelada!','','error')
                }
            })

          } catch (error) {
            console.log(error)
          }
            
        }




    }

    const handleDelete = () => {
      swal({
        title: "¿Estás seguro?",
        text: "¿Quieres cancelar tu compra?",
        icon: "warning",
        dangerMode: true,
      })
      .then(willDelete => {
        if (willDelete) {
          swal("Eliminado!", "", "success");
          dispatch(setPayment(false))
        }
      });
    }

  return (
    <>
    <form onSubmit={handleSubmit} className='card card-body' >
    <button onClick={handleDelete} className='w-100 border-0 btn-delete text-light rounded' >X</button>
    <div className="container p-4">
        <div className="row">
           <div className='text-dark text-decoration-underline text-center'>
            <span className='h6'>Introduzca su tarjeta:</span>
            <img src='https://www.lendingtree.com/content/themes/lt-wp-www-theme/dist/images/nonPaid.png' className='img-fluid mt-3' />
           <CardElement className='mt-2 p-2 border rounded' />
           </div>
        </div>
    </div>
    <button className='w-75 border-0 p-1 rounded btn-compra text-light w-100' disabled={stripe ? false : true} >
        BUY
    </button>
    {
        loader && (
            <div className='d-flex justify-content-center mt-2'>
            <div className="spinner-border text-success" role="status">
            </div>
            </div>

        )
    }
    </form>
    </>
  )
}

export default CheckoutForm