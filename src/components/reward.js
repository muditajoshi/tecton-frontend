import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "../css/refer.css";
import axios from "axios";
import { Link } from 'react-router-dom';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars} from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Logo from "../images/newlogo_tecton.png";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import Shoppingcart from "../images/Group 13.png"
import Userlogo from "../images/Group 12.png"
import {  faPlus, faMinus,faAngleUp } from "@fortawesome/free-solid-svg-icons";
import {
  Navbar,
  Container,
  NavDropdown,
  Offcanvas,
  Nav,
} from "react-bootstrap";

const Rewards = ({history}) => {
  const userLogin = useSelector((state) => state.userLogin);
  const data=localStorage.getItem("userInfo")
  const data1=(JSON.parse(data))
	const inputFile = useRef(null);
	const userDetails = useSelector((state) => state?.userDetails);
	const { loading, user, error } = userDetails;
  // console.log(user)
  const { userInfo } = userLogin;
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
  const handleDropdownToggle44= (isOpen) => {
    setIsDropdownOpen44(isOpen);
  };

  const handleDropdownToggle00= (isOpen) => {
    setIsDropdownOpen00(isOpen);
  };

  const handleDropdownToggle11= (isOpen) => {
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
  
	
  const logout = () => {
    history.push('/')
    localStorage.removeItem("userInfo");
          localStorage?.removeItem("cartItems");
		     localStorage?.removeItem("subscriptionItems");
    window.location.reload(false);
    
  };
  const[cartData,setCartData] = useState();
  useEffect(()=>{
   axios.get(`${process.env.REACT_APP_PROXY_URL}/api/cart/user/${userInfo?.id}`).then((res)=>setCartData(res?.data?.cart[0]?.cartItems?.map((val)=>val.qty).reduce((a,b)=>a+b,0)))
 },[])
 if(cartData===undefined){
   setCartData(0);
 }
  const cardquant=JSON.parse(localStorage.getItem("cartItems"));
  // console.log(cardquant)
  cardquant?.map((val)=>val.qty).reduce((a,b)=>a+b,0)
  // console.log(cardquant?.map((val)=>val.qty).reduce((a,b)=>a+b,0));
  var cardstate=cardquant?.map((val)=>val.qty).reduce((a,b)=>a+b,0);
  // console.log(cardstate)
 if(cardstate===undefined){
  var cardstate=0;
 }

 const config = {
  headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo?.accessToken}`,
  },
};
const [userIsAdmin, setUserIsAdmin] = useState(false);
useEffect(()=>{
  axios.get(`${process.env.REACT_APP_PROXY_URL}/api/users/${userInfo?.id}`,config).then((res)=>{setUserIsAdmin(res?.data?.isAdmin)})
  
},[])

useEffect(()=>{
    if (!userInfo) {
      history.push("/");
    }
  },[])
  
  return (
    <div>
      <div class="acc">
        <div class="Act">
      <div class="row">
       <div class="col-sm-4">
            <div class="contact-info">
              <div id="dep1">
                 <ul class="menu-drop">
                   <li><a href="/order">ORDERS</a></li>
                  <li><a href="/subscription">SUBSCRIPTIONS</a></li>
                  <li><a href="/billing">PAYMENT AND SHIPPING</a></li>
                  <li ><a style={{color:"orange"}} href="/reward">REWARDS</a></li>
                  <li><a href="/refer">REFER A FRIEND</a></li>
                  <li><a href="/refer">ACCOUNT SETTINGS</a></li>
                   </ul>
              </div>
            </div>
          </div>
           <br />
          <br />
          <br />
          <div class="col-sm-8 ">
            <div class="row">
              <div class="m-acc">
              <h3 class="samk" >Rewards
            
             
              </h3>
             <div style={{fontSize:"19px", paddingLeft:"30px"}} >Coming Soon</div>
              </div>
            </div>
          </div>
         </div>
      </div>
    </div>
    </div>
  )
}

export default Rewards;
