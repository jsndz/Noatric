import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

import CheckoutForm from "./CheckoutForm";
import "../stripe.css";
import {
  selectCurrentOrder,
  selectOrderId,
} from "../features/Order/orderSlice";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51OM9MASEFcpUUD5YRpwAEe2p0aXFGLyYPEhqv0TJi7qoIFh0H1qyI32UEyc8qpsgyJpsq1szTqlRI9RPGQx44qbL00gwIENV0P"
);

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const currentOrder = useSelector(selectCurrentOrder);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:3000/create-payment-intent", {
      // Change HTTPS to HTTP here
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalAmount: currentOrder.totalAmount }),
      meta: {
        order_id: currentOrder.id,
        // this info will go to stripe => and then to our webhook
        // so we can conclude that payment was successful, even if client closes window after pay
      },
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import { useSelector } from "react-redux";
// import { selectCurrentOrder } from "../features/Order/orderSlice";
// import CheckoutForm from "./CheckoutForm";
// import "../stripe.css";
// // Make sure to call loadStripe outside of a component’s render to avoid
// // recreating the Stripe object on every render.
// // This is your test publishable API key.
// const stripePromise = loadStripe(
//   "pk_test_51OM9MASEFcpUUD5YRpwAEe2p0aXFGLyYPEhqv0TJi7qoIFh0H1qyI32UEyc8qpsgyJpsq1szTqlRI9RPGQx44qbL00gwIENV0P"
// );

// export default function StripeCheckout() {
//   const [clientSecret, setClientSecret] = useState("");
//   const currentOrder = useSelector(selectCurrentOrder);
//   console.log("id from sc", currentOrder.id);
//   useEffect(() => {
//     // Create PaymentIntent as soon as the page loads
//     fetch("https://localhost:3000/create-payment-intent", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         totalAmount: currentOrder.totalAmount,
//         orderId: currentOrder.id,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => setClientSecret(data.clientSecret));
//   }, []);

//   const appearance = {
//     theme: "stripe",
//   };
//   const options = {
//     clientSecret,
//     appearance,
//   };

//   return (
//     <div className="Stripe">
//       {clientSecret && (
//         <Elements options={options} stripe={stripePromise}>
//           <CheckoutForm id={currentOrder.id} />
//         </Elements>
//       )}
//     </div>
//   );
// }
