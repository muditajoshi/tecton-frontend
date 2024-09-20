import React from "react";
import "../css/tab3.css";
import { useState } from "react";
import tab5head from "../images/newplant.jpg";
import tab5foot from "../images/newplantfoot.jpg";
import { Link } from "react-router-dom";
import useDocumentTitle from "./useDocumentTitle";
import drimage from "../images/Tecton_BlogHeader_BeGreat 1.png";

function IntermittentFasting() {
  useDocumentTitle("What Can You Drink During Intermittent Fasting - Tecton");

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
                <div>
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
                  What Can You Drink During Intermittent Fasting?
                </p>
              </div>
              There are many well-documented physical, mental, and spiritual
              benefits of fasting<b>¹</b>.
              <br />
              <br />
              Fasting has been shown to help with weight management, blood
              pressure, inflammation, and insulin resistance, which is critical
              for those with cardio-metabolic disorders, such as hypertension
              and prediabetes. It can also aid mental health by improving
              cognition and focus. In addition, many people find that fasting
              helps to enhance spiritual growth when done for that specific
              purpose.
              <br />
              <br />
              Regardless of your reason for fasting, getting started and knowing
              what to do is often the most challenging part.
              <br />
              <br />
              First, you need to determine the type of fast you will adhere
              to—with intermittent fasting likely the most popular form these
              days. With this type of fast, food and calorie-containing
              beverages are consumed during a specific “window” of time during
              the day, typically for 6-8 hours. The remaining hours of the day
              are reserved for fasting, which seems to stimulate multiple
              positive adaptations and outcomes related to health.
              <br />
              <br />
              This article will review some of the most common beverages you
              might consider during your fast and give them the yay or nay based
              primarily on their calorie count and glucose (sugar)
              concentration.
              <br />
              <br />
              <p
                class="mob-h"
                style={{
                  fontSize: "122%",
                  color: "black",
                }}
              >
                <b>Can You Drink Water While Intermittent Fasting?</b>
              </p>
              This is likely the first question that will arise when you start
              intermittent fasting…and the simple answer is yes.
              <br />
              <br />
              Drinking water is essential for the human body. The goal for most
              adults would be to ingest three or more liters of water each day,
              depending on body size, activity level, and climate. Without
              adequate water intake, you can become dehydrated and feel
              sluggish. In fact, prolonged periods of water deprivation can lead
              to illness and death, with many sources noting that humans can
              only survive for about three days without drinking water<b>²</b>.
              <br />
              <br />
              So, if you're fasting for long periods, you need to drink water,
              including when you’re adhering to an intermittent fast. With this
              understanding, note that excessive water intake, if consumed in a
              short window of time, can lead to electrolyte imbalances and
              promote ill effects<b>³</b>.
              <br />
              <br />
              <p
                class="mob-h"
                style={{
                  fontSize: "122%",
                  color: "black",
                }}
              >
                <b>
                  {" "}
                  Intermittent Fasting and Non-calorie-containing Beverages
                </b>
              </p>
              Some people do not like the taste of plain water and have a hard
              time drinking it or consuming it in adequate amounts. Understand
              that other non-calorie-containing beverages can be consumed as
              well. This would include flavored water (including sparkling
              water), tea, and other similar items.
              <br />
              <br />
              While artificial sweeteners are thought to not significantly
              impact blood sugar or insulin, it would be best to minimize the
              consumption of beverages containing artificial sweeteners<b>⁴</b>.
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
                <b>Intermittent Fasting and Coffee</b>
              </p>
              Coffee lovers rejoice! Black coffee is a go during intermittent
              fasting—even if you desire to add a small amount of artificial
              sweetener. Studies show that black coffee can be health-enhancing
              and does not affect glucose levels in healthy adults<b>⁵</b>.
              However, those with type 2 diabetes might avoid caffeine, as some
              evidence indicates that caffeine can lower insulin sensitivity and
              lead to elevated blood glucose levels in people with diabetes
              <b>⁶</b>.
              <br />
              <br />
              That said, most 12-ounce cups of coffee contain about 125 mg of
              caffeine, so try to minimize intake to no more than 3 cups per day
              (the upper limit for recommended caffeine intake is 400 mg/day for
              adults). High caffeine intake can impair sleep quality,
              particularly if consumed later in the day.
              <br />
              <br />
              Also, note that we only mentioned black coffee. While black coffee
              has fewer than five calories, that all goes out the window if you
              add sugar and cream to your coffee<b>⁷</b>. And don’t even think
              about a latte or blended coffee drink, as these are often very
              high in sugar and calories.
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
                <b>Can You Drink Alcohol While Fasting?</b>
              </p>
              This may be devastating news for some, but alcohol does contain
              calories<b>⁸</b>. In fact, one gram of alcohol has approximately 7
              kcals, compared to a gram of carbohydrate or protein (~4 kcal) and
              fat (~9 kcal). Some examples are below, with average amounts
              varying depending on the type of alcohol consumed.
              <br />
              <br />
              • A 6-ounce glass of wine has ~125 kcal
              <br />
              • A 12-ounce standard beer has ~ 180 kcal
              <br />
              • A 1-ounce shot of gin has ~80 kcal
              <br />
              <br />
              So while consuming under 5 kcal for a 12-ounce cup of coffee won’t
              interfere with your fast, alcohol certainly can. Drinking on an
              empty stomach is a recipe for disaster too, so it’s a no go all
              around.
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
                <b>Exogenous Ketone Beverages</b>
              </p>
              Intermittent fasting “works” for a number of reasons, one of which
              is nutrient and carbohydrate restriction for some time. During
              extended periods of low carbohydrate availability, ketones are
              produced in the liver and can be used for energy<b>⁹</b>.
              <br />
              <br />
              This is often referred to as a state of ketosis. Exogenous
              ketones—those consumed rather than produced within the body—may
              support the process of ketosis, which is often associated with fat
              loss and enhanced mental focus. Moreover, the intake of ketones,
              while supplying ample energy, will not impact blood glucose.
              Therefore, they will not negatively impact an intermittent fast.
              <br />
              <br />
              With the above in mind, keep an eye on the nutrition panel of the
              ketone drink you choose, as some contain high sugar or caloric
              content that can disrupt the benefits of your fast.
              <br />
              <br />
              <a
                href="https://tectonlife.com/shop"
                target="_blank"
                style={{ textDecoration: "underline" }}
              >
                {" "}
                The Tecton{" "}
              </a>{" "}
              ketone beverage is unique because it primarily uses ketone esters
              that bind with glycerol, a natural fuel source. Plus, it only has
              50 calories from ketones per serving, zero carbs, and zero
              caffeine so you can enjoy improved energy and enhanced ketosis
              during your fast. You can extend the duration of your fasting
              window each day, as the ketone beverage may supply needed energy
              and reduce appetite, allowing for an additional 1-2 hours of
              fasting each day. This could result in enhanced overall benefits
              from your intermittent fast.
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
                <b>
                  Looking for an Ideal Intermittent Fasting Beverage? Try
                  Tecton!
                </b>
              </p>
              Some people are purists when it comes to fasting, consuming
              nothing but water. But certain beverages can enhance the benefits
              of fasting while helping to modulate hunger and mitigate other
              unpleasant side effects.
              <br />
              <br />
              Tecton is a beverage designed to deliver quality exogenous
              ketones, which can supply needed energy during periods of fasting
              while reducing appetite to possibly allow for a further reduction
              in calorie intake or an extension of the fasting window if
              adhering to an intermittent fast. In addition to the above, the
              beverage will help you remain hydrated while allowing you to
              rapidly increase blood ketone levels (as demonstrated in{" "}
              <a
                href="https://tectonlife.com/science/pkstudy"
                target="_blank"
                style={{ textDecoration: "underline" }}
              >
                {" "}
                Mayo Clinic’s recently completed pharmacokinetic study
              </a>
              ), which should enhance the process of ketosis. Moreover, intake
              of Tecton ketones is safe, even at high levels, as demonstrated in
              a recently published toxicology study<b>¹⁰</b>.
              <br />
              <br />
              No matter where you are on your fasting journey, know that you
              don’t have to settle for drinking only water.{" "}
              <a
                href="https://tectonlife.com/shop"
                target="_blank"
                style={{ textDecoration: "underline" }}
              >
                {" "}
                Try Tecton{" "}
              </a>{" "}
              today, and experience the benefits of this novel beverage to
              enhance the physical and mental aspects of fasting.
              <br />
              <br />
              <span style={{ color: "#757575" }}>
                *The Food and Drug Administration has not evaluated these
                statements. This product is not intended to diagnose, treat,
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
                  . Wilhelmi de Toledo, F., Grundler, F., Sirtori, C. R., &
                  Ruscica, M. (2020, June 10). Unraveling the health effects of
                  fasting: A long road from obesity treatment to healthy life
                  span increase and improved cognition. Annals of medicine.
                  Retrieved November 14, 2022, from
                  https://pubmed.ncbi.nlm.nih.gov/32519900
                  <a
                    href="https://pubmed.ncbi.nlm.nih.gov/32519900/"
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>
                <li>
                  Mayo Foundation for Medical Education and Research. (2022,
                  October 12). How much water do you need to stay healthy? Mayo
                  Clinic. Retrieved November 14, 2022, from
                  https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/water/art-20044256{" "}
                  <a
                    href="https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/water/art-20044256"
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>
                <li>
                  Water Toxicity. https://www.ncbi.nlm.nih.gov/books/NBK537231/
                  <a
                    href="https://www.ncbi.nlm.nih.gov/books/NBK537231/"
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>
                <li>
                  {" "}
                  Purohit, V., & Mishra, S. (2018, February 15). The truth about
                  artificial sweeteners - are they good for diabetics? Indian
                  heart journal. Retrieved December 6, 2022, from
                  https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5903011/{" "}
                  <a
                    href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5903011/"
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>
                <li>
                  . The effect of black coffee on fasting metabolic markers and
                  an abbreviated fat tolerance test.
                  https://pubmed.ncbi.nlm.nih.gov/33487304/
                  <a
                    href="https://pubmed.ncbi.nlm.nih.gov/33487304/"
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>
                <li>
                  Whitehead, N., & White, H. (2013, April). Systematic review of
                  randomised controlled trials of the effects of caffeine or
                  caffeinated drinks on blood glucose concentrations and insulin
                  sensitivity in people with diabetes mellitus. Journal of human
                  nutrition and dietetics: the official journal of the British
                  Dietetic Association. Retrieved November 14, 2022, from
                  https://pubmed.ncbi.nlm.nih.gov/23331476/
                  <a
                    href="https://pubmed.ncbi.nlm.nih.gov/23331476/ "
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>
                <li>
                  . I'm trying to lose weight. Should I cut back on coffee?
                  https://www.mayoclinic.org/healthy-lifestyle/weight-loss/expert-answers/calories/faq-20058100
                  <a
                    href="https://www.mayoclinic.org/healthy-lifestyle/weight-loss/expert-answers/calories/faq-20058100 "
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>
                <li>
                  Calories in alcohol.
                  https://www.nhs.uk/live-well/alcohol-advice/calories-in-alcohol/
                  <a
                    href="https://www.nhs.uk/live-well/alcohol-advice/calories-in-alcohol/ "
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>

                <li>
                  Nutritional Ketosis with Ketogenic Diets or Exogenous Ketones:
                  Features, Convergence, and Divergence.
                  https://pubmed.ncbi.nlm.nih.gov/32692060/{" "}
                  <a
                    href=" https://pubmed.ncbi.nlm.nih.gov/32692060/ "
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>
                <li>
                  Dolan, L. C., Karikachery, A. R., & Thipe, V. C. (2022,
                  October 21). Toxicity investigations of (R)-3-hydroxybutyrate
                  glycerides in vitro and in male and female rats. Nutrients.
                  Retrieved December 5, 2022, from
                  https://pubmed.ncbi.nlm.nih.gov/36297110/{" "}
                  <a
                    href="https://pubmed.ncbi.nlm.nih.gov/36297110/  "
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

export default IntermittentFasting;
