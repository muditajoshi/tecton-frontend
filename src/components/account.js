import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../css/account.css";
import DatalistInput from "react-datalist-input";
import "react-datalist-input/dist/styles.css";
import { Link } from "react-router-dom";
import LOGOORANGE from "../images/side by side.png";
import LOGOSIDE from "../images/beta site.png";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Logo from "../images/newlogo_tecton.png";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Shoppingcart from "../images/Group 13.png";
import Userlogo from "../images/Group 12.png";
import { faPlus, faMinus, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import {
  Form,
  Button,
  Row,
  InputGroup,
  Col,
  Card,
  Table,
  Image,
  FloatingLabel,
  NavDropdown,
  Navbar,
  Nav,
  Offcanvas,
  Container,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {
  sendVerficationEmail,
  getUserDetails,
  updateUserProfile,
  refreshLogin,
  updateUser,
} from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import { USER_PROFILE_UPDATE_RESET } from "../constants/userConstants";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import getDateString from "../utils/getDateString";
// import LOGOORANGE from '../images/Tecton side by side white logo.png';
// import LOGOSIDE from "../images/Tecton side by side white logo.png"
import { useForm } from "react-hook-form";

import { Input } from "./Input";
import useDocumentTitle from "./useDocumentTitle";
const Account = ({ history }) => {
  useDocumentTitle("My account - Tecton");
  const data = localStorage.getItem("userInfo");
  const data1 = JSON.parse(data);
  const inputFile = useRef(null);
  const userDetails = useSelector((state) => state?.userDetails);
  const { loading, user, error } = userDetails;
  // console.log(user);
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      // if user is null, first fetch it and then set its details to the local state
      if (!user || !user?.firstName || !user?.lastName || !email || success) {
        dispatch(listMyOrders());
        dispatch({ type: USER_PROFILE_UPDATE_RESET });
        userInfo
          ? userInfo.isSocialLogin
            ? dispatch(getUserDetails(userInfo.id))
            : dispatch(getUserDetails("profile"))
          : dispatch(getUserDetails("profile"));
        if (success) {
          userInfo.isSocialLogin
            ? dispatch(getUserDetails(userInfo.id))
            : dispatch(getUserDetails("profile"));
        }
      } else {
        setFirstName(user?.firstName);
        setLastName(user?.lastName);
        setPhoneNo(user?.phoneNo);
        setCity(user?.city);
        setAddress1(user?.address1);
        setAddress2(user?.address2);
        setZip(user?.zip);
        setState(user?.state);
        setCountry(user.country);
        setEmail(user?.email);
        setAvatar(user?.avatar);
      }
    }
  }, []);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [totalItems, setTotalItems] = useState(0);
  // console.log(userInfo);
  const [showSubmitButton, setShowSubmitButton] = useState(false); // sisable the submit button unless some user detail is changed by user

  const [firstName, setFirstName] = useState(userInfo?.firstName);
  const [lastName, setLastName] = useState(userInfo?.lastName);

  const [email, setEmail] = useState();
  const [avatar, setAvatar] = useState();
  const [message, setMessage] = useState(null);
  const [allOrders, setAllOrders] = useState([]);
  const [phoneNo, setPhoneNo] = useState(userInfo?.phoneNo || userInfo?.phone);
  const [address1, setAddress1] = useState(userInfo?.shippingAddress?.address1);
  const [address2, setAddress2] = useState(userInfo?.shippingAddress?.address2);
  const [city, setCity] = useState(userInfo?.shippingAddress?.city);
  const [state, setState] = useState(userInfo?.shippingAddress?.state);
  const [country, setCountry] = useState("United States");
  const [zip, setZip] = useState(userInfo?.shippingAddress?.zip);
  const [alert, setAlert] = useState();
  const [uploading, setUploading] = useState(false);
  const [errorImageUpload, setErrorImageUpload] = useState("");
  const [extra, setExtra] = useState();
  const dispatch = useDispatch();
  // console.log(extra);
  const userProfileUpdate = useSelector((state) => state.userProfileUpdate);
  const { success } = userProfileUpdate;

  const orderListUser = useSelector((state) => state.orderListUser);
  const {
    loading: loadingOrdersList,
    orders,
    error: errorOrdersList,
  } = orderListUser;

  // check whether verification email has to be sent
  const userSendEmailVerfication = useSelector(
    (state) => state.userSendEmailVerfication
  );
  const { emailSent, hasError } = userSendEmailVerfication;
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

  // refresh access token for user details error
  useEffect(() => {
    if (error && userInfo && !userInfo.isSocialLogin) {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user && dispatch(refreshLogin(user.email));
    }
  }, []);

  // set orders to local state
  useEffect(() => {
    if (orders && orders.length) {
      setAllOrders([...orders]);
    }
  }, [orders]);

  // check if any of the input fields value is changed, only then show the submit button
  useEffect(() => {
    if (userInfo) {
      if (email && userInfo.email !== email) setShowSubmitButton(true);
      else setShowSubmitButton(false);
    }
  }, []);

  useEffect(() => {
    dispatch(listMyOrders());
  }, []);

  //   const showHidePassword = (e) => {
  //     e.preventDefault();
  //     e.stopPropagation();
  //     setTypePassword(typePassword === "password" ? "text" : "password");
  //   };

  //   const showHideConfirmPassword = (e) => {
  //     e.preventDefault();
  //     e.stopPropagation();
  //     setTypeConfirmPassword(
  //       typeConfirmPassword === "password" ? "text" : "password"
  //     );
  //   };

  // handle file upload to aws bucket
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);
      setAvatar(data);
      dispatch(
        updateUserProfile({
          id: user.id,
          avatar: data,
        })
      );
      setUploading(false);
    } catch (error) {
      setErrorImageUpload("Please choose a valid image");
      setUploading(false);
    }
  };
  const { errors } = useForm();

  const dataSource = [
    "Alaska",
    "Alabama",
    "Arkansas",
    "American Samoa",
    "Arizona",
    "California",
    "Colorado",
    "Connecticut",
    "District of Columbia",
    "Delaware",
    "Florida",
    "Georgia",
    "Guam",
    "Hawaii",
    "Iowa",
    "Idaho",
    "Illinois",
    "Indiana",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Massachusetts",
    "Maryland",
    "Maine",
    "Michigan",
    "Minnesota",
    "Missouri",
    "Mississippi",
    "Montana",
    "North Carolina",
    "North Dakota",
    "Nebraska",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "Nevada",
    "New York",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Puerto Rico",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Virginia",
    "Virgin Islands",
    "Vermont",
    "Washington",
    "Wisconsin",
    "West Virginia",
    "Wyoming",
  ];
  const handleOnChange = (e) => {
    const val = e.target.value;
    setState(val);
  };

  const dataSource1 = ["United States"];
  const handleOnChange1 = (e) => {
    const val = e.target.value;
    setCountry("United States");
  };

  // handle image overlay div's click to upload new file
  const handleImageClick = () => {
    inputFile.current.click();
  };

  // update user details
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${process.env.REACT_APP_PROXY_URL}/api/avalara/validate-address`, {
      billingAddress: {
        address: address1,

        city: city,

        state: state,

        postalCode: zip,

        firstName: firstName,

        lastName: lastName,

        email: user?.email,
      },
    }).then(()=>{
      dispatch(
        updateUserProfile({
          id: user.id,
          firstName,
          lastName,
          email,
          phoneNo,
          city,
          country,
          address1,
          address2,
          zip,
          state,
          joinTheExtClub: extra,
          avatar,
        })
      );
      setAlert(
        <div class="alert alert-info " role="alert">
          Your profile has been updated.
        </div>
      );
    }).catch((error)=>{setAlert(
      <div class="alert alert-danger " role="alert">
        {error?.response?.data?.message}
      </div>
    )})
  };

  const logout = () => {
    history.push("/");
    localStorage.removeItem("userInfo");
    localStorage?.removeItem("cartItems");
    localStorage?.removeItem("subscriptionItems");
    window.location.reload(false);
  };
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
  const updateData = (e) => {
    e.preventDefault();
    axios
      .put(
        `${process.env.REACT_APP_PROXY_URL}/api/users/profile`,
        {
          id: user.id,
          firstName,
          lastName,
          email,
          phoneNo,
          city,
          country,
          address1,
          address2,
          zip,
          state,
          joinTheExtClub: extra,
          avatar,
        },
        config
      )
      .then((res) => {
        // console.log(res);
        setFirstName(res?.data?.firstName);
        setLastName(res?.data?.lastName);
        setEmail(res?.data?.email);
        setPhoneNo(res?.data?.phoneNo);
        setAddress1(res?.data?.address1);
        setAddress2(res?.data?.address2);
        setState(res?.data?.state);
        setCity(res?.data?.city);
        setCountry("United States");
        setZip(res?.data?.zip);

        setAlert(
          <div class="alert alert-info " role="alert">
            Your profile has been updated.
          </div>
        );
      });
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
  let itemsParent = [
    { value1: "AK", value: "Alaska" },
    { value1: "AL", value: "Alabama" },
    { value1: "AR", value: "Arkansas" },
    { value1: "AZ", value: "Arizona" },
    { value1: "CA", value: "California" },
    { value1: "CO", value: "Colorado" },
    { value1: "CT", value: "Connecticut" },
    { value1: "DC", value: "DistrictofColumbia" },
    { value1: "DE", value: "Delaware" },
    { value1: "FL", value: "Florida" },
    { value1: "GA", value: "Georgia" },
    { value1: "HI", value: "Hawaii" },
    { value1: "IA", value: "Iowa" },
    { value1: "ID", value: "Idaho" },
    { value1: "IL", value: "Illinois" },
    { value1: "IN", value: "Indiana" },
    { value1: "KS", value: "Kansas" },
    { value1: "KY", value: "Kentucky" },
    { value1: "LA", value: "Louisiana" },
    { value1: "MA", value: "Massachusetts" },
    { value1: "MD", value: "Maryland" },
    { value1: "ME", value: "Maine" },
    { value1: "MI", value: "Michigan" },
    { value1: "MN", value: "Minnesota" },
    { value1: "MO", value: "Missouri" },
    { value1: "MS", value: "Mississippi" },
    { value1: "MT", value: "Montana" },
    { value1: "NC", value: "NorthCarolina" },
    { value1: "ND", value: "NorthDakota" },
    { value1: "NE", value: "Nebraska" },
    { value1: "NH", value: "NewHampshire" },
    { value1: "NJ", value: "NewJersey" },
    { value1: "NM", value: "NewMexico" },
    { value1: "NV", value: "Nevada" },
    { value1: "NY", value: "NewYork" },
    { value1: "OH", value: "Ohio" },
    { value1: "OK", value: "Oklahoma" },
    { value1: "OR", value: "Oregon" },
    { value1: "PA", value: "Pennsylvania" },
    { value1: "RI", value: "RhodeIsland" },
    { value1: "SC", value: "SouthCarolina" },
    { value1: "SD", value: "SouthDakota" },
    { value1: "TN", value: "Tennessee" },
    { value1: "TX", value: "Texas" },
    { value1: "UT", value: "Utah" },
    { value1: "VA", value: "Virginia" },
    { value1: "VT", value: "Vermont" },
    { value1: "WA", value: "Washington" },
    { value1: "WI", value: "Wisconsin" },
    { value1: "WV", value: "WestVirginia" },
    { value1: "WY", value: "Wyoming" },
  ];
  let items = [
    {
      value1: `${userInfo?.shippingAddress?.state}`,
      value: itemsParent.filter(
        (vals) => vals?.value1 === userInfo?.shippingAddress?.state
      )[0]?.value,
    },
    { value1: "AK", value: "Alaska" },
    { value1: "AL", value: "Alabama" },
    { value1: "AR", value: "Arkansas" },
    { value1: "AZ", value: "Arizona" },
    { value1: "CA", value: "California" },
    { value1: "CO", value: "Colorado" },
    { value1: "CT", value: "Connecticut" },
    { value1: "DC", value: "DistrictofColumbia" },
    { value1: "DE", value: "Delaware" },
    { value1: "FL", value: "Florida" },
    { value1: "GA", value: "Georgia" },
    { value1: "HI", value: "Hawaii" },
    { value1: "IA", value: "Iowa" },
    { value1: "ID", value: "Idaho" },
    { value1: "IL", value: "Illinois" },
    { value1: "IN", value: "Indiana" },
    { value1: "KS", value: "Kansas" },
    { value1: "KY", value: "Kentucky" },
    { value1: "LA", value: "Louisiana" },
    { value1: "MA", value: "Massachusetts" },
    { value1: "MD", value: "Maryland" },
    { value1: "ME", value: "Maine" },
    { value1: "MI", value: "Michigan" },
    { value1: "MN", value: "Minnesota" },
    { value1: "MO", value: "Missouri" },
    { value1: "MS", value: "Mississippi" },
    { value1: "MT", value: "Montana" },
    { value1: "NC", value: "NorthCarolina" },
    { value1: "ND", value: "NorthDakota" },
    { value1: "NE", value: "Nebraska" },
    { value1: "NH", value: "NewHampshire" },
    { value1: "NJ", value: "NewJersey" },
    { value1: "NM", value: "NewMexico" },
    { value1: "NV", value: "Nevada" },
    { value1: "NY", value: "NewYork" },
    { value1: "OH", value: "Ohio" },
    { value1: "OK", value: "Oklahoma" },
    { value1: "OR", value: "Oregon" },
    { value1: "PA", value: "Pennsylvania" },
    { value1: "RI", value: "RhodeIsland" },
    { value1: "SC", value: "SouthCarolina" },
    { value1: "SD", value: "SouthDakota" },
    { value1: "TN", value: "Tennessee" },
    { value1: "TX", value: "Texas" },
    { value1: "UT", value: "Utah" },
    { value1: "VA", value: "Virginia" },
    { value1: "VT", value: "Vermont" },
    { value1: "WA", value: "Washington" },
    { value1: "WI", value: "Wisconsin" },
    { value1: "WV", value: "WestVirginia" },
    { value1: "WY", value: "Wyoming" },
  ];

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

  return (
    <div class="acc">
      <form onSubmit={handleSubmit}>
        <div class="Act">
       
        <Row className="mt-2">
          {userInfo && !userInfo.isConfirmed ? (
            <>
              <Card style={{ margin: "0" }} className="mb-3">
                <Card.Body className="ps-0 ">
                  <Card.Title style={{ fontWeight: "bold" }}>
                    Account Not Verified
                  </Card.Title>
                  <Card.Text>
                    {`${user?.firstName}, `} your account is not yet verfied.
                    Please{" "}
                    <Button
                      variant="link"
                      className="p-0"
                      style={{
                        fontSize: "0.9em",
                        margin: "0 0 0.1em 0",
                        focus: "none",
                      }}
                      onClick={() =>
                        dispatch(sendVerficationEmail(userInfo.email))
                      }
                    >
                      click here
                    </Button>{" "}
                    to send a verfication email.
                  </Card.Text>
                </Card.Body>
              </Card>
            </>
          ) : null}
          <Col
            md={3}
            style={
              userInfo && !userInfo.isConfirmed
                ? {
                    opacity: "0.5",
                    pointerEvents: "none",
                  }
                : {
                    opacity: "1",
                    pointerEvents: "",
                  }
            }
          ></Col>
        </Row>
        <div class="row" style={{ fontFamily: "aktiv" }}>
          <div class="col-sm-4">
            <div class="contact-info">
              <div id="dep1">
                <ul class="menu-account">
                  <li>
                    <a href="/order">ORDERS</a>
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
                    <a style={{ color: "orange" }} href="/account">
                      ACCOUNT SETTINGS
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
          <div class="col-sm-8">
            <div class="my-acc">
              <h3 class="aci">My Account</h3>
              {/* <a style={{color:"orange",textDecoration:"none"}} href="/login"> <h5 style={{marginLeft:"12px"}} onClick={logout}>Logout</h5></a> */}
              {/* <a style={{color:"orange",textDecoration:"none"}} > <h5 style={{marginLeft:"12px"}}><select>
							<option><a href="admin/productlist">product</a>
							
								</option></select></h5></a> */}
              {/* <a href="admin/productlist">product</a> */}
              {/* {user?.isAdmin===true?<Link to="admin/productlist">Product List Page</Link>:""} */}

              <div
                class="sdn"
                style={{ paddingLeft: "12px", paddingBottom: "10px" }}
              >
                <img
                  // src={user?.avatar}
                  src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-default-avatar-profile-icon-vector-social-media-user-image-vector-illustration-227787227.jpg"
                  alt=""
                  height="80px"
                  width="80px"
                  style={{ borderRadius: "40px" }}
                />
              </div>

              {/* <div class="upim">Update image</div> */}

              <div>
                <p class="ac-info">Account Information</p>
              </div>
            </div>
            <div class="detail-ship-account">
              <div class="col-cvv account_placeholder">
                <input
                  type="text"
                  class="form-control-ship-exp-acc "
                  placeholder="First name"
                  id="fname"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  class="form-control-ship-exp-acc "
                  placeholder="Last name"
                  id="fname"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div class="col">
                <input
                  disabled
                  value={user?.email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  class="form-control-ship-acc "
                  placeholder="Email"
                  id="fname"
                  name="email"
                />
              </div>

              <div class="col">
                <input
                  class="form-control-ship-acc "
                  placeholder="Phone Number"
                  value={phoneNo}
                  type="text"
                  pattern="^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$"
                  title="Please Enter valid Phone number"
                  name="phone number"
                  // onInput={(e) => {
                  //   if (e.target.value.length > e.target.maxLength)
                  //     e.target.value = e.target.value.slice(
                  //       0,
                  //       e.target.maxLength
                  //     );
                  // }}
                  // maxlength={11}
                  required
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
              </div>
              <br />
              <div class="join-extra">
                <input class="tik-tack" type="checkbox" />
                &nbsp; Join the (extra)Ordinary club for info & offers
              </div>

              <br />
              <div class="col">
                <input
                  type="text"
                  class="form-control-ship-acc "
                  placeholder="Street Address"
                  id="fname"
                  name="streetaddress"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                />
              </div>

              <div class="col">
                <input
                  type="text"
                  class="form-control-ship-acc "
                  placeholder="Apt #,suite,etc.(optional)"
                  id="fname"
                  name="fname"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                />
              </div>

              <div class="col">
                <input
                  type="text"
                  class="form-control-ship-acc "
                  placeholder="City"
                  id="fname"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div class="col-cvv">
                {/* <Input
            style={{width:"39.5%"}}
        type="text"
        placeholder="State"
        // name="gameType"
        required={true}
        // autoComplete="on"
        // {...register('gameType', { required: true })}
        // error={errors.gameType}
        list="gameList"
        onChange={handleOnChange}
        value={state}
      />
      <datalist id="gameList">
        {dataSource.map(item => (
          <option key={item} value={item} />
        ))}
      </datalist> */}
                <select
                  class="form-control-ship-acc"
                  style={{ lineHeight: "1.5rem" }}
                  onChange={(e) => setState(e.target.value)}
                >
                  {items.map((valuess) => (
                    <option value={valuess.value1}>{valuess.value}</option>
                  ))}
                </select>
                <input
                  class="form-control-ship-acc "
                  style={{ marginTop: "8px" }}
                  placeholder="Zip Code"
                  type="text"
                  pattern="[0-9]*"
                  name="zip code"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                />
              </div>

              <div class="col">
                <Input
                  style={{ width: "39%", height: "35px" }}
                  type="text"
                  placeholder="Country"
                  // name="gameType"
                  required={true}
                  // autoComplete="on"
                  // {...register('gameType', { required: true })}
                  // error={errors.gameType}
                  list="gameList1"
                  onChange={handleOnChange1}
                  value={country}
                />
                <datalist id="gameList1">
                  {dataSource1.map((item) => (
                    <option key={item} value={item} />
                  ))}
                </datalist>
              </div>

              <div class="acc-group">
                <input
                  class=" btn-btn-default"
                  type="submit"
                  value="SAVE"
                ></input>
                <br />
                <br />
                <div style={{ width: "73.5%" }}>{alert}</div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </form>
    </div>
  
  );

};

export default Account;
