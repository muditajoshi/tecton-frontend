import ScrollToTop from "./ScrollToTop";
import "../css/payment.css";
import { saveShippingAddress } from "../actions/cartActions";
import {
  refreshLogin,
  getUserDetails,
  updateUserProfile,
} from "../actions/userActions";
import { Link } from "react-router-dom";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDocumentTitle from "./useDocumentTitle";
import axios from "axios";
import { incNumber } from "../actions/cartUpdateActions";

//imported for jscookie integration
import { SHA256 } from "crypto-js";
import Cookies from "js-cookie";
import ScriptTag from "react-script-tag";

const YourOrder = ({ history, match, location }) => {
  useDocumentTitle("Summary - Tecton");

  const [apiCallMade, setApiCallMade] = useState(() => {
    const savedApiCallMade = localStorage.getItem("apiCallMade");
    return savedApiCallMade ? JSON.parse(savedApiCallMade) : null;
  });

  //set the cjevent cookie
  const [cjevent, setCjevent] = useState(null);
  const pageview = 1;

  useEffect(() => {
    const cjeventValue = Cookies.get("cje");
    setCjevent(cjeventValue);
  }, []);

  let fetchedItems = JSON.parse(localStorage?.getItem("fetchCart"));
  // console.log(fetchedItems)
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { cartItems, shippingAddress } = cart;
  // console.log(cartItems)
  const [totalItems, setTotalItems] = useState(0);
  const productID = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1; // fetch from the query string

  // get cart, userInfo and userdetails from redux store

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state?.userDetails);
  // console.log(userDetails)
  const { user, error } = userDetails;
  // console.log(user)

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [state, setState] = useState(shippingAddress.state);
  const [phoneNo, setPhoneNo] = useState(shippingAddress.phoneNo);
  const [apt, setApt] = useState(shippingAddress.apt);
  const [cartid, setcartid] = useState();
  // fetch user details from the redux store
  useEffect(() => {
    userInfo
      ? userInfo.isSocialLogin
        ? dispatch(getUserDetails(userInfo.id))
        : dispatch(getUserDetails("profile"))
      : dispatch(getUserDetails("profile"));
  }, [userInfo, dispatch]);

  useEffect(() => {
    if (error && userInfo && !userInfo.isSocialLogin) {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user && dispatch(refreshLogin(user.email));
    }
  }, [error, dispatch, userInfo]);

  // add item to cart
  //   useEffect(() => {
  // 	if (productID) {
  // 	  dispatch(addItem(productID, qty));
  // 	}
  //   }, [dispatch, productID, qty]);

  // remove item from cart
  //   const handleRemoveFromCart = (id) => {
  // 	dispatch(removeItem(id));
  //   };

  // const [shippingPrice, setShippingPrice] = useState(0);
  // const handleOptionChange = (value)=>{

  // 		setShippingPrice(value);

  // 		cart.ShippingPrice = value;

  // 	}
  // update access token to a new ine using the refresh tokens
  useEffect(() => {
    if (error && userInfo && !userInfo.isSocialLogin) {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user && dispatch(refreshLogin(user.email));
    }
  }, [error, dispatch, userInfo]);

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
  }, [userInfo]);

  useEffect(() => {
    if (cartItems) {
      setTotalItems(cartItems.reduce((acc, item) => acc + item.qty, 0));
    }
  }, [cartItems]);

  // save shipping address and move to payment screen
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        state,
        apt,
        phoneNo,
        country,
      })
    );
    history.push("/payment");
  };
  const removecart = () => {
    // axios.delete(`${process.env.REACT_APP_PROXY_URL}/api/cart/${cartid}/emptycart`)

    history.push("/shop");
    // setTimeout(() => {
    // 	window.location.reload(false);
    // }, 1000);
  };
  const clearCart = () => {
    localStorage.removeItem("cartItems");
    history.push("/cart");
  };
  const toggleLogin = () => {
    setIsOpen(!isOpen);
  };

  // const addressGet=JSON.parse( localStorage.getItem("shippingAddress"))
  // const billingaddressGet= JSON.parse( localStorage.getItem("BillingAddress"))

  // console.log(addressGet)

  // fetchedItems.totalPrice = fetchedItems.itemsPrice + fetchedItems.taxPrice +  Number(localStorage?.getItem("sp"))
  const [addressGet, setAddressGet] = useState();
  const [billingaddressGet, setBillingAddressGet] = useState();
  const [prices, setprices] = useState();
  const [cartData, setCartData] = useState();
  const [subs, setSubs] = useState();
  const orderDetails = useSelector((state) => state?.orderDetails);
  // console.log(orderDetails)
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

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/api/orders/${productID}`, config)
      .then((res) => setAddressGet(res.data.shippingAddress));
  }, []);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/api/orders/${productID}`, config)
      .then((res) => setBillingAddressGet(res.data.billingAddress));
  }, []);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/api/orders/${productID}`, config)
      .then((res) => setprices(res.data));
  }, []);
  console.log(prices);
  //   useEffect(()=>{
  //     axios.get(`${process.env.REACT_APP_PROXY_URL}/api/cart/user/${userInfo.id}`).then((res)=>setCartData(res?.data?.cart[0]?.cartItems))
  //   },[])
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/api/orders/${productID}`)
      .then((res) => setCartData(res?.data?.orderItems));
  }, []);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/api/cart/user/${userInfo.id}`)
      .then((res) =>
        axios
          .delete(
            `${process.env.REACT_APP_PROXY_URL}/api/cart/${res?.data?.cart[0]._id}/emptycart`
          )
          .then((res) => {
            if (res) {
              dispatch(incNumber());
            }
          })
      );
  }, []);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/api/orders/${productID}`)
      .then((res) =>
        setSubs(res?.data?.orderItems?.filter((val) => val.subscription))
      );
  }, []);

  useEffect(() => {
    dispatch(
      updateUserProfile({
        id: user.id,
        firstName: userInfo?.firstName,
        lastName: userInfo?.lastName,
        email: userInfo?.email,
        phoneNo: userInfo?.phoneNo,
        city: userInfo?.shippingAddress?.city,
        country: userInfo?.shippingAddress?.country,
        address1: userInfo?.shippingAddress?.address1,
        address2: userInfo?.shippingAddress?.address2,
        zip: userInfo?.shippingAddress?.zip,
        state: userInfo?.shippingAddress?.state,
        joinTheExtClub: userInfo?.joinTheExtClub,
        billingAddress: {
          firstName: userInfo?.billingAddress?.firstName,
          lastName: userInfo?.billingAddress?.lastName,
          address1: userInfo?.billingAddress?.address1,
          city: userInfo?.billingAddress?.city,
          zip: userInfo?.billingAddress?.zip,
          state: userInfo?.billingAddress?.state,
          address2: userInfo?.billingAddress?.address2,
          phoneNo: userInfo?.billingAddress?.phoneNo,
          country: userInfo?.billingAddress?.country,
        },
      })
    );
  }, []);

  // shippingPrice = prices.shippingPrice;
  // taxPrice = 0.18 * prices.itemsPrice;
  // totalPrice = prices.itemsPrice + prices.taxPrice + prices.shippingPrice;

  // totalPrice = itemsPrice + taxPrice +  Number(localStorage?.getItem("sp"))

  /*

//Setting a Cookie with the Order ID
	useEffect(() => {
		Cookies.set('cje', match?.params?.id, { expires: 3960000 });
	  }, []);
  
*/
  const eventTime = prices?.createdAt;
  const currency = "USD";
  const totalQuantity = prices?.orderItems.reduce(
    (acc, item) => acc + item.qty,
    0
  );

  const oid = match?.params?.id;

  let items;

  if (Array.isArray(prices?.orderItems)) {
    const existingItems = prices.orderItems.join("&");
    if (
      existingItems.startsWith("ITEM") &&
      existingItems.includes("&AMT") &&
      existingItems.includes("&QTY")
    ) {
      items = existingItems;
    } else {
      items = prices.orderItems
        .map((item, index) => {
          const itemIndex = index + 1;
          const formattedAmt = item.price.toFixed(2);
          return `ITEM${itemIndex}=${item._id}&AMT${itemIndex}=${formattedAmt}&QTY${itemIndex}=${item.qty}`;
        })
        .join("&");
    }
  }

  let discountAmount;

  if (prices?.orderMetaData && prices?.orderMetaData[0]?.discountPercent) {
    const discountPercent = prices?.orderMetaData[0]?.discountPercent;
    const totalPrice = prices?.itemsPrice.toFixed(2);
    discountAmount = ((totalPrice * discountPercent) / 100).toFixed(2);
  } else {
    discountAmount = "0.00"; // Assigning '0.00' as the default value
  }

  useEffect(() => {
    const cjeValue = Cookies.get("cje");
    if (
      cjeValue !== undefined &&
      prices?.totalPrice.toFixed(2) > 0 &&
      apiCallMade === null
    ) {
      axios
        .post(`${process.env.REACT_APP_PROXY_URL}/api/cjintegration`, {
          cjevent: cjeValue,
          pageview: pageview,
          amount: prices.itemsPrice.toFixed(2),
          oid: oid,
          eventTime: eventTime,
          currency: currency,
          items: items,
          discount: discountAmount,
        })
        .then((res) => {
          console.log(res);
          localStorage.setItem(
            "apiCallMade",
            JSON.stringify(match?.params?.id)
          );
          setApiCallMade(match?.params?.id);
        });
    } else if (
      cjeValue !== undefined &&
      prices?.totalPrice.toFixed(2) > 0 &&
      apiCallMade !== match?.params?.id
    ) {
      axios
        .post(`${process.env.REACT_APP_PROXY_URL}/api/cjintegration`, {
          cjevent: cjeValue,
          pageview: pageview,
          amount: prices.itemsPrice.toFixed(2),
          oid: oid,
          eventTime: eventTime,
          currency: currency,
          items: items,
          discount: discountAmount,
        })
        .then((res) => {
          console.log(res);
          localStorage.setItem(
            "apiCallMade",
            JSON.stringify(match?.params?.id)
          );
          setApiCallMade(match?.params?.id);
        });
    }
  }, [prices, apiCallMade, match?.params?.id]);

  return (
    <div class="all-product">
      <ScrollToTop />
      <section class="section2-products">
        <div class="container">
          {/* <div class="prog-bar">
					<Link className="clr-dot" to="/cart"> Your Cart </Link> <i class="arrow right"></i><Link  className="clr-dot" to="/Shipping"> Contact and Shipping </Link><i class="arrow right"></i><Link  className="clr-dot" to="/payment"> Payment </Link> <i class="arrow right"></i><Link  className="clr-dot" style={{color:"orange"}} to="/Summary"> Summary </Link>
					</div> */}
          <div class=" cont-act-cart">
            <div class="head-order-cnfm" style={{ textAlign: "center" }}>
              Order Confirmed!
            </div>
            <div class="thank-you-order" style={{ textAlign: "center" }}>
              Thank you for your order! You will receive an email shortly
              confirming your order.
            </div>
            <div class="row">
              <div class="m-acc">
                <h4 class="pro-duct-your-cart">Your Order Details</h4>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-7 col-sm-12">
              <div className="shippingdetailsnew">
                <div id="pay-ment">
                  {/* //shipping method// */}
                  {/* <lable>{localStorage.getItem("sm")}</lable><br /> */}
                  <div>
                  <div class="col-sm-12 col-md-11">
                  <div className="shippingdetails-contactinfo">
                        <div className="shippingnewinfo">
                          <div class="review-leave-ship-pay-ord" style={{color:"black"}}>
                         USE YOUR HSA/FSA FUNDS WITH THIS ORDER
                         </div>
                           <p> Click below to confirm eligibility.
                          <br/>
                          <br/>
                          <a href="https://app.truemed.com/qualify/tm_qual_lwihwute1u">
                            <button className="fundreimbursed">Get Reimbursed</button>
                            </a>
                          </p>
                          </div>
                          </div>
                  </div>
                  </div>
               <br/>
                  <div class="review-leave-ship-pay-ord">Shipping Details</div>
                  <div class="col-sm-12 col-md-11">
                    <div className="shippingdetails-contactinfo">
                      <div className="shippingnewinfo">
                        <span>
                          {userDetails?.user?.firstName}{" "}
                          {userDetails?.user?.lastName}
                        </span>
                        <br />
                        <span>{userDetails?.user?.email}</span>
                        <br />
                        {/* <span>Phone</span><br/> */}
                      </div>
                      <hr style={{ marginTop: "0px", marginBottom: "0px" }} />
                      <div className="shippingnewinfo">
                        <span>
                          {" "}
                          {addressGet?.address}, {addressGet?.apt},{" "}
                          {addressGet?.city}, {addressGet?.state}
                        </span>
                        <br />
                        <span>
                          {" "}
                          {addressGet?.country}, {addressGet?.postalCode}
                        </span>
                        <br />
                      </div>
                    </div>
                  </div>
                  <br />

                  <div class="review-leave-ship-pay-ord">Billing Details</div>

                  {billingaddressGet?.address ? (
                    <div class="col-sm-12 col-md-11">
                      <div className="shippingdetails-contactinfo">
                        <div className="shippingnewinfo">
                          <span>
                            {" "}
                            {billingaddressGet?.address},{" "}
                            {billingaddressGet?.apt}, {billingaddressGet?.city},{" "}
                            {billingaddressGet?.state}
                          </span>
                          <br />
                          <span>
                            {billingaddressGet?.country},{" "}
                            {billingaddressGet?.postalCode}
                          </span>
                          <br />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div class="col-sm-12 col-md-11">
                      <div className="shippingdetails-contactinfo">
                        <div className="shippingnewinfo">
                          <span>
                            {addressGet?.firstName} {addressGet?.lastName}
                          </span>
                          <br />
                          <span>{addressGet?.email}</span>
                          <br />
                          {/* <span>Phone</span><br/> */}
                        </div>
                        <hr style={{ marginTop: "0px", marginBottom: "0px" }} />
                        <div className="shippingnewinfo">
                          <span>
                            {" "}
                            {addressGet?.address}, {addressGet?.apt},{" "}
                            {addressGet?.city}, {addressGet?.state}
                          </span>
                          <br />
                          <span>
                            {addressGet?.country}, {addressGet?.postalCode}
                          </span>
                          <br />
                        </div>
                      </div>
                    </div>
                  )}
                  <br />
                  {subs?.length >= 1 ? (
                    <div>
                      <h5>You Are Subscribed!</h5>
                      <p>
                        Manage your subscriptions in the Subscription section of
                        your account.
                      </p>
                      <Link to="/subscription">
                        <div
                          class="product-btn-default-cart"
                          style={{ width: "50%", fontSize: "14px" }}
                        >
                          {/* <input class="product-btn-default-cnfm-CON" type="submit" value="PLACE ORDER" ></input> */}
                          VIEW SUBSCRIPTIONS
                        </div>
                      </Link>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
            <div class="col-md-5 col-sm-12">
              <div class="order-detail-1">
                {cartData?.map((item) => (
                  <div class="row" key={item?.product}>
                    <div class="cart-sub-hr-line-CON">
                      <hr></hr>
                    </div>
                    <div>
                      <div style={{ display: "flex" }}>
                        <div style={{ width: "43%", textAlign: "left" }}>
                          <img
                            style={{ width: "98%" }}
                            src={item?.image}
                            alt=""
                          />
                        </div>

                        <div style={{ width: "53%" }}>
                          <h3 class="product-great">{item?.name}</h3>
                          <div class="product-kgreat">
                            <h6>12 FL OZ • Ketone Hydration</h6>
                          </div>
                          <div class="product-kgreat">
                            <h6>
                              {item.subscription === true ? (
                                <>Delivery Every {item?.frequency}</>
                              ) : (
                                <>One time purchase</>
                              )}
                            </h6>
                          </div>
                          <div class="product-kgreat">
                            <h6>Qty: {item?.qty}</h6>
                          </div>

                          <div>
                            <h6 class="productu">
                              ${(item?.price * item?.qty).toFixed(2)}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div class="cart-sub-hr-line-CON">
                  <hr></hr>
                </div>
              </div>
              <div class="order-detail">
                <div class="row">
                  <div id="sum-mary">
                    <div class="review-leave-ship-pay-ord">Summary</div>
                  </div>
                </div>

                <div class="sub-total-cnfm">
                  <div class="cart-sub-hr-line"></div>

                  <div class="row contact-pricing">
                    <div style={{ display: "flex" }}>
                      <div
                        class=""
                        style={{
                          textAlign: "left",
                          width: "50%",
                          color: "#757575",
                        }}
                      >
                        {" "}
                        Subtotal
                      </div>
                      <div
                        style={{
                          textAlign: "right",
                          width: "50%",
                          color: "#757575",
                        }}
                      >
                        ${prices?.itemsPrice.toFixed(2)}
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div
                        class=""
                        style={{
                          textAlign: "left",
                          width: "50%",
                          color: "#757575",
                        }}
                      >
                        {" "}
                        {subs?.length > 0 ? (
                          <>
                            {" "}
                            <b style={{ color: "red" }}>*</b>Discount
                          </>
                        ) : (
                          <>Discount</>
                        )}
                      </div>
                      <div
                        style={{
                          textAlign: "right",
                          width: "51%",
                          color: "#757575",
                        }}
                      >
                        {" "}
                        {prices?.orderMetaData &&
                        prices?.orderMetaData[0]?.discountPercent > 0 ? (
                          <span style={{ color: "red" }}>
                            <b style={{ color: "red" }}>**</b>
                            {prices?.orderMetaData[0]?.discountPercent}%
                          </span>
                        ) : (
                          <>$00.00</>
                        )}
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div
                        class=""
                        style={{
                          textAlign: "left",
                          width: "50%",
                          color: "#757575",
                        }}
                      >
                        {" "}
                        Shipping{" "}
                      </div>
                      <div
                        style={{
                          textAlign: "right",
                          width: "50%",
                          color: "#757575",
                        }}
                      >
                        {" "}
                        ${Number(localStorage.getItem("sp")).toFixed(2)}
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div
                        class=""
                        style={{
                          textAlign: "left",
                          width: "50%",
                          color: "#757575",
                        }}
                      >
                        {" "}
                        Tax
                      </div>
                      <div
                        style={{
                          textAlign: "right",
                          width: "50%",
                          color: "#757575",
                        }}
                      >
                        {" "}
                        $
                        {(
                          Number(localStorage?.getItem("STNormal")) +
                          Number(localStorage?.getItem("STSubs"))
                        ).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  {/* <div class="order-total">
								<br />
								Subtotal
								<br />
								{subs?.length > 0 ? (<> <b style={{ color: "red" }}>*</b>Discount</>) : (<>Discount</>)}
								<br />
								Shipping
								<br />
								Tax
							</div> */}
                  {/* <div class="amount-ttl">

								${prices?.itemsPrice.toFixed(2)
									
								}
								<br />
								{prices?.orderMetaData && prices?.orderMetaData[0]?.discountPercent > 0 ? (<span style={{ color: "red" }}><b style={{ color: "red" }}>**</b>{prices?.orderMetaData[0]?.discountPercent}%</span>) : (<>$00.00</>)}
								<br />
								${localStorage.getItem("sp")}
								<br />
								
								${(Number(localStorage?.getItem("STNormal")) + Number(localStorage?.getItem("STSubs"))).toFixed(2)}

								<br />
							</div> */}
                  <div class="cart-sub-hr-line">
                    <hr></hr>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div
                      class="review-leave-ship-pay-ord"
                      style={{ textAlign: "left", width: "50%" }}
                    >
                      Total
                    </div>
                    <div
                      class="review-leave-ship-pay-ord"
                      style={{ textAlign: "right", width: "50%" }}
                    >
                      {/* ${fetchedItems?.totalPrice.toFixed(2)} */}$
                      {(prices?.orderMetaData &&
                      prices?.orderMetaData[0]?.discountPercent > 0
                        ? prices?.itemsPrice -
                          prices?.itemsPrice *
                            (prices?.orderMetaData[0]?.discountPercent / 100) +
                          Number(localStorage?.getItem("sp")) +
                          prices?.taxPrice
                        : prices?.itemsPrice +
                          prices?.taxPrice +
                          Number(localStorage?.getItem("sp"))
                      ).toFixed(2)}
                      {/* {prices.totalPrice} */}
                    </div>
                  </div>
                  <div
                    class="sales-amt-shipping"
                    style={{ paddingBottom: "10px", fontSize: "15px" }}
                  >
                    <b style={{ color: "orange" }}>*</b> We donate 1% of
                    revenues to Nonprofits that work with veterans. Thanks for
                    your support.
                  </div>
                  <div class="sales-amt-shipping" style={{ fontSize: "16px" }}>
                    {subs?.length > 0 ? (
                      <>
                        {" "}
                        <b style={{ color: "red" }}>*</b>Relevant discount will
                        be applied from the second shipment onwards.
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div class="sales-amt-shipping" style={{ fontSize: "16px" }}>
                    {prices?.orderMetaData &&
                    prices?.orderMetaData[0]?.discountPercent > 0 ? (
                      <span style={{ color: "red" }}>
                        <b style={{ color: "red" }}>**</b>{" "}
                        {prices?.userType[0] == "Employee" ? (
                          <>Special discount</>
                        ) : prices?.userType[0] == "Veteran" ? (
                          <>Military/Military Vets/First Responders discount</>
                        ) : prices?.userType[0] == "Individual" &&
                          userInfo?.userMetaData?.refCode ? (
                          "AmbassadorReferral discount"
                        ) : (
                          prices?.userType + " " + "discount"
                        )}
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div class="row">
                    <Link onClick={removecart}>
                      <div
                        class="product-btn-default-cart"
                        style={{ width: "100%" }}
                      >
                        {/* <input class="product-btn-default-cnfm-CON" type="submit" value="PLACE ORDER" ></input> */}
                        CONTINUE SHOPPING
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <input type="hidden" data-id={prices?.user} id="h_userID" />
          <input
            type="hidden"
            data-id={SHA256(prices?.billingAddress?.email).toString()}
            id="h_userEmail"
          />
          <input type="hidden" data-id={match?.params?.id} id="h_orderID" />
          <input
            type="hidden"
            data-id={prices?.totalPrice?.toFixed(2)}
            id="h_amount"
          />
          <input
            type="hidden"
            data-id={"conversionConfirmation"}
            id="h_pageType"
          />
          <input type="hidden" data-id={cjevent} id="h_cjeventOrder" />
          <input
            type="hidden"
            data-id={JSON.stringify(prices?.orderItems)}
            id="h_items"
          />
        </div>
      </section>

      <ScriptTag
        isHydrating={true}
        type="text/javascript"
        src="../confirmationTag.js"
      />
    </div>
  );
};

export default YourOrder;
