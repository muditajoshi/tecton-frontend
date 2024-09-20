import LOGO from "../images/LOGO.png";
import "../css/Footer.css";
import social from "../images/social.png";
import footer from "../images/footerimage.jpg";
import { Link } from "react-router-dom";
import facebook_icon from "../images/facebook_icon.svg";
import twitter_icon from "../images/newshop/logo-black.twiter1920.jpg";
import instagram_icon from "../images/instagram_icon.svg";
import linkedin_icon from "../images/linkedin_icon.svg";
import BEGREAT from "../images/BEGREAT.png";
function Footer() {
  return (
    <div>
    {/*  for the mobile view */}
 
     <div
          id="footer-mobile"
          class="col-sm-6 footer-two"
          style={{ textAlign: "center" }}
        >
          <img src={LOGO} width="140px"></img>
          <br />
          <br />
          <div class="footer-one-text">
            All humans have (extra)ordinary potential. This can manifest in
            little actions of everyday kindness or great new discoveries.
          </div>
          <br />
          <div class="col-sm-12 col-xs-12 col-md-12 col-lg-6  footer-one-one mobile_about">
            <div style={{ fontFamily: "aktivExt", paddingBottom: "3px" }}>
              ABOUT
            </div>
 
            <h6>
              {" "}
              <a
                style={{ textDecoration: "none", color: "black" }}
                href="https://blog.tectonlife.com/true-purpose"
              >
                MISSION{" "}
              </a>
            </h6>
 
            <h6>
              {" "}
              <a
                style={{ textDecoration: "none", color: "black" }}
                href="/ambassador"
              >
                BE AN AMBASSADOR{" "}
              </a>
            </h6>
 
            <h6>
              <a
                href="/careers"
                style={{ textDecoration: "none", color: "black" }}
              >
                CAREERS
              </a>
            </h6>
 
            <h6>
              <a
                href=" https://blog.tectonlife.com/contact-us/."
                style={{ textDecoration: "none", color: "black" }}
              >
                CONTACT
              </a>
            </h6>
 
            <h6>CALL US: (785) 538-6637</h6>
 
            <div
              style={{
                fontFamily: "aktivExt",
                paddingTop: "23px",
                paddingBottom: "3px",
              }}
            >
              {" "}
              PRODUCT
            </div>
 
            <h6>
              {" "}
              <a
                href="/shop"
                style={{ textDecoration: "none", color: "black" }}
              >
                SHOP{" "}
              </a>
            </h6>
 
            <h6>
              {" "}
              <a
                href="https://blog.tectonlife.com/science"
                style={{ textDecoration: "none", color: "black" }}
              >
                SCIENCE{" "}
              </a>
            </h6>
 
            <h6>
              {" "}
              <a
                href="/sitemap"
                style={{ textDecoration: "none", color: "black" }}
              >
                SITEMAP{" "}
              </a>
            </h6>
 
            <h6>
              {" "}
              <a
                href="/termsOfService"
                style={{ textDecoration: "none", color: "black" }}
                // target="_blank"
              >
                TERMS OF SERVICE{" "}
              </a>
            </h6>
 
            <h6>
              <a
                href="/privacyPolicy"
                style={{ textDecoration: "none", color: "black" }}
              >
                PRIVACY POLICY{" "}
              </a>
            </h6>
 
            <h6>
              {" "}
              <a
                href="/refundpolicy"
                style={{ textDecoration: "none", color: "black" }}
              >
                REFUND POLICY
              </a>
            </h6>
 
            <h6>
              {" "}
              <a
                href="https://signup.cj.com/member/signup/publisher/?cid=6381718#/branded"
                target="_blank"
                style={{ textDecoration: "none", color: "black" }}
              >
                JOIN OUR AFFILIATES PROGRAM
              </a>
            </h6>
          </div>
          <br />
          <div class="footer-one-bottom">
            ©2024 Tecton BG, INC. Being great means doing the right thing.
          </div>
          <br />
          <div class="be">
            <div
              class="ft-image"
              style={{
                fontFamily: "altgothic",
                color: "orange",
                fontSize: "30px",
                letterSpacing: "4px",
              }}
            >
              {" "}
              BE GREAT.
            </div>
          </div>
          <br />
          <div className="justify-content-center">
            <a
              href="https://www.facebook.com/Tecton-101116088857657/"
              target="_blank"
            >
              <img class="img2" src={facebook_icon} alt="facebook_icon"></img>
            </a>
            <a href="https://twitter.com/tectonlife" target="_blank">
              <img class="img2" src={twitter_icon} alt="twitter_icon" style={{height:"80%",marginTop:"8px"}}></img>
            </a>
            <a href="https://www.instagram.com/tectonlife/" target="_blank">
              <img class="img2" src={instagram_icon} alt="instagram_icon"></img>
            </a>
            <a
              href="https://www.linkedin.com/showcase/tectonlife/about/"
              target="_blank"
            >
              <img class="img2" src={linkedin_icon} alt="linkedin_icon"></img>
            </a>
          </div>
     </div>
 
     {/* for the Ipad View */}
 
     <div
        id="footer_for_Ipad"
        class="row main_footer_div"
        style={{ paddingBottom: "20px" }}
      >
        <div id="footer-one" class="left_div_main_footer">
          <div class="footer-one-text">
            All humans have (extra)ordinary potential. This can manifest in
            little actions of everyday kindness or great new discoveries.
          </div>
          <div class="row middle_div_left_div_main_footer">
            <div class=" footer-one-one">
              <div style={{ fontFamily: "aktivExt", paddingBottom: "3px" }}>
                {" "}
                PRODUCT
              </div>
              <a
                href="/shop"
                style={{ textDecoration: "none", color: "black" }}
              >
                <h6>SHOP</h6>
              </a>
              <a
                href="https://blog.tectonlife.com/science"
                style={{ textDecoration: "none", color: "black" }}
              >
                <h6>SCIENCE</h6>
              </a>
              <a
                href="/sitemap"
                style={{ textDecoration: "none", color: "black" }}
              >
                <h6>SITEMAP</h6>
              </a>
              <a
                href="/termsOfService"
                style={{ textDecoration: "none", color: "black" }}
              >
                <h6>TERMS OF SERVICE</h6>
              </a>
              <a
                href="/privacyPolicy"
                style={{ textDecoration: "none", color: "black" }}
              >
                <h6>PRIVACY POLICY</h6>
              </a>
              <h6>
                {" "}
                <a
                  href="/refundpolicy"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  REFUND POLICY
                </a>
              </h6>
              <h6>
                {" "}
                <a
                  href="https://signup.cj.com/member/signup/publisher/?cid=6381718#/branded"
                  target="_blank"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  JOIN OUR AFFILIATES PROGRAM
                </a>
              </h6>
            </div>
            <div class="footer-one-two">
              <div style={{ fontFamily: "aktivExt", paddingBottom: "3px" }}>
                ABOUT
              </div>
              <a
                style={{ textDecoration: "none", color: "black" }}
                href="https://blog.tectonlife.com/true-purpose"
              >
                <h6>MISSION</h6>
              </a>
              <a
                style={{ textDecoration: "none", color: "black" }}
                href="/ambassador"
              >
                {" "}
                <h6>BE AN AMBASSADOR</h6>
              </a>
              <a
                href="/careers"
                style={{ textDecoration: "none", color: "black" }}
              >
                <h6>CAREERS</h6>
              </a>
              <a
                href=" https://blog.tectonlife.com/contact-us/."
                style={{ textDecoration: "none", color: "black" }}
              >
                <h6>CONTACT</h6>
              </a>
              <a style={{ textDecoration: "none", color: "black" }}>
                <h6>CALL US: (785) 538-6637</h6>
              </a>
            </div>
          </div>
 
          <div class="footer-one-bottom">
            ©2024 Tecton BG, INC. Being great means doing the right thing.
          </div>
        </div>
        <div
          id="footers-two"
          class="col-sm-5 footer-two right_div_main_footer"
          style={{ textAlign: "center" }}
        >
          <div className="footer_tecton_log_div">
            <img src={LOGO} width="140px"></img>
          </div>
          <br />
          <div class="be">
            <div
              class="ft-image"
              style={{
                fontFamily: "altgothic",
                color: "orange",
                fontSize: "30px",
                letterSpacing: "4px",
              }}
            > 
              {" "}
              BE GREAT.
            </div>
          </div>
 
          <div className="justify-content-center logo_divf">
            <div>
              <a
                href="https://www.facebook.com/Tecton-101116088857657/"
                target="_blank"
              >
                <img class="img2" src={facebook_icon} alt="facebook_icon"></img>
              </a>
            </div>
            <div>
              <a href="https://twitter.com/tectonlife" target="_blank">
                <img class="img2" src={twitter_icon} alt="twitter_icon"></img>
              </a>
            </div>
            <div>
              <a href="https://www.instagram.com/tectonlife/" target="_blank">
                <img
                  class="img2"
                  src={instagram_icon}
                  alt="instagram_icon"
                ></img>
              </a>
            </div>
            <div>
              <a
                href="https://www.linkedin.com/showcase/tectonlife/about/"
                target="_blank"
              >
                <img class="img2" src={linkedin_icon} alt="linkedin_icon"></img>
              </a>
            </div>
          </div>
        </div>
      </div>
   
     {/* for the Desktop View */}
 
       <div
        id="footer_for_Desktop"
        class="row main_footer_div"
        style={{ paddingBottom: "20px" }}
      >
        <div id="footer-one" class="left_div_main_footer">
          <div class="footer-one-text">
            All humans have (extra)ordinary potential. This can manifest in
            little actions of everyday kindness or great new discoveries.
          </div>
          <div class="row middle_div_left_div_main_footer">
            <div class=" footer-one-one">
              <div style={{ fontFamily: "aktivExt", paddingBottom: "3px" }}>
                {" "}
                PRODUCT
              </div>
              <a
                href="/shop"
                style={{ textDecoration: "none", color: "black" }}
              >
                <h6>SHOP</h6>
              </a>
              <a
                href="https://blog.tectonlife.com/science"
                style={{ textDecoration: "none", color: "black" }}
              >
                <h6>SCIENCE</h6>
              </a>
              <a
                href="/sitemap"
                style={{ textDecoration: "none", color: "black" }}
              >
                <h6>SITEMAP</h6>
              </a>
              <a
                href="/termsOfService"
                style={{ textDecoration: "none", color: "black" }}
              >
                <h6>TERMS OF SERVICE</h6>
              </a>
              <a
                href="/privacyPolicy"
                style={{ textDecoration: "none", color: "black" }}
              >
                <h6>PRIVACY POLICY</h6>
              </a>
              <h6>
                {" "}
                <a
                  href="/refundpolicy"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  REFUND POLICY
                </a>
              </h6>
              <h6>
                {" "}
                <a
                  href="https://signup.cj.com/member/signup/publisher/?cid=6381718#/branded"
                  target="_blank"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  JOIN OUR AFFILIATES PROGRAM
                </a>
              </h6>
            </div>
            <div class="footer-one-two">
              <div style={{ fontFamily: "aktivExt", paddingBottom: "3px" }}>
                ABOUT
              </div>
              <a
                style={{ textDecoration: "none", color: "black" }}
                href="https://blog.tectonlife.com/true-purpose"
              >
                <h6>MISSION</h6>
              </a>
              <a
                style={{ textDecoration: "none", color: "black" }}
                href="/ambassador"
              >
                {" "}
                <h6>BE AN AMBASSADOR</h6>
              </a>
              <a
                href="/careers"
                style={{ textDecoration: "none", color: "black" }}
              >
                <h6>CAREERS</h6>
              </a>
              <a
                href=" https://blog.tectonlife.com/contact-us/."
                style={{ textDecoration: "none", color: "black" }}
              >
                <h6>CONTACT</h6>
              </a>
              <a style={{ textDecoration: "none", color: "black" }}>
                <h6>CALL US: (785) 538-6637</h6>
              </a>
            </div>
          </div>
 
          <div class="footer-one-bottom">
            ©2024 Tecton BG, INC. Being great means doing the right thing.
          </div>
        </div>
        <div
          id="footers-two"
          class="col-sm-5 footer-two right_div_main_footer"
          style={{ textAlign: "center" }}
        >
          <div className="footer_tecton_log_div">
            <img src={LOGO} width="140px"></img>
          </div>
          <br />
          <div class="be">
            <div
              class="ft-image"
              style={{
                fontFamily: "altgothic",
                color: "orange",
                fontSize: "30px",
                letterSpacing: "4px",
              }}
            >
              {" "}
              BE GREAT.
            </div>
          </div>
 
          <div className="justify-content-center logo_divf">
            <div>
              <a
                href="https://www.facebook.com/Tecton-101116088857657/"
                target="_blank"
              >
                <img class="img2" src={facebook_icon} alt="facebook_icon"></img>
              </a>
            </div>
            <div>
              <a href="https://twitter.com/tectonlife" target="_blank">
                <img class="img2" src={twitter_icon} alt="twitter_icon"></img>
              </a>
            </div>
            <div>
              <a href="https://www.instagram.com/tectonlife/" target="_blank">
                <img
                  class="img2"
                  src={instagram_icon}
                  alt="instagram_icon"
                ></img>
              </a>
            </div>
            <div>
              <a
                href="https://www.linkedin.com/showcase/tectonlife/about/"
                target="_blank"
              >
                <img class="img2" src={linkedin_icon} alt="linkedin_icon"></img>
              </a>
            </div>
          </div>
        </div>
      </div>
 
    </div>
  );
}
 
export default Footer;