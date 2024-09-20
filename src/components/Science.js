import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import telescope from "../images/science.new.jpg";
import "../css/Science.css";
import { useState } from "react";
import redcan from "../images/Tecton_Magma (1).png";
import bluecan from "../images/Tecton_Glacier (1).png";
import blueblack from "../images/Tecton_Glacier_Back (1).png";
import redback from "../images/Tecton_Magma_Nutrition (3).png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlassMinus } from "@fortawesome/free-solid-svg-icons";
import useDocumentTitle from "./useDocumentTitle";
import bloomer from "../images/Tecton_GlucoseVsKetone.png";
import canimage from "../images/BothCans_Transparent.webp";
// import dot from '../images/Tecton_Science-14.png';
import dot1 from "../images/Tecton_Science_Caffeine.png";
import dot2 from "../images/Tecton_Science_Carbs.png";
import dot3 from "../images/Tecton_Science_Energy.png";
import dot4 from "../images/Tecton_Science_Ketones.png";
import dot5 from "../images/Tecton_Science_Ketogenisis_2.png";
import dot6 from "../images/Tecton_Science_ModernKeto_2.png";
import dot1phone from "../images/Tecton_Science_Caffeine_Mobile.png";
import dot2phone from "../images/Tecton_Science_Carbs_Mobile.png";
import dot3phone from "../images/Tecton_Science_Energy_Mobile.png";
import dot4phone from "../images/Tecton_Science_Ketones_Mobile.png";
import Meta from "../skeleton/Meta";
function Science() {
  useDocumentTitle("Science - Tecton");

  const [isActive, setIsActive] = useState(false);
  const [isActive1, setIsActive1] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);
  const [isActive4, setIsActive4] = useState(false);
  const [isActivep1, setIsActivep1] = useState(false);
  const [isActivep2, setIsActivep2] = useState(false);
  const [isActivep3, setIsActivep3] = useState(false);
  const [isActivep4, setIsActivep4] = useState(false);
  const [isActivep6, setIsActivep6] = useState(false);
  const [isActivep7, setIsActivep7] = useState(false);
  const [more, setmore] = useState("none");
  const [more1, setmore1] = useState("none");
  const [isActive11, setIsActive11] = useState(false);
  const [isActive12, setIsActive12] = useState(false);
  const [isActive13, setIsActive13] = useState(false);
  const [isActive14, setIsActive14] = useState(false);
  const [isActive15, setIsActive15] = useState(false);

  const displaymore = () => {
    setmore("block");
    if (more === "block") {
      setmore("none");
    }
  };
  const displaymore1 = () => {
    setmore1("block");
    if (more1 === "block") {
      setmore1("none");
    }
  };

  return (
    <div className="science-font">
      <Meta title="Science" image={"http://localhost:3000/static/media/Tecton_Science_Caffeine.742af05e027686c0cd48.png"} url="new/nwe"/>
      <section class="space-one">
        <Carousel
          showThumbs={false}
          showIndicators={false}
          showStatus={false}
          thumbWidth="19%"
          autoPlay={false}
          showArrows={false}
          infiniteLoop={true}
          interval={3000}
        >
          <div>
            <div id="image-tel1">
              <div class="image-space">
                <div className="caption-section-1">
                  <div className="science-screen-size">
                <div className='image-landing-new-content 'style={{color:"black",lineHeight:"75px"}} ><span> A SEISMIC SHIFT<br/> IN OUR HEALTH</span> </div>
                </div>
              <div className="new-science-subheads"  >Ketones are a revolutionary fuel, created by nature to<br/> help you be your best, when you need it most. <br/>
                <br/>
                 Without the jitters and crashes of caffeine or sugar.</div>
              <div className='begreat-new' style={{paddingBottom:"5px",color:"black",paddingTop:"10px",fontSize:"45px"}}> BE GREAT.  </div>
              <Link to="./science/ketonesandsugar" class="select" style={{ color: "white", backgroundColor: "orange", padding: "10px 16px 7px 16px", fontSize: "15px", textAlign: "center", textDecoration: "none" }}> R E A D  &nbsp;  O N </Link>
                
                </div>
                <div className="caption-section-2">
                A SEISMIC SHIFT <br />
                IN OUR HEALTH <br />
            
                </div>
               
              </div>
            </div>
          </div>
        </Carousel>
      </section>
      <section>
        <div id="science-phone">
          <div class="container">
            <div className="mobile-first">
             
            Ketones are a revolutionary fuel, created by nature to
            help you be your best, when you need it most. 
              <br />
              <br />
              Without the jitters and crashes of caffeine or sugar.
              <br />
            </div>
            <div></div>
            <div class="science-new">
              <div className="container">
                <div class="row">
                  <div className="text-1-phone">
                    <div className="accordion-phone">
                      <div className="accordion-space">
                        <div
                          className="accordion-title-phone"
                          onClick={() => setIsActivep1(!isActivep1)}
                        >
                          <img src={dot1phone} style={{ width: "30%" }}></img>
                          <p
                            className="mobile-science-block"
                            style={{
                              fontSize: "17px",
                              paddingLeft: "10px",
                              paddingTop: "39px",
                            }}
                          >
                            <b>The Role of Caffeine</b>
                          </p>
                          <button
                            type="button"
                            class="collapsible-science-phone"
                          >
                            {isActivep1 ? "-" : "+"}
                          </button>
                        </div>
                        {isActivep1 && (
                          <div className="accordion-content-p">
                            According to the{" "}
                            <a
                              href="https://my.clevelandclinic.org/health/articles/15496-caffeine-how-to-hack-it-and-how-to-quit-it"
                              target="_blank"
                              style={{ textDecoration: "underline" }}
                            >
                              Cleveland Clinic
                            </a>
                            , while caffeine (found in most energy drinks) can
                            stimulate your heart to help you feel energized, it
                            can also cause insomnia, headaches, dehydration, and
                            high blood pressure if you’re not careful.
                            <br />
                            <br />
                            Many people get desensitized to caffeine, making it
                            less effective.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <br />
                  <div style={{ paddingTop: "20px" }}>
                    <div className="text-1-phone">
                      <div className="accordion-phone">
                        <div className="accordion-space">
                          <div
                            className="accordion-title-phone"
                            onClick={() => setIsActivep2(!isActivep2)}
                          >
                            <img src={dot2phone} style={{ width: "30%" }}></img>
                            <p
                              className="mobile-science-block"
                              style={{
                                fontSize: "18px",
                                paddingLeft: "10px",
                                paddingTop: "39px",
                              }}
                            >
                              <b>Carbs </b>
                            </p>
                            <button
                              type="button"
                              class="collapsible-science-phone-2"
                            >
                              {isActivep2 ? "-" : "+"}
                            </button>
                          </div>
                          {isActivep2 && (
                            <div className="accordion-content-p">
                              When consuming high amounts of simple sugars (e.g.
                              sugar- laden drinks), blood sugar can rise rapidly
                              (within 15 minutes) leading to a surge in insulin
                              production and release. <br />
                              <br />
                              The result? A rapid fall of blood sugar within the
                              first hour or so — often generating a feeling of
                              fatigue: the crash.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div style={{ paddingTop: "20px" }}>
                    <div className="text-1-phone">
                      <div className="accordion-phone">
                        <div className="accordion-space">
                          <div
                            className="accordion-title-phone"
                            onClick={() => setIsActivep3(!isActivep3)}
                          >
                            <img src={dot3phone} style={{ width: "30%" }}></img>
                            <p
                              className="mobile-science-block"
                              style={{
                                fontSize: "18px",
                                paddingLeft: "10px",
                                paddingTop: "39px",
                              }}
                            >
                              <b>Authentic Energy </b>
                            </p>
                            <button
                              type="button"
                              class="collapsible-science-phone-3"
                            >
                              {isActivep3 ? "-" : "+"}
                            </button>
                          </div>
                          {isActivep3 && (
                            <div className="accordion-content-p">
                              {" "}
                              We need real fuel, not a stimulant, to create real
                              energy (called ATP) in our cells. ATP can be
                              created using a variety of substrates.
                              <br />
                              <br />
                              But our brain cells can only use two things for
                              energy — glucose from carbs, or ketones.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="text-1-phone">
                      <div className="accordion-phone">
                        <div className="accordion-space">
                          <div
                            className="accordion-title-phone"
                            onClick={() => setIsActivep4(!isActivep4)}
                          >
                            <img src={dot4phone} style={{ width: "30%" }}></img>
                            <p
                              className="mobile-science-block"
                              style={{
                                fontSize: "18px",
                                paddingLeft: "10px",
                                paddingTop: "39px",
                              }}
                            >
                              <b>Ketones</b>
                            </p>
                            <button
                              type="button"
                              class="collapsible-science-phone-4"
                            >
                              {isActivep4 ? "-" : "+"}
                            </button>
                          </div>
                          {isActivep4 && (
                            <div className="accordion-content-p">
                              {" "}
                              When the body is deprived of carbs
                              (glucose/sugar), the liver breaks down fat for
                              energy. These fats are turned into energy-rich
                              ketones.
                              <br />
                              <br />
                              Supplemental ketones can provide the body with a
                              rapid energy source without impacting blood sugar!
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section>
            <div class="row">
              <div className="text-middle-phone" style={{ fontSize: "28px" }}>
                Curious about sugar vs.
                <br />
                ketone metabolism?
                <br />
                <div style={{ paddingTop: "20px", }}>
                  <Link to="/science/ketonesandsugar">
                    {" "}
                    <button className="read-science-1">READ MORE</button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div>
              <div className="text-10-phone">
                <img src={dot5} style={{ width: "100%" }}></img>
                <div></div>
              </div>
              <div className="text-5-phone">
                <p style={{ fontSize: "22px", paddingLeft: "10px" }}>
                  <b>How is Ketogenesis Triggered?</b>
                </p>
                <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                  Nature found a way to help humans to survive when we endured
                  extreme physical effort or starvation 
                </div>
                {isActivep7 && (
                  <div class="content-phone">
                  that depleted carbs in our bodies, a primary source of fuel.{" "}
                    <br />
                    <br />
                    In order to, perhaps evade predators or find our next morsel
                    of food, we needed a superior source of energy. This is when
                    our livers burn fat to produce one of nature's most
                    efficient fuels. These are called ketone bodies. <br />
                    <br />
                    To help us think more clearly, endure longer physical
                    effort, suppress hunger, and recover. And perhaps, live to
                    fight another day...
                  </div>
                )}

                <button
                  type="button"
                  class="coll-asap-phone"
                  onClick={() => setIsActivep7(!isActivep7)}
                >
                  {isActivep7 ? "Less" : "More"} &nbsp;
                  <i class="arrow down"></i>
                </button>
              </div>
              <br />
              <div className="text-10-phone">
                <img src={dot6} style={{ width: "100%" }}></img>
                <div></div>
              </div>
              <div className="text-5-phone">
                <p style={{ fontSize: "22px", paddingLeft: "10px" }}>
                  <b>Modern Ketogenic Diet</b>
                </p>
                <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                  This diet involves strictly limiting daily carb intake to less
                  than 50g (about 2 pieces of toast), along with a 
                </div>
                {isActivep6 && (
                  <div class="content-phone">
                  moderate amount of protein and a higher amount of fat. It’s been
                    around since the 1920’s to help people with epilepsy, and
                    more recently for weight loss and athletic performance. Most
                    people swear by it, but some struggle to sustain it.
                    <br />
                    <br />
                    Whether you can or cannot do this diet, Tecton can help by
                    suppressing hunger while giving you the fuel to increase
                    mental and physical performance.
                  </div>
                )}
                <button
                  type="button"
                  class="coll-asap-phone"
                  onClick={() => setIsActivep6(!isActivep6)}
                >
                  {isActivep6 ? "Less" : "More"} &nbsp;
                  <i class="arrow down"></i>
                </button>
              </div>
              <div class="col-sm-6">
                <div className="text-10-phone">
                  <img src={canimage} style={{ width: "100%" }}></img>
                </div>
                <br />
                <div className="text-10-phone-can">
                  <p style={{ fontSize: "25px" }}>
                    {" "}
                    <b>Tecton’s Nature-Identical Ketones</b>
                  </p>
                  Tecton contains nature-identical ketones that you can simply
                  drink. These ketones will provide the same fuel as those
                  produced through the keto diet. <br />
                  <br />
                  Tecton is the world’s only Ketone Hydration drink that
                  contains zero sugar, zero caffeine and no “1,3 butanediol” (a
                  secondary alcohol or ethanol dimer).
                  <br />
                  <br />
                  You can also drink Tecton as an accompaniment to the Keto
                  Diet. Some people use it as insurance to keep themselves in
                  ketosis even if they accidentally consume a few extra carbs.
                  <br />
                </div>
              </div>
              <div class="row ">
                <div className="text-12-phone">
                  Take advantage of nature's evolutionary fuel to discover your
                  (extra)ordinary potential.
                  <br />
                  <br />
                  To feel great. To do great.
                  <br /> To <b>BE GREAT. </b>
                </div>
              </div>
              <section>
                <div className="row">
                  <div className="bottom-content-phone">
                    <p style={{ fontSize: "30px" }}>
                      <b>Mayo Clinic PK Analysis</b>
                    </p>
                    <p>
                      Keto aware people may want to understand how Tecton will
                      raise their blood ketone levels and for how long. This
                      question is answered by doing what’s called a
                      pharmacokinetics study (PK, for short). <br />
                      <br />
                      We conducted our own PK study. Blood was drawn from
                      participants at 9 intervals over 12 hours in one day with
                      and without consumption of our ketones. The samples were
                      sent to Mayo Clinic’s Lab for analysis.
                      <br />
                      <br />
                      The data we received back indicated that our molecule is
                      rapidly absorbed and reaches peak concentration in 30 min,
                      putting you into ketosis. <br />
                    </p>
                    <div style={{ paddingTop: "20px" }}>
                      <Link to="/science/pkstudy">
                        {" "}
                        <button className="read-science">READ MORE</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </div>
      </section>

      <div id="science-desktop">
        <section class="container" style={{ paddingTop: "22px" }}>
          <div class="row">
            <div class="col-lg-6 col-sm-12">
              <div className="text-1" style={{ height: "44rem" }}>
                <img src={dot1} style={{ width: "60%" }}></img>
                <div className="text-2">
                  <div className="science-box-font"><p style={{ fontSize: "25px" }}>
                    <b>The Role of Caffeine</b>
                  </p></div>
                  <br />
                  According to the{" "}
                  <a
                    href="https://my.clevelandclinic.org/health/articles/15496-caffeine-how-to-hack-it-and-how-to-quit-it"
                    target="_blank"
                    style={{ textDecoration: "underline" }}
                  >
                    Cleveland Clinic
                  </a>
                  , while caffeine (found in most energy drinks) can stimulate
                  your heart to help you feel energized, it can also cause
                  insomnia, headaches, dehydration, and high blood pressure if
                  you’re not careful.
                  <br />
                  <br />
                  Many people get desensitized to caffeine, making it less
                  effective.
                </div>
                <div></div>
              </div>
            </div>

            <div class="col-lg-6 col-sm-12">
              <div className="text-1" style={{ height: "44rem" }}>
                <img src={dot3} style={{ width: "60%" }}></img>
                <div className="text-2">
                <div className="science-box-font">  <p style={{ fontSize: "25px" }}>
                    <b>Authentic Energy</b>
                  </p> </div>
                  <br />
                  We need real fuel, not a stimulant, to create real energy
                  (called ATP) in our cells. ATP can be created using a variety
                  of substrates.
                  <br />
                  <br />
                  But our brain cells can only use two things for energy —
                  glucose from carbs, or ketones.
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6 col-sm-12">
              <div className="text-1" style={{ height: "44rem" }}>
                <img src={dot2} style={{ width: "60%" }}></img>
                <div className="text-2">
                <div className="science-box-font"> <p style={{ fontSize: "25px" }}>
                    <b>Carbs </b>
                  </p> </div>
                  <br />
                  When consuming high amounts of simple sugars (e.g. sugar-laden
                  drinks), blood sugar can rise rapidly (within 15 minutes)
                  leading to a surge in insulin production and release.
                  <br />
                  <br />
                  The result? A rapid fall of blood sugar within the first hour
                  or so — often generating a feeling of fatigue: the crash.
                </div>
              </div>
            </div>

            <div class="col-lg-6 col-sm-12">
              <div className="text-1" style={{ height: "44rem" }}>
                <img src={dot4} style={{ width: "60%" }}></img>
                <div className="text-2">
                <div className="science-box-font">  <p style={{ fontSize: "25px" }}>
                    <b>Ketones </b>
                  </p> </div>
                  <br />
                  When the body is deprived of carbs (glucose/sugar), the liver
                  breaks down fat for energy. These fats are turned into
                  energy-rich ketones.
                  <br />
                  <br />
                  Supplemental ketones can provide the body with a rapid energy
                  source without impacting blood sugar!
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div class="row">
            <div className="text-middle">
              Curious about sugar vs. ketone metabolism?
              <br />
              <div style={{ paddingTop: "20px" }}>
                <Link to="/science/ketonesandsugar">
                  {" "}
                  <button className="read-science-1">READ MORE</button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      
        <section class="container">
          <div class="row">
            <div class="col-sm-12 col-lg-6">
              <div className="text-5">
              <div className="science-box-font"> <p style={{ fontSize: "25px", paddingBottom: "0px" }}>
                  <b>How is Ketogenesis Triggered?</b>
                </p></div>
                <p style={{ fontSize: "18px", marginTop: "0px" }}>
                  Nature found a way to help humans to survive when we endured
                  extreme physical effort or starvation that depleted carbs in
                  our bodies, a primary source of fuel. <br />
                  <br />
                  In order to, perhaps evade predators or find our next morsel
                  of food, we needed a superior source of energy. This is when
                  our livers burn fat to produce one of nature's most efficient
                  fuels. These are called ketone bodies. <br />
                  <br />
                  To help us think more clearly, endure longer physical effort,
                  suppress hunger, and recover. And perhaps, live to fight
                  another day...
                </p>
              </div>
            </div>
            <div class="col-sm-12 col-lg-6">
              <div className="text-10-1" style={{ marginTop: "0px" }}>
                <img
                  src={dot5}
                  style={{ width: "90%", paddingTop: "30px" }}
                ></img>
              </div>
            </div>
          </div>
        </section>
        <br/>
<br/>
        <section class="container">
          <div class="row">
            <div class="col-sm-12 col-lg-6">
              <div className="text-5">
              <div className="science-box-font"><p style={{ fontSize: "25px", paddingBottom: "0px" }}>
                  <b>Modern Ketogenic Diet</b>
                </p></div>
                <p style={{ fontSize: "18px", marginTop: "0px" }}>
                  This diet involves strictly limiting daily carb intake to less
                  than 50g (about 2 pieces of toast), along with a moderate
                  amount of protein and a higher amount of fat. It’s been around
                  since the 1920’s to help people with epilepsy, and more
                  recently for weight loss and athletic performance. Most people
                  swear by it, but some struggle to sustain it.
                  <br />
                  <br />
                  Whether you can or cannot do this diet, Tecton can help by
                  suppressing hunger while giving you the fuel to increase
                  mental and physical performance.
                </p>
              </div>
            </div>

            <div class="col-sm-12 col-lg-6">
              <div className="text-10-2" style={{ marginTop: "0px" }}>
                <img
                  src={dot6}
                  style={{ width: "90%", paddingTop: "0px" }}
                ></img>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div class="container">
            <div class="row">
              <div class="col-lg-6 col-sm-12">
                <div className="text-5 ">
                <div className="science-box-font"> <p
                    style={{
                      fontSize: "25px",
                      paddingBottom: "0px",
                      marginTop: "150px",
                    }}
                  >
                    <b>Tecton’s Nature-Identical Ketones</b>
                  </p></div> 
                  <p style={{ fontSize: "18px", marginTop: "0px" }}>
                    Tecton contains nature-identical ketones that you can simply
                    drink. These ketones will provide the same fuel as those
                    produced through the keto diet. <br />
                    <br />
                    Tecton is the world’s only Ketone Hydration drink that
                    contains zero sugar, zero caffeine and no “1,3 butanediol”
                    (a secondary alcohol or ethanol dimer).
                    <br />
                    <br />
                    You can also drink Tecton as an accompaniment to the Keto
                    Diet. Some people use it as insurance to keep themselves in
                    ketosis even if they accidentally consume a few extra carbs.
                  </p>
                </div>
              </div>
              <div class="col-lg-6 col-sm-12">
                <div className="text-10-2">
                  <img src={canimage} style={{ width: "75%" }}></img>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section>
          <div class="row ">
            <div className="text-12">
              Take advantage of nature's evolutionary fuel to discover your
              (extra)ordinary potential.
              <br />
              To feel great. To do great.<b style={{fontFamily:"altgothic",fontSize:"35px",letterSpacing:"2px"}}> To BE GREAT. </b>
            </div>
          </div>
        </section>
       
        <section>
          <div className="row">
            <div className="bottom-content">
            <div className="science-box-font">  <p style={{ fontSize: "30px", paddingBottom: "0px" }}>
                <b>Mayo Clinic PK Analysis</b>
              </p></div>
              <p>
                Keto aware people may want to understand how Tecton will raise
                their blood ketone levels and for how
                <br /> long. This question is answered by doing what’s called a
                pharmacokinetics study (PK, for short). <br />
                <br />
                We conducted our own PK study. Blood was drawn from participants
                at 9 intervals over 12 hours in one
                <br /> day with and without consumption of our ketones. The
                samples were sent to Mayo Clinic’s Lab for analysis.
                <br />
                <br />
                The data we received back indicated that our molecule is rapidly
                absorbed and reaches peak
                <br /> concentration in 30 min, putting you into ketosis. <br />
              </p>
              <div style={{ paddingTop: "20px" }}>
                <Link to="/science/pkstudy">
                  {" "}
                  <button className="read-science">READ MORE</button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section>
        <div className="container">
          <div className="row">
            <div className="accordion">
              <div className="accordion-space">
                <div
                  className="accordion-title"
                  style={{ paddingBottom: "5px" ,fontWeight:"600"}}
                  onClick={() => setIsActive(!isActive)}
                >
                  <>What are Ketones? What’s so special about them?</>
                  <button type="button" class="collapsible-science">
                    {isActive ? "-" : "+"}
                  </button>
                </div>
                {isActive && (
                  <div className="accordion-content">
                    <ul>
                      <li>
                        Human cells can only process two things for energy.
                        Glucose/sugar or ketones.{" "}
                      </li>
                      <li>
                        Ketones are nature’s evolutionary way of helping humans
                        survive extreme effort and/or starvation. Our livers
                        produced ketones to give our ancestors a leg up with
                        more endurance and cognitive energy to escape predators
                        or find scarce food!{" "}
                      </li>
                      <li>
                        This was before humans found a way to add carbohydrates
                        to almost all processed foods!
                      </li>
                      <li>
                        In more scientific terms, Ketones are short chain fatty
                        acids produced in the liver when the body experiences
                        starvation, or when you restrict carbohydrates and
                        increase fats, such as in a Ketogenic Diet. This process
                        induces a starvation-like state which produces ketone
                        bodies.
                      </li>
                      <li>
                        Ketones utilize oxygen more efficiently in the
                        generation of cellular energy (ATP) than sugar. This
                        helps with added endurance, muscle recovery and
                        cognitive health.
                      </li>
                    </ul>{" "}
                  </div>
                )}
              </div>
              <div>
                <hr
                  style={{
                    border: "0.8px solid #75757575 ",
                    width: "100%",
                    opacity: "",
                  }}
                ></hr>
              </div>
              <div className="accordion-space">
                <div
                  className="accordion-title"
                  style={{ paddingBottom: "5px" ,fontWeight:"600" }}
                  onClick={() => setIsActive1(!isActive1)}
                >
                  <>How are Ketones produced? </>
                  <button type="button" class="collapsible-science">
                    {isActive1 ? "-" : "+"}
                  </button>
                  {/* <div>How are Ketones produced?  {isActive ? '-' : '+'}</div> */}
                  {/* <div className='expand'>{isActive ? '-' : '+'}</div> */}
                </div>
                {isActive1 && (
                  <div className="accordion-content">
                    <ul>
                      <li>
                        There are different types of Ketones and each is
                        produced in a different manner. Endogenous ketones
                        (meaning ketones produced internally in our body) are
                        naturally produced in the liver while in a metabolic
                        state of ketogenesis.{" "}
                      </li>
                      <li>
                        Exogenous ketones are produced outside the body, usually
                        through a chemical process.{" "}
                      </li>
                      <li>
                        Tecton’s exogenous ketone, however, is produced through
                        a natural enzymatic process.
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <div>
                <hr
                  style={{
                    border: "0.8px solid #75757575 ",
                    width: "100%",
                    opacity: "",
                  }}
                ></hr>
              </div>
              <div className="accordion-space">
                <div
                  className="accordion-title"
                  style={{ paddingBottom: "5px" ,fontWeight:"600" }}
                  onClick={() => setIsActive2(!isActive2)}
                >
                  <>
                    How is Tecton’s Ketone Molecule different from ketone salts
                    or salt drinks on the market?{" "}
                  </>
                  <button type="button" class="collapsible-science">
                    {isActive2 ? "-" : "+"}
                  </button>
                  {/* <div>What makes Ketones so important or special?  {isActive ? '-' : '+'}</div>  */}
                  {/* <div className='expand'>{isActive ? '-' : '+'}</div> */}
                </div>
                {isActive2 && (
                  <div className="accordion-content">
                    <ul>
                      <li>
                        Tecton’s ketones are nature identical, meaning, they
                        have the exact same molecular structure as the ketones
                        produced endogenously (by our livers).{" "}
                      </li>
                      <li>
                        Salt drinks do not provide enough ketone bodies to
                        achieve anywhere close to a therapeutic level of ketones
                        and you would have to consume many times the recommended
                        daily allowance of sodium.{" "}
                      </li>
                      <li>
                        Tecton’s Ketone molecule is metabolized by the body into
                        β-hydroxybutyrate (BHB).
                      </li>
                      <li>
                        Tecton’s Ketone molecule provides several of the
                        benefits that are normally found with strict ketogenic
                        diets and extended fasting, something that is not
                        achievable with the ketone salt drinks on the market.
                      </li>
                      <li>
                        Tecton’s Ketone Molecule is produced through a natural
                        enzymatic process, not through chemical synthesis.
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <div>
                <hr
                  style={{
                    border: "0.8px solid #75757575 ",
                    width: "100%",
                    opacity: "",
                  }}
                ></hr>
              </div>
              <div className="accordion-space">
                <div
                  className="accordion-title"
                  style={{ paddingBottom: "5px"  ,fontWeight:"600"}}
                  onClick={() => setIsActive3(!isActive3)}
                >
                  <>How does Tecton produce energy?</>
                  <button type="button" class="collapsible-science">
                    {isActive3 ? "-" : "+"}
                  </button>
                  {/* <div>Why is the Tecton Ketone molecule different from the ketone salts on the market?    {isActive ? '-' : '+'}</div> */}
                  {/* <div className='expand'>{isActive ? '-' : '+'}</div> */}
                </div>
                {isActive3 && (
                  <div className="accordion-content">
                    <ul>
                      <li>
                        {" "}
                        Tecton contains 10g of exogenous ketones which are a
                        more efficient fuel for our cells than sugar.{" "}
                      </li>
                      <li>
                        Ketones are metabolized by the mitochondria in our cells
                        in only three steps, as opposed to sugar/glucose that
                        goes through 11 steps, and thus utilize less energy to
                        create more energy.
                      </li>
                      <li>
                        All of this is without giving you the raised heart rate,
                        jitters and the highs and lows of caffeine and sugar
                        based drinks.
                        <br />
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <div>
                <hr
                  style={{
                    border: "0.8px solid #75757575 ",
                    width: "100%",
                    opacity: "",
                  }}
                ></hr>
              </div>
              <div className="accordion-space">
                <div
                  className="accordion-title"
                  style={{ paddingBottom: "5px" ,fontWeight:"600" }}
                  onClick={() => setIsActive4(!isActive4)}
                >
                  <>Can I take too much of Tecton’s Ketone? </>
                  <button type="button" class="collapsible-science">
                    {isActive4 ? "-" : "+"}
                  </button>
                  {/* <div>How does Tecton produce energy?  {isActive ? '-' : '+'}</div> */}
                  {/* <div className='expand'>{isActive ? '-' : '+'}</div> */}
                </div>
                {isActive4 && (
                  <div className="accordion-content">
                    <ul>
                      <li>
                        We recommend 2-3 cans a day, as each can keep you in
                        ketosis for up to 4 hours. It’s only useful to drink
                        more than that if you’re running a marathon or
                        participating in something extreme like that.
                      </li>
                      <li>
                        There is no harm in drinking more than the recommended
                        amount, as our toxicity study showed no issue even at
                        200 times the amount that is in each 12 oz can of
                        Tecton! <br />
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <div>
                <hr
                  style={{
                    border: "0.8px solid #75757575 ",
                    width: "100%",
                    opacity: "",
                  }}
                ></hr>
              </div>
              <div className="accordion-space">
                <div
                  className="accordion-title"
                  style={{ paddingBottom: "5px" ,fontWeight:"600" }}
                  onClick={() => setIsActive11(!isActive11)}
                >
                  <>
                    Are there negative side-effects of consuming Tecton’s
                    Ketones?
                  </>
                  <button type="button" class="collapsible-science">
                    {isActive11 ? "-" : "+"}
                  </button>
                  {/* <div>How does Tecton produce energy?  {isActive ? '-' : '+'}</div> */}
                  {/* <div className='expand'>{isActive ? '-' : '+'}</div> */}
                </div>
                {isActive11 && (
                  <div className="accordion-content">
                    <ul>
                      <li>
                        There are no reported negative side effects of consuming
                        Tecton Ketones.
                      </li>
                      <li>
                        If you have Type 1 diabetes, you should check with your
                        physician.
                        <br />
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <div>
                <hr
                  style={{
                    border: "0.8px solid #75757575 ",
                    width: "100%",
                    opacity: "",
                  }}
                ></hr>
              </div>
              <div className="accordion-space">
                <div
                  className="accordion-title"
                  style={{ paddingBottom: "5px" ,fontWeight:"600" }}
                  onClick={() => setIsActive12(!isActive12)}
                >
                  <>Can Ketones be taken with prescribed medications? </>
                  <button type="button" class="collapsible-science">
                    {isActive12 ? "-" : "+"}
                  </button>
                  {/* <div>How does Tecton produce energy?  {isActive ? '-' : '+'}</div> */}
                  {/* <div className='expand'>{isActive ? '-' : '+'}</div> */}
                </div>
                {isActive12 && (
                  <div className="accordion-content">
                    <ul>
                      <li>
                        Yes. There are no known drug interactions, though we
                        always recommend checking with your physician.
                        <br />
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <div>
                <hr
                  style={{
                    border: "0.8px solid #75757575 ",
                    width: "100%",
                    opacity: "",
                  }}
                ></hr>
              </div>
              <div className="accordion-space">
                <div
                  className="accordion-title"
                  style={{ paddingBottom: "5px" ,fontWeight:"600" }}
                  onClick={() => setIsActive13(!isActive13)}
                >
                  <>
                    Why are Ketones a more efficient fuel source than Glucose?{" "}
                  </>
                  <button type="button" class="collapsible-science">
                    {isActive13 ? "-" : "+"}
                  </button>
                  {/* <div>How does Tecton produce energy?  {isActive ? '-' : '+'}</div> */}
                  {/* <div className='expand'>{isActive ? '-' : '+'}</div> */}
                </div>
                {isActive13 && (
                  <div className="accordion-content">
                    <ul>
                      <li>
                        Ketones are metabolized more efficiently than glucose
                        and use no ATP in the metabolic process. There are also
                        no random oxidative species created during the
                        metabolism of ketones like there are during glucose
                        metabolism.
                        <br />
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <div>
                <hr
                  style={{
                    border: "0.8px solid #75757575 ",
                    width: "100%",
                    opacity: "",
                  }}
                ></hr>
              </div>
              <div className="accordion-space">
                <div
                  className="accordion-title"
                  style={{ paddingBottom: "5px" ,fontWeight:"600" }}
                  onClick={() => setIsActive14(!isActive14)}
                >
                  <>
                    How does Tecton help with cognition, focus and
                    concentration?{" "}
                  </>
                  <button type="button" class="collapsible-science">
                    {isActive14 ? "-" : "+"}
                  </button>
                  {/* <div>How does Tecton produce energy?  {isActive ? '-' : '+'}</div> */}
                  {/* <div className='expand'>{isActive ? '-' : '+'}</div> */}
                </div>
                {isActive14 && (
                  <div className="accordion-content">
                    <ul>
                      <li>
                        Tecton increases cognition, focus, and concentration by
                        providing an additional energy substrate for the brain
                        to utilize that does not increase oxidative stress or
                        create free radicals. Working memory can be
                        significantly improved by Tecton’s ketones.{" "}
                      </li>
                      <li>
                        Working memory is important for higher-order executive
                        functions and covers the capacity to temporarily hold
                        information in the mind while mentally working with it,
                        which is important for reasoning, problem solving, and
                        planning.
                        <br />
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <div>
                <hr
                  style={{
                    border: "0.8px solid #75757575 ",
                    width: "100%",
                    opacity: "",
                  }}
                ></hr>
              </div>
              <div className="accordion-space">
                <div
                  className="accordion-title"
                  style={{ paddingBottom: "5px" ,fontWeight:"bold" }}
                  onClick={() => setIsActive15(!isActive15)}
                >
                  <>What is BDNF and why is Tecton important to it?</>
                  <button type="button" class="collapsible-science">
                    {isActive15 ? "-" : "+"}
                  </button>
                  {/* <div>How does Tecton produce energy?  {isActive ? '-' : '+'}</div> */}
                  {/* <div className='expand'>{isActive ? '-' : '+'}</div> */}
                </div>
                {isActive15 && (
                  <div className="accordion-content">
                    <ul>
                      <li>
                        Brain Drive Neurotrophic Factor plays an important role
                        in neuronal survival and growth, serves as a
                        neurotransmitter modulator, and participates in neuronal
                        plasticity, which is essential for learning and memory.{" "}
                      </li>
                      <li>
                        Supplementing your diet with Tecton can help with
                        up-regulating BDNF expression and could, by this
                        mechanism, contribute to the beneficial effects of
                        fasting and vigorous exercise on cognitive performance,
                        and to improved peripheral energy metabolism and
                        cardiovascular fitness.
                        <br />
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <div>
                <hr
                  style={{
                    border: "0.8px solid #75757575 ",
                    width: "100%",
                    opacity: "",
                  }}
                ></hr>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Science;