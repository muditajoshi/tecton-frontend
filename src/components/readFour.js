import React from "react";
import LOGO from "../images/LOGO.png";
import "../css/grid.css";
import meditationhead from "../images/meditationhead.png";
import meditationfoot from "../images/meditationfoot.png";
import soci from "../images/social.png";

const ReadFour = () => {
  return (
    <div className="grid-main">
      <img className="head" src={meditationhead} alt="golf" />
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
              <p
                style={{
                  fontFamily: "bicyclette",
                  marginBottom: "0px",
                  fontSize: "1vw",
                }}
              >
                Pre-Order Now
              </p>
            </button>
            {/* </div>
          <div className="text-center"> */}
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
                What are the Benefits of Exogenous Ketones
              </h1>
              It is a uniquely human trait to pursue our highest potential. This
              leads us to try different diets. One popular diet involves
              starving the body of carbohydrates so our livers can produce
              ketones. You may have heard how these “endogenously” produced
              ketones provide some extraordinary benefits, or you may even have
              experienced these for yourself! But, it is a very hard diet for
              most people to follow. The good news is, scientists have managed
              to find a way for us to reap many of the benefits of
              health-promoting ketones without the risks and struggles of
              following a keto diet!
            </p>
            <p class="para">
              The answer? Exogenous ketones. These allow us to get into deep
              ketosis without resorting to restrictive low-carbohydrate diets.
              We can simply consume Tecton which contains ketones and get into
              deep ketosis in less than 30 minutes.
            </p>
            <p class="para">
              It happens to the best of us. You’ve got overlapping deadlines, a
              big exam, an important meeting, a higher than normal customer
              load, after school activities that require you to be in three
              different places at once. Sometimes you need an extra boost to get
              you through. Enter caffeine and sugar. Whether an espresso, a
              candy bar, or an energy drink, you can get a quick boost with a
              minimum of effort.
            </p>

            <p class="para">
              <h2 className="orange">Salts vs Esters</h2>
              There are two types of exogenous ketones: ketone salts and ketone
              esters.
            </p>
            <p class="para">
              Ketone salts do not result in the levels of ketones in the blood
              that we need to properly achieve a state of ketosis, and they
              require a lot of sodium, calcium, and/or potassium, which may lead
              to metabolic disturbances such as acidosis in the body.
            </p>

            <p class="para">
              Additionally, the types of ketones that appear in the blood from
              the consumption of ketone salts are not like the ones we produce
              internally, the endogenous ketones.{" "}
            </p>

            <p class="para">
              <h2 className="orange">Nature Identical </h2>
              Ketone esters, as used in Tecton, are nature identical to
              endogenous ketones and do not require the addition of salts. And
              based on clinical studies, we know that they are both safe and
              well tolerated.
            </p>
            <p class="para">
              There are a lot of clinical trials that provide evidence of ketone
              esters being used to enhance energy, endurance, muscle recovery or
              cognitive performance.
            </p>
            <p class="para">
              <h2 className="orange">Drink Tecton with or without Fasting </h2>
              By taking an exogenous ketone supplement, such as Tecton®, you
              will not need to resort to prolonged fasting or restrictive
              low-carbohydrate diets to generate ketones.
            </p>

            <p class="para">
              It is a more convenient way to discover your innate extraordinary
              potential. Even if you do decide to fast or follow a Ketogenic
              Diet, TectonTM is a great accompaniment and facilitator of these
              practices, making them easier to follow and tolerate.
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
                  Diamond DM, O’Neill BJ, Volek JS. Low carbohydrate diet: are
                  concerns with saturated fat, lipids, and cardiovascular
                  disease risk justified? Curr Opin Endocrinol Diabetes Obes.
                  2020;27(5):291-300.
                </li>
                <li>
                  Sansone M, Sansone A, Borrione P, Romanelli F, Di Luigi L,
                  Sgrò P. Effects of ketone bodies on endurance exercise. Curr
                  Sports Med Rep. 2018;17(12):444-453.
                </li>
                <li>
                  Stubbs BJ, Cox PJ, Evans RD, Cyranka M, Clarke K, de Wet H. A
                  ketone ester drink lowers human ghrelin and appetite. Obesity
                  (Silver Spring, Md). 2018;26(2):269-273.
                </li>
                <li>
                  Holdsworth DA, Cox PJ, Kirk T, Stradling H, Impey SG, Clarke
                  K. A ketone ester drink increases postexercise muscle glycogen
                  synthesis in humans. Med Sci Sports Exerc. 2017;49(9):1789-
                  1795.
                </li>
                <li>
                  Stubbs BJ, Cox PJ, Evans RD, et al. On the metabolism of
                  exogenous ketones in humans. Front Physiol. 2017;8:848.{" "}
                </li>

                <li>
                  Soto-Mota A, Norwitz NG, Clarke K. Why a d-β-hydroxybutyrate
                  monoester? Biochem Soc Trans. 2020;48(1):51-59.{" "}
                </li>

                <li>
                  Puchalska P, Crawford PA. Multi-dimensional roles of ketone
                  bodies in fuel metabolism, signaling, and therapeutics. Cell
                  Metab. 2017;25(2):262-284.{" "}
                </li>
              </ol>
            </p>
          </p>
        </div>
        <div class="col-lg-1"></div>
      </div>

      <img
        src={meditationfoot}
        alt=""
        style={{
          width: "100%",
          height: "4vh",
        }}
      />
    </div>
  );
};

export default ReadFour;
