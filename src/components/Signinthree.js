import React from "react";
import LOGOORANGE from "../images/Tecton side by side white logo.png";
import LOGOSIDE from "../images/Tecton side by side white logo.png"
import TECHW from "../images/TECHW.png";
import "../css/Signinthree.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import axios from "axios";
import countryList from "react-select-country-list";
import Select from "react-select";
import DatalistInput from 'react-datalist-input';
import 'react-datalist-input/dist/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircle} from "@fortawesome/free-solid-svg-icons"; 
import BEGREAT  from '../images/BEGREAT.png';
import {faBars} from "@fortawesome/free-solid-svg-icons";
import Logo from "../images/Tecton side by side white logo.png";
import { useSelector, useDispatch } from 'react-redux';

import {
	sendVerficationEmail,
	getUserDetails,
	updateUserProfile,
	refreshLogin,
} from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import {
  Navbar,
  Container,
  NavDropdown,
  Offcanvas,
  Nav,
} from "react-bootstrap";
import useDocumentTitle from "./useDocumentTitle";
import ScrollToTop from "./ScrollToTop";
function Signinthree({match}){
  useDocumentTitle("verification -Tecton");
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
	const { loading, userInfo, error } = userRegister
  // console.log(userInfo)
  	// check whether verification email has to be sent
	const userSendEmailVerfication = useSelector(
		(state) => state.userSendEmailVerfication
	);
	const { emailSent, hasError } = userSendEmailVerfication;
  // console.log(match.params.id)
    return(
      <>
      <ScrollToTop/>
      
        <div className="Signinthree container" style={{fontFamily:"aktiv"}}>
          
<form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label" style={{color:"orange"}}><h3><b>Sign up</b></h3></label>
  </div>
  <div class="mb-2">
    <label for="exampleInputPassword1" class="form-label"><b>Verification Required</b></label>

  </div>

  <div class="mb-4  ">
  <label for="exampleInputPassword1" class="form-label">Please check your email to verify your account.</label>
  </div>

  {/* <div class="mb-2">
    <label for="exampleInputPassword1" class="form-label"><b>Verification Code</b></label>
  </div> */}
  {/* <div class="vbox">
      <input name='code' class='code-input' required/>
      <input name='code' class='code-input' required/>
      <input name='code' class='code-input' required/>
      <input name='code' class='code-input' required/>
      <input name='code' class='code-input' required/>
      <input name='code' class='code-input' required/>
    </div> */}

  {/* <button type="submit" class="btn px-5 py-2" style={{backgroundColor:"orange",color:"white"}}>LETS GO</button> */}
  <div class="mt-3">
    <label for="exampleInputPassword1" class="form-label" >Didn't receive the code? <p onClick={() =>
										
										dispatch(
											sendVerficationEmail(match.params.id)
										)
									} style={{color:"orange",cursor:"pointer"}}>Resend email.</p></label>

  </div>
</form>
        </div>
        </>
    )
}

export default Signinthree;