import React from 'react'
import "../css/loginshop.css";

const LoginShop = (props) => {



    return (
        <div className="popup-box">
          {/* <aside className='login' > */}
          <div className="box">
          <span className="close-icon" onClick={props.handleClose}>x</span>
<div class="all-product">
 
  <div class="container">
  <div class=" cont-act-for col-sm-8">
                    <div class="row">
                        <div class="m-acc">
                            <h3 class="pro-duct-quick" >Sign In</h3>
           
                        </div>
          
          </div>
          
          </div>
          <div class="keep">
          Keep track of your favorite was to Be Great!
          </div>
          <div class="detail-ship-log">
									<div class="col">
										<input type="Email" class="form-control-ship " placeholder="Email" id="fname" name="fname" />
									</div>
									<br />
                  <div class="col">
										<input type="text" class="form-control-ship " placeholder="Password" id="fname" name="fname" />
									</div>
									<br />
                  </div>
                  <div class="for-got">
                    Forgot Password?
          </div>
                  <div class="continue-btn-log">
										<input class="product-btn-default-cnfm-CON-log" type="submit" value="SIGN IN" ></input>
										</div>
                    <div class="no-acc">
                    Don’t have an account?
          </div>
          <div class=" sub-shop-addcart-log"  >
                                        <input class="product-btn-single-addcart-log" type="submit" value="continue shopping" ></input>
                                    </div>
        
      
          
 

</div>
</div>
</div>
</div>
          
  
    )
}

export default LoginShop;
