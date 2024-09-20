import React from 'react'
import { Link } from 'react-router-dom';


function Skipordersuccess({ close }) {

    //   const [toggle, setToggle] = useState(false);
    // const handleToggle = () => {
    //     setToggle(pre => !pre)
    //   }
    return (
        <div className="popup-box-quick">
            <div className="box-quick-subcription">
                <div class="m-acc">
                    {/* <h3 class="edit-sub-heading" ><b>Confirmed!</b></h3> */}
                    {/* <span className="close-icon" onClick={() => close()} > x</span> */}
                    <br/>
                    <div class="pro-part-sub">
                    <div class="edit-sub-summary" style={{ color:"black",textAlign:"center" }} >
                     <h4><b> Please Wait...</b>  </h4>
                        </div>
                        <br />
                        <div style={{ textAlign: "center" }}>
                            <div >
                                 {/* <button class="edit-sub-favorite-button" type="submit" value=""  ><a href="/subscription">CLOSE</a></button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Skipordersuccess;