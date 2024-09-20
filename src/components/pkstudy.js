import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/tab3.css";
import useDocumentTitle from "./useDocumentTitle";
import drimage from "../images/Tecton_BlogHeader_BeGreat 1.png";
import ScrollToTop from "./ScrollToTop";
import bloomer1 from "../images/UI UX Graphs-01.png";
import bloomer2 from "../images/UI UX Graphs-02.png";
import bloomer3 from "../images/UI UX Graphs-03.png";

function Pkstudy() {
  useDocumentTitle("Pk study  - Tecton");
  const [isActivep6, setIsActivep6] = useState(false);
  return (
    <div className="cone">
      <ScrollToTop />
      <div>
        {" "}
        <img
          class="ico-3"
          src={drimage}
          alt="Ketone metabolism"
          style={{ width: "100%" }}
        />
      </div>
      <section className="read-doc">
        <div className="divide" style={{ height: "auto" }}>
          <div className="row">
            <div className="col-sm-4 divide-one">
              <div id="dtl3">
                <div className="font-host">
                  <b style={{ fontSize: "117%" }}>Michael A Schmidt, PhD.</b>
                </div>

                <i style={{ color: "#757575" }}>Co-Founder & Chairman</i>
                <br />
                <div style={{ paddingTop: "10px" }}>
                  {" "}
                  Dr. Schmidt doctoral (Ph.D.) research is in Molecular Medicine
                  and Biochemistry at the NASA Ames Research{" "}
                </div>
                {isActivep6 && (
                  <div class="content-phone" style={{ padding: "0px" }}>
                    Center, his second Ph.D. in Neuroscience is from Lancaster
                    University, UK. Dr. Schmidt has three decades of experience
                    with elite performers in wilderness medicine, S.W.A.T., high
                    altitude ascent, Special Forces, NFL, NBA, Olympic athletes,
                    cycling, and motor sports (Le Mans, NASCAR), collaborations
                    with the Mayo Clinic, USMA (West Point), NASA, and others.
                    He directs the Nutritional Genomics Certification Program
                    for US Special Forces for the American Nutrition Association
                    (American College of Nutrition).
                  </div>
                )}
                <button
                  type="button"
                  style={{ paddingLeft: "0px" }}
                  class="coll-asap-phone"
                  onClick={() => setIsActivep6(!isActivep6)}
                >
                  {isActivep6 ? "Less" : "More"} &nbsp;
                  <i class="arrow down"></i>
                </button>
              </div>
              <div id="dtl1">
                <div>
                  <Link to="/shop">
                    <button className="divide-one-button">SHOP NOW</button>
                  </Link>
                  <br />
                  <Link to="/ambassador">
                    <button className="divide-two-button">
                      BECOME AN AMBASSADOR
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-sm-8 divide-two">
              <div id="Heads">
                <div className="tr-ps">
                  <h1
                    style={{
                      fontSize: "35px",
                      color: "black",
                      fontWeight: "bold",
                      marginTop: "0",
                      marginBottom: "9px",
                      paddingTop: "0",
                    }}
                  >
                    Ketone Metabolism
                  </h1>
                </div>
              </div>
              <div>
                <p class="mob-h" style={{ fontSize: "122%", color: "black" }}>
                  {" "}
                  <b>
                    How the Tecton Ketone Behaves in the Body After I Consume It
                  </b>
                </p>
              </div>
              When considering whether to consume an exogenous ketone, most
              people want to understand how it will raise their blood ketone
              levels and for how long.
              <br /> <br />
              This kind of question is answered by doing what’s called a
              pharmacokinetics study (PK, for short). This is done by giving a
              known dose of the ketone to human beings, taking blood samples
              repeatedly over a period of time (often zero to 12, or 24 hours),
              and analyzing that blood for ketones at each time point.
              <br />
              <br />
              <p class="mob-h" style={{ fontSize: "122%", color: "black" }}>
                <b>What Does a PK Study Measure?</b>
              </p>
              When conducting a PK test, there are a few measurements to
              consider. These are:
              <br />
              <br />
              <b>Time to Maximum Concentration (Tmax):</b> This is a measure of
              how long it takes the ketone levels to reach the maximum level in
              blood.
              <br />
              <br />
              <b>Maximum Concentration (Cmax):</b> This is a measure of the very
              highest concentration level the ketone compound reaches in your
              blood.
              <br /> <br />
              <b>Area Under the Curve (AUC):</b> This is a rough measure of how
              much of the product (ketone) entered the blood over the entire
              period of measurement. It aggregates all of the ketone levels
              measured at each time point and does a mathematical calculation to
              estimate the total that ended up in the blood (or body).
              <br />
              <br />
              <b>Half Life (t1/2):</b> This is the time it takes for the
              concentration of the ketone in the blood or the total amount in
              the body to be reduced by 50%. This gives a good idea of how long
              the ketone will actively work in the body after you ingest it.
              <br />
              <br />
              <p class="mob-h" style={{ fontSize: "122%", color: "black" }}>
                <b>What Else Can a PK Study Tell Us?</b>
              </p>
              <b>Rate of Absorption:</b> This is a measure of how quickly a
              molecule can enter the bloodstream after it is given. This is
              usually represented by the portion of the curve up to the Cmax.
              <br /> <br />
              <b>Rate of Elimination:</b> This is a measure of how quickly a
              molecule is metabolized and is no longer circulating within the
              body.
              <br />
              <br />
              <p class="mob-h" style={{ fontSize: "122%", color: "black" }}>
                <b>Tecton’s PK Study with the Mayo Clinic</b>
              </p>
              Tecton conducted its own PK study on its ketone product. Blood was
              drawn from the study participants at 9 different time points over
              12 hours, during a single day. The first blood sample was taken
              before any ketone was consumed, so that there was a baseline
              measure of ketones. After ingestion of the ketone blood samples
              were taken at regular intervals of time throughout the 12 hours.
              The participants were fasting during the test, so there would be
              no dietary interference.
              <br />
              <br />
              Once all the blood samples were collected, they were sent frozen
              to the Mayo Clinic Metabolomics Core Laboratory for biochemical
              analysis.
              <br />
              <br />
              <p class="mob-h" style={{ fontSize: "122%", color: "black" }}>
                <b>What We Learned</b>
              </p>
              First, we learned that the Tecton ketone has a rapid rate of
              absorption. The time to reach its maximum concentration is only 30
              minutes. This means that one can expect that the availability of
              ketones can be realized relatively quickly.
              <br />
              <br />
              Second, the average maximum concentration (Cmax) of free BHB
              ketone was 2.4 mM. This is a very positive finding, because this
              shows that levels high enough to be biologically active are
              present after ingestion of the product.
              <br />
              <br />
              You can see the PK graph below showing the rise of ketones in the
              blood, the level of ketones attained in the blood, and the slow
              removal of ketones from the blood. This is a standard PK graph,
              but this specific graph shows how the BHB behaved in our test
              participants. One thing to note is the difference between the
              curves for free ketone and total ketone.
              <br />
              <br />
              <div>
                <img src={bloomer1} style={{ width: "100%" }}></img>
              </div>
              <br />
              <div
                style={{
                  display: "flex",
                  paddingLeft: "50px",
                  fontSize: "16px",
                }}
              >
                <p>Figure 1</p> &nbsp;
                <p style={{ color: "#757575" }}>
                  {" "}
                  Blood Levels of 10G dose Tecton Ketone in Fasting Humans Over
                  Time in Minutes
                </p>
              </div>
              <br />
              <p class="mob-h" style={{ fontSize: "122%", color: "black" }}>
                <b>Tecton vs other Ketones</b>
              </p>
              Tecton has not done its own head-to-head PK comparison with other
              products on the market. But some other products have published
              their own PK studies, using the same types of measurements used in
              our PK study above. This allows Tecton to make a rough comparison
              with other products (noting that the participants and the study
              conditions may not be fully comparable).
              <br />
              <br />
              Note below the Tecton study of a 25-gram dose of its ketone
              product in humans. Since the dosing in the Tecton product was not
              the same as in the competitor product, we convert the dose to a
              standard of milligrams of product per kilogram of body weight
              (mg/kg). In other words, it took three times as much of the
              competitors ketone ester for them to reach the 2.27mM level of
              blood ketones. We achieved above 2.5mM with 125mg/kg of body
              weight. The competitors only reached 0.3mM at 125mg/kg of body
              weight. This conversion allows for a better comparison. When this
              measure is used the Tecton ketone product delivers a higher
              maximum concentration than this specific competitor product.
              <br />
              <br />
              <div>
                <img src={bloomer2} style={{ width: "100%" }}></img>
              </div>
              <br />
              Because of the structure of the Tecton ketone, we deliver two
              forms of ketones. One is called free, which means it is readily
              available for rapid use. The other is called 'bound,' which means
              some of the BHB is linked to its glycerol backbone and available
              for later use. As we look at this distinction within Figure 1, a
              few things can be noted. The BHB-glycerol circulates longer up to
              a point in time where there is a low amount of free ketone. After
              this occurs, between 2-3 hours, we are able to see that there is
              conversion of this molecule into additional free BHB. There
              becomes a graduated curve vs a steady downward decline of BHB.
              This extends the amount of time BHB is circulating in the blood
              and increases the concentration of free BHB. This allows for the
              rate of elimination of free BHB to be impacted differently than
              exogenous salts of BHB and other ketogenic esters.
              <br />
              <br />
              <p class="mob-h" style={{ fontSize: "122%", color: "black" }}>
                <b>Difference between a ketostick vs blood plasma results</b>
              </p>
              Mechanistic - the blood ketone meter can only measure the free or
              non-conjugated BHB in the bloodstream. It cannot measure the
              bound, or conjugated (linked together) BHB. Tecton GTB (Glycerol
              Tributyrate) contains an equal distribution of 1 monoglycerides
              and 2 monoglycerides. The majority of the 1 monoglycerides are
              absorbed intact and the remaining portion is absorbed with the
              free BHB as it flows through the bloodstream. The conjugated BHB
              is processed at the brush border of the small intestines by
              lipases or at the terminal cells which will utilize it. These will
              not show up on the blood ketone meter until broken down by the
              lipases.
              <br />
              <br />
              Laboratory testing can measure both non-conjugated BHB (free), by
              measuring the BHB in the plasma, then the conjugated (bound), by
              cleaving the bound BHB from the blood with lipases, thereby
              getting the total BHB. Contact us for more information.
              <br />
              <br />
              <div>
                <img src={bloomer3} style={{ width: "100%" }}></img>
              </div>
              <br />
              <p class="mob-h" style={{ fontSize: "122%", color: "black" }}>
                <b>Tecton®</b>
              </p>
              We, the people at Tecton® have the same aspiration as you – to Be
              Great! That’s why we have worked hard to research and develop an
              exogenous ketone form that can provide a high-quality source of
              BHB with excellent bioavailability and great taste.
              <br />
              <br />
              <p style={{ color: "#757575" }}>
                * These statements have not been evaluated by the Food and Drug
                Administration. This product is not intended to diagnose, treat,
                cure, or prevent any disease.
              </p>
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
              <p
                style={{
                  fontSize: "122%",
                  color: "black",
                  marginBottom: "9px",
                  paddingTop: "9px",
                }}
              >
                {" "}
                <b>References</b>
              </p>
              <ol className="noteol">
                <li style={{ color: "#757575" }}>
                  Kragh-Hansen U. Molecular aspects of ligand binding to serum
                  albumin. Pharmacol Rev. 1981 Mar;33(1):17-53. PMID: 7027277.
                  <a
                    href="https://pubmed.ncbi.nlm.nih.gov/7027277/"
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>
                <li style={{ color: "#757575" }}>
                  {" "}
                  Shivva V, et. al. The Population Pharmacokinetics of
                  D-β-hydroxybutyrate Following Administration of
                  (R)-3-Hydroxybutyl (R)-3-Hydroxybutyrate. AAPS J. 2016
                  May;18(3):678-88. doi: 10.1208/s12248-016-9879-0. Epub 2016
                  Feb 18. PMID: 26893218; PMCID: PMC5256599.{" "}
                  <a
                    href="https://pubmed.ncbi.nlm.nih.gov/26893218/ "
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>
              </ol>
            </div>
            <div id="http-two" class="row">
              <div class="col-sm-8 divide-three">
                <div id="dtl4">
                  <div class="Asidee">
                    <b style={{ fontSize: "117%" }}>Michael A Schmidt, PhD.</b>
                    <br />
                    <i style={{ color: "#757575" }}>Co-Founder & Chairman</i>
                    <p>
                      Dr. Schmidt doctoral (Ph.D.) research is in Molecular
                      Medicine and Biochemistry at the NASA Ames Research
                      Center, his second Ph.D. in Neuroscience is from Lancaster
                      University, UK. Dr. Schmidt has three decades of
                      experience with elite performers in wilderness medicine,
                      S.W.A.T., high altitude ascent, Special Forces, NFL, NBA,
                      Olympic athletes, cycling, and motor sports (Le Mans,
                      NASCAR), collaborations with the Mayo Clinic, USMA (West
                      Point), NASA, and others. He directs the Nutritional
                      Genomics Certification Program for US Special Forces for
                      the American Nutrition Association (American College of
                      Nutrition).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Pkstudy;
