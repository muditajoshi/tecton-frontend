import React from "react";
import LOGO from "../images/LOGO.png";
import "../css/grid.css";
import tab5head from "../images/tab5head.png";
import tab5foot from "../images/tab5foot.png";
import soci from "../images/social.png";
import { Link } from "react-router-dom";


const ReadFive = () => {
  return (
    <div className="grid-main">
      <img className="head" src={tab5head} alt="header runner" />
      <div class="row">
        <div class="col-lg-1"></div>
        <div class="col-lg-3 left-col" style={{ marginTop: "5%" }}>
          <p class="para">
            <strong>Amin A. Toussaint </strong>
            <br />
            <i>Vice-President Revenue Growth </i><br />
            Tecton 
            <br /> <br />
            Amin is a Sales and Revenue Growth Professional who has contributed to the launch and exponential growth of various companies worldwide . While leading sales innovation and operation at DataCore Software, he developed a system of sales and marketing engagement which allowed for customer long term retention and satisfaction while significantly increasing revenues and reducing time to market. 
          </p>
          <div className="text-center" style={{ paddingBottom: "10" }}>
            <Link to="./preorder"><button className="pre">
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
            <p class="para" >
              <h1 className="orange">
              KETOSIS THROUGH FASTING CAN UNLEASH THE MIND 
              </h1>
              As hard as it might be to accept it, there are very few decisions that the human mind makes independently while interacting in our modern societies. We speak at length about freedom of speech and our abilities to freely express our thoughts when in fact, the reality of our actions and our very thoughts finds its root in the methodical conditioning initiated at birth. The first major conditioning results from the upbringing imparted, from a meaningful childhood flavored by suburban lifestyles and yearly exotic vacations, or at the opposite end, abject poverty, violence, and reduced access to basic and fundamental rights.   
            </p>

            <p class="para">
                <h2 className="orange">
                Our relationship with food 
              </h2>
              At the center of this conditioning is our relationship with food, defined and exacerbated by a society that chooses a consumer over a human being, any day of the week.  It is no wonder then, that over half of the American population is obese, suffering from all sorts of illnesses related not only to a poor diet but also, and more importantly to a mind that has lost or surrendered its stewardship to ill-intended outside forces. A subservient mind will ultimately impact the body in a negative way and while the human body is temporary by design and essence, it was not meant to endure the destructive nutritional habits of our modern societies. 
            </p>
            <p class="para">
                
            Our efforts to reclaim the mind through self-realization and awareness are a great first step. It will however not provide what the mind truly needs to remove its shackles. There are just too many outside stimuli for the mind to thoroughly differentiate between what it is and what it should aspire to be and if left to its own devices, the mind will gravitate toward comfort and the status quo. 
            </p>
            <p class="para">
                <h2 className="orange">
                Hacking the mind 
              </h2>
              What the mind truly needs is a hack, an intervention, a sort of reset by which it temporarily relinquishes its control over the body to another entity, and what better entity to take over than the body itself functioning in the way it was designed and intended to. Engaging in the habits of fasting can help reset the mind in understanding what is truly vital and necessary for the body to thrive and perform. Fasting is not new. Many religions and cultures have advocated for fasting in various forms for thousands of years. In fact, as an example, Muslims all over the world have been practicing fasting as part of their faith for centuries. It is no coincidence, during the holy month of Ramadhan, that the reframing of the mind and the upliftment of the soul starts with the simple act of fasting, where the body through hunger and voluntary starvation claims dominion over the mind and hereby focuses it on what matters the most.
            </p>
            
            <p class="para">
            <h2 className="orange">
            The benefits of fasting
              </h2>
              The act of fasting brings the body in a state of Ketosis where the body burns fat as a fuel and is functioning at its peak for optimum results and enhanced focus. A secondary effect, and possibly one of the most important ones, is the fact that the mind is gradually weaning itself off the dependence on stimuli from its environment. The newfound awareness of the mind allows for better decision-making, gradually leading to a better lifestyle or at the very least, a better understanding of what the body requires to thrive.  </p>
            <p class="para">
            Many have found fasting, intermittent or other, to be liberating in support of weight loss and overall better health, but it is truly the state of ketosis and the ability to easily access this very state that could finally help the mind break free from the conditioning designed to keep it happily unaware of the destruction it brings to the body.  The next great human evolution will not be in the technological advances we are creating but in our ability to return to a simpler time where we admit that we have enough, and that we already are adequate. 
            </p>

            <p class="para">
            We, at Tecton, hope that providing an easy and affordable way for ordinary people to safely enter into the state of Ketosis will not only allow them to become healthier, but will set in motion their innate and perhaps dormant desire to want more from the food they eat and the society they live in; hopefully focusing their minds on what matters most.  
            </p>
           

            
            <br />

            
          </p>
        </div>
        <div class="col-lg-1"></div>
      </div>

      <img
        src={tab5foot}
        alt=""
        style={{
          width: "100%",
          height: "4vh",
        }}
      />
    </div>
  );
};

export default ReadFive;
