import React from "react";
import "../css/payment.css";
import ScrollToTop from "./ScrollToTop";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import Applpaya from "../images/bigapp.png";
import Paypala from "../images/bigpay.png";
import Message from "../skeleton/Message";
import { refreshLogin, getUserDetails } from "../actions/userActions";
import { addItem, removeItem } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { savePaymentMethod } from "../actions/cartActions";
import { PayPalButton } from "react-paypal-button-v2"; // for paypal payments
import axios from "axios";
import { createOrder } from "../actions/orderActions";
import Loader from "../skeleton/Loader";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";
import { saveShippingAddress } from "../actions/cartActions";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutFormGuest from "../skeleton/CheckoutFormGuest"; //stripe checkout form
import getDateString from "../utils/getDateString";
import OverlayEditSub from "../skeleton/OverlayEditSub";
const PaymentGuest = ({ match, location, history }) => {
  var guestItem = JSON.parse(localStorage.getItem("shippingAddress"));
  // console.log(guestItem)
  const [order, setOrder] = useState();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/api/orders/${match.params.id}`)
      .then((res) => setOrder(res.data));
  }, []);
  console.log("guest-order", order);
  // load stripe
  const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  );

  const orderID = match.params.id;
  // console.log(orderID)

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;
  // console.log(orderPay)
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userDetails = useSelector((state) => state.userDetails);
  const { error: userLoginError } = userDetails;
  const [totalItems, setTotalItems] = useState(0);

  const productID = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1; // fetch from the query string
  const dispatch = useDispatch();

  // get cart, userInfo and userdetails from redux store

  //   const userLogin = useSelector((state) => state.userLogin);
  //   const { userInfo } = userLogin;

  // get user details depending on what type of login it is, dispatch with correspnding argument
  //   useEffect(() => {
  //     userInfo
  //       ? userInfo.isSocialLogin
  //         ? dispatch(getUserDetails(userInfo.id))
  //         : dispatch(getUserDetails("profile"))
  //       : dispatch(getUserDetails("profile"));
  //   }, [userInfo, dispatch]);

  // store total items to local state
  //   useEffect(() => {
  //     if (cartItems) {
  //       setTotalItems(cartItems.reduce((acc, item) => acc + item.qty, 0));
  //     }
  //   }, [cartItems]);

  // if userdetails shows error, then use refresh token to get new access tokens
  //   useEffect(() => {
  //     if (error && userInfo && !userInfo.isSocialLogin) {
  //       const user = JSON.parse(localStorage.getItem("userInfo"));
  //       user && dispatch(refreshLogin(user.email));
  //     }
  //   }, []);

  // set order to paid or delivered, and fetch updated orders
  useEffect(() => {
    if (!order || order._id !== orderID || successPay || successDeliver) {
      if (successPay) dispatch({ type: ORDER_PAY_RESET });
      if (successDeliver) dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderID));
    }
  }, []);

  // set order as delivered
  const successDeliveryHandler = () => {
    dispatch(deliverOrder(orderID));
  };

  // add item to cart
  useEffect(() => {
    if (productID) {
      dispatch(addItem(productID, qty));
    }
  }, []);

  //   useEffect(()=>{
  // 	  setspf(localStorage.getItem("sp"))
  //   })

  // remove item from cart
  const handleRemoveFromCart = (id) => {
    dispatch(removeItem(id));
  };

  // proceed to shipping address page, which is the next step in placing an order
  const handleCheckout = (e) => {
    history.push("/login?redirect=shipping");
  };

  const clearCart = () => {
    localStorage.removeItem("cartItems");

    history.push("/cart");
    window.location.reload(false);
  };
  //   cart.shippingPrice = 6;
  //   cart.taxPrice = 0.18 * cart.itemsPrice;
  //   cart.totalPrice = cart.itemsPrice + cart.taxPrice + cart.shippingPrice;

  const [isOpen, setIsOpen] = useState(false);

  const [paymentMethod1, setPaymentMethod] = useState("Credit/Debit Card"); // default option is the stripe one, but users might not understand 'stripe'
  // get cart, userInfo and userdetails from redux store
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;
  // console.log(cart)
  //   const orderCreate = useSelector((state) => state.orderCreate);
  //   const { order, loading, success } = orderCreate;
  //   console.log(orderCreate)
  const [email, setEmail] = useState(shippingAddress?.email);
  const [firstName, setFirstName] = useState(shippingAddress?.firstName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [state, setState] = useState(shippingAddress.state);
  const [phoneNo, setPhoneNo] = useState(shippingAddress.phoneNo);
  const [apt, setApt] = useState(shippingAddress.apt);

  // fetch user details from the redux store
  // useEffect(() => {
  // 	userInfo
  // 		? userInfo.isSocialLogin
  // 			? dispatch(getUserDetails(userInfo.id))
  // 			: dispatch(getUserDetails('profile'))
  // 		: dispatch(getUserDetails('profile'));
  // }, [userInfo, dispatch]);

  // useEffect(() => {
  // 	if (error && userInfo && !userInfo.isSocialLogin) {
  // 	  const user = JSON.parse(localStorage.getItem("userInfo"));
  // 	  user && dispatch(refreshLogin(user.email));
  // 	}
  //   }, [ dispatch, userInfo]);

  // add item to cart
  useEffect(() => {
    if (productID) {
      dispatch(addItem(productID, qty));
    }
  }, [dispatch, productID, qty]);

  // remove item from cart

  // 	  const [shippingPrice, setShippingPrice] = useState(0);
  //  const handleOptionChange = (value)=>{

  // 	     setShippingPrice(value);

  // 	     cart.ShippingPrice = value;

  // 	 }
  // update access token to a new ine using the refresh tokens
  // useEffect(() => {
  // 	if (error && userInfo && !userInfo.isSocialLogin) {
  // 		const user = JSON.parse(localStorage.getItem('userInfo'));
  // 		user && dispatch(refreshLogin(user.email));
  // 	}
  // }, [ dispatch, userInfo]);

  // useEffect(() => {
  // 	if (!(cartItems.length )) {
  // 		history.push('/');
  // 	}
  // }, [cartItems, history]);

  
// Truemed  implementation  start
useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://truemed-public.s3.us-west-1.amazonaws.com/truemed-ads/prequal-widget.min.js';
  script.defer = true;
  document.body.appendChild(script);

  return () => {
    document.body.removeChild(script);
  };
}, []);
//Truemed  implementation  end



  useEffect(() => {
    if (cartItems) {
      setTotalItems(cartItems.reduce((acc, item) => acc + item.qty, 0));
    }
  }, [cartItems]);

  const toggleLogin = () => {
    setIsOpen(!isOpen);
  };

  // useEffect(() => {
  // 	if (success) {
  // 		// localStorage.removeItem('cartItems');
  // 		// dispatch({ type: CART_RESET, payload: shippingAddress }); // remove items from cart once paid, but keep the shipping address in store
  // 		history.push(`/order/${order._id}`);
  // 	}
  // 	// eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [success, history]);

  // All prices, tax is randomly  assigned
  cart.itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  var sumofcans = 0;
  const cans = cartItems?.map((val) => val.numberOfCans * val.qty);
  let i = 0;
  for (i = 0; i < cans?.length; i++) {
    sumofcans += cans[i];
  }
  // cart.shippingPrice = shippingPrice;
  const [show, setShow] = useState(false);
  const [overlay, setoverlay] = useState();
  const [ShippingValueFromApi,setShippingValueFromApi] = useState(0)
  useEffect(()=>{
    // setTimeout(() => {
    //   setShippingValueFromApi(6.99)
    // }, 1000);
    setoverlay(<OverlayEditSub />);
      setShow(true);
          axios.get(`${process.env.REACT_APP_PROXY_URL}/api/shipping/get-shipping-price`).then((res)=>{
            setShippingValueFromApi(res.data.shippingPrice);
              setShow(false)
          })
  },[])
  cart.taxPrice = 0.0 * cart.itemsPrice;
  cart.totalPrice =
    cart.itemsPrice + cart.taxPrice + Number(localStorage?.getItem("sp"));
  // console.log(JSON.parse(localStorage.getItem("fetchere")))
  useEffect(() => {
    if (!cartItems.length) {
      history.push("/");
    }
  }, [cartItems, history]);

  return (
    <div class="all-product">
      {show ? overlay : <></>}
      <ScrollToTop />
      <section class="section2-products">
        <div class="container">
          <div class="prog-bar">
            <a href="/cart" className="clr-dot">
              Cart
                </a>
            <div className="arrowprogressbarr">

              <FontAwesomeIcon icon={faAngleRight} />
            </div>
            <Link
              className="clr-dot"
            
              to="/contactdetailsguest"
            >
              Contact Details
                </Link>
            <div className="arrowprogressbarr">

              <FontAwesomeIcon icon={faAngleRight} />
            </div>
            <Link className="clr-dot" to={`/shippingguest/${match.params.id}`}>
              Shipping
                </Link>
            <div className="arrowprogressbarr">

              <FontAwesomeIcon icon={faAngleRight} />
            </div>
            <Link className="clr-dot" style={{ color: "black" }} >

              Payment
                </Link>
          </div>
          <div class=" cont-act-cart col-sm-10">
            <div class="row">
              <div className="backtocart"><Link to={`/shippingguest/${match.params.id}`}>Back to Shipping </Link></div>
            </div>
            <div className="userloginguest">
              Already have an account? <Link to="/login" style={{ color: "orange", textDecoration: "underline" }}>Sign in</Link>
            </div>
          </div>
          <div>
                      <div id="truemed-prequalify" style={{fontSize:"16px",fontWeight:"bold"}} data-public-id="tm_qual_lwihwute1u"> </div>
                     </div>
          <div class="row">
            <div class="col-md-7 col-sm-12">
            <div className="shippingdetailsnew">
            {/* <div className="review-leave-ship-pay-ord">
                  Shipping Details
                </div> */}
               {/* <div class="col-sm-12 col-md-11">
                  <div className="shippingdetails-contactinfo">
                  <div className="shippingnewinfo">
              <span>{firstName}</span><br/>
              <span>{email}</span><br/>
              <span>{phoneNo}</span><br/>
              </div>
               <hr style={{marginTop:"0px",marginBottom:"0px"}}/>
            <div className="shippingnewinfo">
              <span> {address}, {city}</span><br/>
              <span>{country} ,{postalCode}</span><br/>
              </div>
                  </div>
                </div> */}
				{/* <br/> */}
				{/* <div>
				<div class="review-leave-ship-pay-ord" > Shipping Method    </div>
        <div class="col-sm-12 col-md-11">
        {sumofcans > 12 ? (
                        <div class="boundry-wall">
                          <div class="ship-method">
                            <div class="form-check">
                              <input
                                checked={true}
                                type="radio"
                                required
                                class="form-check-input"
                                id="radio2"
                                value="00.00"
                                name="optradio"
                              />
                              Free Shipping
                              <span style={{ float: "right" }}>$00.00</span>

                              <label
                                class="form-check-label"
                                for="radio1"
                              ></label>
                            </div>
                          </div>

                          <div class="type-method"></div>
                        </div>
                      ) : (
                          <div class="boundry-wall">
                            <div class="ship-method">
                              <div class="form-check">
                                <input
                                  checked={true}
                                  type="radio"
                                  required
                                  class="form-check-input"
                                  id="radio1"
                                  value="6.99"
                                  name="optradio"
                                />
                                Standard Shipping
                                <span style={{ float: "right" }}>${ShippingValueFromApi.toFixed(2)}</span>
                                <label
                                  class="form-check-label"
                                  for="radio1"
                                ></label>
                              </div>
                            </div>
                            {cartItems[0]?.number_of_cans === 12 ? (
                              <div class="type-method">
                                For orders that are less than two 12 count cases
                              </div>
                            ) : (
                                <div class="type-method"></div>
                              )}
                            {cartItems[0]?.number_of_cans === 4 ? (
                              <div class="type-method">
                                For orders that are less than four 4 count cases
                              </div>
                            ) : (
                                <div class="type-method"></div>
                              )}

                      
                          </div>
                        )}
                        </div>
				</div> */}
				<br/>
              <div
                class="review-leave-ship-pay-ord"
             
              >
                Payment Information
              </div>
              <div style={{ marginRight: "5%" }}>
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  <Elements stripe={stripePromise}>
                    {/* price in paisa */}
                    <div>
                      <CheckoutFormGuest
                        price={order?.totalPrice * 100}
                        orderID={orderID}
                      />
                    </div>
                  </Elements>
                </ListGroup.Item>
                <br/>
              </div>
          
           
            
            </div>
</div>

            <div class="col-md-5 col-sm-12">
              <div class="review-leave-ship-pay-ord">In Your Cart</div>

              <div class="order-detail-1">
                {cartItems.map((item) => (
                  <div class="row" key={item.product}>
                                      <div class="cart-sub-hr-line">
                                <hr></hr>
                              </div>
                              <div>
                                <div style={{ display: "flex" }}>
                                  <div
                                    style={{ width: "38%", textAlign: "left" }}
                                  >
                                    <img
                                      style={{ width: "98%" }}
                                      src={item?.image}
                                      alt=""
                                    />
                                  </div>

                                  <div style={{ width: "50%" }}>
                                    <h3 class="product-great">
                                      {item?.name}
                                    </h3>
                                    <div class="product-kgreat">
                                      <h6>12 FL OZ • Ketone Hydration</h6>
                                    </div>
                                    <div class="product-kgreat">
                                      <h6 >
                                        Qty: {item?.qty}
                                      </h6>
                                    </div>
                                    <div>
                                      <h3 class="product-price-pay-cart-guest">
                                        ${(item?.price * item?.qty).toFixed(2)}
                                      </h3>
                                    </div>
                                  </div>

                                </div>
                              </div>
                  </div>
                ))}
              </div>
              <div class="order-detail">
                
                <div class="sub-total-cnfm">
                  <div class="cart-sub-hr-line">
                    <hr></hr>
                  </div>
                  <div class="row contact-pricing">
                    <div style={{ display: "flex" }}>
                      <div class="" style={{ textAlign: "left", width: "50%", color: "#757575" }}>
                        {" "}
                        Subtotal
                      </div>
                      <div
                        style={{
                          textAlign: "right",
                          width: "50%",
                          color: "#757575",
                        }}
                      >
                        {" "}
                        {cartItems
                          .reduce((acc, item) => acc + item.qty * item.price, 0)
                          .toLocaleString("en-IN", {
                            maximumFractionDigits: 2,
                            style: "currency",
                            currency: "USD",
                          })}
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div
                        class=""
                        style={{
                          textAlign: "left",
                          width: "50%",
                         color: "#757575"
                        }}
                      >
                        {" "}
                        Discount{" "}
                      </div>
                      <div
                        style={{
                          textAlign: "right",
                          width: "50%",
                          color: "#757575",
                        }}
                      >
                        {/* {userInfo?.userType=="Individual"?(<>$00.00</>):(<></>)} */}

                        {localStorage.getItem("couponValue")==0?(<>$00.00</>):(<><span style={{ color: "red" }}>
                        {localStorage.getItem("couponValue")}%
                      </span></>)}
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div class="" style={{ textAlign: "left", width: "50%" , color: "#757575" }}>
                        {" "}
                        Shipping
                      </div>
                      <div
                        style={{
                          textAlign: "right",
                          width: "50%",
                          color: "#757575",
                        }}
                      >
                        {" "}
                        {/* ${localStorage.getItem("sp")} */}
                        ${(Number(localStorage.getItem("sp"))).toFixed(2)}
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div class="" style={{ textAlign: "left", width: "50%" , color: "#757575"}}>
                        
                        Tax
                      </div>
                      <div
                        style={{
                          textAlign: "right",
                          width: "50%",
                          color: "#757575",
                        }}
                      >
                        {" "}
                        ${localStorage?.getItem("ST")}
                      </div>
                    </div>
                  </div>

                  {/* <div class="amount-totl">
						<br/>
						{cartItems
                          .reduce((acc, item) => acc + item.qty * item.price, 0)
                          .toLocaleString("en-IN", {
                            maximumFractionDigits: 2,
                            style: "currency",
                            currency: "USD",
                          })}
						<br />
						<span style={{color:"red"}}>{localStorage.getItem("couponValue")}%</span>
						<br />
				        ${localStorage.getItem("sp")}
						<br />
						${localStorage?.getItem("ST")}
						
						<br/>
					</div> */}
                  <div class="cart-sub-hr-line">
                    <hr></hr>
                  </div>

                  <div style={{ display: "flex" }}>
                    <div
                      className="review-leave-ship-pay-ord"
                      style={{ width: "50%", textAlign: "left" }}
                    >
                      Total
                    </div>
                    <div
                      className="review-leave-ship-pay-ord"
                      style={{ width: "50%", textAlign: "right" }}
                    >
                      {/* ${(cart?.totalPrice+Number(localStorage?.getItem("ST"))-(cart?.totalPrice*(Number(localStorage.getItem("couponValue"))/100))).toFixed(2)} */}
                      $
                      {(
                        cart?.itemsPrice +
                        Number(localStorage?.getItem("ST")) +
                        Number(localStorage?.getItem("sp")) -
                        cart?.itemsPrice *
                        (Number(localStorage.getItem("couponValue")) / 100)
                      ).toFixed(2)}
                    </div>
                  </div>
                  {/* <div class="sales-amt">
									 We donate 1% of revenues to Nonprofits that work with veterans. Thanks for your support.
									</div> */}

                  {/* <div class="continue-btn">
									 <Link to="/Summary"><input class="product-btn-default-cnfm-CON" type="submit" value="CONTINUE" ></input></Link>
										</div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaymentGuest;