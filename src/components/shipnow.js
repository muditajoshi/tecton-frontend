import React, { useEffect } from 'react'
import Shipnowsuccess from '../components/shipnowsuccess'
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useSelector } from 'react-redux';
import OverlayEditSub from "../skeleton/OverlayEditSub";

function Shipnow({close,subqty,subid,productId}) {

  const [toggle, setToggle] = useState(false);
  const [show, setShow] = useState(false);

  const [overlay, setoverlay] = useState();

  const handleToggle = () => {
    setToggle(pre => !pre)
  }
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
  
  const shipNowSubs=()=>{
    setShow(true)
    setoverlay(<OverlayEditSub />);
        axios.post(`${process.env.REACT_APP_PROXY_URL}/api/subscription/${subid}/ship-now`,{},config).then((res)=>{
          if(res){
            window.location.reload(false)
          }
        })
  }


  return (
        <div className="popup-box-quick">
    {show ? overlay : <></>}
          <div className="box-quick-subcription">
            <div class="m-acc">
              <h3 class="edit-sub-heading" style={{ textAlign: "left" ,fontSize:"22px"}}><b>Ship Now</b></h3>
              <span className="close-icon" onClick={() => close()} > x</span>
            </div>
            
            <div style={{ textAlign: "left" }}>
            <img style={{width:"15%"}} src={productValues?.image}></img>
            </div>
            <hr />
            <div class="row">
              <div style={{ textAlign: "left" }}>
                <h4 style={{ fontSize:"18px"}}><b>{productValues?.name}</b></h4>
              </div>
            </div>
            <br />
            <div className='skip-message' style={{ textAlign: "left" }}>
              <FontAwesomeIcon icon={faExclamationCircle} style={{ color: "#08b608", fontSize: "18px", paddingRight: "4px" }} />        Your order for {subqty} (12 FL OZ) - {productValues?.name} - Ketone Hydration, will be shipped to you in 3-5 business days after you confirm.
            </div>
            <br />
            {/* <div className='skipemail' style={{ textAlign: "left" }}>
              <input
                class="form-check-input"
                type="checkbox"
              />
              &nbsp;&nbsp; Recieve a confirmation email regarding the changes to your subscription.
            </div> */}
            <br />
           
              <div className='ship-now-confirm-new' >
          <button  class="modify-skiporder" onClick={shipNowSubs}>CONFIRM</button>
                {/* {toggle && <Skipordersuccess close={() => setToggle(false)} />}
               */}
      </div>
    
          </div>
        </div>
    
      )
    }

export default Shipnow
