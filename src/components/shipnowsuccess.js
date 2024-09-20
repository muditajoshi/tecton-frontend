import React from 'react'
import { useState } from 'react';

function Shipnowsuccess({ close }) {

    //   const [toggle, setToggle] = useState(false);
    // const handleToggle = () => {
    //     setToggle(pre => !pre)
    //   }
    return (
        <div className="popup-box-quick">
            <div className="box-quick-subcription">
                <div class="m-acc">
                    <h3 class="edit-sub-heading" ><b>Confirmed!</b></h3>
                    <span className="close-icon" onClick={() => close()} > x</span>
                    <br/>
                    <div class="pro-part-sub">
                        <div class="edit-sub-summary" style={{ color: "#757575",paddingRight:"-10px" }} >
                        Your order will be shipped on the next business day.
You will receive a confirmation email shortly.
                          <br/>
                          <br/>
                          
                        </div>
                        <br />
                        <div style={{ textAlign: "center" }}>
                            <div >
                                <button class="edit-sub-favorite-button" type="submit" value=""  ><a href="/subscription">CLOSE</a></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shipnowsuccess;