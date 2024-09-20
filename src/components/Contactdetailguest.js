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
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Paypala from "../images/bigpay.png";
import React, { useState, useEffect } from "react";
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
const ContactDetailGuest = ({ history, match, location }) => {
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
  const [extra, setExtra] = useState(false);
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
  const [show, setShow] = useState(false);
  const [taxing, setTaxing] = useState(0);
  const [calcTax, setCalcTax] = useState(false);
  const [taxError, setTaxError] = useState();
  const [billingTaxError , setBillingTaxError] = useState();
  const [overlay, setoverlay] = useState();
  const [couponValue, setCouponValue] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(undefined);
  
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
    localStorage.setItem("couponValue", 0);
  }, []);
  console.log(cartItems);
  var sumofcans = 0;
  const cans = cartItems.map((val) => val.numberOfCans * val.qty);
  let i = 0;
  for (i = 0; i < cans.length; i++) {
    // console.log(cans[i]);
    sumofcans += cans[i];
  }

  // console.log(sumofcans);
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

  useEffect(() => {
    if (!cartItems.length) {
      history.push("/");
    }
  }, [cartItems, history]);

  useEffect(() => {
    if (cartItems) {
      setTotalItems(cartItems.reduce((acc, item) => acc + item.qty, 0));
    }
  }, [cartItems]);

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
      history.push(`/shippingguest/${order._id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, history]);

  // All prices, tax is randomly  assigned
  cart.itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  // cart.shippingPrice = shippingPrice;
  cart.taxPrice = 0.0 * cart.itemsPrice;
  cart.totalPrice =
    cart?.itemsPrice +
    taxing +
    Number(sppp) -
    cart?.itemsPrice * (Number(localStorage.getItem("couponValue")) / 100);

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

  const config = userInfo?.isSocialLogin
    ? {
        headers: {
          "Content-Type": "application/json",
          Authorization: `SocialLogin ${userInfo?.id}`,
        },
      }
    : {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo?.accessToken}`,
        },
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // ReactGA.event({
    //   category: "Checkout(Guest)",
    //   action: `Proceeding for Payment`,
    //   label: "tecton drink",
    //   value: `$${(Number((cart.totalPrice+taxing).toFixed(2)))}`,
    // })
    // dispatch(
    //   createOrder({
    //     orderItems: cartItems,
    //     shippingAddress,
    //     billingAddress,
    //     paymentMethod,
    //     itemsPrice: cart.itemsPrice,
    //     shippingPrice: sppp,
    //     taxPrice: cart.taxPrice,
    //     totalPrice: cart.totalPrice,
    //     userType:user?.userType
    //   })
    // );
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
    
        ).then(()=>{
      if (sumofcans > 12) {
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
              couponCode: couponValue,
              shippingAddress: {
                address: address,
                email: email,
                city: city,
                state: state,
                postalCode: postalCode,
                firstName: firstName,
                lastName: lastName,
              },
              lineItems: cartItems,
            }
          )
          .then((res) => {
            setTaxing(res.data.data.reduce((acc, item) => acc + item.tax, 0));
            localStorage.setItem(
              "ST",
              res.data.data.reduce((acc, item) => acc + item.tax, 0).toFixed(2)
            );
            // setShow(false);
            setTaxError("");
            axios
              .post(
                `${process.env.REACT_APP_PROXY_URL}/api/orders/`,
                {
                  orderItems: cartItems,
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
                  joinTheExtClub: extra,
                  paymentMethod: "Credit/Debit Card",
                  itemsPrice: cart.itemsPrice,
                  shippingPrice: 0,
                  taxPrice: taxing,
                  totalPrice: Number(cart?.totalPrice.toFixed(2)),
                  userType: "Guest",
                  couponCode: couponValue,
                  discountPercent: couponDiscount,
                },
                config
              )
              .then((res) => history.push(`shippingguest/${res.data._id}`));
  
            dispatch(
              saveShippingAddress({
                firstName,
                lastName,
                email,
                address,
                city,
                postalCode,
                state,
                apt,
                phoneNo,
                country,
              })
            );
            dispatch(
              saveBillingAddress({
                firstName: billingfirstName || firstName,
  
                lastName: billinglastName || lastName,
  
                phoneNo: billingphoneNo || phoneNo,
  
                address: billingaddress || address,
  
                apt: billingapt || apt,
  
                city: billingcity || city,
  
                state: billingstate || state,
  
                country: billingcountry || country,
  
                postalCode: billingpostalCode || postalCode,
              })
            );
          })
          .catch((err) => {
            setTaxError(err?.response?.data?.message);
            setShow(false);
            setCalcTax(false);
          });
      }
      if (sumofcans <= 12) {
        setCalcTax(true);
        localStorage.setItem("sp", ShippingValueFromApi);
        localStorage.setItem("sm", "Standard shipping");
        setsppp(ShippingValueFromApi);
        setoverlay(<OverlayEditSub />);
  
        setShow(true);
        axios
          .post(
            `${process.env.REACT_APP_PROXY_URL}/api/avalara/create-transaction`,
            {
              shippingPrice: ShippingValueFromApi,
              couponCode: couponValue,
              shippingAddress: {
                address: address,
                email: email,
                city: city,
                state: state,
                postalCode: postalCode,
                firstName: firstName,
                lastName: lastName,
              },
              lineItems: cartItems,
            }
          )
          .then((res) => {
            setTaxing(res.data.data.reduce((acc, item) => acc + item.tax, 0));
            localStorage.setItem(
              "ST",
              res.data.data.reduce((acc, item) => acc + item.tax, 0).toFixed(2)
            );
            // setShow(false);
            setTaxError("");
            axios
              .post(
                `${process.env.REACT_APP_PROXY_URL}/api/orders/`,
                {
                  orderItems: cartItems,
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
                  joinTheExtClub: extra,
                  paymentMethod: "Credit/Debit Card",
                  itemsPrice: cart.itemsPrice,
                  shippingPrice: ShippingValueFromApi,
                  taxPrice: taxing,
                  totalPrice: Number(cart?.totalPrice.toFixed(2)),
                  userType: "Guest",
                  couponCode: couponValue,
                  discountPercent: couponDiscount,
                },
                config
              )
              .then((res) => history.push(`shippingguest/${res.data._id}`));
  
            dispatch(
              saveShippingAddress({
                firstName,
                lastName,
                email,
                address,
                city,
                postalCode,
                state,
                apt,
                phoneNo,
                country,
              })
            );
            dispatch(
              saveBillingAddress({
                firstName: billingfirstName || firstName,
  
                lastName: billinglastName || lastName,
  
                phoneNo: billingphoneNo || phoneNo,
  
                address: billingaddress || address,
  
                apt: billingapt || apt,
  
                city: billingcity || city,
  
                state: billingstate || state,
  
                country: billingcountry || country,
  
                postalCode: billingpostalCode || postalCode,
              })
            );
          })
          .catch((err) => {
            setTaxError(err?.response?.data?.message);
            setShow(false);
            setCalcTax(false);
          });
      }
    }).catch(
      (error)=>{
        setShow(false);
        setBillingTaxError(error.response.data.message)
      }
    )
  };
  const handleChange = (e) => {
    // setPaymentMethod(e.target.value);
    // dispatch(
    //   saveShippingAddress({
    //     firstName,
    //     lastName,
    //     email,
    //     address,
    //     city,
    //     postalCode,
    //     state,
    //     apt,
    //     phoneNo,
    //     country,
    //   })
    // );
    // dispatch(
    //   saveBillingAddress({
    //       firstName :billingfirstName || firstName,
    //       lastName: billinglastName || lastName,
    //       phoneNo :billingphoneNo || phoneNo,
    //       address: billingaddress || address,
    //       apt: billingapt || apt,
    //       city :billingcity || city,
    //       state: billingstate || state,
    //       country: billingcountry || country,
    //       postalCode: billingpostalCode || postalCode
    //   })
    // )
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
    //       firstName :billingfirstName,
    //       lastName: billinglastName,
    //       phoneNo :billingphoneNo,
    //       address: billingaddress,
    //       apt: billingapt,
    //       city :billingcity,
    //       state: billingstate,
    //       country: billingcountry,
    //       postalCode: billingpostalCode
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
  const fetchCart = cart;
  localStorage.setItem("fetchCart", JSON.stringify(fetchCart));
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

  let items = [
    {
      value1: `${shippingAddress?.state}`,
      value: itemsParent.filter(
        (val) => val.value1 === shippingAddress?.state
      )[0]?.value,
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

  // console.log(itemsParent.filter((val)=>val.value1===billingAddress?.state)[0]?.value)

  let itemsTwo = [
    // {
    //   value1: `${billingAddress?.state}`,
    //   value: itemsParent?.filter(
    //     (val) => val?.value1 === billingAddress?.state
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
  // useEffect(()=>{
  //   if(extra===false){
  //     localStorage.setItem("extra",true);
  //     setExtra(true)
  //   }else{
  //     localStorage.setItem("extra",false);
  //     setExtra(false)
  //   }
  // },[extra])
  console.log(extra)
  return (
    <div class="all-product">
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
              <Link className="clr-dot" style={{ color: "black" }}>
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
            <div class=" cont-act-cart col-sm-10">
              <div class="row">
                <div className="backtocart">
                  <Link to="/cart">Back to Cart</Link>
                </div>
              </div>
              <div className="userloginguest">
                <Link
                  to="/login"
                  style={{ color: "orange", textDecoration: "underline" }}
                >
                  Sign in
                </Link>{" "}
                or fill the information below for guest checkout
              </div>

              <div className="dontship">
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  style={{ color: "orange" }}
                />
                We don't ship to PO/APO addresses
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-7 col-sm-12">
                <div className="shippingdetailsnew">
                  <div class="review-leave-ship-pay-ord">
                    Shipping Information
                  </div>
                  <div id="product" class="single-product">
                    <div class="detail-ship">
                      <div class="col" style={{ marginBottom: "22px" }}>
                        <input
                          required
                          type="email"
                          class="form-control-ship "
                          placeholder="Email"
                          id="fname"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div
                        class="col-cvv"
                        style={{ marginTop: "-9px", display: "flex" }}
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
                      <div
                        class="col"
                        style={{ marginTop: "-2px", marginBottom: "12px" }}
                      >
                        <input
                          class="form-control-ship "
                          placeholder="Phone Number"
                          type="text"
                          name="phoneNo"
                          value={phoneNo}
                          pattern="^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$"
                          title="Please Enter valid Phone number"
                          // onInput={(e) => {
                          //   if (e.target.value.length > e.target.maxLength)
                          //     e.target.value = e.target.value.slice(
                          //       0,
                          //       e.target.maxLength
                          //     );
                          // }}
                          // maxlength={11}
                          required
                          onChange={(e) => setPhoneNo(e.target.value)}
                        />
                      </div>
                      {/* <div className="shippingupdates">*&nbsp; &nbsp;For Shipping Updates</div>
                      <br /> */}
                      <div class="col-country" style={{ marginTop: "-6px" }}>
                        <Input
                          type="text"
                          placeholder="Country"
                          // name="gameType"
                          required={true}
                          // autoComplete="on"
                          // {...register('gameType', { required: true })}
                          // error={errors.gameType}
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
                      <div
                        class="col"
                        style={{ marginBottom: "13px", marginTop: "-3px" }}
                      >
                        <input
                          class="form-control-ship "
                          style={{ marginTop: "-11px" }}
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
                      <div style={{ fontSize: "15px", marginTop: "10px" }}>
                        State:{" "}
                      </div>
                      <div
                        class="col-cvv"
                        style={{ marginTop: "9px", display: "flex" }}
                      >
                        <select
                          class="form-control-ship-exp"
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
                          class="form-control-ship-exp "
                          placeholder="City"
                          id="fname"
                          name="city"
                          value={city}
                          required
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                      <div
                        class="col"
                        style={{ marginTop: "-1px", marginBottom: "6px" }}
                      >
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
                      <div class="col" style={{ marginBottom: "13px" }}>
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
                        
                          <input
                            class="tik-tack"
                            type="checkbox"
                            checked={extra}
                            onClick={(e) => setExtra(!extra)}
                          />
                        
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
                        <div className="extradetails">
                          Same as Shipping Address
                        </div>
                      </div>

                      <br />
                      <div
                        class="detail-ship"
                        style={{ display: `${showbill}` }}
                      >
                        <br />
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

                        <div class="col" style={{ marginBottom: "7px" }}>
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

                        <div class="col" style={{ marginBottom: "7px" }}>
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

                        <div class="col">
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

                        <div class="col-country">
                          {/* <Input
        type="text"
        placeholder="State"
        // name="gameType"
        required={billingRequired}
        autoComplete="off"
        // autoComplete="on"
        // {...register('gameType', { required: true })}
        // error={errors.gameType}
        list="gameList"
        onChange={handleOnChange2}
        value={billingstate}
      />
      <datalist id="gameList">
        {dataSource.map(item => (
          <option key={item} value={item} />
        ))}
      </datalist> */}
                          <div style={{ marginTop: "9px", fontSize: "15px" }}>
                            State:
                          </div>
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
                            style={{ marginTop: "6px" }}
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

                        <div class="col-country" style={{ marginTop: "6px" }}>
                          <Input
                            type="text"
                            placeholder="Country"
                            // name="gameType"
                            required={billingRequired}
                            // autoComplete="on"
                            // {...register('gameType', { required: true })}
                            // error={errors.gameType}
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

                        <div class="col" style={{ marginTop: "-10px" }}>
                          <input
                            class="form-control-ship "
                            placeholder="Phone Number"
                            type="text"
                            name="phoneNo"
                            value={billingphoneNo}
                            pattern="^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$"
                            title="Please Enter valid Phone number"
                            // onInput={(e) => {
                            //   if (e.target.value.length > e.target.maxLength)
                            //     e.target.value = e.target.value.slice(
                            //       0,
                            //       e.target.maxLength
                            //     );
                            // }}
                            // maxlength={11}
                            required={billingRequired}
                            onChange={(e) => setbillingPhoneNo(e.target.value)}
                          />
                        </div>
                        <br />

              
                      </div>
                    </div>
                  </div>
                  <div id="continue-descktop" className="row">
                    <div class="sales-amt-shipping">
                      <b style={{ color: "orange" }}>*</b> We donate 1% of
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
                        class="product-btn-default-cart"
                        type="submit"
                        value="CONTINUE"
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
                                  style={{ width: "53%", textAlign: "left" }}
                                >
                                  <img
                                    style={{ width: "98%" }}
                                    src={item?.image}
                                    alt=""
                                  />
                                </div>

                                <div style={{ width: "53%" }}>
                                  <h3 class="product-great">{item?.name}</h3>
                                  <div class="product-kgreat">
                                    <h6>12 FL OZ • Ketone Hydration</h6>
                                  </div>
                                  <div class="product-kgreat">
                                    <h6 style={{ marginTop: "0px" }}>
                                      Qty: {item?.qty}
                                    </h6>
                                  </div>
                                  <div>
                                    <h3 class="product-price-pay-cart-guest">
                                      ${(item?.price * item?.qty).toFixed(2)}
                                    </h3>
                                  </div>
                                </div>
                                <div
                                  style={{ width: "38%", textAlign: "right" }}
                                >
                                  <div className="cart-button-edit">
                                    <span
                                      style={{
                                        border: "1px solid #75757575",
                                        backgroundColor: "white",
                                        borderRadius: "3px",
                                        paddingLeft: "6px",
                                        paddingBottom: "4px",
                                        paddingRight: "6px",
                                        paddingTop: "6px",
                                      }}
                                    >
                                      <span
                                        style={{
                                          cursor: "pointer",
                                          border: "none",
                                          display: item.qty < 2 ? "none" : "",
                                        }}
                                        disabled={item.qty === 1}
                                        onClick={() => {
                                          dispatch(
                                            addItem(
                                              item.product,
                                              Number(item.qty - 1)
                                            )
                                          );
                                          setCalcTax(false);
                                        }}
                                      >
                                        {" "}
                                        <FontAwesomeIcon
                                          icon={faAngleLeft}
                                          style={{
                                            color: "black",
                                            fontSize: "12px",
                                            paddingRight: "5px",
                                          }}
                                        />
                                      </span>{" "}
                                      &nbsp;{" "}
                                      <span
                                        style={{
                                          color: "black",
                                          fontSize: "0.9rem",
                                        }}
                                      >
                                        {item?.qty}
                                      </span>{" "}
                                      &nbsp;{" "}
                                      <span
                                        style={{
                                          cursor: "pointer",
                                          border: "none",
                                        }}
                                        onClick={() => {
                                          dispatch(
                                            addItem(
                                              item.product,
                                              Number(item.qty + 1)
                                            )
                                          );
                                          setCalcTax(false);
                                        }}
                                      >
                                        <FontAwesomeIcon
                                          icon={faAngleRight}
                                          style={{
                                            color: "black",
                                            fontSize: "12px",
                                            paddingLeft: "5px",
                                          }}
                                        />
                                      </span>
                                    </span>
                                  </div>
                                  <div class="opt-three-pay-cart-remove-guest">
                                    <br />
                                    <p
                                      style={{
                                        color: "orange",
                                        cursor: "pointer",
                                        marginBottom: "0px",
                                      }}
                                      onClick={() => {
                                        handleRemoveFromCart(item.product);
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
                  {/* </div> */}
                  {/* <div class="cart-sub-hr-line">
									<hr ></hr>
								</div> */}
                </div>
                <br />

                <div class="order-detail">
                  <div class="row">
                    {/* <div class="sumup col-sm-10 col-md-12 ">
										<div class="review-leave-ship-pay-ord ">
											Summary
										</div>
										<div class="col-cnfm">
											<input type="text" class="form-control-ship-exp-cnfm " placeholder="Add a promo code" id="fname" name="fname" />
											<input class="product-btn-default-cnfm" type="submit" value="Apply" ></input>
										</div>
									</div> */}
                  </div>
                  <div class="sub-total-cnfm">
                    <div class="cart-sub-hr-line">
                      <hr style={{ marginTop: "0px" }}></hr>
                      <div class="review-leave-ship-pay-ord">Summary</div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {/* <select class="form-control-ship-new" style={{width:"85%"}} onChange={(e)=>{setCouponValue(Number(e.target.value))}}>
    <option disabled selected>Add a Promo Code</option>
    {discounts?.map((val)=>     <option value={val?.discountPercentage}>{val?.couponCode}</option>
 )}
  </select> */}
                        <input
                          style={{ width: "85%" }}
                          type="text"
                          class="form-control-ship "
                          placeholder="Add a Promo Code"
                          // id="fname"
                          // name="address"
                          // value={billingaddress}
                          // required={billingRequired}
                          onChange={(e) => setCouponValue(e.target.value)}
                        />
                        <span
                          style={{
                            background: "#FFFFFF",
                            padding: "8px",
                          
                            border: "1px solid",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setCalcTax(false);

                            setoverlay(<OverlayEditSub />);

                            setShow(true);
                            // setCouponDiscount(couponValue);
                            axios
                              .post(
                                `${process.env.REACT_APP_PROXY_URL}/api/discount/apply-discount`,
                                {
                                  coupon: couponValue,
                                  userId: null,
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
                              });
                          }}
                        >
                          Apply
                        </span>
                      </div>
                      <br />
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
                          {/* {userInfo?.userType=="Individual"?(<>$00.00</>):(<></>)} */}
                          {/* 
                          <span style={{ color: "red" }}>
                        {localStorage.getItem("couponValue")}%
                      </span> */}
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
                          Calculated in next step
                        </div>
                      </div>
                    </div>
                    {/* old value design */}
                    {/* <div class="amount-totl">
                      <br />
                      {cartItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toLocaleString("en-IN", {
                          maximumFractionDigits: 2,
                          style: "currency",
                          currency: "USD",
                        })}
                      <br />
                      <span style={{ color: "red" }}>
                        {localStorage.getItem("couponValue")}%
                      </span>
                      <br />${sppp}
                      <br />${taxing.toFixed(2)}
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
                        $
                        {(
                          cart?.itemsPrice -
                          cart?.itemsPrice *
                            (Number(localStorage.getItem("couponValue")) / 100)
                        ).toFixed(2)}
                      </div>
                    </div>
                    <div id="continue-mobile" className="row">
                      <div class="sales-amt-shipping">
                        <b style={{ color: "orange" }}>*</b> We donate 1% of
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
                          class="product-btn-default-cart"
                          type="submit"
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
        <br />
        <br />
      </form>
    </div>
  );
};

export default ContactDetailGuest;
