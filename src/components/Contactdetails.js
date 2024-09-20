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

import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

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
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import OverlayEditSub from "../skeleton/OverlayEditSub";
import useDocumentTitle from "./useDocumentTitle";
import { disablePage, enablePage } from "../actions/PageActions";
// import ReactGA from "react-ga4"
const ContactDetail = ({ history, match, location }) => {
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
  // console.log(orderCreate);

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
  const [billingstate, setbillingState] = useState();
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
  const [billingTaxError, setBillingTaxError] = useState();
  // useEffect(()=>{
  //   axios.get(`${process.env.REACT_APP_PROXY_URL}/api/cart/user/${userInfo?.id}`).then((res)=>console.log(res.data.cart))
  // },[])

  const [cartData, setCartData] = useState();
  const [normalOrders, setNormalOrders] = useState();
  const [subsOrders, setSubsOrders] = useState();
  
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

  // useEffect(()=>{
  //   axios.get(`${process.env.REACT_APP_PROXY_URL}/api/cart/user/${userInfo?.id}`).then((res)=>console.log(res.data))
  // },[])
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
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/api/cart/user/${userInfo?.id}`)
      .then((res) => setcartid(res?.data?.cart[0]?._id));
  }, [count]);

  // useEffect(()=>{
  //   axios.get(`${process.env.REACT_APP_PROXY_URL}/api/users/profile/`, config).then((res)=>setmyuser(res.data))
  // },[])
  var sumofcans = 0;
  const cans = cartData?.map((val) => val.numberOfCans * val.qty);
  let i = 0;
  for (i = 0; i < cans?.length; i++) {
    sumofcans += cans[i];
  }
  console.log(sumofcans);
  // console.log(cartData);
  const [showSubmitButton, setShowSubmitButton] = useState(false); // sisable the submit button unless some user detail is changed by user
  ////////////
  // const [shippingPrice, setShippingPrice] = useState(0);

  // const handleOptionChange = (e)=>{
  // 	// setShippingPrice(value);
  // 	// cart.shippingPrice = value;
  //     cart.shippingPrice=e.target.value

  //   }
  ////////////
  // console.log(+"fetchhere");
  // fetch user details from the redux store
  useEffect(() => {
    userInfo
      ? userInfo.isSocialLogin
        ? dispatch(getUserDetails(userInfo.id))
        : dispatch(getUserDetails("profile"))
      : dispatch(getUserDetails("profile"));
  }, [userInfo, dispatch]);

  useEffect(() => {
    if (error && userInfo && !userInfo.isSocialLogin) {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user && dispatch(refreshLogin(user.email));
    }
  }, [error, dispatch, userInfo]);

  // add item to cart
  useEffect(() => {
    if (productID) {
      dispatch(addItem(productID, qty));
    }
  }, [dispatch, productID, qty]);

  // remove item from cart
  const handleRemoveFromCart = (id) => {
    dispatch(removeItem(id));
  };

  // update access token to a new ine using the refresh tokens
  useEffect(() => {
    if (error && userInfo && !userInfo.isSocialLogin) {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user && dispatch(refreshLogin(user.email));
    }
  }, [error, dispatch, userInfo]);

  // useEffect(() => {
  //   if (!(cartData?.length && userInfo)) {
  //     history.push("/");
  //   }
  // }, [cartData, history, userInfo]);

  useEffect(() => {
    if (cartData) {
      setTotalItems(cartData.reduce((acc, item) => acc + item.qty, 0));
    }
  }, [cartData]);

  const clearCart = () => {
    localStorage.removeItem("cartItems");
    history.push("/cart");
  };
  const toggleLogin = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (success) {
      // localStorage.removeItem('cartItems');
      // dispatch({ type: CART_RESET, payload: shippingAddress }); // remove items from cart once paid, but keep the shipping address in store
      history.push(`/shipping/${order._id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, history]);

  // All prices, tax is randomly  assigned
  // cart.itemsPrice = cartData?.reduce(
  //   (acc, item) => acc + item.price * item.qty,
  //   0
  // );
  useEffect(() => {
    localStorage.setItem("couponValue", 0);
  }, []);
  const [discounts, setDiscounts] = useState();
  const [couponValue, setCouponValue] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(undefined);
  const couponRef = useRef();
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_PROXY_URL}/api/discount/get-all-discount`,
        config
      )
      .then((res) => {
        console.log("all coupons", res.data);
        setDiscounts(res.data);
      });
  }, []);
  console.log(couponDiscount);

  var itemsPrice = cartData?.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  console.log("cart-price-before-discount", itemsPrice);
  // cart.shippingPrice = shippingPrice;
  var taxPrice = 0.0 * itemsPrice;

  if (userInfo?.userType == "Individual") {
    if (
      userInfo?.userMetaData?.firstPurchase == true &&
      couponDiscount !== undefined
    ) {
      var itemsPrice =
        itemsPrice -
        ((userInfo?.userMetaData?.discountPercent + couponDiscount) / 100) *
          itemsPrice;
    }
    if (
      userInfo?.userMetaData?.firstPurchase == true &&
      couponDiscount == undefined
    ) {
      var itemsPrice =
        itemsPrice -
        (userInfo?.userMetaData?.discountPercent / 100) * itemsPrice;
    }

    if (
      userInfo?.userMetaData?.firstPurchase == false &&
      couponDiscount !== undefined
    ) {
      var itemsPrice = itemsPrice - itemsPrice * (couponDiscount / 100);
    }

    if (
      userInfo?.userMetaData?.firstPurchase == false &&
      couponDiscount == undefined
    ) {
      var itemsPrice = itemsPrice;
    }

    if (!userInfo.userMetaData && couponDiscount !== undefined) {
      var itemsPrice = itemsPrice - itemsPrice * (couponDiscount / 100);
    }

    if (!userInfo.userMetaData && couponDiscount == undefined) {
      var itemsPrice = itemsPrice;
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
  // if(userInfo?.userType=="Individual"){
  //   var itemsPrice = itemsPrice
  // }
  if (userInfo?.userType == "") {
    if (couponDiscount == undefined) {
      var itemsPrice = itemsPrice;
    }
    if (couponDiscount !== undefined) {
      var itemsPrice = itemsPrice - itemsPrice * (couponDiscount / 100);
    }
  }

  var totalPrice =
    itemsPrice + taxPrice + Number(sppp) + taxingNormal + taxingSubs;
  // else{
  //   var totalPrice = totalPrice
  // }

  var totalProceToBeDisplayedOnUi = itemsPrice;
  console.log("user_type", userInfo?.userType);
  console.log("cart-price-after-discount", itemsPrice);
  console.log("total-price/final-price", totalPrice);
  // save shipping address and move to payment screen

  const { errors } = useForm();

  const dataSource = [
    "Alabama",
    "Arkansas",
    "American Samoa",
    "Arizona",
    "California",
    "Colorado",
    "Connecticut",
    "District of Columbia",
    "Delaware",
    "Florida",
    "Georgia",
    "Guam",
    "Iowa",
    "Idaho",
    "Illinois",
    "Indiana",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Massachusetts",
    "Maryland",
    "Maine",
    "Michigan",
    "Minnesota",
    "Missouri",
    "Mississippi",
    "Montana",
    "North Carolina",
    "North Dakota",
    "Nebraska",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "Nevada",
    "New York",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Puerto Rico",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Virginia",
    "Virgin Islands",
    "Vermont",
    "Washington",
    "Wisconsin",
    "West Virginia",
    "Wyoming",
  ];
  const handleOnChange = (e) => {
    const val = e.target.value;
    setState(val);
  };

  const dataSource1 = ["United States"];
  const handleOnChange1 = (e) => {
    const val = e.target.value;
    setCountry("United States");
  };
  const dataSource2 = [
    "Alabama",
    "Arkansas",
    "American Samoa",
    "Arizona",
    "California",
    "Colorado",
    "Connecticut",
    "District of Columbia",
    "Delaware",
    "Florida",
    "Georgia",
    "Guam",
    "Iowa",
    "Idaho",
    "Illinois",
    "Indiana",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Massachusetts",
    "Maryland",
    "Maine",
    "Michigan",
    "Minnesota",
    "Missouri",
    "Mississippi",
    "Montana",
    "North Carolina",
    "North Dakota",
    "Nebraska",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "Nevada",
    "New York",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Puerto Rico",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Virginia",
    "Virgin Islands",
    "Vermont",
    "Washington",
    "Wisconsin",
    "West Virginia",
    "Wyoming",
  ];
  const handleOnChange2 = (e) => {
    const val = e.target.value;
    setbillingState(val);
  };

  const dataSource3 = ["United States"];
  const handleOnChange3 = (e) => {
    const val = e.target.value;
    setbillingCountry("United States");
  };

  // console.log(myuser)
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
  const handleSubmit = (e) => {
    e.preventDefault();
    // ReactGA.event({
    //   category: "Checkout",
    //   action: `Proceeding for Payment`,
    //   label: "tecton drink",
    //   value: `$${totalPrice}`,
    // })

    axios.post(`${process.env.REACT_APP_PROXY_URL}/api/avalara/validate-address`,
{
  billingAddress:{
    address: billingaddress || address,

  city: billingcity || city,

  state: billingstate || state,

  postalCode: billingpostalCode || postalCode,

  firstName: billingfirstName || firstName,

  lastName: billinglastName || lastName,

  email:email
  }

      }

    ).then(
      ()=>{ if (sumofcans > 12) {
        setCalcTax(true);
        localStorage.setItem("sp", 0);
        localStorage.setItem("sm", "Free shipping");
        setsppp(0);
        setoverlay(<OverlayEditSub />);
  
        setShow(true);
  
        axios
          .post(
            `${process.env.REACT_APP_PROXY_URL}/api/avalara/create-transaction`,
            {
              shippingPrice: 0,
              id: userInfo?.id,
              couponCode: couponValue,
  
              shippingAddress: {
                address: address,
                email: userInfo?.email,
                city: city,
                state: state,
                postalCode: postalCode,
                firstName: firstName,
                lastName: lastName,
              },
              lineItems: normalOrders,
            }
          )
          .then((res) => {
            setTaxingNormal(
              res.data.data.reduce((acc, item) => acc + item.tax, 0)
            );
            localStorage.setItem(
              "STNormal",
              res.data.data.reduce((acc, item) => acc + item.tax, 0).toFixed(2)
            );
            setTaxError("");
            axios
              .post(
                `${process.env.REACT_APP_PROXY_URL}/api/avalara/create-transaction`,
                {
                  shippingPrice: 0,
                  id: userInfo?.id,
                  couponCode: couponValue,
  
                  shippingAddress: {
                    address: address,
                    email: userInfo?.email,
                    city: city,
                    state: state,
                    postalCode: postalCode,
                    firstName: firstName,
                    lastName: lastName,
                  },
                  lineItems: subsOrders,
                }
              )
              .then((res) => {
                setTaxingSubs(
                  res.data.data.reduce((acc, item) => acc + item.tax, 0)
                );
                localStorage.setItem(
                  "STSubs",
                  res.data.data
                    .reduce((acc, item) => acc + item.tax, 0)
                    .toFixed(2)
                );
                setTaxError("");
                dispatch(
                  createOrder({
                    user: user?.id,
                    orderItems: cartData,
                    joinTheExtClub: extra,
                    shippingAddress: {
                      firstName: firstName,
                      lastName: lastName,
                      email: email,
                      address: address,
                      city: city,
                      postalCode: postalCode,
                      state: state,
                      apt: apt,
                      phoneNo: phoneNo,
                      country: country,
                    },
                    billingAddress: {
                      firstName: billingfirstName || firstName,
                      lastName: billinglastName || lastName,
                      email: email,
                      address: billingaddress || address,
                      city: billingcity || city,
                      postalCode: billingpostalCode || postalCode,
                      country: billingcountry || country,
                      state: billingstate || state,
                      phoneNo: billingphoneNo || phoneNo,
                      apt: billingapt || apt,
                    },
                    paymentMethod: "Credit/Debit Card",
                    itemsPrice: cartData?.reduce(
                      (acc, item) => acc + item.price * item.qty,
                      0
                    ),
                    shippingPrice: sppp,
                    taxPrice: taxingNormal + taxingSubs,
                    totalPrice: totalPrice,
                    userType: user?.userType,
                    refCode: userInfo?.userMetaData?.refCode,
                    discountPercent:
                      userInfo?.userType == "Individual"
                        ? userInfo?.userMetaData?.firstPurchase == true
                          ? userInfo?.userMetaData?.discountPercent +
                            Number(localStorage.getItem("couponValue"))
                          : 0 + Number(localStorage.getItem("couponValue"))
                        : userInfo?.userType == "Veteran"
                        ? userInfo?.userMetaData?.veteran?.discountPercentOrder
                        : userInfo?.userType == "Employee"
                        ? userInfo?.userMetaData?.employee?.discountPercentOrder
                        : userInfo?.userType == "Ambassador"
                        ? userInfo?.ambassadorMetaData?.discountPercent
                        : userInfo?.userType == "Test"
                        ? userInfo?.userMetaData?.test?.discountPercentOrder
                        : userInfo?.userType == ""
                        ? 0 + Number(localStorage.getItem("couponValue"))
                        : 0 + Number(localStorage.getItem("couponValue")),
                    couponCode: couponValue,
                  })
                );
  
                dispatch(
                  updateUserProfile({
                    id: user.id,
                    firstName,
                    lastName,
                    email,
                    phoneNo: phoneNo,
                    city,
                    country,
                    address1: address,
                    address2: apt,
                    zip: postalCode,
                    state,
                    joinTheExtClub: extra,
                    billingAddress: {
                      firstName: billingfirstName || firstName,
                      lastName: billinglastName || lastName,
                      address1: billingaddress || address,
                      city: billingcity || city,
                      zip: billingpostalCode || postalCode,
                      state: billingstate || state,
                      address2: billingapt || apt,
                      phoneNo: billingphoneNo || phoneNo,
                      country: billingcountry || country,
                    },
                  })
                );
              })
              .catch((err) => {
                setTaxError(err?.response?.data?.message);
                setShow(false);
                setCalcTax(false);
              });
          })
          .catch((err) => {
            setTaxError(err?.response?.data?.message);
            setCalcTax(false);
            axios
              .post(
                `${process.env.REACT_APP_PROXY_URL}/api/avalara/create-transaction`,
                {
                  shippingPrice: 0,
                  id: userInfo?.id,
                  couponCode: couponValue,
  
                  shippingAddress: {
                    address: address,
                    email: userInfo?.email,
                    city: city,
                    state: state,
                    postalCode: postalCode,
                    firstName: firstName,
                    lastName: lastName,
                  },
                  lineItems: subsOrders,
                }
              )
              .then((res) => {
                setTaxingSubs(
                  res.data.data.reduce((acc, item) => acc + item.tax, 0)
                );
                localStorage.setItem(
                  "STSubs",
                  res.data.data
                    .reduce((acc, item) => acc + item.tax, 0)
                    .toFixed(2)
                );
                setShow(false);
                setTaxError("");
              })
              .catch((err) => {
                setTaxError(err?.response?.data?.message);
                setShow(false);
                setCalcTax(false);
              });
          });
      }
      if (sumofcans <= 12) {
        setCalcTax(true);
        localStorage.setItem("sp", ShippingValueFromApi);
        localStorage.setItem("sm", "Standard shipping");
        setsppp(ShippingValueFromApi);
        setoverlay(<OverlayEditSub />);
  
        setShow(true);
  
        if (subsOrders?.length > 0 && normalOrders?.length < 1) {
          axios
            .post(
              `${process.env.REACT_APP_PROXY_URL}/api/avalara/create-transaction`,
              {
                shippingPrice: ShippingValueFromApi,
                id: userInfo?.id,
                couponCode: couponValue,
  
                shippingAddress: {
                  address: address,
                  email: userInfo?.email,
                  city: city,
                  state: state,
                  postalCode: postalCode,
                  firstName: firstName,
                  lastName: lastName,
                },
                lineItems: subsOrders,
              }
            )
            .then((res) => {
              setTaxingSubs(
                res.data.data.reduce((acc, item) => acc + item.tax, 0)
              );
              localStorage.setItem(
                "STSubs",
                res.data.data.reduce((acc, item) => acc + item.tax, 0).toFixed(2)
              );
              setTaxError("");
              axios
                .post(
                  `${process.env.REACT_APP_PROXY_URL}/api/avalara/create-transaction`,
                  {
                    shippingPrice: 0,
                    id: userInfo?.id,
                    couponCode: couponValue,
  
                    shippingAddress: {
                      address: address,
                      email: userInfo?.email,
                      city: city,
                      state: state,
                      postalCode: postalCode,
                      firstName: firstName,
                      lastName: lastName,
                    },
                    lineItems: normalOrders,
                  }
                )
                .then((res) => {
                  setTaxingNormal(
                    res.data.data.reduce((acc, item) => acc + item.tax, 0)
                  );
                  localStorage.setItem(
                    "STNormal",
                    res.data.data
                      .reduce((acc, item) => acc + item.tax, 0)
                      .toFixed(2)
                  );
                  setTaxError("");
                  dispatch(
                    createOrder({
                      user: user?.id,
                      orderItems: cartData,
                      joinTheExtClub: extra,
                      shippingAddress: {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        address: address,
                        city: city,
                        postalCode: postalCode,
                        state: state,
                        apt: apt,
                        phoneNo: phoneNo,
                        country: country,
                      },
                      billingAddress: {
                        firstName: billingfirstName || firstName,
                        lastName: billinglastName || lastName,
                        email: email,
                        address: billingaddress || address,
                        city: billingcity || city,
                        postalCode: billingpostalCode || postalCode,
                        country: billingcountry || country,
                        state: billingstate || state,
                        phoneNo: billingphoneNo || phoneNo,
                        apt: billingapt || apt,
                      },
                      paymentMethod: "Credit/Debit Card",
                      itemsPrice: cartData?.reduce(
                        (acc, item) => acc + item.price * item.qty,
                        0
                      ),
                      shippingPrice: ShippingValueFromApi,
                      taxPrice: taxingNormal + taxingSubs,
                      totalPrice: totalPrice,
                      userType: user?.userType,
                      refCode: userInfo?.userMetaData?.refCode,
                      discountPercent:
                        userInfo?.userType == "Individual"
                          ? userInfo?.userMetaData?.firstPurchase == true
                            ? userInfo?.userMetaData?.discountPercent +
                              Number(localStorage.getItem("couponValue"))
                            : 0 + Number(localStorage.getItem("couponValue"))
                          : userInfo?.userType == "Veteran"
                          ? userInfo?.userMetaData?.veteran?.discountPercentOrder
                          : userInfo?.userType == "Employee"
                          ? userInfo?.userMetaData?.employee?.discountPercentOrder
                          : userInfo?.userType == "Ambassador"
                          ? userInfo?.ambassadorMetaData?.discountPercent
                          : userInfo?.userType == "Test"
                          ? userInfo?.userMetaData?.test?.discountPercentOrder
                          : userInfo?.userType == ""
                          ? 0 + Number(localStorage.getItem("couponValue"))
                          : 0 + Number(localStorage.getItem("couponValue")),
                      couponCode: couponValue,
                    })
                  );
  
                  dispatch(
                    updateUserProfile({
                      id: user.id,
                      firstName,
                      lastName,
                      email,
                      phoneNo: phoneNo,
                      city,
                      country,
                      address1: address,
                      address2: apt,
                      zip: postalCode,
                      state,
                      joinTheExtClub: extra,
                      billingAddress: {
                        firstName: billingfirstName || firstName,
                        lastName: billinglastName || lastName,
                        address1: billingaddress || address,
                        city: billingcity || city,
                        zip: billingpostalCode || postalCode,
                        state: billingstate || state,
                        address2: billingapt || apt,
                        phoneNo: billingphoneNo || phoneNo,
                        country: billingcountry || country,
                      },
                    })
                  );
                })
                .catch((err) => {
                  setTaxError(err?.response?.data?.message);
                  setCalcTax(false);
                  setShow(false);
                });
            })
            .catch((err) => {
              setTaxError(err?.response?.data?.message);
              setCalcTax(false);
              setShow(false);
            });
        }
  
        if (subsOrders?.length < 1 && normalOrders?.length > 0) {
          axios
            .post(
              `${process.env.REACT_APP_PROXY_URL}/api/avalara/create-transaction`,
              {
                shippingPrice: ShippingValueFromApi,
                id: userInfo?.id,
                couponCode: couponValue,
  
                shippingAddress: {
                  address: address,
                  email: userInfo?.email,
                  city: city,
                  state: state,
                  postalCode: postalCode,
                  firstName: firstName,
                  lastName: lastName,
                },
                lineItems: normalOrders,
              }
            )
            .then((res) => {
              setTaxingNormal(
                res.data.data.reduce((acc, item) => acc + item.tax, 0)
              );
              localStorage.setItem(
                "STNormal",
                res.data.data.reduce((acc, item) => acc + item.tax, 0).toFixed(2)
              );
              setTaxError("");
              axios
                .post(
                  `${process.env.REACT_APP_PROXY_URL}/api/avalara/create-transaction`,
                  {
                    shippingPrice: 0,
                    id: userInfo?.id,
                    couponCode: couponValue,
  
                    shippingAddress: {
                      address: address,
                      email: userInfo?.email,
                      city: city,
                      state: state,
                      postalCode: postalCode,
                      firstName: firstName,
                      lastName: lastName,
                    },
                    lineItems: subsOrders,
                  }
                )
                .then((res) => {
                  setTaxingSubs(
                    res.data.data.reduce((acc, item) => acc + item.tax, 0)
                  );
                  localStorage.setItem(
                    "STSubs",
                    res.data.data
                      .reduce((acc, item) => acc + item.tax, 0)
                      .toFixed(2)
                  );
                  setTaxError("");
                  dispatch(
                    createOrder({
                      user: user?.id,
                      orderItems: cartData,
                      joinTheExtClub: extra,
                      shippingAddress: {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        address: address,
                        city: city,
                        postalCode: postalCode,
                        state: state,
                        apt: apt,
                        phoneNo: phoneNo,
                        country: country,
                      },
                      billingAddress: {
                        firstName: billingfirstName || firstName,
                        lastName: billinglastName || lastName,
                        email: email,
                        address: billingaddress || address,
                        city: billingcity || city,
                        postalCode: billingpostalCode || postalCode,
                        country: billingcountry || country,
                        state: billingstate || state,
                        phoneNo: billingphoneNo || phoneNo,
                        apt: billingapt || apt,
                      },
                      paymentMethod: "Credit/Debit Card",
                      itemsPrice: cartData?.reduce(
                        (acc, item) => acc + item.price * item.qty,
                        0
                      ),
                      shippingPrice: ShippingValueFromApi,
                      taxPrice: taxingNormal + taxingSubs,
                      totalPrice: totalPrice,
                      userType: user?.userType,
                      refCode: userInfo?.userMetaData?.refCode,
                      discountPercent:
                        userInfo?.userType == "Individual"
                          ? userInfo?.userMetaData?.firstPurchase == true
                            ? userInfo?.userMetaData?.discountPercent +
                              Number(localStorage.getItem("couponValue"))
                            : 0 + Number(localStorage.getItem("couponValue"))
                          : userInfo?.userType == "Veteran"
                          ? userInfo?.userMetaData?.veteran?.discountPercentOrder
                          : userInfo?.userType == "Employee"
                          ? userInfo?.userMetaData?.employee?.discountPercentOrder
                          : userInfo?.userType == "Ambassador"
                          ? userInfo?.ambassadorMetaData?.discountPercent
                          : userInfo?.userType == "Test"
                          ? userInfo?.userMetaData?.test?.discountPercentOrder
                          : userInfo?.userType == ""
                          ? 0 + Number(localStorage.getItem("couponValue"))
                          : 0 + Number(localStorage.getItem("couponValue")),
                      couponCode: couponValue,
                    })
                  );
  
                  dispatch(
                    updateUserProfile({
                      id: user.id,
                      firstName,
                      lastName,
                      email,
                      phoneNo: phoneNo,
                      city,
                      country,
                      address1: address,
                      address2: apt,
                      zip: postalCode,
                      state,
                      joinTheExtClub: extra,
                      billingAddress: {
                        firstName: billingfirstName || firstName,
                        lastName: billinglastName || lastName,
                        address1: billingaddress || address,
                        city: billingcity || city,
                        zip: billingpostalCode || postalCode,
                        state: billingstate || state,
                        address2: billingapt || apt,
                        phoneNo: billingphoneNo || phoneNo,
                        country: billingcountry || country,
                      },
                    })
                  );
                })
                .catch((err) => {
                  setTaxError(err?.response?.data?.message);
                  setCalcTax(false);
                  setShow(false);
                });
            })
            .catch((err) => {
              setTaxError(err?.response?.data?.message);
              setCalcTax(false);
              setShow(false);
            });
        }
      }}
    )
    .catch(
      (error)=>{
        setShow(false);
        setBillingTaxError(error.response.data.message)
      }
    )
    
   
  };

  // const testclick =()=>{
  //   axios.put(`${process.env.REACT_APP_PROXY_URL}/api/cart/${userInfo.id}/additem`,{
  //     cart
  //   })
  // }
  const handleChange = (e) => {
    // setPaymentMethod(e.target.value);
    // dispatch(
    //   updateUserProfile({
    //     id: user.id,
    //     firstName,
    //     lastName,
    //     email,
    //     phoneNo: phoneNo,
    //     city,
    //     country,
    //     address1: address,
    //     address2: apt,
    //     zip: postalCode,
    //     state,
    //     joinTheExtClub: extra,
    //     billingAddress : {
    //       firstName:billingfirstName || user?.firstName,
    //       lastName:billinglastName || user?.lastName,
    //       address1:billingaddress || user?.shippingAddress?.address1,
    //       city:billingcity || user?.shippingAddress?.city,
    //       zip:billingpostalCode ||user?.shippingAddress?.zip,
    //       state:billingstate || user?.shippingAddress?.state,
    //       address2:billingapt || user?.shippingAddress?.address2,
    //       phoneNo:billingphoneNo || user.phoneNo,
    //       country:billingcountry || user?.shippingAddress?.country,
    //     }
    //   })
    // );
    // dispatch(savePaymentMethod("Credit/Debit Card"));
  };
  const data = localStorage.getItem("userInfo");
  // console.log(JSON.parse(data?.avatar))
  const data1 = JSON.parse(data);

  // console.log(cartItems);

  // check if any of the input fields value is changed, only then show the submit button
  useEffect(() => {
    if (userInfo) {
      if (email && userInfo.email !== email) setShowSubmitButton(true);
      else setShowSubmitButton(false);
    }
  }, []);

  // const getData = () => {
  //   const getId = JSON.parse(localStorage.getItem("userInfo"));
  //   const { id, accessToken } = getId;
  //   console.log(id);
  //   console.log(accessToken);

  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   };

  //   console.log(id);
  //   axios
  //     .get(`${process.env.REACT_APP_PROXY_URL}/api/users/${id}`, config)
  //     .then((res) => {
  //       console.log(res);
  //     });
  // };
  // useEffect(() => {
  //   getData();
  // });
  // console.log(cart)
  // const fetchCart = cart
  // localStorage.setItem("fetchCart",JSON.stringify(fetchCart))
  const billfunction = (e) => {
    setChecked(e.target.checked);
    
    
    // setbillingRequired(true)
    // setshowbill("block")
    if (showbill === "block") {
      setshowbill("none");
      setbillingRequired(false);
    }
    if (showbill === "none") {
      setshowbill("block");
      setbillingRequired(true);
    }
    if(checked=false){
      setbillingState(state)
          }
  };
  const mycartupdate = useSelector((state) => state.cartUpdate);
  // console.log(mycartupdate)
  let itemsParent = [
    { value1: "AK", value: "Alaska" },
    { value1: "AL", value: "Alabama" },
    { value1: "AR", value: "Arkansas" },
    { value1: "AZ", value: "Arizona" },
    { value1: "CA", value: "California" },
    { value1: "CO", value: "Colorado" },
    { value1: "CT", value: "Connecticut" },
    { value1: "DC", value: "DistrictofColumbia" },
    { value1: "DE", value: "Delaware" },
    { value1: "FL", value: "Florida" },
    { value1: "GA", value: "Georgia" },
    { value1: "HI", value: "Hawaii" },
    { value1: "IA", value: "Iowa" },
    { value1: "ID", value: "Idaho" },
    { value1: "IL", value: "Illinois" },
    { value1: "IN", value: "Indiana" },
    { value1: "KS", value: "Kansas" },
    { value1: "KY", value: "Kentucky" },
    { value1: "LA", value: "Louisiana" },
    { value1: "MA", value: "Massachusetts" },
    { value1: "MD", value: "Maryland" },
    { value1: "ME", value: "Maine" },
    { value1: "MI", value: "Michigan" },
    { value1: "MN", value: "Minnesota" },
    { value1: "MO", value: "Missouri" },
    { value1: "MS", value: "Mississippi" },
    { value1: "MT", value: "Montana" },
    { value1: "NC", value: "NorthCarolina" },
    { value1: "ND", value: "NorthDakota" },
    { value1: "NE", value: "Nebraska" },
    { value1: "NH", value: "NewHampshire" },
    { value1: "NJ", value: "NewJersey" },
    { value1: "NM", value: "NewMexico" },
    { value1: "NV", value: "Nevada" },
    { value1: "NY", value: "NewYork" },
    { value1: "OH", value: "Ohio" },
    { value1: "OK", value: "Oklahoma" },
    { value1: "OR", value: "Oregon" },
    { value1: "PA", value: "Pennsylvania" },
    { value1: "RI", value: "RhodeIsland" },
    { value1: "SC", value: "SouthCarolina" },
    { value1: "SD", value: "SouthDakota" },
    { value1: "TN", value: "Tennessee" },
    { value1: "TX", value: "Texas" },
    { value1: "UT", value: "Utah" },
    { value1: "VA", value: "Virginia" },
    { value1: "VT", value: "Vermont" },
    { value1: "WA", value: "Washington" },
    { value1: "WI", value: "Wisconsin" },
    { value1: "WV", value: "WestVirginia" },
    { value1: "WY", value: "Wyoming" },
  ];
  // console.log(itemsParent.filter((vals)=>vals.value1===userInfo?.shippingAddress?.state)[0].value)
  let items = [
    {
      value1: userInfo?.shippingAddress?.state || "AK",
      value:
        itemsParent.filter(
          (vals) => vals?.value1 === userInfo?.shippingAddress?.state
        )[0]?.value || "Alaska",
    },
    { value1: "AK", value: "Alaska" },
    { value1: "AL", value: "Alabama" },
    { value1: "AR", value: "Arkansas" },
    { value1: "AZ", value: "Arizona" },
    { value1: "CA", value: "California" },
    { value1: "CO", value: "Colorado" },
    { value1: "CT", value: "Connecticut" },
    { value1: "DC", value: "DistrictofColumbia" },
    { value1: "DE", value: "Delaware" },
    { value1: "FL", value: "Florida" },
    { value1: "GA", value: "Georgia" },
    { value1: "HI", value: "Hawaii" },
    { value1: "IA", value: "Iowa" },
    { value1: "ID", value: "Idaho" },
    { value1: "IL", value: "Illinois" },
    { value1: "IN", value: "Indiana" },
    { value1: "KS", value: "Kansas" },
    { value1: "KY", value: "Kentucky" },
    { value1: "LA", value: "Louisiana" },
    { value1: "MA", value: "Massachusetts" },
    { value1: "MD", value: "Maryland" },
    { value1: "ME", value: "Maine" },
    { value1: "MI", value: "Michigan" },
    { value1: "MN", value: "Minnesota" },
    { value1: "MO", value: "Missouri" },
    { value1: "MS", value: "Mississippi" },
    { value1: "MT", value: "Montana" },
    { value1: "NC", value: "NorthCarolina" },
    { value1: "ND", value: "NorthDakota" },
    { value1: "NE", value: "Nebraska" },
    { value1: "NH", value: "NewHampshire" },
    { value1: "NJ", value: "NewJersey" },
    { value1: "NM", value: "NewMexico" },
    { value1: "NV", value: "Nevada" },
    { value1: "NY", value: "NewYork" },
    { value1: "OH", value: "Ohio" },
    { value1: "OK", value: "Oklahoma" },
    { value1: "OR", value: "Oregon" },
    { value1: "PA", value: "Pennsylvania" },
    { value1: "RI", value: "RhodeIsland" },
    { value1: "SC", value: "SouthCarolina" },
    { value1: "SD", value: "SouthDakota" },
    { value1: "TN", value: "Tennessee" },
    { value1: "TX", value: "Texas" },
    { value1: "UT", value: "Utah" },
    { value1: "VA", value: "Virginia" },
    { value1: "VT", value: "Vermont" },
    { value1: "WA", value: "Washington" },
    { value1: "WI", value: "Wisconsin" },
    { value1: "WV", value: "WestVirginia" },
    { value1: "WY", value: "Wyoming" },
  ];
  // console.log(itemsParent.filter((vals)=>vals.value1===userInfo?.billingAddress?.state))
  let itemsTwo = [
    // {
    //   value1: `${userInfo?.billingAddress?.state}`,
    //   value: itemsParent?.filter(
    //     (vals) => vals?.value1 === userInfo?.billingAddress?.state
    //   )[0]?.value,
    // },
    {
      value1: null,
      value: null,
    },
    { value1: "AK", value: "Alaska" },
    { value1: "AL", value: "Alabama" },
    { value1: "AR", value: "Arkansas" },
    { value1: "AZ", value: "Arizona" },
    { value1: "CA", value: "California" },
    { value1: "CO", value: "Colorado" },
    { value1: "CT", value: "Connecticut" },
    { value1: "DC", value: "DistrictofColumbia" },
    { value1: "DE", value: "Delaware" },
    { value1: "FL", value: "Florida" },
    { value1: "GA", value: "Georgia" },
    { value1: "HI", value: "Hawaii" },
    { value1: "IA", value: "Iowa" },
    { value1: "ID", value: "Idaho" },
    { value1: "IL", value: "Illinois" },
    { value1: "IN", value: "Indiana" },
    { value1: "KS", value: "Kansas" },
    { value1: "KY", value: "Kentucky" },
    { value1: "LA", value: "Louisiana" },
    { value1: "MA", value: "Massachusetts" },
    { value1: "MD", value: "Maryland" },
    { value1: "ME", value: "Maine" },
    { value1: "MI", value: "Michigan" },
    { value1: "MN", value: "Minnesota" },
    { value1: "MO", value: "Missouri" },
    { value1: "MS", value: "Mississippi" },
    { value1: "MT", value: "Montana" },
    { value1: "NC", value: "NorthCarolina" },
    { value1: "ND", value: "NorthDakota" },
    { value1: "NE", value: "Nebraska" },
    { value1: "NH", value: "NewHampshire" },
    { value1: "NJ", value: "NewJersey" },
    { value1: "NM", value: "NewMexico" },
    { value1: "NV", value: "Nevada" },
    { value1: "NY", value: "NewYork" },
    { value1: "OH", value: "Ohio" },
    { value1: "OK", value: "Oklahoma" },
    { value1: "OR", value: "Oregon" },
    { value1: "PA", value: "Pennsylvania" },
    { value1: "RI", value: "RhodeIsland" },
    { value1: "SC", value: "SouthCarolina" },
    { value1: "SD", value: "SouthDakota" },
    { value1: "TN", value: "Tennessee" },
    { value1: "TX", value: "Texas" },
    { value1: "UT", value: "Utah" },
    { value1: "VA", value: "Virginia" },
    { value1: "VT", value: "Vermont" },
    { value1: "WA", value: "Washington" },
    { value1: "WI", value: "Wisconsin" },
    { value1: "WV", value: "WestVirginia" },
    { value1: "WY", value: "Wyoming" },
  ];

  let localcartvalues = JSON.parse(localStorage?.getItem("cartItems"));
  // console.log(localcartvalues)
  useEffect(() => {
    dispatch(
      updateUserProfile({
        id: user?.id,
        firstName: userInfo?.firstName,
        lastName: userInfo?.lastName,
        email: userInfo?.email,
        phoneNo: userInfo?.phoneNo,
        city: userInfo?.shippingAddress?.city,
        country: userInfo?.shippingAddress?.country,
        address1: userInfo?.shippingAddress?.address1,
        address2: userInfo?.shippingAddress?.address2,
        zip: userInfo?.shippingAddress?.zip,
        state: userInfo?.shippingAddress?.state,
        joinTheExtClub: userInfo?.joinTheExtClub,
        billingAddress: {
          firstName: userInfo?.billingAddress?.firstName,
          lastName: userInfo?.billingAddress?.lastName,
          address1: userInfo?.billingAddress?.address1,
          city: userInfo?.billingAddress?.city,
          zip: userInfo?.billingAddress?.zip,
          state: userInfo?.billingAddress?.state,
          address2: userInfo?.billingAddress?.address2,
          phoneNo: userInfo?.billingAddress?.phoneNo,
          country: userInfo?.billingAddress?.country,
        },
      })
    );
  }, []);

  return (
    <div class="all-product">
      {show ? overlay : <></>}
      <form onSubmit={handleSubmit} autocomplete="off">
        <section class="section2-products">
          <div class="container">
            {userInfo ? (
              <div class="prog-bar">
                <a href="/cart" className="clr-dot">
                  Cart
                </a>
                <div className="arrowprogressbarr">
                  <FontAwesomeIcon icon={faAngleRight} />
                </div>
                <Link
                  className="clr-dot"
                  style={{ color: "black" }}
                  to="/contactdetails"
                >
                  Contact Details
                </Link>
                <div className="arrowprogressbarr">
                  <FontAwesomeIcon icon={faAngleRight} />
                </div>
                <Link className="clr-dot">Shipping</Link>
                <div className="arrowprogressbarr">
                  <FontAwesomeIcon icon={faAngleRight} />
                </div>
                <Link className="clr-dot">Payment</Link>
              </div>
            ) : (
              <div class="prog-bar">
                <a href="/cart" className="clr-dot">
                  Cart
                </a>
                <div className="arrowprogressbarr">
                  <FontAwesomeIcon icon={faAngleRight} />
                </div>
                <Link
                  className="clr-dot"
                  style={{ color: "black" }}
                  to="/contactdetail"
                >
                  Contact Details
                </Link>
                <div className="arrowprogressbarr">
                  <FontAwesomeIcon icon={faAngleRight} />
                </div>
                <Link className="clr-dot" to="/shipping">
                  Shipping
                </Link>
                <div className="arrowprogressbarr">
                  <FontAwesomeIcon icon={faAngleRight} />
                </div>
                <Link className="clr-dot" to="">
                  Payment
                </Link>
              </div>
            )}
            <div class=" cont-act-cart col-sm-10">
              <div class="row">
                <div className="backtocart">
                  {" "}
                  <Link to="/cart">Back to cart</Link>
                </div>
              </div>
              <div className="dontship">
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  style={{ color: "orange" }}
                />
                We don't ship to PO/APO addresses
              </div>
            </div>
            <br></br>
            <div class="row">
              <div class="col-md-7 col-sm-12">
                <div className="shippingdetailsnew">
                  <div className="review-leave-ship-pay-ord">
                    Contact Information
                  </div>
                  <div id="product-11" class="single2-product">
                    <div class="detail-ship">
                      <div
                        class="col-cvv"
                        style={{ marginTop: "13px", display: "flex" }}
                      >
                        <input
                          required
                          type="text"
                          class="form-control-ship-exp "
                          placeholder="First Name"
                          id="fname"
                          name="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                        &nbsp;&nbsp;
                        <input
                          required
                          type="text"
                          class="form-control-ship-exp "
                          placeholder="Last Name"
                          id="fname"
                          name="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                      <div class="col">
                        <input
                          required
                          type="text"
                          class="form-control-ship "
                          placeholder="Email"
                          id="fname"
                          name="email"
                          value={email}
                          disabled
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div class="col" style={{ marginTop: "6px" }}>
                        <input
                          class="form-control-ship "
                          placeholder="Phone Number"
                          type="text"
                          name="phoneNo"
                          value={phoneNo}
                          pattern="^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$"
                          title="Please Enter valid Phone number"
                          required
                          onChange={(e) => setPhoneNo(e.target.value)}
                        />
                      </div>
                      {/* <div className="shippingupdates">*&nbsp; &nbsp;For Shipping Updates</div> */}
                    </div>
                  </div>
                  <div className="review-leave-ship-pay-ord">
                    Shipping Information
                  </div>

                  <div id="product-11" class="single2-product">
                    <div class="detail-ship">
                      <div class="col-country" style={{ marginTop: "6px" }}>
                        <Input
                          type="text"
                          placeholder="Country"
                          required={true}
                          list="gameList1"
                          onChange={handleOnChange1}
                          value={country}
                        />
                        <datalist id="gameList1">
                          {dataSource1.map((item) => (
                            <option key={item} value={item} />
                          ))}
                        </datalist>
                      </div>
                      <div class="col">
                        <input
                          class="form-control-ship "
                          style={{ marginTop: "-10px" }}
                          placeholder="Zip Code"
                          type="text"
                          pattern="^\d{5}(?:[-\s]\d{4})?$"
                          title="Zip code should be in the valid format"
                          name="postalCode"
                          value={postalCode}
                          required
                          onChange={(e) => setPostalCode(e.target.value)}
                        />
                      </div>
                      <div
                        style={{
                          fontSize: "15px",
                          marginTop: "6px",
                          marginBottom: "-5px",
                        }}
                      >
                        State:
                      </div>
                      <div
                        class="col-cvv"
                        style={{ marginTop: "13px", display: "flex" }}
                      >
                        <select
                          class="form-control-ship-exp "
                          onChange={(e) => {
                            setState(e.target.value);
                            setCalcTax(false);
                          }}
                        >
                          {items.map((valuess) => (
                            <option value={valuess.value1}>
                              {valuess.value}
                            </option>
                          ))}
                        </select>
                        &nbsp;&nbsp;
                        <input
                          type="text"
                          class="form-control-ship-exp  "
                          placeholder="City"
                          id="fname"
                          name="city"
                          value={city}
                          required
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>

                      <div class="col">
                        <input
                          type="text"
                          class="form-control-ship "
                          placeholder="Street Address"
                          id="fname"
                          name="address"
                          value={address}
                          required
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                      <div class="col" style={{ marginTop: "6px" }}>
                        <input
                          type="text"
                          class="form-control-ship "
                          placeholder="Apt #,suite,etc.(optional)"
                          id="fname"
                          name="apt"
                          value={apt}
                          onChange={(e) => setApt(e.target.value)}
                        />
                      </div>
                      {/* <span style={{ color: "red", paddingBottom: "10px" }}>
                        {taxError}
                      </span> */}
                      <br />

                      <div className="extradetail">
                        {userDetails?.user?.joinTheExtClub === true ? (
                          <input
                            class="tik-tack"
                            type="checkbox"
                            checked={extra}
                            onClick={(e) => setExtra(!extra)}
                          />
                        ) : (
                          <input
                            class="tik-tack"
                            type="checkbox"
                            onClick={(e) => setExtra(true)}
                          />
                        )}
                        &nbsp;
                        <div className="extradetails">
                          Join the (extra)Ordinary club for info & offers
                        </div>
                      </div>
                      <br />
                      <div className="review-leave-ship-pay-ord">
                        Billing Address
                      </div>
                      <div className="extradetail">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={billfunction}
                        />
                        &nbsp;
                        <div className="extradetails">
                          Same as Shipping Address
                        </div>
                      </div>
                      <br />

                      <div
                        class="detail-ship"
                        style={{ display: `${showbill}` }}
                      >
                        <div class="col-cvv" style={{ display: "flex" }}>
                          <input
                            required={billingRequired}
                            type="text"
                            class="form-control-ship-exp "
                            placeholder="First Name"
                            id="fname"
                            name="firstName"
                            value={billingfirstName}
                            onChange={(e) =>
                              setbillingFirstName(e.target.value)
                            }
                          />
                          &nbsp;&nbsp;
                          <input
                            required={billingRequired}
                            type="text"
                            class="form-control-ship-exp "
                            placeholder="Last Name"
                            id="fname"
                            name="lastName"
                            value={billinglastName}
                            onChange={(e) => setbillingLastName(e.target.value)}
                          />
                        </div>

                        <div class="col" style={{ marginBottom: "6px" }}>
                          <input
                            type="text"
                            class="form-control-ship "
                            placeholder="Street Address"
                            id="fname"
                            name="address"
                            value={billingaddress}
                            required={billingRequired}
                            onChange={(e) => setbillingAddress(e.target.value)}
                          />
                        </div>

                        <div class="col" style={{ marginBottom: "6px" }}>
                          <input
                            type="text"
                            class="form-control-ship "
                            placeholder="Apt #,suite,etc.(optional)"
                            id="fname"
                            name="apt"
                            value={billingapt}
                            onChange={(e) => setbillingApt(e.target.value)}
                          />
                        </div>

                        <div class="col" style={{ marginBottom: "6px" }}>
                          <input
                            type="text"
                            class="form-control-ship "
                            placeholder="City"
                            id="fname"
                            name="city"
                            value={billingcity}
                            required={billingRequired}
                            onChange={(e) => setbillingCity(e.target.value)}
                          />
                        </div>

                        <div class="col-country" style={{ fontSize: "15px" }}>
                          <div style={{ marginTop: "9px" }}>State:</div>
                          <select
                            required={billingRequired}
                            class="form-control-ship-new"
                            onChange={(e) => setbillingState(e.target.value)}
                          >
                            {itemsTwo.map((valuess) => (
                              <option value={valuess.value1}>
                                {valuess.value}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div class="col">
                          <input
                            class="form-control-ship "
                            style={{ marginTop: "6px", marginBottom: "6px" }}
                            placeholder="Zip Code"
                            type="text"
                            pattern="^\d{5}(?:[-\s]\d{4})?$"
                            title="Zip code should be in the valid format"
                            name="postalCode"
                            value={billingpostalCode}
                            required={billingRequired}
                            onChange={(e) =>
                              setbillingPostalCode(e.target.value)
                            }
                          />
                        </div>

                        <div class="col-country">
                          <Input
                            type="text"
                            placeholder="Country"
                            required={billingRequired}
                            list="gameList1"
                            onChange={handleOnChange3}
                            value={billingcountry}
                          />
                          <datalist id="gameList1">
                            {dataSource1.map((item) => (
                              <option key={item} value={item} />
                            ))}
                          </datalist>
                        </div>

                        <div class="col" style={{ marginTop: "-11px" }}>
                          <input
                            class="form-control-ship "
                            placeholder="Phone Number"
                            type="text"
                            name="phoneNo"
                            value={billingphoneNo}
                            pattern="^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$"
                            title="Please Enter valid Phone number"
                            required={billingRequired}
                            onChange={(e) => setbillingPhoneNo(e.target.value)}
                          />
                        </div>

                        <br />
                       
                      </div>
                      <div id="continue-descktop" class="row">
                        <div class="sales-amt-shipping">
                          <b style={{ color: "orange" }}>*</b>We donate 1% of
                          revenues to Nonprofits that work with veterans. Thanks
                          for your support.
                        </div>
                        <div>
                <div id="truemed-prequalify" style={{fontSize:"16px",fontWeight:"bold"}} data-public-id="tm_qual_lwihwute1u"> </div>
                </div>
                        <div class="continue-btn">
                        {billingTaxError?<span style={{ color: "red", paddingBottom: "10px" }}>
                        {billingTaxError}
                      </span>:<span style={{ color: "red", paddingBottom: "10px" }}>
                        {taxError}
                      </span>}
                          <input
                            style={
                              cartData?.length < 1 || !cartData
                                ? { display: "none" }
                                : { display: "block" }
                            }
                            class="product-btn-default-cart"
                            type="submit"
                            value="CONTINUE"
                          ></input>
                        </div>
                      </div>
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
                        Your Cart is empty.
                        <Link to="/" style={{ textDecoration: "underline" }}>
                          Go Back.
                        </Link>
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
                                  style={{ width: "55%", textAlign: "left" }}
                                >
                                  <img
                                    style={{ width: "95%" }}
                                    src={item?.image}
                                    alt=""
                                  />
                                </div>

                                <div style={{ width: "40%" }}>
                                  <div>
                                    <h3 class="product-great">{item?.name}</h3>

                                   
                                    <div class="product-kgreat">
                                      <h6 style={{ marginBottom: "4px" }}>
                                        {item.subscription === true ? (
                                          <>Delivery Every {item?.frequency}</>
                                        ) : (
                                          <>One time purchase</>
                                        )}
                                      </h6>
                                    </div>
                                    <div class="product-kgreat">
                                      <h6 style={{ marginBottom: "0px" }}>
                                        Qty: {item?.qty}
                                      </h6>
                                    </div>
                                  </div>

                                  <div>
                                    <h3 class="product-price-pay-cart-contact">
                                      ${(item?.price * item?.qty).toFixed(2)}
                                    </h3>
                                  </div>
                                </div>
                                <div
                                  style={{ width: "29%", textAlign: "right" }}
                                >
                                  <div className="cart-button-edit">
                                    <span
                                      style={{
                                        border: "1px solid #75757575",
                                        paddingTop: "9px",
                                        paddingBottom: "4px",
                                        backgroundColor: "white",
                                        borderRadius: "3px",
                                        paddingLeft: "7px",
                                        paddingRight: "7px",
                                      }}
                                    >
                                      <span
                                        style={{
                                          cursor: "pointer",
                                          border: "none",
                                          color: "black",
                                          display: item.qty < 2 ? "none" : "",
                                        }}
                                        disabled={item.qty === 1}
                                        onClick={() => {
                                          dispatch(disablePage());
                                          axios
                                            .put(
                                              `${process.env.REACT_APP_PROXY_URL}/api/cart/${cartid}/items/${item?._id}`,
                                              {
                                                minus: true,
                                              }
                                            )
                                            .then((res) => {
                                              if (res) {
                                                setCount(count + 1);
                                                dispatch(incNumber());
                                                dispatch(enablePage());
                                              }
                                            });

                                          setCalcTax(false);
                                        }}
                                      >
                                        <FontAwesomeIcon
                                          icon={faAngleLeft}
                                          style={{
                                            color: "black",
                                            fontSize: "12px",
                                            paddingRight: "4px",
                                          }}
                                        />
                                      </span>
                                      &nbsp;
                                      <span
                                        style={{
                                          color: "black",
                                          fontSize: "0.9rem",
                                        }}
                                      >
                                        {item?.qty}
                                      </span>
                                      &nbsp;
                                      <span
                                        style={{
                                          cursor: "pointer",
                                          border: "none",
                                          color: "black",
                                        }}
                                        onClick={() => {
                                          dispatch(disablePage());
                                          axios
                                            .put(
                                              `${process.env.REACT_APP_PROXY_URL}/api/cart/${cartid}/items/${item?._id}`,
                                              {
                                                plus: true,
                                              }
                                            )
                                            .then((res) => {
                                              if (res) {
                                                setCount(count + 1);
                                                dispatch(incNumber());
                                                dispatch(enablePage());
                                              }
                                            });

                                          setCalcTax(false);
                                          // window.location.reload(false)
                                        }}
                                      >
                                        <FontAwesomeIcon
                                          icon={faAngleRight}
                                          style={{
                                            color: "black",
                                            fontSize: "12px",
                                            paddingLeft: "4px",
                                          }}
                                        />
                                      </span>
                                    </span>
                                  </div>
                                  <div class="opt-three-pay-cart-new">
                                    <br />
                                    <p
                                      style={{
                                        color: "orange",
                                        cursor: "pointer",
                                        marginBottom: "0px",
                                      }}
                                      onClick={() => {
                                        dispatch(disablePage());
                                        axios
                                          .delete(
                                            `${process.env.REACT_APP_PROXY_URL}/api/cart/${cartid}/items/${item?._id}`
                                          )
                                          .then((res) => {
                                            if (res) {
                                              setCount(count + 1);
                                              dispatch(incNumber());
                                              dispatch(enablePage());
                                            }
                                          });

                                        setCalcTax(false);
                                      }}
                                    >
                                      Remove
                                    </p>
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
                  <div class="row"></div>
                  <div class="sub-total-cnfm">
                    <div class="cart-sub-hr-line">
                      <hr style={{}}></hr>
                      <div
                        className="review-leave-ship-pay-ord"
                        style={{ paddingBottom: "0px" }}
                      >
                        Summary
                      </div>
                      <br />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <input
                          style={{ width: "85%" }}
                          type="text"
                          class="form-control-ship "
                          placeholder="Add a Promo Code"
                          value={couponValue}
                          ref={couponRef}
                          onChange={(e) => setCouponValue(e.target.value)}
                        />
                        <span
                          style={{
                            background: "#FFFFFF",
                            padding: "8px",
                           
                            borderRadius: "4px",
                            border: "1px solid black",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setCalcTax(false);
                            if (
                              userInfo?.userType == "Employee" ||
                              userInfo?.userType == "Veteran" ||
                              userInfo?.userType == "Test" ||
                              userInfo?.userType == "Ambassador" ||
                              subsOrders?.length > 0
                            ) {
                              localStorage.setItem("couponValue", 0);
                              setCouponValue(null);
                              window.alert(
                                "Coupon is not applicable for subscriptions and special users"
                              );
                              couponRef.current.value = null;
                            } else {
                              setoverlay(<OverlayEditSub />);

                              setShow(true);
                              // setCouponDiscount(couponValue);
                              axios
                                .post(
                                  `${process.env.REACT_APP_PROXY_URL}/api/discount/apply-discount`,
                                  {
                                    coupon: couponValue,
                                    userId: userInfo?.id,
                                  },
                                  config
                                )
                                .then((res) => {
                                  console.log(
                                    "apply-discount-response",
                                    res.data
                                  );
                                  setCouponDiscount(res.data.percentOff);
                                  localStorage.setItem(
                                    "couponValue",
                                    res.data.percentOff
                                  );
                                  setShow(false);
                                })
                                .catch((err) => {
                                  setShow(false);
                                  window.alert(err.response.data.message);
                                  setCouponDiscount(undefined);
                                  localStorage.setItem("couponValue", 0);
                                  setCouponValue(null);
                                  couponRef.current.value = null;
                                });
                            }
                          }}
                        >
                          Apply
                        </span>
                      </div>
                      <br />
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
                          {subsOrders?.length > 0 ? (
                            <>
                              <b style={{ color: "red" }}>*</b>Discount
                            </>
                          ) : (
                            <>Discount</>
                          )}
                        </div>
                        <div
                          style={{
                            textAlign: "right",
                            width: "50%",
                            color: "#757575",
                          }}
                        >
                          {/* {userInfo?.userType=="Individual"?(<>$00.00</>):(<></>)} */}
                          {userInfo?.userType == "Individual" &&
                          userInfo?.userMetaData?.firstPurchase == false &&
                          !couponDiscount ? (
                            <>$00.00</>
                          ) : (
                            <></>
                          )}
                          {userInfo?.userType == "Individual" &&
                          userInfo?.userMetaData?.firstPurchase == false &&
                          couponDiscount ? (
                            <>
                              <span style={{ color: "red" }}>
                                {couponDiscount}%
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
                          !couponDiscount ? (
                            <span style={{ color: "red" }}>
                              <b style={{ color: "red" }}>**</b>
                              {userInfo?.userMetaData?.discountPercent}%
                            </span>
                          ) : (
                            <></>
                          )}
                          {userInfo?.userType == "Individual" &&
                          userInfo?.userMetaData?.firstPurchase == true &&
                          couponDiscount ? (
                            <span style={{ color: "red" }}>
                              <b style={{ color: "red" }}>**</b>
                              {userInfo?.userMetaData?.discountPercent +
                                couponDiscount}
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
                              {
                                userInfo?.userMetaData?.test
                                  ?.discountPercentOrder
                              }
                              %
                            </span>
                          ) : (
                            <></>
                          )}
                          {userInfo?.userType == "" ? <>$00.00</> : <></>}
                          {userInfo?.userType == "Individual" &&
                          !userInfo?.userMetaData &&
                          !couponDiscount ? (
                            <>$00.00</>
                          ) : (
                            <></>
                          )}
                          {userInfo?.userType == "Individual" &&
                          !userInfo?.userMetaData &&
                          couponDiscount ? (
                            <>
                              <span style={{ color: "red" }}>
                                {couponDiscount}%
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
                          Shipping
                        </div>
                        <div
                          style={{
                            textAlign: "right",
                            width: "50%",
                            color: "#757575",
                          }}
                        >
                          Calculated in next step
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
                          Estimated Tax
                        </div>
                        <div
                          style={{
                            textAlign: "right",
                            width: "50%",
                            color: "#757575",
                          }}
                        >
                          {/* ${(taxingNormal + taxingSubs).toFixed(2)} */}
                          Calculated in next step
                        </div>
                      </div>
                    </div>
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
                      {/* <div class="sub-tot">${totalPrice.toFixed(2)}</div> */}
                      <div
                        className="review-leave-ship-pay-ord"
                        style={{ width: "50%", textAlign: "right" }}
                      >
                        ${totalProceToBeDisplayedOnUi?.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div class="sales-amt-shipping" style={{ fontSize: "17px" }}>
                    {userInfo?.userType == "Individual" &&
                    userInfo?.userMetaData?.firstPurchase == false ? (
                      <></>
                    ) : (
                      <></>
                    )}
                    {userInfo?.userType == "Veteran" ? (
                      <span style={{ color: "red" }}>
                        <b style={{ color: "red" }}>**</b>Military/Military
                        Vets/First Responders discount
                      </span>
                    ) : (
                      <></>
                    )}
                    {userInfo?.userType == "Employee" ? (
                      <span style={{ color: "red" }}>
                        <b style={{ color: "red" }}>**</b>
                        Special discount
                      </span>
                    ) : (
                      <></>
                    )}
                    {userInfo?.userType == "Individual" &&
                    userInfo?.userMetaData?.firstPurchase == true ? (
                      <span style={{ color: "red" }}>
                        <b style={{ color: "red" }}>**</b>AmbassadorReferral
                        discount
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
                    )}
                    {userInfo?.userType == "Test" ? (
                      <span style={{ color: "red" }}>
                        <b style={{ color: "red" }}>**</b>
                        {userInfo?.userType} discount
                      </span>
                    ) : (
                      <></>
                    )}
                    {userInfo?.userType == "" ? <></> : <></>}
                  </div>
                  <div
                    class="sales-amt-shipping"
                    style={{ fontSize: "16px", paddingTop: "10px" }}
                  >
                    {subsOrders?.length > 0 ? (
                      <>
                        <b style={{ color: "red" }}>*</b>Relevant discount will
                        be applied from the second shipment onwards.
                      </>
                    ) : (
                      ""
                    )}
                  </div>

                  <div id="continue-mobile" class="row">
                    <div class="sales-amt-shipping">
                      <b style={{ color: "orange" }}>*</b>We donate 1% of
                      revenues to Nonprofits that work with veterans. Thanks for
                      your support.
                    </div>
                    <div>
                <div id="truemed-prequalify" style={{fontSize:"16px",fontWeight:"bold"}} data-public-id="tm_qual_lwihwute1u"> </div>
                </div>
                    <div class="continue-btn">
                    {billingTaxError?<span style={{ color: "red", paddingBottom: "10px" }}>
                        {billingTaxError}
                      </span>:<span style={{ color: "red", paddingBottom: "10px" }}>
                        {taxError}
                      </span>}
                      <input
                        style={
                          cartData?.length < 1 || !cartData
                            ? { display: "none" }
                            : { display: "block" }
                        }
                        class="product-btn-default-cart"
                        type="submit"
                        value="CONTINUE"
                      ></input>
                    </div>
                  </div>
                  <br />
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
        </section>
      </form>
      {/* <button onClick={testclick}>testclick</button> */}
    </div>
  );
};

export default ContactDetail;
 