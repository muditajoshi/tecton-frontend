import "../css/productdesc.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Thunder from "../images/newshop/thunder.png";
import Shield from "../images/newshop/shield.png";
import Sugar from "../images/newshop/sugar.png";
import Cup from "../images/newshop/cup.png";
import AddToCart from "./addtocart";
import yelloLine from "../images/newshop/yello_line.png";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom"; //review rating history
import Gfour from "../images/magmafourpack.webp";
import yellowLine from "../images/newshop/Tectonlifestyle_Yellowline.png";
import Vector from "../images/newshop/Vector 29.png";

import Focus from "../images/newshop/Focus_Icon.png";

import Craving from "../images/newshop/Suppress_Icon.png";

import Boost from "../images/newshop/Boost_Icon.png";

import Recovery from "../images/newshop/Recovery_Icon.png";

import Dashedline from "../images/newshop/Dashed_line.png";
// import Carousel from 'react-bootstrap/Carousel';
// import { CCarousel } from '@coreui/react'
// import { CCarouselItem } from '@coreui/react'
import { addItem, removeItem } from "../actions/cartActions";
import { Carousel } from "react-responsive-carousel";
import G12 from "../images/Tecton_Glacier_12Pk_USE.webp";
import m12 from "../images/Tecton_Magma_12Pk_USE.webp";
import ScrollToTop from "./ScrollToTop";
import single from "../images/Tecton_Variety4pk.webp";
import { incNumber } from "../actions/cartUpdateActions";
import {
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Form,
  FloatingLabel,
} from "react-bootstrap";
// import ImageMagnifier from '../components/ImageMagnifier'; // to magnify image on hover
import Rating from "../skeleton/Rating";
import Meta from "../skeleton/Meta";
import Loader from "../skeleton/Loader";
import Message from "../skeleton/Message";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { listMyOrders } from "../actions/orderActions";
import { refreshLogin, getUserDetails } from "../actions/userActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import getDateString from "../utils/getDateString";
import useDocumentTitle from "./useDocumentTitle";
import axios from "axios";
import SmallOverlay from "../skeleton/SmallOverlay";
import StarRatings from "react-star-ratings";
import CarouselDesc from "./carousel";
// import ReactGA from "react-ga4"

//rating review
import "../css/reviewrating.css";
// import StarRatings from "react-star-ratings";
import ReactStars from "react-rating-stars-component";
// import StarRatingComponent from "react-star-rating-component";
import calculateDuration from "../utils/durationCalculator";
//rating review

const ProductDesc = ({ history, match, location }) => {

   //review rating history
   const handleLoginClick = () => {
     sessionStorage.setItem("returnPage", history.location.pathname);
   };
   //review rating history


  window.addEventListener("pageshow", function (event) {
    var historyTraversal =
      event.persisted ||
      (typeof window.performance != "undefined" &&
        window.performance.navigation.type === 2);
    if (historyTraversal) {
      // Handle page restore.
      //alert('refresh');
      window.location.reload();
    }
  });

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
  // Truemed  implementation  end

  const [isActivep2, setIsActivep2] = useState(false);
  const [isActivep3, setIsActivep3] = useState(false);
  const [isActivep4, setIsActivep4] = useState(false);
  const [cane1, setcane1] = useState("white");
  const [cane2, setcane2] = useState("white");
  const [cane3, setcane3] = useState("white");
  const [desc, setdesc] = useState("none");
  const [nutri, setnutri] = useState("none");
  const [ingre, setingre] = useState("none");
  const [more, setmore] = useState("none");
  const [show, setShow] = useState(false);
  const [isActivep7, setIsActivep7] = useState(false);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;
  // console.log(productDetails)

  const [product_id, setProductId] = useState();
  const [product_id2, setProductId2] = useState();
  const [checked, setChecked] = useState(true);
  const [showtwo, setshowtwo] = useState("block");
  const [showone, setshowone] = useState("none");
  // const [show, setShow] = useState(false);
  const [overlay, setoverlay] = useState();

  //  new flavor dropdown function
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState();
  useEffect(() => {
    if (product?.name === "Magma 4 Pack" || product?.name === "Magma 12 Pack") {
      setSelectedColor("#b7322b");
    }
    if (
      product?.name === "Glacier 4 Pack" ||
      product?.name === "Glacier 12 Pack"
    ) {
      setSelectedColor("#006a8f");
    }
    if (product?.name === "Variety 4 Pack") {
      setSelectedColor("black");
    }
  });
  const colors = [
    { label: "MAGMA", color: "#b7322b" },
    { label: "GLACIER", color: "#006a8f" },
    { label: "VARIETY", color: "black" },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (color) => {
    setSelectedColor(color);

    setIsOpen(false);

    // console.log(color)

    if (color == "#b7322b") {
      history.push("/product/62de9371616a7a0cf79dc5ea");

      window.location.reload(false);
    }

    if (color == "#006a8f") {
      history.push("/product/62de9414616a7a0cf79dc630");

      window.location.reload(false);
    }

    if (color == "black") {
      history.push("/product/62e41bcc66708638230a1266");

      window.location.reload(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  const closeDropdown = (event) => {
    if (!event.target.closest(".dropdown_description")) {
      setIsOpen(false);
    }
  };

  // flavor function end

  const handlecolour1 = () => {
    setcane1("orange");
    setcane2("white");
    setcane3("white");
  };
  useEffect(() => {
    if (
      productDetails?.product?.name === "Magma 4 Pack" ||
      productDetails?.product?.name === "Glacier 4 Pack" ||
      productDetails?.product?.name === "Variety 4 Pack"
    ) {
      setshowtwo("block");
      setshowone("none");
    }
  });
  useEffect(() => {
    handlecolour3();
  });

  const handlecolour2 = () => {
    if (productDetails?.product?.name === "Magma 4 Pack") {
      setProductId("/product/62de9371616a7a0cf79dc5ea");
      setProductId2("/product/62e28ad6d0134722ac168f71");
    } else if (productDetails?.product?.name === "Glacier 4 Pack") {
      setProductId("/product/62de9414616a7a0cf79dc630");
      setProductId2("/product/62e3d7ddd0134722ac169397");
    }
  };

  useEffect(() => {
    handlecolour2();
  });

  const handlecolour3 = () => {
    // 	setcane3("orange");
    // setcane2("white");
    // setcane1("white")
    if (productDetails?.product?.name === "Magma 12 Pack") {
      setProductId2("/product/62e28ad6d0134722ac168f71");
      setProductId("/product/62de9371616a7a0cf79dc5ea");
    } else if (productDetails?.product?.name === "Glacier 12 Pack") {
      setProductId2("/product/62e3d7ddd0134722ac169397");
      setProductId("/product/62de9414616a7a0cf79dc630");
    }
  };

  const handleColor4 = () => {
    setcane2("orange");
    setcane1("white");
    setcane3("white");
  };

  const handleColor5 = () => {
    setcane3("orange");
    setcane2("white");
    setcane1("white");
  };

  const displaydesc = () => {
    setdesc("block");
    if (desc === "block") {
      setdesc("none");
    }
  };

  const displaynutri = () => {
    setnutri("block");
    if (nutri === "block") {
      setnutri("none");
    }
  };
  const displaymore = () => {
    setmore("block");
    if (more === "block") {
      setmore("none");
    }
  };

  const displayingre = () => {
    setingre("block");
    if (ingre === "block") {
      setingre("none");
    }
  };

  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((pre) => !pre);
  };

  const ratingChanged = (newRating) => {
    // console.log(newRating);
  };
  document.getElementById("star-icon");

  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress } = cart;
  const [totalItems, setTotalItems] = useState(0);
  const productID = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1; // fetch from the query string
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [allReviews, setAllReviews] = useState([]);
  const [hasOrderedItem, setHasOrderedItem] = useState(false); // bool to check if the user has ordered this product
  const [showReviewForm, setShowReviewForm] = useState(false); // bool to decide whether to show the review form or not
  const [frequency, setFrequency] = useState();
  const [idq, setid] = useState(null);
  const dispatch = useDispatch();

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
  const [select, setSelect] = useState([]);
  // console.log(cart)
  const [NoFreq, setNoFreq] = useState();
  const userDetails = useSelector((state) => state.userDetails);
  const { error: userLoginError } = userDetails;

  const productCreateReview = useSelector((state) => state.productCreateReview);
  const {
    loading: loadingCreateReview,
    success: successCreateReview,
    error: errorCreateReview,
  } = productCreateReview;

  const orderListUser = useSelector((state) => state.orderListUser);
  const { orders } = orderListUser;

  // remove item from cart
  const handleRemoveFromCart = (id) => {
    dispatch(removeItem(id));
  };

  // update access token to a new ine using the refresh tokens
  useEffect(() => {
    if (error && userInfo && !userInfo.isSocialLogin) {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user && dispatch(refreshLogin(user.email));
    }
  }, [error, dispatch, userInfo]);

  // useEffect(() => {
  // 	if (!(cartItems.length && userInfo)) {
  // 		history.push('/');
  // 	}
  // }, [cartItems, history, userInfo]);

  useEffect(() => {
    if (cartItems) {
      setTotalItems(cartItems.reduce((acc, item) => acc + item.qty, 0));
    }
  }, [cartItems]);

  // fetch user login info
  useEffect(() => {
    userInfo
      ? userInfo.isSocialLogin
        ? dispatch(getUserDetails(userInfo.id))
        : dispatch(getUserDetails("profile"))
      : dispatch(getUserDetails("profile"));
  }, [userInfo, dispatch]);

  // refresh the access tokens for accessing user details
  useEffect(() => {
    if (userLoginError && userInfo && !userInfo.isSocialLogin) {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user && dispatch(refreshLogin(user.email));
    }
  }, [userLoginError, dispatch, userInfo]);

  useEffect(() => {
    dispatch(listMyOrders());
  }, [dispatch]);

  // add a new review, and reset the stored product review in the redux store
  useEffect(() => {
    if (successCreateReview) {
      window.alert("Review Submitted!!");
      setRating(0);
      setReview("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [match, dispatch, successCreateReview]);

  useEffect(() => {
    if (product && product.reviews && userInfo) {
      let flag = 0; // to check if this user has already reviewed this product
      for (let review of product.reviews) {
        if (review.user === userInfo.id) {
          flag = 1;
          break;
        }
      }
      flag ? setShowReviewForm(false) : setShowReviewForm(true);
    } else {
      setShowReviewForm(true);
    }
  }, [product, userInfo]);

  useEffect(() => {
    if (orders && orders.length) {
      let flag = 0; // to check is this user has ordered this item
      for (let obj of orders) {
        for (let ele of obj.orderItems) {
          if (ele.product.toString() === match.params.id) {
            flag = 1;
            break;
          }
        }
      }
      flag ? setHasOrderedItem(true) : setHasOrderedItem(false);
    } else {
      setHasOrderedItem(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders]);

  // arrange all reviews in reverse chronological order
  useEffect(() => {
    if (product && product.reviews) {
      const sortedArr = product.reviews.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setAllReviews(sortedArr);
    }
  }, [product]);

  const handleAddToCart = (e) => {
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
                        product: match.params.id,
                        name: productDetails?.product?.name,
                        image: product?.image,
                        price: product?.price,
                        countInStock: product?.countInStock,
                        qty: quantity,
                        numberOfCans: product?.number_of_cans,
                        subscription: product?.subscription,
                        frequency: frequency,
                        stripeProductId: product?.stripeProductId,
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
                        value: product?.price * quantity,
                        items: [
                          {
                            item_name: product?.name,
                            item_brand: "TECTON",
                            item_category: "Drink",
                            price: product?.price,
                            quantity: quantity,
                          },
                        ],
                      },
                    });
                    dispatch(incNumber());
                    setShow(false);
                    history.push(
                      `/cart/${match.params.id}?qty=${
                        quantity + olderCartQuantity
                      }`
                    );
                  }
                });
            }
          });
      } else {
        history.push(
          `/login?redirect=/cart/${match.params.id}?qty=${
            quantity + olderCartQuantity
          }`
        );
        localStorage.setItem(
          "subscriptionItems",
          JSON.stringify([
            {
              product: match.params.id,
              name: productDetails?.product?.name,
              image: product?.image,
              price: product?.price,
              countInStock: product?.countInStock,
              qty: quantity,
              numberOfCans: product?.number_of_cans,
              subscription: product?.subscription,
              frequency: frequency,
              stripeProductId: product?.stripeProductId,
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

  const handleToCart = (e) => {
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
              product: match.params.id,
              name: productDetails?.product?.name,
              image: product?.image,
              price: product?.price,
              countInStock: product?.countInStock,
              qty: quantity,
              numberOfCans: product?.number_of_cans,
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
              value: product?.price * quantity,
              items: [
                {
                  item_name: product?.name,
                  item_brand: "TECTON",
                  item_category: "Drink",
                  price: product?.price,
                  quantity: quantity,
                },
              ],
            },
          });

          dispatch(incNumber());
          setShow(false);
          history.push(
            `/cart/${match.params.id}?qty=${quantity + olderCartQuantity}`
          );
        }
      })
      .catch((err) => {
        if (err) {
          setShow(false);
          history.push(
            `/cart/${match.params.id}?qty=${quantity + olderCartQuantity}`
          );
        }
      });

    // setTimeout(() => {
    // 	window.location.reload(false)
    // }, 500);
  };

  useEffect(() => {
    if (frequency === "2 weeks") {
      setid(product?.stripePriceId[0]?.id);
    } else if (frequency === "4 weeks") {
      setid(product?.stripePriceId[1]?.id);
    } else if (frequency === "6 weeks") {
      setid(product?.stripePriceId[2]?.id);
    }
  });
  const handleReviewSubmit = (e) => {
    dispatch(
      createProductReview(match.params.id, {
        rating,
        review,
      })
    );
  };

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

  const getBackgroundColor = (statuss) => {
    if (productDetails?.product?.name === "Magma 4 Pack") {
      return "orange";
    }
    if (productDetails?.product?.name === "Glacier 4 Pack") {
      return "orange";
    }
  };

  const getBackgroundColor2 = (statuss) => {
    if (productDetails?.product?.name === "Magma 12 Pack") {
      return "orange";
    }
    if (productDetails?.product?.name === "Glacier 12 Pack") {
      return "orange";
    }
  };

  useDocumentTitle(`${product?.name}`);

  const billfunction = (e) => {
    setChecked(e.target.checked);
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
      product?.name === "Magma 4 Pack" ||
      product?.name === "Glacier 4 Pack" ||
      product?.name === "Variety 4 Pack"
    ) {
      return { display: "block" };
    }

    return { display: "none" };
  };
  // console.log((JSON.parse(localStorage.getItem("cartItems"))?.filter((val)=>{  return val.product===match.params.id}))?.length>0?((JSON.parse(localStorage.getItem("cartItems"))?.filter((val)=>{  return val.product===match.params.id}))[0].qty):(1))
  let olderCartQuantity =
    JSON?.parse(localStorage?.getItem("cartItems"))?.filter((val) => {
      return val?.product === match?.params?.id;
    })?.length > 0
      ? (JSON?.parse(localStorage?.getItem("cartItems"))?.filter((val) => {
          return val.product === match.params.id;
        }))[0]?.qty
      : 0;

  // Start of Rating Review codes
  const [reviewstar, setReviewStar] = useState(0);
  const [reviewdescription, setReviewDescription] = useState("");
  const [reviewtitle, setReviewTitle] = useState("");

  const resetForm = () => {
    setReviewDescription("");
    setReviewStar(0);
  };
  console.log("reviewstar", reviewstar);

  const [showForm, setShowForm] = useState(true);
  const [showMsg, setShowMsg] = useState(false);

  const [submitClicked, setSubmitClicked] = useState(false);

  // onChange Method For Taking Input Data

  const handleRatingChange = (newRating) => {
    setReviewStar(newRating);
    console.log(newRating);
  };

  const handleDescriptionChange = (event) => {
    setReviewDescription(event.target.value);
  };

  const handleRatingSubmit = (e) => {
    e.preventDefault();
    if (reviewstar === 0) {
      console.log("Please provide a rating before submitting.");
      setSubmitClicked(true);
      return;
    }
    axios
      .post(
        `${process.env.REACT_APP_PROXY_URL}/api/review/create-review`,
        {
          productId: match.params.id,
          rating: reviewstar,
          reviewDescription: reviewdescription,
          reviewTitle: " ",
        },
        config
      )
      .then((res) => {
        console.log(res);
        setShowForm(false);
        setShowMsg(true);
        axios
          .get(
            `${process.env.REACT_APP_PROXY_URL}/api/review/get-user-product-review/${match.params.id}`,
            config
          )
          .then((resp) => {
            console.log("isreview", resp.data);
            if (resp.data) {
              setReviewByUser(resp.data);
            }
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [viewUserRating, setViewUserRating] = useState([]);
  const [ratingStarData, setRatingStarData] = useState(null);

  const [ratingbyproduct, setRatingByProduct] = useState(null);

  const [ratingbyproductcount, setRatingByProductCount] = useState(null);

  const [numberOfReview, SetNumberOfReview] = useState(10);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_PROXY_URL}/api/review/get-all-product-review/${match.params.id}`,
        config
      )
      .then((val) => {
        console.log(val.data);
        console.log("Review Lists : ", val.data);

        setViewUserRating(val?.data?.reviews.slice(0, numberOfReview));

        setRatingByProduct(val?.data);

        setRatingByProductCount(val?.data);
      });
  }, []);

  //get-user-product-review

  const [reviewByUser, setReviewByUser] = useState(null);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_PROXY_URL}/api/review/get-user-product-review/${match.params.id}`,
        config
      )
      .then((resp) => {
        console.log("isreview", resp.data);
        if (resp.data) {
          setReviewByUser(resp.data);
        }
      });
  }, []);

  const showTwoMoreReviews = () => {
    console.log(numberOfReview);
    setTimeout(() => {
      axios
        .get(
          `${process.env.REACT_APP_PROXY_URL}/api/review/get-all-product-review/${match.params.id}`,
          config
        )
        .then((val) => {
          console.log(val.data);
          console.log("Review Lists : ", val.data);

          setViewUserRating(val?.data?.reviews.slice(0, numberOfReview + 10));

          setRatingByProduct(val?.data);

          setRatingByProductCount(val?.data);

          SetNumberOfReview(numberOfReview + 10);
        });
    }, 200);
  };

  function showTheViweButton() {
    if (numberOfReview < ratingbyproductcount?.count) {
      return (
        <button
          onClick={showTwoMoreReviews}
          style={{ background: "none", border: "none", color: "orange" }}
        >
          View more
        </button>
      );
    }
    if (numberOfReview == ratingbyproductcount?.count) {
      return <></>;
    }
    if (numberOfReview > ratingbyproductcount?.count) {
      return <></>;
    }
  }

  //End of Raring Review

  return (
    <div class="all-product">
      <ScrollToTop />
      {show ? overlay : <></>}

      <section className="product_detail_description">
        <div className="container">
          <div className="product_details_layout">
            <div class="row">
              <div class="col-sm-5">
                <div
                  id="remove-caro1"
                  className="productdesc-desktopd-carousel"
                >
                  <div className="prodcarousel">
                    <div
                      id="carouselExampleIndicatorsLeft"
                      class="carousel slide carousel-fade carousel-thumbs-top"
                      data-bs-ride="carousel"
                      data-bs-interval="0"
                      data-bs-pause="false"
                    >
                      <div
                        style={{
                          justifyContent: "space-around",
                          marginLeft: "10px",
                        }}
                        id="sliding"
                        class="slider carousel-indicators position-absolute"
                      >
                        <div
                          data-bs-target="#carouselExampleIndicatorsLeft"
                          data-bs-slide-to="0"
                          class="active text-center tabs2"
                          aria-current="true"
                          aria-label="Slide 1"
                          style={{
                            width: "19%",
                            marginBottom: "30px",
                            textAlign: "center",
                            marginLeft: "-83px",
                          }}
                        >
                          <p>
                            <img
                              style={{ height: "100%" }}
                              src={product?.image1}
                            ></img>
                          </p>
                        </div>

                        <div
                          data-bs-target="#carouselExampleIndicatorsLeft"
                          class="tabs2"
                          data-bs-slide-to="1"
                          aria-label="Slide 2"
                          style={{
                            width: "19%",
                            marginBottom: "30px",
                            textAlign: "center",
                          }}
                        >
                          <p>
                            <img
                              style={{ height: "100%" }}
                              src={product?.image2}
                            ></img>
                          </p>
                        </div>

                        <div
                          data-bs-target="#carouselExampleIndicatorsLeft"
                          class="tabs2"
                          data-bs-slide-to="2"
                          aria-label="Slide 3"
                          style={{
                            width: "19%",
                            marginBottom: "30px",
                            textAlign: "center",
                          }}
                        >
                          <p>
                            <img
                              style={{ height: "100%" }}
                              src={product?.image3}
                            ></img>
                          </p>
                        </div>

                        <div
                          data-bs-target="#carouselExampleIndicatorsLeft"
                          class="tabs2"
                          data-bs-slide-to="3"
                          aria-label="Slide 4"
                          style={{
                            width: "19%",
                            marginBottom: "30px",
                            textAlign: "center",
                            marginRight: "-73px",
                          }}
                        >
                          <p>
                            <img
                              style={{ height: "100%" }}
                              src={product?.image4}
                            ></img>
                          </p>
                        </div>
                      </div>
                      <div class="carousel-inner">
                        <div class="carousel-item active" data-interval="1000">
                          <img
                            src={product?.image1}
                            style={{ width: "100%" }}
                            class="d-block w-100"
                            alt="..."
                          />
                          <div class="caption-1"></div>
                        </div>
                        <div class="carousel-item">
                          <img
                            src={product?.image2}
                            style={{ width: "100%" }}
                            class="d-block w-100"
                            alt="..."
                          />

                          <div class="caption-2"></div>
                        </div>
                        <div class="carousel-item">
                          <img
                            src={product?.image3}
                            style={{ width: "100%" }}
                            class="d-block w-100"
                            alt="..."
                          />
                        </div>
                        <div class="carousel-item">
                          <img
                            src={product?.image4}
                            style={{ width: "100%" }}
                            class="d-block w-100"
                            alt="..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="remove-caro2" className="productdesc-mobile-carousel">
                  <Carousel
                    autoPlay={false}
                    showArrows={true}
                    infiniteLoop={true}
                    showIndicators={true}
                    showStatus={false}
                    stopOnHover={false}
                  >
                    <div>
                      <img
                        style={{
                          width: "100%",
                          marginLeft: "",
                          marginTop: "10px",
                        }}
                        src={product?.image1}
                        alt=""
                      />
                    </div>
                    <div>
                      <img
                        style={{
                          width: "100%",
                          marginLeft: "",
                          marginTop: "10px",
                        }}
                        src={product?.image2}
                        alt=""
                      />
                    </div>
                    <div>
                      <img
                        style={{
                          width: "100%",
                          marginLeft: "",
                          marginTop: "10px",
                        }}
                        src={product?.image3}
                        alt=""
                      />
                    </div>
                    <div>
                      <img
                        style={{
                          width: "100%",
                          marginLeft: "",
                          marginTop: "10px",
                        }}
                        src={product?.image4}
                        alt=""
                      />
                    </div>
                  </Carousel>
                </div>
              </div>

              <div class="col-sm-7">
                <div class="pro-part1_desc">
                  <div className="product-details_page_product_category">
                    {product?.category}
                  </div>
                  <div class="product-details_page_product_name">
                    {product?.name}
                  </div>
                  <div class="product-details_page_product_ratings">
                    <span>
                      <StarRatings
                        rating={product?.rating}
                        starRatedColor="orange"
                        // changeRating={ratingChanged}

                        numberOfStars={5}
                        starDimension="20px"
                        starSpacing="3px"
                      />
                    </span>
                    <div className="numericratings">
                      <span>
                        {product?.rating?.toFixed(1) == 1
                          ? product?.rating?.toFixed(1) + " " + ""
                          : product?.rating?.toFixed(1) + " " + ""}
                      </span>
                    </div>
                  </div>
                  <div class="product-details_page_product_short_desc">
                    Tecton® inspires seismic shifts in your life. Enjoy once or
                    twice daily to experience mental clarity, endurance, muscle
                    recovery and hydration. Without the boom-bust of carbs or
                    the jittery dehydration of caffeine.
                  </div>
                  <div class="product-details_page_product_flavor">
                    <div class="product-details_page_product_flavor_type">
                      <div className="flavor_product_description">
                        <h5>FLAVOR</h5>
                      </div>
                      <div className="flavor_option">
                        <div className="dropdown_description">
                          <div
                            className="dropdown-button"
                            style={{ backgroundColor: selectedColor }}
                            onClick={toggleDropdown}
                          >
                            {selectedColor
                              ? colors.find((c) => c.color === selectedColor)
                                  ?.label
                              : "Select an Item"}{" "}
                            <FontAwesomeIcon
                              style={{ paddingLeft: "20px" }}
                              icon={faAngleDown}
                            />
                          </div>
                          {isOpen && (
                            <div className="dropdown-list">
                              {colors.map((color) => (
                                <div
                                  key={color.color}
                                  className="dropdown-list-item"
                                  style={{ backgroundColor: color.color }}
                                  onClick={() => handleItemClick(color.color)}
                                >
                                  {color.label}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div class="product-details_page_product_flavor_quantity">
                      {productDetails?.product?.name !== "Variety 4 Pack" ? (
                        <div className="flavor_product_description">
                          <h5>PACK</h5>
                        </div>
                      ) : (
                        ""
                      )}
                      <div class="inline-buttons">
                        {productDetails?.product?.name !== "Variety 4 Pack" ? (
                          <p style={{ marginTop: "12px" }}>
                            <a onClick={handleColor4} href={product_id}>
                              {" "}
                              <span
                                onClick={handlecolour2}
                                class="one-third button"
                                style={{
                                  backgroundColor: getBackgroundColor(),
                                }}
                              >
                                {" "}
                                4{" "}
                              </span>
                            </a>
                            <a onClick={handleColor5} href={product_id2}>
                              <span
                                class="one-third button"
                                style={{
                                  backgroundColor: getBackgroundColor2(),
                                }}
                                onClick={handlecolour3}
                              >
                                {" "}
                                12{" "}
                              </span>
                            </a>
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                  <div class="product-details_page_product_price">
                    ${product?.price}
                  </div>
                  <div>
                    <div
                      id="truemed-prequalify"
                      style={{ fontSize: "16px", fontWeight: "bold" }}
                      data-public-id="tm_qual_lwihwute1u"
                    >
                      {" "}
                    </div>
                    {/* <script src="https://truemed-public.s3.us-west-1.amazonaws.com/truemed-ads/prequal-widget.min.js" defer></script> */}
                  </div>
                  <div class="product-details_page_product_onetime_&_subscription_content"></div>

                  <div className="product-new-font">
                    {product?.subscription ? (
                      <div class="one-subs" style={{ display: "flex" }}>
                        <input
                          name="group1"
                          onClick={(e) =>
                            setSelect([...select, e.target.value])
                          }
                          type="radio"
                          class="form-check-input"
                          id="exampleCheck1"
                          onChange={billfunction}
                          defaultChecked
                        />
                        <label class="form-check-label1" for="exampleCheck1">
                          &nbsp; &nbsp;One-Time Purchase
                        </label>
                      </div>
                    ) : (
                      <div class="one-subs" style={{ display: "none" }}>
                        <input
                          name="group1"
                          onClick={(e) =>
                            setSelect([...select, e.target.value])
                          }
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
                    {product?.subscription ? (
                      <div class="one-subs" style={{ display: "flex" }}>
                        <input
                          name="group1"
                          onClick={(e) =>
                            setSelect([...select, e.target.value])
                          }
                          type="radio"
                          class="form-check-input"
                          id="exampleCheck2"
                          onChange={billfunction}
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
                          onClick={(e) =>
                            setSelect([...select, e.target.value])
                          }
                          type="radio"
                          class="form-check-input"
                          id="exampleCheck2"
                          onChange={billfunction}
                        ></input>
                        <label class="form-check-label" for="exampleCheck2">
                          Subscribe & Save up to 12%
                        </label>

                        <br />
                      </div>
                    )}

                    <div class="product-subs" style={{ display: `${showone}` }}>
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
                            onClick={() => setid(product?.stripePriceId[0]?.id)}
                          >
                            2 weeks
                          </option>
                          <option
                            value="4 weeks"
                            onClick={() => setid(product?.stripePriceId[1]?.id)}
                          >
                            4 weeks
                          </option>
                          <option
                            value="6 weeks"
                            onClick={() => setid(product?.stripePriceId[2]?.id)}
                          >
                            6 weeks
                          </option>
                        </select>
                      </div>

                      <br />
                      <br />

                      <div style={{ color: "#757575" }} onClick={displaymore}>
                        <div class="conten">
                          <img height="18px" src={Vector} /> Discounts will
                          start applying second shipment onwards.
                          <br />
                          <img height="18px" src={Vector} /> Save 5% on 1 case
                          subscription
                          <br />
                          <img height="18px" src={Vector} /> Save 8% on 2 cases
                          subscription
                          <br />
                          <img height="18px" src={Vector} /> Save 10% on 3 cases
                          subscription
                          <br />
                          <img height="18px" src={Vector} /> Save 12% on 4 cases
                          or more subscription
                          <br />
                          <img height="18px" src={Vector} /> Free shipping on
                          two or more cases.
                          <br />
                          <img height="18px" src={Vector} /> Access to
                          (extra)Ordinary Club Membership.
                          <br />
                          <img height="18px" src={Vector} /> Receive info about
                          new products, cutting-edge science, and more.
                          <br />
                          <img height="18px" src={Vector} /> Modify, skip, or
                          cancel subscription anytime!
                        </div>
                      </div>
                      <br />
                      <div className="flex-div_flavor">
                        <div className="shoplanding__container__right_subscription_quantity_desc">
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

                        <div className="shoplanding__container__right_subscription_buynow_desk">
                          <button
                            className="new_shop_buttton_buy_add_desc"
                            onClick={handleAddToCart}
                            style={{ color: "black" }}
                          >
                            ADD TO CART
                          </button>
                        </div>
                      </div>
                      <div style={{ color: "red", paddingLeft: "30px" }}>
                        {NoFreq}
                      </div>
                    </div>
                  </div>

                  <div style={showFourPack()}>
                    <div style={{ display: "flex", fontSize: "15px" }}>
                      <input
                        name="group9"
                        type="radio"
                        class="form-check-input"
                        id="exampleCheck9"
                        defaultChecked
                      />
                      &nbsp;
                      <label class="form-check-label1" for="exampleCheck1">
                        One-Time Purchase
                      </label>
                    </div>
                    <br />
                    <span className="packs4-description">
                      4-Packs are currently not available for subscriptions.
                      <br />
                      To subscribe, please view our 12-Pack.
                    </span>
                  </div>
                  <br />

                  <div style={{ display: `${showtwo}` }}>
                    <div className="flex-div_flavor">
                      <div className="shoplanding__container__right_subscription_quantity_desc">
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

                      <div className="shoplanding__container__right_subscription_buynow_desk">
                        <button
                          className="new_shop_buttton_buy_add_desc"
                          onClick={handleToCart}
                          style={{ color: "black" }}
                        >
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                    <div style={{ color: "red", paddingLeft: "30px" }}>
                      {NoFreq}
                    </div>
                  </div>
                  <div className="shoplanding__container__left_heading_img_desktop productdescicone">
                    <div>
                      <div className="shoplanding__container__left_heading_img_icon_desk">
                        <img height="130px" width="120px" src={Thunder} />
                      </div>
                      <div className="icon_text_desk">
                        10G OF <br /> KETONES
                      </div>
                    </div>
                    <div>
                      <div className="shoplanding__container__left_heading_img_icon_desk">
                        <img height="130px" width="120px" src={Shield} />
                      </div>
                      <div className="icon_text_desk">
                        SAFE AT <br /> HIGH DOSAGE
                      </div>
                    </div>
                    <div>
                      <div className="shoplanding__container__left_heading_img_icon_desk">
                        <img height="130px" width="120px" src={Sugar} />
                      </div>
                      <div className="icon_text_desk">
                        ZERO <br /> SUGAR
                      </div>
                    </div>
                    <div>
                      <div className="shoplanding__container__left_heading_img_icon_desk">
                        <img height="130px" width="120px" src={Cup} />
                      </div>
                      <div className="icon_text_desk">
                        ZERO <br /> CAFFEINE
                      </div>
                    </div>
                  </div>
                  <div className="shoplanding__container__left_heading_img_mobile ">
                    <div className="shoplanding__container__left_heading_img_desc">
                      <div>
                        <div className="shoplanding__container__left_heading_img_icon_desk">
                          <img src={Thunder} />
                        </div>
                        <div className="icon_text">
                          10G OF <br /> KETONES
                        </div>
                      </div>
                      <div>
                        <div className="shoplanding__container__left_heading_img_icon_desk">
                          <img src={Shield} />
                        </div>
                        <div className="icon_text">
                          SAFE AT <br /> HIGH DOSAGE
                        </div>
                      </div>
                    </div>
                    <div className="shoplanding__container__left_heading_img_desc">
                      <div>
                        <div className="shoplanding__container__left_heading_img_icon_desk">
                          <img src={Sugar} />
                        </div>
                        <div className="icon_text">
                          ZERO <br /> SUGAR
                        </div>
                      </div>
                      <div>
                        <div className="shoplanding__container__left_heading_img_icon_desk">
                          <img src={Cup} />
                        </div>
                        <div className="icon_text">
                          ZERO <br /> CAFFEINE
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="product_description_desktop">
        <section className="ketones_learnmore_Productpage">
          <div className="ketones_learnmore_background_Productpage">
            <div className="ketones_learnmore_background_content">
              <div>
                <div className="ketones_learnmore_background_heading">
                  KETONES
                </div>
                <div className="ketones_learnmore_background_subheading1">
                  THE 4TH MACRONUTRIENT
                </div>
                <div className="ketones_learnmore_background_subheading">
                  Our ancestors used to access ketones frequently because they
                  didn’t <br /> eat as much or as often as we do today, and they
                  certainly didn’t eat <br /> processed carbs. Today, however,
                  most humans are ketone-deprived,
                  <br /> meaning they are unable to achieve their extraordinary
                  potential.
                  <br /> Thanks to exogenous ketones, that can all change (for
                  the better).
                </div>
                <div className="ketones_button_learnmore_Productpage">
                  <a href="https://blog.tectonlife.com/benefits-of-exogenous-ketones/">
                    {" "}
                    <button className="ketones_learnmore_background_button_Productpage">
                      LEARN MORE
                    </button>
                  </a>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </section>
        <section className="Tecton_Lifestyle_newsection">
          <div className="Tecton_Lifestyle_background_newsection">
            <div className="Tecton_Lifestyle_content">
              <div className="Tecton_Lifestyle_heading">A TECTON LIFESTYLE</div>

              <div className="productpage_line">
                <img src={yellowLine} />
              </div>

              <div className="Tecton_Lifestyle_subheading">
                The most ordinary of people achieve extraordinary feats by
                changing how they do <br />
                things. All of us can. Learn how to get the most out of a Tecton
                lifestyle.
              </div>

              <div className="brainhealth_section">
                <div className="brainhealth_info">
                  <div className="brainhealth_desc">
                    <div className="brainhealth_icon">
                      <img src={Focus} />
                    </div>

                    <div className="brainhealth_title">
                      <h3>Mental Focus</h3>

                      <img
                        style={{ width: "700px", height: "10px" }}
                        src={Dashedline}
                      />

                      <p>
                        Power your brain to stay focused <br />
                        and clear.
                      </p>
                    </div>
                  </div>

                  <br />

                  <div className="brainhealth_desc">
                    <div className="brainhealth_icon">
                      <img src={Craving} />
                    </div>

                    <div className="brainhealth_title">
                      <h3>Craving Control</h3>

                      <img
                        style={{ width: "700px", height: "10px" }}
                        src={Dashedline}
                      />

                      <p>
                        Keep your cravings at bay during
                        <br /> periods of fasts
                      </p>
                    </div>
                  </div>

                  <br />

                  <div className="brainhealth_desc">
                    <div className="brainhealth_icon">
                      <img src={Recovery} />
                    </div>

                    <div className="brainhealth_title">
                      <h3>Muscle Recovery</h3>

                      <img
                        style={{ width: "700px", height: "10px" }}
                        src={Dashedline}
                      />

                      <p>
                        Give your body the extra energy it
                        <br /> needs to repair itself
                      </p>
                    </div>
                  </div>

                  <br />

                  <div className="brainhealth_desc">
                    <div className="brainhealth_icon">
                      <img src={Boost} />
                    </div>

                    <div className="brainhealth_title">
                      <h3>Endurance Boost</h3>

                      <img
                        style={{ width: "700px", height: "10px" }}
                        src={Dashedline}
                      />

                      <p>
                        Fuel to push through to you
                        <br /> extraordinary potential
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="product_description_ipad">
        <div className="shoplanding__container__left_heading_ipad">
          <div className="shoplanding__container__left_heading_img_ipad">
            <div>
              <div className="shoplanding__container__left_heading_img_icon_desk">
                <img height="150px" width="150px" src={Thunder} />
              </div>
              <div className="icon_text_desk">
                10G OF <br /> KETONES
              </div>
            </div>
            <div>
              <div className="shoplanding__container__left_heading_img_icon_desk">
                <img height="150px" width="150px" src={Shield} />
              </div>
              <div className="icon_text_desk">
                SAFE AT <br /> HIGH DOSAGE
              </div>
            </div>
            <div>
              <div className="shoplanding__container__left_heading_img_icon_desk">
                <img height="150px" width="150px" src={Sugar} />
              </div>
              <div className="icon_text_desk">
                ZERO <br /> SUGAR
              </div>
            </div>
            <div>
              <div className="shoplanding__container__left_heading_img_icon_desk">
                <img height="150px" width="150px" src={Cup} />
              </div>
              <div className="icon_text_desk">
                ZERO <br /> CAFFEINE
              </div>
            </div>
          </div>
        </div>
        <div class="all-product-mobile">
          <section className="ketones_learnmore">
            <div className="ketones_learnmore_background_mobile"></div>
            <div className="ketones_learnmore_background_c">
              <div className="ketones_learnmore_background_subheading1">
                THE 4TH MACRO
              </div>
            </div>
            <img src={yelloLine} />
            <div className="ketones_learnmore_background_c">
              <div className="ketones_learnmore_background_subheading">
                Our ancestors used to access ketones frequently because they
                didn’t eat as much or as often as we do today, and they
                certainly didn’t eat processed carbs. Today, however, most
                humans are ketone-deprived, meaning they are unable to achieve
                their extraordinary potential. Thanks to exogenous ketones, that
                can all change (for the better).
              </div>
              <div className="ketones_button_learnmore">
                <a href="https://blog.tectonlife.com/benefits-of-exogenous-ketones/">
                  {" "}
                  <button className="ketones_learnmore_background_button">
                    LEARN MORE
                  </button>
                </a>
              </div>
            </div>
          </section>

          <section className="Tecton_Lifestyle_newsection">
            <div className="Tecton_Lifestyle_background_newsection">
              <div className="Tecton_Lifestyle_content">
                <div className="Tecton_Lifestyle_heading">
                  A TECTON LIFESTYLE
                </div>

                <div className="shoplanding__container__left_heading_line_mobile">
                  <img src={yellowLine} />
                </div>

                <div className="Tecton_Lifestyle_subheading">
                  The most ordinary of people achieve extraordinary feats by
                  changing how they do <br />
                  things. All of us can. Learn how to get the most out of a
                  Tecton lifestyle.
                </div>

                <div className="brainhealth_section_mobile">
                  <div className="brainhealth_info_mobile">
                    <div className="brainhealth_desc_mobile">
                      <div className="brainhealth_icon_mobile">
                        <img src={Focus} />
                      </div>

                      <div className="brainhealth_title_mobile">
                        <h3>Mental Focus</h3>

                        <p>Power your brain to stay focused and clear.</p>
                      </div>
                    </div>

                    <br />

                    <div className="brainhealth_desc_mobile">
                      <div className="brainhealth_icon_mobile">
                        <img src={Craving} />
                      </div>

                      <div className="brainhealth_title_mobile">
                        <h3>Craving Control</h3>

                        <p>Keep your cravings at bay during periods of fasts</p>
                      </div>
                    </div>

                    <br />

                    <div className="brainhealth_desc_mobile">
                      <div className="brainhealth_icon_mobile">
                        <img src={Recovery} />
                      </div>

                      <div className="brainhealth_title_mobile">
                        <h3>Muscle Recovery</h3>

                        <p>
                          Give your body the extra energy it needs to repair
                          itself
                        </p>
                      </div>
                    </div>

                    <br />

                    <div className="brainhealth_desc_mobile">
                      <div className="brainhealth_icon_mobile">
                        <img src={Boost} />
                      </div>

                      <div className="brainhealth_title_mobile">
                        <h3>Endurance Boost</h3>

                        <p>
                          Fuel to push through to you extraordinary potential
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="product_description_mobile">
        <div class="all-product-mobile">
          <section className="ketones_learnmore_Productpage_mobile">
            <div className="ketones_learnmore_background_Productpage_mobile"></div>

            <div className="ketones_learnmore_background_Productpage_content">
              <div>
                <div className="ketones_learnmore_background_Productpage_subheading1">
                  THE 4TH MACRO
                </div>

                <img src={yellowLine} style={{ width: "250px" }} />

                <div className="ketones_learnmore_background_subheading_Productpage">
                  Our ancestors used to access ketones frequently because they
                  didn’t eat as much or as often as we do today, and they
                  certainly didn’t eat processed carbs. Today, however, most
                  humans are ketone-deprived, meaning they are unable to achieve
                  their extraordinary potential. Thanks to exogenous ketones,
                  that can all change (for the better).
                </div>

                <div className="ketones_button_learnmore_Productpage">
                  <a href="https://blog.tectonlife.com/benefits-of-exogenous-ketones/">
                    {" "}
                    <button className="ketones_learnmore_background_button_Productpage">
                      LEARN MORE
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="Tecton_Lifestyle_newsection">
            <div className="Tecton_Lifestyle_background_newsection">
              <div className="Tecton_Lifestyle_content">
                <div className="Tecton_Lifestyle_heading">
                  A TECTON LIFESTYLE
                </div>

                <div className="shoplanding__container__left_heading_line_mobile">
                  <img src={yellowLine} />
                </div>

                <div className="Tecton_Lifestyle_subheading">
                  The most ordinary of people achieve extraordinary feats by
                  changing how they do <br />
                  things. All of us can. Learn how to get the most out of a
                  Tecton lifestyle.
                </div>

                <div className="brainhealth_section_mobile">
                  <div className="brainhealth_info_mobile">
                    <div className="brainhealth_desc_mobile">
                      <div className="brainhealth_icon_mobile">
                        <img src={Focus} />
                      </div>

                      <div className="brainhealth_title_mobile">
                        <h3>Mental Focus</h3>

                        <p>Power your brain to stay focused and clear.</p>
                      </div>
                    </div>

                    <br />

                    <div className="brainhealth_desc_mobile">
                      <div className="brainhealth_icon_mobile">
                        <img src={Craving} />
                      </div>

                      <div className="brainhealth_title_mobile">
                        <h3>Craving Control</h3>

                        <p>Keep your cravings at bay during periods of fasts</p>
                      </div>
                    </div>

                    <br />

                    <div className="brainhealth_desc_mobile">
                      <div className="brainhealth_icon_mobile">
                        <img src={Recovery} />
                      </div>

                      <div className="brainhealth_title_mobile">
                        <h3>Muscle Recovery</h3>

                        <p>
                          Give your body the extra energy it needs to repair
                          itself
                        </p>
                      </div>
                    </div>

                    <br />

                    <div className="brainhealth_desc_mobile">
                      <div className="brainhealth_icon_mobile">
                        <img src={Boost} />
                      </div>

                      <div className="brainhealth_title_mobile">
                        <h3>Endurance Boost</h3>

                        <p>
                          Fuel to push through to you extraordinary potential
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      {/* Rating review */}

      <div className="container pt-5 mt-5 reviewcontainer">
        <div className="review-star-product mb-5">
          <StarRatings
            rating={ratingbyproduct?.averageRating}
            starRatedColor="orange"
            numberOfStars={5}
            starDimension="30px"
            starSpacing="3px"
          />
        </div>
        <h2 className="text-center staraveragefont">{`${ratingbyproduct?.averageRating?.toFixed(
          1
        )} STAR RATING`}</h2>
        {/* Review Conditions if the review count is 0 => No Reviews, 1 => 1 Review, >1 => Review(s)*/}
        <p className="lead">
          {ratingbyproductcount?.count === 1
            ? `${ratingbyproductcount?.count} REVIEW`
            : ratingbyproductcount?.count > 1
            ? `${ratingbyproductcount?.count} REVIEWS`
            : "NO REVIEWS"}
        </p>

        <div className="review-container">
          <h3 className="text-center">RATE THIS PRODUCT</h3>
          {userInfo ? (
            showMsg ? (
              <p className="lead text-center mt-5 pt-2">
                Thank you for reviewing this product
              </p>
            ) : reviewByUser ? (
              <p className="lead text-center mt-5 pt-2">
                You have already reviewed this product
              </p>
            ) : (
              <div>
                <form onSubmit={handleRatingSubmit}>
                  <div className="text-center mb-3 d-flex justify-content-center">
                    <ReactStars
                      className=""
                      name="rating"
                      count={5}
                      value={reviewstar}
                      onChange={handleRatingChange}
                      activeColor="#ffd700"
                      color="white"
                      size={35}
                      // key={reviewstar}
                      required
                    />
                  </div>
                  {submitClicked && reviewstar === 0 && (
                    <p
                      style={{
                        textAlign: "center",
                        color: "red",
                        fontWeight: "bold",
                      }}
                    >
                      Please provide a rating.
                    </p>
                  )}

                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="form-label"
                    >
                      Leave Comment
                    </label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="10"
                      placeholder="Text..."
                      value={reviewdescription}
                      onChange={handleDescriptionChange}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3 float-end">
                    <button
                      className="btn btn-review-cancle"
                      type="button"
                      onClick={() => {
                        setReviewStar(0);
                        resetForm();
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-reviw-submit"
                      onClick={() => {
                        handleRatingSubmit();
                        setSubmitClicked(true);
                      }}
                    >
                      ADD REVIEW
                    </button>
                  </div>
                </form>
              </div>
            )
          ) : (
            <p className="lead text-center mt-5 pt-2">
              To review this product, you need to{" "}
              <Link
                style={{
                  textDecoration: "underline",
                  color: "orange",
                }}
                to="/Login"
                onClick={handleLoginClick} //review rating history
              >
                login
              </Link>
              .
            </p>
          )}
        </div>

        {/* show review data */}
        {/* user review pending or rejected  */}
        <div
          className="reviewtext my-5"
          style={{
            backgroundColor:
              reviewByUser?.review?.status === "pending"
                ? "#ffffe0"
                : "inherit",
          }}
        >
          {reviewByUser?.review?.status === "pending" && (
            <div className="reviewtext-user">
              <div className="col-sm-6">
                <h3 className="text-uppercase">
                  {userInfo?.firstName} {userInfo?.lastName}
                </h3>
                <br />
                <h6>
                  {userInfo?.shippingAddress?.city
                    ? userInfo?.shippingAddress?.city
                    : ""}
                </h6>
                <div className="review-star">
                  <StarRatings
                    rating={reviewByUser?.review?.rating}
                    starRatedColor="orange"
                    numberOfStars={5}
                    starDimension="25px"
                    starSpacing="3px"
                    half={true}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <h5 className="hrscss">
                  {calculateDuration(reviewByUser?.review?.createdAt)}
                  {
                    <span
                      style={{
                        fontSize: "1rem",
                        backgroundColor: "yellow",
                        marginLeft: "10px",
                        height: "20px",
                        marginTop: "5px",
                      }}
                    >
                      ({reviewByUser?.review?.status})
                    </span>
                  }
                </h5>
                <div style={{ display: "flex" }}>
                  <p className="user-review-message">
                    {reviewByUser?.review?.reviewDescription}
                    {}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="reviewtext my-5">
          {viewUserRating &&
            viewUserRating.map((values, index) => {
              return (
                <div className=" reviewtext-user">
                  <div
                    className="col-sm-6"
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    <div>
                      <h3 className="text-uppercase">
                        {values?.firstName} {values?.lastName}
                      </h3>
                      <h5 className="text-uppercase">
                        {values?.city} , <span>{values?.state}</span>{" "}
                      </h5>
                      <div className="review-star-product-message mb-2">
                        <StarRatings
                          rating={values?.rating}
                          starRatedColor="orange"
                          numberOfStars={5}
                          starDimension="25px"
                          starSpacing="3px"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <h5 className="hrscss">
                      {calculateDuration(values?.createdAt)}
                    </h5>
                    <p
                      className="user-review-message"
                      style={{ width: "auto" }}
                    >
                      {values?.reviewDescription}
                    </p>
                  </div>
                </div>
              );
            })}
          <br />
          {/* {ratingbyproductcount?.count}<br/>
                            {numberOfReview} */}
          {/* {numberOfReview<ratingbyproductcount?.count?(<button onClick={showTwoMoreReviews}>View more</button>):(<></>)} */}
          {showTheViweButton()}
        </div>
      </div>
      {/* Rating review */}
      {/* product carousel */}
      <section className="product_Carousel">
        <div className="shoplandingleft_productcarousel">
          <div className="shoplanding__container__left_heading">
            UNLEASH YOUR <br />
            EXTRAORDINARY
          </div>
        </div>
        <div className="shoplanding__container__left_heading_line">
          <img src={yellowLine} />
        </div>
        <CarouselDesc />
      </section>
      <br />
      <br />
    </div>
  );
};

export default ProductDesc;
