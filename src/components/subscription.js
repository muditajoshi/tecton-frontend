import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../css/subscription.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Logo from "../images/newlogo_tecton.png";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Shoppingcart from "../images/Group 13.png";
import Userlogo from "../images/Group 12.png";
import { faPlus, faMinus, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import {
  Navbar,
  Container,
  NavDropdown,
  Offcanvas,
  Nav,
} from "react-bootstrap";
import Editsubcription from "../components/editsubcription";
import Shipnow from "../components/shipnow";
import Skiporder from "../components/skiporder";
import Unsubscribe from "../components/unsuscribe";
import axios from "axios";
import ScrollToTop from "./ScrollToTop";
import { incNumber } from "../actions/cartUpdateActions";
const Subscription = ({ history }) => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [subsid, setsubsid] = useState();
  const [prisid, setprisid] = useState();
  const [subsqty, setsubsqty] = useState();
  const [subsinterval, setsubsinterval] = useState();
  const [siisd, setsiisd] = useState();
  const [pause, setPause] = useState();
  const [mainid, setMainid] = useState();
  const [index, setindex] = useState();
  const [Dis, setDis] = useState();
  const [Amt, setAmt] = useState();
  const [shippingS, setShippingS] = useState();
  const [shippingSid, setShippingSid] = useState();
  const [productId, setProductId] = useState();
  const data = localStorage.getItem("userInfo");
  const data1 = JSON.parse(data);
  const inputFile = useRef(null);
  const userDetails = useSelector((state) => state?.userDetails);
  const { loading, user, error } = userDetails;
  const [toggle0, setToggle0] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
  const [isDropdownOpen11, setIsDropdownOpen11] = useState(false);
  const [isDropdownOpen22, setIsDropdownOpen22] = useState(false);
  const [isDropdownOpen33, setIsDropdownOpen33] = useState(false);
  const [isDropdownOpen00, setIsDropdownOpen00] = useState(false);
  const [isDropdownOpen44, setIsDropdownOpen44] = useState(false);
  const [isOpen88, setIsOpen88] = useState(false);
  const [isOpened, setIsOpen99] = useState(false);

  const handleDropdownToggle99 = (isOpen) => {
    setIsOpen99(isOpen);
  };

  const handleToggle88 = () => {
    setIsOpen88(!isOpen88);
  };
  const handleDropdownToggle44 = (isOpen) => {
    setIsDropdownOpen44(isOpen);
  };

  const handleDropdownToggle00 = (isOpen) => {
    setIsDropdownOpen00(isOpen);
  };

  const handleDropdownToggle11 = (isOpen) => {
    setIsDropdownOpen11(isOpen);
  };
  const handleDropdownToggle22 = (isOpen) => {
    setIsDropdownOpen22(isOpen);
  };
  const handleDropdownToggle33 = (isOpen) => {
    setIsDropdownOpen33(isOpen);
  };

  // dropdown caret toggle start //
  const handleDropdownToggle = (isOpen) => {
    setIsDropdownOpen(isOpen);
  };
  const handleDropdownToggle1 = (isOpen) => {
    setIsDropdownOpen1(isOpen);
  };
  const handleDropdownToggle2 = (isOpen) => {
    setIsDropdownOpen2(isOpen);
  };
  const handleDropdownToggle3 = (isOpen) => {
    setIsDropdownOpen3(isOpen);
  };
  // dropdown caret toggle end //

  const handleToggle0 = () => {
    setToggle0((pre) => !pre);
  };

  // console.log(user)

  const logout = () => {
    history.push("/");
    localStorage.removeItem("userInfo");
    localStorage?.removeItem("cartItems");
    localStorage?.removeItem("subscriptionItems");
    window.location.reload(false);
  };
  const cardquant = JSON.parse(localStorage.getItem("cartItems"));
  console.log(cardquant);
  cardquant?.map((val) => val.qty).reduce((a, b) => a + b, 0);
  console.log(cardquant?.map((val) => val.qty).reduce((a, b) => a + b, 0));
  var cardstate = cardquant?.map((val) => val.qty).reduce((a, b) => a + b, 0);
  console.log(cardstate);
  if (cardstate === undefined) {
    var cardstate = 0;
  }

  const handleToggle = () => {
    setTimeout(() => {
      dispatch(incNumber());
    }, 2000);
    setToggle((pre) => !pre);
  };

  const handleToggle1 = () => {
    setToggle1((pre) => !pre);
  };

  const billingDrop = (value) => {
    if (value == "edit") {
      handleToggle();
    }

    if (value == "skip") {
      handleToggle1();
    }
  };

  const handleToggle2 = () => {
    setToggle2((pre) => !pre);
  };
  const [subsHistory, setSubsHistory] = useState();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/api/orders/myorders`, {
        headers: {
          Authorization: `Bearer ${data1?.accessToken}`,
        },
        // }).then((res)=>(res.data.map((val)=>setorder((prevData)=>[...prevData , val.orderItems[0].name]))))
      })
      .then((res) =>
        console.log(
          res.data.map((val) =>
            val.orderItems.filter((vals) => vals.subscription === true)
          )
        )
      );
  }, []);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_PROXY_URL}/api/subscription/my-subscriptions`,
        {
          headers: {
            Authorization: `Bearer ${data1?.accessToken}`,
          },
          // }).then((res)=>(res.data.map((val)=>setorder((prevData)=>[...prevData , val.orderItems[0].name]))))
        }
      )
      .then((res) => setSubsHistory(res.data));
  }, []);
  // }).then((res)=>console.log(res.data.map((val)=>val.order.orderItems).map((vals)=>vals)))
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_PROXY_URL}/api/subscription/my-subscriptions`,
        {
          headers: {
            Authorization: `Bearer ${data1?.accessToken}`,
          },
          // }).then((res)=>(res.data.map((val)=>setorder((prevData)=>[...prevData , val.orderItems[0].name]))))
        }
      )
      .then((res) => console.log(res.data));
  }, []);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [cartData, setCartData] = useState();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/api/cart/user/${userInfo?.id}`)
      .then((res) =>
        setCartData(
          res?.data?.cart[0]?.cartItems
            ?.map((val) => val.qty)
            .reduce((a, b) => a + b, 0)
        )
      );
  }, []);
  if (cartData === undefined) {
    setCartData(0);
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo?.accessToken}`,
    },
  };
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_PROXY_URL}/api/users/${userInfo?.id}`,
        config
      )
      .then((res) => {
        setUserIsAdmin(res?.data?.isAdmin);
      });
  }, []);

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
  }, []);

  return (
    <div>
      <ScrollToTop />
      <div class="Act">
      <div class="row" style={{ fontFamily: "aktiv" }}>
          <div class="col-sm-4 ">
            <div class="contact-info">
              <div id="dep1">
                <ul class="menu-drop">
                  <li>
                    <a href="/order">ORDERS</a>
                  </li>
                  <li>
                    <a style={{ color: "orange" }} href="/subscription">
                      SUBSCRIPTIONS
                    </a>
                  </li>
                  <li>
                    <a href="/billing">PAYMENT AND SHIPPING</a>
                  </li>
                  <li>
                    <a href="/reward">REWARDS</a>
                  </li>
                  <li>
                    <a href="/refer">REFER A FRIEND</a>
                  </li>
                  <li>
                    <a href="/account">ACCOUNT SETTINGS</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
          <div class="col-sm-7">
            <div className="subscription-new-design">
              <div class="row">
                <div class="my-acc">
                  <h3 class="subp" style={{ paddingLeft: "0px" }}>
                    Subscriptions
                  </h3>
                </div>
              </div>
              <div id="subscription-for-desk">
                {subsHistory?.map((val) => (
                  <>
                    {" "}
                    <div className="subscription-box">
                      <div className="row">
                        <div
                          className="subscription-detail-mapping"
                          style={{ display: "flex" }}
                        >
                          <div
                            class=""
                            style={{ paddingLeft: "20px", width: "20%" }}
                          >
                            <b> Product</b>
                          </div>
                          <div
                            class=""
                            style={{ textAlign: "center", width: "20%" }}
                          >
                            <b> Qty</b>
                          </div>
                          <div
                            class=""
                            style={{ textAlign: "center", width: "20%" }}
                          >
                            <b> Amount</b>
                          </div>
                          <div
                            class=""
                            style={{ textAlign: "center", width: "20%" }}
                          >
                            <b>Frequency</b>
                          </div>
                          <div
                            class=""
                            style={{ textAlign: "center", width: "20%" }}
                          >
                            <b> Shipment Date</b>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div
                          className="subscription-detaill"
                          style={{ display: "flex" }}
                        >
                          <div
                            class=""
                            style={{ textAlign: "center", width: "20%" }}
                          >
                            {val.order.orderItems.map((valus) => (
                              <div>{valus.name}</div>
                            ))}
                          </div>
                          <div
                            class=""
                            style={{ textAlign: "center", width: "20%" }}
                          >
                            {val.stripeData.map((item) => (
                              <div>{item?.items?.data[0]?.quantity}</div>
                            ))}
                          </div>
                          <div
                            class=""
                            style={{ textAlign: "center", width: "20%" }}
                          >
                            {/* {(val?.stripeData?.map((valm,inn)=><div><span>$</span>{((valm?.items?.data[0]?.plan?.amount/100*valm?.items?.data[0]?.quantity)+(valm?.items?.data[1]?.plan?.amount/100?(valm?.items?.data[1]?.plan?.amount/100):(0))+(((val?.order?.orderItems?.map((valop)=>valop?.taxPercent)[inn]*(valm?.items?.data[1]?.plan?.amount/100?((valm?.items?.data[1]?.plan?.amount/100+valm?.items?.data[0]?.plan?.amount/100)):(valm?.items?.data[0]?.plan?.amount/100))*valm?.items?.data[0]?.quantity)/100))-((valm?.discount?.coupon?.percent_off/100)*((valm?.items?.data[1]?.plan?.amount/100?((valm?.items?.data[1]?.plan?.amount/100+valm?.items?.data[0]?.plan?.amount/100+(val?.order?.orderItems?.map((valop)=>valop?.taxPercent)[inn]*(valm?.items?.data[1]?.plan?.amount/100?((valm?.items?.data[1]?.plan?.amount/100+valm?.items?.data[0]?.plan?.amount/100)):(valm?.items?.data[0]?.plan?.amount/100))*valm?.items?.data[0]?.quantity)/100)):(valm?.items?.data[0]?.plan?.amount/100+(val?.order?.orderItems?.map((valop)=>valop?.taxPercent)[inn]*(valm?.items?.data[1]?.plan?.amount/100?((valm?.items?.data[1]?.plan?.amount/100+valm?.items?.data[0]?.plan?.amount/100)):(valm?.items?.data[0]?.plan?.amount/100))*valm?.items?.data[0]?.quantity)/100))*valm?.items?.data[0]?.quantity))).toFixed(2)}</div>))} */}
                            {/* {(val?.stripeData?.map((valm,inn)=><div><span>$</span>{(((valm?.items?.data[0]?.plan?.amount/100)*(valm?.items?.data[0]?.quantity))+((valm?.items?.data[1]?.plan?.amount/100)?((valm?.items?.data[1]?.plan?.amount/100)):(0))+(((val?.order?.orderItems?.map((valop)=>valop?.taxPercent)[inn])*((valm?.items?.data[1]?.plan?.amount/100)?(((valm?.items?.data[1]?.plan?.amount/100)+(valm?.items?.data[0]?.plan?.amount/100))):((valm?.items?.data[0]?.plan?.amount/100)))*(valm?.items?.data[0]?.quantity))/100)-((((valm?.items?.data[0]?.plan?.amount/100)*(valm?.items?.data[0]?.quantity))+((valm?.items?.data[1]?.plan?.amount/100)?((valm?.items?.data[1]?.plan?.amount/100)):(0))+(((val?.order?.orderItems?.map((valop)=>valop?.taxPercent)[inn])*((valm?.items?.data[1]?.plan?.amount/100)?(((valm?.items?.data[1]?.plan?.amount/100)+(valm?.items?.data[0]?.plan?.amount/100))):((valm?.items?.data[0]?.plan?.amount/100)))*(valm?.items?.data[0]?.quantity))/100))*(valm?.discount?.coupon?.percent_off/100))).toFixed(2)}</div>))} */}
                            {/* {(val?.stripeData?.map((valm,inn)=><div><span>$</span>{("totalprice")-("totalprice*discount")+("shippingprice")+((("totalprice")-("totalprice*discount")+("shippingprice"))*"taxpercent")}</div>))} */}
                            {/* {(val?.stripeData?.map((valm,inn)=><div><span>$</span>{((((valm?.items?.data[0]?.plan?.amount/100)*(valm?.items?.data[0]?.quantity)))-((((valm?.items?.data[0]?.plan?.amount/100)*(valm?.items?.data[0]?.quantity)))*(valm?.discount?.coupon?.percent_off/100))+(((valm?.items?.data[1]?.plan?.amount/100)?((valm?.items?.data[1]?.plan?.amount/100)):(0)))+(((((valm?.items?.data[0]?.plan?.amount/100)*(valm?.items?.data[0]?.quantity)))-((((valm?.items?.data[0]?.plan?.amount/100)*(valm?.items?.data[0]?.quantity)))*((valm?.discount?.coupon?.percent_off/100)))+(((valm?.items?.data[1]?.plan?.amount/100)?((valm?.items?.data[1]?.plan?.amount/100)):(0))))*((val?.order?.orderItems?.map((valop)=>valop?.taxPercent)[inn]/100)))).toFixed(2)}</div>))} */}
                            {/* {(val?.stripeData?.map((valm,inn)=><div><span>$</span>{(((val?.order?.orderItems.map((valp,ind)=>valp?.itemTotalPrice))[inn])-(((val?.order?.orderItems.map((valp,ind)=>valp?.itemTotalPrice))[inn])*(valm?.discount?.coupon?.percent_off/100))+((val?.order?.orderItems.map((valp,ind)=>valp?.qty))[inn]>1?(0):(6.99))+((val?.order?.orderItems.map((valp,ind)=>valp?.taxPercent))[inn])).toFixed(2)}</div>))} */}
                            {val?.stripeData?.map((valm, inn) => (
                              <div>
                                <span>$</span>
                                {(
                                  (val?.order?.orderItems.map(
                                    (valp, ind) => valp?.itemTotalPrice
                                  ))[inn] -
                                  (val?.order?.orderItems.map(
                                    (valp, ind) => valp?.itemTotalPrice
                                  ))[inn] *
                                    (valm?.discount?.coupon?.percent_off /
                                      100) +
                                  val?.order?.shippingPrice +
                                  (val?.order?.orderItems.map(
                                    (valp, ind) => valp?.taxPercent
                                  ))[inn]
                                ).toFixed(2)}
                              </div>
                            ))}
                            {/* totalPrice- {(val?.stripeData?.map((valm,inn)=><div><span>$</span>{((valm?.items?.data[0]?.plan?.amount/100)*(valm?.items?.data[0]?.quantity))}</div>))}
                     discountPercent- {(val?.stripeData?.map((valm,inn)=><div><span>$</span>{(valm?.discount?.coupon?.percent_off/100)}</div>))}
                     shipping-{(val?.stripeData?.map((valm,inn)=><div><span>$</span>{(((valm?.items?.data[1]?.plan?.amount/100)?((valm?.items?.data[1]?.plan?.amount/100)):(0)))}</div>))}
                     tax-{(val?.stripeData?.map((valm,inn)=><div><span>$</span>{(val?.order?.orderItems?.map((valop)=>valop?.taxPercent)[inn])}</div>))} */}
                          </div>
                          <div
                            class=""
                            style={{ textAlign: "center", width: "20%" }}
                          >
                            {val.stripeData.map((valus) => (
                              <div>
                                {valus?.items?.data[0]?.plan?.interval_count +
                                  " " +
                                  valus?.items?.data[0]?.plan?.interval +
                                  "s"}
                              </div>
                            ))}
                          </div>
                          <div
                            class=""
                            style={{ textAlign: "center", width: "20%" }}
                          >
                            {val.stripeData.map((valss) => (
                              <div>
                                {new Date(
                                  (valss?.pause_collection?.resumes_at
                                    ? valss?.pause_collection?.resumes_at
                                    : valss?.current_period_end) * 1000
                                ).toLocaleDateString()}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <br />
                      <div className="row">
                        {val.stripeData.map((vals, ind) => (
                          <div style={{ display: "flex" }}>
                            <div
                              className="modify-new"
                              style={{ textAlign: "center", width: "15%" }}
                            >
                              <button
                                onClick={() => {
                                  handleToggle();
                                  setsubsid(vals.id);
                                  setsubsqty(vals?.items?.data[0]?.quantity);
                                  setsubsinterval(
                                    vals?.items?.data[0]?.plan?.interval_count +
                                      " " +
                                      vals?.items?.data[0]?.plan?.interval +
                                      "s"
                                  );
                                  setsiisd(vals.items.data[0].id);
                                  setprisid(vals.items.data[0].plan.id);
                                  setMainid(val._id);
                                  setindex(ind);
                                  setAmt(
                                    vals?.items?.data[0]?.plan?.amount / 100
                                  );
                                  setDis(
                                    vals?.discount?.coupon?.percent_off / 100
                                  );
                                  setShippingS(
                                    vals?.items?.data[1]?.plan?.amount / 100
                                  );
                                  setShippingSid(vals?.items?.data[1]?.id);
                                  setProductId(
                                    val?.order?.orderItems[ind]?.product
                                  );
                                  setPause(vals?.pause_collection);
                                }}
                                class="edit"
                              >
                                MODIFY
                              </button>

                              {toggle && (
                                <Editsubcription
                                  subid={subsid}
                                  subqty={subsqty}
                                  subinterval={subsinterval}
                                  siid={siisd}
                                  prid={prisid}
                                  mainidd={mainid}
                                  indd={index}
                                  diss={Dis}
                                  amtt={Amt}
                                  shippingP={shippingS}
                                  shippingSiid={shippingSid}
                                  productId={productId}
                                  pauseit={pause}
                                  close={() => setToggle(false)}
                                />
                              )}
                            </div>
                            <div
                              className="ship-now-new"
                              style={{ textAlign: "center", width: "32%" }}
                            >
                              <button
                                onClick={() => {
                                  handleToggle1();
                                  setProductId(
                                    val?.order?.orderItems[ind]?.product
                                  );
                                  setsubsid(vals.id);
                                  setsubsqty(vals?.items?.data[0]?.quantity);
                                }}
                                class="edit"
                              >
                                {vals?.pause_collection ? "" : "SKIP ORDER"}
                              </button>

                              {toggle1 && (
                                <Skiporder
                                  subid={subsid}
                                  productId={productId}
                                  subqty={subsqty}
                                  close={() => setToggle1(false)}
                                />
                              )}
                            </div>
                            <div
                              className="skip-order-new"
                              style={{
                                textAlign: "right",
                                width: "51%",
                                paddingRight: "15px",
                              }}
                            >
                              {new Date(
                                vals?.current_period_start * 1000
                              ).toLocaleDateString() ==
                              new Date().toLocaleDateString() ? (
                                <></>
                              ) : (
                                <button
                                  onClick={() => {
                                    setsubsqty(vals?.items?.data[0]?.quantity);
                                    setsubsid(vals.id);
                                    setProductId(
                                      val?.order?.orderItems[ind]?.product
                                    );
                                    handleToggle0();
                                  }}
                                  class="modify"
                                >
                                  SHIP NOW
                                </button>
                              )}
                              {toggle0 && (
                                <Shipnow
                                  subqty={subsqty}
                                  subid={subsid}
                                  productId={productId}
                                  close={() => setToggle0(false)}
                                />
                              )}
                            </div>
                            <br />
                            <br />
                          </div>
                        ))}
                        {/* <div className='skip-message' style={{ textAlign: "left" }}>
          <FontAwesomeIcon icon={faCheckCircle} style={{ color: "#08b608", fontSize: "16px", paddingRight: "4px" }} />     You have modified the shipping schedule for Glacier 12 Pack - 12 FL OZ Ketone Hydration to 12/24/2022
        </div> */}
                        {/* <div className='skip-message' style={{ textAlign: "left" }}>
          <FontAwesomeIcon icon={faCheckCircle} style={{ color: "#08b608", fontSize: "16px", paddingRight: "4px" }} />       Your shipping for current order for Glacier 12 Pack - 12 FL OZ Ketone Hydration will be skipped to 12/24/2023
        </div> */}
                        {/* <div className='skip-message' style={{ textAlign: "left" }}>
          <FontAwesomeIcon icon={faCheckCircle} style={{ color: "#08b608", fontSize: "16px", paddingRight: "4px" }} />       Your order for Glacier 12 Pack - 12 FL OZ Ketone Hydration, which was supposed to ship on 12/24/2023, will be shipped to you in 3-5 business days after you confirm. The remaining subscription frequency will remain the same.
        </div> */}
                      </div>
                    </div>
                  </>
                ))}
              </div>
              <div id="subscription-for-mob">
                {subsHistory?.map((val) => (
                  <>
                    {" "}
                    <div className="subscription-box-new">
                      <div class="row">
                        <div style={{ display: "flex" }}>
                          <div
                            class=""
                            style={{ textAlign: "left", width: "50%" }}
                          >
                            {" "}
                            <b>Product</b>
                          </div>
                          <div
                            style={{
                              textAlign: "right",
                              width: "50%",
                              color: "#757575",
                            }}
                          >
                            {val.order.orderItems.map((valus) => (
                              <div>{valus.name}</div>
                            ))}
                          </div>
                        </div>
                        <div style={{ display: "flex" }}>
                          <div style={{ textAlign: "left", width: "50%" }}>
                            <b>Qty </b>
                          </div>
                          <div
                            style={{
                              textAlign: "right",
                              width: "50%",
                              color: "#757575",
                            }}
                          >
                            {" "}
                            {val.stripeData.map((item) => (
                              <div>{item?.items?.data[0]?.quantity}</div>
                            ))}{" "}
                          </div>
                        </div>

                        <div style={{ display: "flex" }}>
                          <div style={{ textAlign: "left", width: "50%" }}>
                            <b>Amount </b>
                          </div>
                          <div
                            style={{
                              textAlign: "right",
                              width: "50%",
                              color: "#757575",
                            }}
                          >
                            {" "}
                            {val?.stripeData?.map((valm, inn) => (
                              <div>
                                <span>$</span>
                                {(
                                  (val?.order?.orderItems.map(
                                    (valp, ind) => valp?.itemTotalPrice
                                  ))[inn] -
                                  (val?.order?.orderItems.map(
                                    (valp, ind) => valp?.itemTotalPrice
                                  ))[inn] *
                                    (valm?.discount?.coupon?.percent_off /
                                      100) +
                                  val?.order?.shippingPrice +
                                  (val?.order?.orderItems.map(
                                    (valp, ind) => valp?.taxPercent
                                  ))[inn]
                                ).toFixed(2)}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div style={{ display: "flex" }}>
                          <div style={{ textAlign: "left", width: "50%" }}>
                            <b>Frequency </b>
                          </div>
                          <div
                            style={{
                              textAlign: "right",
                              width: "50%",
                              color: "#757575",
                            }}
                          >
                            {" "}
                            {val.stripeData.map((valus) => (
                              <div>
                                {valus?.items?.data[0]?.plan?.interval_count +
                                  " " +
                                  valus?.items?.data[0]?.plan?.interval +
                                  "s"}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div style={{ display: "flex" }}>
                          <div style={{ textAlign: "left", width: "50%" }}>
                            <b>Next Shipment </b>
                          </div>
                          <div
                            style={{
                              textAlign: "right",
                              width: "50%",
                              color: "#757575",
                            }}
                          >
                            {val.stripeData.map((valss) => (
                              <div>
                                {new Date(
                                  (valss?.pause_collection?.resumes_at
                                    ? valss?.pause_collection?.resumes_at
                                    : valss?.current_period_end) * 1000
                                ).toLocaleDateString()}
                              </div>
                            ))}{" "}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        {val.stripeData.map((vals, ind) => (
                          <div>
                            <div style={{ display: "flex", paddingTop: "5px" }}>
                              <div
                                className="modify-new"
                                style={{ textAlign: "left", width: "50%" }}
                              >
                                <button
                                  onClick={() => {
                                    handleToggle();
                                    setsubsid(vals.id);
                                    setsubsqty(vals?.items?.data[0]?.quantity);
                                    setsubsinterval(
                                      vals?.items?.data[0]?.plan
                                        ?.interval_count +
                                        " " +
                                        vals?.items?.data[0]?.plan?.interval +
                                        "s"
                                    );
                                    setsiisd(vals.items.data[0].id);
                                    setprisid(vals.items.data[0].plan.id);
                                    setMainid(val._id);
                                    setindex(ind);
                                    setAmt(
                                      vals?.items?.data[0]?.plan?.amount / 100
                                    );
                                    setDis(
                                      vals?.discount?.coupon?.percent_off / 100
                                    );
                                    setShippingS(
                                      vals?.items?.data[1]?.plan?.amount / 100
                                    );
                                    setShippingSid(vals?.items?.data[1]?.id);
                                    setProductId(
                                      val?.order?.orderItems[ind]?.product
                                    );
                                    setPause(vals?.pause_collection);
                                  }}
                                  class="edit-mobile-sub"
                                  style={{ color: "black" }}
                                >
                                  MODIFY
                                </button>

                                {toggle && (
                                  <Editsubcription
                                    subid={subsid}
                                    subqty={subsqty}
                                    subinterval={subsinterval}
                                    siid={siisd}
                                    prid={prisid}
                                    mainidd={mainid}
                                    indd={index}
                                    diss={Dis}
                                    amtt={Amt}
                                    shippingP={shippingS}
                                    shippingSiid={shippingSid}
                                    pauseit={pause}
                                    productId={productId}
                                    close={() => setToggle(false)}
                                  />
                                )}
                              </div>
                              <div
                                className="ship-now-new"
                                style={{ textAlign: "right", width: "50%" }}
                              >
                                <button
                                  onClick={() => {
                                    handleToggle1();
                                    setProductId(
                                      val?.order?.orderItems[ind]?.product
                                    );
                                    setsubsid(vals.id);
                                    setsubsqty(vals?.items?.data[0]?.quantity);
                                  }}
                                  class="edit-mobile-sub"
                                  style={{ color: "black" }}
                                >
                                  {vals?.pause_collection ? "" : "SKIP ORDER"}
                                </button>

                                {toggle1 && (
                                  <Skiporder
                                    subqty={subsqty}
                                    subid={subsid}
                                    productId={productId}
                                    close={() => setToggle1(false)}
                                  />
                                )}
                              </div>
                            </div>
                            <div
                              className="skip-order-new"
                              style={{
                                textAlign: "center",
                                width: "100%",
                                paddingTop: "10px",
                              }}
                            >
                              {new Date(
                                vals?.current_period_start * 1000
                              ).toLocaleDateString() ==
                              new Date().toLocaleDateString() ? (
                                <></>
                              ) : (
                                <button
                                  onClick={() => {
                                    setsubsqty(vals?.items?.data[0]?.quantity);
                                    setsubsid(vals.id);
                                    setProductId(
                                      val?.order?.orderItems[ind]?.product
                                    );
                                    handleToggle0();
                                  }}
                                  class="modify-mob-new"
                                  style={{ color: "black" }}
                                >
                                  SHIP NOW
                                </button>
                              )}

                              {toggle0 && (
                                <Shipnow
                                  subqty={subsqty}
                                  subid={subsid}
                                  productId={productId}
                                  close={() => setToggle0(false)}
                                />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
