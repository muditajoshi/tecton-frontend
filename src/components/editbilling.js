
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Input } from "./Input";
import Updatebilling from '../components/updatebilling';
import axios from 'axios';
import {
  sendVerficationEmail,
  getUserDetails,
  updateUserProfile,
  refreshLogin,
  updateUser,
} from "../actions/userActions";
import OverlayEditSub from '../skeleton/OverlayEditSub';
const Editbilling = ({ close,pfirstName, plastName, paddress, pcity, pstate, papt, ppostalcode, pcountry,Id,lastFour,expDate,defaultId }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [country, setCountry] = useState("United States");
  const [billingstate, setbillingState] = useState();
  const [billingRequired, setbillingRequired] = useState();
  const [billingcountry, setbillingCountry] = useState("United States");
  const [toggle22, setToggle22] = useState(false);
  const [address, setAddress] = useState(paddress);
    const [city, setCity] = useState(pcity);
    const [postalCode, setPostalCode] = useState(ppostalcode);
    // const [phoneNo, setPhoneNo] = useState(pphoneNo);
    const [apt, setApt] = useState(papt);
    const [firstName, setFirstName] = useState(pfirstName);
    const [lastName, setLastName] = useState(plastName);
    const [phoneNumber, setPhoneNumber] = useState();
    const [ceck ,setceck] = useState(false);
    const [state, setState] = useState(pstate);
    const [show, setShow] = useState(false);

    const [overlay, setoverlay] = useState();
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
  // useEffect(()=>{
  //   if(pfirstName===userInfo.billingAddress?.firstName && plastName===userInfo.billingAddress?.lastName && pcity===userInfo.billingAddress?.city && paddress===userInfo.billingAddress?.address1 && papt===userInfo.billingAddress?.address2 && ppostalcode===userInfo.billingAddress?.zip && pstate===userInfo.billingAddress?.state && pcountry===userInfo.billingAddress?.country){
  //     setceck(true)
  //   }
  //   else{
  //     setceck(false)
  //   }
  // },[])
  useEffect(()=>{
    if(Id===defaultId){
      setceck(true)
    }
    else{
      setceck(false)
    }
  },[])
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
        //       .put(`${process.env.REACT_APP_PROXY_URL}/api/address/${Id}/update-address`, {
        //        billingAddress:{
        //         firstName: firstName,
        //         lastName: lastName,
        //         city: city,
        //         state: state,
        //         postalCode: postalCode,
        //         country: country,
        //         address:address,
        //         phoneNo:userInfo.phoneNo,
        //         apt:apt,
        //         email:userInfo?.email
        //       },
        //       },config).then((res)=>{if(res){window.location.reload(false)}})
        setoverlay(<OverlayEditSub/>);
  setShow(true);
  
              if(ceck===false){
                axios
              .put(`${process.env.REACT_APP_PROXY_URL}/api/paymentMethod/update-payment-method`, 
              {    paymentMethodId:Id,  
                  customerId: stripid,  
                firstName: firstName,   
               lastName: lastName,
              phoneNumber:phoneNumber,   
              phoneNo:phoneNumber,
               billingAddress: {       
                 city: city,  
                  country:"US",     
                 address: address,     
                 apt: apt,     
                 postalCode: postalCode,     
                 state: state,
              phoneNumber:phoneNumber,
              phoneNo:phoneNumber 
              }}
              ,config).then((res)=>{if(res){window.location.reload(false)}})
              }
  
              if(ceck===true){
                axios
                .put(`${process.env.REACT_APP_PROXY_URL}/api/paymentMethod/update-payment-method`, 
                {    paymentMethodId:Id,  
                    customerId: stripid,  
                  firstName: firstName,   
                 lastName: lastName,
                phoneNumber:phoneNumber,   
                phoneNo:phoneNumber,
                 billingAddress: {       
                   city: city,  
                    country: "US",     
                   address: address,     
                   apt: apt,     
                   postalCode: postalCode,     
                   state: state,
                phoneNumber:phoneNumber,
                phoneNo:phoneNumber 
                },
              defaultPaymentMethod:true
            }
                ,config).then((res)=>{if(res){window.location.reload(false)}})
                // dispatch(
                //       updateUserProfile({
                //         firstName: userInfo?.firstName,
                //   lastName: userInfo?.lastName,
                //   city: userInfo?.shippingAddress?.city,
                //   state: userInfo?.shippingAddress?.state,
                //   zip: userInfo?.shippingAddress?.zip,
                //   country: userInfo?.shippingAddress?.country,
                //   address1:userInfo?.shippingAddress?.address1,
                //   address2:userInfo?.shippingAddress?.address2,
                //         billingAddress : {
                //           firstName :firstName,
                
                //           lastName:lastName,
                
                //           address1:address ,
                
                //           address2:apt ,
                
                //           city :city,
                
                //           state:state ,
                
                //           country:country ,
                
                //           zip:postalCode 
                
                //         }
                //       })
                //     );
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
                                        <h3 class="pro-duct-quick-edit-billing" >Edit Address </h3>
{/* {pfirstName} */}
{/* {Id} */}
                                        <span className="close-icon" onClick={() => close()} > x</span>

                                    </div>
                                    <div className='bill-payment'>               
                                       <div style={{ fontWeight: "bold", fontSize: "17px", float: "left" }}>Credit card ending in {lastFour}
                    </div>                   
                     <br/>                   
                      <div class="col">                   
                           <input
                          type="text"
                          class="form-control-ship-bill-ship-payment  "
                          placeholder="Name on Card"
                          id="fname"
                          name="apt"
                        value={userInfo?.firstName}
                        // onChange={(e) => setbillingApt(e.target.value)}
                        />                     
                         </div>                   
                          <div class="col">                 
                                 <input
                          // required={billingRequired}
                          type="text"
                          class="form-control-ship-bill-ship-payment  "
                          placeholder="Expiration Date"
                          id="fname"
                          name="firstName"
                        value={expDate}
                        // onChange={(e) => setbillingFirstName(e.target.value)}
                        />                      
                         
                             </div>                 
                         </div>
                                    <form onSubmit={handleSubmit}>
                 <div class="detail-ship-billing" >
                    <div style={{ fontWeight: "bold", fontSize: "17px",paddingBottom:"8px" ,textAlign:"left"}}>
                      Billing
                    </div>
              
                
                    <div className='bill-input-fields'>
                      <div class="col-cvv" style={{display:"flex"}}>
                        <input
                        required
                          // required={billingRequired}
                          type="text"
                          class="form-control-ship-exp-bill-ship "
                          placeholder="First Name"
                          id="fname"
                          name="firstName"
                          value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        // value={billingfirstName}
                        // onChange={(e) => setbillingFirstName(e.target.value)}
                        />
                        <input
                          // required={billingRequired}
                          required
                          type="text"
                          class="form-control-ship-exp-bill-ship "
                          placeholder="Last Name"
                          id="fname"
                          name="lastName"
                          value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        // value={billinglastName}
                        // onChange={(e) => setbillingLastName(e.target.value)}
                        />
                      </div>
 {/* added phone no field */}
 {/* <div class="col">
                        <input
                          type="text"
                          class="form-control-ship-bill-ship "
                          placeholder="Phone Number"
                          id="phoneNumber"
                          name="phoneNumber"
                        //   value={phoneNumber}
                        // required
                        // onChange={(e) => setAddress(e.target.value)}
                       
                        />
                      </div> */}
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
                        required
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
                      <div class="col-state">
                      <label  style={{fontWeight:"normal",float:"left",fontSize:"14px"}}>State:</label>
                        <select required class="form-control-ship-bill-ship" onChange={(e) => setState(e.target.value)}>
                          {itemsTwo.map((valuess) => <option value={valuess.value1}>{valuess.value}</option>)}
                        </select>
                      </div>
                      <div class="col">
                        <input
                        required
                          class="form-control-ship-bill-ship  "
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

                    </div><span style={{ color: "red", paddingBottom: "10px" }}>
                    {taxError}</span>
                    <br />
                    <div class="join-extra" style={{ float: "left" }}>
                      <input class="tik-tack" type="checkbox" checked={ceck} value={ceck} onChange={()=>setceck(!ceck)} />&nbsp;
                      Set as Default Billing Payment Method
                    </div>

                    <br />
                    <br />
                    <div >

                    <div className='billing-edit-bill' style={{ float: "left",cursor:"pointer" }} onClick={()=>{axios.post(`${process.env.REACT_APP_PROXY_URL}/api/paymentMethod/detach-payment-method`,{paymentMethodId:Id,customerId:stripid},config).then((res)=>{if(res)(window.location.reload(false))}).catch((err)=>{if(err){window.alert(err?.response?.data?.message)}})}} >Remove Payment Method </div>
                      <div className='bill-cancel' >

                      <div className='save-button-billing' >
                      <button  type="submit" style={{ paddingLeft: "20px", paddingTop: "4px", paddingBottom: "1px", paddingRight: "20px", backgroundColor: "orange", fontSize: "15px", border: "none" }} onClick={handleToggle22}  value="" >SAVE</button><br/>
                {/* {toggle22 && <UpdateAddshipping  close={() => setToggle22(false)} />} */}
                </div>
                        <div className='cancel-button-billing'  > <button style={{ paddingTop: "4px", paddingBottom: "1px", paddingLeft: "14px", paddingRight: "14px", backgroundColor: "white", fontSize: "15px", borderRadius: "20px", border: "1px solid" }} onClick={() => close()} type="button" >CANCEL</button>
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

export default Editbilling