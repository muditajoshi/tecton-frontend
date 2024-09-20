import React from 'react'
import { useState } from 'react';
import ConfirmPassword from "./confirmpassword";

const Changepassword = ({close}) => {
    const [toggle1, setToggle1] = useState(false);

    
  
   
    const handleToggle1 = () => {
      setToggle1(pre => !pre)}
    


  return (
    <div className="popup-box-quick">
    <div className="box-quick-changepas">
        <div class="m-acc">
            {/* <h3 class="edit-sub-heading" ><b>Updated</b></h3> */}
            <span className="close-icon" onClick={() => close()} > x</span>
            <br/>
            <div class="pro-part-sub">
                <div class="edit-sub-summary" style={{ fontSize:"20px",textAlign:"left",color:"black" }} >
               <b>Change Password</b> 
                </div>
                
                <div  style={{color:"#757575",fontSize:"18px"}}>
                Please enter your current password to proceed.
                </div>
                <br/>
                
                <div class="col-cvv">
                          <input
                            // required={billingRequired}
                            type="text"
style={{width:"100%"}}
                            class="form-control-ship-exp-bill-ship "
                            placeholder="Password"
                            id="fname"
                            name="firstName"
                          // value={billingfirstName}
                          // onChange={(e) => setbillingFirstName(e.target.value)}
                          />

                        </div>
                        <br/>
                        <br/>
                        <div >
                <button class="edit-sub-update-button"  style={{width:"100%"}} type="submit" onClick={handleToggle1}  value="" >ENTER</button>
                {toggle1 && <ConfirmPassword  close={() => setToggle1(false)} />}
<br/>
<br/>
<br/>
              </div>
                <div style={{ textAlign: "center" }}>
                    <div >
                        {/* <button class="edit-sub-favorite-button" type="submit" value="" onClick={() => close()} >CLOSE</button> */}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Changepassword