import React from "react";
import "../css/Reset.css";
import { Link } from "react-router-dom";
import LOGOORANGE from "../images/TECTON beta site.png";
import LOGOSIDE from "../images/TECTON beta site side.png";
import { resetUserPassword } from "../actions/userActions";
import TECHW from "../images/TECHW.png";
import "../css/Login.css";
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

import { useSelector, useDispatch } from "react-redux";
import {
  Navbar,
  Container,
  NavDropdown,
  Offcanvas,
  Nav,
} from "react-bootstrap";
function Reset({ match, history }) {
  const [name, setName] = useState("");
  const [typePassword, setTypePassword] = useState("password");
  const [typeConfirmPassword, setTypeConfirmPassword] = useState("password");
  const [message, setMessage] = useState(null);
  const [successAlert, setSuccessAlert] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userResetPassword = useSelector((state) => state.userResetPassword);
  const { loading, resetPassword, error } = userResetPassword;

  // get the name stored in the local storage and ask that user to reset password
  useEffect(() => {
    const nameFromLocalStorage = localStorage.getItem("EcommerceUserName");
    if (nameFromLocalStorage) {
      setName(nameFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    if (resetPassword) {
      setTimeout(() => {
        history.push("/login");
      }, 10000);
    }
  }, [history, resetPassword]);

  const showHidePassword = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setTypePassword(typePassword === "password" ? "text" : "password");
  };
  const showHideConfirmPassword = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setTypeConfirmPassword(
      typeConfirmPassword === "password" ? "text" : "password"
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage(
        <div class="alert alert-danger" role="alert">
          Passwords do not match. Please retry.
        </div>
      );
    } else {
      dispatch(resetUserPassword(match.params.token, password));
      setSuccessAlert(
        <div class="alert alert-success" role="alert">
          Please wait for few seconds this page will automatically redirect you
          to the login page.
        </div>
      );
    }
  };
  return (
    <>
      

      <div className="Reset container" style={{fontFamily:"aktiv" ,fontSize:"0.9rem"}}>
        <form onSubmit={handleSubmit}>
          {successAlert}
          {message}
          <div class="mb-3">
            <label
              for="exampleInputEmail1"
              class="form-label"
              style={{ color: "orange" }}
            >
              <h3>
                <b>Reset Your Password</b>
              </h3>
            </label>
          </div>
          <div class="mb-2">
            <label for="exampleInputPassword1" class="form-label">
              <b>Hey there! You can now reset your password</b>
            </label>
          </div>

         <br/>
          <div class="col-lg-5 col-sm-12">
            New Password
            <input
              type={typePassword}
              placeholder="Enter your password"
              value={password}
              pattern="(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
              title="Password must at least be 8 characters and contain at least 1 numeric value, one uppercase value,one lowercase value, and one special character."
              required
             
              onChange={(e) => setPassword(e.target.value)}
              // id="inputPassword6"
              class="form-control"
              
              aria-describedby="passwordHelpInline"
            />
          </div>
          <br />
          <div class="col-lg-5 col-sm-12">
            Reconfirm New Password
            <input
              type={typeConfirmPassword}
              placeholder="Confirm your password"
              value={confirmPassword}
              pattern="(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
              title="Password must at least be 8 characters and contain at least 1 numeric value, one uppercase value,one lowercase value, and one special character."
              required
             
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="inputPassword6"
              class="form-control"
              aria-describedby="passwordHelpInline"
            />
          </div>
          <br />

          <button
            type="submit"
            class="btn px-5 "
            style={{ backgroundColor: "orange", color: "white" ,paddingTop:"12px" }}
          >
            CONFIRM
          </button>
          <br />
          <br />
          {/* <label for="exampleInputPassword1" class="form-label" >Didn't receive the code? <span style={{color:"orange"}}>Resend email.</span></label> */}
        </form>
      </div>
    </>
  );
}

export default Reset;
