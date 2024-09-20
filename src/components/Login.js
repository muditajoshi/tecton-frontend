import React from "react";
import { useSelector, useDispatch } from "react-redux";
import LOGOORANGE from "../images/Tecton side by side white logo.png";
import LOGOSIDE from "../images/Tecton side by side white logo.png";
import TECHW from "../images/TECHW.png";
import "../css/Login.css";
import { Link , useHistory} from "react-router-dom";
import { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import axios from "axios";
import countryList from "react-select-country-list";
import Select from "react-select";
import DatalistInput from "react-datalist-input";
import "react-datalist-input/dist/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import BEGREAT from "../images/BEGREAT.png";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Logo from "../images/Tecton side by side white logo.png";
import { loginUser } from "../actions/userActions";
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
} from "../constants/userConstants";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Loader from "../skeleton/Loader";
import {
  Navbar,
  Container,
  NavDropdown,
  Offcanvas,
  Nav,
} from "react-bootstrap";
import Google from "../images/search.png";
import facebook from "../images/facebook.png";
import twitter from "../images/twitter.png";
import instagaram from "../images/instagram.png";
import useDocumentTitle from "./useDocumentTitle";
import ScrollToTop from "./ScrollToTop";
import OverlayEditSub from "../skeleton/OverlayEditSub";
import { incNumber } from "../actions/cartUpdateActions";
const data = localStorage.getItem("userInfo");
const data1 = JSON.parse(data);
const logout = () => {
  localStorage.removeItem("userInfo");
  window.location.reload(false);
};

function Login({ location, history, match }) {


  console.log(match?.params?.id);
  useDocumentTitle("Login - Tecton");
  const [authFailedMsg, setAuthFailedMsg] = useState(""); // if user tried to login with different social account after registering with some other social account
  const [showRedirectMsg, setShowRedirectMsg] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [showLoading, setShowLoading] = useState(false); // to display loader after user submits the email to reset password
  const [emailSent, setEmailSent] = useState(false); //to display a message that email is sent to reset password

  const [type, setType] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Error, setError] = useState("");
  const [ErrorMsg, setErrorMsg] = useState("");
  const [myloader, setMyloader] = useState("none");
  const [show, setShow] = useState(false);

  const [overlay, setoverlay] = useState();
  const [localCartHasItems, setLocalCartHasItems] = useState(false);
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "";
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;
  const storedInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (!location.search.includes("success") && userInfo) history.push("/");
  }, [history, redirect, location, userInfo]);

  useEffect(() => {
    const flag = localStorage.getItem("redirectLogin");
    if (flag && flag === "true") {
      setShowRedirectMsg(true);
    } else {
      setShowRedirectMsg(false);
    }
  }, []);
  useEffect(() => {
    // if redirected from confirmation page, fill email and let user fill the password field
    if (
      storedInfo &&
      storedInfo.email &&
      localStorage.getItem("fillEmailOnLoginPage") === "true"
    ) {
      localStorage.removeItem("fillEmailOnLoginPage");
      setEmail(storedInfo.email);
    }
  }, [storedInfo]);

  // to show/hide the password field content
  const showHide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setType(type === "password" ? "text" : "password");
  };

  // login user from email and password
  // const handleSubmit = (e) => {
  // 	e.preventDefault();
  // 	dispatch(loginUser(email, password));
  // };

  //   const myref=useRef();
  //   const[pas,setpas]=useState();
  //  const[mal,setmal]=useState();
  //  const submitForm=(e)=>{
  //   e.preventDefault();
  //   if(myref.current.value){
  //   setpas()}
  //  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setoverlay(<OverlayEditSub />);

    setShow(true);
    setMyloader("block");
    dispatch(loginUser(email, password));
    axios
      .post(`${process.env.REACT_APP_PROXY_URL}/api/users/login`, {
        email: email,
        password: password,
      })
      .then((resp) => {
        setMyloader("none");
        dispatch(incNumber());
         //review rating history
         const returnPage = sessionStorage.getItem("returnPage") || "/";
         history.push(returnPage);
         //review rating history
         window.location.reload(false);
           
      })
      .catch((res) => {
        setShow(false);

        if (res?.response?.data?.message === "user not found") {
          setErrorMsg(
            <span style={{ color: "red" }}>Invalid credentials.</span>
          );
        }

        if (res?.response?.data?.message === "Invalid Password") {
          setErrorMsg(
            <span style={{ color: "red" }}>Invalid credentials.</span>
          );
        }

        if (res?.response?.status == 429) {
          window.alert(res?.response?.data?.message);
        }
      }, setMyloader("none"));

    // console.log(USER_LOGIN_FAILURE)

    // console.log(USER_LOGIN_SUCCESS)
    // if(Error){

    // }
    // setTimeout(() => {
    // 	window.location.reload(false);
    // }, 2000);
    // dispatch(incNumber())
  };
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setShowLoading(true);

    // send the mail to the registered user
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/users/reset", { email }, config);

    if (data) {
      setShowLoading(false);
      setEmailSent(true);
      // store the name in localstorage
      localStorage.setItem("EcommerceUserName", data.name); // store the user name, so that we can use it in the profile page to ask them to confirm email
    }
  };

  // 	useEffect(()=>{
  // 		if(localStorage?.getItem("subscriptionItems") || JSON.parse(localStorage?.getItem("cartItems"))){
  // setLocalCartHasItems(true)
  // 		}
  // 	},[userInfo])

  // useEffect(() => {

  // 	if (localStorage?.getItem("subscriptionItems") && JSON.parse(localStorage?.getItem("cartItems"))) {
  // 		axios.put(`${process.env.REACT_APP_PROXY_URL}/api/cart/${userInfo?.id}/additem`, {

  // 			cartItems: JSON.parse(localStorage?.getItem("cartItems"))?.concat(JSON.parse(localStorage?.getItem("subscriptionItems")))

  // 		}).then((resp) => {
  // 			if (resp) {
  // 				localStorage?.removeItem("cartItems")
  // 				localStorage?.removeItem("subscriptionItems")
  // 				setTimeout(() => {
  // 					dispatch(incNumber())
  // 				}, 2000);
  // 			}
  // 		})
  // 	}

  // 	else if (!localStorage?.getItem("subscriptionItems") && JSON.parse(localStorage?.getItem("cartItems"))) {
  // 		axios.put(`${process.env.REACT_APP_PROXY_URL}/api/cart/${userInfo?.id}/additem`, {

  // 			cartItems: JSON.parse(localStorage?.getItem("cartItems"))

  // 		}).then((resp) => {
  // 			if (resp) {
  // 				localStorage?.removeItem("cartItems")
  // 				localStorage?.removeItem("subscriptionItems")
  // 				setTimeout(() => {
  // 					dispatch(incNumber())
  // 				}, 2000)
  // 			}
  // 		})
  // 	}

  // 	else if (localStorage?.getItem("subscriptionItems") && !JSON.parse(localStorage?.getItem("cartItems"))) {
  // 		axios.put(`${process.env.REACT_APP_PROXY_URL}/api/cart/${userInfo?.id}/additem`, {

  // 			cartItems: JSON.parse(localStorage?.getItem("subscriptionItems"))

  // 		}).then((resp) => {
  // 			if (resp) {
  // 				localStorage?.removeItem("cartItems")
  // 				localStorage?.removeItem("subscriptionItems")
  // 				setTimeout(() => {
  // 					dispatch(incNumber())
  // 				}, 2000)
  // 			}
  // 		})
  // 	}

  // })

  useEffect(() => {
    if (
      localStorage?.getItem("subscriptionItems") &&
      JSON.parse(localStorage?.getItem("cartItems"))
    ) {
      axios
        .put(
          `${process.env.REACT_APP_PROXY_URL}/api/cart/${userInfo?.id}/additem`,
          {
            cartItems: JSON.parse(localStorage?.getItem("cartItems"))?.concat(
              JSON.parse(localStorage?.getItem("subscriptionItems"))
            ),
          }
        )
        .then((resp) => {
          if (resp) {
            window.location.reload(false);
          }
        });
    } else if (
      !localStorage?.getItem("subscriptionItems") &&
      JSON.parse(localStorage?.getItem("cartItems"))
    ) {
      axios
        .put(
          `${process.env.REACT_APP_PROXY_URL}/api/cart/${userInfo?.id}/additem`,
          {
            cartItems: JSON.parse(localStorage?.getItem("cartItems")),
          }
        )
        .then((resp) => {
          if (resp) {
            window.location.reload(false);
          }
        });
    } else if (
      localStorage?.getItem("subscriptionItems") &&
      !JSON.parse(localStorage?.getItem("cartItems"))
    ) {
      axios
        .put(
          `${process.env.REACT_APP_PROXY_URL}/api/cart/${userInfo?.id}/additem`,
          {
            cartItems: JSON.parse(localStorage?.getItem("subscriptionItems")),
          }
        )
        .then((resp) => {
          if (resp) {
            window.location.reload(false);
          }
        });
    }
  });

  return (
    <>
      <ScrollToTop />
      <div
        className="Login container"
        style={{ fontFamily: "aktiv", fontSize: "0.9rem" }}
      >
        {show ? overlay : <></>}

        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label
              for="exampleInputEmail1"
              class="form-label"
              style={{ color: "orange" }}
            >
              <h3>
                <b>Login</b>
              </h3>
            </label>
          </div>
          <div class="mb-2">
            <label for="exampleInputPassword1" class="form-label">
              <b>Welcome back!</b>
            </label>
          </div>
          <div class="mb-4  ">
            <label for="exampleInputPassword1" class="form-label">
              We value you as a Tecton® customer. Thank you for being
              (extra)ordinary.
            </label>
          </div>
          {ErrorMsg}
          <div class="col-lg-5 col-sm-12">
            Email
            <input
              placeholder="Enter Email Address"
              // type='email'
              value={email}
              // title="username@xyz.com"
              required
              // pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
              onChange={(e) => setEmail(e.target.value)}
              id="inputPassword6"
              class="form-control"
              aria-describedby="passwordHelpInline"
            />
          </div>
          <br />
          <div class="col-lg-5 col-sm-12">
            Password
            <input
              type={type}
              placeholder="Enter your password"
              value={password}
              // 								pattern="(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
              // title="Password must at least be 8 characters and contain at least 1 numeric value, one uppercase value,one lowercase value, and one special character."
              required
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              class="form-control"
              aria-describedby="passwordHelpInline"
            />
          </div>
          <br />
          <button
            type="submit"
            class="btn px-5 "
            style={{
              backgroundColor: "orange",
              color: "white",
              marginBottom: "15px",
              paddingTop: "12px",
            }}
          >
            ENTER
          </button>
          <span style={{ display: `${myloader}` }}>Please Wait..</span> <br />
          <label for="exampleInputPassword1" class="form-label">
            <Link to="/fyr">
              <span style={{ color: "orange" }}>Forgot password?</span>
            </Link>
          </label>
          <div class="mt-3">
            <label for="exampleInputPassword1" class="form-label">
              Don't have an account yet?{" "}
              <span style={{ color: "orange" }}>
                {" "}
                <Link to="/signup"> Sign up.</Link>
              </span>
            </label>
            <br />
            {/* <label for="exampleInputPassword1" class="form-label" >_____ or continue with _____</label><br/> */}
            {/* <div class="smedia">
    <img src={Google} width="40px"  height="40px"></img>
    <img src={facebook} width="40px"  height="40px"></img>
    <img src={twitter} width="40px"  height="40px"></img>
    <img src={instagaram} width="40px" height="40px"></img>

    </div> */}
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
