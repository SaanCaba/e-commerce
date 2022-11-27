import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51LssDUDg7ur8d1q2DqwKGhi9JNS1Y0VlqQqVHApVth7IZcd8WhxIIFACmso9LbTHcagvOu1fQIrtYYAaZccMAS0H007TbjAfyO');

export default function App() {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{CLIENT_SECRET}}',
  };

  return (
   <div>

   </div>
  );
};