import React from 'react'
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import '../styles/Pago.css'
import { useSelector } from 'react-redux';
import { Payment } from '../../interface/interface';
import { useDispatch } from 'react-redux';
import { setPayment } from '../../redux/actions';
import swal from 'sweetalert';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51LssDUDg7ur8d1q2DqwKGhi9JNS1Y0VlqQqVHApVth7IZcd8WhxIIFACmso9LbTHcagvOu1fQIrtYYAaZccMAS0H007TbjAfyO');

export default function Pago() {

  // const options = {
  //   // passing the client secret obtained from the server
  //   clientSecret: '{{CLIENT_SECRET}}',
  // };

  const dispatch = useDispatch()
  const payment = useSelector((state: Payment ) => state.payment)

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
    <div>
      {
        payment === true ? 
        <div className='cont-main-payment'>
      <Elements stripe={stripePromise}>
    <CheckoutForm />
      </Elements>
      </div>

      : ''
      }
   
   </div>

  );
};