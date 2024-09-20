import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../css/Fyr.css";
import { Link } from "react-router-dom";
import LOGOORANGE from "../images/TECTON beta site.png";
import LOGOSIDE from "../images/TECTON beta site side.png";
import Google from "../images/Iconone.png";
import facebook from "../images/icontwo.png";
import twitter from "../images/iconthree.png";
import axios from "axios";
import useDocumentTitle from "./useDocumentTitle";

function SetPwd({ location }) {
  useDocumentTitle("Set your Password")
  const [authFailedMsg, setAuthFailedMsg] = useState(""); // if user tried to login with different social account after registering with some other social account
  const [showRedirectMsg, setShowRedirectMsg] = useState(false);
  const [successAlert, setSuccessAlert] = useState("");
  const [err , setErr] = useState(""); // use this handle error
  const [forgotPassword, setForgotPassword] = useState(false);
  const [showLoading, setShowLoading] = useState(false); // to display loader after user submits the email to reset password
  const [emailSent, setEmailSent] = useState(false); //to display a message that email is sent to reset password

  const [type, setType] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "";
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;
  const storedInfo = JSON.parse(localStorage.getItem("userInfo"));
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setShowLoading(true);

    // send the mail to the registered user
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const { data } = await axios.post(
      `${process.env.REACT_APP_PROXY_URL}/api/users/reset`,
      { email },
      config
    ).catch((err)=>setErr("Email Id not registered"));
    
        // when user mail is  found this code is run 
    // if (data.message=="success") {
    if (data) {
      setSuccessAlert(
        <div class="alert alert-info" role="alert">
          Please check your email to set your password.
        </div>
      );
      console.warn("Please check your email to reset your password.")
      setShowLoading(false);
      setEmailSent(true);
      // store the name in localstorage
      localStorage.setItem("EcommerceUserName", data.name); // store the user name, so that we can use it in the profile page to ask them to confirm email
    }

    // when user mail is not found this code is run 
  
    // else if(data.message == "user not found."){
    else if(err){
      setErr(
        <section class="alert alert-info" role="alert"> 
          Please check your email to set your password.
        </section>
      );
  
    }
    
    // console.log(data);
    
  };
  return (
    <div className="Fyr container">
		
      <form onSubmit={handleEmailSubmit}>
        {successAlert}

        {/* style jsx code (errror message) */}
        <div  style={{color :"red",fontSize:"24px",margin: "0 0 16px" , padding:"16px"}}> 
        {err}
        </div>
    
        <div class="mb-3">
          <label
            for="exampleInputEmail1"
            class="form-label"
            style={{ color: "orange" }}
          >
            <h3>
              <b>Set Your Password</b>
            </h3>
          </label>
        </div>
        <div class="mb-4  ">
          <label for="exampleInputPassword1" class="form-label">
            Enter your email below and we can send you an email to set your password.{" "}
          </label>
        </div>
        <div class="col-lg-5 col-sm-12">
          Email
          <input
            placeholder="Enter Email Address"
            type="email"
            value={email}
            pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            id="inputPassword6"
            class="form-control"
            aria-describedby="passwordHelpInline"
            required
          />
        </div>
        <br />

        <button
          type="submit"
          class="btn px-5 py-2"
          style={{ backgroundColor: "orange", color: "white" }}
        >
          SUBMIT
        </button>
        <br />
        <br />
        <label for="exampleInputPassword1" class="form-label">
          Didn't receive the code?{" "}
          <button
            type="submit"
            style={{
              color: "orange",
              cursor: "pointer",
              background: "none",
              border: "none",
			
            }}
          >
            {" "}
            Resend email.
          </button>
        </label>
      </form>
    </div>
  );
}

export default SetPwd;
