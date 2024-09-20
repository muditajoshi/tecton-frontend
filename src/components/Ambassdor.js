import React from "react";
import ScrollToTop from "./ScrollToTop";
import LOGOORANGE from "../images/Tecton side by side white logo.png";
import LOGOSIDE from "../images/Tecton side by side white logo.png";
import TECHW from "../images/TECHW.png";
import "../css/form2.css";
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
import useDocumentTitle from "./useDocumentTitle";

function Ambassador() {
  useDocumentTitle("Become an Ambassador");
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
  const [state1, setstate1] = useState();
  const [state2, setstate2] = useState();
  const [state3, setstate3] = useState();
  const [state4, setstate4] = useState();
  const [state5, setstate5] = useState();
  const [state6, setstate6] = useState();
  const [state7, setstate7] = useState();
  const [state8, setstate8] = useState();
  const [state9, setstate9] = useState();
  const [state10, setstate10] = useState();
  const [state11, setstate11] = useState();
  const [state12, setstate12] = useState();
  const [state13, setstate13] = useState();
  const [state14, setstate14] = useState();
  const [state15, setstate15] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [desh, newdesh] = useState();
  const [rajya, newrajya] = useState();
  const [firstName, set_firstName] = useState("");
  const [lastName, set_lastName] = useState("");
  const [email, set_email] = useState("");
  const [where_did_you_hear_about_tecton, set_where_did_you_hear_about_tecton] =
    useState("");
  const [city, set_city] = useState("");
  const [state, set_state] = useState("AK");
  const [postal_code, set_postal_code] = useState("");
  const [country, set_country] = useState("U.S.");
  const [twitter_handle, set_twitter_handle] = useState("");
  const [instagram_handle, set_instagram_handle] = useState("");
  const [tiktok_handle, set_tiktok_handle] = useState("");
  const [other_social_media_link, set_other_social_media_link] = useState("");
  const [short_bio, set_short_bio] = useState("");
  const [street_address, set_street_address] = useState("");
  const [referrerfirstname, setReferrerFirstName] = useState("");
  const [referrerlastname, setReferrerLastName] = useState("");
  const [referreremail, setReferrerEmail] = useState("");
  const [terms, setTerms] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [taxError, setTaxError] = useState();

  const submitForm = (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    axios
      .post(`${process.env.REACT_APP_PROXY_URL}/api/avalara/validate-address`, {
        billingAddress: {
          address: street_address,

          city: city,

          state: state,

          postalCode: postal_code,

          firstName: firstName,

          lastName: lastName,

          email: email,
        },
      })
      .then(() => {
        setTaxError("");

        axios
          .post(`${process.env.REACT_APP_PROXY_URL}/api/ambassador`, {
            firstName: firstName,
            lastName: lastName,
            email: email,
            where_did_you_hear_about_tecton: where_did_you_hear_about_tecton,
            city: city,
            state: state,
            postal_code: postal_code,
            country: country,
            twitter_handle: twitter_handle,
            instagram_handle: instagram_handle,
            tiktok_handle: tiktok_handle,
            other_social_media_link: other_social_media_link,
            short_bio: short_bio,
            street_address: street_address,
            referrerFirstName: referrerfirstname,
            referrerLastName: referrerlastname,
            referrerEmail: referreremail,
            termsAndConditions: terms,
          })
          .then((result) => {
            set_city("");
            set_email("");
            set_firstName("");
            set_lastName("");
            set_instagram_handle("");
            set_other_social_media_link("");
            set_twitter_handle("");
            set_tiktok_handle("");
            set_street_address("");
            set_postal_code("");
            set_short_bio("");
            set_where_did_you_hear_about_tecton("");
            setReferrerLastName("");
            setReferrerFirstName("");
            setReferrerEmail("");
            setTerms(false);
            setIsChecked(false);
            if (result?.data?.status === "success") {
              setIsSubmitting(false);
              setstate15(
                <div class="alert alert-success" role="alert">
                  Thank you for submitting the form!!
                </div>
              );
              setTimeout(() => {
                setstate15(null);
              }, 4000);
            }
          })
          .catch((err) => {
            if (err) {
              if (err.response.data.message === "user already exists") {
                setstate15(
                  <div class="alert alert-danger" role="alert">
                    user already exists!!
                  </div>
                );
                setTimeout(() => {
                  setstate15(null);
                }, 4000);
              }
            }
          })
          .finally(() => {
            setIsSubmitting(false);
          });

        // setstate15(<span style={{color:"green"}}>From submitted!!</span>)
      })
      .catch((error) => {
        console.log(error?.response?.data?.message);
        setTaxError(error?.response?.data?.message);
        setIsSubmitting(false);
      });
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
        <ScrollToTop />
        <div class="board1">
          <div class="content-ambassador">
            <div class="pret-text">
              <div class="well">
                <label
                  for="exampleInputEmail1"
                  class="form-label"
                  style={{ color: "orange" }}
                >
                  <h3>
                    <b>BECOME A TECTON AMBASSADOR</b>
                  </h3>
                </label>
              </div>
            </div>
            <div class="first-part" style={{ backgroundColor: "orange" }}>
              <b style={{}}>Tecton®</b> is a purpose driven company with a
              mission to help people discover the extraordinary in themselves
              and in others. <b>Tecton®</b> is the world’s first “focused
              performance” beverage that contains a nature-identical ketone
              produced through a proprietary and natural enzymatic process. Read
              more about the science behind
              <b> Tecton®</b>.
              <br />
              <br />
              The company has been co-founded by a Special Forces Combat Medic
              and the son of a Fighter Pilot. They both believe that we need to
              take care of veterans, especially those who suffer from the
              consequences of having been in war. One percent of our revenues go
              to nonprofits that help disabled veterans and their families get
              back on their feet.
              <br />
              <br />
              As an ambassador, you will get first access to our newest products
              designed to help with recovery, weight loss, neuroprotection,
              cognitive focus and more. <br />
              <br />
              Are you an ambassador for living life to the fullest? Being
              healthy, being present, and showing up in the world at your very
              best? <br />
              <br />
              Then connect with the founders of
              <b> Tecton®</b> and learn more about how we can work together.
              Help us make a difference.
              <br />
            </div>
            <br />
            <div class="second-part">
              <div class="sant">
                <span>
                  (<span style={{ color: "red" }}>*</span>)
                </span>
                Mandatory fields.
                <p class="am-bass"> CONTACT INFORMATION</p>
                <div class="in-de">
                  <form onSubmit={submitForm}>
                    <div className="wrapperDiv">
                      <label className="classLable">
                        <span style={{ color: "red" }}>*</span>First Name:
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        required
                        onChange={(e) => set_firstName(e.target.value)}
                        className="inputField"
                      />
                    </div>
                    {state1}
                    <div className="wrapperDiv">
                      <label className="classLable">
                        <span style={{ color: "red" }}>*</span>Last Name:
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        required
                        onChange={(e) => set_lastName(e.target.value)}
                        className="inputField"
                      />
                    </div>
                    {state2}
                    <div className="wrapperDiv">
                      <label className="classLable">
                        <span style={{ color: "red" }}>*</span>Email:{" "}
                      </label>
                      <input
                        type="email"
                        value={email}
                        required
                        pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                        title="username@xyz.com"
                        onChange={(e) => set_email(e.target.value)}
                        className="inputField"
                      />
                    </div>
                    {state3}
                    <div className="wrapperDiv">
                      <label className="classLable">
                        <span style={{ color: "red" }}>*</span>
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
                    <div className="w">
                      <p class="am-bass">
                        {" "}
                        PLEASE LET US KNOW WHO REFERRED YOU ?
                      </p>
                    </div>
                    <div className="wrapperDiv">
                      <label className="classLable">First Name:</label>
                      <input
                        type="text"
                        value={referrerfirstname}
                        onChange={(e) => setReferrerFirstName(e.target.value)}
                        className="inputField"
                      />
                    </div>
                    <div className="wrapperDiv">
                      <label className="classLable">Last Name:</label>
                      <input
                        type="text"
                        value={referrerlastname}
                        onChange={(e) => setReferrerLastName(e.target.value)}
                        className="inputField"
                      />
                    </div>
                    {state4}
                    <div className="wrapperDiv">
                      <label className="classLable">Email:</label>
                      <input
                        type="email"
                        value={referreremail}
                        pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                        title="username@xyz.com"
                        onChange={(e) => setReferrerEmail(e.target.value)}
                        className="inputField"
                      />
                    </div>
                    <br />
                    <p class="am-bass">SOCIAL MEDIA PRESENCE</p>
                    <div className="wrapperDiv">
                      <label className="classLable">Twitter Handle:</label>
                      <input
                        type="text"
                        value={twitter_handle}
                        onChange={(e) => set_twitter_handle(e.target.value)}
                        className="inputField"
                      />
                    </div>
                    {state5}
                    <div className="wrapperDiv">
                      <label className="classLable">Instagram Handle:</label>
                      <input
                        type="text"
                        value={instagram_handle}
                        onChange={(e) => set_instagram_handle(e.target.value)}
                        className="inputField"
                      />
                    </div>
                    {state6}
                    <div className="wrapperDiv">
                      <label className="classLable">TikTok Handle:</label>
                      <input
                        type="text"
                        value={tiktok_handle}
                        onChange={(e) => set_tiktok_handle(e.target.value)}
                        className="inputField"
                      />
                    </div>
                    {state7}
                    <div className="wrapperDiv">
                      <label className="classLable">
                        Other Social Media Links:
                      </label>
                      <input
                        type="text"
                        value={other_social_media_link}
                        onChange={(e) =>
                          set_other_social_media_link(e.target.value)
                        }
                        className="inputField"
                      />
                    </div>
                    {state8}
                    <br />
                    <p class="am-bass">SHORT BIO</p>
                    <div className="wrapperDiv">
                      <label className="classLable">
                        <span style={{ color: "red" }}>*</span>
                        (100 Words Why You Should Be A TECTON® Ambassador):
                      </label>
                      <input
                        type="text"
                        value={short_bio}
                        required
                        onChange={(e) => set_short_bio(e.target.value)}
                        className="inputField"
                      />
                    </div>
                    {state9}
                    {/* <input type="text" class="text-lines" style={{}} />
                    <input type="text" class="text-linet" style={{}} />
                    <input type="text" class="text-lineu" style={{}} />
                    <input type="text" class="text-linev" style={{}} />
                    <input type="text" class="text-linew" style={{}} /> <br /> */}{" "}
                    <div className="wrapperDiv">
                      <label className="classLable">
                        <span style={{ color: "red" }}>*</span>Street Address:
                      </label>
                      <input
                        type="text"
                        value={street_address}
                        required
                        onChange={(e) => set_street_address(e.target.value)}
                        className="inputField"
                      />
                    </div>
                    {state10}
                    <div className="wrapperDiv">
                      <label className="classLable">
                        <span style={{ color: "red" }}>*</span>City:
                      </label>
                      <input
                        type="text"
                        value={city}
                        required
                        onChange={(e) => set_city(e.target.value)}
                        className="inputField"
                      />
                    </div>
                    {state11}
                    <div className="wrapperDiv">
                      <label className="classLable">
                        <span style={{ color: "red" }}>*</span>State:{" "}
                      </label>
                      <div className="inputField">
                        <select
                          style={{
                            border: "none",
                            outline: "none",
                            width: "100%",
                          }}
                          required
                          onChange={(e) => set_state(e.target.value)}
                        >
                          {items.map((valuess) => (
                            <option value={valuess.value1}>
                              {valuess.value}
                            </option>
                          ))}
                        </select>
                        {state12}
                      </div>
                    </div>
                    <div className="wrapperDiv">
                      <label className="classLable">
                        <span style={{ color: "red" }}>*</span>Postal Code:
                      </label>
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
                    {state13}
                    <div className="wrapperDiv">
                      <label className="classLable">
                        <span style={{ color: "red" }}>*</span>Country:
                      </label>
                      <DatalistInput
                        style={{ borderRadius: "0px" }}
                        placeholder="Select your country"
                        value="United States"
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
                    <br />
                    <div class="mb-form-ambassador">
                      <input
                        type="checkbox"
                        onClick={(e) => setTerms(true)}
                        class="form-check-input"
                        id="exampleCheck1"
                        required
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                        style={{ marginTop: "0px" }}
                      />
                      &nbsp;
                      <span className="ambassador-term">
                        I agree to our{" "}
                        <span
                          style={{
                            color: "orange",
                            textDecoration: "underline",
                          }}
                        >
                          <a href="/termsOfService"> Terms of Use</a>
                        </span>{" "}
                        and{" "}
                        <span
                          style={{
                            color: "orange",
                            textDecoration: "underline",
                          }}
                        >
                          <a href="/privacypolicy">Privacy Policy</a>
                        </span>.
                      </span>
                    </div>
                    <div class="Dgreat">
                      <div class="bP">
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
                        <span style={{ color: "red", paddingBottom: "10px" }}>
                          {taxError}
                        </span>
                        <br />
                        <button
                          class="btn px-5 textAlign-center"
                          style={{
                            backgroundColor: "orange",
                            color: "white",
                            paddingTop: "10px",
                          }}
                          type="submit"
                          value="SUBMIT"
                          disabled={isSubmitting}
                        >
                          SUBMIT
                        </button>{" "}
                        <br />
                        <br />
                        {state15}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ambassador;
