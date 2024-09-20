import React from 'react'
import { useState } from 'react';
import UnsubscribeSurvey from '../components/unsubscribeSurvey';
import { useSelector, useDispatch } from "react-redux";
import Skipordersuccess from '../components/skipordersuccess';
import axios from 'axios';
function Unsuscribe({ close ,subbid,pauseitagain}) {
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

  const handleToggle = () => {
    setToggle(pre => !pre)
  }




  const handleToggle1 = () => {
    setToggle1(pre => !pre)
    axios.post(`${process.env.REACT_APP_PROXY_URL}/api/subscription/${subbid}/skip-order`,{},config).then((res)=>{if(res){window.location.reload(false)}}).catch((err)=>{if(err){window.location.reload(false)}})
  }

  return (
    <div className="popup-box-quick">
      {/* <aside className='login' > */}
      <div className="box-quick-subcription-new">
        <div class="m-acc">
          <h3 class="edit-sub-heading" ><b>Unsubscribe</b></h3>
{/* {subbid} */}
          <span className="close-icon" onClick={() => close()} > x</span>

          <h5 class="product-great">
            {/* <b>{item?.name}</b> */}
          </h5>
<hr/>
          <div class="pro-part-sub" >
          {pauseitagain?(<></>):(<div  class="edit-sub-summary" style={{ color: "#757575",textAlign:"left" }} >
              Skip your next order at any time!
            </div>)}

            <br />

            <div style={{ textAlign: "center" }}>
            {pauseitagain?(<></>):( <div >
                <button class="edit-sub-update-button" type="submit" onClick={handleToggle1}  value="" >SKIP INSTEAD</button>
                {toggle1 && <Skipordersuccess  close={() => setToggle1(false)} />}

              </div>)}

              <div class="ask-add-quick" >
                <button onClick={handleToggle} class="edit-skiporder" >UNSUBSCRIBE</button>
                {toggle && <UnsubscribeSurvey subbbid={subbid} close={() => setToggle(false)} />}
                {/* <input class="edit-sub-favorite-button" type="submit" value="UNSUBSCRIBE" ></input> */}
              </div>
              <br />



            </div>




          </div>
        </div>
      </div>
    </div>
  )
}

export default Unsuscribe