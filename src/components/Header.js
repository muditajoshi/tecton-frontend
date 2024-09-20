import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Header.css";

import ScrollToTop from "./ScrollToTop";
// import ham from '../images/hamburger-menu.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import Logo from "../images/newlogo_tecton.png";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import {
  Navbar,
  Container,
  NavDropdown,
  Offcanvas,
  Nav,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Shoppingcart from "../images/Group 13.png";
import Userlogo from "../images/Group 12.png";
import axios from "axios";

// function useWindowSize(){
//   const[size,setsize]=useState([window.innerHeight,window.innerWidth]);
//   useEffect(()=>{
//     const handleResize = () =>{
//       setsize([window.innerHeight,window.innerWidth]);
//     };
//     window.addEventListener("resize",handleResize);
//    return()=>{
//      window.removeEventListener("resize",handleResize)
//    };
//   },[]);
//   return size;
// }

const Header = ({ history }) => {
  const mycartupdate = useSelector((state) => state.cartUpdate);
  // console.log(mycartupdate)
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const Login = () => {
    history.push("/login");
  };
  const [nav, setnav] = useState("rgb(255,255,255,0.35)");
  const [totalItems, setTotalItems] = useState(0);
  const [cartData, setCartData] = useState();
  const [cartDisplay, setCartDisplay] = useState("none");
  const [cartid, setcartid] = useState();
  const [count, setcount] = useState(0);
  const [newcount, newsetcount] = useState(0);
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

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/api/cart/user/${userInfo?.id}`)
      .then((res) => {
        if (res.data.message == "Cart Not Found") {
          setCartData(0);
        } else {
          var arry = res?.data?.cart[0]?.cartItems
            ?.map((val) => val.qty)
            .reduce((a, b) => a + b, 0);
          setCartData(arry);
        }
      });
  }, [count]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/api/cart/user/${userInfo?.id}`)
      .then((res) => setcartid(res?.data?.cart[0]?._id));
  }, [count]);
  const changebg = () => {
    if (window.scrollY > 1) {
      setnav("white");
    } else setnav("rgb(255,255,255,0.2)");
  };
  useEffect(() => {
    window.addEventListener("scroll", changebg);
  });
  const data = localStorage.getItem("userInfo");
  // console.log(JSON.parse(data?.avatar))
  const data1 = JSON.parse(data);
  const logout = () => {
    localStorage.removeItem("userInfo");
    localStorage?.removeItem("cartItems");
    localStorage?.removeItem("subscriptionItems");
    //review rating history
    sessionStorage.removeItem("returnPage");
     //review rating history
    window.location.reload(false);
  };
  useEffect(() => {
    if (cartItems) {
      setTotalItems(cartItems.reduce((acc, item) => acc + item.qty, 0));
    }
  }, [cartItems]);
  const cardquant = JSON.parse(localStorage.getItem("cartItems"));
  // console.log(cardquant)
  cardquant?.map((val) => val.qty).reduce((a, b) => a + b, 0);
  // console.log(cardquant?.map((val)=>val.qty).reduce((a,b)=>a+b,0));
  var cardstate = cardquant?.map((val) => val.qty).reduce((a, b) => a + b, 0);
  // console.log(cardstate)
  if (cartItems === null) {
    cardstate = 0;
  }
  if (cartData === undefined) {
    setCartData(0);
  }
  //  if(cartData){
  //   setCartDisplay("inline-block")
  //  }
  const deletete = () => {
    // axios.delete(`${process.env.REACT_APP_PROXY_URL}/api/cart/${cartid}/emptycart`).then((res)=>setCartData(0));
    // setCartData(prevall => [...prevall,newwarry])
    setcount(count + 1);
  };
  // var myref=useRef()
  // console.log(myref?.current?.value)
  // useEffect(()=>{
  //   newsetcount(mycartupdate)
  // },[newcount])
  useEffect(() => {
    setcount(count + 1);
  }, [mycartupdate]);
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
  }, [count]);

  return (
    <div>
      <ScrollToTop />
      <div className="header" style={{ backgroundColor: "#FFFAF2" }}>
        <div className="header_logo">
          <a href="/" onClick={() => ".navbar-collapse".collapse("hide")}>
            {" "}
            <img src={Logo} alt="Logo da Marca"></img>
          </a>
        </div>
        <div className="header_center headergayab">
          <a
            href="/"
            onClick={() => ".navbar-collapse".collapse("hide")}
            style={{ textDecoration: "none" }}
          >
            {" "}
            <NavDropdown
              title={
                <span>
                  {" "}
                  About
                  <br />{" "}
                  {isDropdownOpen && (
                    <FontAwesomeIcon
                      className="fa_caret_down"
                      icon={faCaretDown}
                      style={{
                        color: "orange",
                        marginLeft: "25px",
                        position: "absolute",
                        marginTop: "-10",
                        fontSize: "21px",
                      }}
                    />
                  )}{" "}
                </span>
              }
              style={{ float: "right" }}
              id="basic-nav-dropdown"
              onToggle={handleDropdownToggle}
            >
              <div className="dropdown_items_content">
                <NavDropdown.Item href=" https://blog.tectonlife.com/true-purpose">
                  Purpose
                </NavDropdown.Item>
                <NavDropdown.Item href=" https://blog.tectonlife.com/benefits-of-exogenous-ketones/">
                  Exogenous Ketones
                </NavDropdown.Item>
              </div>
            </NavDropdown>
          </a>
          <a
            href=" https://blog.tectonlife.com/science"
            onClick={() => ".navbar-collapse".collapse("hide")}
            style={{ textDecoration: "none" }}
          >
            {" "}
            <NavDropdown
              title={
                <span>
                  {" "}
                  Science
                  <br />{" "}
                  {isDropdownOpen1 && (
                    <FontAwesomeIcon
                      className="fa_caret_down"
                      icon={faCaretDown}
                      style={{
                        color: "orange",
                        marginLeft: "31px",
                        position: "absolute",
                        marginTop: "-10",
                        fontSize: "21px",
                      }}
                    />
                  )}{" "}
                </span>
              }
              style={{ float: "right" }}
              id="basic-nav-dropdown"
              onToggle={handleDropdownToggle1}
            >
              <div className="dropdown_items_content">
                <NavDropdown.Item href=" https://blog.tectonlife.com/science">
                  Tecton Science
                </NavDropdown.Item>
                <NavDropdown.Item href="  https://blog.tectonlife.com/are-ketones-better-than-glucose-as-an-energy-source/">
                  Ketones vs Glucose
                </NavDropdown.Item>
                <NavDropdown.Item href="  https://blog.tectonlife.com/pkstudy">
                  PK Study
                </NavDropdown.Item>
                <NavDropdown.Item href="  https://blog.tectonlife.com/can-ketones-help-mitigate-concussions/">
                  Ketones and Concussions
                </NavDropdown.Item>
                <NavDropdown.Item href=" https://blog.tectonlife.com/ketone-salts-vs-ketone-esters/">
                  Ketone Salts vs. Ketone Esters
                </NavDropdown.Item>
                <NavDropdown.Item href="  https://blog.tectonlife.com/what-can-you-drink-during-intermittent-fasting/">
                  What Can You Drink During
                  <br /> Intermittent Fasting?
                </NavDropdown.Item>
                <NavDropdown.Item href="https://blog.tectonlife.com/science/#faqs">
                 FAQs
                </NavDropdown.Item>
              </div>
            </NavDropdown>
          </a>
          <a
            href="/shop"
            onClick={() => ".navbar-collapse".collapse("hide")}
            style={{ textDecoration: "none" }}
          >
            {" "}
            <p className="ghostItem">Shop</p>
          </a>
          <a
            onClick={() => ".navbar-collapse".collapse("hide")}
            style={{ textDecoration: "none" }}
          >
            {" "}
            <NavDropdown
              title={
                <span>
                  {" "}
                  Ambassadors
                  <div>
                    {" "}
                    {isDropdownOpen2 && (
                      <FontAwesomeIcon
                        className="fa_caret_down"
                        icon={faCaretDown}
                        style={{
                          color: "orange",
                          marginLeft: "57px",
                          position: "absolute",
                          marginTop: "-10",
                          fontSize: "21px",
                        }}
                      />
                    )}
                  </div>{" "}
                </span>
              }
              style={{ float: "right" }}
              id="basic-nav-dropdown"
              onToggle={handleDropdownToggle2}
            >
              <div className="dropdown_items_content">
                <NavDropdown.Item href=" https://blog.tectonlife.com/ambassador/">
                  <FontAwesomeIcon icon={faUserGroup} />
                  &nbsp; View{" "}
                </NavDropdown.Item>

                <NavDropdown.Item href="/ambassador">
                  {" "}
                  <FontAwesomeIcon icon={faUserPlus} />
                  &nbsp; Join Us{" "}
                </NavDropdown.Item>
              </div>
            </NavDropdown>
          </a>

          <a
            href="https://blog.tectonlife.com"
            onClick={() => ".navbar-collapse".collapse("hide")}
            style={{ textDecoration: "none" }}
          >
            {" "}
            <p className="ghostItem">Blog</p>
          </a>
          <a
            href=" https://blog.tectonlife.com/contact-us/."
            onClick={() => ".navbar-collapse".collapse("hide")}
            style={{ textDecoration: "none" }}
          >
            {" "}
            <p className="ghostItem">Contact</p>
          </a>
          {!data1?.id ? (
            <a
              href="/login"
              onClick={() => ".navbar-collapse".collapse("hide")}
              style={{ textDecoration: "none" }}
            >
              {" "}
              <p className="ghostItem">
                <FontAwesomeIcon
                  icon={faUser}
                  style={{
                    color: "black",
                    fontWeight: "bolder",
                    paddingLeft: "10px",
                    height: "20px",
                  }}
                />
              </p>
            </a>
          ) : (
            <a
              href="#"
              onClick={() => ".navbar-collapse".collapse("hide")}
              style={{ textDecoration: "none" }}
            >
              <NavDropdown
                style={{
                  textDecoration: "none",
                  float: "right",
                  paddingLeft: "10px",
                  paddingBottom: "6px",
                }}
                title={
                  <div>
                    <img src={Userlogo} width="18px" height="22px"></img>
                    <br />
                    <span>
                      {isDropdownOpen3 && (
                        <FontAwesomeIcon
                          icon={faCaretDown}
                          style={{
                            color: "orange",
                            marginLeft: "4px",
                            position: "absolute",
                            marginTop: "-5px",
                            fontSize: "19px",
                          }}
                        />
                      )}{" "}
                    </span>
                  </div>
                }
                id="basic-nav-dropdown"
                onToggle={handleDropdownToggle3}
              >
                <div className="dropdown_items_content">
                  <NavDropdown.Item href="/account">Profile</NavDropdown.Item>
                  <NavDropdown.Item href="/" onClick={logout}>
                    <Link to="/">Logout</Link>
                  </NavDropdown.Item>
                  {userIsAdmin === true ? (
                    <NavDropdown
                      title="Admin"
                      style={{
                        color: isOpened ? "white" : "black",
                        marginLeft: "3px",
                        paddingTop: "4px",
                      }}
                      id="basic-nav-dropdown"
                      onToggle={handleDropdownToggle99}
                    >
                      {/* Dropdown items here */}                     
                     
                      <div
                        className="admin_parent_div_dropdownitem"
                      >
                        <div className="admin_left_child_div_dropdownitem">
                          <NavDropdown.Item href="/admin/productlist">
                            Products
                          </NavDropdown.Item>
                          <NavDropdown.Item href="/admin/userlist">
                            Users
                          </NavDropdown.Item>
                          <NavDropdown.Item href="/admin/orderlist">
                            Orders
                          </NavDropdown.Item>
                          <NavDropdown.Item href="/admin/unpaidorders">
                            Unpaid orders
                          </NavDropdown.Item>
                          <NavDropdown.Item href="/admin/ambassadorslist">
                            Ambassadors
                          </NavDropdown.Item>
                          {/* <NavDropdown.Item href="/admin/contactlist">
                            Contacts
                          </NavDropdown.Item> */}
                          <NavDropdown.Item href="/admin/Subscriptionlist">
                            Subscriptions
                          </NavDropdown.Item>
                          <NavDropdown.Item href="/admin/unsubscibesurveylist">
                            Unsubscribe reasons
                          </NavDropdown.Item>
                          <NavDropdown.Item href="/admin/logs">
                         Log
                          </NavDropdown.Item>
                        </div>
                        <div className="admin_right_child_div_dropdownitem">
                          <NavDropdown.Item href="/admin/veteranList">
                            Veterans
                          </NavDropdown.Item>
                          <NavDropdown.Item href="/admin/employeeList">
                          Employees, F&F
                          </NavDropdown.Item>
                          <NavDropdown.Item href="/admin/discount">
                            Discounts
                          </NavDropdown.Item>
                          <NavDropdown.Item href="/admin/couponlist">
                            Coupons
                          </NavDropdown.Item>
                          <NavDropdown.Item href="/admin/editshippingprice">
                            Edit Shipping Price
                          </NavDropdown.Item>
                          <NavDropdown.Item href="/admin/news">
                            News
                          </NavDropdown.Item>
                          <NavDropdown.Item href="/admin/AmbassdorsTestimonialList">
                            Ambassador Testimonials
                          </NavDropdown.Item>
                          <NavDropdown.Item href="/admin/ratingreview">
                            Reviews
                          </NavDropdown.Item>
                        </div>
                      </div>

                    </NavDropdown>
                  ) : (
                    <NavDropdown.Item
                      style={{ display: "none" }}
                    ></NavDropdown.Item>
                  )}
                </div>
              </NavDropdown>
            </a>
          )}
          {userInfo ? (
            <a
              href="/cart"
              onClick={() => ".navbar-collapse".collapse("hide")}
              style={{ textDecoration: "none" }}
            >
              {" "}
              <p
                className="ghostItem"
                style={{
                  borderTopRightRadius: "22px",
                  borderBottomRightRadius: "22px",
                }}
              >
                <img
                  src={Shoppingcart}
                  style={{
                    color: "black",
                    fontWeight: "bolder",
                    fontSize: "25px",
                    height: "22px",
                  }}
                />
                <div
                  style={{
                    color: "black",
                    display: "inline-block",
                    width: "20px",
                    height: "17px",
                    background: "orange",
                    borderRadius: "11px",
                    fontSize: "12px",
                    position: "relative",
                    bottom: "15px",
                    right: "8px",
                    textAlign: "center",
                    paddingTop: "1px",
                  }}
                >
                  {cartData}
                </div>
              </p>
            </a>
          ) : (
            <a
              href="/cart"
              onClick={() => ".navbar-collapse".collapse("hide")}
              style={{ textDecoration: "none" }}
            >
              {" "}
              <p
                className="ghostItem"
                style={{
                  borderTopRightRadius: "22px",
                  borderBottomRightRadius: "22px",
                }}
              >
                <img
                  src={Shoppingcart}
                  style={{
                    color: "black",
                    fontWeight: "bolder",
                    fontSize: "25px",
                    height: "22px",
                  }}
                />
                <div
                  style={{
                    color: "black",
                    display: "inline-block",
                    width: "20px",
                    height: "17px",
                    background: "orange",
                    borderRadius: "11px",
                    fontSize: "12px",
                    position: "relative",
                    bottom: "15px",
                    right: "8px",
                    textAlign: "center",
                    paddingTop: "1px",
                  }}
                >
                  {cardstate ? cardstate : 0}
                </div>
              </p>
            </a>
          )}
        </div>
        <div className="revealGhostItems">
          <Navbar className="cont" expand={false}>
            <Container fluid>
              {/* <a href="/cart"><span><FontAwesomeIcon icon={faCartShopping} style={{color:"black",fontWeight:"bolder",fontSize:"30px"}}/><div style={{color:"black",display:"inline-block",width:"20px",height:"20px",background:"orange",borderRadius:"11px",fontSize:"15px",position:"relative",bottom:"17px",right:"8px",textAlign:"center"}}>3</div></span></a> */}
              {/* <a href="/cart"><span><FontAwesomeIcon icon={faCartShopping} style={{color:"black",fontWeight:"bolder",fontSize:"30px"}}/></span></a> */}
              {userInfo ? (
                <a
                  href="/cart"
                  onClick={() => ".navbar-collapse".collapse("hide")}
                  style={{ textDecoration: "none" }}
                >
                  {" "}
                  <p style={{ marginBottom: "-6px" }}>
                    <img
                      src={Shoppingcart}
                      style={{
                        color: "black",
                        fontWeight: "bolder",
                        fontSize: "25px",
                      }}
                    />
                    <div
                      style={{
                        color: "black",
                        display: "inline-block",
                        width: "20px",
                        height: "17px",
                        background: "orange",
                        borderRadius: "11px",
                        fontSize: "12px",
                        position: "relative",
                        bottom: "15px",
                        right: "8px",
                        textAlign: "center",
                        paddingTop: "1px",
                      }}
                    >
                      {cartData}
                    </div>
                  </p>
                </a>
              ) : (
                <a
                  href="/cart"
                  onClick={() => ".navbar-collapse".collapse("hide")}
                  style={{ textDecoration: "none" }}
                >
                  {" "}
                  <p style={{ marginBottom: "-6px" }}>
                    <img
                      src={Shoppingcart}
                      style={{
                        color: "black",
                        fontWeight: "bolder",
                        fontSize: "25px",
                      }}
                    />
                    <div
                      style={{
                        color: "black",
                        display: "inline-block",
                        width: "20px",
                        height: "17px",
                        background: "orange",
                        borderRadius: "11px",
                        fontSize: "12px",
                        position: "relative",
                        bottom: "15px",
                        right: "8px",
                        textAlign: "center",
                        paddingTop: "1px",
                        paddingBottom: "1px",
                      }}
                    >
                      {cardstate ? cardstate : 0}
                    </div>
                  </p>
                </a>
              )}
              <Navbar.Toggle href="#" className="menu" onClick={handleToggle}>
                <span>
                  <div className="circle">
                    <FontAwesomeIcon
                      style={{
                        fontSize: "18px",
                        paddingTop: "9px",
                        fontWeight: "lighter",
                        paddingBottom: "9px",
                      }}
                      icon={isOpen ? faMinus : faPlus}
                    />
                  </div>
                </span>
              </Navbar.Toggle>

              <Navbar.Offcanvas
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
                placement="end"
                onHide={() => setIsOpen(false)}
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id="offcanvasNavbarLabel"></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav style={{ textAlign: "left" }}>
                    <div className="dropdown_items_content1">
                      {" "}
                      {!data1?.id ? (
                        <a
                          href="/login"
                          onClick={() => ".navbar-collapse".collapse("hide")}
                          style={{ textDecoration: "none" }}
                        >
                          {" "}
                          <p>
                            <FontAwesomeIcon
                              icon={faUser}
                              style={{ color: "black", fontWeight: "bolder" }}
                            />
                          </p>
                        </a>
                      ) : (
                        <a
                          href="#"
                          onClick={() => ".navbar-collapse".collapse("hide")}
                          style={{ textDecoration: "none" }}
                        >
                          <NavDropdown
                            onToggle={handleDropdownToggle00}
                            style={{ textDecoration: "none" }}
                            title={
                              <div>
                                <img
                                  src="https://cdn4.iconfinder.com/data/icons/business-office-and-internet-3-10/65/129-512.png"
                                  width="25px"
                                  height="25px"
                                  style={{ borderRadius: "10px" }}
                                ></img>
                              </div>
                            }
                            id="basic-nav-dropdown"
                          >
                            <div
                              className={`dropdown_items_content1 ${
                                isDropdownOpen00 ? "active" : ""
                              }`}
                            >
                              <NavDropdown.Item
                                style={{
                                  fontSize: "16px",
                                  color: "black",
                                  paddingLeft: "0px",
                                }}
                                href="/account"
                              >
                                Profile
                              </NavDropdown.Item>
                              <NavDropdown.Item
                                style={{
                                  fontSize: "16px",
                                  color: "black",
                                  paddingLeft: "0px",
                                }}
                                href="/"
                                onClick={logout}
                              >
                                <Link to="/">Logout</Link>
                              </NavDropdown.Item>
                              {userIsAdmin === true ? (
                                <NavDropdown
                                  title="Admin"
                                  style={{ fontSize: "13px" }}
                                  id="basic-nav-dropdown"
                                >
                                  <NavDropdown.Item href="/admin/productlist">
                                    Products
                                  </NavDropdown.Item>
                                  <NavDropdown.Item href="/admin/userlist">
                                    Users
                                  </NavDropdown.Item>
                                  <NavDropdown.Item href="/admin/orderlist">
                                    Orders
                                  </NavDropdown.Item>
                                  <NavDropdown.Item href="/admin/unpaidorders">
                                    Unpaid orders
                                  </NavDropdown.Item>
                                  <NavDropdown.Item href="/admin/ambassadorslist">
                                    Ambassadors
                                  </NavDropdown.Item>
                                  {/* <NavDropdown.Item href="/admin/contactlist">
                                    Contacts
                                  </NavDropdown.Item> */}
                                  <NavDropdown.Item href="/admin/Subscriptionlist">
                                    Subscriptions
                                  </NavDropdown.Item>
                                  <NavDropdown.Item href="/admin/unsubscibesurveylist">
                                    Unsubscribe reasons
                                  </NavDropdown.Item>
                                  <NavDropdown.Item href="/admin/veteranList">
                                    Veterans
                                  </NavDropdown.Item>
                                  <NavDropdown.Item href="/admin/employeeList">
                                    Employees, F&F
                                  </NavDropdown.Item>
                                  <NavDropdown.Item href="/admin/discount">
                                    Discounts
                                  </NavDropdown.Item>
                                  <NavDropdown.Item href="/admin/couponlist">
                                    Coupons
                                  </NavDropdown.Item>
                                  <NavDropdown.Item href="/admin/logs">
                         Log
                          </NavDropdown.Item>
                                  <NavDropdown.Item href="/admin/editshippingprice">
                                    Edit Shipping Price
                                  </NavDropdown.Item>
                                  <NavDropdown.Item href="/admin/news">
                        News
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/admin/AmbassdorsTestimonialList">
                        Ambassador Testimonials
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/admin/ratingreview">
                        Reviews
                      </NavDropdown.Item>
                                </NavDropdown>
                              ) : (
                                <NavDropdown.Item
                                  style={{ display: "none" }}
                                ></NavDropdown.Item>
                              )}
                            </div>
                          </NavDropdown>{" "}
                        </a>
                      )}
                    </div>
                    <a
                      onClick={() => ".navbar-collapse".collapse("hide")}
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className={`dropdown_items_content1 ${
                          isDropdownOpen44 ? "active" : ""
                        }`}
                      >
                        {!data1?.id ? (
                          <NavDropdown.Item
                            style={{ display: "none" }}
                          ></NavDropdown.Item>
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <NavDropdown
                              title={
                                <div style={{ display: "flex" }}>
                                  <div style={{ marginRight: "148px" }}>
                                    Account
                                  </div>
                                  <div style={{ marginLeft: "110px" }}>
                                    {" "}
                                    <FontAwesomeIcon
                                      icon={
                                        isDropdownOpen44
                                          ? faAngleUp
                                          : faAngleDown
                                      }
                                    />
                                  </div>
                                </div>
                              }
                              id="basic-nav-dropdown"
                              onToggle={handleDropdownToggle44}
                            >
                              <NavDropdown.Item
                                href="./order"
                                style={{
                                  color: "black",
                                  fontSize: "16px",
                                  paddingLeft: "0px",
                                }}
                              >
                                {" "}
                                Orders{" "}
                              </NavDropdown.Item>
                              <NavDropdown.Item
                                href="/billing"
                                style={{
                                  color: "black",
                                  fontSize: "16px",
                                  paddingLeft: "0px",
                                }}
                              >
                                {" "}
                                Payment and Shipping{" "}
                              </NavDropdown.Item>
                              <NavDropdown.Item
                                href="/subscription"
                                style={{
                                  color: "black",
                                  fontSize: "16px",
                                  paddingLeft: "0px",
                                }}
                              >
                                {" "}
                                Subscriptions{" "}
                              </NavDropdown.Item>
                              <NavDropdown.Item
                                href="/reward"
                                style={{
                                  color: "black",
                                  fontSize: "16px",
                                  paddingLeft: "0px",
                                }}
                              >
                                Rewards{" "}
                              </NavDropdown.Item>
                              <NavDropdown.Item
                                href="/refer"
                                style={{
                                  color: "black",
                                  fontSize: "16px",
                                  paddingLeft: "0px",
                                }}
                              >
                                {" "}
                                Refer a Friend{" "}
                              </NavDropdown.Item>
                              <NavDropdown.Item
                                href="/account"
                                style={{
                                  color: "black",
                                  fontSize: "16px",
                                  paddingLeft: "0px",
                                }}
                              >
                                {" "}
                                Account Setting{" "}
                              </NavDropdown.Item>
                            </NavDropdown>{" "}
                          </div>
                        )}
                      </div>
                    </a>
                    <a
                      onClick={() => ".navbar-collapse".collapse("hide")}
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className={`dropdown_items_content1 ${
                          isDropdownOpen11 ? "active" : ""
                        }`}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <NavDropdown
                            title={
                              <div style={{ display: "flex" }}>
                                <div style={{ marginRight: "148px" }}>
                                  About
                                </div>
                                <div style={{ marginLeft: "130px" }}>
                                  {" "}
                                  <FontAwesomeIcon
                                    icon={
                                      isDropdownOpen11 ? faAngleUp : faAngleDown
                                    }
                                  />
                                </div>
                              </div>
                            }
                            id="basic-nav-dropdown"
                            onToggle={handleDropdownToggle11}
                          >
                            <NavDropdown.Item
                              style={{
                                fontSize: "16px",
                                color: "black",
                                paddingLeft: "0px",
                              }}
                              href=" https://blog.tectonlife.com/true-purpose"
                            >
                              Purpose
                            </NavDropdown.Item>
                            <NavDropdown.Item
                              style={{
                                fontSize: "16px",
                                color: "black",
                                paddingLeft: "0px",
                              }}
                              href=" https://blog.tectonlife.com/benefits-of-exogenous-ketones/"
                            >
                              Exogenous Ketones
                            </NavDropdown.Item>
                          </NavDropdown>
                        </div>
                      </div>
                    </a>
                    <div
                      className={`dropdown_items_content1 ${
                        isDropdownOpen22 ? "active" : ""
                      }`}
                    >
                      <a onClick={() => ".navbar-collapse".collapse("hide")}>
                        {" "}
                        <NavDropdown
                          title={
                            <div style={{ display: "flex" }}>
                              <div style={{ marginRight: "132px" }}>
                                Science
                              </div>
                              <div style={{ marginLeft: "130px" }}>
                                {" "}
                                <FontAwesomeIcon
                                  icon={
                                    isDropdownOpen22 ? faAngleUp : faAngleDown
                                  }
                                />
                              </div>
                            </div>
                          }
                          id="basic-nav-dropdown"
                          onToggle={handleDropdownToggle22}
                        >
                          <NavDropdown.Item
                            style={{
                              fontSize: "16px",
                              color: "black",
                              paddingLeft: "0px",
                            }}
                            href=" https://blog.tectonlife.com/science"
                          >
                            Tecton Science
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            style={{
                              fontSize: "16px",
                              color: "black",
                              paddingLeft: "0px",
                            }}
                            href=" https://blog.tectonlife.com/are-ketones-better-than-glucose-as-an-energy-source/"
                          >
                            Ketones vs Glucose
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            style={{
                              fontSize: "16px",
                              color: "black",
                              paddingLeft: "0px",
                            }}
                            href=" https://blog.tectonlife.com/pkstudy"
                          >
                            PK Study
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            style={{
                              fontSize: "16px",
                              color: "black",
                              paddingLeft: "0px",
                            }}
                            href=" https://blog.tectonlife.com/can-ketones-help-mitigate-concussions/"
                          >
                            Ketones and Concussions
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            style={{
                              fontSize: "16px",
                              color: "black",
                              paddingLeft: "0px",
                            }}
                            href=" https://blog.tectonlife.com/ketone-salts-vs-ketone-esters/"
                          >
                            Ketone Salts vs. Ketone Esters
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            style={{
                              fontSize: "16px",
                              color: "black",
                              paddingLeft: "0px",
                            }}
                            href=" https://blog.tectonlife.com/what-can-you-drink-during-intermittent-fasting/"
                          >
                            What Can You Drink During
                            <br /> Intermittent Fasting?
                          </NavDropdown.Item>
                          <NavDropdown.Item
                           style={{
                            fontSize: "16px",
                            color: "black",
                            paddingLeft: "0px",
                          }}
                           href="https://blog.tectonlife.com/science/#faqs">
                 FAQs
                </NavDropdown.Item>
                        </NavDropdown>
                      </a>
                    </div>
                    <div
                      className={`dropdown_items_content1 ${
                        isDropdownOpen33 ? "active" : ""
                      }`}
                    >
                      <a
                        onClick={() => ".navbar-collapse".collapse("hide")}
                        style={{ textDecoration: "none" }}
                      >
                        {" "}
                        <NavDropdown
                          title={
                            <div style={{ display: "flex" }}>
                              <div style={{ marginRight: "130px" }}>
                                Ambassadors
                              </div>
                              <div style={{ marginLeft: "80px" }}>
                                {" "}
                                <FontAwesomeIcon
                                  icon={
                                    isDropdownOpen33 ? faAngleUp : faAngleDown
                                  }
                                />
                              </div>
                            </div>
                          }
                          id="basic-nav-dropdown"
                          onToggle={handleDropdownToggle33}
                        >
                          <NavDropdown.Item
                            style={{
                              fontSize: "17px",
                              color: "black",
                              paddingLeft: "0px",
                            }}
                            href="https://blog.tectonlife.com/ambassador"
                          >
                            View{" "}
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            style={{
                              fontSize: "17px",
                              color: "black",
                              paddingLeft: "0px",
                            }}
                            href="/ambassador"
                          >
                            Join Us
                          </NavDropdown.Item>
                        </NavDropdown>
                      </a>
                    </div>
                    <div className="dropdown_items_content1">
                      <a
                        href="/shop"
                        onClick={() => ".navbar-collapse".collapse("hide")}
                        className="listItem"
                      >
                        Shop
                      </a>
                      <br />
                      <a
                        href="https://blog.tectonlife.com"
                        onClick={() => ".navbar-collapse".collapse("hide")}
                        className="listItem"
                      >
                        Blog{" "}
                      </a>
                      <br />
                      <a
                        href=" https://blog.tectonlife.com/contact-us/."
                        onClick={() => ".navbar-collapse".collapse("hide")}
                        className="listItem"
                      >
                        Contact
                      </a>
                      <br />
                    </div>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        </div>
      </div>
    </div>
  );
};

export default Header;
