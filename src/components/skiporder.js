import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import Unsubscribe from '../components/unsuscribe';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Skipordersuccess from '../components/skipordersuccess';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import OverlayEditSub from "../skeleton/OverlayEditSub";
function Skiporder({ close,subid,productId,subqty }) {

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
  const [toggle, setToggle] = useState(false);
  const [toggle1, setToggle1] = useState(false);
  const [show, setShow] = useState(false);

  const [overlay, setoverlay] = useState();
  const [productValues,setProductValues] = useState();

  useEffect(()=>{
    setoverlay(<OverlayEditSub />);

        setShow(true);
    axios.get(`${process.env.REACT_APP_PROXY_URL}/api/products/${productId}`).then((res)=>{
      if(res){
        setProductValues(res.data);
        setShow(false)
      }
    })
  },[]) 
  

  const handleToggle = () => {
    setToggle(pre => !pre)
  }

  
  const handleToggle1 = () => {
    setToggle1(pre => !pre)
    axios.post(`${process.env.REACT_APP_PROXY_URL}/api/subscription/${subid}/skip-order`,{},config).then((res)=>{if(res){window.location.reload(false)}}).catch((err)=>{if(err){window.location.reload(false)}})
  }

  return (
    <div className="popup-box-quick">
     {show ? overlay : <></>}
      <div className="box-quick-subcription">
        <div class="m-acc">
          <h3 class="edit-sub-heading" style={{ textAlign: "left",fontSize:"22px" }}><b>Skip Order</b></h3>
          <span className="close-icon" onClick={() => close()} > x</span>
        </div>
        
        <div style={{ textAlign: "left" }}>
        <img style={{width:"15%"}} src={productValues?.image}></img>
        </div>
        <hr />
        <div class="row">
          <div style={{ textAlign: "left",fontSize:"16px" }}>
            <h4 style={{ fontSize:"16px" }}><b>{productValues?.name}</b></h4>
          </div>
        </div>
        <br />
        <div className='skip-message' style={{ textAlign: "left" }}>
          <FontAwesomeIcon icon={faExclamationCircle} style={{ color: "#08b608", fontSize: "18px", paddingRight: "4px" }} />       Your current shipment order of  {subqty} (12 FL OZ) - {productValues?.name} - Ketone Hydration will be skipped.
        </div>
        <br />
       
    
        <div className='skip-desktop' >
        <div style={{ display: "flex" }}>
          <div style={{ textAlign: "left", width: "80%" }}>
            <button onClick={handleToggle} class="edit-skiporder" >CANCEL SUBSCRIPTION</button>
            {toggle && <Unsubscribe subbid={subid} close={() => setToggle(false)} />}
          </div>
          <div style={{ textAlign: "right" }}>
            <button onClick={handleToggle1} class="modify-skiporder" >CONFIRM</button>
            {toggle1 && <Skipordersuccess close={() => setToggle1(false)} />}
          </div>
          </div>
        </div>
        <div className='skip-mobile' >
        <div style={{ textAlign: "center" }}>
            <button onClick={handleToggle1} class="modify-skiporder" >CONFIRM</button>
            {toggle1 && <Skipordersuccess close={() => setToggle1(false)} />}
          </div>
          <br/>
          <div style={{ textAlign: "center" }}>
            <button onClick={handleToggle} class="edit-skiporder" >CANCEL SUBSCRIPTION</button>
            {toggle && <Unsubscribe subbid={subid} close={() => setToggle(false)} />}
          </div>
          
        </div>

        {/* <div class="pro-part-sub">
                                <div class="edit-sub-summary"  style={{color:"#757575"}}>
                                By clicking “Skip Now,” we will skip your next order.
                                </div>
                               
                    
                                <div style={{textAlign:"center"}}>
                                <div >
                                <button class="edit-sub-favorite-button" type="submit" value=""  onClick={() => close()} >NEVER MIND</button>
                                    
                                </div>
                                
                                <div class="ask-add-quick" >
                                <button onClick={handleToggle1} class="edit-sub-update-button" >SKIP ORDER</button>
                                        {toggle1 && <Skipordersuccess  close={() => setToggle1(false)} />}
                                </div>
                                <br/>
                                <div style={{textAlign:"center", textDecoration:"underline",paddingLeft:"20px"}}>
                                <button onClick={handleToggle} class="edit-subscription-ship" >Unsubscribe</button>
                                        {toggle && <Unsubscribe subbid={subid} close={() => setToggle(false)} />}
                                </div>
                                </div>
                    </div> */}
      </div>
    </div>

  )
}

export default Skiporder;