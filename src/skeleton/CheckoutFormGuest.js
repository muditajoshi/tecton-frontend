import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { payOrder } from "../actions/orderActions";
import { savePaymentMethod } from "../actions/cartActions";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"; // for stripe CC component
import Message from "../skeleton/Message";
import Overlay from "./Overlay";

const CheckoutFormGuest = ({ price, orderID }) => {
    var guestItem =JSON.parse(localStorage?.getItem("shippingAddress"));
    var tax = JSON?.parse(Number(localStorage?.getItem("ST")));
   var shippingPriceGuest = JSON?.parse(Number(localStorage?.getItem("sp")));
    // console.log(tax+"aed"+shippingPriceGuest)
// console.log(guestItem)
//   console.log(orderID)
//   console.log(price)
const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems)
  console.log(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0))

  const [error, setError] = useState(""); // from the stripe component itself
  const [overlay, setoverlay] = useState();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [clientSecret, setClientSecret] = useState(""); // from the payment intent sent from server
  const stripe = useStripe();
  const elements = useElements();
  const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;
//   const { firstName, lastName } = userInfo;
//   console.log(userInfo);
  // STEP 1: create a payment intent and getting the secret
  const getPrice = Math.round(Number((price+(Number(localStorage?.getItem("ST"))*100))))
  console.log(price)
  console.log(Math.round(price))
  useEffect(() => {
    const getClientSecret = async () => {
      const { data } = await axios.post(
        `${process.env.REACT_APP_PROXY_URL}/api/orders/stripe-payment`,
        {
          price: Math.round(price),
          email: guestItem?.email,
          orderID: orderID,
          firstName: guestItem?.firstName,
          lastName: guestItem?.lastName,
          postalCode:guestItem?.postalCode
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setClientSecret(data.clientSecret);
    };

    if (price) getClientSecret();
  }, [price]);

  // STEP 2: make the payment after filling the form properly
  const makePayment = async (e) => {
    setoverlay(<Overlay />);
    setShow(true);
    e.preventDefault();
    
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }
    if (clientSecret) {
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: guestItem?.firstName + " " + guestItem?.lastName,
            email: guestItem?.email,
            phone: guestItem?.phoneNo,
          },
        },
      });

      if (!payload.error) {
        dispatch(savePaymentMethod("Stripe"));
        // window.alert("payment successful");
        window.dataLayer.push({
          event: 'purchase',
          ecommerce: {
            transaction_id:orderID,
            value:cartItems.reduce((acc, item) => acc + item.qty * item.price, 0),
            tax:tax,
            shipping:shippingPriceGuest,
            currency:"USD",
            items:cartItems?.map((val)=>{
              let person={
                item_name: val.name,
                  item_brand: "TECTON",
                  item_category: "Drink",
                  price: val.price,
                  quantity: val.qty,
                  
              }
              return person
            })
          }
          });
        window.location = `/SummaryGuest/${orderID}`;
        localStorage.removeItem("cartItems");
        // console.log(payload)
        // dispatch(
        //   payOrder(orderID, {
        //     ...payload.paymentIntent,
        //     paymentMode: "stripe",
        //   })
        // );
         const data =await axios.put(
          `${process.env.REACT_APP_PROXY_URL}/api/orders/${orderID}/pay`,
          {
                ...payload.paymentIntent,
                paymentMode: "stripe",
              }
        );
      } else {
        setShow(false);
        setError(payload.error.message);
      }
    } else {
    }
  };

  // render a checkout form for filling details about credit or debit cards
  return (
    <div>
      {" "}
      {show ? overlay : <></>}
      <Form id="payment-form" onSubmit={makePayment}>
        {error && (
          <Message dismissible variant="danger">
            {error}
          </Message>
        )}
        <Form.Group
          style={{
            margin: "1em 0",
            fontSize: "1em",
          }}
        >
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
            id="card-element"
          />
        </Form.Group>
        <div className="d-grid">
          <Button disabled={!stripe} size="lg" type="submit">
            Pay Now
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CheckoutFormGuest;
