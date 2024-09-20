import React from "react";
import LOGO from "../images/LOGO.png";
import "../css/grid.css";
import run from "../images/run.png";
import foot from "../images/foot.jpg";
import soci from "../images/social.png";
import { Link } from "react-router-dom";

const Read = () => {
  return (
    <div className="grid-main">
      <img className="head"
        src={run}
        alt="header runner"
      />
      <div class="row">
        <div class="col-lg-1"></div>
        <div class="col-lg-3 left-col" style={{ marginTop: "5%"  }}>
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
            <Link to="./preorder" ><button className="pre"
  
            >
              <p
                style={{
                  fontFamily: "bicyclette",
                  marginBottom: "0px",
                  fontSize: "1vw",

                }}
              >
                Pre-Order Now
              </p>
            </button></Link>
          {/* </div>
          <div className="text-center"> */}
          <Link to="./ambassador">  <button className="ambassador"
              
            >
              <p
                style={{
                  fontFamily: "bicyclette",
                  marginBottom: "0px",
                  fontSize: "1vw",

                }}
              >
                Become an Ambassador
              </p>
            </button></Link>
          </div>
          <div class="row justify-content-center"><img src={soci} className="so" alt="social" /></div>
          
          <div class="row justify-content-center ">
            <img src={LOGO} className="lo" alt="logo" />
          </div>
        </div>
        <div
          class="col-lg-7 right-col" 
          
        >

<p >
            
            <p class="para"><h2 className="orange">
              Focused Performance Without Caffeine or Sugar
            </h2>
              We all want to be our best selves. We want to be productive at
              work, present for family and friends, and have energy for all
              those activities that make life worth living. We also all know how
              much more easily said than done that is.
            </p>
            <p class="para">
              Even doing your best to optimize performance – eating healthfully,
              getting enough sleep, exercising regularly, drinking plenty of
              water, controlling stress – it can be nearly impossible to escape
              those times when you just have too much on your plate and you run
              out of gas.
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
              <h2 className="orange">
              Are We Trapped By Sugar and Caffeine?
            </h2>
              Are they heroes or villains? You feel more alert and focused with
              caffeine, but it can cause jitteriness, or interfere with your
              sleep, causing you to be less rested the next day, needing even
              more caffeine to keep going. Sugar helps you to feel energized for
              a little while, but then the crash hits and you need more sugar.
              Both solutions can set up a vicious cycle. What if there was
              another way?
            </p>
            <p class="para">
              Biohackers, elite athletes, and others who are focused on
              maximizing their physical, mental, and emotional performance
              through strategies at the cutting edge of health and nutrition
              science, have been looking to ketones for an answer to this
              problem. Ketones are also called ketone bodies or endogenous
              ketones. They are a naturally occurring alternative fuel.
              (“Endogenous” means made from within.)
            </p>
            
            <p class="para">
              <h2 className="orange">
              Ketones Are Nature’s Ultimate Fuel
            </h2>
              Ketones (acetoacetate (AcAc), beta-hydroxybutyrate (BHB) and
              acetone) are produced by your liver when your body is short on
              sugar (blood glucose). This occurs naturally during starvation,
              prolonged fasting, or extreme exertion. It can also happen in
              response to a ketogenic diet. (“Ketogenic” means to make new
              ketones.) If a person chooses to avoid nearly all carbohydrates in
              their diet (usually less than 30 grams net carbs per day; about
              two slices of bread, an apple or a banana), generally in
              combination with high (healthy) fat and moderate protein, they can
              deplete their body’s sugar stores (glycogen) and force their body
              to produce ketones. (Learn more about ketogenic diets from Mayo
              Clinic.)1 As glycogen is depleted, blood ketone levels rise. Above
              0.2-0.5 mM blood ketone concentration, and up to approximately 5.0
              mM, the body is said to be in “ketosis”. To achieve this with diet
              requires extreme discipline. Even small increases in carbohydrate
              intake can cause you to drop out of ketosis, allowing blood ketone
              levels to fall and blood sugar levels to rise.
            </p>
            
              <p class="para">
                <h2 className="orange">
                Pros & Cons of a Ketogenic Diet
              </h2>
              There are also some scientists and doctors who feel that the very
              unbalanced nature of a ketogenic diet, in particular the high fat
              intake, is unhealthy and can potentially have undesirable side
              effects. Yet, people who follow a ketogenic diet often rave about
              how they feel in ketosis – increased energy, lower appetite,
              lifted “brain fog”.*2
            </p>

            <p class="para">
              Ok. Ketones sound interesting, but caffeine and sugar are quick
              and easy solutions, even if they’re not perfect. Is there a way to
              benefit from ketones without having to commit to a drastic diet?
              Yes!
            </p>
            <br />
            <p class="para">
              Exogenous ketones are available in various forms. (“Exogenous”
              means made outside the body.) High quality exogenous ketones can
              raise your blood ketone levels into the same range as diet-driven
              ketosis.*x3,4 In this quantity they serve as a secondary fuel for
              your cells, including brain cells, even when glucose isn’t
              depleted.*x4,5 Most of the ketones on the market are in salt form
              – typically BHB bound to sodium, potassium, magnesium, or calcium.
              These products are abundant, relatively inexpensive, and
              acceptably palatable. But, not all ketone products raise blood
              ketone levels sufficiently to achieve any physiological benefit.4
              Also, because of the salt content, the quantity that can be
              ingested must be limited, and care must be taken to avoid
              side-effects from the salts. A very small number of products are
              available as ketone esters – BHB bound to an ester molecule. (An
              ester is a modified carboxylic acid.) Ketone esters, to date, are
              rare on the market, very expensive, and generally unpalatable,
              making them a viable option for only the most determined user.
            </p>
            
            <p class="para">
              <h2 className="orange">Tecton</h2>
              We, the people at Tecton have the same aspiration as you – to Be
              Great! That’s why we have worked hard to research and develop an
              exogenous ketone form that can provide a high-quality source of
              BHB with excellent bioavailability and great taste. The product
              will be available within a few days. &nbsp;
              <span style={{ color: "orange" }}>
                 Be the first to be informed when the product is available for
                pre-order!
              </span>
            </p>
                <p class="para">
            <ul className="noteall" style={{ listStyleType: "none" }}>
              <li class="note">
                These statements have not been evaluated by the Food and Drug
                Administration. This product is not intended to diagnose, treat,
                cure, or prevent any disease.
              </li>
            </ul>
            <ol className="noteol">
              <li>
                Is the keto diet for you? A Mayo expert weighs in. Mayo Clinic.{" "}
                {" "}
                https://www.mayoclinic.org/is-the-keto-diet-for-you-a-mayo-expert-weighs-in/art-20457595.
                Accessed March 31, 2020.
              </li>
              <li>
                What 30 Days on the Keto Diet Feels Like. Health Essentials from
                Cleveland Clinic.
                <br />{" "}
                https://health.clevelandclinic.org/weight-loss-what-30-days-on-the-keto-diet-felt-like/.
                Published January 22, 2018. Accessed March 31, 2020.
              </li>
              <li>
                Fischer T, Och U, Klawon I, et al. Effect of a Sodium and
                Calcium DL-β-Hydroxybutyrate Salt in Healthy Adults. J Nutr
                Metab. 2018;2018:9812806. doi:10.1155/2018/9812806
              </li>
              <li>
                Evans M, Cogan KE, Egan B. Metabolism of ketone bodies during
                exercise and training: physiological basis for exogenous
                supplementation. J Physiol (Lond). 2017;595(9):2857-2871.
                doi:10.1113/JP273185
              </li>
              <li>
                Cerebral Metabolic Adaptation and Ketone Metabolism after Brain
                Injury - Mayumi L Prins, 2008.
                <br />{" "}
                https://journals.sagepub.com/doi/10.1038/sj.jcbfm.9600543.
                Accessed October 17, 2019.
              </li>
            </ol>
            <ul  className="noteall" style={{ listStyleType: "none" }}>
              <li class="n">
              Additional or alternative references may be warranted
              </li>
            </ul>
            </p>
          </p>
        </div>
        <div class="col-lg-1"></div>
      </div>

      <img
        src={foot}
        alt=""
        style={{
          width: "100%",
          height: "4vh",
        }}
      />
    </div>
  );
};

export default Read;
