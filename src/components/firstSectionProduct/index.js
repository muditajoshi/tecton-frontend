import React, { useEffect, useState } from "react";
import "./firstproductcarousel.css";
import Glacier4 from "../../images/newshop/new4G.png";
import Glacier12 from "../../images/newshop/glacier12.png";
import Magma4 from "../../images/newshop/magma4.png";
import StarRatings from "react-star-ratings";
import Magma12 from "../../images/newshop/magma12.png";
import Variety from "../../images/newshop/variety4.png";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { incNumber } from "../../actions/cartUpdateActions";
import SmallOverlay from "../../skeleton/SmallOverlay";
import { useHistory } from "react-router-dom";
import { addItem, removeItem } from "../../actions/cartActions";
import AddToCart from "../addtocart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import Vector from "../../images/newshop/Vector 29.png";

const Products = (props) => {
  console.log(props.loadedProductsValues)
  const dispatch = useDispatch();
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [overlay, setoverlay] = useState();
  const [NoFreq, setNoFreq] = useState();
  const [idq, setid] = useState(null);


 // Truemed  implementation  start
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://truemed-public.s3.us-west-1.amazonaws.com/truemed-ads/prequal-widget.min.js';
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
 // Truemed  implementation  end




  // const [InitialGlacier4PackValue,setInitialGlacier4PackValue] = useState();
  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_PROXY_URL}/api/products`)
  //     .then((res) =>
  //       localStorage.setItem(
  //         "inital4PackGlacierValue",
  //         JSON.stringify(
  //           res.data.products.filter((val) => val.name == "Glacier 4 Pack")
  //         )
  //       )
  //     );
  // }, []);
  // console.log(JSON.parse(localStorage.getItem("inital4PackGlacierValue")));
  const [Product, setProducts] = useState(
    props.loadedProductsValues.filter((val) => val.name == "Glacier 4 Pack")
  );
  const [select, setSelect] = useState([]);
  const [checked, setChecked] = useState(true);
  const [showtwo, setshowtwo] = useState("block");
  const [showone, setshowone] = useState("none");
  const [more, setmore] = useState("none");
  const [toggle, setToggle] = useState(false);
  const [initialPackValue, setInitialPackValue] = useState("normal12Pack");
  useEffect(() => {
    if (
      selectedFrame?.name === "Magma 4 Pack" ||
      selectedFrame?.name === "Glacier 4 Pack" ||
      selectedFrame?.name === "Variety 4 Pack"
    ) {
      setshowtwo("block");
      setshowone("none");
    }
  });

  const displaymore = () => {
    setmore("block");
    if (more === "block") {
      setmore("none");
    }
  };
  const billfunction = (e) => {
    setChecked(e.target.checked);
    console.log(e.target.value);
    setInitialPackValue(e.target.value);
    // setbillingRequired(true)
    // setshowbill("block")
    if (showtwo === "none") {
      setshowtwo("block");
      setshowone("none");
      // console.log("show 2 visible");
    }
    if (showtwo === "block") {
      setshowtwo("none");
      setshowone("block");
      // console.log("show 1 visible");
    }
  };

  const showFourPack = () => {
    if (
      selectedFrame?.name === "Magma 4 Pack" ||
      selectedFrame?.name === "Glacier 4 Pack" ||
      selectedFrame?.name === "Variety 4 Pack"
    ) {
      return { display: "block" };
    }

    return { display: "none" };
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/api/products`)
      .then((res) => setProducts(res.data.products.slice(0,5)));
  }, []);

  const frameImageURLs = [
    {
      id: 1,
      image: Glacier4,
      name: "Product 1",
      rating: 4.5,
      price: 20,
    },
    {
      id: 2,
      image: Glacier12,
      name: "Product 2",
      rating: 3.8,
      price: 20,
    },
    {
      id: 3,
      image: Magma4,
      name: "Product 3",
      rating: 4.2,
      price: 20,
    },
    {
      id: 4,
      image: Magma12,
      name: "Product 4",
      rating: 3.7,
      price: 20,
    },
    {
      id: 5,
      image: Variety,
      name: "Product 5",
      rating: 4.8,
      price: 20,
    },
  ];

  const [selectedFrame, setSelectedFrame] = useState(Product[0]);

  const [showProductDetails, setShowProductDetails] = useState(true);

  const handleFrameClick = (product) => {
    setSelectedFrame(product);
    setShowProductDetails(true);
    setQuantity(1);
    setInitialPackValue("normal12Pack");
    
  };
  console.log(selectedFrame);
  const [cartData, setCartData] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
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
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/api/cart/user/${userInfo?.id}`)
      .then((res) => {
        setCartData(res?.data?.cart[0]?.cartItems);
      });
  }, []);

  const [quantity, setQuantity] = useState(1);

  const plus = () => {
    const addQuantity = quantity + 1;
    setQuantity(addQuantity);
  };
  const minus = () => {
    if (quantity > 1) {
      const minusQuantity = quantity - 1;
      setQuantity(minusQuantity);
    }
  };

  const [frequency, setFrequency] = useState();
  useEffect(() => {
    if (frequency === "2 weeks") {
      setid(selectedFrame?.stripePriceId[0]?.id);
    } else if (frequency === "4 weeks") {
      setid(selectedFrame?.stripePriceId[1]?.id);
    } else if (frequency === "6 weeks") {
      setid(selectedFrame?.stripePriceId[2]?.id);
    }
  });

  const buyNowSubscribe = (e) => {
    setoverlay(<SmallOverlay />);

    setShow(true);
    // ReactGA.event({
    //     category: product?.name,
    //     action: `${product?.name} added to cart`,
    //     label: "tecton drink",
    //     value: product?.price,
    //   })

    if (idq == null) {
      setNoFreq("*Please choose a subscription frequency");
      setShow(false);
    } else if (idq != null) {
      if (userInfo) {
        axios
          .get(`${process.env.REACT_APP_PROXY_URL}/api/users/profile`, config)
          .then((res) => {
            if (
              res.data.userType[0] == "Employee" &&
              res.data.userMetaData.employee.isApproved == false
            ) {
              setShow(false);
              setNoFreq(
                "*you cannot subscribe until you are approved as an employee"
              );
            } else if (
              res.data.userType[0] == "Ambassador" &&
              !res?.data?.ambassadorMetaData?.refCode
            ) {
              setShow(false);
              setNoFreq(
                "*you cannot subscribe until you are approved as an ambassador"
              );
            } else {
              axios
                .put(
                  `${process.env.REACT_APP_PROXY_URL}/api/cart/${userInfo.id}/additem`,
                  {
                    cartItems: [
                      {
                        product: selectedFrame?._id,
                        name: selectedFrame?.name,
                        image: selectedFrame?.image,
                        price: selectedFrame?.price,
                        countInStock: selectedFrame?.countInStock,
                        qty: quantity,
                        numberOfCans: selectedFrame?.number_of_cans,
                        subscription: selectedFrame?.subscription,
                        frequency: frequency,
                        stripeProductId: selectedFrame?.stripeProductId,
                        stripePriceId: {
                          id: idq,
                          interval: frequency,
                        },
                      },
                    ],
                  }
                )
                .then((res) => {
                  if (res) {
                    window.dataLayer.push({
                      event: "add_to_cart",
                      ecommerce: {
                        currency: "USD",
                        value: selectedFrame?.price * quantity,
                        items: [
                          {
                            item_name: selectedFrame?.name,
                            item_brand: "TECTON",
                            item_category: "Drink",
                            price: selectedFrame?.price,
                            quantity: quantity,
                          },
                        ],
                      },
                    });
                    dispatch(incNumber());
                    setShow(false);
                    history.push(
                      `/cart/${selectedFrame?._id}?qty=${
                        quantity + olderCartQuantity
                      }`
                    );
                  }
                });
            }
          });
      } else {
        history.push(
          `/login?redirect=/cart/${selectedFrame?._id}?qty=${
            quantity + olderCartQuantity
          }`
        );
        localStorage.setItem(
          "subscriptionItems",
          JSON.stringify([
            {
              product: selectedFrame?._id,
              name: selectedFrame?.name,
              image: selectedFrame?.image,
              price: selectedFrame?.price,
              countInStock: selectedFrame?.countInStock,
              qty: quantity,
              numberOfCans: selectedFrame?.number_of_cans,
              subscription: selectedFrame?.subscription,
              frequency: frequency,
              stripeProductId: selectedFrame?.stripeProductId,
              stripePriceId: {
                id: idq,
                interval: frequency,
              },
            },
          ])
        );
      }
    }
  };

  const buyNow = (e) => {
    setoverlay(<SmallOverlay />);

    setShow(true);
    // ReactGA.event({
    //     category: product?.name,
    //     action: `viewing ${product?.name}`,
    //     label: "tecton drink",
    //     value: product?.price,
    //   })

    // console.log(match.params)
    axios
      .put(
        `${process.env.REACT_APP_PROXY_URL}/api/cart/${userInfo?.id}/additem`,
        {
          cartItems: [
            {
              product: selectedFrame?._id,
              name: selectedFrame?.name,
              image: selectedFrame?.image,
              price: selectedFrame?.price,
              countInStock: selectedFrame?.countInStock,
              qty: quantity,
              numberOfCans: selectedFrame?.number_of_cans,
              subscription: false,
              frequency: frequency,
            },
          ],
        }
      )
      .then((res) => {
        if (res) {
          window.dataLayer.push({
            event: "add_to_cart",
            ecommerce: {
              currency: "USD",
              value: selectedFrame?.price * quantity,
              items: [
                {
                  item_name: selectedFrame?.name,
                  item_brand: "TECTON",
                  item_category: "Drink",
                  price: selectedFrame?.price,
                  quantity: quantity,
                },
              ],
            },
          });

          dispatch(incNumber());
          setShow(false);
          history.push(
            `/cart/${selectedFrame?._id}?qty=${quantity + olderCartQuantity}`
          );
        }
      })
      .catch((err) => {
        if (err) {
          setShow(false);
          history.push(
            `/cart/${selectedFrame?._id}?qty=${quantity + olderCartQuantity}`
          );
        }
      });

    // setTimeout(() => {
    // 	window.location.reload(false)
    // }, 500);
  };

  const addToCartSubscribe = (e) => {
    setoverlay(<SmallOverlay />);

    setShow(true);
    // ReactGA.event({
    //     category: product?.name,
    //     action: `${product?.name} added to cart`,
    //     label: "tecton drink",
    //     value: product?.price,
    //   })

    if (idq == null) {
      setNoFreq("*Please choose a subscription frequency");
      setShow(false);
    } else if (idq != null) {
      if (userInfo) {
        axios
          .get(`${process.env.REACT_APP_PROXY_URL}/api/users/profile`, config)
          .then((res) => {
            if (
              res.data.userType[0] == "Employee" &&
              res.data.userMetaData.employee.isApproved == false
            ) {
              setShow(false);
              setNoFreq(
                "*you cannot subscribe until you are approved as an employee"
              );
            } else if (
              res.data.userType[0] == "Ambassador" &&
              !res?.data?.ambassadorMetaData?.refCode
            ) {
              setShow(false);
              setNoFreq(
                "*you cannot subscribe until you are approved as an ambassador"
              );
            } else {
              axios
                .put(
                  `${process.env.REACT_APP_PROXY_URL}/api/cart/${userInfo.id}/additem`,
                  {
                    cartItems: [
                      {
                        product: selectedFrame?._id,
                        name: selectedFrame?.name,
                        image: selectedFrame?.image,
                        price: selectedFrame?.price,
                        countInStock: selectedFrame?.countInStock,
                        qty: quantity,
                        numberOfCans: selectedFrame?.number_of_cans,
                        subscription: selectedFrame?.subscription,
                        frequency: frequency,
                        stripeProductId: selectedFrame?.stripeProductId,
                        stripePriceId: {
                          id: idq,
                          interval: frequency,
                        },
                      },
                    ],
                  }
                )
                .then((res) => {
                  if (res) {
                    window.dataLayer.push({
                      event: "add_to_cart",
                      ecommerce: {
                        currency: "USD",
                        value: selectedFrame?.price * quantity,
                        items: [
                          {
                            item_name: selectedFrame?.name,
                            item_brand: "TECTON",
                            item_category: "Drink",
                            price: selectedFrame?.price,
                            quantity: quantity,
                          },
                        ],
                      },
                    });
                    dispatch(incNumber());
                    setShow(false);
                    axios
                      .get(
                        `${process.env.REACT_APP_PROXY_URL}/api/cart/user/${userInfo?.id}`
                      )
                      .then((res) => {
                        setCartData(res?.data?.cart[0]?.cartItems);
                      });
                  }
                });
            }
          });
      } else {
        history.push(
          `/login?redirect=/cart/${selectedFrame?._id}?qty=${
            quantity + olderCartQuantity
          }`
        );
        localStorage.setItem(
          "subscriptionItems",
          JSON.stringify([
            {
              product: selectedFrame?._id,
              name: selectedFrame?.name,
              image: selectedFrame?.image,
              price: selectedFrame?.price,
              countInStock: selectedFrame?.countInStock,
              qty: quantity,
              numberOfCans: selectedFrame?.number_of_cans,
              subscription: selectedFrame?.subscription,
              frequency: frequency,
              stripeProductId: selectedFrame?.stripeProductId,
              stripePriceId: {
                id: idq,
                interval: frequency,
              },
            },
          ])
        );
      }
    }
  };

  const addToCart = (e) => {
    setoverlay(<SmallOverlay />);

    setShow(true);
    // ReactGA.event({
    //     category: product?.name,
    //     action: `viewing ${product?.name}`,
    //     label: "tecton drink",
    //     value: product?.price,
    //   })

    // console.log(match.params)
    if (userInfo) {
      axios
        .put(
          `${process.env.REACT_APP_PROXY_URL}/api/cart/${userInfo?.id}/additem`,
          {
            cartItems: [
              {
                product: selectedFrame?._id,
                name: selectedFrame?.name,
                image: selectedFrame?.image,
                price: selectedFrame?.price,
                countInStock: selectedFrame?.countInStock,
                qty: quantity,
                numberOfCans: selectedFrame?.number_of_cans,
                subscription: false,
                frequency: frequency,
              },
            ],
          }
        )
        .then((res) => {
          if (res) {
            window.dataLayer.push({
              event: "add_to_cart",
              ecommerce: {
                currency: "USD",
                value: selectedFrame?.price * quantity,
                items: [
                  {
                    item_name: selectedFrame?.name,
                    item_brand: "TECTON",
                    item_category: "Drink",
                    price: selectedFrame?.price,
                    quantity: quantity,
                  },
                ],
              },
            });

            dispatch(incNumber());
            setShow(false);
            axios
              .get(
                `${process.env.REACT_APP_PROXY_URL}/api/cart/user/${userInfo?.id}`
              )
              .then((res) => {
                setCartData(res?.data?.cart[0]?.cartItems);
              });
          }
        })
        .catch((err) => {
          if (err) {
            setShow(false);
          }
        });
    } else {
      dispatch(addItem(selectedFrame?._id, quantity + olderCartQuantity));
      setShow(false);
    }
  };

  let olderCartQuantity =
    JSON?.parse(localStorage?.getItem("cartItems"))?.filter((val) => {
      return val?.product === selectedFrame?._id;
    })?.length > 0
      ? (JSON?.parse(localStorage?.getItem("cartItems"))?.filter((val) => {
          return val.product === selectedFrame?._id;
        }))[0]?.qty
      : 0;

  return (
    <div className="product-page-version-3">
      {show ? overlay : <></>}
      <div className="product3">
        <div className="info">
          <div className="shoplanding__container__right_productname">
            {selectedFrame?.name ? selectedFrame?.name : <>"Glacier 4 Pack"</>}
          </div>
          {showProductDetails ? (
            <div className="shoplanding__container__right_rating">

            <StarRatings

              rating={selectedFrame?.rating}

              starRatedColor="orange"

              // changeRating={ratingChanged}

              numberOfStars={5}

              starDimension="20px"

              starSpacing="3px"

            /> <div className="numericratings"><span >{(selectedFrame?.rating)?.toFixed(1)==1?((selectedFrame?.rating)?.toFixed(1)+" "+""):((selectedFrame?.rating)?.toFixed(1)+" "+"")}
</span></div>
          </div>
          ) : (
            <></>
          )}
          <div className="shoplanding__container__right_price">
            ${selectedFrame?.price}{" "}
          </div>
        </div>
      </div>

      <div className="product-page-images">
        <div className="first_carouser_selected_image">
          <img
            style={{ borderRadius: "5px" }}
            className="product-page-selected-image"
            alt="Selected Product Image"
            src={selectedFrame?.image}
            width="650"
            height="458"
          />
        </div>
        <div className="product_name-carousel">
          {" "}
          <span className="glacier_name-css">GLACIER</span>
          <span className="magma_name-css">MAGMA</span>
          <span className="variety_name-css">VARIETY</span>
        </div>
        <div className="rectangle-parent">
          {userInfo ? (
            <>
              {Product?.map((product, index) => (<>
                <div
                  className="frame-inner"
                  key={index}
                  onClick={() => handleFrameClick(product)}
                >
                  <img
                    className={`image_border_product_glacier ${
                      selectedFrame?._id === product._id ? "selected" : ""
                    }`}
                    alt={`Frame ${index + 1}`}
                    src={product.section_image}
                  />

                  {/* {cartData?.filter((val)=>val?.name==product?.name).map((vals)=><span className="quantity_round">{vals.qty}</span>)} */}
                  {cartData
                    ?.filter((val) => val?.name == product?.name)
                    .reduce((a, b) => a + b.qty, 0) == 0 ? (
                    <></>
                  ) : (
                    <span className="quantity_round">
                      {" "}
                      {cartData
                        ?.filter((val) => val?.name == product?.name)
                        .reduce((a, b) => a + b.qty, 0)}
                    </span>
                  )}
                </div>
                <div className="dividation-line" style={product?.name=="Glacier 12 Pack" || product?.name=="Magma 12 Pack" ?{width:"1px",marginRight:"13px",marginLeft:"-10px",height:"80px",backgroundColor:"#E1E1E1"}:{} }></div></>
              ))}
            </>
          ) : (
            <>
              {Product?.map((product, index) => (<>
                
                <div
                  className="frame-inner"
                  key={index}
                  onClick={() => handleFrameClick(product)}
                >
                  <img className={`image_border_product_glacier ${
                      selectedFrame?._id === product._id ? "selected" : "" }`}
                      alt={`Frame ${index + 1}`}
                    src={product.section_image}  />
                      {cartItems
                    ?.filter((val) => val?.name == product?.name)
                    .reduce((a, b) => a + b.qty, 0) == 0 ? ( <></> ) : (
                    <span className="quantity_round">
                      {cartItems
                        ?.filter((val) => val?.name == product?.name)
                        .reduce((a, b) => a + b.qty, 0)}
                    </span>
                   )}
                 
                </div>
                <div className="dividation-line" style={product?.name=="Glacier 12 Pack" || product?.name=="Magma 12 Pack" ?{width:"1px",marginRight:"13px",marginLeft:"-10px",height:"80px",backgroundColor:"#E1E1E1"}:{} }></div></>
              ))}
          
            </>
          )}
        </div>
        <div className="first_carousel_margin-left">
          <div className="shoplanding__container__right_product_flavor">
          {selectedFrame?.description}
            
          </div>
          <hr />
          <div className="shoplanding__container__right_subscription">
            <i>
              {" "}
              Subscribe to 12 packs! Save Up To 12% (Subscription unavailable on
              4-packs)
            </i>
          </div>
          <br/>
          <div>
                      <div id="truemed-prequalify" style={{fontSize:"16px",fontWeight:"bold"}} data-public-id="tm_qual_lwihwute1u"> </div>
                     </div>
          <div>
            {showProductDetails ? (
              <>
                <div className="product-new-font">
                  {selectedFrame?.subscription ? (
                    <div class="one-subs" style={{ display: "flex" }}>
                      <input
                        name="group1"
                        //   value="Ambassador"
                        onClick={(e) => setSelect([...select, e.target.value])}
                        type="radio"
                        class="form-check-input"
                        id="exampleCheck1"
                        onChange={billfunction}
                        value={"normal12Pack"}
                        checked={initialPackValue == "normal12Pack"}
                      />
                      <label class="form-check-label1" for="exampleCheck1">
                        &nbsp; &nbsp;One-Time Purchase
                      </label>
                    </div>
                  ) : (
                    <div class="one-subs" style={{ display: "none" }}>
                      <input
                        name="group1"
                        //   value="Ambassador"
                        onClick={(e) => setSelect([...select, e.target.value])}
                        type="radio"
                        class="form-check-input"
                        id="exampleCheck1"
                        onChange={billfunction}
                        defaultChecked
                      />
                      <label
                        class="form-check-label1"
                        for="exampleCheck1"
                        style={{ display: "none" }}
                      >
                        &nbsp; &nbsp;One-Time Purchase
                      </label>
                    </div>
                  )}
                  <br />
                  {selectedFrame?.subscription ? (
                    <div class="one-subs" style={{ display: "flex" }}>
                      <input
                        name="group1"
                        onClick={(e) => setSelect([...select, e.target.value])}
                        type="radio"
                        class="form-check-input"
                        id="exampleCheck2"
                        onChange={billfunction}
                        value={"subscription12Pack"}
                        checked={initialPackValue == "subscription12Pack"}
                      />
                      <label class="form-check-label1" for="exampleCheck2">
                        &nbsp; &nbsp;Subscribe & Save up to 12%
                      </label>
                      <br />
                    </div>
                  ) : (
                    <div style={{ display: "none" }}>
                      <input
                        name="group1"
                        onClick={(e) => setSelect([...select, e.target.value])}
                        type="radio"
                        class="form-check-input"
                        id="exampleCheck2"
                        onChange={billfunction}
                      ></input>
                      <label class="form-check-label1" for="exampleCheck2">
                        Subscribe & Save up to 12%
                      </label>

                      <br />
                    </div>
                  )}

                  {initialPackValue == "subscription12Pack" ? (
                    <div class="product-subs" style={{ display: "block" }}>
                      <div
                        class="dropdown-container-productdesc"
                        style={{ paddingLeft: "30px" }}
                      >
                        <select
                          style={{
                            fontSize: "15px",
                            backgroundColor: "white",
                            borderColor: "#75757575",
                            padding: "7px 55px 4px 55px ",
                            borderRadius: "5px",
                            color: "#000000",
                          }}
                          onChange={(e) => setFrequency(e.target.value)}
                        >
                          <option
                            class="w3-panel w3-ios-dark-black"
                            style={{ color: "black" }}
                            value=""
                            selected
                            disabled
                            hidden
                          >
                            Frequency
                          </option>
                          <option
                            value="2 weeks"
                            onClick={() =>
                              setid(selectedFrame?.stripePriceId[0]?.id)
                            }
                          >
                            2 weeks
                          </option>
                          <option
                            value="4 weeks"
                            onClick={() =>
                              setid(selectedFrame?.stripePriceId[1]?.id)
                            }
                          >
                            4 weeks
                          </option>
                          <option
                            value="6 weeks"
                            onClick={() =>
                              setid(selectedFrame?.stripePriceId[2]?.id)
                            }
                          >
                            6 weeks
                          </option>
                        </select>
                      </div>

                      <br />
                      <br />

                      <div style={{ color: "#757575" }} onClick={displaymore}>
                        <div class="conten">
                        <img height="18px" src={Vector}/> Discounts will start applying second shipment
                          onwards.
                          <br />
                          <img height="18px" src={Vector}/> Save 5% on 1 case subscription
                          <br />
                          <img height="18px" src={Vector}/> Save 8% on 2 cases subscription
                          <br />
                          <img height="18px" src={Vector}/> Save 10% on 3 cases subscription
                          <br />
                          <img height="18px" src={Vector}/> Save 12% on 4 cases or more subscription
                          <br />
                          <img height="18px" src={Vector}/> Free shipping on two or more cases.
                          <br />
                          <img height="18px" src={Vector}/> Access to (extra)Ordinary Club Membership.
                          <br />
                          <img height="18px" src={Vector}/> Receive info about new products, cutting-edge
                          science, and more.
                          <br />
                          <img height="18px"  src={Vector}/> Modify, skip, or cancel subscription anytime!
                        </div>
                      </div>

                      <div style={{ color: "red", paddingLeft: "30px" }}>
                        {NoFreq}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>

                {/* <div style={showFourPack()}>

									<div style={{ display: "flex",fontSize:"15px" }}>

										<input name="group9"




											type="radio"

											class="form-check-input"

											id="exampleCheck9"

											defaultChecked



										/>&nbsp;&nbsp;

										<label class="form-check-label1" for="exampleCheck1">

											One-Time Purchase

										</label>



									</div>

									<br />

								<span style={{fontSize:"16px",color:"#757575"}}>	4-Packs are currently not available for subscriptions. To subscribe, please view our 12-Pack.
								</span>
								</div> */}
                <br />
                <div className="flex-div_first_carousel_button">
                  <div className="shoplanding__container__right_subscription_quantity">
                    <button className="quntityadjustment" onClick={minus}>
                      -
                    </button>
                    <span className="new_shop_product_quantity">
                      {quantity}
                    </span>
                    <button className="quntityadjustment" onClick={plus}>
                      +
                    </button>
                  </div>
                  {initialPackValue == "normal12Pack" ? (
                    <>
                      <div className="shoplanding__container__right_subscription_buynow">
                        <button
                          className="new_shop_buttton_buy"
                          onClick={buyNow}
                          style={{color:"black"}}
                        >
                          BUY NOW
                        </button>
                      </div>
                      <div className="shoplanding__container__right_subscription_buynow">
                        <button
                          className="new_shop_buttton_buy_add"
                          onClick={addToCart}  style={{color:"black"}}
                        >
                          ADD TO CART
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="shoplanding__container__right_subscription_buynow">
                        <button
                          className="new_shop_buttton_buy"
                          onClick={buyNowSubscribe}
                          style={{color:"black"}}
                        >
                          BUY NOW
                        </button>
                      </div>
                      <div className="shoplanding__container__right_subscription_buynow">
                        <button
                          className="new_shop_buttton_buy_add"
                          onClick={addToCartSubscribe}
                          style={{color:"black"}}
                        >
                          ADD TO CART
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
