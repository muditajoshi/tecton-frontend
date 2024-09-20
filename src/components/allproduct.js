import "../css/allproduct.css";
import { Link } from "react-router-dom";
import LOGOORANGE from "../images/TECTON beta site.png";
import LOGOSIDE from "../images/TECTON beta site side.png";
import { faAlignCenter } from "@fortawesome/free-solid-svg-icons";
import magma from "../images/MAGMA.png";
import ScrollToTop from "./ScrollToTop";
import QuickAdd from "../components/quikadd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Product from "../skeleton/Product";
import Paginate from "../skeleton/Paginate";
import { Row, Col } from "react-bootstrap";
// import ProductCarousel from '../components/ProductCarousel';
import Meta from "../skeleton/Meta";
import { listProducts } from "../actions/productActions";
import { refreshLogin, getUserDetails } from "../actions/userActions";
import Message from "../skeleton/Message";
// import ProductSkeleton from '../components/ProductSkeleton';
import useDocumentTitle from "./useDocumentTitle";

import { SHA256 } from "crypto-js";
import Cookies from "js-cookie";
import ScriptTag from "react-script-tag";

const Allproduct = ({ match }) => {
  // window.onload = function() {
  //   if(!window.location.hash) {
  //     window.location = window.location + '#loaded';
  //     window.location.reload();
  //   }
  // }

  const urlParams = new URLSearchParams(window.location.search);
  const cjeventValue = urlParams.get("cjevent");
  const pageview = 0;

  //set cjevent cookie
  useEffect(() => {
    if (cjeventValue) {
      const expirationDate = new Date();
      expirationDate.setMonth(expirationDate.getMonth() + 13);
      // const domain = window.location.hostname === 'localhost' ? '' : 'test.tectonlife.com';

      const domain =
        window.location.hostname === "tectonlife.com"
          ? ".tectonlife.com"
          : ".test.tectonlife.com";
      const secure = window.location.protocol === "https:" ? true : false;
      const sameSite = "None";

      Cookies.set("cje", cjeventValue, {
        expires: expirationDate,
        domain: domain,
        secure: secure,
        sameSite: sameSite,
      });

      /*
       axios
       .post(`${process.env.REACT_APP_PROXY_URL}/api/cookieintegration`, {
         cjevent: cjeventValue,
       
       })
       .then((res) => {
         console.log(res);
        
       });
       */
    }
  }, []);

  useDocumentTitle("Shop - Tecton");
  const [toggle, setToggle] = useState(false);
  const keyword = match.params.keyword; // to search for products
  const pageNumber = Number(match.params.pageNumber) || 1; // current page number in the paginated display
  const [promptVerfication, setPromptVerification] = useState(false); // prompt user to verify email if not yet confirmed
  const [products, setProducts] = useState(null);
  const [productAvailable, setProductAvailable] = useState(false);
  const dispatch = useDispatch();

  // get the products list, userinfo and user details form the redix store
  const productList = useSelector((state) => state?.productList);
  let { loading, error, pages } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { error: userInfoError } = userDetails;

  // fetch the user details
  useEffect(() => {
    userInfo
      ? userInfo.isSocialLogin
        ? dispatch(getUserDetails(userInfo.id))
        : dispatch(getUserDetails("profile"))
      : dispatch(getUserDetails("profile"));
  }, [userInfo, dispatch]);

  // refresh token to get new access token if error in user details
  useEffect(() => {
    if (userInfoError && userInfo && !userInfo.isSocialLogin) {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      dispatch(refreshLogin(user?.email));
    }
  }, [userInfoError, dispatch, userInfo]);

  // set a state variable to true or false depending on if products is avialable in the state
  useEffect(() => {
    if (products) {
      products?.length ? setProductAvailable(true) : setProductAvailable(false);
    }
  }, [products]);

  // fetch products from redux store into local state
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/api/products`)
      .then((res) => setProducts(res.data.products));
  }, []);

  // list products based on keyword and pagenumber
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, keyword, pageNumber]);

  // check if user needs to be promted about email verification on page load
  useEffect(() => {
    setPromptVerification(
      localStorage.getItem("promptEmailVerfication") === "true" ? true : false
    );
  }, []);
  const handleToggle = () => {
    setToggle((pre) => !pre);
  };

  //  console.log(products?.length);

  // get cart, userInfo and userdetails from redux store
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  //get cart items for page visit tag
  const [cartData, setCartData] = useState();
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/api/cart/user/${userInfo?.id}`)
      .then((res) => setCartData(res?.data?.cart[0]?.cartItems));
  }, [count]);

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
    <div className="product-font">
      <div class="all-product">
        <ScrollToTop />
        <section class="section-products">
          <div class="container">
            <div class=" cont-act-for col-sm-10">
              <div class="row">
                <div class="m-acc">
                  <h4
                    class="pro-duct"
                    style={{ fontFamily: "aktivExt", paddingLeft: "40px" }}
                  >
                    {" "}
                    Tecton® Ketone Hydration
                  </h4>
                </div>
                {/* <div class="sort-by" style={{ alignItems: "right" }}>
                <button class="sort-of">
                  {" "}
                  sort &nbsp;&nbsp;&nbsp; <i class="arrow down"></i>
                </button>
              </div> */}
              </div>
            </div>

            {/* <div class="ketoo" style={{paddingLeft:"20px"}}>
            <h4>
              <b>Ketone Hydration</b>
            </h4>
          </div> */}
            <>
              <Row>
                {products?.length
                  ? products?.map((product) => {
                      return (
                        <Col sm={12} md={6} lg={4} xl={3} key={product?._id}>
                          <Product product={product} />
                        </Col>
                      );
                    })
                  : ""}
              </Row>
              <Paginate
                className="mt-auto text-center"
                page={pageNumber}
                keyword={keyword ? keyword : ""}
                pages={pages}
              />
            </>
          </div>
          <div>
            <div class="image-story">
              <div id="image-product"></div>
            </div>
          </div>
          <div class="our-story-part">
            <section class="allproduct-section-four">
              <div class="row justify-content-center text-center">
                <h1
                  class="landing-section-four-heading"
                  style={{
                    color: "black",
                    fontSize: "32px",
                    fontFamily: "aktivExt",
                  }}
                >
                  Our Story
                </h1>
                <p class="ourt-story" style={{ color: "black" }}>
                  The Earth’s mountains, valleys and oceans are shaped by its
                  tectonic plates. Similarly, the mitochondria in our cells can
                  unleash our ability to change our health and wellbeing.
                  Perhaps even change the world.
                  <br />
                  <br />
                  That’s why we are named Tecton®. Our product helps the
                  mitochondria in our cells to metabolize energy in a far more
                  efficient way. <br />
                  <br />
                  Let’s make the most of our every day little moments. One of
                  these moments might potentially change our lives. Or shift the
                  world.{" "}
                </p>
                <div
                  className="landing-section-four-button"
                  style={{ textAlign: "center", color: "orange" }}
                >
                  <Link to="/be-great">
                    <input
                      style={{
                        textAlign: "center",
                        color: "orange",
                        border: "1px solid orange",
                        fontFamily: "aktivExt",
                      }}
                      class="landing-section-four-button"
                      type="submit"
                      value="READ MORE"
                    ></input>
                  </Link>
                </div>
              </div>
            </section>
          </div>
          <div class="help-diff-cart">
            <div class="row justify-content-center text-center">
              <div class="col-md-8 col-lg-6">
                <div
                  class="header-cart"
                  style={{
                    color: "black",
                    fontSize: "32px",
                    fontFamily: "aktivExt",
                  }}
                >
                  <b>Help Us Make a Difference</b>
                </div>
                <br />
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
          src="../productsTag.js"
        />
      </div>
    </div>
  );
};

export default Allproduct;
