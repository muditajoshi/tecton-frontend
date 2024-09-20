import React from "react";
import "../css/tab3.css";
import { useState } from "react";
import tab5head from "../images/newplant.jpg";
import tab5foot from "../images/newplantfoot.jpg";
import { Link } from "react-router-dom";
import useDocumentTitle from "./useDocumentTitle";
import drimage from "../images/Tecton_BlogHeader_BeGreat 1.png";

function KetonSaltvsKetonEster() {
  useDocumentTitle("Ketone Salts vs. Ketone Esters  - Tecton");

  const [isActivep6, setIsActivep6] = useState(false);
  return (
    <div class="cone">
      <div>
        {" "}
        <img class="ico-3" src={drimage} style={{ width: "100%" }}></img>
      </div>
      <section class="read-doc">
        <div class="divide" style={{ height: "auto" }}>
          <div id="http" class="row">
            <div class="col-sm-4 divide-one">
              <div className="text-5-phone">
                <div className="font-host">
                  {" "}
                  <p
                    style={{
                      fontSize: "22px",
                      paddingLeft: "2px",
                      paddingTop: "10px",
                      marginBottom: "0px",
                    }}
                  >
                    <b>Dr. Rick Bloomer</b>
                  </p>
                </div>

                <div style={{ paddingLeft: "2px" }}>
                  Richard Bloomer, PhD joined the faculty of the University of
                  Memphis as an assistant professor
                </div>
                {isActivep6 && (
                  <div class="content-phone" style={{ padding: "0px" }}>
                    in 2004, having held prior positions at Duke University
                    Medical Center and Wake Forest University. He currently
                    serves as dean of the College of Health Sciences and the R.
                    Brad Martin Student Wellness Center. He holds the rank of
                    professor and directs both the Cardiorespiratory/Metabolic
                    Laboratory and the Center for Nutraceutical and Dietary
                    Supplement Research.
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
                <div class="text" style={{ textAlign: "left" }}>
                  <a href="/shop">
                    <button class="divide-one-button">SHOP NOW</button>
                    <br />
                  </a>
                  <a href="/ambassador">
                    <button class="divide-two-button">
                      BECOME AN AMBASSADOR
                    </button>
                  </a>
                </div>
              </div>
            </div>

            <div class="col-sm-8 divide-two">
              {/* <div id="Heads">
                                <div class="tr-ps">
                                    <h1 style={{ fontSize: "35px", color: "orange", fontWeight: "bold", marginTop: "10px", marginBottom: "9px", paddingTop: "0px" }}>Exogenous Ketones</h1>
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
                  Ketone Salts vs. Ketone Esters
                </p>
              </div>
              If you've been reading about keto, you've probably come across the
              words "ketone salts" and "ketone esters." They both have the word
              ketone, so you might think they are the same.
              <br />
              <br />
              However, these exogenous ketones (those that are consumed rather
              than produced in the body) have different behaviors when taken as
              dietary supplements. This article will explain each compound and
              share why ketone esters may be considered to be more beneficial
              than ketone salts.
              <br />
              <br />
              <p
                class="mob-h"
                style={{
                  fontSize: "122%",
                  color: "black",
                }}
              >
                <b>Ketone Salts vs. Esters: The Similarities</b>
              </p>
              Ketones are simple compounds made up of hydrogen, oxygen, and
              carbon<b>¹</b>. While you can ingest “man-made” ketone
              supplements, ketones are also found naturally in the body<b>²</b>.
              The liver produces ketones when there isn't adequate glucose for
              the body to burn as fuel. But small concentrations of ketones are
              always present in the blood.
              <br />
              <br />
              The body produces three ketone bodies: acetoacetate (AcAc),
              beta-hydroxybutyrate (BHB), and acetone. These are known as
              endogenous ketones (meaning produced within the body).
              <br />
              <br />
              Both ketone salts and ketone esters are types of exogenous ketones
              (originating from outside the body) that can be used to elevate
              the level of ketones in the blood. They are both considered to be
              nutritional supplements and can help you achieve a state of
              nutritional ketosis more quickly than is possible with diet alone.
              <br />
              <br />
              <p
                class="mob-h"
                style={{
                  fontSize: "122%",
                  color: "black",
                }}
              >
                <b> What Are Ketone Salts?</b>
              </p>
              While both ketone salts and esters are considered exogenous
              ketones, they are created differently and appear to have differing
              effects following oral ingestion.
              <br />
              <br />
              <p
                class="mob-h"
                style={{
                  fontSize: "122%",
                  color: "#757575",
                }}
              >
                {" "}
                <b>Ketone Salts Pros</b>
              </p>
              First, because the BHB is bound to an electrolyte, some have
              suggested that the use of ketone salts may aid electrolyte balance
              when adhering to a ketogenic diet. While this is possible, a more
              likely benefit is related to the enhancement of success when
              attempting to adhere to a ketogenic diet. That is, some people
              find it difficult to follow this diet because of the strictness
              (i.e., the extremely low carbohydrate ingestion).
              <br />
              <br />
              Ketone salts provide the user with an alternative way of acutely
              getting into ketosis without adhering to such strict dietary
              requirements. With this in mind, it should be noted that even
              though exogenous ketones do raise blood ketone levels, some
              carbohydrate restriction is necessary if you desire to remain in a
              prolonged state of deep ketosis—ketone supplements alone, without
              any sort of carbohydrate restriction, will likely not allow for
              this.
              <br />
              <br />
              Ketone salts are widely available online or where dietary
              supplements are sold.
              <br />
              <br />
              <p
                class="mob-h"
                style={{
                  fontSize: "122%",
                  color: "#757575",
                }}
              >
                {" "}
                <b>Ketone Salts Cons</b>
              </p>
              As indicated above, ketone salts often include BHB added to
              sodium. If attempting to elevate blood ketone levels to a value
              that may prove helpful, it is possible that a high amount of
              sodium could be consumed. This may be concerning if you are
              hypertensive or struggling to keep your blood pressure down. This
              may be magnified if you are at risk for heart disease or a stroke,
              as the potential harm of ingesting ketone salts may outweigh the
              benefits that the ketones offer<b>³</b>. Of course, some ketone
              salts are bound to minerals other than sodium, so the issue above
              becomes irrelevant. Users are encouraged to read labels to
              determine which type of ketone salt is being used in the product
              of interest.
              <br />
              <br />
              More importantly and in terms of response to ingestion, ketone
              salts tend to elevate blood ketone levels but not nearly to the
              same extent as ketone esters<b>⁴</b>. Therefore, if you are
              seeking a rapid and robust increase in blood ketones, esters
              appear to be the better option.
              <br />
              <br />
              <p
                class="mob-h"
                style={{
                  fontSize: "122%",
                  color: "black",
                }}
              >
                {" "}
                <b>What Are Ketone Esters?</b>
              </p>
              Instead of binding the BHB to a mineral/electrolyte such as
              sodium, ketone esters typically bind the BHB to what is known as
              1,3 butanediol, an alcohol molecule. But don't worry. The alcohol
              is present at the molecular level and doesn’t increase the alcohol
              content of the beverage.
              <br />
              <br />
              Ketone esters are far denser than ketone salts since more ketones
              can bind to alcohol than salt<b>⁴</b>. They come in liquid form
              that’s manufactured in a lab.
              <br />
              <br />
              <p
                class="mob-h"
                style={{
                  fontSize: "122%",
                  color: "#757575",
                }}
              >
                {" "}
                <b>Ketone Ester Pros</b>
              </p>
              Many believe ketone esters are more “effective” than ketone salts.
              This is based primarily on the following observation: It has been
              reported that ketone esters result in a much greater elevation in
              blood ketone levels following oral ingestion, as compared to
              ketone salts<b>⁴</b>. This is particularly true when a higher dose
              is consumed and when values between the ester and salt are
              compared within the first two hours of ingestion. Therefore, if
              you are desiring to raise ketone levels quickly and to a
              significant extent, ketone esters would be the better choice. In
              addition, ketone esters appear like those produced naturally in
              the body. Therefore, it has been suggested that they may be used
              more effectively as an energy source, as compared to the ketone
              salts.
              <br />
              <br />
              Lastly, the FDA classifies ketone esters as “Generally Recognized
              as Safe” (GRAS), while ketone salts do not have this
              classification<b>⁵</b>.
              <br />
              <br />
              <p
                class="mob-h"
                style={{
                  fontSize: "122%",
                  color: "#757575",
                }}
              >
                {" "}
                <b>Ketone Esters Cons</b>
              </p>
              Three main items need to be considered here. First is the taste.
              While the ketone salts are usually palatable, this is often not
              the case for the ketone esters. Even if a dedicated person can get
              them down, it is doubtful they will go back for more. Second is
              the price. Like most dietary supplements, the higher quality the
              ingredients, the more expensive they are, and this cost gets
              passed on to the consumer. Third is the fact that although most
              ketone esters include BHB bound to 1,3-butanediol, this agent may
              be associated with some moderate adverse effects, including
              dehydration and metabolic acidosis, at least when used at high
              concentrations, as noted in a recent animal study<b>⁶</b>.
              <br />
              <br />
              But there is good news…
              <br />
              <br />
              Fortunately, it is not necessary for esters to be bound to
              1,3-butanediol. Tecton is formulated with glycerol, which has been
              well-studied and determined to be safe for oral consumption
              <b>⁷</b>. Unlike 1,3-butanediol, which is used to make solvent
              products such as paint thinner, glycerol is a natural energy
              source the body uses as fuel<b>⁸</b>.
              <br />
              <br />
              <a
                href="https://tectonlife.com/"
                target="_blank"
                style={{ textDecoration: "underline" }}
              >
                {" "}
                Tecton{" "}
              </a>{" "}
              can fuel your performance, improve mental clarity, and supplement
              your lifestyle without the potentially high sodium content of
              certain ketone salts or the use of the unnatural 1,3-butanediol.
              Perhaps more importantly, Tecton scientists have developed a
              method to considerably improve the taste of the ketone ester at a
              price that is very reasonable for those wanting to use the
              beverage as part of their daily routine.
              <br />
              <br />
              <p
                class="mob-h"
                style={{
                  fontSize: "122%",
                  color: "black",
                }}
              >
                {" "}
                <b>Where to Buy Ketone Esters</b>
              </p>
              Ketones are now well recognized for their beneficial effects on
              weight loss, improved cognitive function, and improved athletic
              performance. You can raise the level of ketones in your body
              through carbohydrate restriction and fasting, with added benefits
              noted with exercise. But that’s not the only way to raise ketone
              levels and capitalize on the benefits of ketosis. You can also
              consider the daily use of ketone esters in the form of Tecton.{" "}
              <a
                href="https://tectonlife.com/shop"
                target="_blank"
                style={{ textDecoration: "underline" }}
              >
                {" "}
                Order some today!{" "}
              </a>
              <br />
              <br />
              <span style={{ color: "#757575" }}>
                **These statements have not been evaluated by the Food and Drug
                Administration. This product is not intended to diagnose, treat,
                cure, or prevent any disease.{" "}
              </span>
              <br />
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
                  </div>
                </div>
              </div>
              <p
                style={{
                  fontSize: "122%",
                  color: "black",
                }}
              >
                {" "}
                <b>References</b>
              </p>
              <ol className="noteol" style={{ color: "#757575" }}>
                <li>
                  Scott, J. M., & Deuster, P. A. (2017). Ketones and human
                  performance. Journal of special operations medicine: a
                  peer-reviewed journal for SOF medical professionals. Retrieved
                  October 28, 2022, from
                  https://pubmed.ncbi.nlm.nih.gov/28599043/
                  <a
                    href=" https://pubmed.ncbi.nlm.nih.gov/28599043/ "
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>
                <li>
                  Laffel, L. (1999). Ketone bodies: A review of Physiology,
                  Pathophysiology and application of monitoring to diabetes.
                  Diabetes/metabolism research and reviews. Retrieved October
                  28, 2022, from https://pubmed.ncbi.nlm.nih.gov/10634967/{" "}
                  <a
                    href="https://pubmed.ncbi.nlm.nih.gov/10634967/"
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>
                <li>
                  Harvard T. H. Chan School of Public Health. (2022, September
                  15). Salt and sodium. The Nutrition Source. Retrieved October
                  28, 2022, from
                  https://www.hsph.harvard.edu/nutritionsource/salt-and-sodium/
                  <a
                    href="https://www.hsph.harvard.edu/nutritionsource/salt-and-sodium/"
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>
                <li>
                  {" "}
                  Stubbs, B. J., Cox, P. J., Evans, R. D., Santer, P., Miller,
                  J. J., Faull, O. K., Magor-Elliott, S., Hiyama, S., Stirling,
                  M., & Clarke, K. (2017, October 30). On the metabolism of
                  exogenous ketones in humans. Frontiers in physiology.
                  Retrieved October 28, 2022, from
                  https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5670148/{" "}
                  <a
                    href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5670148/"
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>
                <li>
                  EVALUATION OF THE GENERALLY RECOGNIZED AS SAFE (GRAS) STATUS
                  OF D-6-HYDROXYBUTYRATE (D-BHB) AS A FOOD INGREDIENT .
                  Open.fda.gov. (2021). Retrieved November 14, 2022, from
                  https://open.fda.gov/apis/downloads/
                  <a
                    href="https://open.fda.gov/apis/downloads/"
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>
                <li>
                  McCarthy CG, Waigi EW, Singh G, Castaneda TR, Mell B,
                  Chakraborty S, Wenceslau CF, Joe B. Physiologic, Metabolic,
                  and Toxicologic Profile of 1,3-Butanediol. J Pharmacol Exp
                  Ther. 2021 Nov;379(3):245-252. doi: 10.1124/jpet.121.000796.
                  Epub 2021 Sep 14. PMID: 34521698; PMCID: PMC9164310.
                  {/* <a href="https://journals.lww.com/nuclearmedicinecomm/Fulltext/2021/07000/Alterations_in_cerebral_glucose_metabolism_as.9.aspx" target="_blank" style={{ color: "black", textDecoration: "underLine" }}>More</a> */}
                </li>
                <li>
                  Mortensen, A., Aguilar, F., Crebelli, R., Di Domenico, A.,
                  Dusemund, B., Frutos, M. J., Galtier, P., Gott, D.,
                  Gundert-Remy, U., Leblanc, J.-C., Lindtner, O., Moldeus, P.,
                  Mosesso, P., Parent-Massin, D., Oskarsson, A., Stankovic, I.,
                  Waalkens-Berendsen, I., Woutersen, R. A., Wright, M., …
                  Lambré, C. (2017, March 15). Re-evaluation of glycerol (E 422)
                  as a food additive. EFSA journal. European Food Safety
                  Authority. Retrieved November 14, 2022, from
                  https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7009851/
                  <a
                    href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7511571/ "
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>
                <li>
                  RxList. (2021, June 11). Butanediol (BD): Health benefits,
                  side effects, uses, Dose & precautions. RxList. Retrieved
                  November 14, 2022, from
                  https://www.rxlist.com/butanediol_bd/supplements.htm
                  <a
                    href="https://www.rxlist.com/butanediol_bd/supplements.htm "
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>
                <br />
                <br />
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default KetonSaltvsKetonEster;
