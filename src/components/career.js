import React from "react";
import LOGOORANGE from "../images/Tecton side by side white logo.png";
import LOGOSIDE from "../images/Tecton side by side white logo.png";
import TECHW from "../images/TECHW.png";
import "../css/career.css";
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
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import BEGREAT from "../images/BEGREAT.png";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Logo from "../images/Tecton side by side white logo.png";
import {
  Navbar,
  Container,
  NavDropdown,
  Offcanvas,
  Nav,
} from "react-bootstrap";
import useDocumentTitle from "./useDocumentTitle";

function Career() {
  useDocumentTitle("careers - Tecton");
  const [firstName, set_firstName] = useState();
  const [lastName, set_lastName] = useState();
  const [email, set_email] = useState("");
  const [where_did_you_hear_about_tecton, set_where_did_you_hear_about_tecton] =
    useState("");
  const [what_do_you_do, set_what_do_you_do] = useState("");
  const [city, set_city] = useState("");
  const [state, set_state] = useState("AK");
  const [postal_code, set_postal_code] = useState("");
  const [country, set_country] = useState("U.S.");
  const [street_address, set_street_address] = useState("");
  const [state15, setstate15] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_PROXY_URL}/api/careers`, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        where_did_you_hear_about_tecton: where_did_you_hear_about_tecton,
        what_do_you_do: what_do_you_do,
        city: city,
        state: state,
        postal_code: postal_code,
        country: country,
        street_address: street_address,
      })
      .then((result) => {
        set_city("");
        set_email("");
        set_firstName("");
        set_lastName("");
        set_street_address("");
        set_postal_code("");
        set_where_did_you_hear_about_tecton("");
        set_what_do_you_do("");
        if (result?.data?.status === "success") {
          setstate15(
            <div class="alert alert-success" role="alert">
              Thank you for submitting the form!!
            </div>
          );
        }
      });

    // setstate15(<span style={{color:"green"}}>From submitted!!</span>)
  };

  const data = localStorage.getItem("userInfo");
  const data1 = JSON.parse(data);
  const logout = () => {
    localStorage.removeItem("userInfo");
    window.location.reload(false);
  };
  let items = [
    { value1: null, value: null },
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
  return (
    <div>
      <div class="outT">
        <div class="board1">
          <div class="content">
            <div class="pret-text">
              <div class="well">
                <label
                  for="exampleInputEmail1"
                  class="form-label"
                  style={{ color: "orange" }}
                >
                  <h3>
                    <b>CAREERS</b>
                  </h3>
                </label>
              </div>
            </div>
            <div class="first-part" style={{ backgroundColor: "orange" }}>
              <div class="opt">
                <b>CALLING ALL CHANGEMAKERS!</b> <br />
                <br />
                Apply now to become a part of Team (Extra) Ordinary. Come and
                help us to <b>BE GREAT!</b>
                <br />
                <br />
              </div>
              <b> Who are we?</b> <br />
              We are building a movement powered by (extra)ordinary people - a
              company designed for the 21st Century! <br />
              <br />
              <b>Tecton®</b> is the world’s first “focused performance” brand
              with an immense innovation pipeline including products designed to
              help with recovery, focus, weight loss, neuroprotection, cognitive
              focus and more. <br />
              <br />
              The company is co-founded by a Special Forces Combat Medic who has
              also worked for the Defense Advanced Research Projects Agency of
              the Pentagon (DARPA) and the son of a Fighter Pilot who led global
              brands for Coca-Cola.
              <br />
              <br />
              <b> Our Purpose</b> <br />
              <b> TECTON®</b> is a purpose driven company with a mission to help
              people discover the extraordinary in themselves and in others.{" "}
              <br />
              <br />
              We believe that we need to take care of veterans, especially those
              who suffer from the consequences of having been in war. One
              percent of our revenues go to nonprofits that help disabled
              veterans and their families get back on their feet.
              <br />
              <br />
              <b> Who are we looking for?</b> <br />
              We are currently recruiting writers, designers, sales people,
              digital marketers, social media mavens, brand managers and more!{" "}
              <br />
              <br />
              We need people who want to unleash their full potential and put a
              dent in the universe. <br />
              <br />
              Are you someone who wants to show up in the world at your very
              best? Then connect with the founders of Tecton® and learn more
              about how we can work together.!
              <br />
            </div>
            <br />
            <div class="second-part">
              <div class="san">
                <p class="am-bass"> CONTACT INFORMATION</p>
              </div>
              <div class="in-de">
                <form onSubmit={submitForm}>
                  <div className="wrapperDiv">
                    <label className="classLable">First Name:</label>
                    <input
                      type="text"
                      value={firstName}
                      required
                      onChange={(e) => set_firstName(e.target.value)}
                      className="inputField"
                    />
                  </div>
                  <div className="wrapperDiv">
                    <label className="classLable">Last Name:</label>
                    <input
                      type="text"
                      value={lastName}
                      required
                      onChange={(e) => set_lastName(e.target.value)}
                      className="inputField"
                    />
                  </div>
                  <div className="wrapperDiv">
                    <label className="classLable">Email:</label>
                    <input
                      type="email"
                      value={email}
                      required
                      pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                      title="username@xyz.com"
                      onChange={(e) => set_email(e.target.value)}
                      className="inputField"
                    />
                  </div>
                  <div className="wrapperDiv">
                    <label className="classLable">
                      Where did you hear about Tecton®?
                    </label>
                    <input
                      type="text"
                      value={where_did_you_hear_about_tecton}
                      required
                      onChange={(e) =>
                        set_where_did_you_hear_about_tecton(e.target.value)
                      }
                      className="inputField"
                    />
                  </div>
                  <div className="wrapperDiv">
                    <label className="classLable">
                      What do you do? (50 words):
                    </label>
                    <input
                      type="text"
                      value={what_do_you_do}
                      required
                      onChange={(e) => set_what_do_you_do(e.target.value)}
                      className="inputField"
                    />
                  </div>
                  <br />
                  <div class="san">
                    <p class="am-bass">RELEVENT LINKS: (Bio, Portfolio etc.)</p>
                  </div>
                  <div className="wrapperDiv">
                    <label className="classLable">Street Address:</label>
                    <input
                      type="text"
                      value={street_address}
                      required
                      onChange={(e) => set_street_address(e.target.value)}
                      className="inputField"
                    />
                  </div>
                  <div className="wrapperDiv">
                    <label className="classLable">City:</label>
                    <input
                      type="text"
                      value={city}
                      required
                      onChange={(e) => set_city(e.target.value)}
                      className="inputField"
                    />
                  </div>
                  <div className="wrapperDiv">
                    <label className="classLable">State:</label>
                    <select
                      style={{
                        border: "none",
                        width: "100%",
                        outline: "none",
                        borderBottom: "1px solid #000",
                      }}
                      required
                      onChange={(e) => set_state(e.target.value)}
                    >
                      {items.map((valuess) => (
                        <option value={valuess.value1}>{valuess.value}</option>
                      ))}
                    </select>
                  </div>
                  <div className="wrapperDiv">
                    <label className="classLable">Postal/Zip Code:</label>
                    <input
                      type="text"
                      pattern="^\d{5}(?:[-\s]\d{4})?$"
                      title="Zip code should be in the valid format"
                      value={postal_code}
                      required
                      onChange={(e) => set_postal_code(e.target.value)}
                      className="inputField"
                    />
                  </div>
                  <div className="wrapperDiv">
                    <label className="classLable">Country:</label>
                    <DatalistInput
                      style={{ borderRadius: "0px" }}
                      value="United States"
                      placeholder="Select your country"
                      onSelect={(item) => set_country("U.S.")}
                      inputProps={{
                        // title: 'Please select an ice cream flavor',
                        required: true,
                        // pattern: `^(${items.map((i) => i.value).join('|')})$`,
                        readOnly: true,
                      }}
                      items={[{ value1: "U.S.", value: "United States" }]}
                    />
                  </div>

                  <div class="Dgreat">
                    <br />
                    <div class="bk">
                      <div
                        class="ft-image"
                        style={{
                          fontFamily: "altgothic",
                          color: "orange",
                          fontSize: "30px",
                          letterSpacing: "4px",
                        }}
                      >
                        BE GREAT.
                      </div>
                      <br />
                      <input
                        class="btn px-5 textAlign-center"
                        style={{
                          backgroundColor: "orange",
                          color: "white",
                          paddingTop: "10px",
                        }}
                        type="submit"
                        value="SUBMIT"
                      ></input>
                    </div>
                  </div>
                  <br />
                  <br />
                  {state15}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Career;
