import React from 'react'
import { useState } from 'react';
import ChangePasswordconfirm from './changepasswordconfirm';

const ConfirmPassword = ({close}) => {
    const [toggle1, setToggle1] = useState(false);

    
  
   
    const handleToggle1 = () => {
      setToggle1(pre => !pre)}
    


  return (
    <div className="popup-box-quick">
    <div className="box-quick-account">
        <div class="m-acc">
            {/* <h3 class="edit-sub-heading" ><b>Updated</b></h3> */}
            <span className="close-icon" onClick={() => close()} > x</span>
            <br/>
            <div class="pro-part-sub">
                <div class="edit-sub-summary" style={{ fontSize:"22px",textAlign:"left",color:"black" }} >
               <b>Change Password</b> 
                </div>
                
                <div style={{color:"#757575"}}>
                Please enter your new password.
                </div>
                <br/>
              
                <div class="col-cvv">
                          <input
                            // required={billingRequired}
                            type="text"
                            style={{width:"100%"}}
                            class="form-control-ship-exp-bill-ship "
                            placeholder="email"
                            id="fname"
                            name="firstName"
                          // value={billingfirstName}
                          // onChange={(e) => setbillingFirstName(e.target.value)}
                          />

                        </div>
                        <br/>
                        <br/>
            
                        <div >
                       <b>Password must contain:</b> <br/>
                       <div style={{lineHeight:"14px",color:"#757575"}}>
<ul><li>8-25 characters</li><br/>
<li>1 uppercase letter</li><br/>
<li>1 lowercase letter</li><br/>
<li>1 number</li><br/>
<li>1 special character</li></ul><br/>
</div>
                        </div>
                        
                        <div class="col-cvv">
                          <input
                            // required={billingRequired}
                            type="text"
                            style={{width:"100%"}}
                            class="form-control-ship-exp-bill-ship "
                            placeholder="Confirm Password"
                            id="fname"
                            name="firstName"
                          // value={billingfirstName}
                          // onChange={(e) => setbillingFirstName(e.target.value)}
                          />

                        </div>
                        <br/>
                        <br/>

                        <div >
                <button class="edit-sub-update-button" type="submit" onClick={handleToggle1} style={{width:"100%"}} value="" >CHANGE PASSWORD</button>
                {toggle1 && <ChangePasswordconfirm  close={() => setToggle1(false)} />}

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

export default ConfirmPassword