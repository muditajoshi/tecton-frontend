import "../css/quikadd.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import OverlayEditSub from "../skeleton/OverlayEditSub";

const ViewDetails = ({ close, img }) => {
  console.log(img);
  const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
  const [overlay, setoverlay] = useState();
  const [show, setShow] = useState(false);
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
  const [ prices,setprices] = useState();
  useEffect(()=>{
    setoverlay(<OverlayEditSub />);
    setShow(true);
		axios.get(`${process.env.REACT_APP_PROXY_URL}/api/orders/${img?._id}`, config).then((res)=>{setprices(res.data);setShow(false)})
	},[])
console.log(prices)
  return (
    <div className="popup-box-quick">
      {show ? overlay : <></>}
      {/* <aside className='login' > */}
      <div className="box-quick">
        <div class="all-product">
          <div class="container">
            <div class=" cont-act-for col-sm-8">
              <div class="row">
                <div class="m-acc">
                  <h3 class="edit-sub-heading" style={{ float: "left" }}>
                    <b>View Details</b>
                  </h3>
                  <span className="close-icon" onClick={() => close()}>
                    {" "}
                    x
                  </span>{" "}
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-sm-6">
                <hr
                  style={{
                    border: "1px solid grey",
                    width: "100%",
                    zIndex: "-1",
                  }}
                ></hr>
                {prices?.orderItems?.map((val) => (
                  <div>
                    {
                      <>
                        <div className="row">
                          <div class="col-6">
                            <div
                              class="edit-subcription-card"
                              style={{
                                textAlign: "left",
                                height: "96%",
                                width: "100%",
                                backgroundColor: "white",
                              }}
                            >
                              <img
                                style={{ width: "125px" }}
                                src={val?.image}
                              />
                            </div>
                          </div>
                          <div class="col-4">
                            <h5
                              class="product-great-sub"
                              style={{
                                textAlign: "left",
                                marginLeft: "0px",
                                width: "11rem",
                              }}
                            >
                              <div className="" style={{fontFamily:"aktivExt"}}>
                              <b> {val?.name}</b>
                              </div>
                              <div
                                class="email-quantity"
                                style={{ fontSize: " 14px", color: " black" }}
                              >
                                12 FL OZ • Ketone Hydration
                                <br />
                                Qty: {val?.qty}
                                <br />
                                {val?.frequency}
                                <br />
                                <br />
                                <br />
                                <b style={{ fontSize: "18px" }}>
                                  ${(val?.price * val?.qty).toFixed(2)}
                                </b>
                              </div>
                            </h5>
                          </div>
                        </div>
                        <hr
                          style={{
                            border: "1px solid grey",

                            width: "100%",
                            zIndex: "-1",
                          }}
                        ></hr>
                      </>
                    }
                  </div>
                ))}
                {/* table */}
                <table cellPadding="0" cellSpacing="0" width="100%">
                  <tbody>
                    <tr>
                      <td align="left" valign="top">
                        Subtotal
                      </td>
                      <td align="right" valign="top">
                        $
                        {prices?.orderItems
                          ?.reduce(
                            (acc, item) => acc + item.qty * item.price,
                            0
                          )
                          .toFixed(2)}
                      </td>
                    </tr>

                    <tr>
                      <td align="left" valign="top">
                        Shipping
                      </td>
                      <td align="right" valign="top">
                        ${prices?.shippingPrice}
                      </td>
                    </tr>

                    <tr>
                      <td align="left" valign="top">
                        Discount
                      </td>
                      <td align="right" valign="top">
                      <span style={{color:"red"}}>{prices?.orderMetaData && prices?.orderMetaData[0]?.discountPercent>0 ? (<span style={{color:"red"}}>{prices?.orderMetaData[0]?.discountPercent}% ({prices.userType[0]==="Employee"?(<>Special discount</>):(prices?.userType[0]=="Veteran"?(<>Military/Military Vets/First Responders discount</>):(prices?.userType[0]=="Individual" && userInfo?.userMetaData?.refCode ?("AmbassadorReferral discount"):(prices?.userType[0]=="Individual" && !userInfo?.userMetaData ?("couponcode discount"):(prices?.userType+" "+"discount"))))})</span>):(<>$00.00</>)}</span>
                      </td>
                    </tr>

                    <tr>
                      <td align="left" valign="top">
                        Tax
                      </td>
                      <td align="right" valign="top">
                        ${prices?.taxPrice.toFixed(2)}
                      </td>
                    </tr>

                    <tr>
                      <td align="left" valign="top">
                        <h5>
                          <b>Total</b>
                        </h5>
                      </td>
                      <td align="right" valign="top">
                        <h5>
                          <b>
                            $
                            {(
                              prices?.totalPrice
                            )?.toFixed(2)}
                          </b>
                        </h5>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* table */}

                {/* <div class="star-icon-edit" style={{ display: "flex" }}>
                  <div style={{ width: "50%", textAlign: "left" }}>
                    Subtotal
                  </div>
                  <div style={{ width: "50%", textAlign: "center" }}>
                    $
                    {prices?.orderItems
                      ?.reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </div>
                </div> */}
                {/* <div class="star-icon-edit" style={{ display: "flex" }}>
                  <div style={{ width: "50%", textAlign: "left" }}>
                    Shipping
                  </div>
                  <div style={{ width: "50%", textAlign: "center" }}>
                    ${prices?.shippingPrice}
                  </div>
                </div>
                <div class="star-icon-edit" style={{ display: "flex" }}> */}
                {/* <div class="order-total-edit">
                                        <br />
                                        Subtotal
                                        <br />
                                        Discount
                                        <br />
                                        Shipping
                                        <br />
                                        Tax
                                    </div> */}

                {/* <div style={{ width: "50%", textAlign: "left" }}>
                    <h3>
                      <b>Total</b>
                    </h3>
                  </div>
                  <div style={{ width: "50%", textAlign: "center" }}>
                    <h3>
                      <b>
                        $
                        {(
                          prices?.orderItems?.reduce(
                            (acc, item) => acc + item.qty * item.price,
                            0
                          ) + prices?.shippingPrice
                        ).toFixed(2)}
                      </b>
                    </h3>
                  </div> */}
                {/* <div class="amount-totl-edit-sub"> */}
                {/* <br />
                                        0000
                                         <br />
                                        $00.00
                                         <br />
                                        $00.00
                                        <br />
                                        $00.00
                                        <br /> */}
                {/* <div class="sub-tot-edit">
                                              00 
                                        </div> */}
                {/* </div> */}
                {/* </div> */}
              </div>
              <div class="col-sm-6">
                <div className="viewdetail" style={{ textAlign: "left", paddingLeft: "80px" }}>
                  {/* <b>Order Number</b> */}
                  <br />
                  <br />
                  {/* <b>order Status :</b><br /> */}
                  <b>Order Date:{prices?.createdAt.slice(0, 10)}</b>
                  <br/>
                  <br/>
                  <b>Order status:{prices?.orderMetaData?.orderStatus}</b>
                  <br/>
                  {/* <b>Shipped: </b><br /> */}
                  {/* <b>Total:</b><br /> */}
                  <br />
                  <b>Shipping Address</b>
                  <br />
                  {prices?.shippingAddress?.address}
                  <br />
                  {prices?.shippingAddress?.city}, {prices?.shippingAddress?.state}{" "}
                  {prices?.shippingAddress?.postalCode}
                  <br />
                  United States
                  <br />
                  <br />
                  <b>Billing Address</b>
                  <br />
                  {/* Credit Card ending in 0000<br />
                                    <br /> */}
                  {prices?.billingAddress?.firstName}{" "}
                  {prices?.billingAddress?.lastName}
                  <br />
                  {prices?.billingAddress?.address}
                  <br />
                  {prices?.billingAddress?.city}, {prices?.billingAddress?.state}{" "}
                  {prices?.billingAddress?.postalCode}
                  <br />
                  United States
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
