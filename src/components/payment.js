import React from "react";
import "../css/payment.css";
import ScrollToTop from "./ScrollToTop";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
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
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "../skeleton/Loader";
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

import CheckoutForm from "../skeleton/CheckoutForm"; //stripe checkout form
import getDateString from "../utils/getDateString";
import useDocumentTitle from "./useDocumentTitle";
import OverlayEditSub from "../skeleton/OverlayEditSub";

const Payment = ({ match, location, history }) => {
  useDocumentTitle("Payment - Tecton");
  // load stripe
  const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  );

  const orderID = match.params.id;
  // console.log(orderID)
  const[order,setOrder] = useState("")
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_PROXY_URL}/api/orders/${orderID}`, config).then((res)=>{setOrder(res?.data)})
  },[])

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

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const config = userInfo.isSocialLogin
			? {
					headers: {
						Authorization: `SocialLogin ${userInfo.id}`,
					},
			  }
			: {
					headers: {
						Authorization: `Bearer ${userInfo.accessToken}`,
					},
			  };

  // get user details depending on what type of login it is, dispatch with correspnding argument
  useEffect(() => {
    userInfo
      ? userInfo.isSocialLogin
        ? dispatch(getUserDetails(userInfo.id))
        : dispatch(getUserDetails("profile"))
      : dispatch(getUserDetails("profile"));
  }, [userInfo, dispatch]);

  // store total items to local state
  //   useEffect(() => {
  //     if (cartData) {
  //       setTotalItems(cartData.reduce((acc, item) => acc + item.qty, 0));
  //     }
  //   }, [cartData]);

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
    localStorage.removeItem("cartData");

    history.push("/cart");
    window.location.reload(false);
  };
  //   cart.shippingPrice = 6;
  //   cart.taxPrice = 0.18 * cart.itemsPrice;
  //   cart.totalPrice = cart.itemsPrice + cart.taxPrice + cart.shippingPrice;

  const [isOpen, setIsOpen] = useState(false);

  const [paymentMethod1, setPaymentMethod] = useState("Credit/Debit Card"); // default option is the stripe one, but users might not understand 'stripe'
  const [cartData, setCartData] = useState();
  const [subsOrders, setSubsOrders] = useState();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/api/cart/user/${userInfo.id}`)
      .then((res) => setCartData(res?.data?.cart[0]?.cartItems));
  }, []);
  var sumofcans = 0;
  const cans = cartData?.map((val) => val.numberOfCans * val.qty);
  let i = 0;
  for (i = 0; i < cans?.length; i++) {
    sumofcans += cans[i];
  }
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
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/api/cart/user/${userInfo?.id}`)
      .then((res) =>
        setSubsOrders(
          res.data.cart[0].cartItems.filter((val) => val?.subscription === true)
        )
      );
  }, []);

  // get cart, userInfo and userdetails from redux store
  //   const cart = useSelector((state) => state.cart);
  //   const { cartItems, shippingAddress, paymentMethod } = cart;
  // console.log(cart)
  // const orderCreate = useSelector((state) => state.orderCreate);
  // const { order, loading, success } = orderCreate;
  //   console.log(orderCreate)
  //   console.log(order)
  //   console.log(order?.orderItems.filter((val)=>val.subscription===true).reduce((acc,item)=>acc+item.price,0))
  //   console.log(order?.orderItems.filter((val)=>val.subscription===false).reduce((acc,item)=>acc+item.itemTotalPrice,0))
  let normprice = order?.orderItems
    ?.filter((val) => val.subscription === false)
    ?.reduce((acc, item) => acc + item.price * item.qty, 0);
  let subsprice = order?.orderItems
    ?.filter((val) => val.subscription === true)
    ?.reduce((acc, item) => acc + item.price, 0);
  console.log("complete-order-on-payment.js", order);
  console.log("normal-order-price-on-payment.js", normprice);

  // console.log(subsprice)
  // console.log(normprice+order?.shippingPrice)


  // let newprice = normprice + order?.shippingPrice;

  // if (newprice == 6.99) {
  //   newprice = 0;
  // }

  // console.log(newprice);

  let newprice = normprice;

  console.log(newprice);


  // const [address, setAddress] = useState(shippingAddress.address);
  // const [city, setCity] = useState(shippingAddress.city);
  // const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  // const [country, setCountry] = useState(shippingAddress.country);
  // const [state, setState] = useState(shippingAddress.state);
  // const [phoneNo, setPhoneNo] = useState(shippingAddress.phoneNo);
  // const [apt, setApt] = useState(shippingAddress.apt);

  // fetch user details from the redux store
  useEffect(() => {
    userInfo
      ? userInfo.isSocialLogin
        ? dispatch(getUserDetails(userInfo.id))
        : dispatch(getUserDetails("profile"))
      : dispatch(getUserDetails("profile"));
  }, [userInfo, dispatch]);

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

//   useEffect(() => {
//     if (!cartData?.length) {
//       history.push("/");
//     }
//   }, [cartData, history]);

  useEffect(() => {
    if (cartData) {
      setTotalItems(cartData.reduce((acc, item) => acc + item.qty, 0));
    }
  }, [cartData]);

  const toggleLogin = () => {
    setIsOpen(!isOpen);
  };


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

  // useEffect(() => {
  //   if (success) {
  //     // localStorage.removeItem('cartData');
  //     // dispatch({ type: CART_RESET, payload: shippingAddress }); // remove items from cart once paid, but keep the shipping address in store
  //     history.push(`/order/${order._id}`);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [success, history]);

  // All prices, tax is randomly  assigned
  // cart.itemsPrice = cartData.reduce(
  // 	(acc, item) => acc + item.price * item.qty,
  // 	0
  // );

  var itemsPrice = cartData?.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  console.log("cart-price-before-discount", itemsPrice);
  // cart.shippingPrice = shippingPrice;

  // cart.taxPrice = 0.0 * cart.itemsPrice;
  // cart.totalPrice = cart.itemsPrice + cart.taxPrice + Number(localStorage?.getItem("sp"))
  // console.log(JSON.parse(localStorage.getItem("fetchere")))
  var taxPrice = 0.0 * itemsPrice;
  var totalPrice =
    itemsPrice +
    taxPrice +
    Number(localStorage?.getItem("sp")) +
    Number(localStorage?.getItem("STSubs")) +
    Number(localStorage?.getItem("STNormal"));
  if (userInfo?.userType == "Individual") {
    if (userInfo?.userMetaData?.firstPurchase == true) {
      var itemsPrice =
        itemsPrice -
        ((userInfo?.userMetaData?.discountPercent +
          Number(localStorage.getItem("couponValue"))) /
          100) *
          itemsPrice;
    }
    if (userInfo?.userMetaData?.firstPurchase == false) {
      var itemsPrice =
        itemsPrice -
        itemsPrice * (Number(localStorage.getItem("couponValue")) / 100);
    }
    if (!userInfo.userMetaData) {
      var itemsPrice =
        itemsPrice -
        itemsPrice * (Number(localStorage.getItem("couponValue")) / 100);
    }
  }
  if (userInfo?.userType == "Veteran") {
    var itemsPrice =
      itemsPrice -
      (userInfo?.userMetaData?.veteran?.discountPercentOrder / 100) *
        itemsPrice;
  }
  if (userInfo?.userType == "Employee") {
    var itemsPrice =
      itemsPrice -
      (userInfo?.userMetaData?.employee?.discountPercentOrder / 100) *
        itemsPrice;
  }
  if (userInfo?.userType == "Ambassador") {
    var itemsPrice =
      itemsPrice -
      (userInfo?.ambassadorMetaData?.discountPercent / 100) * itemsPrice;
  }
  if (userInfo?.userType == "Test") {
    var itemsPrice =
      itemsPrice -
      (userInfo?.userMetaData?.test?.discountPercentOrder / 100) * itemsPrice;
  }
  // if (userInfo?.userType == "Individual") {
  // 	var itemsPrice = itemsPrice
  // }
  if (userInfo?.userType == "") {
    var itemsPrice = itemsPrice;
  }

  // else {
  // 	var totalPrice = totalPrice
  // }
  var totalPrice =
    itemsPrice +
    taxPrice +
    Number(localStorage?.getItem("sp")) +
    Number(localStorage?.getItem("STSubs")) +
    Number(localStorage?.getItem("STNormal"));
  console.log("user_type", userInfo?.userType);
  console.log("cart-price-after-discount", itemsPrice);
  console.log("total-price/final-price", totalPrice);

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
            <Link className="clr-dot"  to="/contactdetails">
              Contact Details
            </Link>
            <div className="arrowprogressbarr">
              <FontAwesomeIcon icon={faAngleRight} />
            </div>
            <Link className="clr-dot" to={`/shipping/${match.params.id}`}>
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
              <div class="row">
			    <div className="backtocart"> <Link to={`/shipping/${match.params.id}`}>Back to Shipping</Link></div>
              </div>
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
              <span>{userInfo?.firstName}</span><br/>
              <span>{userInfo?.email}</span><br/>
              <span>{userInfo?.phoneNo || userInfo?.phone}</span><br/>
              </div>
               <hr style={{marginTop:"0px",marginBottom:"0px"}}/>
            <div className="shippingnewinfo">
              <span> {userInfo?.shippingAddress?.address1}, {userInfo?.shippingAddress?.city}</span><br/>
              <span>United States ,{userInfo?.shippingAddress?.zip}</span><br/>
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
                        {cartData?.number_of_cans === 12 ? (
                          <div class="type-method">
                            For orders that are less than two 12 count cases
                          </div>
                        ) : (
                          <div class="type-method"></div>
                        )}
                        {cartData?.number_of_cans === 4 ? (
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
				
                {/* <div
                  class="review-leave-ship-pay-ord">Payment Information</div> */}
                  <div>
                  <ListGroup.Item>
                    {loadingPay && <Loader />}
                    <Elements stripe={stripePromise}>
                     
                      <div>
                        <CheckoutForm
                          price={newprice * 100}
                          orderID={orderID}
                        />
                      </div>
                    </Elements>
                  </ListGroup.Item>
                </div>
             
              </div>
            </div>

            <div class="col-md-5 col-sm-12">
              <div class="review-leave-ship-pay-ord">In Your Cart</div>

              <div class="order-detail-1">
              {!cartData?.length ? (
                      <Message>
                        Your Cart is empty.{" "}
                        <Link to="/" style={{ textDecoration: "underline" }}>
                          Go Back.
                        </Link>{" "}
                      </Message>
                    ) : (
               <>
               {cartData?.map((item) => (
                  <div class="row" key={item.product}>
                    <div class="cart-sub-hr-line">
                      <hr></hr>
                    </div>
                    <div style={{ display: "flex" }}>
                                <div
                                  style={{ width: "46%", textAlign: "left" }}
                                >
                                  <img
                                    style={{ width: "98%" }}
                                    src={item?.image}
                                    alt=""
                                  />
                                </div>

                                <div style={{ }}>
                                  <div >
                                    <h3 class="product-great">
                                      {item?.name}
                                    </h3>

                                    <div class="product-kgreat">
                                      <h6>
                                        12 FL OZ • Ketone Hydration
                                      </h6>

                                    </div>
                                    <div class="product-kgreat">
                                      <h6 >
                                        {item.subscription === true ? (<>Delivery Every {item?.frequency}</>) : (<>One time purchase</>)}
                                      </h6>

                                    </div>
                                    <div class="product-kgreat">
                                      <h6 >
                                        Qty: {item?.qty}
                                      </h6>

                                    </div>
                                  </div>

                                  <div >
                                    <h3 class="product-price-pay-cart-ship_payment_page">
                                      ${(item?.price * item?.qty).toFixed(2)}
                                    </h3>
                                  </div>
                                </div>
                               
                              </div>
                            </div>
                
                ))}
               </>
               )}
              </div>
              <div class="order-detail">
               
                <div class="sub-total-cnfm">
                  <div class="cart-sub-hr-line">
                    <hr></hr>
                  </div>
                  <div class="row contact-pricing">
                    <div style={{ display: "flex" }}>
                      <div
                        class=""
                        style={{
                          textAlign: "left",
                          width: "50%",
                          color: "#757575",
                         
                        }}
                      >
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
                        {cartData
                          ?.reduce(
                            (acc, item) => acc + item.qty * item.price,
                            0
                          )
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
                         
                          color: "#757575",
                         
                        }}
                      >
                        {" "}
                        {subsOrders?.length > 0 ? (
                          <>
                            <b style={{ color: "red" }}>*</b>Discount
                          </>
                        ) : (
                          <>Discount</>
                        )}{" "}
                      </div>

                      <div
                        style={{
                          textAlign: "right",
                          width: "51%",
                          color: "#757575",
                         
                        }}
                      >
                        {userInfo?.userType == "Individual" &&
                        userInfo?.userMetaData?.firstPurchase == false &&
                        !Number(localStorage.getItem("couponValue")) ? (
                          <>$00.00</>
                        ) : (
                          <></>
                        )}
                        {userInfo?.userType == "Individual" &&
                        userInfo?.userMetaData?.firstPurchase == false &&
                        Number(localStorage.getItem("couponValue")) ? (
                          <>
                            <span style={{ color: "red" }}>
                              {Number(localStorage.getItem("couponValue"))}%
                            </span>
                          </>
                        ) : (
                          <></>
                        )}
                        {userInfo?.userType == "Veteran" ? (
                          <span style={{ color: "red" }}>
                            <b style={{ color: "red" }}>**</b>
                            {
                              userInfo?.userMetaData?.veteran
                                ?.discountPercentOrder
                            }
                            %
                          </span>
                        ) : (
                          <></>
                        )}
                        {userInfo?.userType == "Employee" ? (
                          <span style={{ color: "red" }}>
                            <b style={{ color: "red" }}>**</b>
                            {
                              userInfo?.userMetaData?.employee
                                ?.discountPercentOrder
                            }
                            %
                          </span>
                        ) : (
                          <></>
                        )}
                        {userInfo?.userType == "Individual" &&
                        userInfo?.userMetaData?.firstPurchase == true &&
                        !Number(localStorage.getItem("couponValue")) ? (
                          <span style={{ color: "red" }}>
                            <b style={{ color: "red" }}>**</b>
                            {userInfo?.userMetaData?.discountPercent}%
                          </span>
                        ) : (
                          <></>
                        )}
                        {userInfo?.userType == "Individual" &&
                        userInfo?.userMetaData?.firstPurchase == true &&
                        Number(localStorage.getItem("couponValue")) ? (
                          <span style={{ color: "red" }}>
                            <b style={{ color: "red" }}>**</b>
                            {userInfo?.userMetaData?.discountPercent +
                              Number(localStorage.getItem("couponValue"))}
                            %
                          </span>
                        ) : (
                          <></>
                        )}
                        {userInfo?.userType == "Ambassador" ? (
                          <span style={{ color: "red" }}>
                            <b style={{ color: "red" }}>**</b>
                            {userInfo?.ambassadorMetaData?.discountPercent}%
                          </span>
                        ) : (
                          <></>
                        )}
                        {userInfo?.userType == "Test" ? (
                          <span style={{ color: "red" }}>
                            <b style={{ color: "red" }}>**</b>
                            {userInfo?.userMetaData?.test?.discountPercentOrder}
                            %
                          </span>
                        ) : (
                          <></>
                        )}{" "}
                        {userInfo?.userType == "" ? <>$00.00</> : <></>}
                        {userInfo?.userType == "Individual" &&
                        !userInfo?.userMetaData &&
                        !Number(localStorage.getItem("couponValue")) ? (
                          <>$00.00</>
                        ) : (
                          <></>
                        )}
                        {userInfo?.userType == "Individual" &&
                        !userInfo?.userMetaData &&
                        Number(localStorage.getItem("couponValue")) ? (
                          <>
                            <span style={{ color: "red" }}>
                              {Number(localStorage.getItem("couponValue"))}%
                            </span>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div
                        class=""
                        style={{
                          textAlign: "left",
                          width: "50%",
                          color: "#757575",
                         
                        }}
                      >
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
                        ${(Number(localStorage.getItem("sp"))).toFixed(2)}
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div
                        class=""
                        style={{
                          textAlign: "left",
                          width: "50%",
                          color: "#757575",
                         
                        }}
                      >
                        {" "}
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
                        $
                        {(
                          Number(localStorage?.getItem("STNormal")) +
                          Number(localStorage?.getItem("STSubs"))
                        ).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* <div class="order-total">
										<br />
										Subtotal
										<br />
										{subsOrders?.length > 0 ? (< > <b style={{ color: "red" }}>*</b>Discount</>) : (<>Discount</>)}
										<br />
										Shipping
										<br />
										Tax
									</div> */}
                  {/* <div class="amount-totl">
										<br />
										{cartData?.reduce((acc, item) => acc + item.qty * item.price, 0)
											.toLocaleString("en-IN", {
												maximumFractionDigits: 2,
												style: "currency",
												currency: "USD",
											})}
										<br />
										{userInfo?.userType == "Individual" ? (<>$00.00</>) : (<></>)}                      {userInfo?.userType == "Individual" && userInfo?.userMetaData?.firstPurchase == false ? (<>$00.00</>) : (<></>)}                      {userInfo?.userType == "Veteran" ? (<span style={{ color: "red" }}><b style={{ color: "red" }}>**</b>{userInfo?.userMetaData?.veteran?.discountPercentOrder}%</span>) : (<></>)}                      {userInfo?.userType == "Employee" ? (<span style={{ color: "red" }}><b style={{ color: "red" }}>**</b>{userInfo?.userMetaData?.employee?.discountPercentOrder}%</span>) : (<></>)}                      {userInfo?.userType == "Individual" && userInfo?.userMetaData?.firstPurchase == true ? (<span style={{ color: "red" }}><b style={{ color: "red" }}>**</b>{userInfo?.userMetaData?.discountPercent}%</span>) : (<></>)}                      {userInfo?.userType == "Ambassador" ? (<span style={{ color: "red" }}><b style={{ color: "red" }}>**</b>{userInfo?.ambassadorMetaData?.discountPercent}%</span>) : (<></>)}                      {userInfo?.userType == "Test" ? (<span style={{ color: "red" }}><b style={{ color: "red" }}>**</b>{userInfo?.userMetaData?.test?.discountPercentOrder}%</span>) : (<></>)}                      {userInfo?.userType == "" ? (<>$00.00</>) : (<></>)}
										<br />
										${localStorage.getItem("sp")}
										<br />
										
										${(Number(localStorage?.getItem("STNormal")) + Number(localStorage?.getItem("STSubs"))).toFixed(2)}

										<br />
									</div> */}
                  <div class="cart-sub-hr-line">
                    <hr></hr>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div
                      class="review-leave-ship-pay-ord"
                      style={{ width: "50%", textAlign: "left" }}
                    >
                      Total
                    </div>
                    <div
                      class="review-leave-ship-pay-ord"
                      style={{ width: "50%", textAlign: "right" }}
                    >
                      ${totalPrice.toFixed(2)}
                    </div>
                  </div>
                  <div class="sales-amt-shipping" style={{ fontSize: "16px" }}>
                    {subsOrders?.length > 0 ? (
                      <>
                        {" "}
                        
                          <b style={{ color: "red" }}>*</b>Relevant discount
                          will be applied from the second shipment onwards.
                        
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div class="sales-amt-shipping" style={{ fontSize: "17px" }}>
                    {userInfo?.userType == "Individual" &&
                    userInfo?.userMetaData?.firstPurchase == false ? (
                      <></>
                    ) : (
                      <></>
                    )}{" "}
                    {userInfo?.userType == "Veteran" ? (
                      <span style={{ color: "red" }}>
                        <b style={{ color: "red" }}>**</b>Military/Military
                        Vets/First Responders discount
                      </span>
                    ) : (
                      <></>
                    )}{" "}
                    {userInfo?.userType == "Employee" ? (
                      <span style={{ color: "red" }}>
                        <b style={{ color: "red" }}>**</b>Special discount
                        
                      </span>
                    ) : (
                      <></>
                    )}{" "}
                    {userInfo?.userType == "Individual" &&
                    userInfo?.userMetaData?.firstPurchase == true ? (
                      <span style={{ color: "red" }}>
                        <b style={{ color: "red" }}>**</b>AmbassadorReferral discount
                      </span>
                    ) : (
                      <></>
                    )}
                    {userInfo?.userType == "Ambassador" ? (
                      <span style={{ color: "red" }}>
                        <b style={{ color: "red" }}>**</b>
                        {userInfo?.userType} discount
                      </span>
                    ) : (
                      <></>
                    )}{" "}
                    {userInfo?.userType == "Test" ? (
                      <span style={{ color: "red" }}>
                        <b style={{ color: "red" }}>**</b>
                        {userInfo?.userType} discount
                      </span>
                    ) : (
                      <></>
                    )}{" "}
                    {userInfo?.userType == "" ? <></> : <></>}
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

export default Payment;
