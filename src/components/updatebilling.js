import React from 'react'

const Updatebilling = ({close}) => {
  return (
    <div className="popup-box-quick">
    <div className="box-quick-subcription">
        <div class="m-acc">
            {/* <h3 class="edit-sub-heading" ><b>Updated</b></h3> */}
            <span className="close-icon" onClick={() => close()} > x</span>
            <br/>
            <div class="pro-part-sub">
            <div class="edit-sub-summary" style={{ fontSize:"20px",textAlign:"center",color:"black" }} >
               <b>Payment Updated</b> 
                </div>
                <br />
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

export default Updatebilling