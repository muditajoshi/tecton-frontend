import "../css/cart.css";

import ScrollToTop from "./ScrollToTop";
import BEGREAT from "../images/BEGREAT.png";
import Gfour from "../images/newshop/Gfour.jpg";
import G12 from "../images/newshop/G12.jpg";
import m12 from "../images/newshop/m12.jpg";
import Mfour from "../images/newshop/Mfour.jpg";
import single from "../images/newshop/single.jpg";
import LoginShop from "./loginshop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ButtonGroup,
  ListGroup,
  Button,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Meta from "../skeleton/Meta";
import Message from "../skeleton/Message";
import { refreshLogin, getUserDetails } from "../actions/userActions";
import { addItem, removeItem } from "../actions/cartActions";
import useDocumentTitle from "./useDocumentTitle";
import axios from "axios";
import { incNumber } from "../actions/cartUpdateActions";
import { disablePage, enablePage } from "../actions/PageActions";
import OverlayEditSub from "../skeleton/OverlayEditSub";
import { SHA256 } from "crypto-js";
import Cookies from "js-cookie";
import ScriptTag from "react-script-tag";

const Cart = ({ match, location, history }) => {
  const [overlay, setoverlay] = useState();
  const [show, setShow] = useState(false);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product } = productDetails;
  // console.log(productDetails)
  useDocumentTitle("Cart - Tecton");
  const imageUrl =
    "https://images.unsplash.com/photo-1526045612212-70caf35c14df";
  const [isOpen, setIsOpen] = useState(false);

  const toggleLogin = () => {
    setIsOpen(!isOpen);
  };
  const [totalItems, setTotalItems] = useState(0);
  const productID = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1; // fetch from the query string
  const dispatch = useDispatch();

  // get cart, userInfo and userdetails from redux store
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { error } = userDetails;

  // get user details depending on what type of login it is, dispatch with correspnding argument
  useEffect(() => {
    userInfo
      ? userInfo.isSocialLogin
        ? dispatch(getUserDetails(userInfo.id))
        : dispatch(getUserDetails("profile"))
      : dispatch(getUserDetails("profile"));
  }, [userInfo, dispatch]);

  // store total items to local state
  useEffect(() => {
    if (cartItems) {
      setTotalItems(cartItems.reduce((acc, item) => acc + item.qty, 0));
    }
  }, [cartItems]);

  // if userdetails shows error, then use refresh token to get new access tokens
  useEffect(() => {
    if (error && userInfo && !userInfo.isSocialLogin) {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user && dispatch(refreshLogin(user.email));
    }
  }, [error, dispatch, userInfo]);

  // add item to cart
  useEffect(() => {
    console.log(Math.abs(qty));
    console.log(typeof qty);
    if (qty === 0 || qty == 0) {
      if (productID) {
        dispatch(addItem(productID, 1));
      }
    } else {
      if (productID) {
        dispatch(addItem(productID, Math.abs(qty)));
      }
    }
  }, [dispatch, productID, qty]);

  // remove item from cart
  const handleRemoveFromCart = (id) => {
    dispatch(removeItem(id));
  };
  const [cartData, setCartData] = useState();
  const [cartDataSubs, setCartDataSubs] = useState();
  const [cartid, setcartid] = useState();
  const [count, setCount] = useState(0);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/api/cart/user/${userInfo?.id}`)
      .then((res) => setCartData(res?.data?.cart[0]?.cartItems));
  }, [count]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/api/cart/user/${userInfo?.id}`)
      .then((res) => setcartid(res?.data?.cart[0]?._id));
  }, [count]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/api/cart/user/${userInfo?.id}`)
      .then((res) =>
        setCartDataSubs(
          res?.data?.cart[0]?.cartItems?.filter(
            (val) => val?.subscription == true
          )
        )
      );
  }, [count]);

  // proceed to shipping address page, which is the next step in placing an order
  const handleCheckout = (e) => {
    // console.log(cartData)
    // const { dataget } = axios.get(`${process.env.REACT_APP_PROXY_URL}/api/products/${productID}`);
    // console.log(dataget)
    {
      userInfo
        ? history.push("/contactdetails")
        : history.push("/contactdetailsguest");
    }
    // add item to cart when login
    // console.log(productID)
    // axios.put(`${process.env.REACT_APP_PROXY_URL}/api/cart/${userInfo.id}/additem`,{

    //     cartItems:[{
    //       product: cartData._id,
    // 	name: cartData.name,
    // 	image: cartData.image,
    // 	price: cartData.price,
    // 	countInStock: cartData.countInStock,
    // 	qty,
    // }]

    // 	   })
    if (userInfo) {
      window.dataLayer.push({
        event: "begin_checkout",
        ecommerce: {
          currency: "USD",
          value: cartData?.reduce(
            (acc, item) => acc + item.price * item.qty,
            0
          ),
          items: cartData.map((val) => {
            let person = {
              item_name: val.name,
              item_brand: "TECTON",
              item_category: "Drink",
              price: val.price,
              quantity: val.qty,
            };
            return person;
          }),
        },
      });
    } else {
      window.dataLayer.push({
        event: "begin_checkout",
        ecommerce: {
          currency: "USD",
          value: cartItems?.reduce(
            (acc, item) => acc + item.price * item.qty,
            0
          ),
          items: cartItems.map((val) => {
            let person = {
              item_name: val.name,
              item_brand: "TECTON",
              item_category: "Drink",
              price: val.price,
              quantity: val.qty,
            };
            return person;
          }),
        },
      });
    }
  };

  const clearCart = () => {
    localStorage.removeItem("cartItems");

    history.push("/cart");
    window.location.reload(false);
  };

  const data = localStorage.getItem("userInfo");
  // console.log(JSON.parse(data?.avatar))
  const data1 = JSON.parse(data);

  const mycartupdate = useSelector((state) => state.cartUpdate);
  // console.log(mycartupdate)
  useEffect(() => {
    setCount(count + 1);
  }, [mycartupdate]);

  // Truemed  implementation  start
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://truemed-public.s3.us-west-1.amazonaws.com/truemed-ads/prequal-widget.min.js";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  //Truemed  implementation  end

  // console.log(match.params.id)

  // useEffect(()=>{

  //   // let localcartvalues = JSON.parse(localStorage?.getItem("cartItems"))?.concat(JSON.parse(localStorage?.getItem("subscriptionItems")))

  //   // console.log(localcartvalues)

  //   if(localStorage?.getItem("subscriptionItems") && JSON.parse(localStorage?.getItem("cartItems"))){
  //     axios.put(`${process.env.REACT_APP_PROXY_URL}/api/cart/${userInfo?.id}/additem`, {

  //       cartItems: JSON.parse(localStorage?.getItem("cartItems"))?.concat(JSON.parse(localStorage?.getItem("subscriptionItems")))

  //     }).then((resp)=>{if(resp){
  //       localStorage?.removeItem("cartItems")
  //       localStorage?.removeItem("subscriptionItems")}})
  //   }

  //   else if(!localStorage?.getItem("subscriptionItems") && JSON.parse(localStorage?.getItem("cartItems"))){
  //     axios.put(`${process.env.REACT_APP_PROXY_URL}/api/cart/${userInfo?.id}/additem`, {

  //       cartItems: JSON.parse(localStorage?.getItem("cartItems"))

  //     }).then((resp)=>{if(resp){
  //       localStorage?.removeItem("cartItems")
  //       localStorage?.removeItem("subscriptionItems")}})
  //   }

  //     },[])
  let items = [];
  let itemsSubtotal = 0;
  let hidden_userID = "";
  let hidden_userEmail = "";

  if (userInfo) {
    items = cartData?.map(({ itemTotalPrice, _id, qty }) => ({
      unitPrice: itemTotalPrice,
      itemId: _id,
      quantity: qty,
      discount: 0,
    }));

    itemsSubtotal = cartData
      ?.reduce((acc, item) => acc + item.qty * item.price, 0)
      .toLocaleString("en-IN", {
        maximumFractionDigits: 2,
      });

    hidden_userID = userInfo?.id;
    hidden_userEmail = SHA256(userInfo.email).toString();
  } else {
    items = cartItems?.map(({ price, id, qty }) => ({
      unitPrice: price,
      itemId: id,
      quantity: qty,
      discount: 0,
    }));

    itemsSubtotal = cartItems
      .reduce((acc, item) => acc + item.qty * item.price, 0)
      .toLocaleString("en-IN", {
        maximumFractionDigits: 2,
      });

    hidden_userID = "";
    hidden_userEmail = "";
  }

  //set the cjevent cookie
  const [cjevent, setCjevent] = useState(null);

  useEffect(() => {
    const cjeventValue = Cookies.get("cje");
    setCjevent(cjeventValue);
  }, []);

  return (
    <div className="cart-font">
      <div class="all-product">
        {show ? overlay : <></>}
        <ScrollToTop />
        <section class="section2-products">
          <div class="container">
            {userInfo ? (
              <div class="prog-bar">
                <a href="/cart" style={{ color: "black" }} className="clr-dot">
                  Cart
                </a>
                <div className="arrowprogressbarr">
                  <FontAwesomeIcon icon={faAngleRight} />
                </div>
                <Link className="clr-dot">Contact Details</Link>
                <div className="arrowprogressbarr">
                  <FontAwesomeIcon icon={faAngleRight} />
                </div>
                <Link className="clr-dot">Shipping</Link>
                <div className="arrowprogressbarr">
                  <FontAwesomeIcon icon={faAngleRight} />
                </div>
                <Link className="clr-dot">Payment</Link>
              </div>
            ) : (
              <div class="prog-bar">
                <a href="/cart" style={{ color: "black" }} className="clr-dot">
                  Cart
                </a>
                <div className="arrowprogressbarr">
                  <FontAwesomeIcon icon={faAngleRight} />
                </div>
                <Link className="clr-dot">Contact Details</Link>
                <div className="arrowprogressbarr">
                  <FontAwesomeIcon icon={faAngleRight} />
                </div>
                <Link className="clr-dot">Shipping</Link>
                <div className="arrowprogressbarr">
                  <FontAwesomeIcon icon={faAngleRight} />
                </div>
                <Link className="clr-dot">Payment</Link>
              </div>
            )}
            <div class=" cont-act-cart col-sm-10">
              <div class="row">
                <div class="m-acc">
                  <h4 class="pro-duct-your-cart">Your Cart</h4>
                </div>
                {!data1?.id ? (
                  <div className="userloginguest">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      style={{ color: "orange", textDecoration: "underline" }}
                    >
                      Sign in
                    </Link>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div class="row">
              {userInfo ? (
                !cartData?.length ? (
                  <Message>
                    Your Cart is empty.{" "}
                    <Link to="/shop" style={{ textDecoration: "underline" }}>
                      Go Back.
                    </Link>{" "}
                  </Message>
                ) : (
                  <>
                    <div class="col-md-6 col-sm-12">
                      <div class="order-detail-11">
                        {cartData?.map((item) => (
                          <div class="row" key={item.product}>
                            <div class="cart-hr-line">
                              <hr></hr>
                            </div>
                            <div>
                              <div style={{ display: "flex" }}>
                                <div
                                  style={{ width: "55%", textAlign: "left" }}
                                >
                                  <img
                                    style={{ width: "95%" }}
                                    src={item?.image}
                                    alt=""
                                  />
                                </div>

                                <div style={{ width: "50%" }}>
                                  <div>
                                    <h3 class="product-great">{item?.name}</h3>
                                    <div class="product-kgreat">
                                      <h6 style={{ marginBottom: "4px" }}>
                                        12 FL OZ • Ketone Hydration
                                      </h6>
                                    </div>
                                    <div class="product-kgreat">
                                      <h6 style={{ marginBottom: "4px" }}>
                                        {item.subscription === true ? (
                                          <>Delivery Every {item?.frequency}</>
                                        ) : (
                                          <>One time purchase</>
                                        )}
                                      </h6>
                                    </div>
                                    <div class="product-kgreat">
                                      <h6 style={{ marginBottom: "0px" }}>
                                        Qty: {item?.qty}
                                      </h6>
                                    </div>
                                  </div>

                                  <div>
                                    <h3 class="product-price-pay-cart">
                                      ${(item?.price * item?.qty).toFixed(2)}
                                    </h3>
                                  </div>
                                </div>

                                <div
                                  style={{ width: "30%", textAlign: "right" }}
                                >
                                  <div className="cart-button-edit">
                                    <button
                                      style={{
                                        border: "1px solid #75757575",
                                        paddingTop: "4px",
                                        backgroundColor: "white",
                                        borderRadius: "3px",
                                        paddingLeft: "7px",
                                        paddingRight: "7px",
                                      }}
                                    >
                                      {" "}
                                      <span
                                        style={{
                                          cursor: "pointer",
                                          border: "none",
                                          color: "black",
                                          display: item.qty < 2 ? "none" : "",
                                        }}
                                        disabled={item.qty === 1}
                                        onClick={() => {
                                          dispatch(disablePage());
                                          axios
                                            .put(
                                              `${process.env.REACT_APP_PROXY_URL}/api/cart/${cartid}/items/${item?._id}`,
                                              {
                                                minus: true,
                                              }
                                            )
                                            .then((res) => {
                                              if (res) {
                                                setCount(count + 1);

                                                dispatch(incNumber());
                                                dispatch(enablePage());
                                              }
                                            });
                                        }}
                                      >
                                        {" "}
                                        <FontAwesomeIcon
                                          icon={faAngleLeft}
                                          style={{
                                            color: "black",
                                            fontSize: "12px",
                                            paddingRight: "4px",
                                          }}
                                        />
                                      </span>{" "}
                                      &nbsp;{" "}
                                      <span
                                        style={{
                                          color: "black",
                                          fontSize: "0.9rem",
                                        }}
                                      >
                                        {" "}
                                        {item?.qty}
                                      </span>{" "}
                                      &nbsp;{" "}
                                      <span
                                        style={{
                                          cursor: "pointer",
                                          border: "none",
                                          color: "black",
                                        }}
                                        onClick={() => {
                                          dispatch(disablePage());
                                          axios
                                            .put(
                                              `${process.env.REACT_APP_PROXY_URL}/api/cart/${cartid}/items/${item?._id}`,
                                              {
                                                plus: true,
                                              }
                                            )
                                            .then((res) => {
                                              if (res) {
                                                setCount(count + 1);

                                                dispatch(incNumber());
                                                dispatch(enablePage());
                                              }
                                            });
                                        }}
                                      >
                                        <FontAwesomeIcon
                                          icon={faAngleRight}
                                          style={{
                                            color: "black",
                                            fontSize: "12px",
                                            paddingLeft: "4px",
                                          }}
                                        />
                                      </span>
                                    </button>
                                  </div>
                                  <div class="opt-three-pay-cart-new">
                                    {/* Edit */}
                                    <br />
                                    <span
                                      style={{
                                        color: "orange",
                                        cursor: "pointer",
                                      }}
                                      // onClick={() => handleRemoveFromCart(item.product)}
                                      onClick={() => {
                                        dispatch(disablePage());
                                        axios
                                          .delete(
                                            `${process.env.REACT_APP_PROXY_URL}/api/cart/${cartid}/items/${item?._id}`
                                          )
                                          .then((res) => {
                                            if (res) {
                                              setCount(count + 1);
                                              dispatch(incNumber());
                                              dispatch(enablePage());
                                            }
                                          });
                                      }}
                                    >
                                      Remove
                                    </span>
                                    {/* Save for later<br /> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div class="cart-hr-line">
                        <hr></hr>
                      </div>
                      <div class=" sub-shop-cart-emp">
                        <button
                          // onClick={clearCart}
                          onClick={() => {
                            setoverlay(<OverlayEditSub />);

                            setShow(true);
                            axios
                              .delete(
                                `${process.env.REACT_APP_PROXY_URL}/api/cart/${cartid}/emptycart`
                              )
                              .then((res) => {
                                if (res) {
                                  window.location.reload(false);
                                }
                              });
                            // setCount(count+1)
                            // window.location.reload(false)
                            // dispatch(incNumber())
                          }}
                          class="product-btn-single-carts"
                        >
                          Empty Cart
                        </button>
                      </div>
                    </div>
                    <div class="col-md-6 col-sm-12">
                      <div id="product-21" class="single22-product">
                        <div
                          class="cart-hr-line2"
                          style={{ pddingTop: "30px" }}
                        >
                          <hr></hr>
                        </div>

                        <div
                          className="edit-subscription-amount-detail"
                          style={{ display: "flex" }}
                        >
                          <div className="subtotal-cart">
                            <h4>Subtotal</h4>
                          </div>
                          <div className="subtotal-cart-amount">
                            <h4>
                              {" "}
                              {cartData
                                ?.reduce(
                                  (acc, item) => acc + item.qty * item.price,
                                  0
                                )
                                .toLocaleString("en-IN", {
                                  maximumFractionDigits: 2,
                                  style: "currency",
                                  currency: "USD",
                                })}{" "}
                            </h4>
                          </div>
                        </div>
                        <div class="pro-part-cartt">
                          <div class="product-sub-total">
                            Shipping and Taxes added at checkout.
                          </div>
                          <div
                            class="sales-amt-shipping"
                            style={{ fontSize: "16px" }}
                          >
                            {cartDataSubs?.length > 0 ? (
                              <>
                                <b style={{ color: "red" }}>*</b>Relevant
                                discount will be applied from the second
                                shipment onwards.{" "}
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                          <div>
                            <div
                              id="truemed-prequalify"
                              style={{ fontSize: "16px", fontWeight: "bold" }}
                              data-public-id="tm_qual_lwihwute1u"
                            >
                              {" "}
                            </div>
                          </div>
                          <div class="check-out-btn">
                            <input
                              class="product-btn-default-cart-new"
                              type="submit"
                              value="PROCEED TO CHECKOUT"
                              disabled={!cartData?.length}
                              onClick={handleCheckout}
                            ></input>
                          </div>

                          <div class=" sub-shop" style={{ color: "orange" }}>
                            <Link to="/shop" class="product-btn-single-cart">
                              Continue Shopping
                            </Link>
                          </div>
                          <br />
                          <br />
                          {/* <div class="arrow-cart">
									<button class="sort-arrow"> <i class="arrow left"></i>&nbsp; 1 &nbsp;<i class="arrow right"></i></button>
									
								</div> */}
                        </div>
                      </div>
                    </div>
                  </>
                )
              ) : !cartItems.length ? (
                <Message>
                  Your Cart is empty.{" "}
                  <a href="/shop" style={{ textDecoration: "underline" }}>
                    Go Back.
                  </a>{" "}
                </Message>
              ) : (
                <>
                  <div class="col-md-6 col-sm-12">
                    <div class="order-detail-11">
                      {cartItems.map((item) => (
                        <div class="row" key={item.product}>
                          <div class="cart-hr-line">
                            <hr></hr>
                          </div>
                          <div style={{ display: "flex" }}>
                            <div style={{ width: "57%", textAlign: "left" }}>
                              <img
                                style={{ width: "96%" }}
                                src={item?.image}
                                alt=""
                              />
                            </div>

                            <div style={{ width: "50%" }}>
                              <h3 class="product-great">{item?.name}</h3>
                              <div class="product-kgreat">
                                <h6>12 FL OZ • Ketone Hydration</h6>
                              </div>
                              <div class="product-kgreat">
                                <h6>Qty: {item?.qty}</h6>
                              </div>

                              <div>
                                <h3 class="product-price-pay-cart-guest-cart">
                                  ${(item?.price * item?.qty).toFixed(2)}
                                </h3>
                              </div>
                            </div>
                            <div style={{ width: "48%", textAlign: "right" }}>
                              <div className="cart-button-edit">
                                <button
                                  style={{
                                    border: "1px solid #75757575",
                                    backgroundColor: "white",
                                    borderRadius: "3px",
                                    paddingLeft: "6px",
                                    paddingRight: "6px",
                                    paddingTop: "4px",
                                  }}
                                >
                                  {" "}
                                  <span
                                    style={{
                                      cursor: "pointer",
                                      border: "none",
                                      display: item.qty < 2 ? "none" : "",
                                    }}
                                    disabled={item.qty === 1}
                                    onClick={() => {
                                      dispatch(
                                        addItem(
                                          item.product,
                                          Number(item.qty - 1)
                                        )
                                      );
                                    }}
                                  >
                                    {" "}
                                    <FontAwesomeIcon
                                      icon={faAngleLeft}
                                      style={{
                                        color: "black",
                                        fontSize: "12px",
                                        paddingRight: "5px",
                                      }}
                                    />
                                  </span>{" "}
                                  &nbsp;{" "}
                                  <span
                                    style={{
                                      color: "black",
                                      fontSize: "0.9rem",
                                    }}
                                  >
                                    {" "}
                                    {item?.qty}
                                  </span>{" "}
                                  &nbsp;{" "}
                                  <span
                                    style={{
                                      cursor: "pointer",
                                      border: "none",
                                    }}
                                    onClick={() => {
                                      dispatch(
                                        addItem(
                                          item.product,
                                          Number(item.qty + 1)
                                        )
                                      );
                                    }}
                                  >
                                    <FontAwesomeIcon
                                      icon={faAngleRight}
                                      style={{
                                        color: "black",
                                        fontSize: "12px",
                                        paddingLeft: "5px",
                                      }}
                                    />
                                  </span>
                                </button>
                              </div>
                              <div class="opt-three-pay-cart-new">
                                <p
                                  style={{
                                    color: "orange",
                                    cursor: "pointer",
                                    marginBottom: "0px",
                                  }}
                                  onClick={() =>
                                    handleRemoveFromCart(item.product)
                                  }
                                >
                                  Remove
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div class="cart-hr-line">
                      <hr></hr>
                    </div>
                    <div class=" sub-shop-cart-emp">
                      <button
                        onClick={clearCart}
                        class="product-btn-single-carts"
                      >
                        Empty Cart
                      </button>
                    </div>
                  </div>
                  <div class="col-md-6 col-sm-12">
                    <div id="product-21" class="single22-product">
                      <div class="cart-hr-line2" style={{ pddingTop: "30px" }}>
                        <hr></hr>
                      </div>

                      <div class="pro-part-cartt">
                        <div class="pro-duct-cart-only">
                          <h4>
                            Subtotal:{" "}
                            {cartItems
                              .reduce(
                                (acc, item) => acc + item.qty * item.price,
                                0
                              )
                              .toLocaleString("en-IN", {
                                maximumFractionDigits: 2,
                                style: "currency",
                                currency: "USD",
                              })}
                          </h4>{" "}
                        </div>
                        <div class="product-sub-total">
                          Shipping and Taxes added at checkout.
                        </div>
                        <div>
                          <div
                            id="truemed-prequalify"
                            style={{ fontSize: "16px", fontWeight: "bold" }}
                            data-public-id="tm_qual_lwihwute1u"
                          >
                            {" "}
                          </div>
                        </div>
                        <div class="check-out-btn">
                          <input
                            class="product-btn-default-cart-new"
                            type="submit"
                            value="PROCEED TO CHECKOUT"
                            disabled={!cartItems.length}
                            onClick={handleCheckout}
                          ></input>
                        </div>

                        <div class=" sub-shop">
                          <Link to="/shop" class="product-btn-single-cart">
                            Continue Shopping
                          </Link>
                        </div>
                        <br />
                        <br />
                        {/* <div class="arrow-cart">
									<button class="sort-arrow"> <i class="arrow left"></i>&nbsp; 1 &nbsp;<i class="arrow right"></i></button>
									
								</div> */}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div class="col-12">
            <div class="row">
              <div class="review-all-leave-cart">
                <div class="down-product">
                  <div class="container" style={{ paddingLeft: "10px" }}>
                    <div class="review-leave-cart" style={{ display: "flex" }}>
                      More ways to &nbsp;{" "}
                      <div
                        class="fts-image"
                        style={{
                          fontFamily: "altgothic",
                          color: "orange",
                          fontSize: "30px",
                          letterSpacing: "4px",
                        }}
                      >
                        {" "}
                        BE GREAT.
                      </div>
                    </div>
                    <div class="more-way">
                      <div class="row">
                        <div class=" col-3">
                          <a href="/product/62de9371616a7a0cf79dc5ea">
                            <div class="part-car">
                              <img style={{ width: "100%" }} src={Mfour}></img>
                            </div>
                            <div class="part-2">
                              <h3 class="product-great">Magma 4 pack</h3>
                              <h3 class="product-bgreat">
                                12 fl oz Ketone Hydration 4pk
                              </h3>
                            </div>
                          </a>
                        </div>

                        <div class=" col-3">
                          <a href="/product/62de9414616a7a0cf79dc630">
                            <div class="part-car">
                              <img style={{ width: "100%" }} src={Gfour}></img>
                            </div>
                            <div class="part-2">
                              <h3 class="product-great">Glacier 4 pack</h3>
                              <h3 class="product-bgreat">
                                12 fl oz Ketone Hydration 4pk
                              </h3>
                            </div>
                          </a>
                        </div>

                        <div class=" col-3">
                          <a href="/product/62e41bcc66708638230a1266">
                            <div class="part-car">
                              <img style={{ width: "100%" }} src={single}></img>
                            </div>
                            <div class="part-2">
                              <h3 class="product-great">Variety 4 pack</h3>
                              <h3 class="product-bgreat">
                                12 fl oz Ketone Hydration 4pk
                              </h3>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div class="col-12">
            <div class="container">
              <div class="more-way">
                <div class="row">
                  <div class=" col-3">
                    <a href="/product/62e3d7ddd0134722ac169397">
                      <div class="part-car">
                        <img style={{ width: "100%" }} src={G12}></img>
                      </div>
                      <div class="part-2">
                        <h3 class="product-great">Glacier 12 pack</h3>
                        <h3 class="product-bgreat">
                          12 fl oz Ketone Hydration 12pk
                        </h3>
                      </div>
                    </a>
                  </div>
                  <div class=" col-3">
                    <a href="/product/62e28ad6d0134722ac168f71">
                      <div class="part-car">
                        <img style={{ width: "100%" }} src={m12}></img>
                      </div>
                      <div class="part-2">
                        <h3 class="product-great">Magma 12 pack</h3>
                        <h3 class="product-bgreat">
                          12 fl oz Ketone Hydration 12pk
                        </h3>
                      </div>
                    </a>
                  </div>
                  {/* <div class=" col-3">
                          <div class="part-car">
                          <img style={{width:"100%"}} src={single}></img>
                          </div>
                          <div class="part-2">
                            <h3 class="product-great">
                              Product</b>
                            </h3>
                            <h3 class="product-bgreat">details</h3>
                          </div>
                        </div> */}
                </div>
              </div>
            </div>
          </div>

          <div class="help-diff-cart">
            <div class="row justify-content-center text-center">
              <div class="col-md-8 col-lg-6">
                <div class="header-cart" style={{ color: "black" }}>
                  <h2>Help Us Make a Difference</h2>
                </div>
              </div>

              <div class="ourt-story">
                <p>
                  Are you an Ambassador for living life to the fullest? Being
                  healthy, being present, and <br />
                  showing up in the world at your very best? <br />
                  <br />
                  Then connect with founder of Tecton® and learn more about how
                  we can work <br />
                  together.
                </p>
              </div>
            </div>
            <div className="btn-our-cart" style={{ textAlign: "center" }}>
              <Link to="/ambassador">
                <input
                  class="product-btn-help"
                  type="submit"
                  value="BECOME AN AMBASSADOR"
                ></input>
              </Link>
            </div>
            <input type="hidden" data-id={hidden_userID} id="h_userID" />
            <input type="hidden" data-id={hidden_userEmail} id="h_userEmail" />
            <input type="hidden" data-id={itemsSubtotal} id="h_amount" />
            <input type="hidden" data-id={items} id="h_items" />
            <input type="hidden" data-id={cjevent} id="h_cjeventOrder" />
          </div>
        </section>
        <ScriptTag
          isHydrating={true}
          type="text/javascript"
          src="../cartTag.js"
        />
      </div>
    </div>
  );
};

export default Cart;
