import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { payOrder } from "../actions/orderActions";
import { savePaymentMethod } from "../actions/cartActions";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"; // for stripe CC component
import Message from "../skeleton/Message";
import Overlay from "./Overlay";
import OverlayEditSub from "./OverlayEditSub";



const CheckoutForm = ({ price, orderID }) => {
  
// store card value seperate
const [cardNumber, setCardNumber] = useState('');
const [cardexp, setCardexp] = useState("")
const [cardCcv, setCardccv] = useState("")
const [payData, setPayData] = useState();
const [CvvFromDropdown,setCvvFromDropdown] = useState();
const [dropdownSelected,setDropdownSelected] = useState(false);

// display card number 
const handleChangecn = event => {
  setCardNumber(event.target.value);

  console.log('card number:', event.target.value);
};

// display card number 
const handleChangece = event => {
  setCardexp(event.target.value);

  console.log(' expiry :', event.target.value);
};

// display card number 
const handleChangecv = event => {
  setCardccv(event.target.value);

  console.log('ccv :', event.target.value);
};

// save card checkbox
const [btnchecked, setBtnChecked] = useState(false);
const saveCard = (e) => {
  e.preventDefault();
  setBtnChecked(!e.target.value)
  axios.post(`${process.env.REACT_APP_PROXY_URL}/api/paymentMethod/attach-payment-method`);
}

// checkout card form code  end 

  const [error, setError] = useState(""); // from the stripe component itself
  const [overlay, setoverlay] = useState();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [clientSecret, setClientSecret] = useState(""); // from the payment intent sent from server
  const stripe = useStripe();
  const elements = useElements();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { firstName, lastName } = userInfo;
  // console.log(userInfo);
  const [subs,setSubs] = useState();
  const [norm,setNorm] = useState();
  const [neworderdetails,setneworderdetails] = useState();
  const [ stripid,setstripeid] = useState();
  const [Normsubs ,setNormsubs] =useState(false);
  const [Subsnorm ,setSubsnorm] = useState(false);

  const [email, setEmail] = useState(userInfo?.email);
  const [billingaddress, setbillingAddress] = useState();
  const [billingcity, setbillingCity] = useState();
  const [billingcountry, setbillingCountry] = useState("United States");
  const [billingstate, setbillingState] = useState(userInfo?.billingAddress?.state);
  const [billingphoneNo, setbillingPhoneNo] = useState();
  const [apt, setApt] = useState(userInfo?.shippingAddress?.address2);
  const [postalCode, setPostalCode] = useState(userInfo?.shippingAddress?.zip);
  const [hidebill, setHidebill] = useState()
  const [showbill, setshowbill] = useState()
  const [isActive1, setIsActive1] = useState(false);
  const [cvvShow, setCvvShow] = useState(false);
  

  const billfunction = (e) => {

    
    e.preventDefault();
    // if (cardsData === null) {
    //   setshowbill("block")
    //   setHidebill("none")
    // }
    // if (cardsData !== null) {
    //   setshowbill("none")
    //   setHidebill("block")
    // }
    setshowbill("block");
    setErrFromDropdownCard("");
    setEnterCardDetailsError("")
  }
  


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
  useEffect(()=>{
		axios.get(`${process.env.REACT_APP_PROXY_URL}/api/orders/${orderID}`, config).then((res)=>setSubs(res.data.orderItems.filter((val)=>val.subscription===true)))
	},[]);
  useEffect(()=>{
		axios.get(`${process.env.REACT_APP_PROXY_URL}/api/orders/${orderID}`, config).then((res)=>setNorm(res.data.orderItems.filter((val)=>val.subscription===false)))
	},[]);
  useEffect(()=>{
		axios.get(`${process.env.REACT_APP_PROXY_URL}/api/orders/${orderID}`, config).then((res)=>setneworderdetails(res.data))
	},[])
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_PROXY_URL}/api/users/${userInfo.id}`, config).then((res)=>setstripeid(res?.data?.stripeCustomerId))
  },[])
  
  // STEP 1: create a payment intent and getting the secret
  // let getPrice = Math.round(price);
  // console.log(getPrice)
  if(price==0){
    var getPrice = 0;
  }
  if(price>0){
    // let normalOrdersPrice=price-(Number(localStorage.getItem("sp"))*100);
    let normalOrdersPrice=price;
    console.log("cart-price-for-normal-orders-before-discount",normalOrdersPrice/100)
    let newgetprice=Number((price+(Number(localStorage?.getItem("STNormal"))*100)))
    // if(userInfo?.userMetaData?.firstPurchase===true){

    //   var getPrice = Math.round(newgetprice-(0.05*newgetprice))
    // }

    if(userInfo?.userType=="Individual"){
      // var totalPrice = totalPrice-(((userInfo?.userMetaData?.discountPercent)/100)*totalPrice)
      var discountedPrice = Math.round(normalOrdersPrice-(normalOrdersPrice*((Number(localStorage.getItem("couponValue")))/100))-(((userInfo?.userMetaData?.firstPurchase==true?(userInfo?.userMetaData?.discountPercent):(0))/100)*normalOrdersPrice))
      var getPrice = Math.round(discountedPrice+(Number(localStorage?.getItem("STNormal"))*100)+(Number(localStorage.getItem("sp"))*100))
      
    }
    if(userInfo?.userType=="Veteran"){
      // var totalPrice = totalPrice-(((userInfo?.userMetaData?.veteran?.discountPercentOrder)/100)*totalPrice)
      var discountedPrice = Math.round(normalOrdersPrice-((((userInfo?.userMetaData?.veteran?.discountPercentOrder)/100))*normalOrdersPrice))
      var getPrice = Math.round(discountedPrice+(Number(localStorage?.getItem("STNormal"))*100)+(Number(localStorage.getItem("sp"))*100))
    }
    if(userInfo?.userType=="Employee"){
      var totalPrice = totalPrice-(((userInfo?.userMetaData?.employee?.discountPercentOrder)/100)*totalPrice)
      var discountedPrice = Math.round(normalOrdersPrice-(((userInfo?.userMetaData?.employee?.discountPercentOrder)/100)*normalOrdersPrice))
      var getPrice = Math.round(discountedPrice+(Number(localStorage?.getItem("STNormal"))*100)+(Number(localStorage.getItem("sp"))*100))
    }
    if(userInfo?.userType=="Ambassador"){
      // var totalPrice = totalPrice-(((userInfo?.userMetaData?.ambassador?.discountPercentOrder)/100)*totalPrice)
      var discountedPrice = Math.round(normalOrdersPrice-(((userInfo?.ambassadorMetaData?.discountPercent)/100)*normalOrdersPrice))
      var getPrice = Math.round(discountedPrice+(Number(localStorage?.getItem("STNormal"))*100)+(Number(localStorage.getItem("sp"))*100))
    }
    if(userInfo?.userType=="Test"){
      var totalPrice = totalPrice-(((userInfo?.userMetaData?.test?.discountPercentOrder)/100)*totalPrice)
      var discountedPrice = Math.round(normalOrdersPrice-(((userInfo?.userMetaData?.test?.discountPercentOrder)/100)*normalOrdersPrice))
      var getPrice = Math.round(discountedPrice+(Number(localStorage?.getItem("STNormal"))*100)+(Number(localStorage.getItem("sp"))*100))
    }
    // if(userInfo?.userType=="Individual"){
    //   var totalPrice = totalPrice
    //   var discountedPrice = Math.round(normalOrdersPrice)
    //   var getPrice = Math.round(discountedPrice+(Number(localStorage?.getItem("STNormal"))*100)+(Number(localStorage.getItem("sp"))*100))
    // }
    if(userInfo?.userType==""){
      var totalPrice = totalPrice
      var discountedPrice = Math.round(normalOrdersPrice-(normalOrdersPrice*((Number(localStorage.getItem("couponValue")))/100)))
      var getPrice = Math.round(discountedPrice+(Number(localStorage?.getItem("STNormal"))*100)+(Number(localStorage.getItem("sp"))*100))
    }

    // else{
    //   var getPrice = Math.round(newgetprice)
    // }
    // console.log(discountedPrice)
    
  }


  let newgetpriceSub=Number(localStorage?.getItem("STSubs"))
  // console.log(discountedPrice)
  console.log("shippingPrice-on-checkoutForm.js",Number(localStorage.getItem("sp")))
  console.log("tax-for-normal-orders",Number(localStorage?.getItem("STNormal")))
  console.log("price-sent-to-stripe-for-normal-orders",getPrice/100)
  
  const handleSubmit = async (e) => {

    e.preventDefault();
    
setoverlay(<Overlay />);
        setShow(true);
    if(cardsData===null){
      
  


    if (btnchecked === true) {
      
      axios.post(`${process.env.REACT_APP_PROXY_URL}/api/paymentMethod/attach-payment-method`, {

        customerId: stripid,

        cardNumber: cardNumber,

        expMonth: cardexp?.split("/")[0],

        expYear: cardexp?.split("/")[1],

        cvc: cardCcv,

        cardName: firstName,

        savePaymentMethod:true,

        billingAddress: {

          city: billingcity,

          State: billingstate,

          country: "US",

          postalCode: postalCode,

          address: billingaddress,

          apt: apt,

        },

        firstName: firstName,

        lastName: lastName,

        email: email



      }, config).then((res)=>{if(res){
        if(norm?.length>0 && subs.length<1){
          axios.post(`${process.env.REACT_APP_PROXY_URL}/api/orders/stripe-payment`, {
            price: getPrice,
            email: userInfo.email,
            orderID: orderID,
            firstName: firstName,
            lastName: lastName,
            tectonUserId: userInfo.id,
            stripeCustomerId: stripid,
            paymentMethod: res.data.data.id,
            savePaymentMethod: true,
            postalCode: postalCode,
          }, config).then((res)=>{if(res.data.message=="order has been placed successfully"){
            
            window.dataLayer.push({ event: 'purchase', 
    ecommerce: {
      transaction_id:orderID,
       value:neworderdetails?.totalPrice,
        tax:neworderdetails?.taxPrice,
         shipping:neworderdetails?.shippingPrice,
          currency:"USD",
           items:neworderdetails?.orderItems?.map((val)=>{ 
            let person={
              item_name: val.name,
                item_brand: "TECTON", 
                item_category: "Drink",
                 price: val.price,
                 quantity: val.qty, } 
     return person }) } });
            window.location = `/Summary/${orderID}`}
          else{
            window.alert("Order failed")
          }})
        }
        if(norm?.length<1 && subs?.length>0){
          axios.post(
            `${process.env.REACT_APP_PROXY_URL}/api/subscription/stripe-payment-subscription`,
            {
              email:userInfo.email,
      
              firstName:userInfo.firstName,
        
              lastName:userInfo.lastName,
        
              paymentMethod:res.data.data.id,
      
              orderId:orderID,
        
              stripeCustomerId:stripid,
        
              user:userInfo.id,
        
              // items:[
              //   {
              //     price:subs?.filter((val)=>val.stripePriceId.id).map((valsh)=>valsh),
              //     quantity:subs?.filter((vals)=>vals.qty)
              //   }
              // ],
              // items:subs?.map((val)=>{val.stripePriceId.id}),
              items:subs?.map((val)=>{return {price:(val.stripePriceId.id),quantity:(val.qty)}}),
        
              orderItems:subs,
        
              shippingAddress:{
                firstName: userInfo.firstName ,
                lastName: userInfo.lastName,
                email: userInfo.email,
                address: userInfo.shippingAddress.address1,
                city: userInfo.shippingAddress.city,
                postalCode: userInfo.shippingAddress.zip,
                country: userInfo.shippingAddress.country,
                state: userInfo.shippingAddress.state,
                phoneNo: userInfo.phoneNo,
                apt: userInfo.shippingAddress.address2,
              },
        
              itemsPrice:neworderdetails.itemsPrice,
        
              taxPrice:newgetpriceSub,
        
              shippingPrice:neworderdetails.shippingPrice,
        
              billingAddress:neworderdetails.billingAddress,
        
              totalPrice:neworderdetails.totalPrice,
        
              userType:neworderdetails.userType,
      
              refCode:userInfo?.userMetaData?.refCode,
              
              discountPercent:userInfo?.userType=="Individual"?(userInfo?.userMetaData?.firstPurchase==true?(userInfo?.userMetaData?.discountPercent):(0)):(userInfo?.userType=="Veteran"?(userInfo?.userMetaData?.veteran?.discountPercentOrder):(userInfo?.userType=="Employee"?(userInfo?.userMetaData?.employee?.discountPercentOrder):(userInfo?.userType=="Ambassador"?(userInfo?.ambassadorMetaData?.discountPercent):(userInfo?.userType=="Test"?(userInfo?.userMetaData?.test?.discountPercentOrder):(0))))),
      
              firstPurchase:userInfo?.userType=="Individual"?(userInfo?.userMetaData?.firstPurchase):(false)
      
            },config).then((res)=>{
              if(res.data.message=="Subscription Created"){
                
                window.dataLayer.push({ event: 'purchase', 
    ecommerce: {
      transaction_id:orderID,
       value:neworderdetails?.totalPrice,
        tax:neworderdetails?.taxPrice,
         shipping:neworderdetails?.shippingPrice,
          currency:"USD",
           items:neworderdetails?.orderItems?.map((val)=>{ 
            let person={
              item_name: val.name,
                item_brand: "TECTON", 
                item_category: "Drink",
                 price: val.price,
                 quantity: val.qty, } 
     return person }) } });
                window.location = `/Summary/${orderID}`}
                else{
                  window.alert("Order failed")
                }
            })
        }
        if(subs?.length>0 && norm?.length>0){
          axios.post(`${process.env.REACT_APP_PROXY_URL}/api/orders/stripe-payment`, {
            price: getPrice,
            email: userInfo.email,
            orderID: orderID,
            firstName: firstName,
            lastName: lastName,
            tectonUserId: userInfo.id,
            stripeCustomerId: stripid,
            paymentMethod: res.data.data.id,
            savePaymentMethod: true,
            postalCode: postalCode,
          }, config).then((res)=>{if(res.data.message=="order has been placed successfully"){setNormsubs(true)}
        else{
          window.alert("Order failed")
        }})
          axios.post(
            `${process.env.REACT_APP_PROXY_URL}/api/subscription/stripe-payment-subscription`,
            {
              email:userInfo.email,
      
              firstName:userInfo.firstName,
        
              lastName:userInfo.lastName,
        
              paymentMethod:res.data.data.id,
      
              orderId:orderID,
        
              stripeCustomerId:stripid,
        
              user:userInfo.id,
        
              // items:[
              //   {
              //     price:subs?.filter((val)=>val.stripePriceId.id).map((valsh)=>valsh),
              //     quantity:subs?.filter((vals)=>vals.qty)
              //   }
              // ],
              // items:subs?.map((val)=>{val.stripePriceId.id}),
              items:subs?.map((val)=>{return {price:(val.stripePriceId.id),quantity:(val.qty)}}),
        
              orderItems:subs,
        
              shippingAddress:{
                firstName: userInfo.firstName ,
                lastName: userInfo.lastName,
                email: userInfo.email,
                address: userInfo.shippingAddress.address1,
                city: userInfo.shippingAddress.city,
                postalCode: userInfo.shippingAddress.zip,
                country: userInfo.shippingAddress.country,
                state: userInfo.shippingAddress.state,
                phoneNo: userInfo.phoneNo,
                apt: userInfo.shippingAddress.address2,
              },
        
              itemsPrice:neworderdetails.itemsPrice,
        
              taxPrice:newgetpriceSub,
        
              shippingPrice:neworderdetails.shippingPrice,
        
              billingAddress:neworderdetails.billingAddress,
        
              totalPrice:neworderdetails.totalPrice,
        
              userType:neworderdetails.userType,
      
              refCode:userInfo?.userMetaData?.refCode,
              
              discountPercent:userInfo?.userType=="Individual"?(userInfo?.userMetaData?.firstPurchase==true?(userInfo?.userMetaData?.discountPercent):(0)):(userInfo?.userType=="Veteran"?(userInfo?.userMetaData?.veteran?.discountPercentOrder):(userInfo?.userType=="Employee"?(userInfo?.userMetaData?.employee?.discountPercentOrder):(userInfo?.userType=="Ambassador"?(userInfo?.ambassadorMetaData?.discountPercent):(userInfo?.userType=="Test"?(userInfo?.userMetaData?.test?.discountPercentOrder):(0))))),
      
              firstPurchase:userInfo?.userType=="Individual"?(userInfo?.userMetaData?.firstPurchase):(false)
      
            },config).then((res)=>{
              if(res.data.message=="Subscription Created"){setSubsnorm(true)}
              else{
                window.alert("Order failed")
              }
            })
          
        }
      }}).catch((err)=>{if(err){
        setShow(false);
            console.log(err);
            setEnterCardDetailsError("Invalid card details");
      }})

      

    };
  
     if(btnchecked===false){
      axios.post(`${process.env.REACT_APP_PROXY_URL}/api/paymentMethod/attach-payment-method`, {

        customerId: stripid,

        cardNumber: cardNumber,

        expMonth: cardexp?.split("/")[0],

        expYear: cardexp?.split("/")[1],

        cvc: cardCcv,

        cardName: firstName,

        savePaymentMethod:false,

        billingAddress: {

          city: billingcity,

          State: billingstate,

          country: "US",

          postalCode: postalCode,

          address: billingaddress,

          apt: apt,

        },

        firstName: firstName,

        lastName: lastName,

        email: email



      }, config).then((res)=>{if(res){
        if(norm?.length>0 && subs.length<1){
          axios.post(`${process.env.REACT_APP_PROXY_URL}/api/orders/stripe-payment`, {
            price: getPrice,
            email: userInfo.email,
            orderID: orderID,
            firstName: firstName,
            lastName: lastName,
            tectonUserId: userInfo.id,
            stripeCustomerId: stripid,
            paymentMethod: res.data.data.id,
            savePaymentMethod: false,
            postalCode: postalCode,
          }, config).then((res)=>{if(res.data.message=="order has been placed successfully"){
            
            window.dataLayer.push({ event: 'purchase', 
    ecommerce: {
      transaction_id:orderID,
       value:neworderdetails?.totalPrice,
        tax:neworderdetails?.taxPrice,
         shipping:neworderdetails?.shippingPrice,
          currency:"USD",
           items:neworderdetails?.orderItems?.map((val)=>{ 
            let person={
              item_name: val.name,
                item_brand: "TECTON", 
                item_category: "Drink",
                 price: val.price,
                 quantity: val.qty, } 
     return person }) } });
            window.location = `/Summary/${orderID}`}
          else{
            window.alert("Order failed")
          }
          })
        }
        if(norm?.length<1 && subs?.length>0){
          axios.post(
            `${process.env.REACT_APP_PROXY_URL}/api/subscription/stripe-payment-subscription`,
            {
              email:userInfo.email,
      
              firstName:userInfo.firstName,
        
              lastName:userInfo.lastName,
        
              paymentMethod:res.data.data.id,
      
              orderId:orderID,
        
              stripeCustomerId:stripid,
        
              user:userInfo.id,
        
              // items:[
              //   {
              //     price:subs?.filter((val)=>val.stripePriceId.id).map((valsh)=>valsh),
              //     quantity:subs?.filter((vals)=>vals.qty)
              //   }
              // ],
              // items:subs?.map((val)=>{val.stripePriceId.id}),
              items:subs?.map((val)=>{return {price:(val.stripePriceId.id),quantity:(val.qty)}}),
        
              orderItems:subs,
        
              shippingAddress:{
                firstName: userInfo.firstName ,
                lastName: userInfo.lastName,
                email: userInfo.email,
                address: userInfo.shippingAddress.address1,
                city: userInfo.shippingAddress.city,
                postalCode: userInfo.shippingAddress.zip,
                country: userInfo.shippingAddress.country,
                state: userInfo.shippingAddress.state,
                phoneNo: userInfo.phoneNo,
                apt: userInfo.shippingAddress.address2,
              },
        
              itemsPrice:neworderdetails.itemsPrice,
        
              taxPrice:newgetpriceSub,
        
              shippingPrice:neworderdetails.shippingPrice,
        
              billingAddress:neworderdetails.billingAddress,
        
              totalPrice:neworderdetails.totalPrice,
        
              userType:neworderdetails.userType,
      
              refCode:userInfo?.userMetaData?.refCode,
              
              discountPercent:userInfo?.userType=="Individual"?(userInfo?.userMetaData?.firstPurchase==true?(userInfo?.userMetaData?.discountPercent):(0)):(userInfo?.userType=="Veteran"?(userInfo?.userMetaData?.veteran?.discountPercentOrder):(userInfo?.userType=="Employee"?(userInfo?.userMetaData?.employee?.discountPercentOrder):(userInfo?.userType=="Ambassador"?(userInfo?.ambassadorMetaData?.discountPercent):(userInfo?.userType=="Test"?(userInfo?.userMetaData?.test?.discountPercentOrder):(0))))),
      
              firstPurchase:userInfo?.userType=="Individual"?(userInfo?.userMetaData?.firstPurchase):(false)
      
            },config).then((res)=>{
              if(res.data.message=="Subscription Created"){
                
                window.dataLayer.push({ event: 'purchase', 
    ecommerce: {
      transaction_id:orderID,
       value:neworderdetails?.totalPrice,
        tax:neworderdetails?.taxPrice,
         shipping:neworderdetails?.shippingPrice,
          currency:"USD",
           items:neworderdetails?.orderItems?.map((val)=>{ 
            let person={
              item_name: val.name,
                item_brand: "TECTON", 
                item_category: "Drink",
                 price: val.price,
                 quantity: val.qty, } 
     return person }) } });
                window.location = `/Summary/${orderID}`}
                else{
                  window.alert("Order failed")
                }
            })
        }
        if(subs?.length>0 && norm?.length>0){
          axios.post(`${process.env.REACT_APP_PROXY_URL}/api/orders/stripe-payment`, {
            price: getPrice,
            email: userInfo.email,
            orderID: orderID,
            firstName: firstName,
            lastName: lastName,
            tectonUserId: userInfo.id,
            stripeCustomerId: stripid,
            paymentMethod: res.data.data.id,
            savePaymentMethod: true,
            postalCode: postalCode,
          }, config).then((res)=>{if(res.data.message=="order has been placed successfully"){setNormsubs(true)}
        else{
          window.alert("Order failed")
        }
        })
          axios.post(
            `${process.env.REACT_APP_PROXY_URL}/api/subscription/stripe-payment-subscription`,
            {
              email:userInfo.email,
      
              firstName:userInfo.firstName,
        
              lastName:userInfo.lastName,
        
              paymentMethod:res.data.data.id,
      
              orderId:orderID,
        
              stripeCustomerId:stripid,
        
              user:userInfo.id,
        
              // items:[
              //   {
              //     price:subs?.filter((val)=>val.stripePriceId.id).map((valsh)=>valsh),
              //     quantity:subs?.filter((vals)=>vals.qty)
              //   }
              // ],
              // items:subs?.map((val)=>{val.stripePriceId.id}),
              items:subs?.map((val)=>{return {price:(val.stripePriceId.id),quantity:(val.qty)}}),
        
              orderItems:subs,
        
              shippingAddress:{
                firstName: userInfo.firstName ,
                lastName: userInfo.lastName,
                email: userInfo.email,
                address: userInfo.shippingAddress.address1,
                city: userInfo.shippingAddress.city,
                postalCode: userInfo.shippingAddress.zip,
                country: userInfo.shippingAddress.country,
                state: userInfo.shippingAddress.state,
                phoneNo: userInfo.phoneNo,
                apt: userInfo.shippingAddress.address2,
              },
        
              itemsPrice:neworderdetails.itemsPrice,
        
              taxPrice:newgetpriceSub,
        
              shippingPrice:neworderdetails.shippingPrice,
        
              billingAddress:neworderdetails.billingAddress,
        
              totalPrice:neworderdetails.totalPrice,
        
              userType:neworderdetails.userType,
      
              refCode:userInfo?.userMetaData?.refCode,
              
              discountPercent:userInfo?.userType=="Individual"?(userInfo?.userMetaData?.firstPurchase==true?(userInfo?.userMetaData?.discountPercent):(0)):(userInfo?.userType=="Veteran"?(userInfo?.userMetaData?.veteran?.discountPercentOrder):(userInfo?.userType=="Employee"?(userInfo?.userMetaData?.employee?.discountPercentOrder):(userInfo?.userType=="Ambassador"?(userInfo?.ambassadorMetaData?.discountPercent):(userInfo?.userType=="Test"?(userInfo?.userMetaData?.test?.discountPercentOrder):(0))))),
      
              firstPurchase:userInfo?.userType=="Individual"?(userInfo?.userMetaData?.firstPurchase):(false)
      
            },config).then((res)=>{
              if(res.data.message=="Subscription Created"){setSubsnorm(true)}
              else{
                window.alert("Order failed")
              }
            })
          
        }
      }}).catch((err)=>{if(err){
        setShow(false);
            console.log(err);
            setEnterCardDetailsError("Invalid card details");
      }})

     }

    
   
    }
    
    if(cardsData!==null){
      if(dropdownSelected===true){
       if(norm?.length>0 && subs.length<1){
        axios.post(`${process.env.REACT_APP_PROXY_URL}/api/orders/stripe-payment`, {
          price: getPrice,
          email: userInfo.email,
          orderID: orderID,
          firstName: firstName,
          lastName: lastName,
          tectonUserId: userInfo.id,
          stripeCustomerId: stripid,
          paymentMethod: payData,
          savePaymentMethod: true,
          postalCode: postalCode,
        }, config).then((res)=>{if(res.data.message=="order has been placed successfully"){
          
          window.dataLayer.push({ event: 'purchase', 
    ecommerce: {
      transaction_id:orderID,
       value:neworderdetails?.totalPrice,
        tax:neworderdetails?.taxPrice,
         shipping:neworderdetails?.shippingPrice,
          currency:"USD",
           items:neworderdetails?.orderItems?.map((val)=>{ 
            let person={
              item_name: val.name,
                item_brand: "TECTON", 
                item_category: "Drink",
                 price: val.price,
                 quantity: val.qty, } 
     return person }) } });
          window.location = `/Summary/${orderID}`}
        else{
          window.alert("Order failed")
        }
        })}
        if(subs?.length>0 && norm?.length<1){
          axios.post(
            `${process.env.REACT_APP_PROXY_URL}/api/subscription/stripe-payment-subscription`,
            {
              email:userInfo.email,
      
              firstName:userInfo.firstName,
        
              lastName:userInfo.lastName,
        
              paymentMethod:payData,
      
              orderId:orderID,
        
              stripeCustomerId:stripid,
        
              user:userInfo.id,
        
              // items:[
              //   {
              //     price:subs?.filter((val)=>val.stripePriceId.id).map((valsh)=>valsh),
              //     quantity:subs?.filter((vals)=>vals.qty)
              //   }
              // ],
              // items:subs?.map((val)=>{val.stripePriceId.id}),
              items:subs?.map((val)=>{return {price:(val.stripePriceId.id),quantity:(val.qty)}}),
        
              orderItems:subs,
        
              shippingAddress:{
                firstName: userInfo.firstName ,
                lastName: userInfo.lastName,
                email: userInfo.email,
                address: userInfo.shippingAddress.address1,
                city: userInfo.shippingAddress.city,
                postalCode: userInfo.shippingAddress.zip,
                country: userInfo.shippingAddress.country,
                state: userInfo.shippingAddress.state,
                phoneNo: userInfo.phoneNo,
                apt: userInfo.shippingAddress.address2,
              },
        
              itemsPrice:neworderdetails.itemsPrice,
        
              taxPrice:newgetpriceSub,
        
              shippingPrice:neworderdetails.shippingPrice,
        
              billingAddress:neworderdetails.billingAddress,
        
              totalPrice:neworderdetails.totalPrice,
        
              userType:neworderdetails.userType,
      
              refCode:userInfo?.userMetaData?.refCode,
              
              discountPercent:userInfo?.userType=="Individual"?(userInfo?.userMetaData?.firstPurchase==true?(userInfo?.userMetaData?.discountPercent):(0)):(userInfo?.userType=="Veteran"?(userInfo?.userMetaData?.veteran?.discountPercentOrder):(userInfo?.userType=="Employee"?(userInfo?.userMetaData?.employee?.discountPercentOrder):(userInfo?.userType=="Ambassador"?(userInfo?.ambassadorMetaData?.discountPercent):(userInfo?.userType=="Test"?(userInfo?.userMetaData?.test?.discountPercentOrder):(0))))),
      
              firstPurchase:userInfo?.userType=="Individual"?(userInfo?.userMetaData?.firstPurchase):(false)
      
            },config).then((res)=>{
              if(res.data.message=="Subscription Created"){
                
                window.dataLayer.push({ event: 'purchase', 
    ecommerce: {
      transaction_id:orderID,
       value:neworderdetails?.totalPrice,
        tax:neworderdetails?.taxPrice,
         shipping:neworderdetails?.shippingPrice,
          currency:"USD",
           items:neworderdetails?.orderItems?.map((val)=>{ 
            let person={
              item_name: val.name,
                item_brand: "TECTON", 
                item_category: "Drink",
                 price: val.price,
                 quantity: val.qty, } 
     return person }) } });
                window.location = `/Summary/${orderID}`}
                else{
                  window.alert("Order failed")
                }
            })
        }

        if(subs?.length>0 && norm?.length>0){
          axios.post(`${process.env.REACT_APP_PROXY_URL}/api/orders/stripe-payment`, {
            price: getPrice,
            email: userInfo.email,
            orderID: orderID,
            firstName: firstName,
            lastName: lastName,
            tectonUserId: userInfo.id,
            stripeCustomerId: stripid,
            paymentMethod: payData,
            savePaymentMethod: true,
            postalCode: postalCode,
          }, config).then((res)=>{if(res.data.message=="order has been placed successfully"){setNormsubs(true)}
        else{
window.alert("Order failed")
        }
      })
          axios.post(
            `${process.env.REACT_APP_PROXY_URL}/api/subscription/stripe-payment-subscription`,
            {
              email:userInfo.email,
      
              firstName:userInfo.firstName,
        
              lastName:userInfo.lastName,
        
              paymentMethod:payData,
      
              orderId:orderID,
        
              stripeCustomerId:stripid,
        
              user:userInfo.id,
        
              // items:[
              //   {
              //     price:subs?.filter((val)=>val.stripePriceId.id).map((valsh)=>valsh),
              //     quantity:subs?.filter((vals)=>vals.qty)
              //   }
              // ],
              // items:subs?.map((val)=>{val.stripePriceId.id}),
              items:subs?.map((val)=>{return {price:(val.stripePriceId.id),quantity:(val.qty)}}),
        
              orderItems:subs,
        
              shippingAddress:{
                firstName: userInfo.firstName ,
                lastName: userInfo.lastName,
                email: userInfo.email,
                address: userInfo.shippingAddress.address1,
                city: userInfo.shippingAddress.city,
                postalCode: userInfo.shippingAddress.zip,
                country: userInfo.shippingAddress.country,
                state: userInfo.shippingAddress.state,
                phoneNo: userInfo.phoneNo,
                apt: userInfo.shippingAddress.address2,
              },
        
              itemsPrice:neworderdetails.itemsPrice,
        
              taxPrice:newgetpriceSub,
        
              shippingPrice:neworderdetails.shippingPrice,
        
              billingAddress:neworderdetails.billingAddress,
        
              totalPrice:neworderdetails.totalPrice,
        
              userType:neworderdetails.userType,
      
              refCode:userInfo?.userMetaData?.refCode,
              
              discountPercent:userInfo?.userType=="Individual"?(userInfo?.userMetaData?.firstPurchase==true?(userInfo?.userMetaData?.discountPercent):(0)):(userInfo?.userType=="Veteran"?(userInfo?.userMetaData?.veteran?.discountPercentOrder):(userInfo?.userType=="Employee"?(userInfo?.userMetaData?.employee?.discountPercentOrder):(userInfo?.userType=="Ambassador"?(userInfo?.ambassadorMetaData?.discountPercent):(userInfo?.userType=="Test"?(userInfo?.userMetaData?.test?.discountPercentOrder):(0))))),
      
              firstPurchase:userInfo?.userType=="Individual"?(userInfo?.userMetaData?.firstPurchase):(false)
      
            },config).then((res)=>{
              if(res.data.message=="Subscription Created"){setSubsnorm(true)}
              else{
                window.alert("Order failed")
              }
            })
        }
       
      }
      
      if(dropdownSelected===false){
        if (btnchecked === true) {
      
          axios.post(`${process.env.REACT_APP_PROXY_URL}/api/paymentMethod/attach-payment-method`, {
    
            customerId: stripid,
    
            cardNumber: cardNumber,
    
            expMonth: cardexp?.split("/")[0],
    
            expYear: cardexp?.split("/")[1],
    
            cvc: cardCcv,
    
            cardName: firstName,

            savePaymentMethod:true,
    
            billingAddress: {
    
              city: billingcity,
    
              State: billingstate,
    
              country: "US",
    
              postalCode: postalCode,
    
              address: billingaddress,
    
              apt: apt,
    
            },
    
            firstName: firstName,
    
            lastName: lastName,
    
            email: email
    
    
    
          }, config).then((res)=>{if(res){
            if(norm?.length>0 && subs.length<1){
              axios.post(`${process.env.REACT_APP_PROXY_URL}/api/orders/stripe-payment`, {
                price: getPrice,
                email: userInfo.email,
                orderID: orderID,
                firstName: firstName,
                lastName: lastName,
                tectonUserId: userInfo.id,
                stripeCustomerId: stripid,
                paymentMethod: res.data.data.id,
                savePaymentMethod: true,
                postalCode: postalCode,
              }, config).then((res)=>{if(res.data.message=="order has been placed successfully"){
                
                window.dataLayer.push({ event: 'purchase', 
    ecommerce: {
      transaction_id:orderID,
       value:neworderdetails?.totalPrice,
        tax:neworderdetails?.taxPrice,
         shipping:neworderdetails?.shippingPrice,
          currency:"USD",
           items:neworderdetails?.orderItems?.map((val)=>{ 
            let person={
              item_name: val.name,
                item_brand: "TECTON", 
                item_category: "Drink",
                 price: val.price,
                 quantity: val.qty, } 
     return person }) } });
                window.location = `/Summary/${orderID}`}
              else{
                window.alert("Order failed")
              }})
            }
            if(norm?.length<1 && subs?.length>0){
              axios.post(
                `${process.env.REACT_APP_PROXY_URL}/api/subscription/stripe-payment-subscription`,
                {
                  email:userInfo.email,
          
                  firstName:userInfo.firstName,
            
                  lastName:userInfo.lastName,
            
                  paymentMethod:res.data.data.id,
          
                  orderId:orderID,
            
                  stripeCustomerId:stripid,
            
                  user:userInfo.id,
            
                  // items:[
                  //   {
                  //     price:subs?.filter((val)=>val.stripePriceId.id).map((valsh)=>valsh),
                  //     quantity:subs?.filter((vals)=>vals.qty)
                  //   }
                  // ],
                  // items:subs?.map((val)=>{val.stripePriceId.id}),
                  items:subs?.map((val)=>{return {price:(val.stripePriceId.id),quantity:(val.qty)}}),
            
                  orderItems:subs,
            
                  shippingAddress:{
                    firstName: userInfo.firstName ,
                    lastName: userInfo.lastName,
                    email: userInfo.email,
                    address: userInfo.shippingAddress.address1,
                    city: userInfo.shippingAddress.city,
                    postalCode: userInfo.shippingAddress.zip,
                    country: userInfo.shippingAddress.country,
                    state: userInfo.shippingAddress.state,
                    phoneNo: userInfo.phoneNo,
                    apt: userInfo.shippingAddress.address2,
                  },
            
                  itemsPrice:neworderdetails.itemsPrice,
            
                  taxPrice:newgetpriceSub,
            
                  shippingPrice:neworderdetails.shippingPrice,
            
                  billingAddress:neworderdetails.billingAddress,
            
                  totalPrice:neworderdetails.totalPrice,
            
                  userType:neworderdetails.userType,
          
                  refCode:userInfo?.userMetaData?.refCode,
                  
                  discountPercent:userInfo?.userType=="Individual"?(userInfo?.userMetaData?.firstPurchase==true?(userInfo?.userMetaData?.discountPercent):(0)):(userInfo?.userType=="Veteran"?(userInfo?.userMetaData?.veteran?.discountPercentOrder):(userInfo?.userType=="Employee"?(userInfo?.userMetaData?.employee?.discountPercentOrder):(userInfo?.userType=="Ambassador"?(userInfo?.ambassadorMetaData?.discountPercent):(userInfo?.userType=="Test"?(userInfo?.userMetaData?.test?.discountPercentOrder):(0))))),
          
                  firstPurchase:userInfo?.userType=="Individual"?(userInfo?.userMetaData?.firstPurchase):(false)
          
                },config).then((res)=>{
                  if(res.data.message=="Subscription Created"){
                    
                    window.dataLayer.push({ event: 'purchase', 
    ecommerce: {
      transaction_id:orderID,
       value:neworderdetails?.totalPrice,
        tax:neworderdetails?.taxPrice,
         shipping:neworderdetails?.shippingPrice,
          currency:"USD",
           items:neworderdetails?.orderItems?.map((val)=>{ 
            let person={
              item_name: val.name,
                item_brand: "TECTON", 
                item_category: "Drink",
                 price: val.price,
                 quantity: val.qty, } 
     return person }) } });
                    window.location = `/Summary/${orderID}`}
                    else{
                      window.alert("Order failed")
                    }
                })
            }
            if(subs?.length>0 && norm?.length>0){
              axios.post(`${process.env.REACT_APP_PROXY_URL}/api/orders/stripe-payment`, {
                price: getPrice,
                email: userInfo.email,
                orderID: orderID,
                firstName: firstName,
                lastName: lastName,
                tectonUserId: userInfo.id,
                stripeCustomerId: stripid,
                paymentMethod: res.data.data.id,
                savePaymentMethod: true,
                postalCode: postalCode,
              }, config).then((res)=>{if(res.data.message=="order has been placed successfully"){setNormsubs(true)}
            else{
              window.alert("Order failed")
            }
            })
              axios.post(
                `${process.env.REACT_APP_PROXY_URL}/api/subscription/stripe-payment-subscription`,
                {
                  email:userInfo.email,
          
                  firstName:userInfo.firstName,
            
                  lastName:userInfo.lastName,
            
                  paymentMethod:res.data.data.id,
          
                  orderId:orderID,
            
                  stripeCustomerId:stripid,
            
                  user:userInfo.id,
            
                  // items:[
                  //   {
                  //     price:subs?.filter((val)=>val.stripePriceId.id).map((valsh)=>valsh),
                  //     quantity:subs?.filter((vals)=>vals.qty)
                  //   }
                  // ],
                  // items:subs?.map((val)=>{val.stripePriceId.id}),
                  items:subs?.map((val)=>{return {price:(val.stripePriceId.id),quantity:(val.qty)}}),
            
                  orderItems:subs,
            
                  shippingAddress:{
                    firstName: userInfo.firstName ,
                    lastName: userInfo.lastName,
                    email: userInfo.email,
                    address: userInfo.shippingAddress.address1,
                    city: userInfo.shippingAddress.city,
                    postalCode: userInfo.shippingAddress.zip,
                    country: userInfo.shippingAddress.country,
                    state: userInfo.shippingAddress.state,
                    phoneNo: userInfo.phoneNo,
                    apt: userInfo.shippingAddress.address2,
                  },
            
                  itemsPrice:neworderdetails.itemsPrice,
            
                  taxPrice:newgetpriceSub,
            
                  shippingPrice:neworderdetails.shippingPrice,
            
                  billingAddress:neworderdetails.billingAddress,
            
                  totalPrice:neworderdetails.totalPrice,
            
                  userType:neworderdetails.userType,
          
                  refCode:userInfo?.userMetaData?.refCode,
                  
                  discountPercent:userInfo?.userType=="Individual"?(userInfo?.userMetaData?.firstPurchase==true?(userInfo?.userMetaData?.discountPercent):(0)):(userInfo?.userType=="Veteran"?(userInfo?.userMetaData?.veteran?.discountPercentOrder):(userInfo?.userType=="Employee"?(userInfo?.userMetaData?.employee?.discountPercentOrder):(userInfo?.userType=="Ambassador"?(userInfo?.ambassadorMetaData?.discountPercent):(userInfo?.userType=="Test"?(userInfo?.userMetaData?.test?.discountPercentOrder):(0))))),
          
                  firstPurchase:userInfo?.userType=="Individual"?(userInfo?.userMetaData?.firstPurchase):(false)
          
                },config).then((res)=>{
                  if(res.data.message=="Subscription Created"){setSubsnorm(true)}
                  else{
                    window.alert("Order failed")
                  }
                })
              
            }
          }}).catch((err)=>{if(err){
            setShow(false);
                console.log(err);
                setEnterCardDetailsError("Invalid card details");
          }})
    
          
    
        };
      
         if(btnchecked===false){
          axios.post(`${process.env.REACT_APP_PROXY_URL}/api/paymentMethod/attach-payment-method`, {
    
            customerId: stripid,
    
            cardNumber: cardNumber,
    
            expMonth: cardexp?.split("/")[0],
    
            expYear: cardexp?.split("/")[1],
    
            cvc: cardCcv,
    
            cardName: firstName,

            savePaymentMethod:false,
    
            billingAddress: {
    
              city: billingcity,
    
              State: billingstate,
    
              country: "US",
    
              postalCode: postalCode,
    
              address: billingaddress,
    
              apt: apt,
    
            },
    
            firstName: firstName,
    
            lastName: lastName,
    
            email: email
    
    
    
          }, config).then((res)=>{if(res){
            if(norm?.length>0 && subs.length<1){
              axios.post(`${process.env.REACT_APP_PROXY_URL}/api/orders/stripe-payment`, {
                price: getPrice,
                email: userInfo.email,
                orderID: orderID,
                firstName: firstName,
                lastName: lastName,
                tectonUserId: userInfo.id,
                stripeCustomerId: stripid,
                paymentMethod: res.data.data.id,
                savePaymentMethod: false,
                postalCode: postalCode,
              }, config).then((res)=>{if(res.data.message=="order has been placed successfully"){
                
                window.dataLayer.push({ event: 'purchase', 
    ecommerce: {
      transaction_id:orderID,
       value:neworderdetails?.totalPrice,
        tax:neworderdetails?.taxPrice,
         shipping:neworderdetails?.shippingPrice,
          currency:"USD",
           items:neworderdetails?.orderItems?.map((val)=>{ 
            let person={
              item_name: val.name,
                item_brand: "TECTON", 
                item_category: "Drink",
                 price: val.price,
                 quantity: val.qty, } 
     return person }) } });
                window.location = `/Summary/${orderID}`}
              else{
                window.alert("Order failed")
              }
              })
            }
            if(norm?.length<1 && subs?.length>0){
              axios.post(
                `${process.env.REACT_APP_PROXY_URL}/api/subscription/stripe-payment-subscription`,
                {
                  email:userInfo.email,
          
                  firstName:userInfo.firstName,
            
                  lastName:userInfo.lastName,
            
                  paymentMethod:res.data.data.id,
          
                  orderId:orderID,
            
                  stripeCustomerId:stripid,
            
                  user:userInfo.id,
            
                  // items:[
                  //   {
                  //     price:subs?.filter((val)=>val.stripePriceId.id).map((valsh)=>valsh),
                  //     quantity:subs?.filter((vals)=>vals.qty)
                  //   }
                  // ],
                  // items:subs?.map((val)=>{val.stripePriceId.id}),
                  items:subs?.map((val)=>{return {price:(val.stripePriceId.id),quantity:(val.qty)}}),
            
                  orderItems:subs,
            
                  shippingAddress:{
                    firstName: userInfo.firstName ,
                    lastName: userInfo.lastName,
                    email: userInfo.email,
                    address: userInfo.shippingAddress.address1,
                    city: userInfo.shippingAddress.city,
                    postalCode: userInfo.shippingAddress.zip,
                    country: userInfo.shippingAddress.country,
                    state: userInfo.shippingAddress.state,
                    phoneNo: userInfo.phoneNo,
                    apt: userInfo.shippingAddress.address2,
                  },
            
                  itemsPrice:neworderdetails.itemsPrice,
            
                  taxPrice:newgetpriceSub,
            
                  shippingPrice:neworderdetails.shippingPrice,
            
                  billingAddress:neworderdetails.billingAddress,
            
                  totalPrice:neworderdetails.totalPrice,
            
                  userType:neworderdetails.userType,
          
                  refCode:userInfo?.userMetaData?.refCode,
                  
                  discountPercent:userInfo?.userType=="Individual"?(userInfo?.userMetaData?.firstPurchase==true?(userInfo?.userMetaData?.discountPercent):(0)):(userInfo?.userType=="Veteran"?(userInfo?.userMetaData?.veteran?.discountPercentOrder):(userInfo?.userType=="Employee"?(userInfo?.userMetaData?.employee?.discountPercentOrder):(userInfo?.userType=="Ambassador"?(userInfo?.ambassadorMetaData?.discountPercent):(userInfo?.userType=="Test"?(userInfo?.userMetaData?.test?.discountPercentOrder):(0))))),
          
                  firstPurchase:userInfo?.userType=="Individual"?(userInfo?.userMetaData?.firstPurchase):(false)
          
                },config).then((res)=>{
                  if(res.data.message=="Subscription Created"){
                    
                    window.dataLayer.push({ event: 'purchase', 
    ecommerce: {
      transaction_id:orderID,
       value:neworderdetails?.totalPrice,
        tax:neworderdetails?.taxPrice,
         shipping:neworderdetails?.shippingPrice,
          currency:"USD",
           items:neworderdetails?.orderItems?.map((val)=>{ 
            let person={
              item_name: val.name,
                item_brand: "TECTON", 
                item_category: "Drink",
                 price: val.price,
                 quantity: val.qty, } 
     return person }) } });
                    window.location = `/Summary/${orderID}`}
                    else{
                      window.alert("Order failed")
                    }
                })
            }
            if(subs?.length>0 && norm?.length>0){
              axios.post(`${process.env.REACT_APP_PROXY_URL}/api/orders/stripe-payment`, {
                price: getPrice,
                email: userInfo.email,
                orderID: orderID,
                firstName: firstName,
                lastName: lastName,
                tectonUserId: userInfo.id,
                stripeCustomerId: stripid,
                paymentMethod: res.data.data.id,
                savePaymentMethod: true,
                postalCode: postalCode,
              }, config).then((res)=>{if(res.data.message=="order has been placed successfully"){setNormsubs(true)}
            else{
              window.alert("Order failed")
            }})
              axios.post(
                `${process.env.REACT_APP_PROXY_URL}/api/subscription/stripe-payment-subscription`,
                {
                  email:userInfo.email,
          
                  firstName:userInfo.firstName,
            
                  lastName:userInfo.lastName,
            
                  paymentMethod:res.data.data.id,
          
                  orderId:orderID,
            
                  stripeCustomerId:stripid,
            
                  user:userInfo.id,
            
                  // items:[
                  //   {
                  //     price:subs?.filter((val)=>val.stripePriceId.id).map((valsh)=>valsh),
                  //     quantity:subs?.filter((vals)=>vals.qty)
                  //   }
                  // ],
                  // items:subs?.map((val)=>{val.stripePriceId.id}),
                  items:subs?.map((val)=>{return {price:(val.stripePriceId.id),quantity:(val.qty)}}),
            
                  orderItems:subs,
            
                  shippingAddress:{
                    firstName: userInfo.firstName ,
                    lastName: userInfo.lastName,
                    email: userInfo.email,
                    address: userInfo.shippingAddress.address1,
                    city: userInfo.shippingAddress.city,
                    postalCode: userInfo.shippingAddress.zip,
                    country: userInfo.shippingAddress.country,
                    state: userInfo.shippingAddress.state,
                    phoneNo: userInfo.phoneNo,
                    apt: userInfo.shippingAddress.address2,
                  },
            
                  itemsPrice:neworderdetails.itemsPrice,
            
                  taxPrice:newgetpriceSub,
            
                  shippingPrice:neworderdetails.shippingPrice,
            
                  billingAddress:neworderdetails.billingAddress,
            
                  totalPrice:neworderdetails.totalPrice,
            
                  userType:neworderdetails.userType,
          
                  refCode:userInfo?.userMetaData?.refCode,
                  
                  discountPercent:userInfo?.userType=="Individual"?(userInfo?.userMetaData?.firstPurchase==true?(userInfo?.userMetaData?.discountPercent):(0)):(userInfo?.userType=="Veteran"?(userInfo?.userMetaData?.veteran?.discountPercentOrder):(userInfo?.userType=="Employee"?(userInfo?.userMetaData?.employee?.discountPercentOrder):(userInfo?.userType=="Ambassador"?(userInfo?.ambassadorMetaData?.discountPercent):(userInfo?.userType=="Test"?(userInfo?.userMetaData?.test?.discountPercentOrder):(0))))),
          
                  firstPurchase:userInfo?.userType=="Individual"?(userInfo?.userMetaData?.firstPurchase):(false)
          
                },config).then((res)=>{
                  if(res.data.message=="Subscription Created"){setSubsnorm(true)}
                  else{
                    window.alert("Order failed")
                  }
                })
              
            }
          }}).catch((err)=>{if(err){
            setShow(false);
                console.log(err);
                setEnterCardDetailsError("Invalid card details");
          }})
    
         }
    
        
        
      }
         }
  };

  // useEffect(()=>{
  //   const getsomething = async()=>{
      
  //   }
  //   if (userInfo) getsomething();
  // })




  // render a checkout form for filling details about credit or debit cards

if(Subsnorm===true && Normsubs===true){
  
  
  window.dataLayer.push({ event: 'purchase', 
    ecommerce: {
      transaction_id:orderID,
       value:neworderdetails?.totalPrice,
        tax:neworderdetails?.taxPrice,
         shipping:neworderdetails?.shippingPrice,
          currency:"USD",
           items:neworderdetails?.orderItems?.map((val)=>{ 
            let person={
              item_name: val.name,
                item_brand: "TECTON", 
                item_category: "Drink",
                 price: val.price,
                 quantity: val.qty, } 
     return person }) } });
  window.location = `/Summary/${orderID}`
}

//   card data
const [cardsData, SetCardsData] = useState(null);
useEffect(() => {

  axios.get(`${process.env.REACT_APP_PROXY_URL}/api/paymentMethod/get-all-payment-methods`, config, {

    customerId: userInfo?.stripeCustomerId

  }).then((res) => {
    SetCardsData(res.data.data[0]);
    setPayData(res?.data?.data[0]?.defaultPaymentMethod);
    //SetCardsData(res.data.paymentMethods.data);
    console.log("card data : ", res);
  })

}, [])
useEffect(()=>{
  if (cardsData?.paymentMethods?.data?.length<1 || cardsData===undefined) {
        setshowbill("block")
        setHidebill("none")
      }
      if (cardsData?.paymentMethods?.data?.length>0) {
        setshowbill("block")
        setHidebill("block")
      }
},[cardsData])
// card 
console.log(cardsData)

const [selectedId, setSelectedId] = useState(null);
const [active, setActive] = useState(false);
  const handleDivClick = (id) => {
  setSelectedId(id);
  if(selectedId){
    setActive(true);
  }
  else if(selectedId===null){
    setActive(false)
  }
}

useEffect(()=>{
  if(dropdownSelected===false){
    setSelectedId(null)
  }
},[dropdownSelected])

console.log(dropdownSelected)
  // console.log(payData)
  const [ErrFromDropdownCard,setErrFromDropdownCard] = useState("");
  const [EnterCardDetailsError,setEnterCardDetailsError] = useState("")
  const [cartData, setCartData] = useState();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/api/cart/user/${userInfo.id}`)
      .then((res) => setCartData(res?.data?.cart[0]?.cartItems));
  }, []);
  return (
    <div>
      {" "}
      {show ? overlay : <></>}
      <form onSubmit={handleSubmit}>

        {/* Col-1 first Time (user coming first time here) */}
        <div className='payment-design-for-signup' >
          {/* <div class="review-leave-ship-pay">
            Add New Card
          </div> */}
          {/* <div className="payment-card-design">
            <div style={{ display: "flex" }}>
              <input
                style={{ width: "45%", marginTop: "7px", marginInline: "14px" }}
                type="number"
                class="form-control-ship-bill-ship "
                placeholder="Credit card Number"
                name="creditcardnumber"
                onChange={handleChangecn}
                value={cardNumber}
              >
              </input>
              <input
                style={{ width: "45%", marginTop: "7px" }}
                type="text"
                class="form-control-ship-bill-ship "
                placeholder="Name on Card"
                name="name"
              >
              </input>
            </div>
            <div style={{ display: "flex" }}>
              <input
                style={{ width: "45%", marginTop: "7px", marginInline: "14px" }}
                type="text"
                class="form-control-ship-bill-ship "
                placeholder="Expiration Date"
                name="exp date"
                value={cardexp}
                onChange={handleChangece}
              >
              </input>
              <input
                style={{ width: "45%", marginTop: "7px" }}
                type="password"
                class="form-control-ship-bill-ship "
                placeholder="CVV"
                name="cvv"
                value={cardCcv}
                onChange={handleChangecv}>
              </input>
            </div>
            <div style={{ display: "flex", marginTop: "7px", paddingLeft: "10px" }}>
              <input
                class="form-check-input"
                type="checkbox"
                checked={btnchecked} value={btnchecked} onChange={() => setBtnChecked(!btnchecked)}
              />
              &nbsp;&nbsp;Save this payment method for future use.
            </div>
          </div> */}
        </div>
        


        {/* col-2 Second time (after Card data save)  */}
        <div className='payment-design-for-signin' >
          {/* <div class="review-leave-ship-pay">
            Payment Information
          </div> */}
          <div style={{ display: `${hidebill}` }} 
                  class="review-leave-ship-pay-ord">Payment Information</div>
           {
            cardsData?.paymentMethods?.data && cardsData?.paymentMethods?.data.map(item => (
              <div className='save-payment-info' style={dropdownSelected===true && payData===item.id?{ display: "flex",  marginBottom: "1rem",  backgroundColor: "#FFFAF2",border:"1px solid orange"  }:{display: "flex",  marginBottom: "1rem",  backgroundColor: "white"  }} 
                onClick={() => { setoverlay(<OverlayEditSub />);setShow(true);setDropdownSelected(true);handleDivClick(item.id); console.log("Payment Id : ", item.id);setErrFromDropdownCard("");setEnterCardDetailsError("");
                axios
              .put(`${process.env.REACT_APP_PROXY_URL}/api/paymentMethod/update-payment-method`, 
              {    paymentMethodId:item?.id,  
                  customerId: item?.customer,  
                firstName: firstName,   
               lastName: lastName,   
               billingAddress: {       
                 city:item?.billing_details?.address?.city,  
                  country: "US",     
                 address: item?.billing_details?.address?.line1,     
                 apt: item?.billing_details?.address?.line2,     
                 postalCode:item?.billing_details?.address?.postal_code,     
                 state:item?.billing_details?.address?.state 
              },
            defaultPaymentMethod:true
          }
              ,config).then((res)=>{if(res){
                axios.get(`${process.env.REACT_APP_PROXY_URL}/api/paymentMethod/get-all-payment-methods`, config, {

                  customerId: userInfo?.stripeCustomerId
              
                }).then((res) => {
                  SetCardsData(res.data.data[0]);
                  //SetCardsData(res.data.paymentMethods.data);
                  setPayData(res?.data?.data[0]?.defaultPaymentMethod);
                  console.log("card data : ", res);
                  setShow(false)
                }).catch((err)=>{if(err){
                  setShow(false);
                  console.log(err.response.data.message);
                  setErrFromDropdownCard(err.response.data.message)
                }}) 
              }})
                }}>
                <div style={{ width: "90%",padding:"10px" }}>
                  <b>{firstName} {lastName}</b><br />
                  Credit Card Ending in {item.card.last4}<br />
                  Exp date {item.card.exp_month} {item.card.exp_year}
                </div>

    
                <div className='cvv-hover mt-1 me-4' >
                  {selectedId === item.id && (
                    <div>
                      <input type="text" style={{display:"none"}} className='cvv-onhover' placeholder='CVV' autoComplete="off" onChange={(e)=>{setCvvFromDropdown(e.target.value)}} />
                    </div>
                  )}
                </div>
                {/*  */}

                <div style={dropdownSelected===true && payData===item.id?{ display: "none",  marginBottom: "1rem",  backgroundColor: "#FFFAF2",border:"1px solid orange" , textAlign: "right", textDecoration: "underline", background: "none",paddingRight:"15px"  }:{display: "flex",  marginBottom: "1rem",  backgroundColor: "white" , textAlign: "right", textDecoration: "underline", background: "none",paddingRight:"15px" }}
                  onClick={(e) => { e.preventDefault();setoverlay(<OverlayEditSub />);setShow(true); axios.post(`${process.env.REACT_APP_PROXY_URL}/api/paymentMethod/detach-payment-method`, { paymentMethodId: item.id, customerId: item.customer, }, config).then((res)=>{if(res){
                    axios.get(`${process.env.REACT_APP_PROXY_URL}/api/paymentMethod/get-all-payment-methods`, config, {

                      customerId: userInfo?.stripeCustomerId
                  
                    }).then((res) => {
                      SetCardsData(res.data.data[0]);
                      //SetCardsData(res.data.paymentMethods.data);
                      setPayData(res?.data?.data[0]?.defaultPaymentMethod);
                      console.log("card data : ", res);
                      setShow(false)
                    })
                  }}).catch((err)=>{if(err){
                    setShow(false);
                    console.log(err.response.data.message);
                    setErrFromDropdownCard(err.response.data.message)
                  }}) }}>
                  <span style={{cursor:"pointer",paddingTop:"10px"}}>remove</span>
                </div>
              </div>
            ))
          }
          <span style={{color:"red"}}>{ErrFromDropdownCard}</span>
          <br />

          <div className='add-new-paymt' onClick={billfunction}>
            <button className='add-payment-button-new' style={{ display: `${hidebill}` }} >
              + ADD NEW CARD
            </button>
          </div>
<br/>

          <div style={{ display: `${showbill}` }}>
            <div class="review-leave-ship-pay-ord">
              Enter Card Details
            </div>
            <div className="payment-card-design" onClick={()=>{setDropdownSelected(false);setErrFromDropdownCard("")}} style={dropdownSelected===true?{background: "white"}:{background: "#FFFAF2"}}>
              <div style={{ display: "flex" }}>
                <input
                  style={{ width: "45%", marginTop: "7px", marginInline: "14px" }}
                  type="number"
                  class="form-control-ship-bill-ship "
                  placeholder="Credit card Number"
                  name="creditcardnumber"
                  onChange={handleChangecn}
                  value={cardNumber}>
                </input>
                <input
                  style={{ width: "45%", marginTop: "7px" }}
                  type="text"
                  class="form-control-ship-bill-ship "
                  placeholder="Name on Card"
                  name="name">
                </input>
              </div>
              <div style={{ display: "flex" }}>
                <input
                  style={{ width: "45%", marginTop: "7px", marginInline: "14px" }}
                  type="text"
                  class="form-control-ship-bill-ship "
                  placeholder="Expiration Date(mm/yyyy)"
                  pattern="(0[1-9]|10|11|12)/20[0-9]{2}$"
                   title="The date must be in the mm/yyyy format"
                  name="exp date"
                  value={cardexp}
                  onChange={handleChangece}>
                </input>
                <input
                  style={{ width: "45%", marginTop: "7px" }}
                  type="password"
                  class="form-control-ship-bill-ship "
                  placeholder="CVV"
                  name="cvv"
                  value={cardCcv}
                  onChange={handleChangecv}>
                </input>
              </div>
              <div style={{ display: "flex", marginTop: "7px", paddingLeft: "10px" }}>
                <input
                  class="form-check-input"
                  type="checkbox"
                  checked={btnchecked} value={btnchecked} onChange={() => setBtnChecked(!btnchecked)}
                />
                &nbsp;&nbsp;Save this payment method for future use.
                <br/><br/>
                {/* <input
              class="product-btn-default-cnfm-CON"
              type="button"
              value="Add Card"
              onClick={addNewCard}
            ></input> */}
              </div>
            </div>
            <span style={{color:"red"}}>{EnterCardDetailsError}</span>
          </div>
        </div>
<br/>
        <div id="payment-desktop">

          {/* <div  class="sales-amt-shipping" style={{ fontSize: "17px" }}> 
								{subsOrders?.length > 0 ? (<div class="subscription-info-payment" >
									<FontAwesomeIcon icon={faExclamationCircle} style={{ color: "orange", fontSize: "22px", paddingRight: "4px" }} />	By clicking “Place Order,” you confirm that your subscription will renew every 2 Weeks and your credit card will be charged automatically. You can modify, skip, or cancel your subscription at any time.
								</div>) : ("")}
								<br />
								{subsOrders?.length > 0 ? (<> <b style={{color:"#757575"}}><b style={{ color: "orange" }}>*</b>5% discount will be applied from the second shipment onwards.</b></>) : ("")}
							</div> */}

        
                   <div class="sales-amt-shipping">
                    <b style={{color:"orange",fontSize:"17px"}}>*</b>  We donate 1% of revenues to Nonprofits that work with veterans. Thanks for your support.
                    </div>
                    
          <div class="continue-btn"  >
            <input
            style={cartData?.length < 1 || !cartData ?{display:"none"}:{display:"block"}}
              class="product-btn-default-cart"
              type="submit"
              value="PAY NOW"
            ></input>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
	