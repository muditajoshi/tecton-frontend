import React from "react";
import { useSelector, useDispatch } from "react-redux";
import LOGOORANGE from "../images/Tecton side by side white logo.png";
import LOGOSIDE from "../images/Tecton side by side white logo.png";
import TECHW from "../images/TECHW.png";
import "../css/Signintwo.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
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
import { registerUser } from "../actions/userActions";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
//phone number validation

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  Navbar,
  Container,
  NavDropdown,
  Offcanvas,
  Nav,
} from "react-bootstrap";
import { USER_REGISTER_FAILURE } from "../constants/userConstants";
import useDocumentTitle from "./useDocumentTitle";
import Loader from "../skeleton/Loader";
import OverlayEditSub from "../skeleton/OverlayEditSub";

function Signintwo({ match, location, history }) {
  useDocumentTitle("Sign up - Tecton");
  const [typePassword, setTypePassword] = useState("password");
  const [typeConfirmPassword, setTypeConfirmPassword] = useState("password");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setRole] = useState([]);
  const [message, setMessage] = useState(null);
  const [fail, setfail] = useState("");
  const [terms, setTerms] = useState();
  const [myloader, setMyloader] = useState("none");
  const [show, setShow] = useState(false);
  const [referrerFirstName, setReferrerFirstName] = useState(null);
  const [referrerLastName, setReferrerLastName] = useState(null);
  const [referrerEmail, setReferrerEmail] = useState(null);
  // const [referrerPhoneNo, setReferrerPhoneNo] = useState(null);

  const [userid, setUserid] = useState(null);

  const [usertype, setUsertype] = useState(
    match?.params?.id ? "Individual" : "Individual"
  );

  const [overlay, setoverlay] = useState();
  const dispatch = useDispatch();

  const [box, setBox] = useState("none");
  const [refCodeExist, setRefCodeExist] = useState(match?.params?.id);
  const [userIdentityRequired, setUserIndentityRequired] = useState();
  const [veteranChecked, setVeteranChecked] = useState(false);
  const [employeeChecked, setEmployeeChecked] = useState(false);
  const [govxError, setGovxError] = useState();
  const [signUpAsFriendsAndfamily, setSignUpAsFriendsAndfamily] =
    useState(false);
  const [signUpAsEmployee, setSignUpAsEmployee] = useState(false);

  const redirect = location.search ? location.search.split("=")[1] : "";
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const data = localStorage.getItem("userInfo");
  const data1 = JSON.parse(data);
  const logout = () => {
    localStorage.removeItem("userInfo");
    window.location.reload(false);
  };

  const [employeeChecked1, setEmployeeChecked1] = useState(false);
  const [friendsAndFamilyChecked1, setFriendsAndFamilyChecked1] =
    useState(false);
  const [checkboxError, setCheckboxError] = useState(false);
  const [referrerPhoneNo, setReferrerPhoneNo] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const validatePhoneNumber = (phoneNumber) => {
    // Regular expression for US phone number format
    const phoneRegex = /^\d{10}$/;

    if (!phoneRegex.test(phoneNumber)) {
      setPhoneError(
        "Invalid phone number. Please enter a 10-digit US phone number."
      );
      return false;
    }

    setPhoneError("");
    return true;
  };
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setReferrerPhoneNo(value);
    validatePhoneNumber(value);
  };

  const handleCheckboxChange = (isChecked, checkboxType) => {
    if (checkboxType === "Employee") {
      setSignUpAsEmployee(isChecked);
      setSignUpAsFriendsAndfamily(false);
      setEmployeeChecked1(isChecked);
      setFriendsAndFamilyChecked1(false);
    } else if (checkboxType === "FriendsAndFamily") {
      setSignUpAsFriendsAndfamily(isChecked);
      setSignUpAsEmployee(false);
      setEmployeeChecked1(false);
      setFriendsAndFamilyChecked1(isChecked);
    }

    setCheckboxError(false);
  };

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem("promptEmailVerfication", "true");
      history.push("/signinthree");
    }
  }, [history, userInfo]);

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
    // setMyloader("block");
    setoverlay(<OverlayEditSub />);
    setShow(true);

    if (employeeChecked && !(signUpAsFriendsAndfamily || signUpAsEmployee)) {
      setCheckboxError(true); // Show checkbox error
      setShow(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage(
        <span style={{ color: "red" }}>
          Passwords do not match. Please retry.
          <br />
        </span>
      );
      setShow(false);
    } else {
      // dispatch(registerUser(firstName,lastName,gender, email, password));
      axios
        .post(`${process.env.REACT_APP_PROXY_URL}/api/users/`, {
          firstName,
          lastName,
          gender,
          email,
          password,
          userType: usertype,
          id: userid,
          termsAndConditions: terms,
          refCode: refCodeExist,
          referrerFirstName: referrerFirstName,
          referrerLastName: referrerLastName,
          referrerPhoneNo: referrerPhoneNo,
          referrerEmail: referrerEmail,
          signUpAsFriendsAndfamily,
          signUpAsEmployee,
        })
        .then((resp) => {
          console.log(resp?.data?.email);
          // axios.post("http://go.tectonlife.com/l/984271/2022-09-19/dbvhl2",
          // {  email:email,
          //    firstName:firstName,
          //    lastName:lastName
          //    })
          history.push(`/verify/${resp?.data?.email}`);
        })
        .catch((res) => {
          setShow(false);
          console.log(res.response);
          if (res.response.data.message === "Email already registered") {
            setfail(
              <span style={{ color: "red" }}>{res.response.data.message}</span>
            );
            setMessage(
              <span style={{ color: "red" }}>
                <br />
              </span>
            );
            setMyloader("none");
          } else if (res.response.data.message === "invalid referal code") {
            setfail(<span style={{ color: "red" }}>Invalid referal code</span>);
          } else if (res.response.data.error === "Veteran id already exists") {
            setfail(
              <span style={{ color: "red" }}>Veteran id already exists</span>
            );
          } else if (res.response.data.error === "Invalid Govx Code") {
            setGovxError(
              <span style={{ color: "red" }}>Invalid Govx Code</span>
            );
          } else if (res?.response?.status == 429) {
            window.alert(res?.response?.data?.message);
          } else if (res.response.data.message === "Reset Your Password") {
            // history.push("/login");
            setfail(
              <div class="alert alert-success" role="alert">
                {res.response.data.error}
                <a
                  href="setpassword"
                  style={{ textDecoration: "underline", color: "blue" }}
                >
                  Click here
                </a>
              </div>
            );
          }
        });

      // history.push("/login")
    }
    //   if(USER_REGISTER_FAILURE){
    //  setTimeout(() => {
    //   setfail("Email is already registered")
    //  }, 1000);
    //   }

    // axios.get("http://localhost:3000/api/users").catch((error)=>console.log(error.response.data))
    // axios.get("http://localhost:3000/api/users").catch((error)=>console.log(error.response))
  };

  const userIdentityVeteran = (e) => {
    setEmployeeChecked(false);
    if (veteranChecked === false) {
      setVeteranChecked(true);
      // console.log(e.target.value);
      setBox("block");
      setUsertype([`${e.target.value}`]);
      setRefCodeExist(null);
      setUserIndentityRequired(true);
      setUserid(null);
    }
    if (veteranChecked === true) {
      setVeteranChecked(false);
      // console.log(e.target.value);
      setBox("none");
      setUserIndentityRequired(false);
      setUserid(null);
      if (match.params.id) {
        setUsertype(["Individual"]);
        setRefCodeExist(match?.params?.id);
      } else {
        setUsertype(["Individual"]);
        setRefCodeExist(null);
      }
    }
  };

  const userIdentityEmployee = (e) => {
    setVeteranChecked(false);
    if (employeeChecked === false) {
      setEmployeeChecked(true);
      // console.log(e.target.value);
      setBox("block");
      setUsertype([`${e.target.value}`]);
      setRefCodeExist(null);
      setUserIndentityRequired(false);
      setUserid(`${lastName}<${email}>`);
    }
    if (employeeChecked === true) {
      setEmployeeChecked(false);
      // console.log(e.target.value);
      setBox("none");
      setUserIndentityRequired(false);
      setUserid(null);
      setReferrerEmail(null);
      setReferrerFirstName(null);
      setReferrerLastName(null);
      setReferrerPhoneNo(null);
      if (match.params.id) {
        setUsertype(["Individual"]);
        setRefCodeExist(match?.params?.id);
      } else {
        setUsertype(["Individual"]);
        setRefCodeExist(null);
      }
    }
  };

  // const IndividualUser=(e)=>{
  //   console.log(e.target.value);
  //   setBox("none");
  //   setUsertype([`${e.target.value}`]);
  //   if(match.params.id){
  //     setRefCodeExist(match?.params?.id);
  //   }
  //   else{
  //     setRefCodeExist(null);
  //   }
  //   setUserIndentityRequired(false)
  // }

  // useEffect(() => {
  //   const role = localStorage.getItem("Role");
  //   const role1 = role.split(",");
  //   setRole(role1);
  // }, []);
  // console.log(userType);
  // console.log(match?.params?.id)
  console.log("refcode->", refCodeExist);
  console.log("usertype->", usertype);
  console.log("userId->", userid);
  console.log("RequiredField", userIdentityRequired);
  return (
    <>
      <div className="Signintwo container" style={{ fontFamily: "aktiv" }}>
        {show ? overlay : <></>}
        <form onSubmit={handleSubmit}>
          <div class="mb-2">
            <label
              for="exampleInputEmail1"
              class="form-label"
              style={{ color: "orange" }}
            >
              <h3>
                <b>Sign up</b>
              </h3>
            </label>
          </div>
          <div class="mb-2">
            <label for="exampleInputPassword1" class="form-label">
              <b>Join the (extra)ordinary club.</b>
            </label>
          </div>
          <div class="mb">
            <label for="exampleInputPassword1" class="form-label">
              Get early access to new products, rewards, health tips, and more!
            </label>
          </div>
          <div class="mb-2">
            <label for="exampleInputPassword1" class="form-label">
              <b>Account Information</b>
            </label>
          </div>
          <div style={{ fontSize: "0.9rem" }}>
            <div class="row g-3 align-items-center">
              <div class="col-lg-5 col-sm-12">
                First Name
                <input
                  placeholder="First Name"
                  type="text"
                  value={firstName}
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                  id="inputPassword6"
                  class="form-control"
                  aria-describedby="passwordHelpInline"
                />
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div class="col-lg-5 col-sm-12">
                Last Name
                <input
                  placeholder="Last Name"
                  type="text"
                  value={lastName}
                  required
                  onChange={(e) => setLastName(e.target.value)}
                  id="inputPassword6"
                  class="form-control"
                  aria-describedby="passwordHelpInline"
                />
              </div>
            </div>
            <br />
            <div class="row g-3 align-items-center">
              <div class="col-lg-10 col-sm-12 settingWidth">
                Email
                <input
                  placeholder="Enter Email Address"
                  type="email"
                  value={email}
                  required
                  pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                  title="username@xyz.com"
                  onChange={(e) => setEmail(e.target.value)}
                  id="inputPassword6"
                  class="form-control"
                  aria-describedby="passwordHelpInline"
                />
              </div>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div class="row g-3 align-items-center">
              <div class="col-lg-5 col-sm-12">
                Create Password
                <input
                  type={typePassword}
                  placeholder="Enter your password"
                  value={password}
                  pattern="(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                  title="Password must at least be 8 characters and contain at least 1 numeric value, one uppercase value,one lowercase value, and one special character."
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  id="inputPassword6"
                  class="form-control"
                  aria-describedby="passwordHelpInline"
                />
                <div class="invalid-feedback"></div>
              </div>
              {/* </div> */}
              {/* <br /> */}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div class="col-lg-5 col-sm-12">
                Confirm Password
                <input
                  type={typeConfirmPassword}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  pattern="(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                  title="The password length must be greater than or equal to 8.
                    The password must contain one or more uppercase characters.
                    The password must contain one or more lowercase characters.
                    The password must contain one or more numeric values.
                    The password must contain one or more special characters."
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  id="inputPassword6"
                  class="form-control"
                  aria-describedby="passwordHelpInline"
                />
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {/* <div class="col-lg-5 col-sm-12 logingender">
              Gender
             
              <DatalistInput
                placeholder="Gender"
                onSelect={(item) => setGender(item.value1)}
                items={[
                  { value1: "Male", value: "Male" },
                  { value1: "Female", value: "Female" },
                  { value1: "Prefer not to say", value: "Prefer not to say" },
                ]}
              />
            </div> */}
            </div>
            <br />
            Password must contain:
            <ul>
              <li>8-25 characters</li>
              <li>1 uppercase letter</li>
              <li>1 lowercase letter</li>
              <li>1 number</li>
              <li>1 special character</li>
            </ul>
            <div>
              <div>
                Please select one of the boxes below to check if you are
                eligible for a special discount.
              </div>
              <br />
              <div>
                <input
                  onClick={userIdentityVeteran}
                  value="Veteran"
                  name="group1"
                  type="radio"
                  class="form-check-input"
                  id="exampleCheck2"
                  checked={veteranChecked}
                />
                &nbsp;I'm a US Military/Military Vet/First Responder
              </div>

              {veteranChecked === true ? (
                <>
                  <br />
                  {/* Please enter your unique GovX Discount code below, if you don't have one click <span style={{ color: "orange", textDecoration: "underline" }}>
                <a href="https://auth.govx.com/tickets/verify/venue/d52816d0-14e5-ed11-8a1e-000d3ac50276/d2780caf-14e5-ed11-8a1e-000d3ac50276?display=full" target="_blank"> here</a>
              </span> to 
validate your Veteran/First Responder Status via GovX and get the code to enter below. */}
                  Our Veteran/First Responder Status will be validated via GovX.
                  Click{" "}
                  <span
                    style={{ color: "orange", textDecoration: "underline" }}
                  >
                    <a
                      href="https://auth.govx.com/tickets/verify/venue/d52816d0-14e5-ed11-8a1e-000d3ac50276/d2780caf-14e5-ed11-8a1e-000d3ac50276?display=full"
                      target="_blank"
                    >
                      {" "}
                      here
                    </a>
                  </span>{" "}
                  to validate your Veteran/First Responder Status via GovX and
                  get the code to enter below.
                  <input
                    placeholder="​"
                    value={userid}
                    name="userid"
                    type="text"
                    style={{ width: "25%" }}
                    class="form-control"
                    onChange={(e) => {
                      setUserid(e.target.value);
                      console.log(e.target.value);
                    }}
                    required={userIdentityRequired}
                  />
                  {/* <br/> */}
                  {/* our Veteran/First Responder Status will be validated via GovX. Please 
follow the instructions contained in your account sign up email confirmation */}
                  {govxError}
                  <br />
                </>
              ) : (
                <></>
              )}
              <br />

              <div>
                <input
                  onClick={userIdentityEmployee}
                  value="Employee"
                  // name="group1"
                  type="radio"
                  class="form-check-input"
                  id="exampleCheck2"
                  checked={employeeChecked}
                />
                &nbsp;I am an employee/part of Tecton's Friend Circle
              </div>
              <br />
              {/* <div>
              <input
                onChange={IndividualUser}
                value={match?.params?.id?("Individual"):("Individual")}
                name="group1"
                type="radio"
                class="form-check-input"
                id="exampleCheck2"
              />
              &nbsp;None of the above
            </div> */}
              {/* <br /> */}
              <div>
                <div class="co" style={{ display: `${box}` }}>
                  {employeeChecked === true ? (
                    <>
                      <div style={{ display: "flex" }}>
                        <div>
                          <input
                            onChange={(e) =>
                              handleCheckboxChange(e.target.checked, "Employee")
                            }
                            value="Employee"
                            style={{
                              marginTop: "0px",
                              height: "16px",
                              width: "15px",
                            }}
                            type="checkbox"
                            name="group1"
                            className="form-check-input"
                            id="exampleCheck1"
                            checked={employeeChecked1}
                          />
                          &nbsp;
                          <span style={{ paddingTop: "5px" }}>
                            Sign up as employee
                          </span>
                          <br />
                        </div>
                        &nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;
                        <div>
                          <input
                            onChange={(e) =>
                              handleCheckboxChange(
                                e.target.checked,
                                "FriendsAndFamily"
                              )
                            }
                            value="FriendsAndFamily"
                            style={{
                              marginTop: "0px",
                              height: "16px",
                              width: "15px",
                            }}
                            type="checkbox"
                            name="group1"
                            className="form-check-input"
                            id="exampleCheck1"
                            checked={friendsAndFamilyChecked1}
                          />
                          &nbsp;<span>Sign up as a friend</span>
                        </div>
                      </div>
                      <br />
                      {checkboxError && (
                        <div style={{ color: "red", paddingBottom: "10px" }}>
                          Please select at least one option
                        </div>
                      )}
                      Welcome! Please let us know who referred you
                      <br />
                      <br />
                      <div>
                        <div class="row g-3 align-items-center">
                          <div class="col-lg-5 col-sm-12">
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>{" "}
                            Referrer First Name
                            <input
                              placeholder="Referrer First Name"
                              type="text"
                              value={referrerFirstName}
                              required
                              onChange={(e) =>
                                setReferrerFirstName(e.target.value)
                              }
                              id="referrerFirstName"
                              class="form-control"
                              aria-describedby="passwordHelpInline"
                            />
                          </div>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <div class="col-lg-5 col-sm-12">
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>{" "}
                            Referrer Last Name
                            <input
                              placeholder="Referrer Last Name"
                              type="text"
                              value={referrerLastName}
                              required
                              onChange={(e) =>
                                setReferrerLastName(e.target.value)
                              }
                              id="referrerLastName"
                              class="form-control"
                              aria-describedby="passwordHelpInline"
                            />
                          </div>
                        </div>
                        <br />
                        <div class="row g-3 align-items-center">
                          <div class="col-lg-5 col-sm-12">
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>{" "}
                            Referrer Email
                            <input
                              placeholder="Referrer Email"
                              type="email"
                              value={referrerEmail}
                              required
                              onChange={(e) => setReferrerEmail(e.target.value)}
                              id="referrerEmail"
                              class="form-control"
                              aria-describedby="passwordHelpInline"
                            />
                          </div>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <div class="col-lg-5 col-sm-12">
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>{" "}
                            Referrer Phone Number
                            <PhoneInput
                              value={referrerPhoneNo}
                              onChange={(value) => setReferrerPhoneNo(value)}
                              country="us"
                              onlyCountries={["us"]}
                              enableSearch={false}
                              inputStyle={{ minWidth: "12rem", width: "100%" }}
                              containerStyle={{ position: "relative" }}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            <br />
            <div class="mb form-check">
              <input
                type="checkbox"
                onClick={(e) => setTerms(true)}
                class="form-check-input"
                id="exampleCheck1"
                required
              />
              <label class="form-check-label" for="exampleCheck1">
                Yes! Tecton® may process my personal data (i.e. name and email
                address) to inform me about relevant
                <br />
                events, product updates, subscription notices, billing notices,
                and news. I can unsubscribe at any
                <br />
                time by clicking the unsubscribe in emails.
              </label>
              <br />
              <br />
              <p>
                By choosing "Continue", you agree to our{" "}
                <span style={{ color: "orange", textDecoration: "underline" }}>
                  <a href="/termsOfService"> Terms of Use</a>
                </span>{" "}
                and{" "}
                <span style={{ color: "orange", textDecoration: "underline" }}>
                  <a href="/privacypolicy">Privacy Policy</a>
                </span>
              </p>
            </div>
            <button
              type="submit"
              class="btn px-5 "
              style={{
                backgroundColor: "orange",
                color: "white",
                paddingTop: "12px",
              }}
            >
              CONTINUE
            </button>
            <br />
            <br />
            {message}
            {fail}
            <span style={{ display: `${myloader}` }}>Please Wait..</span>
            <div class="mt-3">
              <label for="exampleInputPassword1" class="form-label">
                Already have an account?{" "}
                <span style={{ color: "orange" }}>
                  <Link to="/login">Login.</Link>
                </span>
              </label>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signintwo;
