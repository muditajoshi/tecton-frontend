import axios from "axios";
import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ScrollToTop from "./ScrollToTop";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
// import DateTimePicker from 'react-datetime-picker'

import "react-datepicker/dist/react-datepicker.css";


function Topaid({match,history}){
const orderID = match?.params?.id;
// console.log(orderID)
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
 

  const location = useLocation();

  // useEffect(() => {
  //    console.log(location.pathname); 
  //    console.log(location.state?.order?.paymentResult);
  //    console.log(location.state);// result: 'some_value'
  //    console.log(location.state?.order?.paidAt);
  // }, [location]);

  const [paidAt, setpaidAt] = useState();   
  const [email, setEmail] = useState(location.state?.order?.shippingAddress?.email); 
  const [paymentId, setpaymentId] = useState();

  //location.state?.order?.paidAt).toISOString().slice(0,10)
    

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


    // const formatDate=(date)=>{
    //  return new Date(location.state?.order?.paidAt.toString()).toISOString().slice(0,10)
    // }

    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.put(`${process.env.REACT_APP_PROXY_URL}/api/orders/${orderID}/topaid`,{

            paidAt:paidAt,
        
            email_address:email,
        
            paymentId:paymentId
        
        },config).then((res)=>{if(res){history.push('/admin/unpaidorders')}})
       
    };

   
    return(
        <div className='productListPage'>
         <ScrollToTop/>
            <div className='align-items-center'>

                <div className='col-sm-8'>

                <div >

                    <h1 className='productListPage_heading'>Edit orders</h1>
                    <form onSubmit={handleSubmit}>
                    <label>Paid at:</label>
                    {/* <input type="date"></input> */}
                    {/* <DatePicker onChange={onChange} value={value} /> */}
                    <input type="date" required value={paidAt} onChange={(e)=>{setpaidAt(e.target.value)}} ></input> 
                    <label>email address</label>
                    <input type="email" required value={email} onChange={(e)=>{setEmail(e.target.value)}} style={{width:"100%"}} disabled></input>
                    
                    <label>Payment id</label>
                    <input type="text" required  value={paymentId} onChange={(e)=>{setpaymentId(e.target.value)}} style={{width:"100%"}}></input><br/><br/>
                    <button type="submit" className="productEditPage_updateButton"  >submit</button>
                    </form>

                </div>

                </div>
                </div>
                </div>
    )
}

export default Topaid;