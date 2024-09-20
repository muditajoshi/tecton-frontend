import "../css/shipping.css";
import DatalistInput from "react-datalist-input";
import "react-datalist-input/dist/styles.css";
import CheckoutStatus from "../skeleton/CheckoutStatus";
import { saveBillingAddress, savePaymentMethod } from "../actions/cartActions";
import { createOrder } from "../actions/orderActions";
import { CART_RESET } from "../constants/cartConstants";
import { Link } from "react-router-dom";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import Applpay from "../images/aplpy.png";
import Paypal from "../images/pypal.png";
import Applpaya from "../images/bigapp.png";
import Paypala from "../images/bigpay.png";
import ScrollToTop from "./ScrollToTop";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, FloatingLabel, Col } from "react-bootstrap";
import axios from "axios";
import {
  sendVerficationEmail,
  updateUserProfile,
  updateUser,
} from "../actions/userActions";
import { incNumber } from "../actions/cartUpdateActions";
import { USER_PROFILE_UPDATE_RESET } from "../constants/userConstants";
// import FormContainer from '../skeleton/FormContainer';
// import CheckoutStatus from '../skeleton/CheckoutStatus';
import { saveShippingAddress } from "../actions/cartActions";
import { refreshLogin, getUserDetails } from "../actions/userActions";

import { addItem, removeItem } from "../actions/cartActions";
import Message from "../skeleton/Message";
import LoginShop from "./loginshop";

import { useForm } from "react-hook-form";

import { Input } from "./Input";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import OverlayEditSub from "../skeleton/OverlayEditSub";
import useDocumentTitle from "./useDocumentTitle";
import { disablePage, enablePage } from "../actions/PageActions";
// import ReactGA from "react-ga4"
const Shipping = ({ history, match, location }) => {
  useDocumentTitle("Shipping - Tecton");
  const [checked, setChecked] = useState(true);
  const [showbill, setshowbill] = useState("none");
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // console.log(userInfo);

  const [totalItems, setTotalItems] = useState(0);
  const productID = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1; // fetch from the query string

  const [paymentMethod1, setPaymentMethod] = useState("Credit/Debit Card"); // default option is the stripe one, but users might not understand 'stripe'
  // get cart, userInfo and userdetails from redux store
  // const cart = useSelector((state) => state.cart);
  // const { cartItems, shippingAddress, billingAddress ,paymentMethod } = cart;
  // const { paymentMethod } = cart;
  // console.log(cart);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, loading, success } = orderCreate;
  console.log(orderCreate);

  const userDetails = useSelector((state) => state?.userDetails);
  const { user, error } = userDetails;
  // console.log(user);
  const [address, setAddress] = useState(userInfo?.shippingAddress?.address1);
  const [city, setCity] = useState(userInfo?.shippingAddress?.city);
  const [postalCode, setPostalCode] = useState(userInfo?.shippingAddress?.zip);
  const [country, setCountry] = useState("United States");
  const [state, setState] = useState(userInfo?.shippingAddress?.state || "AK");
  const [phoneNo, setPhoneNo] = useState(userInfo?.phoneNo || userInfo?.phone);
  const [apt, setApt] = useState(userInfo?.shippingAddress?.address2);
  const [firstName, setFirstName] = useState(userInfo?.firstName);
  const [lastName, setLastName] = useState(userInfo?.lastName);
  const [email, setEmail] = useState(userInfo?.email);
  const [spp, setspp] = useState(0);
  const [sppp, setsppp] = useState("00.00");
  const [taxing, setTaxing] = useState(0);
  const [taxingNormal, setTaxingNormal] = useState(0);
  const [taxingSubs, setTaxingSubs] = useState(0);
  const [extra, setExtra] = useState(userInfo?.joinTheExtClub);
  const [billingaddress, setbillingAddress] = useState();
  const [billingcity, setbillingCity] = useState();
  const [billingpostalCode, setbillingPostalCode] = useState();
  const [billingcountry, setbillingCountry] = useState("United States");
  const [billingstate, setbillingState] = useState(
    userInfo?.billingAddress?.state
  );
  const [billingphoneNo, setbillingPhoneNo] = useState();
  const [billingapt, setbillingApt] = useState();
  const [billingfirstName, setbillingFirstName] = useState();
  const [billinglastName, setbillingLastName] = useState();
  const [billingRequired, setbillingRequired] = useState();
  const [myuser, setmyuser] = useState();
  const [cartid, setcartid] = useState();
  const [cartdataget, setcartdataget] = useState();
  const [show, setShow] = useState(false);

  const [overlay, setoverlay] = useState();
  const [calcTax, setCalcTax] = useState(false);
  const [taxError, setTaxError] = useState();
  // useEffect(()=>{
  //   axios.get(`${process.env.REACT_APP_PROXY_URL}/api/cart/user/${userInfo?.id}`).then((res)=>console.log(res.data.cart))
  // },[])
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


  const [cartData, setCartData] = useState();
  const [normalOrders, setNormalOrders] = useState();
  const [subsOrders, setSubsOrders] = useState();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/api/cart/user/${userInfo?.id}`)
      .then((res) => setCartData(res.data.cart[0].cartItems));
  }, [count]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/api/cart/user/${userInfo?.id}`)
      .then((res) =>
        setNormalOrders(
          res.data.cart[0].cartItems.filter(
            (val) => val?.subscription === false
          )
        )
      );
  }, [count]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/api/cart/user/${userInfo?.id}`)
      .then((res) =>
        setSubsOrders(
          res.data.cart[0].cartItems.filter((val) => val?.subscription === true)
        )
      );
  }, [count]);

  useEffect(() => {
    if (cartData?.length < 1) {
      history.push("/");
    }
  });

  const config = userInfo?.isSocialLogin
    ? {
        headers: {
          Authorization: `SocialLogin ${userInfo?.id}`,
        },
      }
    : {
        headers: {
          Authorization: `Bearer ${userInfo?.accessToken}`,
        },
      };

  var sumofcans = 0;
  const cans = cartData?.map((val) => val.numberOfCans * val.qty);
  let i = 0;
  for (i = 0; i < cans?.length; i++) {
    sumofcans += cans[i];
  }

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

  const handleSubmit = (e) => {
    e.preventdefault();
    history.push(`/order/${order._id}`);
  };
  const [ShippingValueFromApi, setShippingValueFromApi] = useState(0);
  useEffect(() => {
    // setTimeout(() => {
    //   setShippingValueFromApi(6.99)
    // }, 1000);
    setoverlay(<OverlayEditSub />);
    setShow(true);
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/api/shipping/get-shipping-price`)
      .then((res) => {
        setShippingValueFromApi(res.data.shippingPrice);
        setShow(false);
      });
  }, []);
  return (
    <div class="all-product">
      <ScrollToTop />
      {show ? overlay : <></>}
      <form onSubmit={handleSubmit} autocomplete="off">
        <section class="section2-products">
          <div class="container">
            <div class="prog-bar">
              <a href="/cart" className="clr-dot">
                Cart
              </a>
              <div className="arrowprogressbarr">
                <FontAwesomeIcon icon={faAngleRight} />
              </div>
              <a className="clr-dot" href="/contactdetails">
                Contact Details
              </a>
              <div className="arrowprogressbarr">
                <FontAwesomeIcon icon={faAngleRight} />
              </div>
              <Link className="clr-dot" style={{ color: "black" }}>
                Shipping
              </Link>
              <div className="arrowprogressbarr">
                <FontAwesomeIcon icon={faAngleRight} />
              </div>
              <Link className="clr-dot" to={`/order/${match.params.id}`}>
                Payment
              </Link>
            </div>
            <div class=" cont-act-cart col-sm-10">
              <div class="row">
                <div className="backtocart">
                  {" "}
                  <a href="/contactdetails">Back to Contact Details</a>
                </div>
              </div>
            
            </div>
            <br />
            <div class="row">
              <div class="col-md-7 col-sm-12">
                <div className="shippingdetailsnew">
                  <div style={{ display: "flex" }}>
                    <div
                      className="review-leave-ship-pay-ord"
                      style={{ width: "89%" }}
                    >
                      Shipping Details
                    </div>
                    <div className="gotocontact">
                      <a href="/contactdetails">
                        <FontAwesomeIcon
                          style={{ color: "#757575", textAlign: "right" }}
                          icon={faEdit}
                        />
                      </a>
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-11">
                    <div className="shippingdetails-contactinfo">
                      <div className="shippingnewinfo">
                        <span>{firstName}</span>
                        <br />
                        <span>{email}</span>
                        <br />
                        <span>{phoneNo}</span>
                        <br />
                      </div>
                      <hr style={{ marginTop: "0px", marginBottom: "0px" }} />
                      <div className="shippingnewinfo">
                        <span>
                          {" "}
                          {address}, {city}
                        </span>
                        <br />
                        <span>
                          {country} ,{postalCode}
                        </span>
                        <br />
                      </div>
                    </div>
                  </div>

                  <br />
                  <div class="row">
                    <div class="review-leave-ship-pay-ord">Shipping Method</div>
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
                              <span style={{ float: "right" }}>
                                ${ShippingValueFromApi.toFixed(2)}
                              </span>
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
                      <span style={{ color: "red" }}>{taxError}</span>
                      <br />
                    </div>
                  </div>
                  <div id="continue-descktop" className="row">
                    <div class="sales-amt-shipping">
                      <b style={{ color: "orange", fontSize: "17px" }}>*</b> We
                      donate 1% of revenues to Nonprofits that work with
                      veterans. Thanks for your support.
                    </div>
                    <div>
                  <div id="truemed-prequalify" style={{fontSize:"16px",fontWeight:"bold"}} data-public-id="tm_qual_lwihwute1u"> </div>
               </div>
                    <div class="continue-btn">
                      <input
                        style={
                          cartData?.length < 1 || !cartData
                            ? { display: "none" }
                            : { display: "block" }
                        }
                        class="product-btn-default-cart"
                        type="button"
                        value="PROCEED TO PAYMENT"
                        onClick={() => {
                          history.push(`/order/${match.params.id}`);
                        }}
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-5 col-sm-12">
                <div class="review-leave-ship-pay-ord">In Your Cart</div>

                <div class="order-detail-1">
                  <div class="row">
                    {!cartData?.length ? (
                      <Message>
                        Your Cart is empty.{" "}
                        <Link to="/" style={{ textDecoration: "underline" }}>
                          Go Back.
                        </Link>{" "}
                      </Message>
                    ) : (
                      <>
                        {cartData.map((item) => (
                          <div class="row" key={item.product}>
                            <div class="cart-sub-hr-line">
                              <hr></hr>
                            </div>
                            <div>
                              <div style={{ display: "flex" }}>
                                <div
                                  style={{ width: "45%", textAlign: "left" }}
                                >
                                  <img
                                    style={{ width: "98%" }}
                                    src={item?.image}
                                    alt=""
                                  />
                                </div>

                                <div style={{}}>
                                  <div>
                                    <h3 class="product-great">{item?.name}</h3>

                                    <div class="product-kgreat">
                                      <h6>12 FL OZ • Ketone Hydration</h6>
                                    </div>
                                    <div class="product-kgreat">
                                      <h6>
                                        {item.subscription === true ? (
                                          <>Delivery Every {item?.frequency}</>
                                        ) : (
                                          <>One time purchase</>
                                        )}
                                      </h6>
                                    </div>
                                    <div class="product-kgreat">
                                      <h6>Qty: {item?.qty}</h6>
                                    </div>
                                  </div>

                                  <div>
                                    <h3 class="product-price-pay-cart-shipping_page">
                                      ${(item?.price * item?.qty).toFixed(2)}
                                    </h3>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>

                <div class="order-detail">
                  <div class="sub-total-cnfm">
                    <div class="cart-sub-hr-line">
                      <hr></hr>
                      <div
                        className="review-leave-ship-pay-ord"
                        style={{ paddingBottom: "0px" }}
                      >
                        Summary
                      </div>
                    </div>
                    {/* <div class="row">
                      <div style={{ display: "flex" }}>
                        <div class="" style={{ textAlign: "left", width: "50%", color: "#757575",fontSize:"15px" }}> Subtotal</b></div>
                        <div style={{ textAlign: "right", width: "50%", color: "#757575",fontSize:"15px" }}>{cartData?.reduce((acc, item) => acc + item.qty * item.price, 0)
                          .toLocaleString("en-IN", {
                            maximumFractionDigits: 2,
                            style: "currency",
                            currency: "USD",
                          })}
                        </div>
                      </div>
                      <div style={{ display: "flex" }}>
                        <div class="" style={{ textAlign: "left", width: "50%", fontWeight:"bold", color: "#757575",fontSize:"15px"}}> {subsOrders?.length > 0 ? (<><b style={{ color: "red" }}>*</b>Discount</>) : (<>Discount</>)} </div>
                        <div style={{ textAlign: "right", width: "50%", color: "#757575",fontSize:"15px" }}>
                          {userInfo?.userType=="Individual"?(<>$00.00</>):(<></>)}

                          {userInfo?.userType == "Individual" && userInfo?.userMetaData?.firstPurchase == false && !couponDiscount ? (<>$00.00</>) : (<></>)}
                          {userInfo?.userType == "Individual" && userInfo?.userMetaData?.firstPurchase == false && couponDiscount ? (<><span style={{ color: "red" }}>{couponDiscount}%</span></>) : (<></>)}
                          {userInfo?.userType == "Veteran" ? (<span style={{ color: "red" }}><b style={{ color: "red" }}>**</b>{userInfo?.userMetaData?.veteran?.discountPercentOrder}%</span>) : (<></>)}
                          {userInfo?.userType == "Employee" ? (<span style={{ color: "red" }}><b style={{ color: "red" }}>**</b>{userInfo?.userMetaData?.employee?.discountPercentOrder}%</span>) : (<></>)}
                          {userInfo?.userType == "Individual" && userInfo?.userMetaData?.firstPurchase == true && !couponDiscount ? (<span style={{ color: "red" }}><b style={{ color: "red" }}>**</b>{userInfo?.userMetaData?.discountPercent}%</span>) : (<></>)}
                          {userInfo?.userType == "Individual" && userInfo?.userMetaData?.firstPurchase == true && couponDiscount ? (<span style={{ color: "red" }}><b style={{ color: "red" }}>**</b>{userInfo?.userMetaData?.discountPercent + couponDiscount}%</span>) : (<></>)}
                          {userInfo?.userType == "Ambassador" ? (<span style={{ color: "red" }}><b style={{ color: "red" }}>**</b>{userInfo?.ambassadorMetaData?.discountPercent}%</span>) : (<></>)}
                          {userInfo?.userType == "Test" ? (<span style={{ color: "red" }}><b style={{ color: "red" }}>**</b>{userInfo?.userMetaData?.test?.discountPercentOrder}%</span>) : (<></>)} {userInfo?.userType == "" ? (<>$00.00</>) : (<></>)}
                          {userInfo?.userType == "Individual" && !userInfo?.userMetaData && !couponDiscount ? (<>$00.00</>) : (<></>)}
                          {userInfo?.userType == "Individual" && !userInfo?.userMetaData && couponDiscount ? (<><span style={{ color: "red" }}>{couponDiscount}%</span></>) : (<></>)}


                        </div>

                      </div>
                      <div style={{ display: "flex" }}>
                        <div class="" style={{ textAlign: "left", width: "50%", color: "#757575",fontSize:"15px" }}> Shipping</b> </div>
                        <div style={{ textAlign: "right", width: "50%", color: "#757575",fontSize:"15px" }}> ${sppp}
                        </div>
                      </div>
                      <div style={{ display: "flex" }}>
                        <div class="" style={{ textAlign: "left", width: "50%", color: "#757575",fontSize:"15px" }}> Tax</b> </div>
                        <div style={{ textAlign: "right", width: "50%", color: "#757575",fontSize:"15px" }}> ${(taxingNormal + taxingSubs).toFixed(2)}
                        </div>
                      </div>

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
                      {userInfo?.userType=="Individual"?(<>$00.00</>):(<></>)}
                       {userInfo?.userType=="Individual" && userInfo?.userMetaData?.firstPurchase==false?(<>$00.00</>):(<></>)}
                        {userInfo?.userType=="Veteran"?(<span style={{color:"red"}}><b style={{color:"red"}}>**</b>{userInfo?.userMetaData?.veteran?.discountPercentOrder}%</span>):(<></>)}
                         {userInfo?.userType=="Employee"?(<span style={{color:"red"}}><b style={{color:"red"}}>**</b>{userInfo?.userMetaData?.employee?.discountPercentOrder}%</span>):(<></>)}                      
                         {userInfo?.userType=="Individual" && userInfo?.userMetaData?.firstPurchase==true ?(<span style={{color:"red"}}><b style={{color:"red"}}>**</b>{userInfo?.userMetaData?.discountPercent}%</span>):(<></>)}                      
                         {userInfo?.userType=="Ambassador"?(<span style={{color:"red"}}><b style={{color:"red"}}>**</b>{userInfo?.ambassadorMetaData?.discountPercent}%</span>):(<></>)}                     
                          {userInfo?.userType=="Test"?(<span style={{color:"red"}}><b style={{color:"red"}}>**</b>{userInfo?.userMetaData?.test?.discountPercentOrder}%</span>):(<></>)} {userInfo?.userType==""?(<>$00.00</>):(<></>)}
                      <br />${sppp}
                      <br />${(taxingNormal+taxingSubs).toFixed(2)}
                      <br />
                    </div> */}
                    {/* <div class="cart-sub-hr-line">
                      <hr></hr>
                    </div> */}
                    {/* <div style={{display:"flex"}}>
                    <div className="review-leave-ship-pay-ord"  
                           style={{width:"50%",textAlign:"left"}} 
                          >Total</div>
                    <div class="sub-tot">${totalPrice.toFixed(2)}</div>
                     <div className="review-leave-ship-pay-ord"  
                       style={{width:"50%",textAlign:"right"}}   
                          >$</div>
                          </div> */}

                    {/* <div className="shipping-shopping">
                      <div class=" sub-shop"style={{color:"orange"}} >
                        <Link 
                          to="/shop"
                          class="product-btn-single-cart"


                        >Continue Shopping</Link>

                      </div>
                    </div> */}
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
                                    {Number(
                                      localStorage.getItem("couponValue")
                                    )}
                                    %
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
                                  {
                                    userInfo?.ambassadorMetaData
                                      ?.discountPercent
                                  }
                                  %
                                </span>
                              ) : (
                                <></>
                              )}
                              {userInfo?.userType == "Test" ? (
                                <span style={{ color: "red" }}>
                                  <b style={{ color: "red" }}>**</b>
                                  {
                                    userInfo?.userMetaData?.test
                                      ?.discountPercentOrder
                                  }
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
                                    {Number(
                                      localStorage.getItem("couponValue")
                                    )}
                                    %
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
                              ${Number(localStorage.getItem("sp")).toFixed(2)}
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
                        <div
                          class="sales-amt-shipping"
                          style={{ fontSize: "16px" }}
                        >
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
                        <div
                          class="sales-amt-shipping"
                          style={{ fontSize: "17px" }}
                        >
                          {userInfo?.userType == "Individual" &&
                          userInfo?.userMetaData?.firstPurchase == false ? (
                            <></>
                          ) : (
                            <></>
                          )}{" "}
                          {userInfo?.userType == "Veteran" ? (
                            <span style={{ color: "red" }}>
                              <b style={{ color: "red" }}>**</b>
                              Military/Military Vets/First Responders discount
                            </span>
                          ) : (
                            <></>
                          )}{" "}
                          {userInfo?.userType == "Employee" ? (
                            <span style={{ color: "red" }}>
                              <b style={{ color: "red" }}>**</b>
                              Special discount
                            </span>
                          ) : (
                            <></>
                          )}{" "}
                          {userInfo?.userType == "Individual" &&
                          userInfo?.userMetaData?.firstPurchase == true ? (
                            <span style={{ color: "red" }}>
                              <b style={{ color: "red" }}>**</b>
                              AmbassadorReferral discount
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

                        <div id="continue-mobile" className="row">
                          <div class="sales-amt-shipping">
                            <b style={{ color: "orange", fontSize: "17px" }}>
                              *
                            </b>{" "}
                            We donate 1% of revenues to Nonprofits that work
                            with veterans. Thanks for your support.
                          </div>
                          <div>
                  <div id="truemed-prequalify" style={{fontSize:"14px",fontWeight:"bold"}} data-public-id="tm_qual_lwihwute1u"> </div>
               </div>
                          <div class="continue-btn">
                            <input
                              style={
                                cartData?.length < 1 || !cartData
                                  ? { display: "none" }
                                  : { display: "block" }
                              }
                              class="product-btn-default-cart"
                              type="button"
                              value="PROCEED TO PAYMENT"
                              onClick={() => {
                                history.push(`/order/${match.params.id}`);
                              }}
                            ></input>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};

export default Shipping;
