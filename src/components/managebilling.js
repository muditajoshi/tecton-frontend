
import React, { useState,useEffect } from 'react';
import Editbilling from '../components/editbilling';
import axios from 'axios';

import Addbilling from './addbilling';
import { useSelector, useDispatch } from 'react-redux';


const Managebilling = ({ close }) => {
  const [toggle3, setToggle3] = useState(false);
  const [toggle4, setToggle4] = useState(false);
  const [billing_address,set_billing_address] = useState();
  const [pfirstName,setpfirstName]=useState();
  const [plastName,setplastname] = useState();
  const [paddress,setpaddress] = useState();
  const [pcity,setpcity] = useState();
  const [ppostalcode,setppostalcode] = useState();
  const [papt,setpapt] = useState();
  const [pcountry,setpcountry] = useState();
  const [pstate,setpstate] = useState();
  const [Id,setId] = useState();


  const handleToggle3 = () => {
    setToggle3(pre => !pre)
  }
  const handleToggle4 = () => {
    setToggle4(pre => !pre)
  }
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
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
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_PROXY_URL}/api/address/user`,config).then((res)=>set_billing_address(res.data[0]?.billingAddress))
  },[])

  return (
    <div>
      <div className="popup-box-quick">
        {/* <aside className='login' > */}
        <div className="box-quick-manage">
          <div class="all-product">

            <div class="container">
              <div class=" cont-act-for col-sm-8">
                <div class="row">
                  <div class="m-acc">
                    <h3 class="pro-duct-quick-manage" >Manage Billing </h3>
                    <span className="close-icon" onClick={() => close()} > x</span>

                  </div>
                  <div >
                   <div className='add-address-billing-manage' style={{ float: "left" }}>
                      <button type="button" class="edit-sub-update-button-billing1 " onClick={handleToggle4} value="" >ADD BIILING ADDRESS</button>
                      {toggle4 && <Addbilling close={() => setToggle4(false)} />}
                    </div>
                    <br />
                    <br />
                    <hr style={{ opacity:"1",height:"0.5px",backgroundColor:"#7575", width: "100%" }}></hr>
                    {billing_address?.map((valk)=><>{<div>
                      <div className='manage-billing'  style={{fontSize:"0.9rem"}}>
                      {valk?.firstName===userInfo?.billingAddress?.firstName && valk?.lastName===userInfo?.billingAddress?.lastName && valk?.city===userInfo?.billingAddress?.city && valk?.address===userInfo?.billingAddress.address1 && valk?.apt===userInfo?.billingAddress.address2 && valk?.postalCode===userInfo?.billingAddress.zip && valk?.state===userInfo?.billingAddress.state && valk?.country===userInfo?.billingAddress.country ?(<div className='default-mobile' style={{paddingRight:"0px"}} >Default</div>):(<></>) }
                        <div className='detail-shipping'>{valk.firstName} {valk.lastName}</div><br />
                        <div className='detail-shipping'>{valk.address}</div> <br />
                        <div className='detail-shipping'>{valk.city},{valk?.state},{valk?.country},{valk?.postalCode}</div> <br />
                      </div>
                      <button  type="submit" className='billing-edit-first'  onClick={()=>{handleToggle3();setpfirstName(valk?.firstName);setplastname(valk?.lastName);setpaddress(valk?.address);setpcity(valk?.city);setpstate(valk?.state);setpcountry(valk?.country);setppostalcode(valk?.postalCode);setpapt(valk?.apt);setId(valk?._id)}}  value="" >Edit Billing Address</button><br/>
                {toggle3 && <Editbilling  close={() => setToggle3(false)} pfirstName={pfirstName} plastName={plastName} paddress={paddress} pcity={pcity} pstate={pstate} papt={papt} ppostalcode={ppostalcode} pcountry={pcountry} Id={Id} />}
                      {/* <div className='billing-edit'>Remove as Default Payment Method </div><br /> */}
                      <div className='billing-edit' onClick={()=>{axios.delete(`${process.env.REACT_APP_PROXY_URL}/api/address/${valk?._id}/delete-address`,config).then((res)=>{if(res)(window.location.reload(false))})}} style={{cursor:"pointer"}}>Remove</div>
                      <br />
                      <hr style={{ opacity:"1",height:"0.5px",backgroundColor:"#7575", width: "100%" }}></hr>

                    </div>
}</>)}










                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default Managebilling