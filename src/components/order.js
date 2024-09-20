import "../css/order.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import getDateString from "../utils/getDateString";
// import LOGOORANGE from "../images/TECTON beta site.png";
// import LOGOSIDE from "../images/TECTON beta site side.png";
import Logo from "../images/newlogo_tecton.png";
// import LOGOSIDE from "../images/Tecton side by side white logo.png"
// import Logo from '../images/TECTON beta site.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { listAllOrders } from "../actions/orderActions";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import ViewDetails from "../components/viewdetail";
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
import useDocumentTitle from "./useDocumentTitle";

const Orders = ({ history }) => {
  useDocumentTitle("Orders - Tecton");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/api/orders/myorders`, {
        headers: {
          Authorization: `Bearer ${data1?.accessToken}`,
        },
        // }).then((res)=>(res.data.map((val)=>setorder((prevData)=>[...prevData , val.orderItems[0].name]))))
      })
      .then((res) => setorder(res.data));
  }, []);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // setPersonnel((prevData)=>[...prevData , data])
  // setorder(val.orderItems[0].name)

  // res.data[0].orderItems[0].name)

  const [orders, setorder] = useState("");
  const [images, setImages] = useState("");
  const data = localStorage.getItem("userInfo");
  const data1 = JSON.parse(data);
  const inputFile = useRef(null);
  const userDetails = useSelector((state) => state?.userDetails);
  const { loading, user, error } = userDetails;
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
  // console.log(data1)

  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((pre) => !pre);
  };

  const logout = () => {
    history.push("/");
    localStorage.removeItem("userInfo");
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
    <div class="acc">
      <div class="Act">
     <div style={{display:"flex"}}>
        <div className="order-space" style={{ width: "37%" }}>
          <div class="contact-info">
            <div id="dep1">
              <ul class="menu-account">
                <li>
                  <a style={{ color: "orange" }} href="/order">
                    ORDERS
                  </a>
                </li>
                <li>
                  <a href="/subscription">SUBSCRIPTIONS</a>
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
        <div class=" order-page ">
          <h3
            class="aci"
            style={{ marginLeft: "-10px", paddingBottom: "30px" }}
          >
            Order history
          </h3>

          <div class="row">
            <div class=" col-3 order-number">
              <b>Product</b>
            </div>
            <div class=" col-1 qty" style={{ textAlign: "center" }}>
              <b>Qty</b>
            </div>
            <div class=" col-3 total" style={{ textAlign: "center" }}>
              <b>Total</b>
            </div>
            <div class=" col-2 order-date">
              <b>Order date</b>
            </div>
            {/* <div class=" col-2 shipped" style={{ textAlign: "center" }}>

              <b>Shipped</b>
            </div> */}
            <div class=" col-2 Details" style={{ textAlign: "center" }}>
              <b>Details</b>
            </div>
            <hr style={{ width: "89%" }}></hr>
            <div class="row" style={{ fontSize: "0.9rem" }}>
              {orders &&
                orders.map((order) => (
                  <>
                    <div class=" col-3 order-number">
                      <div className="ordern">
                        {" "}
                        {order?.orderItems.map((val) => (
                          <div>{val?.name}</div>
                        ))}
                      </div>
                    </div>
                    <div class=" col-1 qty" style={{ textAlign: "center" }}>
                      <div className="ordern">
                        {order.orderItems.map((val) => (
                          <div>{val.qty}</div>
                        ))}
                      </div>
                    </div>
                    <div class=" col-3 total" style={{ textAlign: "center" }}>
                      <div className="ordern">
                        ${(order?.totalPrice).toFixed(2)}
                      </div>
                    </div>
                    <div class=" col-2 order-date">
                      <div className="ordern">
                        {order.createdAt.slice(0, 10)}
                      </div>
                    </div>
                    {/* <div class=" col-2 shipped" style={{ textAlign: "center" }}> */}
                    {/* <div className="ordern">
                00/00/00
              </div> */}
                    {/* </div> */}
                    <div class=" col-2 Details" style={{ textAlign: "center" }}>
                      <button
                        onClick={() => {
                          handleToggle();
                          setImages(order);
                        }}
                        class="edit-subscription"
                        style={{ color: "orange", fontSize: "14px" }}
                      >
                        view
                      </button>
                      {toggle && (
                        <ViewDetails
                          img={images}
                          close={() => setToggle(false)}
                        />
                      )}
                    </div>

                    <hr style={{ width: "90%", zIndex: "-1" }}></hr>
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

export default Orders;
