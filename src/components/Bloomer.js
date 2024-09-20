import React from "react";
import "../css/tab3.css";
// import drimage from "../images/Tecton_BlogHeader_BeGreat.jpg";
import drimage from "../images/pexels-frank-cone.jpg";
// import lower from "../images/newskingfoot.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";
import BEGREAT from "../images/BEGREAT.png";
import bloomer from "../images/Tecton_GlucoseVsKetone.png";
// import Gfour from '../images/Rectangle 24.png';

import useDocumentTitle from "./useDocumentTitle";

const Bloomer = () => {
  useDocumentTitle("Ketones vs Glucose - Tecton");
  const [isActivep6, setIsActivep6] = useState(false);
  return (
    <div class="cone">
      <div>
        {" "}
        <img class="ico-3" src={drimage} style={{ width: "100%" }}></img>
      </div>
      <section class="read-doc">
        <div class="divide" style={{ height: "auto" }}>
          <div id="http-one" class="row">
            <div class="col-sm-4 divide-one">
              <div id="dtl3">
                <div className="font-host">
                  {" "}
                  <b style={{ fontSize: "117%" }}> Dr. Rick Bloomer</b>
                </div>
                Richard Bloomer, PhD joined the faculty of the University of
                Memphis as an assistant professor in 2004, <br />
                {isActivep6 && (
                  <div class="content-phone" style={{ padding: "0px" }}>
                    having held prior positions at Duke University Medical
                    Center and Wake Forest University. He currently serves as
                    dean of the College of Health Sciences and the R. Brad
                    Martin Student Wellness Center. He holds the rank of
                    professor and directs both the Cardiorespiratory/Metabolic
                    Laboratory and the Center for Nutraceutical and Dietary
                    Supplement Research.
                  </div>
                )}
                <button
                  type="button"
                  class="coll-asap-phone"
                  style={{ paddingLeft: "0px" }}
                  onClick={() => setIsActivep6(!isActivep6)}
                >
                  {isActivep6 ? "Less" : "More"} &nbsp;
                  <i class="arrow down"></i>
                </button>
              </div>

              <div id="dtl1">
                <div style={{ textAlign: "left" }}>
                  <Link to="/shop">
                    <button class="divide-one-button ">SHOP NOW</button>
                    <br />
                  </Link>
                  <Link to="/ambassador">
                    <button class="divide-two-button">
                      BECOME AN AMBASSDOR
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div class="col-sm-8 divide-two">
              {/* <div id="Heads">
                <div class="tr-ps">
                  <h1 style={{ fontSize: "35px", color: "orange", fontWeight: "bold", marginTop: "0px", marginBottom: "9px", paddingTop: "0px" }}>Be Great</h1>
                </div>
              </div> */}
              <div>
                <p
                  class="mob-h"
                  style={{
                    fontSize: "122%",
                    color: "black",

                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  Ketones Better Than Glucose as an Energy Source?
                </p>
              </div>
              Most people believe there are three main energy sources our bodies
              use to create Adenosine triphosphate (ATP).
              <br />
              These include
              <br />
              1) sugar/glucose from the breakdown of carbohydrate (and
              gluconeogenic amino acids), as well as
              <br />
              2) fatty acids and
              <br />
              3) glycerol from the breakdown of triglycerides.
              <br />
              <br />
              However, it is important to also understand the valuable role of
              ketones—a relatively novel, alternative, and important energy
              source that is now being delivered as a dietary supplement<b>¹</b>
              .<br />
              <br />
              This article reveals why ketones can be a great alternative to
              glucose—with recent evidence supporting the role of specific
              ketones<b>²</b> as anti-aging metabolites<b>³</b>.
              <br />
              <br />
              <p
                class="mob-h"
                style={{
                  fontSize: "122%",
                  color: "black",

                  fontWeight: "bold",
                }}
              >
                Why Ketones?
              </p>
              Quite simply, ketones are an alternative energy source to fuel the
              body. There are three types of ketones: acetone, acetoacetate, and
              beta-hydroxybutyric acid. Beyond this, there are both endogenous
              forms (produced by the body while adhering to a ketogenic diet)
              and exogenous forms (those consumed as dietary supplements).
              <br />
              <br />
              It is well known that spikes and fluctuations in blood glucose can
              lead to fatigue and lethargy. In addition, such changes in both
              glucose and insulin (the hormone that is elevated in response to a
              glucose spike) are associated with weight/body fat gain. Hence,
              many individuals seek to follow a low carbohydrate diet in an
              attempt to avoid elevations in blood sugar—with the goal of
              stabilizing energy levels throughout the day and remaining
              relatively lean. When following such a plan, many individuals seek
              alternative energy sources to fuel their day. This is where
              ketones may prove helpful.
              <br />
              <br />
              Over the past few years, there has been much scientific inquiry
              and discussion regarding ketones and their potential health
              benefits—beyond simply fueling activities of daily living.
              Investigations have been carried out to evaluate the effect of
              ketones on hunger and satiety<b>⁴</b>, brain metabolism and
              neurodegenerative disease<b>⁵</b>, management of endocrine
              disorders<b>⁶</b>, control of inflammatory disease<b>⁷</b>, and
              exercise performance<b>⁸</b>. The majority of results are
              favorable, with ketones appearing to have the ability to modulate
              cell and metabolic function<b>⁹</b>, which has been a main
              motivator fueling the continued interest in this area of study.
              <br />
              <br />
              <p
                class="mob-h"
                style={{
                  fontSize: "122%",
                  color: "black",

                  fontWeight: "bold",
                }}
              >
                Ketone Availability
              </p>
              Most people are familiar with the “high protein” and ketogenic
              diet. This plan dramatically restricts carbohydrate intake
              (usually to less than 50 grams per day—the equivalent of
              approximately 2 slices of bread). Although effective, there have
              been concerns raised pertaining to the difficulty in adhering to
              such a diet—although this varies considerably from person to
              person and may be similar to other diets<b>¹⁰</b>. While some
              contend that a ketogenic diet can be harmful due to the high
              intake of saturated fat, the evidence indicates that this plan can
              be safe for most individuals<b>¹¹</b>—of course, more well
              -controlled clinical trials are needed.
              <br />
              <br />
              While increasing ketone levels via adherence to a very low
              carbohydrate diet is most prevalent, dietary supplements that
              directly deliver ketones to induce an acute state of ketosis are
              now available and being used with success<b>¹²</b>, with
              suggestions for improving exercise performance<b>¹³</b>. While not
              all data support the ergogenic effect of ketones, Sansone and
              coworkers<b>¹⁴</b> expand the potential role of ketones by
              stating, “Exogenous ketones should not only represent an
              alternative metabolic fuel source, sparing carbohydrates, but they
              also may increase postexercise glycogen replenishment, decrease
              proteolysis, and act as metabolic modulators and signaling
              metabolites.”
              <br />
              <br />
              The potential benefit of supplemental ketones is that nutritional
              ketosis can be induced without necessitating the restrictive
              dietary practices that seem to be poorly tolerated by some, in
              particular in the long-term. Of course, more well-controlled
              clinical studies are needed to confirm the benefit of these
              supplemental ketones. Tecton TM provides a range of ketone drinks
              to ramp up ketone availability in the body and may be considered
              by those seeking to acutely elevate circulating ketones.
              <br />
              <br />
              Regardless of how created/delivered, increasing the amount and
              metabolism of ketones appears to increase oxidative stress within
              the mitochondria, which in terms initiates a protective response
              <b>¹⁵</b>, allowing cells to better handle future assaults during
              periods of high stress and low energy availability.
              <br />
              <br />
              <p
                class="mob-h"
                style={{
                  fontSize: "122%",
                  color: "black",

                  fontWeight: "bold",
                }}
              >
                {" "}
                The Rise, The Fall, The Crash! Sustain Energy
              </p>
              If your goal is to feel great throughout the day, with sustained
              energy and mental clarity, blood sugar and insulin should be
              maintained at relatively stable levels. When consuming high
              amounts of simple sugars (i.e., packaged foods and sugar-laden
              drinks), blood sugar can rise rapidly (within 15 minutes) leading
              to a surge of insulin production and release. The result? A rapid
              fall of blood sugar within the first hour or so—often generating a
              feeling of fatigue…the so-called crash. Restricting carbohydrate
              can help greatly but since glucose is a main source of energy to
              produce ATP—and the prime energy source used to fuel the
              brain—restricting these calories can lead to fatigue. This is
              where supplemental ketones may help. They can provide the body
              with a rapid energy source, without impacting blood sugar.
              <br />
              <br />
              The figure below shows a representation of how blood glucose rises
              and falls following meals. The left side panel represents the
              typical Western diet, inclusive of high amounts of simple sugar
              and saturated fat. The right side panel represents a ketogenic
              diet of very low carbohydrate intake, where the goal is to
              maintain relatively stable blood sugar levels and to minimize
              insulin secretion. Ketones are used heavily for ATP production.
              <br />
              <br />
              <br />
              <div>
                <img src={bloomer} style={{ width: "100%" }}></img>
              </div>
              {/* <div style={{color:"red",fontSize:"20px"}}>
                Figure 1. Adapted from: Zarnowska I. Therapeutic Use of the Ketogenic Diet in Refractory Epilepsy:
What We Know and What Still Needs to Be Learned. Nutrients. 2020;12(9):2616.
doi:10.3390/nu12092616
                </div> */}
              <br />
              <p
                class="mob-h"
                style={{
                  fontSize: "122%",
                  color: "black",

                  fontWeight: "bold",
                }}
              >
                {" "}
                Take The Ketone Challenge With Tecton®
              </p>
              If interested in adopting a ketogenic program, you might consider
              the use of supplemental ketones. However, make sure to first do
              your homework and fully understand what is being sold. Both ketone
              salts and esters are currently available on the market. However,
              there has been some indication that ketone salts may be slower to
              absorb and do not yield as long-lasting of an effect as compared
              to ketone esters. Tecton® ketones are nature-identical to the
              ketones produced in the body, with beta-hydroxybutyric acid being
              the ketone of interest<b>¹⁶</b>.<br />
              <br />
              <p
                class="mob-h"
                style={{
                  fontSize: "122%",
                  color: "black",

                  fontWeight: "bold",
                }}
              >
                {" "}
                Tectonic Plates
              </p>
              Your cells are your personal tectonic plates. Energize them
              properly and you can make seismic shifts in your health and
              wellbeing. Be Great!!
              <br />
              <br />
              <p
                class="mob-h"
                style={{
                  fontSize: "122%",
                  color: "black",

                  fontWeight: "bold",
                }}
              >
                Tecton®
              </p>
              We, the people at Tecton® have the same aspiration as you – to Be
              Great! That’s why we have worked hard to research and develop an
              exogenous ketone form that can provide a high-quality source of
              BHB with excellent bioavailability and great taste. <br />
              <br />
              <br />
              <div style={{ color: "#757575" }}>
                * These statements have not been evaluated by the Food and Drug
                Administration. This product is not intended to
                <br /> diagnose, treat, cure, or prevent any disease.
                <br />
              </div>
              <br />
              <br />
              <div id="dtl2">
                <div class="col-sm-4 divide-one">
                  <div class="text-center">
                    <Link to="/shop">
                      <button class="divide-one-button">SHOP NOW</button>
                      <br />
                    </Link>
                    <Link to="/ambassador">
                      <button class="divide-two-button">
                        BECOME AN AMBASSADOR
                      </button>
                    </Link>
                    <br />
                    <br />
                  </div>
                </div>
              </div>
              {/* <div class="blom" style={{textAlign:"center"}}>
                <img class="ft-image" src={BEGREAT} ></img><br />
              </div> */}
              <p
                style={{
                  fontSize: "122%",
                  color: "black",
                  marginBottom: "9px",
                }}
              >
                <b>References</b>
              </p>
              <ol className="noteol" style={{ color: "#757575" }}>
                <li>
                  On the Metabolism of Exogenous Ketones in Humans.https://
                  www.ncbi.nlm.nih.gov/pmc/articles/PMC5670148/{" "}
                  <a
                    href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5670148/"
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>
                <li>
                  {" "}
                  Metabolism of ketone bodies during exercise and training:
                  physiological basis for exogenous supplementation. https
                  ://pubmed.ncbi.nlm.nih.gov/27861911/{" "}
                  <a
                    href="https://pubmed.ncbi.nlm.nih.gov/27861911/ "
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>
                <li>
                  β-hydroxybutyrate as an Anti-Aging Metabolite.
                  https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8540704/{" "}
                  <a
                    href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8540704/"
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>
                <li>
                  Satiating Effect of a Ketogenic Diet and Its Impact on Muscle
                  Improvement and Oxidation State in Multiple Sclerosis
                  Patients. https://
                  www.ncbi.nlm.nih.gov/pmc/articles/PMC6566517/{" "}
                  <a
                    href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6566517/ "
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>
                <li>
                  Effects of Ketone Bodies on Brain Metabolism and Function in
                  Neurodegenerative Diseases. https://
                  www.ncbi.nlm.nih.gov/pmc/articles/PMC7699472/{" "}
                  <a
                    href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7699472/ "
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>
                <li>
                  Ketogenic diet in endocrine disorders: Current perspectives.
                  https://www. ncbi.nlm.nih.gov/pmc/articles/PMC5664869/
                  <a
                    href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5664869/"
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>
                <li>
                  Ketone body β-hydroxybutyrate blocks the NLRP3
                  inflammasome-mediated inflammatory disease. https://www.
                  ncbi.nlm.nih.gov/pmc/articles/PMC4352123/
                  <a
                    href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4352123/"
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>
                <li>
                  Utility of Ketone Supplementation to Enhance Physical
                  Performance: A Systematic Review. https
                  ://www.ncbi.nlm.nih.gov/pmc/articles/PMC7442417/{" "}
                  <a
                    href="https
://www.ncbi.nlm.nih.gov/pmc/articles/PMC7442417/"
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>
                <li>
                  Modulation of Cellular Biochemistry, Epigenetics and
                  Metabolomics by Ketone Bodies. Implications of the Ketogenic
                  Diet in the Physiology of the Organism and Pathological
                  States. https:// www.ncbi.nlm.nih.gov/pmc/articles/PMC7146425/{" "}
                  <a
                    href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7146425/"
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>
                <li>
                  Adherence to Ketogenic and Mediterranean Study Diets in a
                  Crossover Trial: The Keto–Med Randomized Trial. https://
                  www.ncbi.nlm.nih.gov/pmc/articles/PMC8002540/{" "}
                  <a
                    href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8002540/ "
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>
                <li>
                  The Ketogenic Diet: Evidence for Optimism but High-Quality
                  Research Needed. https://
                  www.ncbi.nlm.nih.gov/pmc/articles/PMC7269727/{" "}
                  <a
                    href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7269727/ "
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>
                <li>
                  {" "}
                  Beneficial Effects of Exogenous Ketogenic Supplements on A
                  https:// www.ncbi.nlm.nih.gov/pmc/articles/PMC8308443/{" "}
                  <a
                    href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8308443/"
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>
                ging Processes and Age-Related Neurodegenerative Diseases.
                <li>
                  Metabolism of ketone bodies during exercise and training:
                  physiological basis for exogenous supplementation. https://
                  pubmed.ncbi.nlm.nih.gov/27861911/{" "}
                  <a
                    href="https://pubmed.ncbi.nlm.nih.gov/27861911/ "
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>
                <li>
                  Effects of Ketone Bodies on Endurance Exercise. https://
                  pubmed.ncbi.nlm.nih.gov/30531462/
                  <a
                    href="https://pubmed.ncbi.nlm.nih.gov/30531462/"
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                  <li>
                    Ketone bodies: from enemy to friend and guardian angel.
                    https:// www.ncbi.nlm.nih.gov/pmc/articles/PMC8656040/{" "}
                    <a
                      href=" https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8656040/"
                      target="_blank"
                      style={{ color: "black", textDecoration: "underLine" }}
                    >
                      More
                    </a>
                  </li>
                  <li>
                    Why a d-β-hydroxybutyrate monoester? https://
                    portlandpress.com/biochemsoctrans/article/48/1/51/222188/Why-a-d-hydroxybutyrate-monoester{" "}
                    <a
                      href=" https://portlandpress.com/biochemsoctrans/article/48/1/51/222188/Why-a-d-hydroxybutyrate-monoester "
                      target="_blank"
                      style={{ color: "black", textDecoration: "underLine" }}
                    >
                      More
                    </a>
                  </li>
                  <br />
                  <br />
                </li>
              </ol>
            </div>
          </div>

          <div id="http-two" class="row">
            <div class="col-sm-8 divide-three">
              <div id="dtl4">
                <div class="Asidee">
                  <b style={{ fontSize: "117%" }}>Dr. Rick Bloomer</b>
                  <br />
                  {/* <i>Co-Founder & Chairman</i>
                  <br /> */}
                  Richard Bloomer, PhD joined the faculty of the University of
                  Memphis as an assistant professor in 2004, having held prior
                  positions at Duke University Medical Center and Wake Forest
                  University. He currently serves as dean of the College of
                  Health Sciences and the R. Brad Martin Student Wellness
                  Center. He holds the rank of professor and directs both the
                  Cardiorespiratory/Metabolic Laboratory and the Center for
                  Nutraceutical and Dietary Supplement Research.
                </div>
              </div>
            </div>
          </div>

          {/* <img class="ico-4" src={lower}></img> */}
        </div>
      </section>
    </div>
  );
};

export default Bloomer;
