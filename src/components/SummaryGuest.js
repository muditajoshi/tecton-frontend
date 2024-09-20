import ScrollToTop from "./ScrollToTop";
import "../css/payment.css";
import { saveShippingAddress } from "../actions/cartActions";
import { refreshLogin, getUserDetails } from "../actions/userActions";
import { Link } from "react-router-dom";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//imported for jscookie integration
import { SHA256 } from "crypto-js";
import Cookies from "js-cookie";
import ScriptTag from "react-script-tag";

const SummaryGuest = ({ history, match, location }) => {
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
  const [prices, setprices] = useState();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/api/orders/${match?.params?.id}`)
      .then((res) => setprices(res.data));
  }, []);
  console.log(prices, "prices");

  console.log(prices && prices.user);

  // console.log(fetchedItems)
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { cartItems, shippingAddress } = cart;
  // console.log(cartItems)
  const [totalItems, setTotalItems] = useState(0);
  const productID = match.params.id;
  //   console.log(productID)
  const qty = location.search ? Number(location.search.split("=")[1]) : 1; // fetch from the query string

  // get cart, userInfo and userdetails from redux store

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { error } = userDetails;
  // console.log(userDetails)
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, loading, success } = orderCreate;
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [state, setState] = useState(shippingAddress.state);
  const [phoneNo, setPhoneNo] = useState(shippingAddress.phoneNo);
  const [apt, setApt] = useState(shippingAddress.apt);

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

  // useEffect(() => {
  // 	if (!(userInfo)) {
  // 		history.push('/');
  // 	}
  // }, [userInfo]);

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
  const clearCart = () => {
    localStorage.removeItem("cartItems");
    history.push("/cart");
  };
  const toggleLogin = () => {
    setIsOpen(!isOpen);
  };

  const addressGet = JSON.parse(localStorage.getItem("shippingAddress"));
  const billingaddressGet = JSON.parse(localStorage.getItem("BillingAddress"));

  // console.log(addressGet)

  // cart.shippingPrice = shippingPrice;
  // cart.taxPrice = 0.18 * cart.itemsPrice;
  // cart.totalPrice = cart.itemsPrice + cart.taxPrice + cart.shippingPrice;

  cart.totalPrice =
    cart.itemsPrice + cart.taxPrice + Number(localStorage?.getItem("sp"));
  fetchedItems.totalPrice =
    fetchedItems.itemsPrice +
    fetchedItems.taxPrice +
    Number(localStorage?.getItem("sp")) +
    Number(localStorage?.getItem("ST"));

  // const config = userInfo?.isSocialLogin
  // 		? {
  // 				headers: {
  // 					Authorization: `SocialLogin ${userInfo?.id}`,
  // 				},
  // 		  }
  // 		: {
  // 				headers: {
  // 					Authorization: `Bearer ${userInfo?.accessToken}`,
  // 				},
  // 		  };

  // useEffect(()=>{

  //     axios.get(`${process.env.REACT_APP_PROXY_URL}/api/orders/${productID}`, config).then((res)=>console.log(res))

  // })

  const orderDetails = useSelector((state) => state?.orderDetails);

  console.log(orderDetails);

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
                  <br />

                  <div class="review-leave-ship-pay-ord">Billing Address</div>

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
                </div>
                <br />

                <div id="continue-descktop" class="row">
                  <div
                    class="sales-amt-shipping"
                    style={{ paddingBottom: "10px", fontSize: "15px" }}
                  >
                    <b style={{ color: "orange" }}>*</b> We donate 1% of
                    revenues to Nonprofits that work with veterans. Thanks for
                    your support.
                  </div>

                  <div class="product-btn-default-cart">
                    {/* <input class="product-btn-default-cnfm-CON" type="submit" value="PLACE ORDER" ></input> */}
                    <Link
                      className="con-dot"
                      style={{ width: "100%" }}
                      to="/shop"
                      type="submit"
                    >
                      CONTINUE SHOPPING
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-5 col-sm-12">
              <div class="order-detail-1">
                {fetchedItems.cartItems?.map((item) => (
                  <div class="row" key={item?.product}>
                    <div class="cart-sub-hr-line-CON">
                      <hr></hr>
                    </div>
                    <div>
                      <div style={{ display: "flex" }}>
                        <div style={{ width: "38%", textAlign: "left" }}>
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
                            <h6>Qty: {item?.qty}</h6>
                          </div>

                          <div>
                            <h6 class="product">
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
                  {/* <div class="sumup col-sm-10 col-md-12 ">
            <div class="col-cnfm">
              <input type="text" class="form-control-ship-exp-cnfm " placeholder="Add a promo code" id="fname" name="fname" />
              <input class="product-btn-default-cnfm" type="submit" value="Apply" ></input>
              </div>
              </div>	 */}
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
                        {" "}
                        ${fetchedItems?.itemsPrice?.toFixed(2)}
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
                        Discount{" "}
                      </div>
                      <div
                        style={{
                          textAlign: "right",
                          width: "50%",
                          color: "#757575",
                        }}
                      >
                        {/* {userInfo?.userType=="Individual"?(<>$00.00</>):(<></>)} */}

                        {/* <span style={{ color: "red" }}>
                      {0 + prices?.orderMetaData
                        ? prices?.orderMetaData[0]?.discountPercent
                        : 0}
                      %
                    </span> */}
                        {prices?.orderMetaData &&
                        prices?.orderMetaData[0]?.discountPercent ? (
                          <>
                            <span style={{ color: "red" }}>
                              {prices?.orderMetaData[0]?.discountPercent}%
                            </span>
                          </>
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
                        Tax{" "}
                      </div>
                      <div
                        style={{
                          textAlign: "right",
                          width: "50%",
                          color: "#757575",
                        }}
                      >
                        {" "}
                        ${Number(localStorage?.getItem("ST"))}
                      </div>
                    </div>
                  </div>
                  {/* <div class="amount-ttl">
      
                ${fetchedItems?.itemsPrice?.toFixed(2)}
                <br />
                <span style={{ color: "red" }}>{0 + prices?.orderMetaData ? (prices?.orderMetaData[0]?.discountPercent) : (0)}%</span>
                <br />
                ${localStorage.getItem("sp")}
                <br />
                ${Number(localStorage?.getItem("ST"))}

                <br />
              </div> */}
                  <div class="cart-sub-hr-line">
                    <hr></hr>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div
                      className="review-leave-ship-pay-ord"
                      style={{ width: "50%", textAlign: "left" }}
                    >
                      Total
                    </div>
                    <div
                      className="review-leave-ship-pay-ord"
                      style={{ width: "50%", textAlign: "right" }}
                    >
                      ${prices?.totalPrice.toFixed(2)}
                    </div>
                  </div>

                  <div id="continue-mobile" class="row">
                    <div
                      class="sales-amt-shipping"
                      style={{ paddingBottom: "10px", fontSize: "15px" }}
                    >
                      <b style={{ color: "orange" }}>*</b> We donate 1% of
                      revenues to Nonprofits that work with veterans. Thanks for
                      your support.
                    </div>

                    <div class="product-btn-default-cart">
                      {/* <input class="product-btn-default-cnfm-CON" type="submit" value="PLACE ORDER" ></input> */}
                      <Link
                        className="con-dot"
                        style={{ width: "100%" }}
                        to="/shop"
                        type="submit"
                      >
                        CONTINUE SHOPPING
                      </Link>
                    </div>
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

export default SummaryGuest;
