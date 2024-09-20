import React from "react";
import LOGOORANGE from "../images/Tecton side by side white logo.png";
import LOGOSIDE from "../images/Tecton side by side white logo.png";
import TECHW from "../images/TECHW.png";
import "../css/form.css";
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
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Logo from "../images/Tecton side by side white logo.png";
import {
  Navbar,
  Container,
  NavDropdown,
  Offcanvas,
  Nav,
} from "react-bootstrap";
function Form() {
  const data = localStorage.getItem("userInfo");
  const data1 = JSON.parse(data);
  const logout = () => {
    localStorage.removeItem("userInfo");
    window.location.reload(false);
  };
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => newdesh(res.data));

    axios
      .get(
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
      )
      .then((resp) => newrajya(resp.data));
  }, []);
  // axios.get("https://restcountries.com/v3.1/all").then(res=>res.data.map((Val)=>console.log(Val.name.common)))
  // res.data[0].name.common
  // Array.map((val,ind)=>console.log())
  const [state1, setstate1] = useState();
  const [state2, setstate2] = useState();
  const [state3, setstate3] = useState();
  const [state4, setstate4] = useState();
  const [state5, setstate5] = useState();
  const [state6, setstate6] = useState();
  const [state7, setstate7] = useState();
  const [state8, setstate8] = useState();
  const [state9, setstate9] = useState("");
  const [state10, setstate10] = useState();
  const [desh, newdesh] = useState();
  const [rajya, newrajya] = useState();
  const [firstName, set_firstName] = useState("");
  const [lastName, set_lastName] = useState("");
  const [email, set_email] = useState("");
  const [where_did_you_hear_about_tecton, set_where_did_you_hear_about_tecton] =
    useState("");
  const [city, set_city] = useState("");
  const [state, set_state] = useState("");
  const [postal_code, set_postal_code] = useState("");
  const [country, set_country] = useState("United States");

  const handlesubmit = async (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_PROXY_URL}/preorder`, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        where_did_you_hear_about_tecton: where_did_you_hear_about_tecton,
        city: city,
        state: state,
        postal_code: postal_code,
        country: country,
      })
      .then((result) => {
        set_firstName("");
        set_lastName("");
        set_email("");
        set_where_did_you_hear_about_tecton("");
        set_city("");
        set_country("");
        set_state("");
        set_postal_code("");
        // console.log(result.data[0]);
        if (result?.data?.status === "success") {
          setstate9(
            <div class="alert alert-success" role="alert">
              Thank you for submitting the form!!
            </div>
          );
        }
      });

    if (firstName === "" || firstName === null) {
      setstate1(<span style={{ color: "red" }}>*Field is compulsory</span>);
      setstate9(<span style={{ color: "red" }}>"Enter all fields"</span>);
    } else {
      setstate1("");
      setstate9("");
    }

    if (lastName === "" || lastName === null) {
      setstate2(<span style={{ color: "red" }}>*Field is compulsory</span>);
      setstate9(<span style={{ color: "red" }}>"Enter all fields"</span>);
    } else {
      setstate2("");
      setstate9("");
    }

    if (email === "" || email === null) {
      setstate3(<span style={{ color: "red" }}>*Field is compulsory</span>);
      setstate9(<span style={{ color: "red" }}>"Enter all fields"</span>);
    } else {
      setstate3("");
      setstate9("");
    }

    if (
      where_did_you_hear_about_tecton === "" ||
      where_did_you_hear_about_tecton === null
    ) {
      setstate4(<span style={{ color: "red" }}>*Field is compulsory</span>);
      setstate9(<span style={{ color: "red" }}>"Enter all fields"</span>);
    } else {
      setstate4("");
      setstate9("");
    }

    if (city === "" || city === null) {
      setstate5(<span style={{ color: "red" }}>*Field is compulsory</span>);
      setstate9(<span style={{ color: "red" }}>"Enter all fields"</span>);
    } else {
      setstate5("");
      setstate9("");
    }

    if (state === "" || state === null) {
      setstate6(<span style={{ color: "red" }}>*Field is compulsory</span>);
      setstate9(<span style={{ color: "red" }}>"Enter all fields"</span>);
    } else {
      setstate6("");
      setstate9("");
    }

    if (postal_code === "" || postal_code === null) {
      setstate7(<span style={{ color: "red" }}>*Field is compulsory</span>);
      setstate9(<span style={{ color: "red" }}>"Enter all fields"</span>);
    } else {
      setstate7("");
      setstate9("");
    }

    if (country === "" || country === null) {
      setstate8(<span style={{ color: "red" }}>*Field is compulsory</span>);
      setstate9(<span style={{ color: "red" }}>"Enter all fields"</span>);
    } else {
      setstate8("");
      setstate9("");
    }

    if (state9 === "Enter all fields") {
      // console.log("asd");
    }
  };

  return (
    <div class="outl">
      <div class="board">
        <div class="content">
          <div class="pre-text">
            <div class="wel">
              <h1 class="order-tex">Pre-Order</h1>
            </div>
          </div>
          <div class="firs-portion">
            <b style={{ fontSize: "23px", fontWeight: "700" }}>Tecton® </b>is
            the world’s first “focused performance” beverage that contains a
            nature-identical{" "}
            <b style={{ fontSize: "23px", fontWeight: "700" }}>ketone </b>
            produced through a proprietary and natural enzymatic process.
            <br />
            <br />
            <Link to="/science" style={{ color: "black" }}>
              {" "}
              Read more
            </Link>{" "}
            about the science behind
            <b style={{ fontSize: "23px", fontWeight: "700" }}> Tecton®</b>.
            <br />
            <br />
            Submit your contact information below to be the first to be informed
            when the product is available to pre-order.
            <br />
          </div>
          <br />
          <div class="row">
            <div class="col-sm-12  second-portion">
              <div class="de-in">
                <div class="con-tact">
                  (<span style={{ color: "red" }}>*</span>)Mandatory fields
                  <p>Contact Information</p>
                </div>
                <form onSubmit={handlesubmit}>
                  <span style={{ color: "red" }}>*</span>First Name:{" "}
                  <input
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => set_firstName(e.target.value)}
                    class="text-linea"
                  />
                  {state1} <br />
                  <span style={{ color: "red" }}>*</span>Last Name:{" "}
                  <input
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => set_lastName(e.target.value)}
                    class="text-lineb"
                  />{" "}
                  {state2} <br />
                  <span style={{ color: "red" }}>*</span>Email:{" "}
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => set_email(e.target.value)}
                    class="text-linec"
                  />
                  {state3} <br />
                  <span style={{ color: "red" }}>*</span>Where did you hear
                  about Tecton®?
                  <input
                    type="text"
                    name="where_did_you_hear_about_tecton"
                    value={where_did_you_hear_about_tecton}
                    onChange={(e) =>
                      set_where_did_you_hear_about_tecton(e.target.value)
                    }
                    class="text-lined"
                  />{" "}
                  {state4} <br />
                  <span style={{ color: "red" }}>*</span>City:{" "}
                  <input
                    type="text"
                    name="city"
                    value={city}
                    onChange={(e) => set_city(e.target.value)}
                    class="text-linee"
                  />{" "}
                  {state5} <br />
                  <span style={{ color: "red" }}>*</span>State:
                  {/* <select value={country} onChange={(e) => set_country(e.target.value)}>
                    {rajya?.map((val,key)=><option id={key}>{val?.subcountry}</option>)}

                   </select> */}
                  {/* <input
                    type="text"
                    name="state"
                    value={state}
                    onChange={(e) => set_state(e.target.value)}
                    class="text-linee"
                  /> */}
                  <DatalistInput
                    placeholder="select your state"
                    onSelect={(item) => set_state(item.value1)}
                    items={[
                      { value1: "AK", value: "Alaska" },
                      { value1: "TX", value: "Texas" },
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
                    ]}
                  />
                  {state6} <br />
                  <span style={{ color: "red" }}>*</span>Postal Code:{" "}
                  <input
                    type="number"
                    name="postal_code"
                    value={postal_code}
                    onChange={(e) => set_postal_code(e.target.value)}
                    class="text-lineg"
                  />
                  {state7} <br />
                  {/* Country<span style={{color:"red"}}>*</span>:{" "}
                  <input
                    type="text"
                    name="country"
                    value={country}
                    onChange={(e) => set_country(e.target.value)}
                    class="text-lineh"
                  /> */}
                  <span style={{ color: "red" }}>*</span>Country:
                  {/* <select value={country} onChange={(e) => set_country(e.target.value)}>
                    {desh?.map((val,key)=><option id={key}>{val?.name?.common}</option>)}

                   </select> */}
                  {/* <select value={country} onChange={(e) => set_country(e.target.value)}>
                   
                     <option>United states</option>
                   </select> */}
                  <DatalistInput
                    placeholder="Select your country"
                    onSelect={(item) => set_country(item.value1)}
                    items={[{ value1: "U.S.", value: "United States" }]}
                  />
                  {state8} <br />
                  <div class="Bgreat">
                    <div class="be">
                      <img class="ft-image" src={BEGREAT}></img>
                      <br />
                      <input
                        class="down-button"
                        type="submit"
                        value="Submit"
                        disabled={
                          !firstName ||
                          !lastName ||
                          !email ||
                          !where_did_you_hear_about_tecton ||
                          !city ||
                          !state ||
                          !postal_code ||
                          !country
                        }
                      ></input>{" "}
                      <br />
                      <br /> {state9}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

export default Form;
