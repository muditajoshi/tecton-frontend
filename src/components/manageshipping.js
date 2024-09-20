
import React, { useState,useEffect } from 'react';

import Editshipping from '../components/editshipping';

import Addshipping from '../components/addshipping';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';


const Manageshipping = ({ close }) => {

  const [toggle3, setToggle3] = useState(false);
  const [toggle4, setToggle4] = useState(false);
  const [shipping_address,set_shipping_address] = useState();
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
    axios.get(`${process.env.REACT_APP_PROXY_URL}/api/address/user`,config).then((res)=>set_shipping_address(res.data[0]?.shippingAddress))
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
                    <h3 class="pro-duct-quick-manage" >Manage Addresses</h3>

                    <span className="close-icon" onClick={() => close()} > x</span>

                  </div>
                  <div>


                    <div className='add-address-billing-manage' style={{ float: "left" }}>
                      <button type="button" class="edit-sub-update-button-billing1 " onClick={handleToggle4} value="" >ADD AN ADDRESS</button>
                      {toggle4 && <Addshipping close={() => setToggle4(false)} />}
                    </div>
                    <br />
                    <br />
                    <hr style={{ opacity:"1",height:"0.5px",backgroundColor:"#7575", width: "100%" }}></hr>
                   {shipping_address?.map((value)=><>{ <div className='container'>
                      <div>
                        <div className='manage-billing' style={{fontSize:"0.9rem"}} >
                        {value?.firstName===userInfo.firstName && value?.lastName===userInfo.lastName && value?.city===userInfo.shippingAddress?.city && value?.address===userInfo.shippingAddress.address1 && value?.apt===userInfo.shippingAddress.address2 && value?.postalCode===userInfo.shippingAddress.zip && value?.state===userInfo.shippingAddress.state && value?.country===userInfo.shippingAddress.country ?(<div className='default-mobile' style={{paddingRight:"0px"}} >Default</div>):(<></>) }
                          <div className='detail-shipping'>{value?.firstName} {value?.lastName}</div><br />
                          <div className='detail-shipping'>{value?.address}</div> <br />
                          <div className='detail-shipping'>{value?.city},{value?.state},{value?.country},{value?.postalCode}</div> <br />
                        </div>

                        <button type="submit"  className='billing-edit-first'  onClick={()=>{handleToggle3();setpfirstName(value?.firstName);setplastname(value?.lastName);setpaddress(value?.address);setpcity(value?.city);setpstate(value?.state);setpcountry(value?.country);setppostalcode(value?.postalCode);setpapt(value?.apt);setId(value?._id)}}  value="" >Edit Shipping address</button><br/>
                        {toggle3 && <Editshipping  close={() => setToggle3(false)} pfirstName={pfirstName} plastName={plastName} paddress={paddress} pcity={pcity} pstate={pstate} papt={papt} ppostalcode={ppostalcode} pcountry={pcountry} Id={Id}/>}
                        {/* <div className='billing-edit'>Remove as Default Payment Method </div><br /> */}
                        <div className='billing-edit' onClick={()=>{axios.delete(`${process.env.REACT_APP_PROXY_URL}/api/address/${value?._id}/delete-address`,config).then((res)=>{if(res)(window.location.reload(false))})}} style={{cursor:"pointer"}}>Remove</div>
                      </div>
                      <br />
                      <hr style={{ opacity:"1",height:"0.5px",backgroundColor:"#7575", width: "100%" }}></hr>

                      <br />
                    </div>}</>)}
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

export default Manageshipping