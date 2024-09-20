import React, { Component, useEffect } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import redback from "../images/Tecton_Magma_Nutrition (3).png";
import { Link } from "react-router-dom";
import axios from "axios";
import redcan from "../images/Tecton_Magma (1).png";
import mobilecan1 from "../images/Artboardmobileone.webp";
import mobilecan2 from "../images/Artboardmobiletwo.webp";
import weburl from "../images/Artboardsectionthree.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import bluecan from "../images/Tecton_Glacier (1).png";
import "../css/Landing.css";
import { useRef } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Message from "../skeleton/Message";
import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlassMinus } from "@fortawesome/free-solid-svg-icons";
import useDocumentTitle from "./useDocumentTitle";
import HSApopup from "./onScreenPopup";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { WEBSITE_URL } from "../constants/Url";
import { SHA256 } from "crypto-js";
import Cookies from "js-cookie";
import ScriptTag from "react-script-tag";

function Landing() {
  // window.dataLayer.push({
  //   event: 'pageview',
  //   page: {
  //     url: window.location.pathname,
  //     title: "landing-page"
  //   }
  // });
  const urlParams = new URLSearchParams(window.location.search);
  const cjeventValue = urlParams.get("cjevent");
  const pageview = 0;
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

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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

  useEffect(() => {
    document
      .querySelector("meta[property='og:image']")
      .setAttribute("content", `${WEBSITE_URL}${weburl}`);
  }, []);

  const userList = useSelector((state) => state.userList);
  const { loading, users, error, page, pages, total } = userList;

  //set the cjevent cookie
  const [cjevent, setCjevent] = useState(null);

  useEffect(() => {
    const cjeventValue = Cookies.get("cje");
    setCjevent(cjeventValue);
  }, []);

  const renderCustomThumbs = () => {
    return [
      //carousel tabs//
      <picture>
        <br className="removenot" />
        <div className="dont-display-line">
          <div
            className="white-line"
            style={{ backgroundColor: "#FFA400", display: "inline-block" }}
          ></div>
          &nbsp;&nbsp; <div className="white-line"></div>&nbsp;&nbsp;{" "}
          <div className="white-line"></div>&nbsp;&nbsp;{" "}
          <div className="white-line"></div> &nbsp;&nbsp;
          <div className="white-line"></div>
        </div>
        <div className="display-bg-first-tab-desktop">
          <div
            class="bgblack"
            style={{ backgroundColor: "#FFA400", padding: "9px" }}
          >
            <span style={{ display: "inline-block" }}></span>
          </div>
        </div>
        <div className="display-bg-first-tab-mobile">
          <div
            class="bgblack"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(20px)",
            }}
          >
            <span style={{ display: "inline-block" }}>
              <span class="bold-text-landing" style={{ color: "white" }}>
                Nature’s Optimal Fuel: Zero Sugar or Caffeine!
              </span>
            </span>
          </div>
          <div
            class="bgblack"
            style={{
              border: "none",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(20px)",
              padding: "10px",
              width: "44px",
            }}
          >
            <span style={{ display: "inline-block" }}>
              <span class="bold-text-landing">
                <FontAwesomeIcon
                  className="landing-arrow"
                  style={{
                    paddingTop: "24px",
                    fontSize: "26px!important",
                    color: "white",
                    paddingLeft: "8px",
                  }}
                  icon={faAngleRight}
                ></FontAwesomeIcon>
              </span>
            </span>
          </div>
        </div>
      </picture>,
      <picture>
        <br className="removenot" />
        <div className="dont-display-line">
          <div
            className="white-line"
            style={{ backgroundColor: "#FFA400", display: "inline-block" }}
          ></div>
          &nbsp;&nbsp; <div className="white-line"></div>&nbsp;&nbsp;{" "}
          <div className="white-line"></div>&nbsp;&nbsp;{" "}
          <div className="white-line"></div> &nbsp;&nbsp;
          <div className="white-line"></div>
        </div>
        <div className="display-bg-first-tab-desktop">
          <div class="bgblack">
            <span style={{ display: "inline-block" }}>
              <span class="bold-text-landing">
                The Brain: Exogenous ketones and concussions ​
              </span>
            </span>
          </div>
        </div>
        <div className="display-bg-first-tab-mobile">
          <div class="bgblack">
            <span style={{ display: "inline-block" }}>
              <span class="bold-text-landing">
                The Brain: Exogenous ketones and concussions ​
              </span>
            </span>
          </div>
          <div
            class="bgblack"
            style={{
              border: "none",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(20px)",
              padding: "10px",
              width: "44px",
            }}
          >
            <span style={{ display: "inline-block" }}>
              <span class="bold-text-landing">
                <FontAwesomeIcon
                  className="landing-arrow"
                  style={{
                    paddingTop: "24px",
                    fontSize: "20px !important",
                    color: "white",
                    paddingLeft: "8px",
                  }}
                  icon={faAngleRight}
                ></FontAwesomeIcon>
              </span>
            </span>
          </div>
        </div>
      </picture>,
      <picture>
        <br className="removenot" />
        <div className="dont-display-line">
          <div className="white-line"></div>&nbsp;&nbsp;{" "}
          <div
            className="white-line"
            style={{ backgroundColor: "#FFA400", display: "inline-block" }}
          ></div>
          &nbsp;&nbsp; <div className="white-line"></div>&nbsp;&nbsp;{" "}
          <div className="white-line"></div> &nbsp;&nbsp;
          <div className="white-line"></div>
        </div>
        <div className="display-bg-first-tab-desktop">
          <div class="bgblack">
            <span style={{ display: "inline-block" }}>
              <span class="bold-text-landing">
                Become healthy to lose weight. Not the other way.
              </span>
            </span>
          </div>
        </div>
        <div className="display-bg-first-tab-mobile">
          <div class="bgblack">
            <span style={{ display: "inline-block" }}>
              <span class="bold-text-landing">
                Become healthy to lose weight. Not the other way.
              </span>
            </span>
          </div>
          <div
            class="bgblack"
            style={{
              border: "none",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(20px)",
              padding: "10px",
              width: "44px",
            }}
          >
            <span style={{ display: "inline-block" }}>
              <span class="bold-text-landing">
                <FontAwesomeIcon
                  className="landing-arrow"
                  style={{
                    paddingTop: "24px",
                    fontSize: "26px ! important",
                    color: "white",
                    paddingLeft: "8px",
                  }}
                  icon={faAngleRight}
                ></FontAwesomeIcon>
              </span>
            </span>
          </div>
        </div>
      </picture>,
      <picture>
        <br className="removenot" />
        <div className="dont-display-line">
          <div className="white-line"></div>&nbsp;&nbsp;{" "}
          <div className="white-line"></div>&nbsp;&nbsp;{" "}
          <div
            className="white-line"
            style={{ backgroundColor: "#FFA400", display: "inline-block" }}
          ></div>
          &nbsp;&nbsp; <div className="white-line"></div> &nbsp;&nbsp;
          <div className="white-line"></div>
        </div>
        <div className="display-bg-first-tab-desktop">
          <div class="bgblack">
            <span style={{ display: "inline-block" }}>
              <span class="bold-text-landing">
                Meet Steve Uria: Fitness Guru Extraordinaire ​
              </span>
            </span>
          </div>
        </div>
        <div className="display-bg-first-tab-mobile">
          <div class="bgblack">
            <span style={{ display: "inline-block" }}>
              <span class="bold-text-landing">
                Meet Steve Uria: Fitness Guru Extraordinaire ​
              </span>
            </span>
          </div>
          <div
            class="bgblack"
            style={{
              border: "none",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(20px)",
              padding: "10px",
              width: "44px",
            }}
          >
            <span style={{ display: "inline-block" }}>
              <span class="bold-text-landing">
                <FontAwesomeIcon
                  className="landing-arrow"
                  style={{
                    paddingTop: "24px",
                    fontSize: "26px ! important",
                    color: "white",
                    paddingLeft: "8px",
                  }}
                  icon={faAngleRight}
                ></FontAwesomeIcon>
              </span>
            </span>
          </div>
        </div>
      </picture>,
      <picture>
        <br className="removenot" />
        <div className="dont-display-line">
          <div className="white-line"></div>&nbsp;&nbsp;{" "}
          <div className="white-line"></div>&nbsp;&nbsp;{" "}
          <div className="white-line"></div>&nbsp;&nbsp;{" "}
          <div
            className="white-line"
            style={{ backgroundColor: "#FFA400", display: "inline-block" }}
          ></div>{" "}
          &nbsp;&nbsp;<div className="white-line"></div>
        </div>
        <div className="display-bg-first-tab-desktop">
          <div class="bgblack">
            <span style={{ display: "inline-block" }}>
              <span class="bold-text-landing">
                Nature’s Optimal Fuel: Zero Sugar or Caffeine!{" "}
              </span>
            </span>
          </div>
        </div>
        <div className="display-bg-first-tab-mobile">
          <div class="bgblack">
            <span style={{ display: "inline-block" }}>
              <span class="bold-text-landing">
                Nature’s Optimal Fuel: Zero Sugar or Caffeine!
              </span>
            </span>
          </div>

          <div
            class="bgblack"
            style={{
              border: "none",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(20px)",
              padding: "10px",
              width: "44px",
            }}
          >
            <span style={{ display: "inline-block" }}>
              <span class="bold-text-landing">
                <FontAwesomeIcon
                  className="landing-arrow"
                  style={{
                    paddingTop: "24px",
                    fontSize: "26px ! important",
                    color: "white",
                    paddingLeft: "8px",
                  }}
                  icon={faAngleRight}
                ></FontAwesomeIcon>
              </span>
            </span>
          </div>
        </div>
      </picture>,
      <picture>
        <br className="removenot" />
        <div className="dont-display-line">
          <div className="white-line"></div>&nbsp;&nbsp;{" "}
          <div className="white-line"></div>&nbsp;&nbsp;{" "}
          <div className="white-line"></div>&nbsp;&nbsp;{" "}
          <div className="white-line"></div> &nbsp;&nbsp;
          <div
            className="white-line"
            style={{ backgroundColor: "#FFA400", display: "inline-block" }}
          ></div>
        </div>
        <div className="display-bg-first-tab-desktop">
          <div class="bgblack">
            <span style={{ display: "inline-block" }}>
              <span class="bold-text-landing">
                All ketones aren’t similar! This really matters. ​
              </span>
            </span>
          </div>
        </div>
        <div className="display-bg-first-tab-mobile">
          <div class="bgblack">
            <span style={{ display: "inline-block" }}>
              <span class="bold-text-landing">
                All ketones aren’t similar! This really matters. ​
              </span>
            </span>
          </div>

          <div
            class="bgblack"
            style={{
              border: "none",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(20px)",
              padding: "10px",
              width: "44px",
            }}
          >
            <span style={{ display: "inline-block" }}>
              <span class="bold-text-landing">
                <FontAwesomeIcon
                  className="landing-arrow"
                  style={{
                    paddingTop: "24px",
                    fontSize: "26px ! important",
                    color: "white",
                    paddingLeft: "8px",
                  }}
                  icon={faAngleRight}
                ></FontAwesomeIcon>
              </span>
            </span>
          </div>
        </div>
      </picture>,
      <picture>
        <br className="removenot" />
        <div className="dont-display-line">
          <div className="white-line"></div>&nbsp;&nbsp;{" "}
          <div className="white-line"></div>&nbsp;&nbsp;{" "}
          <div className="white-line"></div>&nbsp;&nbsp;{" "}
          <div className="white-line"></div> &nbsp;&nbsp;
          <div
            className="white-line"
            style={{ backgroundColor: "#FFA400", display: "inline-block" }}
          ></div>
        </div>
        <div className="display-bg-first-tab-desktop">
          <div class="bgblack">
            <span style={{ display: "inline-block" }}>
              <span class="bold-text-landing">
                Our Purpose - Unleash everyone’s extraordinary
              </span>
            </span>
          </div>
        </div>
        <div className="display-bg-first-tab-mobile">
          <div class="bgblack">
            <span style={{ display: "inline-block" }}>
              <span class="bold-text-landing">
                Our Purpose - Unleash everyone’s extraordinary
              </span>
            </span>
          </div>
          <div
            class="bgblack"
            style={{
              border: "none",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(20px)",
              padding: "10px",
              width: "44px",
            }}
          >
            <span style={{ display: "inline-block" }}>
              <span class="bold-text-landing">
                <FontAwesomeIcon
                  className="landing-arrow"
                  style={{
                    paddingTop: "24px",
                    fontSize: "26px!important",
                    color: "white",
                    paddingLeft: "8px",
                  }}
                  icon={faAngleRight}
                ></FontAwesomeIcon>
              </span>
            </span>
          </div>
        </div>
      </picture>,
      //arrow-design//
      <picture>
        <br className="removenot" />
        <div className="dont-display-line">
          <div className="white-line"></div>&nbsp;&nbsp;{" "}
          <div className="white-line"></div>&nbsp;&nbsp;{" "}
          <div className="white-line"></div>&nbsp;&nbsp;{" "}
          <div className="white-line"></div> &nbsp;&nbsp;
          <div
            className="white-line"
            style={{ backgroundColor: "#FFA400", display: "inline-block" }}
          ></div>
        </div>
        <div class="bgblack" style={{ border: "none", paddingRight: "15px" }}>
          <FontAwesomeIcon
            style={{ paddingTop: "10px", fontSize: "30px" }}
            icon={faAngleRight}
          ></FontAwesomeIcon>
        </div>
        <div></div>
      </picture>,
    ];
  };
  useDocumentTitle("TECTON");
  return (
    <div className="landing-font" style={{ width: "100%" }}>
      <HSApopup />
      {error ? (
        <Message dismissible variant="danger" duration={10}>
          {error}
        </Message>
      ) : (
        ""
      )}
      {/* carousel image and copy */}
      <section class="section-one">
        <Carousel
          renderThumbs={renderCustomThumbs}
          autoPlay={false}
          interval={4000}
          showArrows={true}
          infiniteLoop={true}
          thumbWidth="19%"
          showIndicators={false}
          showStatus={false}
          stopOnHover={false}
          swipeable={false}
        >
          <div>
            <div style={{ display: "none" }}></div>
            <div className="img-shop"></div>
            <div class="image-content">
              <div className="image-landing-new-content">
                <span style={{ letterSpacing: "5px" }}>
                  UNLEASH YOUR
                  <br />
                  EXTRAORDINARY
                </span>
              </div>
              <div className="image-landing-new-content-second ">
                <span>
                  Optimize your Physical and Mental
                  <br /> Potential with Ketone Hydration
                </span>{" "}
              </div>
              <div className="image-landing-new-content-second2 ">
                <span>
                  Optimize your
                  <br /> Physical and Mental
                  <br /> Potential with Ketone
                  <br /> Hydration
                </span>{" "}
              </div>
              <div className="begreat-new" style={{ paddingBottom: "30px" }}>
                {" "}
                BE GREAT.{" "}
              </div>

              <a
                href="https://blog.tectonlife.com/science"
                class="select"
                style={{
                  color: "white",
                  backgroundColor: "#FFA400",
                  padding: "10px 16px 7px 16px",
                  fontSize: "15px",
                  textAlign: "center",
                  textDecoration: "none",
                }}
              >
                L E A R N &nbsp; H O W
              </a>
            </div>
          </div>
          <div>
            <div style={{ display: "none" }}></div>
            <div className="img-meditation"></div>
            <div class="image-content">
              <div className="image-landing-new-content">
                <span style={{ letterSpacing: "5px" }}>
                  MITIGATE CONCUSSIONS​
                </span>
              </div>
              <div className="image-landing-new-content-second ">
                <span>Be proactive to help brain metabolism​</span>{" "}
              </div>
              <div className="image-landing-new-content-second2 ">
                <span>
                  Be proactive to help brain
                  <br /> metabolism
                </span>{" "}
              </div>
              <div className="begreat-new" style={{ paddingBottom: "40px" }}>
                {" "}
                BE GREAT.{" "}
              </div>

              <a
                href="https://blog.tectonlife.com/can-ketones-help-mitigate-concussions/"
                class="select"
                style={{
                  color: "white",
                  backgroundColor: "#FFA400",
                  padding: "10px 16px 7px 16px",
                  fontSize: "15px",
                  textAlign: "center",
                  textDecoration: "none",
                }}
              >
                T A K E &nbsp;A C T I O N
              </a>
            </div>
          </div>
          <div>
            <div className="img-arto"></div>
            <div class="image-content">
              <div className="image-landing-new-content">
                <span style={{ letterSpacing: "5px" }}>
                  SUSTAINABLE WEIGHT MANAGEMENT​
                </span>
              </div>
              <div className="image-landing-new-content-second ">
                <span> Focus on what you gain. Lose what you should.</span>{" "}
              </div>
              <div className="image-landing-new-content-second2 ">
                <span>
                  Focus on what you gain. Lose what
                  <br /> you should.​
                </span>{" "}
              </div>
              <div className="begreat-new" style={{ paddingBottom: "40px" }}>
                {" "}
                BE GREAT.{" "}
              </div>

              <a
                href="https://blog.tectonlife.com/weight-management-and-ketones/"
                class="select"
                style={{
                  color: "white",
                  backgroundColor: "#FFA400",
                  padding: "10px 16px 7px 16px",
                  fontSize: "15px",
                  textAlign: "center",
                  textDecoration: "none",
                }}
              >
                L E A R N &nbsp; H O W
              </a>
            </div>
          </div>
          <div>
            <div className="img-fish"></div>
            <div class="image-content">
              <div className="image-landing-new-content">
                <span style={{ letterSpacing: "5px" }}>
                  INSPIRING OPTIMAL <br />
                  HEALTH
                </span>
              </div>
              <div className="image-landing-new-content-second ">
                <span>Become the best of who you are already!​</span>{" "}
              </div>
              <div className="image-landing-new-content-second2 ">
                <span>
                  Become the best of who you
                  <br /> are already!​
                </span>{" "}
              </div>
              <div className="begreat-new" style={{ paddingBottom: "40px" }}>
                {" "}
                BE GREAT.{" "}
              </div>

              <a
                href="https://blog.tectonlife.com/ambassador/steve-uria/"
                class="select"
                style={{
                  color: "white",
                  backgroundColor: "#FFA400",
                  padding: "10px 16px 7px 16px",
                  fontSize: "15px",
                  textAlign: "center",
                  textDecoration: "none",
                }}
              >
                M E E T &nbsp; S T E V E
              </a>
            </div>
          </div>
          <div>
            <div className="img-road"></div>
            <div class="image-content">
              <div className="image-landing-new-content">
                <span style={{ letterSpacing: "5px" }}>
                  OPTIMAL KETONE
                  <br /> HYDRATION​
                </span>
              </div>
              <div className="image-landing-new-content-second ">
                <span>Mental and Physical Fuel. No jittery crashes.​</span>{" "}
              </div>
              <div className="image-landing-new-content-second2 ">
                <span>
                  Mental and Physical Fuel.
                  <br /> No jittery crashes.​
                </span>{" "}
              </div>
              <div className="begreat-new" style={{ paddingBottom: "40px" }}>
                {" "}
                BE GREAT.{" "}
              </div>

              <a
                href="https://blog.tectonlife.com/are-ketones-better-than-glucose-as-an-energy-source/"
                class="select"
                style={{
                  color: "white",
                  backgroundColor: "#FFA400",
                  padding: "10px 16px 7px 16px",
                  fontSize: "15px",
                  textAlign: "center",
                  textDecoration: "none",
                }}
              >
                {" "}
                D I V E &nbsp; I N{" "}
              </a>
            </div>
          </div>
          <div>
            <div className="img-plants"></div>
            <div class="image-content">
              <div className="image-landing-new-content">
                <span style={{ letterSpacing: "5px" }}>
                  NATURE IDENTICAL
                  <br /> KETONES​
                </span>
              </div>
              <div className="image-landing-new-content-second ">
                <span>Safe for all, even at high doses.​</span>{" "}
              </div>
              <div className="image-landing-new-content-second2 ">
                <span>
                  Safe for all, even at <br />
                  high doses.​
                </span>{" "}
              </div>
              <div className="begreat-new" style={{ paddingBottom: "40px" }}>
                {" "}
                BE GREAT.{" "}
              </div>

              <a
                href="https://blog.tectonlife.com/ketone-salts-vs-ketone-esters/"
                class="select"
                style={{
                  color: "white",
                  backgroundColor: "#FFA400",
                  padding: "10px 16px 7px 16px",
                  fontSize: "15px",
                  textAlign: "center",
                  textDecoration: "none",
                }}
              >
                L E A R N &nbsp; W H Y
              </a>
            </div>
          </div>
          <div>
            <div className="img-uncle"></div>
            <div class="image-content">
              <div className="image-landing-new-content">
                <span style={{ letterSpacing: "5px" }}>TRUE PURPOSE​</span>
              </div>
              <div className="image-landing-new-content-second ">
                <span>To help those who change the world​</span>{" "}
              </div>
              <div className="image-landing-new-content-second2 ">
                <span>
                  To help those who change
                  <br /> the world​
                </span>{" "}
              </div>
              <div className="begreat-new" style={{ paddingBottom: "40px" }}>
                {" "}
                BE GREAT.{" "}
              </div>

              <a
                href="https://blog.tectonlife.com/true-purpose"
                class="select"
                style={{
                  color: "white",
                  backgroundColor: "#FFA400",
                  padding: "10px 16px 7px 16px",
                  fontSize: "15px",
                  textAlign: "center",
                  textDecoration: "none",
                }}
              >
                J O I N &nbsp; U S
              </a>
            </div>
          </div>
        </Carousel>
      </section>
      {/* section two  BE GREAT*/}
      <section>
        <div className="section-two-newlanding-page">
          <div className="begreat-new-section-two"> BE GREAT. </div>
        </div>
      </section>
      <section>
        {/* section three magma  glacier image desktop view */}
        <div className="section-three-newlanding-page-desktop">
          <div className="sectionthree-new">
            <div>
              <div className="new-landing-section-three-content-name1">
                <div class="select-shop">
                  <Link to="./shop">S H O P &nbsp; N O W</Link>
                </div>
                <div className="new-landing-section-three-content1">
                  GLACIER
                </div>
                Uncarbonated
                <br />
                Slightly tart
                <br />
                Less sweet
                <br />
                Clear color
                <br />
              </div>
            </div>

            <div>
              <div className="new-landing-section-three-content-name2">
                <div style={{ marginBottom: "66px" }}>
                  <br />
                </div>
                <div className="new-landing-section-three-content2">MAGMA</div>
                Uncarbonated
                <br />
                Less tart
                <br />
                Slightly sweeter
                <br />
                Red in color
                <br />
              </div>
            </div>
          </div>
        </div>
        {/* section three magma glacier mobile view */}
        <div className="section-three-newlanding-page-mobile">
          <div>
            <div className="mobile-section-three1" style={{ height: "" }}>
              <div className="new-landing-section-three-content-name1-mobile">
                <div className="mobile-shopnow-new">
                  <Link to="./shop" class="select-mobile">
                    S H O P &nbsp; N O W
                  </Link>
                </div>
                <div className="new-landing-section-three-content1-mobile">
                  GLACIER
                </div>
                Uncarbonated
                <br />
                Slightly tart
                <br />
                Less sweet
                <br />
                Clear color
                <br />
              </div>
              <div>
                <img
                  style={{
                    height: "100%",
                    width: "100%",
                    marginTop: "-1px",
                    marginBottom: "-6px",
                  }}
                  src={mobilecan2}
                ></img>
              </div>
            </div>
            <div className="mobile-section-three2">
              <div className="new-landing-section-three-content-name1-mobile">
                <div className="new-landing-section-three-content1-mobile">
                  MAGMA
                </div>
                Uncarbonated
                <br />
                Less tart
                <br />
                Slightly sweeter
                <br />
                Red in color
                <br />
              </div>
              <div>
                <img
                  style={{
                    height: "100%",
                    width: "100%",
                    marginBottom: "-1px",
                  }}
                  src={mobilecan1}
                ></img>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* section three our story */}
      <section style={{ background: "black" }}>
        <br />
        <br />
        <div class="landing-section-four">
          <h1
            class="landing-section-four-heading"
            style={{ color: "white", fontFamily: "aktivExt" }}
          >
            Our Story
          </h1>
          <br />
          <p class="ourt-story " style={{ color: "white", fontSize: "18px" }}>
            The Earth’s mountains, valleys and oceans are shaped by its tectonic
            plates. Similarly, the mitochondria in our cells can unleash our
            ability to change our health and wellbeing. Perhaps even change the
            world.
            <br />
            <br />
            That’s why we are named Tecton®. Our product helps the mitochondria
            in our cells to metabolize energy in a far more efficient way.{" "}
            <br />
            <br />
            Let’s make the most of our every day little moments. One of these
            moments might potentially change our lives. Or shift the world.{" "}
          </p>
          <br />
          <div className="mobile-readmore-new" style={{ textAlign: "center" }}>
            <Link to="/be-great" style={{ color: "white" }}>
              <button className="read-science" style={{ color: "white" }}>
                READ MORE
              </button>
            </Link>
          </div>
          <br />
          <br />
          <input type="hidden" data-id={hidden_userID} id="h_userID" />
          <input type="hidden" data-id={hidden_userEmail} id="h_userEmail" />
          <input type="hidden" data-id={itemsSubtotal} id="h_amount" />
          <input type="hidden" data-id={items} id="h_items" />
          <input type="hidden" data-id={cjevent} id="h_cjeventOrder" />
        </div>
      </section>
      <section>
        <ScriptTag
          isHydrating={true}
          type="text/javascript"
          src="../homepageTag.js"
        />
      </section>
    </div>
  );
}

export default Landing;
