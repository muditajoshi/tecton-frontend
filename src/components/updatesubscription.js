import React from 'react'
import { useState } from 'react';

function Updatesubscription({ close }) {

    //   const [toggle, setToggle] = useState(false);
    // const handleToggle = () => {
    //     setToggle(pre => !pre)
    //   }
    return (
        <div className="popup-box-quick">
            <div className="box-quick-subcription-edit">
                <div class="m-acc">
                    {/* <h3 class="edit-sub-heading" ><b>Updated</b></h3> */}
                    <span className="close-icon" onClick={() => close()} > x</span>
                    <br/>
                    <div class="pro-part-sub">
                        <div class="edit-sub-summary" style={{ color:"black",textAlign:"center",fontSize:"13px",fontWeight:"normal" }} >
                     <h4 style={{ fontSize:"21px"}}> Please Wait...  </h4>
                        </div>
                    
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Updatesubscription;