import React from "react";
import "../css/tab3.css";
import salmonhead from "../images/salmonhead.png";
import salmonfoot from "../images/salmonfoot.png";
import { Link } from "react-router-dom";
import useDocumentTitle from "./useDocumentTitle";

function Tab2() {
  useDocumentTitle("Keto-diets - Tecton");
  return (
    <div class="cone">
      <div>
        <img class="ico-3" src={salmonhead} style={{ width: "100%" }}></img>
      </div>
      <section class="read-doc">
        <div class="divide" style={{ height: "auto" }}>
          <div id="http-one" class="row">
            <div class="col-sm-4 divide-one">
              <div id="dtl3">
                <b style={{ fontSize: "117%" }}>Alton Mike Chesne</b>
                <br />
                <i>Co-Founder & Chairman</i>
                <br />
                Mike served for 25 years in the US Army as a Special Forces
                Combat Medic, Army Ranger and more. He was medically retired
                from the military for injuries sustained while serving on combat
                deployments during his career. After the military, Mike founded
                a medical consulting company that provided medical training and
                consultation to foreign health ministries, and to the University
                of Tennessee's Health Science Center."
                <br />
              </div>
              <div id="dtl1">
                <div>
                  <Link to="/allproduct">
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

            <div class="col-sm-8 divide-two">
              <div id="Heads">
                <div class="tr-ps">
                  <h1
                    style={{
                      fontSize: "30px",
                      color: "black",
                      fontWeight: "bold",
                      marginTop: "10px",
                      marginBottom: "9px",
                      paddingTop: "0px",
                    }}
                  >
                    Keto Diets
                  </h1>
                </div>
              </div>
              <div>
                <p
                  class="mob-h"
                  style={{
                    color: "black",
                    marginBottom: "9px",
                    paddingTop: "9px",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  Pros & Cons of a Keto Diet: The Benefit of Having Exogenous
                  Ketones
                </p>
              </div>
              We all know the ketogenic diet is popular; we may have even tried
              following keto ourselves, or know someone who has. But what really
              are the advantages of following the keto diet? And what are the
              drawbacks?
              <br />
              <br />
              The popularity of the keto diet is largely due to its role in
              promoting weight loss. The diet restricts intake of carbohydrates,
              prompting the body to use up the carbs stored in the liver. This
              can result in an initial drop in weight since carbs cause the
              liver to hold on to a lot of water. Additionally, with fewer
              carbohydrates to provide energy, our cells switch to stored fat as
              an alternative source of energy. This causes the “fat-burning”
              effect that’s often associated with the keto diet.
              <br />
              <br />
              Without refined sugars and carbs to cause blood sugar spikes
              (which are inevitably followed by crashes), many people following
              a keto diet also have a feeling of increased energy throughout the
              day.
              <br />
              <br />
              However, the keto diet is not without its disadvantages. It is a
              restrictive diet that cuts out not only refined carbs and sweets,
              but also many fruits and whole grains. With entire food groups off
              limits, this makes the diet notoriously hard to stick to. Along
              the same lines, the keto diet has been criticized by nutrition
              experts for eliminating many healthy foods while allowing other
              foods that are high in saturated fat.
              <br /> <br />
              So how does one get the benefit of the keto diet without the
              unnecessary food restrictions? Enter exogenous ketone supplements,
              such as Tecton®. Exogenous ketones are simply ingested and promote
              fat burning without eating an overly-restrictive diet. Regain your
              life and take charge of your health today with Tecton®.
              <br />
              <br />
              <div id="dtl2">
                <div class="col-sm-4 divide-one">
                  <div class="text-center">
                    <Link to="/allproduct">
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
                  fontSize: "160%",
                  color: "black",
                  marginBottom: "9px",
                  paddingTop: "9px",
                }}
              >
                {" "}
                <b>References</b>
              </p>
              <ol className="noteol">
                <li>
                  <u>
                    <a href="https://www.cureus.com/articles/37088-advantages-and-disadvantages-of-the-ketogenic-diet-a-review-article">
                      Batch JT, Lamsal SP, Adkins M, Sultan S, Ramirez MN.
                      Advantages and disadvantages of the ketogenic diet: a
                      review article. Cureus. 2020;12(8):e9639.
                    </a>
                  </u>
                </li>
                <li>
                  <u>
                    <a href="https://pubmed.ncbi.nlm.nih.gov/23651522/">
                      Bueno NB, de Melo ISV, de Oliveira SL, da Rocha Ataide T.
                      Very-low-carbohydrate ketogenic diet v. low-fat diet for
                      long-term weight loss: a meta-analysis of randomised
                      controlled trials. British Journal of Nutrition. Cambridge
                      University Press; 2013;110(7):1178–1187.
                    </a>
                  </u>
                </li>
                <li>
                  <u>
                    <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4302176/">
                      Ye F, Li XJ, Jiang WL, Sun HB, Liu J. Efficacy of and
                      patient compliance with a ketogenic diet in adults with
                      intractable epilepsy: a meta-analysis. J Clin Neurol. 2015
                      Jan;11(1):26-31.
                    </a>
                  </u>
                </li>
                <li>
                  <u>
                    <a href="https://pubmed.ncbi.nlm.nih.gov/29541907/">
                      Brouns F. Overweight and diabetes prevention: is a
                      low-carbohydrate-high-fat diet recommendable? Eur J Nutr.
                      2018 Jun;57(4):1301-1312.
                    </a>
                  </u>
                </li>
                <li>
                  <u>
                    <a href="https://pubmed.ncbi.nlm.nih.gov/32773573/">
                      Diamond DM, O’Neill BJ, Volek JS. Low carbohydrate diet:
                      are concerns with saturated fat, lipids, and
                      cardiovascular disease risk justified? Curr Opin
                      Endocrinol Diabetes Obes. 2020;27(5):291-300.
                    </a>
                  </u>
                </li>
                <li>
                  <u>
                    {" "}
                    <a href="https://www.frontiersin.org/articles/10.3389/fphys.2017.00848/full">
                      Stubbs BJ, Cox PJ, Evans RD, et al. On the metabolism of
                      exogenous ketones in humans. Front Physiol. 2017;8:848.
                    </a>
                  </u>
                </li>
              </ol>
            </div>
          </div>

          <div id="http-two" class="row">
            <div class="col-sm-8 divide-three">
              <div id="dtl4">
                <div class="Asidee">
                  <b style={{ fontSize: "117%" }}>Alton Mike Chesne</b>
                  <br />
                  <i>Co-Founder & Chairman</i>
                  <br />
                  Mike served for 25 years in the US Army as a Special Forces
                  Combat Medic, Army Ranger and more. He was medically retired
                  from the military for injuries sustained while serving on
                  combat deployments during his career. After the military, Mike
                  founded a medical consulting company that provided medical
                  training and consultation to foreign health ministries, and to
                  the University of Tennessee's Health Science Center."{" "}
                </div>
                <br />
              </div>
            </div>
          </div>
          <img class="ico-4" src={salmonfoot}></img>
        </div>
      </section>
    </div>
  );
}

export default Tab2;
