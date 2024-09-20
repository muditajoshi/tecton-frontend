import axios from "axios";
import React from "react";
import { useState } from "react";
import Cancelsubscription from "../components/cancelsubscription";
import { useSelector, useDispatch } from "react-redux";

function UnsubscribeSurvey({ close, subbbid }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const config = userInfo.isSocialLogin
    ? {
        headers: {
          Authorization: `SocialLogin ${userInfo.id}`,
        },
      }
    : {
        headers: {
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      };
 
const [toggle, setToggle] = useState(false);
 const [select, setSelect] = useState([]);
  const [message, setmessage] = useState();
  const [error, setError] = useState(false);
  const handleToggle = () => {
    if (select.length === 0) {
      setError(true);
      return; 
    }
  setToggle((pre) => !pre);
    axios
      .post(
        `${process.env.REACT_APP_PROXY_URL}/api/subscription/${subbbid}/cancel-subscription`,
        {
          firstName: userInfo.firstName,
          lastname: userInfo.lastname,
          email: userInfo.email,
          phoneNo: userInfo.phoneNo,
          reason: select,
          message: message ? message :"-",
        },
        config
      )
      .then((res) => {
        if (res) {
          window.location.reload(false);
        }
      })
      .catch((err) => {
        if (err) {
          window.location.reload(false);
        }
      });
  };
 
  const handleSkipSurvey = () => {
  const reason = select.length > 0 ? select : "Skipped survey";
   setToggle((pre) => !pre);
    axios
      .post(
        `${process.env.REACT_APP_PROXY_URL}/api/subscription/${subbbid}/cancel-subscription`,
        {
          firstName: userInfo.firstName,
          lastname: userInfo.lastname,
          email: userInfo.email,
          phoneNo: userInfo.phoneNo,
          reason: reason,
          message:message ? message : "Skipped survey"
        },
        config
      )
      .then((res) => {
        if (res) {
          window.location.reload(false);
        }
      })
      .catch((err) => {
        if (err) {
          window.location.reload(false);
        }
      });
  };

  const handleCheckboxChange = (value) => {
   if (select.includes(value)) {
     setSelect((prevSelect) => prevSelect.filter((item) => item !== value));
    } else {
     setSelect((prevSelect) => [...prevSelect, value]);
    }
  };

  return (
    <div className="popup-box-quick">

      <div className="box-quick-subcription-skip-survey">
        <div class="m-acc">
          <h3 style={{ textAlign: "left" }} class="edit-sub-heading">
            <b>Unsubscribe</b>
          </h3>
          
          <span className="close-icon" onClick={() => close()}>
            {" "}
            x
          </span>
          <div className="unsubscribe-survey-text">
            We hope to see you again in the future! Perhaps you can help us to
            bring you back by helping us improve.
          </div>
          <br />
          <div className="unsubscribe-survey-text2">
            <b>What is your reason for unsubscribing?</b>
          </div>

          <div className="unsubscribe-survey-text3">Select all that apply.</div>
        
          {error && 
            <div
              style={{ color: "red",fontSize:"13px",textAlign:"left" }}>Please select atleast one option
            </div>
          }
          
          <div className="unsubscrive-survey-cancel-option" >
          <div className="unsubscrive-survey-cancel" >
          <div className="unsubscribe-survey-text4">
            <input
              type="checkbox"
              value="Don’t need it anymore"
              onChange={(e) => handleCheckboxChange(e.target.value)}
              required
              class="form-check-input"
              id="exampleCheck1"
            />
            <p>Don’t need it anymore</p>
          </div>
          <div className="unsubscribe-survey-text4">
            <input
              value="Too expensive"
              onChange={(e) => handleCheckboxChange(e.target.value)}
              type="checkbox"
              required
              class="form-check-input"
              id="exampleCheck1"
            />
            <p>Too expensive</p>
          </div>
          </div>
          <div className="unsubscrive-survey-cancel" >
          <div className="unsubscribe-survey-text4">
            <input
              value="Found a better product"
              onChange={(e) => handleCheckboxChange(e.target.value)}
              type="checkbox"
              required
              class="form-check-input"
              id="exampleCheck1"
            />
            <p>Found a better product</p>
          </div>
          <div className="unsubscribe-survey-text4">
            <input
              value="Prefer to pick up in store nearby"
              onChange={(e) => handleCheckboxChange(e.target.value)}
              type="checkbox"
              required
              class="form-check-input"
              id="exampleCheck1"
            /><p>Prefer to pick up in store nearby</p>
           
          </div>
         </div>
         </div>
        
          <textarea
            className="unsubscribe-textarea"
            name="message"
            placeholder="Message"
            value={message}
            onChange={(e) => setmessage(e.target.value)}
          ></textarea>
          <br />
          <div>
            <button class="edit-sub-favorite-button" onClick={handleSkipSurvey}>
              SKIP SURVEY
            </button>
          </div>

          <div class="ask-add-quick">
            <button onClick={handleToggle} class="edit-sub-update-button">
              UNSUBSCRIBE
            </button>
            {toggle && <Cancelsubscription close={() => setToggle(false)} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnsubscribeSurvey;
