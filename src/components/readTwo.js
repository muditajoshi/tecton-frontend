import React from "react";
import LOGO from "../images/LOGO.png";
import "../css/grid.css";
import salmon from "../images/salmon.png";
import salmonfoot from "../images/salmonfoot.png";
import soci from "../images/social.png";
import { Link } from "react-router-dom";

const ReadTwo = () => {
  return (
    <div className="grid-main">
      <img className="head" src={salmon} alt="header runner" />
      <div class="row">
        <div class="col-lg-1"></div>
        <div class="col-lg-3 left-col" style={{ marginTop: "5%" }}>
          <p class="para">
            <strong>Udaiyan Jatar</strong>
            <br />
            <i>Co-Founder & President</i>
            <br />
            Udaiyan is a former Coca-Cola Global Vice-President who has launched
            many brands worldwide. While leading innovation for Global
            Engineering, he developed the Coke Freestyle concept amongst others.
            He’s also the creator of the 7 Disciplines of Transcendent Brands, a
            model for developing brands that transform lives and markets. A
            model for doing well by doing good.
          </p>
          <div className="text-center" style={{ paddingBottom: "10" }}>
            <button className="pre">
              <Link
                to="./preorder"
                style={{ textDecoration: "none", color: "white" }}
              >
                {" "}
                <p
                  style={{
                    fontFamily: "bicyclette",
                    marginBottom: "0px",
                    fontSize: "1vw",
                  }}
                >
                  Pre-Order Now
                </p>
              </Link>
            </button>
            {/* </div>
          <div className="text-center"> */}
            <Link
              to="./ambassdor"
              style={{ textDecoration: "none", color: "white" }}
            >
              {" "}
              <button className="ambassador">
                <p
                  style={{
                    fontFamily: "bicyclette",
                    marginBottom: "0px",
                    fontSize: "1vw",
                  }}
                >
                  Become an Ambassador
                </p>
              </button>
            </Link>
          </div>
          <div class="row justify-content-center">
            <img src={soci} className="so" alt="social" />
          </div>

          {/* <div class="row justify-content-center ">
            <img src={LOGO} className="lo" alt="logo" />
          </div> */}
        </div>
        <div class="col-lg-7 right-col">
          <p>
            <p class="para">
              <h1 className="orange">
                Pros & Cons of a Keto Diet: The Benefit of Having Exogenous
                Ketones
              </h1>
              We all know the ketogenic diet is popular; we may have even tried
              following keto ourselves, or know someone who has. But what really
              are the advantages of following the keto diet? And what are the
              drawbacks?
            </p>
            <p class="para">
              The popularity of the keto diet is largely due to its role in
              promoting weight loss. The diet restricts intake of carbohydrates,
              prompting the body to use up the carbs stored in the liver. This
              can result in an initial drop in weight since carbs cause the
              liver to hold on to a lot of water. Additionally, with fewer
              carbohydrates to provide energy, our cells switch to stored fat as
              an alternative source of energy. This causes the “fat-burning”
              effect that’s often associated with the keto diet.
            </p>
            <p class="para">
              Without refined sugars and carbs to cause blood sugar spikes
              (which are inevitably followed by crashes), many people following
              a keto diet also have a feeling of increased energy throughout the
              day.
            </p>

            <p class="para">
              However, the keto diet is not without its disadvantages. It is a
              restrictive diet that cuts out not only refined carbs and sweets,
              but also many fruits and whole grains. With entire food groups off
              limits, this makes the diet notoriously hard to stick to. Along
              the same lines, the keto diet has been criticized by nutrition
              experts for eliminating many healthy foods while allowing other
              foods that are high in saturated fat.
            </p>
            <p class="para">
              So how does one get the benefit of the keto diet without the
              unnecessary food restrictions? Enter exogenous ketone supplements,
              such as Tecton ®. Exogenous ketones are simply ingested and
              promote fat burning without eating an overly-restrictive diet.
              Regain your life and take charge of your health today with Tecton
              ®.
            </p>

            <br />

            <p class="para">
              <h2 className="orange">References</h2>
              <ol className="noteol">
                <li>
                  Batch JT, Lamsal SP, Adkins M, Sultan S, Ramirez MN.
                  Advantages and disadvantages of the ketogenic diet: a review
                  article. Cureus. 2020;12(8):e9639.
                </li>
                <li>
                  Bueno NB, de Melo ISV, de Oliveira SL, da Rocha Ataide T.
                  Very-low-carbohydrate ketogenic diet v. low-fat diet for
                  long-term weight loss: a meta-analysis of randomised
                  controlled trials. British Journal of Nutrition. Cambridge
                  University Press; 2013;110(7):1178–1187.
                </li>
                <li>
                  Ye F, Li XJ, Jiang WL, Sun HB, Liu J. Efficacy of and patient
                  compliance with a ketogenic diet in adults with intractable
                  epilepsy: a meta-analysis. J Clin Neurol. 2015
                  Jan;11(1):26-31.
                </li>
                <li>
                  Brouns F. Overweight and diabetes prevention: is a
                  low-carbohydrate-high-fat diet recommendable? Eur J Nutr. 2018
                  Jun;57(4):1301-1312.
                </li>
                <li>
                  Diamond DM, O’Neill BJ, Volek JS. Low carbohydrate diet: are
                  concerns with saturated fat, lipids, and cardiovascular
                  disease risk justified? Curr Opin Endocrinol Diabetes Obes.
                  2020;27(5):291-300.
                </li>
                <li>
                  Stubbs BJ, Cox PJ, Evans RD, et al. On the metabolism of
                  exogenous ketones in humans. Front Physiol. 2017;8:848.
                </li>
              </ol>
            </p>
          </p>
        </div>
        <div class="col-lg-1"></div>
      </div>

      <img
        src={salmonfoot}
        alt=""
        style={{
          width: "100%",
          height: "4vh",
        }}
      />
    </div>
  );
};

export default ReadTwo;
