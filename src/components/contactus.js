import React, { useState } from "react";
import { Link } from "react-router-dom";
import DatalistInput from "react-datalist-input";
import "react-datalist-input/dist/styles.css";
import axios from "axios";
import useDocumentTitle from "./useDocumentTitle";

const ContactUs = () => {
  useDocumentTitle("Contact Us - Tecton")
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [howCanWeHelpYou, setHowCanWeHelpYou] = useState("");
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState();
  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post(`${process.env.REACT_APP_PROXY_URL}/api/contact`, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        howCanWeHelpYou: howCanWeHelpYou,
        message: message,
      })
      .then((res) => {
        // console.log(res);
        setFirstName("");
        setLastName("");
        setEmail("");
        setHowCanWeHelpYou("");
        setMessage("");
        if (res) {
          setAlert(
            <div style={{width:"72.5%"}} class="alert alert-info " role="alert">
              Your message has been submitted.
            </div>
          );
        }
      });
  };

  return (
    <div className="contact-container">
    <div class="font-contact">
       <div class="row">
      <div class="col-sm-3 ">
        <div class="contact-info"></div>
      </div>
      <div class="col-sm-8 ">
        <div className="contact-margin">
      <form onSubmit={handleSubmit}>
        <div class="my-acc">
        <div class="mb-3">
						<label for="exampleInputEmail1" class="form-label" style={{ color: "orange" }}><h3><b>CONTACT US</b></h3></label>
					</div>
          <div>
            {/* <p>View our Frequently Asked Questions <Link to="" style={{color:"orange"}}>here.</Link></p> */}

            <p className="contact-us-">
              Have another question? Fill out the form below and we will get
              back to you as soon as possible.{" "}
            </p>
          </div>
        </div>
        <div class="detail">
       
          <br />
          <div class="col-cvv">
      
            <input
              type="text"
              class="form-control-ship-exp-acc "
              placeholder="First Name"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              class="form-control-ship-exp-acc"
              placeholder="Last Name"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <br />
          <div class="col" style={{ marginTop: "10px" }}>
            <input
              type="email"
              pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                title="username@xyz.com"
              class="form-control-ship-acc "
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
      
          <div class="col-contact" style={{ paddingTop: "2px", paddingBottom: "11px" }}>
            <DatalistInput
              
              class="form-control-ship-exp"
              style={{ width: "73%" ,fontSize: "1rem"}}
              placeholder="How can we help you?"
              onSelect={(item) => setHowCanWeHelpYou(item.value)}
              inputProps={{
                
                required: true,
                
              }}
              items={[
                { value: "Orders" },
                { value: "Customer Service" },
                { value: "Science" },
                { value: "Ambassador Program" },
                { value: "Others" },
              ]}
              value={howCanWeHelpYou}
            />
          </div>
          
          <div className="text-area-contact">
          <textarea
            // rows="4"
            // cols="98"
            name="message"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            form="usrform"
            style={{
              width: "72.1%",
              paddingLeft: "10px",
    height: "117px",
              border: "1px solid #D9D9D9",
              borderRadius: "5px",
              color: "grey",
              fontSize:"0.9rem"
            }}
          >
              Message...
          </textarea>
          </div>
        </div>
        <div class="group">
        <input class="btn px-5"
            style={{ backgroundColor: "orange", color: "white" ,paddingTop:"12px"}} type="submit" value="SEND"  ></input>
            <br />
            <br />
            {alert}
        </div>
        </form>
        <br/>
        <div style={{display:"flex"}}>
        
        <hr style={{border: "1px solid #D9D9D9",width: "330px"}}></hr>&nbsp; &nbsp; &nbsp; &nbsp;<span style={{color:"#D9D9D9"}}>or </span>&nbsp; &nbsp; &nbsp; &nbsp;<hr style={{border: "1px solid #D9D9D9",width: "330px"}}></hr>
        </div>
        <br/>
        <div class="contact-call">
        <h5 style={{color:"orange",fontWeight:"bold"}}>
        Call Us at 785-Ketones
          </h5>
          <h5 style={{color:"black",fontWeight:"bold"}}>
          (785) 538-6637
          </h5>
          </div>

        </div>
        </div>
    </div>
    </div>
    </div>
  );
};

export default ContactUs;
