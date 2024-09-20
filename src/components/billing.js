import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../css/billing.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Logo from "../images/newlogo_tecton.png";
import { Link } from "react-router-dom";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Shoppingcart from "../images/Group 13.png";
import Userlogo from "../images/Group 12.png";

import {
  Navbar,
  Container,
  NavDropdown,
  Offcanvas,
  Nav,
} from "react-bootstrap";
import Editbilling from "../components/editbilling";
import Editshipping from "../components/editshipping";
import Addbilling from "./addbilling";
import Addshipping from "../components/addshipping";
import axios from "axios";
import OverlayEditSub from "../skeleton/OverlayEditSub";
import { faPlus, faMinus, faAngleUp } from "@fortawesome/free-solid-svg-icons";

const Billing = ({ history }) => {
  const data = localStorage.getItem("userInfo");
  const data1 = JSON.parse(data);
  const inputFile = useRef(null);
  const userDetails = useSelector((state) => state?.userDetails);
  const { loading, user, error } = userDetails;
  const [isActive4, setIsActive4] = useState(false);
  const [isActive5, setIsActive5] = useState(false);
  const [isActive7, setIsActive7] = useState(false);
  const [isActive6, setIsActive6] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);
  const [toggle4, setToggle4] = useState(false);
  const [shipping_address, set_shipping_address] = useState();
  const [billing_address, set_billing_address] = useState();
  const [pfirstName, setpfirstName] = useState();
  const [plastName, setplastname] = useState();
  const [paddress, setpaddress] = useState();
  const [pcity, setpcity] = useState();
  const [ppostalcode, setppostalcode] = useState();
  const [papt, setpapt] = useState();
  const [pcountry, setpcountry] = useState();
  const [pstate, setpstate] = useState();
  const [Id, setId] = useState();
  const [lastFour, setLastFour] = useState();
  const [expDate, setExpDate] = useState();
  const [defaultId, setDefaultId] = useState();
  const [err, setErr] = useState();
  const [show, setShow] = useState(false);

  const [overlay, setoverlay] = useState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
  const [isDropdownOpen11, setIsDropdownOpen11] = useState(false);
  const [isDropdownOpen22, setIsDropdownOpen22] = useState(false);
  const [isDropdownOpen33, setIsDropdownOpen33] = useState(false);
  const [isDropdownOpen00, setIsDropdownOpen00] = useState(false);
  const [isDropdownOpen44, setIsDropdownOpen44] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpened, setIsOpen99] = useState(false);

  const handleDropdownToggle99 = (isOpen) => {
    setIsOpen99(isOpen);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
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
  // console.log(user)

  const logout = () => {
    history.push("/");
    localStorage.removeItem("userInfo");
    localStorage?.removeItem("cartItems");
    localStorage?.removeItem("subscriptionItems");
    window.location.reload(false);
  };
  const handleToggle1 = () => {
    setToggle1((pre) => !pre);
  };
  const handleToggle2 = () => {
    setToggle2((pre) => !pre);
  };
  const handleToggle3 = () => {
    setToggle3((pre) => !pre);
  };
  const handleToggle4 = () => {
    setToggle4((pre) => !pre);
  };
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

  const cardquant = JSON.parse(localStorage.getItem("cartItems"));
  // console.log(cardquant)
  cardquant?.map((val) => val.qty).reduce((a, b) => a + b, 0);
  // console.log(cardquant?.map((val) => val.qty).reduce((a, b) => a + b, 0));
  var cardstate = cardquant?.map((val) => val.qty).reduce((a, b) => a + b, 0);
  // console.log(cardstate)
  if (cardstate === undefined) {
    var cardstate = 0;
  }
  const config = userInfo?.isSocialLogin
    ? {
        headers: {
          Authorization: `SocialLogin ${userInfo?.id}`,
        },
      }
    : {
        headers: {
          Authorization: `Bearer ${userInfo?.accessToken}`,
        },
      };
  //   useEffect(()=>{
  //   axios.get(`${process.env.REACT_APP_PROXY_URL}/api/address/user`,config).then((res)=>console.log(res.data[0].shippingAddress))
  // },[])
  // useEffect(()=>{
  //   axios.get(`${process.env.REACT_APP_PROXY_URL}/api/address/user`,config).then((res)=>console.log(res?.data[0]?.billingAddress))
  // },[])
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/api/address/user`, config)
      .then((res) => set_shipping_address(res.data[0]?.shippingAddress));
  }, []);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/api/address/user`, config)
      .then((res) => set_billing_address(res.data[0]?.billingAddress));
  }, []);
  const [cardsData, SetCardsData] = useState(null);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_PROXY_URL}/api/paymentMethod/get-all-payment-methods`,
        config,
        {
          customerId: userInfo?.stripeCustomerId,
        }
      )
      .then((res) => {
        SetCardsData(res.data.data[0]);
        //SetCardsData(res.data.paymentMethods.data);
        console.log("cardsData->", res.data.data[0]);
      });
  }, []);
  const [stripid, setstripeid] = useState();
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_PROXY_URL}/api/users/${userInfo?.id}`,
        config
      )
      .then((res) => setstripeid(res?.data?.stripeCustomerId));
  }, []);

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
    <div class="acc">
      {show ? overlay : <></>}
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
                  <a href="/subscription">SUBSCRIPTIONS</a>
                </li>
                <li>
                  <a style={{ color: "orange" }} href="/billing">
                    PAYMENT AND SHIPPING
                  </a>
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
        <div class="col-sm-8 ">
          <div class="my-acc">
            <h5 class="bil">Payment And Shipping</h5>
          </div>
          <div className="billing-payment-page">Payment And Billing</div>
          <br />
          <div className="add-address-billing">
            <button
              type="button"
              style={{ color: "black" }}
              class="edit-sub-update-button-billing1 "
              onClick={handleToggle2}
              value=""
            >
              ADD PAYMENT METHOD
            </button>
            {toggle2 && <Addbilling close={() => setToggle2(false)} />}
          </div>

          {cardsData?.paymentMethods?.data.map((valk) => (
            <>
              {
                <div className="billing-address-add">
                  <br />
                  <hr
                    style={{
                      border: "0.8px #757575",
                      width: "94%",
                      zIndex: "-1",
                      position: "relative",
                    }}
                  ></hr>
                  <div style={{ fontSize: "0.95rem" }}>
                    <div style={{ display: "flex" }}>
                      <div
                        className="defaut-bill"
                        style={{ width: "45%", fontSize: "0.95rem" }}
                      >
                        {" "}
                        Credit card ending in {valk?.card.last4}{" "}
                      </div>
                      <div
                        className="defaut-bill"
                        style={{ width: "39%", fontSize: "0.95rem" }}
                      >
                        Exp {valk?.card?.exp_month}/{valk?.card?.exp_year}
                      </div>
                      <div className="default-ship">
                        {cardsData?.defaultPaymentMethod === valk?.id ? (
                          <>Default</>
                        ) : (
                          <></>
                        )}
                      </div>
                      {/* {valk?.firstName===userInfo?.billingAddress?.firstName && valk?.lastName===userInfo?.billingAddress?.lastName && valk?.city===userInfo?.billingAddress?.city && valk?.address===userInfo?.billingAddress.address1 && valk?.apt===userInfo?.billingAddress.address2 && valk?.postalCode===userInfo?.billingAddress.zip && valk?.state===userInfo?.billingAddress.state && valk?.country===userInfo?.billingAddress.country ?(<div className='default-mobile' style={{marginTop:"27px"}} >Default</div>):(<></>) } */}
                    </div>

                    <label style={{ fontSize: "0.95rem" }}>
                      {valk?.billing_details?.name}
                    </label>
                    <label style={{ fontSize: "0.95rem" }}>
                      {" "}
                      {valk?.billing_details?.address?.line1}
                    </label>
                    {/* city,state,country,postalcode */}
                    <label style={{ fontSize: "0.95rem" }}>
                      {" "}
                      {valk?.billing_details?.address?.city},
                      {valk?.billing_details?.address?.state},
                      {valk?.billing_details?.address?.country},
                      {valk?.billing_details?.address?.postal_code}
                    </label>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="billing-edit-first"
                      onClick={() => {
                        handleToggle1();
                        setpfirstName(
                          valk?.billing_details?.name.split(" ")[0]
                        );
                        setplastname(valk?.billing_details?.name.split(" ")[1]);
                        setpaddress(valk?.billing_details?.address?.line1);
                        setpcity(valk?.billing_details?.address?.city);
                        setpstate(valk?.billing_details?.address?.state);
                        setpcountry(valk?.billing_details?.address?.country);
                        setppostalcode(
                          valk?.billing_details?.address?.postal_code
                        );
                        setpapt(valk?.billing_details?.address?.line2);
                        setId(valk?._id);
                        setLastFour(valk?.card.last4);
                        setExpDate(
                          `${valk?.card?.exp_month}/${valk?.card?.exp_year}`
                        );
                        setId(valk?.id);
                        setDefaultId(cardsData?.defaultPaymentMethod);
                      }}
                      value=""
                    >
                      Edit Payment Details
                    </button>
                    {toggle1 && (
                      <Editbilling
                        close={() => setToggle1(false)}
                        pfirstName={pfirstName}
                        plastName={plastName}
                        paddress={paddress}
                        pcity={pcity}
                        pstate={pstate}
                        papt={papt}
                        ppostalcode={ppostalcode}
                        pcountry={pcountry}
                        Id={Id}
                        lastFour={lastFour}
                        expDate={expDate}
                        defaultId={defaultId}
                      />
                    )}
                    {/* <div className='billing-edit'>Remove as Default Payment Method </div><br/> */}
                  </div>
                  <br />
                  <div>
                    <div
                      className="billing-edit"
                      onClick={() => {
                        setoverlay(<OverlayEditSub />);

                        setShow(true);
                        axios
                          .post(
                            `${process.env.REACT_APP_PROXY_URL}/api/paymentMethod/detach-payment-method`,
                            { paymentMethodId: valk?.id, customerId: stripid },
                            config
                          )
                          .then((res) => {
                            if (res) window.location.reload(false);
                          })
                          .catch((err) => {
                            if (err) {
                              window.alert(err?.response?.data?.message);
                              setShow(false);
                            }
                          });
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      Remove
                    </div>
                  </div>
                  <br />
                </div>
              }
            </>
          ))}
          <hr
            style={{
              border: "0.8px #757575",
              width: "94%",
              zIndex: "-1",
              position: "relative",
            }}
          ></hr>

          <br />

          <div className="billing-payment-page">Shipping Addresses</div>
          <br />
          <div className="add-address-billing">
            <button
              type="button"
              style={{ color: "black" }}
              class="edit-sub-update-button-billing1 "
              onClick={handleToggle4}
              value=""
            >
              ADD AN ADDRESS
            </button>
            {toggle4 && <Addshipping close={() => setToggle4(false)} />}
          </div>

          {shipping_address?.map((value) => (
            <>
              {
                <div className="billing-address-add">
                  <br />
                  <hr
                    style={{
                      border: "0.8 #757575",
                      width: "94%",
                      zIndex: "-1",
                      position: "relative",
                    }}
                  ></hr>
                  <div style={{ fontSize: "0.95rem" }}>
                    {value?.firstName === userInfo.firstName &&
                    value?.lastName === userInfo.lastName &&
                    value?.city === userInfo.shippingAddress?.city &&
                    value?.address === userInfo.shippingAddress.address1 &&
                    value?.apt === userInfo.shippingAddress.address2 &&
                    value?.postalCode === userInfo.shippingAddress.zip &&
                    value?.state === userInfo.shippingAddress.state &&
                    value?.country === userInfo.shippingAddress.country ? (
                      <div className="default-mobile">Default</div>
                    ) : (
                      <></>
                    )}
                    <label style={{ fontSize: "0.95rem" }}>
                      {value?.firstName} {value?.lastName}
                    </label>
                    <label style={{ fontSize: "0.95rem" }}>
                      {" "}
                      {value?.address}
                    </label>
                    {/* city,state,country,postalcode */}
                    {value?.city},{value?.state},{value?.country},
                    {value?.postalCode}
                  </div>
                  <button
                    type="submit"
                    className="billing-edit-first"
                    onClick={() => {
                      handleToggle3();
                      setpfirstName(value?.firstName);
                      setplastname(value?.lastName);
                      setpaddress(value?.address);
                      setpcity(value?.city);
                      setpstate(value?.state);
                      setpcountry(value?.country);
                      setppostalcode(value?.postalCode);
                      setpapt(value?.apt);
                      setId(value?._id);
                    }}
                    value=""
                  >
                    Edit Shipping address
                  </button>
                  <br />
                  {toggle3 && (
                    <Editshipping
                      close={() => setToggle3(false)}
                      pfirstName={pfirstName}
                      plastName={plastName}
                      paddress={paddress}
                      pcity={pcity}
                      pstate={pstate}
                      papt={papt}
                      ppostalcode={ppostalcode}
                      pcountry={pcountry}
                      Id={Id}
                    />
                  )}
                  {/* <div className='billing-edit'>Remove as Default Payment Method </div><br/> */}
                  <div
                    className="billing-edit"
                    onClick={() => {
                      axios
                        .delete(
                          `${process.env.REACT_APP_PROXY_URL}/api/address/${value?._id}/delete-address`,
                          config
                        )
                        .then((res) => {
                          if (res) window.location.reload(false);
                        });
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    Remove
                  </div>
                  <br />
                </div>
              }
            </>
          ))}
          <hr
            style={{
              border: "1px #757575",
              width: "94%",
              zIndex: "-1",
              position: "relative",
            }}
          ></hr>
          <br />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Billing;
