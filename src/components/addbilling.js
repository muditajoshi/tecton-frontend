
import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Input } from "./Input";
import UpdateAddbilling from '../components/updateAddbilling';
import {
  sendVerficationEmail,
  getUserDetails,
  updateUserProfile,
  refreshLogin,
  updateUser,
} from "../actions/userActions";
import axios from 'axios';
import OverlayEditSub from '../skeleton/OverlayEditSub';

const Addbilling = ({ close }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [country, setCountry] = useState("United States");
  const [billingstate, setbillingState] = useState();
  const [billingRequired, setbillingRequired] = useState();
  const [billingcountry, setbillingCountry] = useState("United States");
  const [toggle22, setToggle22] = useState(false);
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [postalCode, setPostalCode] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [apt, setApt] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [ceck ,setceck] = useState(false);
  const [state, setState] = useState(userInfo?.billingAddress?.state);
  const [show, setShow] = useState(false);

	const [overlay, setoverlay] = useState();
  const [err,setErr] = useState("");
  const [taxError, setTaxError] = useState();
  const dispatch = useDispatch();



  const handleToggle22 = () => {
    setToggle22(pre => !pre)
  }

  const dataSource1 = ["United States"];
  const handleOnChange1 = e => {
    const val = e.target.value;
    setCountry("United States");
  };

  const mycartupdate = useSelector((state) => state.cartUpdate);
  console.log(mycartupdate)
  let itemsParent = [
    { value1: 'AK', value: 'Alaska' },
    { value1: 'TX', value: 'Texas' },
    { value1: 'AL', value: 'Alabama' },
    { value1: 'AR', value: 'Arkansas' },
    { value1: 'AZ', value: 'Arizona' },
    { value1: 'CA', value: 'California' },
    { value1: 'CO', value: 'Colorado' },
    { value1: 'CT', value: 'Connecticut' },
    { value1: 'DC', value: 'DistrictofColumbia' },
    { value1: 'DE', value: 'Delaware' },
    { value1: 'FL', value: 'Florida' },
    { value1: 'GA', value: 'Georgia' },
    { value1: 'HI', value: 'Hawaii' },
    { value1: 'IA', value: 'Iowa' },
    { value1: 'ID', value: 'Idaho' },
    { value1: 'IL', value: 'Illinois' },
    { value1: 'IN', value: 'Indiana' },
    { value1: 'KS', value: 'Kansas' },
    { value1: 'KY', value: 'Kentucky' },
    { value1: 'LA', value: 'Louisiana' },
    { value1: 'MA', value: 'Massachusetts' },
    { value1: 'MD', value: 'Maryland' },
    { value1: 'ME', value: 'Maine' },
    { value1: 'MI', value: 'Michigan' },
    { value1: 'MN', value: 'Minnesota' },
    { value1: 'MO', value: 'Missouri' },
    { value1: 'MS', value: 'Mississippi' },
    { value1: 'MT', value: 'Montana' },
    { value1: 'NC', value: 'NorthCarolina' },
    { value1: 'ND', value: 'NorthDakota' },
    { value1: 'NE', value: 'Nebraska' },
    { value1: 'NH', value: 'NewHampshire' },
    { value1: 'NJ', value: 'NewJersey' },
    { value1: 'NM', value: 'NewMexico' },
    { value1: 'NV', value: 'Nevada' },
    { value1: 'NY', value: 'NewYork' },
    { value1: 'OH', value: 'Ohio' },
    { value1: 'OK', value: 'Oklahoma' },
    { value1: 'OR', value: 'Oregon' },
    { value1: 'PA', value: 'Pennsylvania' },
    { value1: 'RI', value: 'RhodeIsland' },
    { value1: 'SC', value: 'SouthCarolina' },
    { value1: 'SD', value: 'SouthDakota' },
    { value1: 'TN', value: 'Tennessee' },
    { value1: 'TX', value: 'Texas' },
    { value1: 'UT', value: 'Utah' },
    { value1: 'VA', value: 'Virginia' },
    { value1: 'VT', value: 'Vermont' },
    { value1: 'WA', value: 'Washington' },
    { value1: 'WI', value: 'Wisconsin' },
    { value1: 'WV', value: 'WestVirginia' },
    { value1: 'WY', value: 'Wyoming' }
  ]
  // console.log(itemsParent.filter((vals)=>vals.value1===userInfo?.shippingAddress?.state)[0].value)
 
  // console.log(itemsParent.filter((vals)=>vals.value1===userInfo?.billingAddress?.state))
  let itemsTwo = [
    { value1: `${userInfo?.billingAddress?.state}`, value: itemsParent?.filter((vals)=>vals?.value1===userInfo?.billingAddress?.state)[0]?.value },
    { value1: 'AK', value: 'Alaska' },
    { value1: 'TX', value: 'Texas' },
    { value1: 'AL', value: 'Alabama' },
    { value1: 'AR', value: 'Arkansas' },
    { value1: 'AZ', value: 'Arizona' },
    { value1: 'CA', value: 'California' },
    { value1: 'CO', value: 'Colorado' },
    { value1: 'CT', value: 'Connecticut' },
    { value1: 'DC', value: 'DistrictofColumbia' },
    { value1: 'DE', value: 'Delaware' },
    { value1: 'FL', value: 'Florida' },
    { value1: 'GA', value: 'Georgia' },
    { value1: 'HI', value: 'Hawaii' },
    { value1: 'IA', value: 'Iowa' },
    { value1: 'ID', value: 'Idaho' },
    { value1: 'IL', value: 'Illinois' },
    { value1: 'IN', value: 'Indiana' },
    { value1: 'KS', value: 'Kansas' },
    { value1: 'KY', value: 'Kentucky' },
    { value1: 'LA', value: 'Louisiana' },
    { value1: 'MA', value: 'Massachusetts' },
    { value1: 'MD', value: 'Maryland' },
    { value1: 'ME', value: 'Maine' },
    { value1: 'MI', value: 'Michigan' },
    { value1: 'MN', value: 'Minnesota' },
    { value1: 'MO', value: 'Missouri' },
    { value1: 'MS', value: 'Mississippi' },
    { value1: 'MT', value: 'Montana' },
    { value1: 'NC', value: 'NorthCarolina' },
    { value1: 'ND', value: 'NorthDakota' },
    { value1: 'NE', value: 'Nebraska' },
    { value1: 'NH', value: 'NewHampshire' },
    { value1: 'NJ', value: 'NewJersey' },
    { value1: 'NM', value: 'NewMexico' },
    { value1: 'NV', value: 'Nevada' },
    { value1: 'NY', value: 'NewYork' },
    { value1: 'OH', value: 'Ohio' },
    { value1: 'OK', value: 'Oklahoma' },
    { value1: 'OR', value: 'Oregon' },
    { value1: 'PA', value: 'Pennsylvania' },
    { value1: 'RI', value: 'RhodeIsland' },
    { value1: 'SC', value: 'SouthCarolina' },
    { value1: 'SD', value: 'SouthDakota' },
    { value1: 'TN', value: 'Tennessee' },
    { value1: 'TX', value: 'Texas' },
    { value1: 'UT', value: 'Utah' },
    { value1: 'VA', value: 'Virginia' },
    { value1: 'VT', value: 'Vermont' },
    { value1: 'WA', value: 'Washington' },
    { value1: 'WI', value: 'Wisconsin' },
    { value1: 'WV', value: 'WestVirginia' },
    { value1: 'WY', value: 'Wyoming' }
  ]
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
    const [ stripid,setstripeid] = useState();
    useEffect(()=>{
      axios.get(`${process.env.REACT_APP_PROXY_URL}/api/users/${userInfo.id}`, config).then((res)=>setstripeid(res?.data?.stripeCustomerId))
    },[])
    const [cardNumber, setCardNumber] = useState('');
const [cardexp, setCardexp] = useState("");
const [cardCcv, setCardccv] = useState("");
const handleChangecn = event => {
  setCardNumber(event.target.value);

  console.log('card number:', event.target.value);
};
const handleChangecv = event => {
  setCardccv(event.target.value);

  console.log('ccv :', event.target.value);
};
const handleChangece = event => {
  setCardexp(event.target.value);

  console.log(' expiry :', event.target.value);
};


const handleSubmit=(e)=>{
  e.preventDefault();
  axios.post(`${process.env.REACT_APP_PROXY_URL}/api/avalara/validate-address`, {
    billingAddress: {
      address: address,
  
      city: city,
  
      state: state,
  
      postalCode: postalCode,
  
      firstName: firstName,
  
      lastName: lastName,
  
      email: userInfo?.email,
    },
  }).then(()=>{// axios
    //     .post(`${process.env.REACT_APP_PROXY_URL}/api/address/add-address`, {
    //      billingAddress:[{
    //       firstName: firstName,
    //       lastName: lastName,
    //       city: city,
    //       state: state,
    //       postalCode: postalCode,
    //       country: country,
    //       address:address,
    //       phoneNo:userInfo.phoneNo,
    //       apt:apt,
    //       email:userInfo?.email
    //     }],
    //     },config).then((res)=>{if(res){window.location.reload(false)}})
    setoverlay(<OverlayEditSub />);
    setShow(true);
    if(ceck===false){
      axios.post(`${process.env.REACT_APP_PROXY_URL}/api/paymentMethod/attach-payment-method`, {
        customerId: stripid,
        cardNumber: cardNumber,
        expMonth: cardexp?.split("/")[0],
        expYear: cardexp?.split("/")[1],
        cvc: cardCcv,
        cardName: firstName,
        phoneNumber:phoneNumber,
        phoneNo:phoneNumber,
        billingAddress: {
         city: city,
          State: state,
          country: "US",
          postalCode: postalCode,
          address: address,
          apt: apt,
          phoneNumber:phoneNumber,
          phoneNo:phoneNumber
      
        },
        firstName: firstName,
        lastName: lastName,
        email: userInfo?.email,
        savePaymentMethod:true
      }, config).then((res)=>{if(res){window.location.reload(false)}}).catch((err)=>{if(err){setShow(false);setErr("invalid card details")}})
    }
    
        if(ceck===true){
          axios.post(`${process.env.REACT_APP_PROXY_URL}/api/paymentMethod/attach-payment-method`, {
            customerId: stripid,
            cardNumber: cardNumber,
            expMonth: cardexp?.split("/")[0],
            expYear: cardexp?.split("/")[1],
            cvc: cardCcv,
            cardName: firstName,
            phoneNumber:phoneNumber,
            phoneNo:phoneNumber,
            billingAddress: {
             city: city,
              State: state,
              country: "US",
              postalCode: postalCode,
              address: address,
              apt: apt,
              phoneNumber:phoneNumber,
              phoneNo:phoneNumber
          
            },
            defaultPaymentMethod:true,
            firstName: firstName,
            lastName: lastName,
            email: userInfo?.email,
            savePaymentMethod:true
          }, config).then((res)=>{if(res){window.location.reload(false)}}).catch((err)=>{if(err){setShow(false);setErr("invalid card details")}})
                }}).catch((error)=>{
                  setTaxError(error?.response?.data?.message);
  
  })
    }
  
  return (
    <div>
      {show ? overlay : <></>}
      <div className="popup-box-quick">
        {/* <aside className='login' > */}
        <div className="box-quick-editbilling">
          <div class="all-product">

            <div class="container">
              <div >
                <div class="row">
                  <div class="m-acc">
                    <h3 class="pro-duct-quick-edit-billing" >Add Payment Method </h3>

                    <span className="close-icon" onClick={() => close()} > x</span>

                  </div>
               
                  <form onSubmit={handleSubmit}>
                  <div className='bill-payment'>
                  <div style={{ fontWeight: "bold", fontSize: "17px", float: "left" }}>
                   Payment
                    </div>
                    <br/>
                    <div class="col">
                        <input
                          type="text"
                          style={{marginBottom:"6px"}}
                          class="form-control-ship-bill-ship-payment  "
                          placeholder="Name on Card"
                          id="fname"
                          name="apt"
                        value={userInfo.firstName+" "+userInfo.lastName}
                       
                        />
                      </div>
                      <div class="col">
                        <input
                          required
                          type="number"
                          class="form-control-ship-bill-ship-payment  "
                          placeholder="Credit Card Number"
                          id="fname"
                          name="apt"
                          onChange={handleChangecn}
                          value={cardNumber}
                        />
                      </div>
                    <div class="col-cvv">
                        <input
                          required
                          type="text"
                          class="form-control-ship-exp-bill-ship "
                          placeholder="Expiration Date(mm/yyyy)"
                          id="fname"
                          name="firstName"
                          value={cardexp}
                          onChange={handleChangece}
                        />
                        <input
                          required
                          type="password"
                          class="form-control-ship-exp-bill-ship "
                          placeholder="Cvv"
                          id="fname"
                          name="lastName"
                          value={cardCcv}
                          onChange={handleChangecv}
                        />
                      </div>
                  </div>
                  <div class="detail-ship-billing" >
                    <div style={{ fontWeight: "bold", fontSize: "17px" ,paddingBottom:"8px",textAlign:"left"}}>
                    Billing
                    </div>
                  
                    
                    <div className='bill-input-fields'>
                      <div class="col-cvv">
                        <input
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                          // required={billingRequired}
                          type="text"
                          class="form-control-ship-exp-bill-ship "
                          placeholder="First Name"
                          id="fname"
                          name="firstName"
                        // value={billingfirstName}
                        // onChange={(e) => setbillingFirstName(e.target.value)}
                        />
                        <input
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                          // required={billingRequired}
                          type="text"
                          class="form-control-ship-exp-bill-ship "
                          placeholder="Last Name"
                          id="fname"
                          name="lastName"
                        // value={billinglastName}
                        // onChange={(e) => setbillingLastName(e.target.value)}
                        />
                      </div>

                      <div class="col">
                        <input
                          type="text"
                          class="form-control-ship-bill-ship "
                          placeholder="Street Address"
                          id="fname"
                          name="address"
                          value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                        // value={billingaddress}
                        // required={billingRequired}
                        // onChange={(e) => setbillingAddress(e.target.value)}
                        />
                      </div>


                      <div class="col">
                        <input
                          type="text"
                          class="form-control-ship-bill-ship  "
                          placeholder="Apt #,suite,etc.(optional)"
                          id="fname"
                          name="apt"
                          value={apt}
                        onChange={(e) => setApt(e.target.value)}
                        // value={billingapt}
                        // onChange={(e) => setbillingApt(e.target.value)}
                        />
                      </div>

                      <div class="col">
                        <input
                          type="text"
                          class="form-control-ship-bill-ship  "
                          placeholder="City"
                          id="fname"
                          name="city"
                          value={city}
                        onChange={(e) => setCity(e.target.value)}
                        // value={billingcity}
                        // required={billingRequired}
                        // onChange={(e) => setbillingCity(e.target.value)}
                        />
                      </div>

                      <div class="col-s-billing" >
                      <label  style={{fontWeight:"normal",float:"left",fontSize:"14px"}}>State:</label>
                        <select required class="form-control-ship-bill-ship" onChange={(e) => setState(e.target.value)}>
                          {itemsTwo.map((valuess) => <option value={valuess.value1}>{valuess.value} </option>)}
                        </select>
                      </div>
                      <div class="col">
                        <input
                          class="form-control-ship-bill-ship  "
                          required
                          placeholder="Zip Code"
                          type="text"
                          pattern="^\d{5}(?:[-\s]\d{4})?$"
                          title="Zip code should be in the valid format"
                          name="postalCode"
                          value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        // value={billingpostalCode}
                        // required={billingRequired}
                        // onChange={(e) => setbillingPostalCode(e.target.value)}
                        />
                      </div>

                      <div class="col-country">

                        <input
                          type="text"
                          placeholder="Country"
                          class="form-control-ship-bill-ship-country  "

                          required={true}

                          list="gameList1"
                          onChange={handleOnChange1}
                          value={country}
                        />
                        <datalist id="gameList1">
                          {dataSource1.map(item => (
                            <option key={item} value={item} />
                          ))}
                        </datalist>
                      </div>

                    </div>
                    <span style={{color:'red'}}>{err}</span>
                    <span style={{ color: "red", paddingBottom: "10px" }}>
                    {taxError}</span>
                    <br />
                    <div class="join-extra" style={{ float: "left" }}>
                      <input class="tik-tack" type="checkbox" value={ceck} onChange={()=>setceck(!ceck)}/>&nbsp;
                      Set as Default Payment Method
                    </div>

                    <br />
                    <br />
                    <div >

                     
                      <div className='bill-cancel' >
                      <div className='save-button-billing' >
                      <button  type="submit" style={{ color:"black" ,  paddingLeft: "20px", paddingTop: "4px", paddingBottom: "1px", paddingRight: "20px", backgroundColor: "orange", fontSize: "15px", border: "none" }} onClick={handleToggle22}  value="" >SAVE</button><br/>
                {/* {toggle22 && <UpdateAddbilling  close={() => setToggle22(false)} />} */}
                </div>
                        
                        <div className='cancel-button-billing'  > <button style={{ color:"black" ,paddingTop: "4px", paddingBottom: "1px",paddingLeft: "14px", paddingRight: "14px", backgroundColor: "white", fontSize: "15px", borderRadius: "20px", border: "1px solid" }} onClick={() => close()} type="button" >CANCEL</button>
                        </div>

                      </div>


                    </div>
                    <br />
                    <br />
                  </div>
                  </form>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default Addbilling