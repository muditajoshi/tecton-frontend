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
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Paypala from "../images/bigpay.png";
import React, { useState, useEffect } from "react";
import ScrollToTop from "./ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, FloatingLabel, Col } from "react-bootstrap";
import axios from "axios";
import {
  sendVerficationEmail,
  updateUserProfile,
  updateUser,
} from "../actions/userActions";
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
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import useDocumentTitle from "./useDocumentTitle";
import OverlayEditSub from "../skeleton/OverlayEditSub";
// import ReactGA from "react-ga4"
const ShippingGuest = ({ history, match, location }) => {
  useDocumentTitle("Shipping - Tecton");
  const [checked, setChecked] = useState(true);
  const [showbill, setshowbill] = useState("none");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // console.log(userInfo);

  const [totalItems, setTotalItems] = useState(0);
  const productID = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1; // fetch from the query string

  const [paymentMethod1, setPaymentMethod] = useState("Credit/Debit Card"); // default option is the stripe one, but users might not understand 'stripe'
  // get cart, userInfo and userdetails from redux store
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, billingAddress, paymentMethod } = cart;
  // console.log(cart);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, loading, success } = orderCreate;
  // console.log(orderCreate);

  const userDetails = useSelector((state) => state?.userDetails);
  const { user, error } = userDetails;
  // console.log(user?.userType);
  const [address, setAddress] = useState(shippingAddress?.address);
  const [city, setCity] = useState(shippingAddress?.city);
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode);
  const [country, setCountry] = useState("United States");
  const [state, setState] = useState(shippingAddress?.state || "AK");
  const [phoneNo, setPhoneNo] = useState(shippingAddress?.phoneNo);
  const [apt, setApt] = useState(shippingAddress?.apt);
  const [firstName, setFirstName] = useState(shippingAddress?.firstName);
  const [lastName, setLastName] = useState(shippingAddress?.lastName);
  const [email, setEmail] = useState(shippingAddress?.email);
  const [spp, setspp] = useState(0);
  const [sppp, setsppp] = useState(0);
  const [extra, setExtra] = useState(userInfo?.joinTheExtClub);
  const [billingaddress, setbillingAddress] = useState();
  const [billingcity, setbillingCity] = useState();
  const [billingpostalCode, setbillingPostalCode] = useState();
  const [billingcountry, setbillingCountry] = useState("United States");
  const [billingstate, setbillingState] = useState(shippingAddress?.state);
  const [billingphoneNo, setbillingPhoneNo] = useState();
  const [billingapt, setbillingApt] = useState();
  const [billingfirstName, setbillingFirstName] = useState();
  const [billinglastName, setbillingLastName] = useState();
  const [billingRequired, setbillingRequired] = useState();
  const [show, setShow] = useState(false);
  const [taxing, setTaxing] = useState(0);
  const [calcTax, setCalcTax] = useState(false);
  const [taxError, setTaxError] = useState();
  const [overlay, setoverlay] = useState();
  const [couponValue, setCouponValue] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(undefined);
  var sumofcans = 0;
  const cans = cartItems?.map((val) => val.numberOfCans * val.qty);
  let i = 0;
  for (i = 0; i < cans?.length; i++) {
    sumofcans += cans[i];
  }
  console.log(sumofcans);
  const handleSubmit = (e) => {
    e.preventdefault();
    history.push(`/guestorder/${order._id}`);
  };
  const handleButton = () => {
    history.push(`/guestorder/${order._id}`);
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
  useEffect(() => {
    if (!cartItems.length) {
      history.push("/");
    }
  }, [cartItems, history]);
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
              <Link className="clr-dot" to="/contactdetailsguest">
                Contact Details
              </Link>
              <div className="arrowprogressbarr">
                <FontAwesomeIcon icon={faAngleRight} />
              </div>
              <Link className="clr-dot" style={{ color: "black" }}>
                Shipping
              </Link>
              <div className="arrowprogressbarr">
                <FontAwesomeIcon icon={faAngleRight} />
              </div>
              <Link className="clr-dot" to={`/guestorder/${match.params.id}`}>
                Payment
              </Link>
            </div>
            <div class=" cont-act-cart col-sm-10">
              <div class="row">
                <div className="backtocart">
                  <Link to="/contactdetailsguest">Back to Contact Details </Link>
                </div>
              </div>
              <div className="userloginguest">
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{ color: "orange", textDecoration: "underline" }}
                >
                  Sign in
                </Link>
              </div>
            </div>
           
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
                      <Link to="/contactdetailsguest">
                        <FontAwesomeIcon
                          style={{ color: "#757575", textAlign: "right" }}
                          icon={faEdit}
                        />
                      </Link>
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
                      <span style={{ color: "red" }}>{taxError}</span>
                      <br />
                    </div>
                  </div>
                  <div id="continue-descktop" class="row">
                    <div
                      class="sales-amt-shipping"
                      style={{ marginLeft: "0px" }}
                    >
                      <b style={{ color: "orange", fontSize: "17px" }}>*</b> We
                      donate 1% of revenues to Nonprofits that work with
                      veterans. Thanks for your support.
                    </div>
                    <div>
                      <div id="truemed-prequalify" style={{fontSize:"16px",fontWeight:"bold"}} data-public-id="tm_qual_lwihwute1u"> </div>
                     </div>
                     
                    <div class="continue-btn">
                      <input
                        class="product-btn-default-cart"
                        type="button"
                        onClick={() => {
                          history.push(`/guestorder/${match.params.id}`);
                        }}
                        value="PROCEED TO PAYMENT"
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-5 col-sm-12">
                <div class="review-leave-ship-pay-ord">In Your Cart</div>
                <div class="order-detail-1">
                  <div class="row">
                    {!cartItems.length ? (
                      <Message>
                        Your Cart is empty.{" "}
                        <Link to="/" style={{ textDecoration: "underline" }}>
                          Go Back.
                        </Link>{" "}
                      </Message>
                    ) : (
                      <>
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
                                  <h3 class="product-great">{item?.name}</h3>
                                  <div class="product-kgreat">
                                    <h6>12 FL OZ • Ketone Hydration</h6>
                                  </div>
                                  <div class="product-kgreat">
                                    <h6>Qty: {item?.qty}</h6>
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
                      </>
                    )}
                  </div>
                </div>
                <br />

                <div class="order-detail">
                  <div class="sub-total-cnfm">
                    <div class="cart-sub-hr-line">
                      <hr style={{ marginTop: "0px" }}></hr>
                      <div class="review-leave-ship-pay-ord">Summary</div>

                      <hr style={{ marginTop: "0px" }}></hr>
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
                          {" "}
                          {cartItems
                            .reduce(
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
                            fontWeight: "bold",
                            color: "#757575",
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
                          {localStorage.getItem("couponValue") == 0 ? (
                            <>$00.00</>
                          ) : (
                            <>
                              <span style={{ color: "red" }}>
                                {localStorage.getItem("couponValue")}%
                              </span>
                            </>
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
                          Shipping{" "}
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
                          Tax{" "}
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
                    <div id="continue-mobile" class="row">
                      <div
                        class="sales-amt-shipping"
                        style={{ marginLeft: "0px" }}
                      >
                        <b style={{ color: "orange", fontSize: "17px" }}>*</b>{" "}
                        We donate 1% of revenues to Nonprofits that work with
                        veterans. Thanks for your support.
                      </div>
                      <div>
                      <div id="truemed-prequalify" style={{fontSize:"14px",fontWeight:"bold"}} data-public-id="tm_qual_lwihwute1u"> </div>
                     </div>
                     <br/>
                      <div class="continue-btn">
                        <input
                          class="product-btn-default-cart"
                          type="button"
                          onClick={() => {
                            history.push(`/guestorder/${match.params.id}`);
                          }}
                          value="PROCEED TO PAYMENT"
                        ></input>
                      </div>
                    </div>
                    {/* <div id="con-tinue">
                  <div class="row">
                    
                    <div class="payment-button">
                      <a
                        class="product-btn-story-cart-ship-pay-new"
                        href="/shop"
                      >
                        Continue Shopping
                      </a>
                    </div>
                  </div>
                </div> */}
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

export default ShippingGuest;
